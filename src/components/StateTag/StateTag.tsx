import React from "react";
import { Circle, TagContainer, Title } from "./styles";
import { ACTIVO, INACTIVO } from "@constants";

interface StateTagProps {
  state: string;
}

const StateTag: React.FC<StateTagProps> = ({ state }) => {
  return (
    <TagContainer state={state}>
      <Circle state={state} />
      <Title>{state == "Activo" ? ACTIVO : INACTIVO}</Title>
    </TagContainer>
  );
};

export { StateTag };
