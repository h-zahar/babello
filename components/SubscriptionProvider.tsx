"use client";

import { subsciptionRef } from "@/lib/converters/subscription";
import { useSubscriptionStore } from "@/store/store";
import { error } from "console";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { Children, useEffect } from "react";

function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subsciptionRef(session?.user.id),
      (snapShot) => {
        if (snapShot.empty) {
          setSubscription(null);
          console.log("User has No subscription");
          return;
        } else {
          console.log("User has Subscription");
          setSubscription(snapShot.docs[0].data());
        }
      },
      (error) => {
        console.log("Error");
      }
    );
  }, [session, setSubscription]);

  return <div>{children}</div>;
}

export default SubscriptionProvider;
