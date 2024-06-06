import React from "react";

import {
  HeaderCard,
  MainCardContainer,
  ParticipantesContainer,
  TextBoxContainer,
} from "./styles";
import {
  AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION,
  PARTICIPANTES,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

import { SearchBox, TextBox } from "@components";
import { ParticipantesIconPNG } from "src/assests";
import { Modal } from "src/components/Modal/Modal";
import { DeleteModal } from "src/components/Modal/DeleteModal/DeleteModal";

const ParticipantesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const pealSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.pealSelected,
  );
  const evaluacionSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
  );
  const modalActive = useAppSelector((state) => state.modal.active);
  const modalDeleteActive = useAppSelector((state) => state.modalDelete.active);

  return (
    <ParticipantesContainer>
      <MainCardContainer>
        <HeaderCard></HeaderCard>
        <TextBoxContainer>
          <TextBox
            icon={ParticipantesIconPNG}
            title={PARTICIPANTES}
            description={AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION}
          />
        </TextBoxContainer>
        <SearchBox
          array={colaboradores?.filter(
            (colaborador) => colaborador.peal_id == pealSeleccionado?.id,
          )}
          type="PARTICIPANTESEVALUACION"
        />
      </MainCardContainer>
      {!modalActive || <Modal type="PARTICIPANTESEVALUACION" />}
      {!modalDeleteActive || <DeleteModal type="PARTICIPANTESEVALUACION" />}
    </ParticipantesContainer>
  );
};
export default ParticipantesPage;
