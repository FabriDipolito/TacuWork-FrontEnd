import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonBox,
  ButtonText,
  Header,
  Input,
  InputBox,
  InputText,
  InputTitle,
  LeftBox,
  MainBox,
  ModalBackground,
  ModalCard,
  Photo,
  RightBox,
  SubTitle,
  Title,
  TitleBox,
} from "./styles";
import {
  COLABORADOR,
  COLABORADORES_MODAL,
  CREAR,
  EVALUACION_MODAL,
  EVALUAR,
  PROYECTO_MODAL,
  PUNTUACION_MODAL,
  PUNTUAR,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  clearModal,
  setActive,
  setAdaptacionCambio,
  setApellido,
  setBarrio,
  setComienzo,
  setComienzoEvaluacion,
  setComunicacion,
  setEdad,
  setEgresos,
  setFin,
  setHabilidadesRelacionales,
  setHijos,
  setLiderazgo,
  setNivelEducativo,
  setNombreColaborador,
  setNombreEvaluacion,
  setNombrePeal,
  setPealId,
  setPorcentajeAsistencia,
  setPresencia,
  setProactividad,
  setPuntualidad,
  setRendimientoLaboral,
  setResponsabilidad,
  setTelefono,
  setTrabajoEquipo,
} from "@redux/slices/modalSlice";
import { ColaboradorPOST } from "src/services/api/colaboradorPOST";
import { PealPOST } from "src/services/api/pealesPOST";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";
import { setColaboradores } from "@redux/slices/generalVariableSlice";
import { EvaluacionPOST } from "src/services/api/evaluacionesPOST";
import { PuntajePOST } from "src/services/api/puntajesPOST";
import { PuntajePUT } from "src/services/api/puntajesPUT";

interface modalProps {
  type: "COLABORADOR" | "PROYECTO" | "EVALUACION" | "PARTICIPANTESEVALUACION";
  peal_id?: number;
}

