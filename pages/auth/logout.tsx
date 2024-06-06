import React from "react";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import Logout from "src/sections/Logout/Logout";

export default function SignOut({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Logout csrfToken={csrfToken} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
