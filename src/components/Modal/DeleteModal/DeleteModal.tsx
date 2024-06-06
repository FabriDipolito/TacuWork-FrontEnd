import React, { useState } from "react";
import Image from "next/image";

import {
  Button,
  ButtonBox,
  ButtonText,
  Header,
  IconContainer,
  MainBox,
  ModalBackground,
  ModalCard,
  SubTitle,
  Title,
  TitleBox,
} from "./styles";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  CANCELAR,
  ELIMINAR,
  ESTAS_SEGURO,
  SE_ELIMINARA_COLABORADOR,
  SE_ELIMINARA_EVALUACION,
  SE_ELIMINARA_PEAL,
  SE_ELIMINARA_PUNTAJE,
} from "@constants";
import { setActiveDelete } from "@redux/slices/modalDeleteSlice";
import { WarningDeletePNG } from "src/assests";
import { PuntajeDELETE } from "src/services/api/puntajesDELETE";
import {
  dataColaboradorDelete,
  dataEvaluacionDelete,
  dataPealDelete,
  dataPuntajeDelete,
} from "@types";
import {
  setColaboradores,
  setEvaluaciones,
  setPeales,
  setPuntajes,
} from "@redux/slices/generalVariableSlice";
import { ColaboradoresDELETE } from "src/services/api/colaboradorDELETE";
import { EvaluacionesDELETE } from "src/services/api/evaluacionesDELETE";
import { PealDELETE } from "src/services/api/pealesDELETE";

interface modalProps {
  type: "COLABORADOR" | "PROYECTO" | "EVALUACION" | "PARTICIPANTESEVALUACION";
}

