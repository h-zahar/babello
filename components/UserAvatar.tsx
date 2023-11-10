import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

function UserAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      {image && (
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-fullx"
        />
      )}
      <AvatarFallback
        delayMs={1000}
        className="bg-gray-600 text-white dark:bg-white dark:text-black text-lg"
      >
        {name
          ? name
              .split(" ")
              .map((ch) => ch[0])
              .join("")
          : "UR"}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
