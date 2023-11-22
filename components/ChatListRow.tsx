"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ChatListRow({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId)
  );

  const prettyUUID = (n = 4) => {
    return chatId.substring(0, n);
  };

  const row = (message?: Message) => (
    <div
      key={chatId}
      onClick={() => router.push(`chat/${chatId}`)}
      className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      <UserAvatar
        name={message?.user.name! || session?.user.name!}
        image={message?.user.image! || session?.user.image!}
        className="border border-indigo-500 scale-125"
      />

      <div className="flex-1 ps-2">
        <p className="font-bold">
          {!message && "New Chat"}
          {message &&
            [message?.user.name || session?.user.name].toString().split(" ")[0]}
        </p>

        <p className="text-grey-400 line-clamp-1">
          {message?.translated?.["en"] || "Get the conversation started..."}
        </p>
      </div>

      <div className="text-xs text-grey-400">
        <p className="mb-auto">
          {message
            ? new Date(message.timestamp).toLocaleTimeString()
            : "No history"}
        </p>
        <p>Chat #{prettyUUID()}</p>
      </div>
    </div>
  );

  return (
    <div>
      {loading && (
        <div className="flex p-5 items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}
      {messages !== undefined &&
        messages?.length > 0 &&
        row(messages[messages.length - 1])}
    </div>
  );
}

export default ChatListRow;
