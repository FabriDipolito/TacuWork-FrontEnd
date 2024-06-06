import React, { useEffect, useState } from "react";
import Image from "next/image";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  Button,
  ButtonBox,
  ButtonText,
  CloseModalContainer,
  DateSelect,
  FilterPlaceholder,
  Header,
  InputBox,
  InputText,
  InputTitle,
  LeftBox,
  MainBox,
  ModalBackground,
  ModalCard,
  Photo,
  RightBox,
  SelectOptions,
  SelectText,
  SubTitle,
  TextPhotoContianer,
  Title,
  TitleBox,
} from "./styles";
import {
  BUSCAR,
  COLABORADOR,
  COLABORADORES_MODAL,
  COLABORADORES_MODAL_EGRESOS,
  COLABORADORES_MODAL_NIVEL_EDUCATIVO,
  CREAR,
  EDITAR,
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
import { EvaluacionPOST } from "src/services/api/evaluacionesPOST";
import { PuntajePOST } from "src/services/api/puntajesPOST";
import { PuntajePUT } from "src/services/api/puntajesPUT";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import {
  setColaboradores,
  setEvaluaciones,
  setPeales,
  setPuntajes,
} from "@redux/slices/generalVariableSlice";
import {
  ColaboradorProps,
  EvaluacionProps,
  PealProps,
  PuntajeProps,
} from "@types";
import { ColaboradorPUT } from "src/services/api/colaboradorPUT";
import { setColaboradorPerfil } from "@redux/slices/perfilColaboradoresSlice";
import { PealPUT } from "src/services/api/pealesPUT";
import { setProyectoPerfil } from "@redux/slices/perfilProyectosSlice";
import { setEditEvaluacion } from "@redux/slices/evaluacionesSlice";
import { EvaluacionPUT } from "src/services/api/evaluacionesPUT";
import { setEditProyecto } from "@redux/slices/proyectosSlice";
import { setEditColaborador } from "@redux/slices/colaboradoresSlice";
import { CloseModalPNG } from "src/assests";
import { Avatar } from "@mui/material";
import NumberInputBasic from "../InputNumber/InputNumber";

interface modalProps {
  type: "COLABORADOR" | "PROYECTO" | "EVALUACION" | "PARTICIPANTESEVALUACION";
  edit?: boolean;
  peal_id?: number;
}

const Modal: React.FC<modalProps> = ({ type, edit, peal_id }) => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);

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

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  const colaboradorSeleccionado = useAppSelector(
    (state) => state.perfil.colaboradorSelected,
  );

  // PROYECTO
  const nombreProyecto = useAppSelector((state) => state.modal.nombre_peal);
  const comienzo = useAppSelector((state) => state.modal.comienzo);
  const fin = useAppSelector((state) => state.modal.fin);

  const pealSeleccionado = useAppSelector(
    (state) => state.perfilProyecto.pealSelected,
  );

  // EVALUACION
  const nombreEvaluacion = useAppSelector(
    (state) => state.modal.nombre_evaluacion,
  );
  const comienzoEvaluacion = useAppSelector(
    (state) => state.modal.comienzo_evaluacion,
  );

  const evaluacionSeleccionado = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
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

  const puntaje = puntajes?.find(
    (puntaje) =>
      puntaje.colaborador_id == colaboradorPuntuar?.id &&
      puntaje.evaluacion_id == evaluacionPuntuar?.id,
  );

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    if (edit && colaboradorSeleccionado) {
      dispatch(setNombreColaborador(colaboradorSeleccionado.nombre));
      dispatch(setApellido(colaboradorSeleccionado.apellido));
      dispatch(setEdad(colaboradorSeleccionado.edad));
      dispatch(setHijos(colaboradorSeleccionado.hijos));
      dispatch(setBarrio(colaboradorSeleccionado.zona_residencial));
      dispatch(setTelefono(colaboradorSeleccionado.telefono));
      dispatch(setNivelEducativo(colaboradorSeleccionado.nivel_educativo));
      dispatch(setEgresos(colaboradorSeleccionado.egresos));
      dispatch(setPealId(colaboradorSeleccionado.peal_id));
    }
    if (edit && pealSeleccionado) {
      dispatch(setNombrePeal(pealSeleccionado.nombre));
      dispatch(setComienzo(dayjs(pealSeleccionado.comienzo)));
      dispatch(setFin(dayjs(pealSeleccionado.fin)));
    }
    if (edit && evaluacionSeleccionado) {
      dispatch(setNombreEvaluacion(evaluacionSeleccionado.nombre));
      dispatch(setComienzoEvaluacion(dayjs(evaluacionSeleccionado.comienzo)));
    }
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
    ) {
      if (edit && colaboradorSeleccionado) {
        const OkColaboradores = ColaboradorPUT(
          colaboradorSeleccionado.id,
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
        if (OkColaboradores) {
          OkColaboradores.then((data) => {
            dispatch(
              setColaboradores(
                colaboradores?.map((colaborador) =>
                  (data as ColaboradorProps).id == colaborador.id
                    ? data
                    : colaborador,
                ),
              ),
            ),
              dispatch(setColaboradorPerfil(data));
          });
        }
      } else {
        const OkColaboradores = ColaboradorPOST(
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
        if (OkColaboradores) {
          const newArray = colaboradores;
          OkColaboradores.then((data) =>
            dispatch(setColaboradores(newArray?.concat([data]))),
          );
        }
      }
      dispatch(setEditColaborador(true));
    }
    if (type == "PROYECTO" && nombreProyecto && comienzo && fin) {
      if (edit && pealSeleccionado) {
        const OkPeal = PealPUT(
          pealSeleccionado.id,
          nombreProyecto,
          comienzo,
          fin,
        );
        if (OkPeal) {
          OkPeal.then((data) => {
            dispatch(
              setPeales(
                peales?.map((peal) =>
                  (data as PealProps).id == peal.id ? data : peal,
                ),
              ),
            ),
              dispatch(setProyectoPerfil(data));
          });
        }
      } else {
        const OkPeal = PealPOST(nombreProyecto, comienzo, fin);
        if (OkPeal) {
          const newArray = peales;
          OkPeal.then((data) => dispatch(setPeales(newArray?.concat([data]))));
        }
      }
      dispatch(setEditProyecto(true));
    }
    if (
      type == "EVALUACION" &&
      nombreEvaluacion &&
      comienzoEvaluacion &&
      peal_id
    ) {
      if (edit && evaluacionSeleccionado) {
        const OkEvaluacion = EvaluacionPUT(
          evaluacionSeleccionado.id,
          nombreEvaluacion,
          comienzoEvaluacion,
          dayjs(),
          peal_id,
        );
        if (OkEvaluacion) {
          OkEvaluacion.then((data) =>
            dispatch(
              setEvaluaciones(
                evaluaciones?.map((evaluacion) =>
                  (data as EvaluacionProps).id == evaluacion.id
                    ? data
                    : evaluacion,
                ),
              ),
            ),
          );
        }
      } else {
        const OkEvaluacion = EvaluacionPOST(
          nombreEvaluacion,
          comienzoEvaluacion,
          dayjs(),
          peal_id,
        );
        if (OkEvaluacion) {
          const newArray = evaluaciones;
          OkEvaluacion.then((data) =>
            dispatch(setEvaluaciones(newArray?.concat([data]))),
          );
        }
      }
      dispatch(setEditEvaluacion(true));
    }
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
        const OkPuntaje = PuntajePUT(
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
        if (OkPuntaje) {
          OkPuntaje.then((data) =>
            dispatch(
              setPuntajes(
                puntajes?.map((puntaje) =>
                  (data as PuntajeProps).colaborador_id ==
                    puntaje.colaborador_id &&
                  (data as PuntajeProps).evaluacion_id == puntaje.evaluacion_id
                    ? data
                    : puntaje,
                ),
              ),
            ),
          );
        }
      } else {
        const OkPuntaje = PuntajePOST(
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
        if (OkPuntaje) {
          const newArray = puntajes;
          OkPuntaje.then((data) =>
            dispatch(setPuntajes(newArray?.concat([data]))),
          );
        }
      }
    }
    dispatch(clearModal());
    dispatch(setActive(false));
  };

  function getColorByTypeAndString(str: string) {
    const hashCode = str
      .split("")
      .reduce((acc: number, char: string) => acc * char.charCodeAt(0), 1);
    const baseColor = `hsl(${hashCode % 360}, 70%, 50%)`;
    const color = `${baseColor.slice(0, -1)}, 80%)`;

    return color;
  }

  return (
    <ModalBackground>
      <ModalCard>
        <Header>
          {edit ? (
            <>
              <TextPhotoContianer>
                {type == "COLABORADOR" ? (
                  colaboradorSeleccionado?.imagen ? (
                    <Image
                      src={`data:image/jpeg;base64,${colaboradorSeleccionado?.imagen}`}
                      alt={colaboradorSeleccionado?.nombre || "Imagen"}
                      width={75}
                      height={70}
                      style={{
                        borderRadius: "11px",
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: getColorByTypeAndString(
                          colaboradorSeleccionado &&
                            colaboradorSeleccionado?.nombre &&
                            colaboradorSeleccionado?.apellido
                            ? `${colaboradorSeleccionado?.nombre[0]} ${colaboradorSeleccionado?.apellido[0]}`
                            : "black",
                        ),
                        width: 75,
                        height: 70,
                        borderRadius: "11px",
                      }}
                      variant="rounded"
                    >
                      {colaboradorSeleccionado &&
                      colaboradorSeleccionado?.nombre &&
                      colaboradorSeleccionado?.apellido
                        ? colaboradorSeleccionado?.nombre[0]
                        : ""}
                      {colaboradorSeleccionado &&
                      colaboradorSeleccionado?.nombre &&
                      colaboradorSeleccionado?.apellido
                        ? colaboradorSeleccionado?.apellido[0]
                        : ""}
                    </Avatar>
                  )
                ) : type == "PROYECTO" ? (
                  <Photo />
                ) : (
                  <Photo />
                )}
                <TitleBox>
                  <Title>
                    {type == "COLABORADOR"
                      ? `${nombreColaborador} ${apellidoColaborador}`
                      : type == "PROYECTO"
                        ? `${nombreProyecto}`
                        : `${nombreEvaluacion}`}
                  </Title>
                  <SubTitle>{!(type == "COLABORADOR") || egresos}</SubTitle>
                </TitleBox>
              </TextPhotoContianer>
              <div
                style={{
                  display: "flex",
                  height: "70px",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  paddingTop: "5px",
                }}
              >
                <CloseModalContainer
                  onClick={() => {
                    dispatch(clearModal());
                    dispatch(setActive(false));
                  }}
                >
                  <Image src={CloseModalPNG} alt="" width={16} height={16} />
                </CloseModalContainer>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                height: "fit-content",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <CloseModalContainer
                onClick={() => {
                  dispatch(clearModal());
                  dispatch(setActive(false));
                }}
              >
                <Image src={CloseModalPNG} alt="" width={16} height={16} />
              </CloseModalContainer>
            </div>
          )}
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
                  {NumberInputBasic(edad, "EDAD")}
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[4]}</InputTitle>
                  <SelectText
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    placeholder={!isFocused1 && !nivelEducativo}
                    defaultValue={
                      colaboradorSeleccionado && edit
                        ? colaboradorSeleccionado.nivel_educativo
                        : ""
                    }
                    onOpen={handleFocus1}
                    onClose={handleBlur1}
                    onChange={(event: SelectChangeEvent) => {
                      dispatch(setNivelEducativo(event.target.value as string));
                    }}
                    startAdornment={
                      isFocused1 || nivelEducativo ? (
                        <></>
                      ) : (
                        <>
                          <FilterPlaceholder>{BUSCAR}</FilterPlaceholder>
                        </>
                      )
                    }
                  >
                    {COLABORADORES_MODAL_NIVEL_EDUCATIVO?.map((name) => (
                      <SelectOptions key={name} value={name}>
                        {name}
                      </SelectOptions>
                    ))}
                  </SelectText>
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[6]}</InputTitle>
                  <InputText
                    value={barrio}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setBarrio(event.target.value));
                    }}
                  />
                </InputBox>
                {edit || (
                  <InputBox>
                    <InputTitle>{COLABORADORES_MODAL[8]}</InputTitle>
                    <SelectText
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      placeholder={!isFocused3 && !pealId}
                      defaultValue={
                        colaboradorSeleccionado && edit
                          ? colaboradorSeleccionado.peal_id
                          : ""
                      }
                      onOpen={handleFocus3}
                      onClose={handleBlur3}
                      onChange={(event: SelectChangeEvent) => {
                        dispatch(
                          setPealId(event.target.value as unknown as number),
                        );
                      }}
                      startAdornment={
                        isFocused3 || pealId ? (
                          <></>
                        ) : (
                          <>
                            <FilterPlaceholder>{BUSCAR}</FilterPlaceholder>
                          </>
                        )
                      }
                    >
                      {peales?.map((peal) => (
                        <SelectOptions key={peal.id} value={peal.id}>
                          {peal.nombre}
                        </SelectOptions>
                      ))}
                    </SelectText>
                  </InputBox>
                )}
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateSelect
                      value={fin}
                      onChange={(newDate) => dispatch(setFin(newDate))}
                    />
                  </LocalizationProvider>
                </InputBox>
              </>
            ) : type == "EVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{EVALUACION_MODAL[0]}</InputTitle>
                  <InputText
                    value={nombreEvaluacion}
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
                  {NumberInputBasic(adaptacionCambio, "ADAPTACION")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[2]}</InputTitle>
                  {NumberInputBasic(comunicacion, "COMUNICACION")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[4]}</InputTitle>
                  {NumberInputBasic(proactividad, "PROACTIVIDAD")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[6]}</InputTitle>
                  {NumberInputBasic(puntualidad, "PUNTUALIDAD")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[8]}</InputTitle>
                  {NumberInputBasic(trabajoEquipo, "TRABAJOEQUIPO")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[10]}</InputTitle>
                  {NumberInputBasic(rendimientoLaboral, "RENDIMIENTO")}
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
                    value={apellidoColaborador}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setApellido(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[3]}</InputTitle>
                  {NumberInputBasic(hijos, "HIJOS")}
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[5]}</InputTitle>
                  <InputText
                    value={telefono}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setTelefono(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[7]}</InputTitle>
                  <SelectText
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    placeholder={!isFocused2 && !egresos}
                    defaultValue={
                      colaboradorSeleccionado && edit
                        ? colaboradorSeleccionado.egresos
                        : ""
                    }
                    onOpen={handleFocus2}
                    onClose={handleBlur2}
                    onChange={(event: SelectChangeEvent) => {
                      dispatch(setEgresos(event.target.value as string));
                    }}
                    startAdornment={
                      isFocused2 || egresos ? (
                        <></>
                      ) : (
                        <>
                          <FilterPlaceholder>{BUSCAR}</FilterPlaceholder>
                        </>
                      )
                    }
                  >
                    {COLABORADORES_MODAL_EGRESOS?.map((name) => (
                      <SelectOptions key={name} value={name}>
                        {name}
                      </SelectOptions>
                    ))}
                  </SelectText>
                </InputBox>
              </>
            ) : type == "PROYECTO" ? (
              <>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[1]}</InputTitle>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateSelect
                      value={comienzo}
                      onChange={(newDate) => dispatch(setComienzo(newDate))}
                    />
                  </LocalizationProvider>
                </InputBox>
              </>
            ) : type == "EVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{EVALUACION_MODAL[1]}</InputTitle>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateSelect
                      value={comienzoEvaluacion}
                      onChange={(newDate) =>
                        dispatch(setComienzoEvaluacion(newDate))
                      }
                    />
                  </LocalizationProvider>
                </InputBox>
              </>
            ) : type == "PARTICIPANTESEVALUACION" ? (
              <>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[1]}</InputTitle>
                  {NumberInputBasic(habilidadesRelacionales, "HABILIDADES")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[3]}</InputTitle>
                  {NumberInputBasic(liderazgo, "LIDERAZGO")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[5]}</InputTitle>
                  {NumberInputBasic(presencia, "PRESENCIA")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[7]}</InputTitle>
                  {NumberInputBasic(porcentajeAsistencia, "ASISTENCIA")}
                </InputBox>
                <InputBox>
                  <InputTitle>{PUNTUACION_MODAL[9]}</InputTitle>
                  {NumberInputBasic(responsabilidad, "RESPONSABILIDAD")}
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
                      : edit
                        ? EDITAR
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
