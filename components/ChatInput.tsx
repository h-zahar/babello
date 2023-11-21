"use client";

import { useSession } from "next-auth/react";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, messagesRef } from "@/lib/converters/message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { limitedMessagesRef } from "@/lib/converters/message";
import { useSubscriptionStore } from "@/store/store";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

function ChatInput({ chatId }: { chatId: string }) {
  const formSchema = z.object({
    input: z.string().max(1000),
  });
  const { data: session } = useSession();

  const router = useRouter();

  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const cInput = values.input.trim();
    form.reset();

    if (cInput.length === 0) return;
    if (!session?.user) return;

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    const isPro = subscription?.role === "pro";

    if (!isPro && messages > 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded Free plan limit of 20 messages per chat. Upgrade to PRO for unlimited messages!",
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

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };
    addDoc(messagesRef(chatId), {
      input: cInput,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-600 text-white dark:hover:text-black"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
