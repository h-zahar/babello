import { authOptions } from "@/auth";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

async function ChatList() {
  const session = await getServerSession(authOptions);

  // const chatsSnapshot = await getDocs(

  // );
  return <div>ChatList</div>;
}

export default ChatList;
