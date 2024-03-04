import React from "react";
import { Circle, TagContainer, Title } from "./styles";
import { ACTIVO, EVALUADO, INACTIVO, PENDIENTE, SIN_EVALUAR } from "@constants";

interface StateTagProps {
  state: string;
}

const StateTag: React.FC<StateTagProps> = ({ state }) => {
  return (
    <TagContainer state={state}>
      <Circle state={state} />
      <Title>
        {state == "EVALUADO"
          ? EVALUADO
          : state == "PENDIENTE"
            ? PENDIENTE
            : state == "SIN EVALUAR"
              ? SIN_EVALUAR
              : state == "Activo"
                ? ACTIVO
                : INACTIVO}
      </Title>
    </TagContainer>
  );
};

export { StateTag };
