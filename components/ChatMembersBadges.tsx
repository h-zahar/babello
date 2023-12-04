"use client";

import { ChatMembers, chatMembersRef } from "@/lib/converters/chatMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React from "react";
import useAdminId from "@/hooks/useAdminId";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";
import { Badge } from "./ui/badge";

function ChatMembersBadges({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  const adminId = useAdminId({ chatId });

  if (loading && !members) return <LoadingSpinner />;

  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => {
            return (
              <Badge
                variant="secondary"
                key={member.email}
                className="h-14 p-2 pl-2 pr-flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <UserAvatar name={member.email} image={member.image} />
                </div>
                <div>
                  <p>{member.email}</p>
                  {member.userId === adminId && (
                    <p className="text-blue-400 animate-pulse">Admin</p>
                  )}
                </div>
              </Badge>
            );
          })}
        </div>
      </div>
    )
  );
}

export default ChatMembersBadges;
