import React from "react";
import {
  ColumnContainer,
  DescriptionText,
  IconContainer,
  TitleText,
} from "./styles";
import Image, { StaticImageData } from "next/image";

interface TextBoxProps {
  icon: StaticImageData;
  title: string;
  description: string;
}

const TextBox: React.FC<TextBoxProps> = ({ icon, title, description }) => (
  <ColumnContainer>
    <IconContainer>
      <Image src={icon} alt="" width={27} height={24} />
    </IconContainer>
    <TitleText>{title}</TitleText>
    <DescriptionText>{description}</DescriptionText>
  </ColumnContainer>
);

export { TextBox };
