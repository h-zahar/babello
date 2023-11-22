import { authOptions } from "@/auth";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

async function Chat({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      <div className="min-h-[calc(100vh-10rem)]">
        <ChatMembersBadges chatId={chatId} />
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
}

export default Chat;
