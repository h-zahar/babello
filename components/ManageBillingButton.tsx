import { generatePortalLink } from "@/actions/generatePortalLink";
import React from "react";

function ManageBillingButton() {
  return (
    <form
      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer disabled:opacity-80 disabled:bg-blue-600/50 disabled:text-white disabled:cursor-default"
      action={generatePortalLink}
    >
      <button type="submit">Manage Billing</button>
    </form>
  );
}

export default ManageBillingButton;
