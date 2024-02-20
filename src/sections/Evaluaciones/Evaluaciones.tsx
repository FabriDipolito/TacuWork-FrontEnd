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
  setEvaluacionesHechas,
  setPealSelected,
} from "@redux/slices/evaluacionesSlice";
import { evaluacionesPealGET } from "src/services/api/allEvaluacionesPealGET";
import { setActive } from "@redux/slices/modalSlice";

const EvaluacionesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const peales = useAppSelector((state) => state.general.peales);
  const pealSeleccionado = useAppSelector(
    (state) => state.evaluacion.pealSelected,
  );
  const evaluacionesHechas = useAppSelector(
    (state) => state.evaluacion.evaluacionesHechas,
  );

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    pealesGET()
      .then((allPeales) => {
        if (allPeales) {
          dispatch(setPeales(allPeales));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of users:", error);
      });
  }, []);

  useEffect(() => {
    if (pealSeleccionado) {
      evaluacionesPealGET(pealSeleccionado.id)
        .then((allEvaluaciones) => {
          if (allEvaluaciones) {
            dispatch(setEvaluacionesHechas(allEvaluaciones));
          }
        })
        .catch((error) => {
          console.error("Error to obtain data of users:", error);
        });
    }
  }, [pealSeleccionado]);

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
            onClick={() => dispatch(setActive(true))}
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
        <SearchBox array={evaluacionesHechas} />
      </MainCardContainer>
    </EvaluacionContainer>
  );
};
export default EvaluacionesPage;
