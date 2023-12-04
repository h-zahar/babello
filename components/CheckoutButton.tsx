"use client";

import { db } from "@/firebase";
import { useSubscriptionStore } from "@/store/store";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ManageBillingButton from "./ManageBillingButton";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const createCheckoutSession = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!session?.user.id) return;
    setLoading(true);
    e.currentTarget.disabled = true;

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OBjfnGwl7hhS0i3nh173iyE",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert("Soemthing went wrong!");
        setLoading(false);
        e.currentTarget.disabled = false;
      } else if (url) {
        window.location.assign(url);
        setLoading(false);
        e.currentTarget.disabled = false;
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {subscription === undefined || subscription?.role === "pro" ? (
        <div
          className={`mt-8 block rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm${
            subscription === undefined
              ? ""
              : " hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer disabled:opacity-80 disabled:bg-blue-600/50 disabled:text-white disabled:cursor-default"
          }`}
        >
          {subscription === undefined ? (
            <LoadingSpinner />
          ) : (
            <ManageBillingButton />
          )}
        </div>
      ) : (
        <button
          className="mt-8 block rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer disabled:opacity-80 disabled:bg-blue-600/50 disabled:text-white disabled:cursor-default"
          onClick={(e) => createCheckoutSession(e)}
        >
          {loading ? <LoadingSpinner /> : "Checkout"}
        </button>
      )}
    </div>
  );
}

export default CheckoutButton;
