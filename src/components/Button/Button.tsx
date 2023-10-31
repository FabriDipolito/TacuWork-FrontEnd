import React from "react";
import Image from 'next/image';

import { StyledButton, ButtonText } from "./styles";
import { ButtonProps } from "@types";
import { ArrowIconPNG, LightbulbIconPNG, PlusIconPNG, TrashIconPNG } from "src/assests";

const Button: React.FC<ButtonProps> = ({
  typeOfButton,
  onClick,
  label,
  selected,
  userButton
}) => (
  <StyledButton typeOfButton={typeOfButton} onClick={onClick} selected={selected}>
      {typeOfButton == "create" && <Image src={PlusIconPNG} height={30} width={30} alt="" />}
    <ButtonText typeOfButton={typeOfButton} userButton={userButton}>
      {label}
    </ButtonText>
      {typeOfButton == "delete" ? <Image src={TrashIconPNG} height={32} width={26} alt="" />
       : 
       typeOfButton == "advice" ? <Image src={LightbulbIconPNG} height={35} width={23} alt="" /> 
       : 
       typeOfButton == "submit" ? <Image src={ArrowIconPNG} height={20} width={15} alt="" /> : <></>}
  </StyledButton>
);
export { Button };
