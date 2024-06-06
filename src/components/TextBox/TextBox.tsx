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
  type?: string;
  name?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  icon,
  title,
  description,
  type,
  name,
}) => (
  <ColumnContainer>
    <IconContainer>
      <Image
        src={icon}
        alt=""
        width={
          type == "Info Trabajo"
            ? 22
            : type == "Info Bancaria"
              ? 26
              : type == "Info Emergencia"
                ? 26
                : 27
        }
        height={
          type == "Info Trabajo"
            ? 25
            : type == "Info Bancaria"
              ? 20
              : type == "Info Emergencia"
                ? 26
                : 24
        }
      />
    </IconContainer>
    <TitleText>{title}</TitleText>
    <DescriptionText>
      {description} <b>{name}</b>
    </DescriptionText>
  </ColumnContainer>
);

export { TextBox };
