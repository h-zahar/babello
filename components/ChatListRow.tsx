"use client";

import { Message, limitedMessagesRef } from "@/lib/converters/message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";
import { Skeleton } from "./ui/skeleton";

function ChatListRow({ chatId }: { chatId: string }) {
  const [messages, loading, error] = useCollectionData<Message>(
    limitedMessagesRef(chatId)
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
    </div>
  );
}

export default ChatListRow;
