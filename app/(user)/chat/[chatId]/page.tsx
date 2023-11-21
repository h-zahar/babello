import { authOptions } from "@/auth";
import ChatInput from "@/components/ChatInput";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

async function Chat({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ChatInput chatId={chatId} />
    </>
  );
}

export default Chat;
