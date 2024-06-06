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
} from "./styles";
import {
  AQUI_ESTAN_TODAS_EVALUACIONES,
  BUSCAR_PEAL,
  EVALUACIONES,
  NUEVA_EVALUACION,
} from "@constants";
import { pealesGET } from "src/services/api/allPealesGET";
import { TextBox } from "@components";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  AddButtonPNG,
  AddButtonSelectedPNG,
  EvaluacionIconPNG,
} from "src/assests";
import { PealProps } from "@types";
import { setPeales } from "@redux/slices/generalVariableSlice";
import { SearchBox } from "src/components/SearchBox/SearchBox";
import {
  setEditEvaluacion,
  setEvaluacionesHechas,
  setPealSelected,
} from "@redux/slices/evaluacionesSlice";
import { setActive } from "@redux/slices/modalSlice";
import { Modal } from "src/components/Modal/Modal";
import { set } from "date-fns";
import { DeleteModal } from "src/components/Modal/DeleteModal/DeleteModal";
import { setEvaluacionSelected } from "@redux/slices/participantesEvaluacionSlice";

const EvaluacionesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const pealSeleccionado = useAppSelector(
    (state) => state.evaluacion.pealSelected,
  );
  const evaluacionesHechas = useAppSelector(
    (state) => state.evaluacion.evaluacionesHechas,
  );
  const edit = useAppSelector((state) => state.evaluacion.edit);
  const modalActive = useAppSelector((state) => state.modal.active);
  const modalDeleteActive = useAppSelector((state) => state.modalDelete.active);

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    if (pealSeleccionado) {
      dispatch(
        setEvaluacionesHechas(
          evaluaciones?.filter(
            (evaluacion) => evaluacion.peal_id == pealSeleccionado.id,
          ) || [],
        ),
      );
    }
  }, [pealSeleccionado, evaluaciones]);

  return (
    <EvaluacionContainer>
      <MainCardContainer>
        <HeaderCard>
          <PealSearch
            options={peales ? peales : []}
            getOptionLabel={(option: any) => `${option.nombre}`}
            defaultValue={useAppSelector(
              (state) => state.evaluacion.pealSelected,
            )}
            renderInput={(params) => (
              <PealSearchTextField
                {...params}
                label={
                  pealSeleccionado ? pealSeleccionado?.nombre : BUSCAR_PEAL
                }
                variant="outlined"
                margin="normal"
              />
            )}
            renderOption={(props, option, state) => (
              <div
                {...props}
                style={{ width: "100%" }}
                onClick={() => {
                  dispatch(setPealSelected(option as PealProps));
                }}
              >
                {(option as PealProps).nombre}
              </div>
            )}
          />
          <EvaluacionAddButton
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            onClick={() => {
              dispatch(setEditEvaluacion(false)),
                dispatch(setEvaluacionSelected(undefined)),
                dispatch(setActive(true));
            }}
          >
            <Image
              src={hoverButton ? AddButtonSelectedPNG : AddButtonPNG}
              height={14}
              width={14}
              alt=""
            />
            <ButtonText hover={hoverButton}>{NUEVA_EVALUACION}</ButtonText>
          </EvaluacionAddButton>
        </HeaderCard>
        <TextBoxContainer>
          <TextBox
            icon={EvaluacionIconPNG}
            title={EVALUACIONES}
            description={AQUI_ESTAN_TODAS_EVALUACIONES}
          />
        </TextBoxContainer>
        <SearchBox array={evaluacionesHechas} type="EVALUACION" />
      </MainCardContainer>
      {!modalActive || (
        <Modal type="EVALUACION" edit={edit} peal_id={pealSeleccionado?.id} />
      )}
      {!modalDeleteActive || <DeleteModal type="EVALUACION" />}
    </EvaluacionContainer>
  );
};
export default EvaluacionesPage;
