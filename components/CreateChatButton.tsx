"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import {
  addChatRef,
  chatMemberCollectionGroupRef,
} from "@/lib/converters/chatMembers";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastAction } from "./ui/toast";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Just a bit...",
      duration: 3000,
    });

    const noOfChats = (
      await getDocs(chatMemberCollectionGroupRef(session?.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === "pro";

    if (!isPro && noOfChats) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the limit of chats for the free plan. Please upgrade to PRO to enjoy limitless chatting!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-500 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button variant={"ghost"} onClick={() => createNewChat()}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
