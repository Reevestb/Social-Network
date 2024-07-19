"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

const useSignoutRedirect = (userId) => {
  const { isSignedIn } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isSignedIn && userId) {
      push(`/user/${userId}`);
    }
  }, [isSignedIn, userId, push]);
};

export default useSignoutRedirect;
