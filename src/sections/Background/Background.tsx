import React, { useEffect } from "react";

import { NextFixedPage } from "./styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Background: React.FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const checkSession = async () => {
    if (status == "unauthenticated") {
      await router.push("auth/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, [session]);

  return <NextFixedPage>{children}</NextFixedPage>;
};
export default Background;
