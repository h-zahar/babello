import React from "react";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

function Chats({ searchParams: { error } }: Props) {
  return <div>Chats</div>;
}

export default Chats;
