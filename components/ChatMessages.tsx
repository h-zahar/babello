"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/message";
import { useLanguageStore } from "@/store/store";
import { MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";
import LoadingCircularSpinner from "./LoadingCircularSpinner";

function ChatMessages({
  chatId,
  initialMessages,
  session,
}: {
  chatId: string;
  initialMessages: Message[];
  session: Session | null;
}) {
  const language = useLanguageStore((state) => state.language);
  const messageEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageEndRef]);
  console.log(messages);
  return (
    <div>
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center text-center items-center p-5 md:p-28 rounded-xl bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />

          <h2>
            <span className="font-bold">Invite a friend</span> &{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>{" "}
            to get started!
          </h2>
          <p className="pt-5 pb-3">
            The AI will auto-detect & translate it all for you
          </p>
        </div>
      )}

      {messages !== undefined &&
        messages?.length > 0 &&
        messages?.map((message, i) => {
          const isSender = message.user.id === session?.user.id;

          return (
            <div key={message.id} className="flex my-2 items-end">
              <div
                className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                  isSender
                    ? "ml-auto bg-violet-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
                }`}
              >
                <p
                  className={`text-xs italic font-extralight line-clamp-1 ${
                    isSender ? "text-left" : "text-right"
                  }`}
                >
                  {message.user.name.split(" ")[0]}
                </p>
                <div className="flex space-x-2">
                  <p>{message?.translated?.[language] || message.input}</p>
                  {!message?.translated && <LoadingCircularSpinner />}
                </div>
              </div>

              <UserAvatar
                name={message.user.name}
                image={message.user.image}
                className={`${!isSender && "-order-1"}`}
              />
            </div>
          );
        })}
      <div ref={messageEndRef} />
    </div>
  );
}

export default ChatMessages;