const DeleteModal: React.FC<modalProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);

  // COLABORADOR

  const colaboradorSeleccionado = useAppSelector(
    (state) => state.modalDelete.colaboradorSelected,
  );

  // PROYECTO

  const pealSeleccionado = useAppSelector(
    (state) => state.modalDelete.pealSelected,
  );

  // EVALUACION

  const evaluacionSeleccionado = useAppSelector(
    (state) => state.modalDelete.evaluacionSelected,
  );

  // PARTICIPANTES EVALUACION
  const puntajeSeleccionado = useAppSelector(
    (state) => state.modalDelete.puntajeSelected,
  );

  const [hoverButton, setHoverButton] = useState(false);
  const [hoverButton2, setHoverButton2] = useState(false);

  const handleOnClickCancel = () => {
    dispatch(setActiveDelete(false));
  };

  const handleOnClickEliminate = () => {
    if (type == "COLABORADOR" && colaboradorSeleccionado && puntajes) {
      const puntajesColaborador = puntajes?.filter(
        (puntaje) => puntaje.colaborador_id == colaboradorSeleccionado.id,
      );
      if (puntajesColaborador.length > 0) {
        const OkPuntajes = PuntajeDELETE(
          puntajesColaborador.map((puntaje) => puntaje.colaborador_id),
          puntajesColaborador.map((puntaje) => puntaje.evaluacion_id),
        );
        if (OkPuntajes) {
          OkPuntajes.then((data: dataPuntajeDelete) =>
            dispatch(
              setPuntajes(
                puntajes.filter((puntaje) => {
                  for (let i = 0; i < data.deleted_records.length; i++) {
                    if (
                      puntaje.colaborador_id ==
                        data.deleted_records[i].colaborador_id &&
                      puntaje.evaluacion_id ==
                        data.deleted_records[i].evaluacion_id
                    ) {
                      return false;
                    }
                  }
                  return true;
                }),
              ),
            ),
          );
        }
      }
      const OkColaborador = ColaboradoresDELETE([colaboradorSeleccionado.id]);
      if (OkColaborador && colaboradores) {
        OkColaborador.then((data: dataColaboradorDelete) =>
          dispatch(
            setColaboradores(
              colaboradores.filter((colaborador) => {
                for (let i = 0; i < data.deleted_ids.length; i++) {
                  if (colaborador.id == data.deleted_ids[i]) {
                    return false;
                  }
                }
                return true;
              }),
            ),
          ),
        );
      }
    }
    if (
      type == "PROYECTO" &&
      pealSeleccionado &&
      colaboradores &&
      evaluaciones &&
      puntajes
    ) {
      const colaboradoresPeal = colaboradores.filter(
        (colaborador) => colaborador.peal_id == pealSeleccionado?.id,
      );
      const evaluacionesPeal = evaluaciones.filter(
        (evaluacion) => evaluacion.peal_id == pealSeleccionado?.id,
      );
      const puntajesPeal = puntajes.filter((puntaje) => {
        for (let i = 0; i < evaluacionesPeal.length; i++) {
          if (puntaje.evaluacion_id == evaluacionesPeal[i].id) {
            return true;
          }
        }
        return false;
      });
      if (puntajesPeal.length > 0) {
        const OkPuntajes = PuntajeDELETE(
          puntajesPeal.map((puntaje) => puntaje.colaborador_id),
          puntajesPeal.map((puntaje) => puntaje.evaluacion_id),
        );
        if (OkPuntajes) {
          OkPuntajes.then((data: dataPuntajeDelete) =>
            dispatch(
              setPuntajes(
                puntajes.filter((puntaje) => {
                  for (let i = 0; i < data.deleted_records.length; i++) {
                    if (
                      puntaje.colaborador_id ==
                        data.deleted_records[i].colaborador_id &&
                      puntaje.evaluacion_id ==
                        data.deleted_records[i].evaluacion_id
                    ) {
                      return false;
                    }
                  }
                  return true;
                }),
              ),
            ),
          );
        }
      }
      if (evaluacionesPeal.length > 0) {
        const OkEvaluacion = EvaluacionesDELETE(
          evaluacionesPeal.map((evaluacion) => evaluacion.id),
        );
        if (OkEvaluacion && evaluaciones) {
          OkEvaluacion.then((data: dataEvaluacionDelete) =>
            dispatch(
              setEvaluaciones(
                evaluaciones.filter((evaluacion) => {
                  for (let i = 0; i < data.deleted_ids.length; i++) {
                    if (evaluacion.id == data.deleted_ids[i]) {
                      return false;
                    }
                  }
                  return true;
                }),
              ),
            ),
          );
        }
      }
      if (colaboradoresPeal.length > 0) {
        const OkColaborador = ColaboradoresDELETE(
          colaboradoresPeal.map((colaborador) => colaborador.id),
        );
        if (OkColaborador && colaboradores) {
          OkColaborador.then((data: dataColaboradorDelete) =>
            dispatch(
              setColaboradores(
                colaboradores.filter((colaborador) => {
                  for (let i = 0; i < data.deleted_ids.length; i++) {
                    if (colaborador.id == data.deleted_ids[i]) {
                      return false;
                    }
                  }
                  return true;
                }),
              ),
            ),
          );
        }
      }
      const OkPeal = PealDELETE([pealSeleccionado.id]);
      if (OkPeal && peales) {
        OkPeal.then((data: dataPealDelete) =>
          dispatch(
            setPeales(
              peales.filter((peal) => {
                for (let i = 0; i < data.deleted_ids.length; i++) {
                  if (peal.id == data.deleted_ids[i]) {
                    return false;
                  }
                }
                return true;
              }),
            ),
          ),
        );
      }
    }
    if (type == "EVALUACION" && evaluacionSeleccionado && puntajes) {
      const puntajesEvaluacion = puntajes.filter(
        (puntaje) => puntaje.evaluacion_id == evaluacionSeleccionado.id,
      );
      if (puntajesEvaluacion.length > 0) {
        const OkPuntajes = PuntajeDELETE(
          puntajesEvaluacion.map((puntaje) => puntaje.colaborador_id),
          puntajesEvaluacion.map((puntaje) => puntaje.evaluacion_id),
        );
        if (OkPuntajes) {
          OkPuntajes.then((data: dataPuntajeDelete) =>
            dispatch(
              setPuntajes(
                puntajes.filter((puntaje) => {
                  for (let i = 0; i < data.deleted_records.length; i++) {
                    if (
                      puntaje.colaborador_id ==
                        data.deleted_records[i].colaborador_id &&
                      puntaje.evaluacion_id ==
                        data.deleted_records[i].evaluacion_id
                    ) {
                      return false;
                    }
                  }
                  return true;
                }),
              ),
            ),
          );
        }
      }
      const OkEvaluacion = EvaluacionesDELETE([evaluacionSeleccionado.id]);
      if (OkEvaluacion && evaluaciones) {
        OkEvaluacion.then((data: dataEvaluacionDelete) =>
          dispatch(
            setEvaluaciones(
              evaluaciones.filter((evaluacion) => {
                for (let i = 0; i < data.deleted_ids.length; i++) {
                  if (evaluacion.id == data.deleted_ids[i]) {
                    return false;
                  }
                }
                return true;
              }),
            ),
          ),
        );
      }
    }
    if (type == "PARTICIPANTESEVALUACION" && puntajeSeleccionado && puntajes) {
      const OkPuntajes = PuntajeDELETE(
        [puntajeSeleccionado.colaborador_id],
        [puntajeSeleccionado.evaluacion_id],
      );
      if (OkPuntajes) {
        OkPuntajes.then((data: dataPuntajeDelete) =>
          dispatch(
            setPuntajes(
              puntajes.filter((puntaje) => {
                for (let i = 0; i < data.deleted_records.length; i++) {
                  if (
                    puntaje.colaborador_id ==
                      data.deleted_records[i].colaborador_id &&
                    puntaje.evaluacion_id ==
                      data.deleted_records[i].evaluacion_id
                  ) {
                    return false;
                  }
                }
                return true;
              }),
            ),
          ),
        );
      }
    }
    dispatch(setActiveDelete(false));
  };

  return (
    <ModalBackground>
      <ModalCard>
        <Header>
          <TitleBox>
            <IconContainer>
              <Image src={WarningDeletePNG} alt="" width={25} height={25} />
            </IconContainer>
            <Title>{ESTAS_SEGURO}</Title>
            <SubTitle>
              {type == "COLABORADOR"
                ? SE_ELIMINARA_COLABORADOR
                : type == "PROYECTO"
                  ? SE_ELIMINARA_PEAL
                  : type == "EVALUACION"
                    ? SE_ELIMINARA_EVALUACION
                    : SE_ELIMINARA_PUNTAJE}
            </SubTitle>
          </TitleBox>
        </Header>
        <MainBox>
          <ButtonBox>
            <Button
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={() => handleOnClickCancel()}
            >
              <ButtonText hover={hoverButton}>{CANCELAR}</ButtonText>
            </Button>
          </ButtonBox>
          <ButtonBox>
            <Button
              onMouseEnter={() => setHoverButton2(true)}
              onMouseLeave={() => setHoverButton2(false)}
              onClick={() => handleOnClickEliminate()}
              warning
            >
              <ButtonText hover={hoverButton2} warning>
                {ELIMINAR}
              </ButtonText>
            </Button>
          </ButtonBox>
        </MainBox>
      </ModalCard>
    </ModalBackground>
  );
};

export { DeleteModal };
