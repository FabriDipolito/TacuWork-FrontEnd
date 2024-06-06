import React from "react";

import {
  AuthFixedPage,
  Button,
  CardContainer,
  CloseModalContainer,
  FormContainer,
  H1,
  P,
  TextContainer,
} from "./styles";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { CERRAR_SESSION, ESTAS_SEGURO_CERRAR_SESSION } from "@constants";
import { CloseModalPNG } from "src/assests";

interface LogoutProps {
  csrfToken: string | undefined;
}

const Logout: React.FC<LogoutProps> = ({ csrfToken }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting logout form");
    await signOut({ callbackUrl: "/auth/login" });
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <AuthFixedPage>
      <CardContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "fit-content",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingRight: "10px",
          }}
        >
          <CloseModalContainer
            onClick={() => {
              handleGoBack();
            }}
          >
            <Image src={CloseModalPNG} alt="" width={16} height={16} />
          </CloseModalContainer>
        </div>
        <TextContainer>
          <H1>{CERRAR_SESSION}</H1>
          <P>{ESTAS_SEGURO_CERRAR_SESSION}</P>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Button type="submit">{CERRAR_SESSION}</Button>
            </FormContainer>
          </form>
        </TextContainer>
      </CardContainer>
    </AuthFixedPage>
  );
};

export default Logout;
