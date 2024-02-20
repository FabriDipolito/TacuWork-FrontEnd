import React from "react";

import {
  AuthFixedPage,
  Button,
  FormContainer,
  ImageContainer,
  Input,
  InputContainer,
  Label,
} from "./styles";
import Image from "next/image";
import { TacuWorkLoginPNG } from "src/assests";
import { PASSWORD, USERNAME } from "@constants";

interface LoginProps {
  csrfToken: string | undefined;
}

const Login: React.FC<LoginProps> = ({ csrfToken }) => {
  return (
    <AuthFixedPage>
      <ImageContainer>
        <Image src={TacuWorkLoginPNG} alt="" width={479} height={262} />
      </ImageContainer>
      <form method="post" action="/api/auth/callback/credentials">
        <FormContainer>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <InputContainer>
            <Label>{USERNAME}</Label>
            <Input name="username" type="text" spellCheck="false" />
          </InputContainer>
          <InputContainer>
            <Label>{PASSWORD}</Label>
            <Input name="password" type="password" spellCheck="false" />
          </InputContainer>
          <Button type="submit">Sign in</Button>
        </FormContainer>
      </form>
    </AuthFixedPage>
  );
};
export default Login;
