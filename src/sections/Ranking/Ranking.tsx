import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ButtonText,
  EvaluacionAddButton,
  EvaluacionContainer,
  HeaderCard,
  MainCardContainer,
  PealSearch,
  PealSearchTextField,
  TextBoxContainer,
  TextPage,
  TitlePage,
} from "./styles";
import {
  AQUI_ESTAN_TODAS_EVALUACIONES,
  BUSCAR_PEAL,
  EVALUACIONES,
  NUEVA_EVALUACION,
  RANKING,
  RANKING_GENERAL_Y_PEAL,
} from "@constants";
import { TextBox } from "@components";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  AddButtonPNG,
  AddButtonSelectedPNG,
  CoronaIconPNG,
  EvaluacionIconPNG,
} from "src/assests";
import { PealProps } from "@types";
import { SearchBox } from "src/components/SearchBox/SearchBox";
import {
  setEditEvaluacion,
  setEvaluacionesHechas,
  setPealSelected,
} from "@redux/slices/evaluacionesSlice";
import { setActive } from "@redux/slices/modalSlice";
import { Modal } from "src/components/Modal/Modal";
import { DeleteModal } from "src/components/Modal/DeleteModal/DeleteModal";
import { setEvaluacionSelected } from "@redux/slices/participantesEvaluacionSlice";

const RankingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);

  const evaluacionesHechas = useAppSelector(
    (state) => state.evaluacion.evaluacionesHechas,
  );

  return (
    <EvaluacionContainer>
      <MainCardContainer>
        <TextBoxContainer>
          <Image src={CoronaIconPNG} alt="" width={95} height={45} />
          <TitlePage>{RANKING}</TitlePage>
          <TextPage>{RANKING_GENERAL_Y_PEAL}</TextPage>
        </TextBoxContainer>
        <SearchBox array={colaboradores} type="RANKING" />
      </MainCardContainer>
    </EvaluacionContainer>
  );
};
export default RankingPage;