const Modal: React.FC<modalProps> = ({ type, peal_id }) => {
  const dispatch = useAppDispatch();

  // COLABORADOR
  const nombreColaborador = useAppSelector(
    (state) => state.modal.nombre_colaborador,
  );
  const apellidoColaborador = useAppSelector((state) => state.modal.apellido);
  const edad = useAppSelector((state) => state.modal.edad);
  const hijos = useAppSelector((state) => state.modal.hijos);
  const barrio = useAppSelector((state) => state.modal.barrio);
  const telefono = useAppSelector((state) => state.modal.telefono);
  const nivelEducativo = useAppSelector((state) => state.modal.nivel_educativo);
  const egresos = useAppSelector((state) => state.modal.egresos);
  const pealId = useAppSelector((state) => state.modal.peal_id);

  // PROYECTO
  const nombreProyecto = useAppSelector((state) => state.modal.nombre_peal);
  const comienzo = useAppSelector((state) => state.modal.comienzo);
  const fin = useAppSelector((state) => state.modal.fin);

  // EVALUACION
  const nombreEvaluacion = useAppSelector(
    (state) => state.modal.nombre_evaluacion,
  );
  const comienzoEvaluacion = useAppSelector(
    (state) => state.modal.comienzo_evaluacion,
  );

  // PARTICIPANTES EVALUACION
  const colaboradorPuntuar = useAppSelector(
    (state) => state.participantesEvaluacion.colaboradorSelected,
  );
  const evaluacionPuntuar = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
  );

  const adaptacionCambio = useAppSelector(
    (state) => state.modal.adaptacion_cambio,
  );
  const habilidadesRelacionales = useAppSelector(
    (state) => state.modal.habilidades_relacionales,
  );
  const comunicacion = useAppSelector((state) => state.modal.comunicacion);
  const liderazgo = useAppSelector((state) => state.modal.liderazgo);
  const proactividad = useAppSelector((state) => state.modal.proactividad);
  const presencia = useAppSelector((state) => state.modal.presencia);
  const puntualidad = useAppSelector((state) => state.modal.puntualidad);
  const porcentajeAsistencia = useAppSelector(
    (state) => state.modal.porcentaje_asistencia,
  );
  const trabajoEquipo = useAppSelector((state) => state.modal.trabajo_equipo);
  const responsabilidad = useAppSelector(
    (state) => state.modal.responsabilidad,
  );
  const rendimientoLaboral = useAppSelector(
    (state) => state.modal.rendimiento_laboral,
  );

  const puntaje = useAppSelector((state) => state.general.puntajes)?.find(
    (puntaje) =>
      puntaje.colaborador_id == colaboradorPuntuar?.id &&
      puntaje.evaluacion_id == evaluacionPuntuar?.id,
  );

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    dispatch(setAdaptacionCambio(puntaje?.adaptacion_al_cambio));
    dispatch(setHabilidadesRelacionales(puntaje?.habilidades_relacionales));
    dispatch(setComunicacion(puntaje?.comunicacion));
    dispatch(setLiderazgo(puntaje?.liderazgo));
    dispatch(setProactividad(puntaje?.proactividad));
    dispatch(setPresencia(puntaje?.presencia));
    dispatch(setPuntualidad(puntaje?.puntualidad));
    dispatch(setPorcentajeAsistencia(puntaje?.porcentaje_asistencia));
    dispatch(setTrabajoEquipo(puntaje?.trabajo_en_equipo));
    dispatch(setResponsabilidad(puntaje?.responsabilidades));
    dispatch(setRendimientoLaboral(puntaje?.rendimiento_laboral));
  }, []);

  const handleOnClick = () => {
    if (
      type == "COLABORADOR" &&
      nombreColaborador &&
      apellidoColaborador &&
      edad &&
      hijos &&
      barrio &&
      telefono &&
      nivelEducativo &&
      egresos &&
      pealId
    )
      ColaboradorPOST(
        nombreColaborador,
        apellidoColaborador,
        edad,
        hijos,
        barrio,
        telefono,
        nivelEducativo,
        egresos,
        pealId,
      );

    if (type == "PROYECTO" && nombreProyecto && comienzo && fin)
      PealPOST(nombreProyecto, comienzo, fin);

    if (
      type == "EVALUACION" &&
      nombreEvaluacion &&
      comienzoEvaluacion &&
      peal_id
    )
      EvaluacionPOST(
        nombreEvaluacion,
        comienzoEvaluacion,
        new Date().toString(),
        peal_id,
      );

    if (
      type == "PARTICIPANTESEVALUACION" &&
      colaboradorPuntuar &&
      evaluacionPuntuar &&
      (adaptacionCambio ||
        habilidadesRelacionales ||
        comunicacion ||
        liderazgo ||
        proactividad ||
        presencia ||
        puntualidad ||
        porcentajeAsistencia ||
        trabajoEquipo ||
        responsabilidad ||
        rendimientoLaboral)
    ) {
      if (puntaje) {
        PuntajePUT(
          colaboradorPuntuar.id,
          evaluacionPuntuar.id,
          adaptacionCambio,
          habilidadesRelacionales,
          comunicacion,
          liderazgo,
          proactividad,
          presencia,
          puntualidad,
          porcentajeAsistencia,
          trabajoEquipo,
          responsabilidad,
          rendimientoLaboral,
        );
      } else {
        PuntajePOST(
          colaboradorPuntuar.id,
          evaluacionPuntuar.id,
          adaptacionCambio,
          habilidadesRelacionales,
          comunicacion,
          liderazgo,
          proactividad,
          presencia,
          puntualidad,
          porcentajeAsistencia,
          trabajoEquipo,
          responsabilidad,
          rendimientoLaboral,
        );
      }
    }
    dispatch(setActive(false));
  };

  return (
    <ModalBackground>
      <ModalCard>
        <Header>
          <Photo />
          <TitleBox>
            <Title>
              {nombreColaborador} {apellidoColaborador}
            </Title>
            <SubTitle>{egresos}</SubTitle>
          </TitleBox>
        </Header>
        <MainBox>
          <LeftBox>
            {type == "COLABORADOR" ? (
              <>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[0]}</InputTitle>
                  <InputText
                    value={nombreColaborador}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNombreColaborador(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[2]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setEdad(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[4]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNivelEducativo(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[6]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setBarrio(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[8]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setPealId(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PROYECTO" ? (
              <>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[0]}</InputTitle>
                  <InputText
                    value={nombreProyecto}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNombrePeal(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[2]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setFin(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "EVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{EVALUACION_MODAL[0]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNombreEvaluacion(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PARTICIPANTESEVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[0]}</InputTitle>
                  <InputText
                    value={adaptacionCambio}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setAdaptacionCambio(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[2]}</InputTitle>
                  <InputText
                    value={comunicacion}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setComunicacion(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[4]}</InputTitle>
                  <InputText
                    value={proactividad}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setProactividad(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[6]}</InputTitle>
                  <InputText
                    value={puntualidad}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setPuntualidad(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[8]}</InputTitle>
                  <InputText
                    value={trabajoEquipo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setTrabajoEquipo(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[10]}</InputTitle>
                  <InputText
                    value={rendimientoLaboral}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setRendimientoLaboral(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
              </>
            ) : (
              <></>
            )}
          </LeftBox>
          <RightBox>
            {type == "COLABORADOR" ? (
              <>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[1]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setApellido(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[3]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setHijos(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[5]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setTelefono(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[7]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setEgresos(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PROYECTO" ? (
              <>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[1]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setComienzo(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "EVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{EVALUACION_MODAL[1]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setComienzoEvaluacion(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PARTICIPANTESEVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[1]}</InputTitle>
                  <InputText
                    value={habilidadesRelacionales}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setHabilidadesRelacionales(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[3]}</InputTitle>
                  <InputText
                    value={liderazgo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setLiderazgo(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[5]}</InputTitle>
                  <InputText
                    value={presencia}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setPresencia(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[7]}</InputTitle>
                  <InputText
                    value={porcentajeAsistencia}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setPorcentajeAsistencia(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[9]}</InputTitle>
                  <InputText
                    value={responsabilidad}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setResponsabilidad(
                          event.target.value as unknown as number,
                        ),
                      );
                    }}
                  />
                </InputBox>
              </>
            ) : (
              <></>
            )}
            <ButtonBox>
              <Button
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                onClick={() => handleOnClick()}
              >
                <ButtonText hover={hoverButton}>
                  {type == "EVALUACION"
                    ? EVALUAR
                    : type == "PARTICIPANTESEVALUACION"
                      ? PUNTUAR
                      : CREAR}
                </ButtonText>
              </Button>
            </ButtonBox>
          </RightBox>
        </MainBox>
      </ModalCard>
    </ModalBackground>
  );
};

export { Modal };
