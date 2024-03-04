import React from "react";

import {
  HeaderCard,
  MainCardContainer,
  SubHeaderCard,
  PageLink,
  ParticipantesContainer,
  TextBoxContainer,
} from "./styles";
import {
  AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION,
  PARTICIPANTES,
  TABLERO,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

import { setLinkSelected } from "@redux/slices/participantesEvaluacionSlice";
import { SearchBox, TextBox } from "@components";
import { ParticipantesIconPNG } from "src/assests";
import { Modal } from "src/components/Modal/Modal";

const ParticipantesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const linkSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.linkSelected,
  );
  const pealSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.pealSelected,
  );
  const evaluacionSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
  );
  const modalActive = useAppSelector((state) => state.modal.active);

  return (
    <ParticipantesContainer>
      <MainCardContainer>
        <HeaderCard></HeaderCard>
        <SubHeaderCard>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PARTICIPANTES"))}
            selected={linkSeleccionado == "PARTICIPANTES"}
          >
            {PARTICIPANTES}
          </PageLink>
          <PageLink
            onClick={() => dispatch(setLinkSelected("TABLERO"))}
            selected={linkSeleccionado == "TABLERO"}
          >
            {TABLERO}
          </PageLink>
        </SubHeaderCard>
        <TextBoxContainer>
          <TextBox
            icon={ParticipantesIconPNG}
            title={PARTICIPANTES}
            description={AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION}
          />
        </TextBoxContainer>
        <SearchBox array={colaboradores} type="PARTICIPANTESEVALUACION" />
      </MainCardContainer>
      {!modalActive || <Modal type="PARTICIPANTESEVALUACION" />}
    </ParticipantesContainer>
  );
};
export default ParticipantesPage;
