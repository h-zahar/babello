"use client";

import { subsciptionRef } from "@/lib/converters/subscription";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function SubscriptionProvider() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    return onSnapshot(subsciptionRef(session?.user.id), (snapShot) => {
      if (snapShot.empty) {
        console.log("User has No subscription");
        return;
      } else {
        console.log("User has Subscription");
      }
    });
  }, [session]);

  return <div>SubscriptionProvider</div>;
}

export default SubscriptionProvider;
