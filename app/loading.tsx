import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

function loading() {
  return (
    <div className="flex items-center p-10 justify-center">
      l<LoadingSpinner />
    </div>
  );
}

export default loading;
