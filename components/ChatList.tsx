import { authOptions } from "@/auth";
import { chatMemberCollectionGroupRef } from "@/lib/converters/chatMembers";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";
import ChatListRows from "./ChatListRows";

async function ChatList() {
  const session = await getServerSession(authOptions);

  const chatsSnapshot = await getDocs(
    chatMemberCollectionGroupRef(session?.user.id!)
  );
  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
