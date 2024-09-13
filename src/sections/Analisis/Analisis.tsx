import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import Image from "next/image";
import {
  AnalisisContainer,
  HeaderCard,
  MainCardContainer,
  SearchBar,
  SearchBarTextField,
  SubHeaderCard,
  PageLink,
  Separator,
  GraphsContainer,
  RadarButtonContainer,
  SelectRadar,
  SelectOptions,
  ChipSelect,
  CheckboxSelect,
  ButtonsRadarContainer,
  ButtonRadar,
  LineTitleContainer,
  LeftGraphContainer,
  LineTitle,
  PromedioContainer,
  PromedioCard,
  PromedioTitleContainer,
  PromedioTitle,
  PromedioTextContainer,
  PromedioText,
  PromedioTextSubsContainer,
  LabelPromedioText,
  ColaboradoresAddButton,
  ButtonText,
  AutocompleteContainer,
} from "./styles";
import {
  BUSCAR_PEAL,
  BUSCAR_TRABAJADOR,
  CARACTERISTICAS_DESTACADAS,
  COMPARACION,
  INDIVIDUAL,
  NUEVO_REPORTE,
  PROMEDIO,
  PROMEDIO_GENERAL,
  PROMEDIO_POR_EVALUACION,
  PROYECTOS,
  TRABAJADORES,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  ColaboradorProps,
  EvaluacionProps,
  PealProps,
  PuntajeProps,
} from "@types";
import {
  setCaracteristicaMejor,
  setCaracteristicaPeor,
  setLineData,
  setLinkSelected,
  setModalActive,
  setPrimerPealSelected,
  setPromedioGeneral,
  setPromedioGeneral2,
  setProyectoPealSelected,
  setRadarData,
  setRadarKey,
  setSegundoPealSelected,
  setTrabajadorSelected,
} from "@redux/slices/analisisSlice";
import {
  Box,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import {
  calcularPromedioPuntajes,
  combineLineDataAndPuntajes,
  combineRadarDataAndPuntajes,
  obtenerExtremosPuntajes,
} from "./funciones";
import { AddButtonPNG, AddButtonSelectedPNG } from "src/assests";
import { ModalPDF } from "./ModalPdf/ModalPdf";

const AnalisisPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);

  const linkSeleccionado = useAppSelector(
    (state) => state.analisis.linkSelected,
  );
  const trabajadorSeleccionado = useAppSelector(
    (state) => state.analisis.trabajadorSelected,
  );
  const proyectoPealSeleccionado = useAppSelector(
    (state) => state.analisis.proyectoPealSelected,
  );
  const primerPealSeleccionado = useAppSelector(
    (state) => state.analisis.primerPealSelected,
  );
  const segundoPealSeleccionado = useAppSelector(
    (state) => state.analisis.segundoPealSelected,
  );
  const modalActive = useAppSelector((state) => state.analisis.modalActive);
  const [hoverButton, setHoverButton] = useState(false);

  // Radar Grafico

  const ResponsiveRadar = dynamic<any>(
    () => import("@nivo/radar").then((m) => m.ResponsiveRadar),
    { loading: () => <p>Loading...</p>, ssr: false },
  );
  //const ResponsiveRadar = require("@nivo/radar");

  const radarData = useAppSelector((state) => state.analisis.radarData);
  const keyArray = useAppSelector((state) => state.analisis.keyArray);

  const [evaluacionesRadar1, setEvaluacionesRadar1] = React.useState<
    (EvaluacionProps | undefined)[] | undefined
  >([]);
  const [evaluacionesRadarSelected1, setEvaluacionesRadarSelected1] =
    React.useState<(string | undefined)[] | undefined>([]);
  const [evaluacionesRadar2, setEvaluacionesRadar2] = React.useState<
    (EvaluacionProps | undefined)[] | undefined
  >([]);
  const [evaluacionesRadarSelected2, setEvaluacionesRadarSelected2] =
    React.useState<(string | undefined)[] | undefined>([]);
  const [typeButton, setTypeButton] = React.useState<"INDIVIDUAL" | "PROMEDIO">(
    "INDIVIDUAL",
  );
  // Radar Grafico

  //Line Grafico

  const ResponsiveLine = dynamic<any>(
    () => import("@nivo/line").then((m) => m.ResponsiveLine),
    { loading: () => <p>Loading...</p>, ssr: false },
  );

  const lineData = useAppSelector((state) => state.analisis.lineData);
  // Line Grafico

  // Promedio Grafico
  const promedioGeneral = useAppSelector(
    (state) => state.analisis.promedioGeneral,
  );
  const promedioGeneral2 = useAppSelector(
    (state) => state.analisis.promedioGeneral2,
  );
  const caracteristicaMejor = useAppSelector(
    (state) => state.analisis.caracteristicaMejor,
  );
  const caracteristicaPeor = useAppSelector(
    (state) => state.analisis.caracteristicaPeor,
  );
  // Promedio Grafico

  useEffect(() => {
    if (linkSeleccionado == "TRABAJADOR") {
      const puntajesTrabajador = puntajes?.filter(
        (puntaje) =>
          puntaje.colaborador_id == trabajadorSeleccionado?.id &&
          puntaje.adaptacion_al_cambio &&
          puntaje.comunicacion &&
          puntaje.habilidades_relacionales &&
          puntaje.liderazgo &&
          puntaje.porcentaje_asistencia &&
          puntaje.presencia &&
          puntaje.proactividad &&
          puntaje.puntualidad &&
          puntaje.rendimiento_laboral &&
          puntaje.responsabilidades &&
          puntaje.trabajo_en_equipo,
      );

      const evaluacionesParaLosPuntajes = puntajesTrabajador
        ?.map((puntaje) => {
          return evaluaciones?.find(
            (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
          );
        })
        .filter((evaluacion) => evaluacion !== undefined)
        .sort((a, b) => (a && b ? a.id - b.id : 0));

      // Radar Graph
      setEvaluacionesRadar1(evaluacionesParaLosPuntajes);
      setEvaluacionesRadarSelected1(
        evaluacionesParaLosPuntajes?.map((evaluacion) => evaluacion?.nombre),
      );
      // Radar Graph

      // Line Graph
      const array = combineLineDataAndPuntajes(
        puntajesTrabajador,
        evaluacionesParaLosPuntajes,
        linkSeleccionado,
        trabajadorSeleccionado,
        proyectoPealSeleccionado,
        primerPealSeleccionado,
        segundoPealSeleccionado,
      );

      dispatch(setLineData(array));
      // Line Graph

      // Promedio Graph
      const puntajesPromedio = calcularPromedioPuntajes(puntajesTrabajador);

      dispatch(
        setPromedioGeneral(
          puntajesPromedio.map(
            (puntaje) => obtenerExtremosPuntajes(puntaje, true) as number,
          )[0],
        ),
      );
      dispatch(
        setCaracteristicaMejor(
          puntajesPromedio.map(
            (puntaje) =>
              (
                obtenerExtremosPuntajes(puntaje, false) as {
                  nombre: string;
                  valor: number;
                }[]
              )[0],
          )[0],
        ),
      );
      dispatch(
        setCaracteristicaPeor(
          puntajesPromedio.map(
            (puntaje) =>
              (
                obtenerExtremosPuntajes(puntaje, false) as {
                  nombre: string;
                  valor: number;
                }[]
              )[1],
          )[0],
        ),
      );
      // Promedio Graph
    }
    if (linkSeleccionado == "PROYECTO") {
      const puntajesProyecto = puntajes?.filter((puntaje) => {
        if (
          puntaje.adaptacion_al_cambio &&
          puntaje.comunicacion &&
          puntaje.habilidades_relacionales &&
          puntaje.liderazgo &&
          puntaje.porcentaje_asistencia &&
          puntaje.presencia &&
          puntaje.proactividad &&
          puntaje.puntualidad &&
          puntaje.rendimiento_laboral &&
          puntaje.responsabilidades &&
          puntaje.trabajo_en_equipo
        ) {
          if (
            evaluaciones?.find(
              (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
            )?.peal_id == proyectoPealSeleccionado?.id
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      const evaluacionIds =
        puntajesProyecto?.map((puntaje) => puntaje.evaluacion_id) || [];
      const uniqueEvaluacionIds = Array.from(new Set(evaluacionIds));
      const evaluacionesParaProyecto = uniqueEvaluacionIds.map((evaluacionId) =>
        evaluaciones?.find((evaluacion) => evaluacion.id === evaluacionId),
      );

      // Radar Graph
      setEvaluacionesRadar1(evaluacionesParaProyecto);
      setEvaluacionesRadarSelected1(
        evaluacionesParaProyecto?.map((evaluacion) => evaluacion?.nombre),
      );
      // Radar Graph

      // Line Graph
      const array = combineLineDataAndPuntajes(
        puntajesProyecto,
        evaluacionesParaProyecto,
        linkSeleccionado,
        trabajadorSeleccionado,
        proyectoPealSeleccionado,
        primerPealSeleccionado,
        segundoPealSeleccionado,
      );

      dispatch(setLineData(array));
      // Line Graph

      // Promedio Graph
      const puntajesPromedio = calcularPromedioPuntajes(puntajesProyecto);

      dispatch(setLineData(array));
      dispatch(
        setPromedioGeneral(
          puntajesPromedio.map(
            (puntaje) => obtenerExtremosPuntajes(puntaje, true) as number,
          )[0],
        ),
      );
      dispatch(
        setCaracteristicaMejor(
          puntajesPromedio.map(
            (puntaje) =>
              (
                obtenerExtremosPuntajes(puntaje, false) as {
                  nombre: string;
                  valor: number;
                }[]
              )[0],
          )[0],
        ),
      );
      dispatch(
        setCaracteristicaPeor(
          puntajesPromedio.map(
            (puntaje) =>
              (
                obtenerExtremosPuntajes(puntaje, false) as {
                  nombre: string;
                  valor: number;
                }[]
              )[1],
          )[0],
        ),
      );
      // Promedio Graph
    }
    if (linkSeleccionado == "COMPARACION") {
      const puntajesPrimerProyecto = puntajes?.filter((puntaje) => {
        if (
          puntaje.adaptacion_al_cambio &&
          puntaje.comunicacion &&
          puntaje.habilidades_relacionales &&
          puntaje.liderazgo &&
          puntaje.porcentaje_asistencia &&
          puntaje.presencia &&
          puntaje.proactividad &&
          puntaje.puntualidad &&
          puntaje.rendimiento_laboral &&
          puntaje.responsabilidades &&
          puntaje.trabajo_en_equipo
        ) {
          if (
            evaluaciones?.find(
              (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
            )?.peal_id == primerPealSeleccionado?.id
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      const primerEvaluacionIds =
        puntajesPrimerProyecto?.map((puntaje) => puntaje.evaluacion_id) || [];
      const uniquePrimerEvaluacionIds = Array.from(
        new Set(primerEvaluacionIds),
      );
      const evaluacionesParaPrimerProyecto = uniquePrimerEvaluacionIds.map(
        (evaluacionId) =>
          evaluaciones?.find((evaluacion) => evaluacion.id === evaluacionId),
      );

      const puntajesSegundoProyecto = puntajes?.filter((puntaje) => {
        if (
          puntaje.adaptacion_al_cambio &&
          puntaje.comunicacion &&
          puntaje.habilidades_relacionales &&
          puntaje.liderazgo &&
          puntaje.porcentaje_asistencia &&
          puntaje.presencia &&
          puntaje.proactividad &&
          puntaje.puntualidad &&
          puntaje.rendimiento_laboral &&
          puntaje.responsabilidades &&
          puntaje.trabajo_en_equipo
        ) {
          if (
            evaluaciones?.find(
              (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
            )?.peal_id == segundoPealSeleccionado?.id
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      const segundoEvaluacionIds =
        puntajesSegundoProyecto?.map((puntaje) => puntaje.evaluacion_id) || [];
      const uniqueSegundoEvaluacionIds = Array.from(
        new Set(segundoEvaluacionIds),
      );
      const evaluacionesParaSegundoProyecto = uniqueSegundoEvaluacionIds.map(
        (evaluacionId) =>
          evaluaciones?.find((evaluacion) => evaluacion.id === evaluacionId),
      );

      // Radar Graph
      setEvaluacionesRadar1(evaluacionesParaPrimerProyecto);
      setEvaluacionesRadarSelected1(
        evaluacionesParaPrimerProyecto?.map((evaluacion) => evaluacion?.nombre),
      );

      setEvaluacionesRadar2(evaluacionesParaSegundoProyecto);
      setEvaluacionesRadarSelected2(
        evaluacionesParaSegundoProyecto?.map(
          (evaluacion) => evaluacion?.nombre,
        ),
      );
      // Radar Graph

      // Line Graph
      const cantidadEvaluaciones =
        evaluacionesParaPrimerProyecto.length >
        evaluacionesParaSegundoProyecto.length
          ? evaluacionesParaPrimerProyecto.length
          : evaluacionesParaPrimerProyecto.length <
              evaluacionesParaSegundoProyecto.length
            ? evaluacionesParaSegundoProyecto.length
            : evaluacionesParaPrimerProyecto.length;

      const array1 = combineLineDataAndPuntajes(
        puntajesPrimerProyecto,
        evaluacionesParaPrimerProyecto,
        linkSeleccionado,
        trabajadorSeleccionado,
        proyectoPealSeleccionado,
        primerPealSeleccionado,
        segundoPealSeleccionado,
        true,
        cantidadEvaluaciones,
        evaluacionesParaSegundoProyecto,
      );

      const array2 = combineLineDataAndPuntajes(
        puntajesSegundoProyecto,
        evaluacionesParaSegundoProyecto,
        linkSeleccionado,
        trabajadorSeleccionado,
        proyectoPealSeleccionado,
        primerPealSeleccionado,
        segundoPealSeleccionado,
        false,
        cantidadEvaluaciones,
        evaluacionesParaPrimerProyecto,
      );

      dispatch(
        setLineData(
          primerPealSeleccionado
            ? segundoPealSeleccionado
              ? array1.concat(array2)
              : array1
            : segundoPealSeleccionado
              ? array2
              : [],
        ),
      );
      // Line Graph

      // Promedio Graph
      const puntajesPromedioPrimerProyecto = calcularPromedioPuntajes(
        puntajesPrimerProyecto,
      );

      const puntajesPromedioSegundoProyecto = calcularPromedioPuntajes(
        puntajesSegundoProyecto,
      );

      dispatch(
        setPromedioGeneral(
          puntajesPromedioPrimerProyecto.map(
            (puntaje) => obtenerExtremosPuntajes(puntaje, true) as number,
          )[0],
        ),
      );

      dispatch(
        setPromedioGeneral2(
          puntajesPromedioSegundoProyecto.map(
            (puntaje) => obtenerExtremosPuntajes(puntaje, true) as number,
          )[0],
        ),
      );
      // Promedio Graph
    }
  }, [
    linkSeleccionado,
    trabajadorSeleccionado,
    proyectoPealSeleccionado,
    primerPealSeleccionado,
    segundoPealSeleccionado,
  ]);

  useEffect(() => {
    if (linkSeleccionado == "TRABAJADOR") {
      const puntajesTrabajador = evaluacionesRadar1
        ?.filter((evaluacion) => {
          return evaluacionesRadarSelected1?.find(
            (evalaucionSeleccionada) =>
              evalaucionSeleccionada == evaluacion?.nombre,
          );
        }) // Filtre las evaluaciones del Select
        .map((evaluacionSeleccionada) => {
          return puntajes?.find(
            (puntaje) =>
              puntaje.colaborador_id == trabajadorSeleccionado?.id &&
              puntaje.evaluacion_id == evaluacionSeleccionada?.id,
          );
        });
      let puntajesPromedio;
      if (typeButton == "PROMEDIO") {
        puntajesPromedio = calcularPromedioPuntajes(puntajesTrabajador);
      }
      const newRadarData = combineRadarDataAndPuntajes(
        radarData,
        typeButton == "PROMEDIO" ? puntajesPromedio : puntajesTrabajador,
        typeButton == "INDIVIDUAL" ? false : true,
        false,
        evaluaciones,
        primerPealSeleccionado,
        segundoPealSeleccionado,
      );
      dispatch(setRadarData(newRadarData));
      dispatch(
        setRadarKey(
          typeButton == "PROMEDIO"
            ? (puntajesPromedio as PuntajeProps[]).length != 0
              ? ["Promedio"]
              : []
            : (evaluacionesRadarSelected1 as string[]),
        ),
      );
    }
    if (linkSeleccionado == "PROYECTO") {
      const arrayPuntajesPorEvaluacion = evaluacionesRadar1
        ?.filter((evaluacion) => {
          return evaluacionesRadarSelected1?.find(
            (evalaucionSeleccionada) =>
              evalaucionSeleccionada == evaluacion?.nombre,
          );
        }) // Filtre las evaluaciones del Select
        .map((evaluacionSeleccionada) => {
          return puntajes?.filter((puntaje) => {
            return (
              puntaje.evaluacion_id == evaluacionSeleccionada?.id &&
              puntaje.adaptacion_al_cambio &&
              puntaje.comunicacion &&
              puntaje.habilidades_relacionales &&
              puntaje.liderazgo &&
              puntaje.porcentaje_asistencia &&
              puntaje.presencia &&
              puntaje.proactividad &&
              puntaje.puntualidad &&
              puntaje.rendimiento_laboral &&
              puntaje.responsabilidades &&
              puntaje.trabajo_en_equipo
            );
          });
        });
      const puntajesProyecto = arrayPuntajesPorEvaluacion?.map(
        (arrayPuntajes) => calcularPromedioPuntajes(arrayPuntajes)[0],
      );
      let puntajesPromedio;
      if (typeButton == "PROMEDIO") {
        puntajesPromedio = calcularPromedioPuntajes(puntajesProyecto);
      }
      const newRadarData = combineRadarDataAndPuntajes(
        radarData,
        typeButton == "PROMEDIO" ? puntajesPromedio : puntajesProyecto,
        typeButton == "INDIVIDUAL" ? false : true,
        false,
        evaluaciones,
        primerPealSeleccionado,
        segundoPealSeleccionado,
      );
      dispatch(setRadarData(newRadarData));
      dispatch(
        setRadarKey(
          typeButton == "PROMEDIO"
            ? (puntajesPromedio as PuntajeProps[]).length != 0
              ? ["Promedio"]
              : []
            : (evaluacionesRadarSelected1 as string[]),
        ),
      );
    }
    if (linkSeleccionado == "COMPARACION") {
      const arrayPrimerPuntajesPorEvaluacion = evaluacionesRadar1
        ?.filter((evaluacion) => {
          return evaluacionesRadarSelected1?.find(
            (evalaucionSeleccionada) =>
              evalaucionSeleccionada == evaluacion?.nombre,
          );
        }) // Filtre las evaluaciones del Select
        .map((evaluacionSeleccionada) => {
          return puntajes?.filter((puntaje) => {
            return (
              puntaje.evaluacion_id == evaluacionSeleccionada?.id &&
              puntaje.adaptacion_al_cambio &&
              puntaje.comunicacion &&
              puntaje.habilidades_relacionales &&
              puntaje.liderazgo &&
              puntaje.porcentaje_asistencia &&
              puntaje.presencia &&
              puntaje.proactividad &&
              puntaje.puntualidad &&
              puntaje.rendimiento_laboral &&
              puntaje.responsabilidades &&
              puntaje.trabajo_en_equipo
            );
          });
        });
      const arraySegundoPuntajesPorEvaluacion = evaluacionesRadar2
        ?.filter((evaluacion) => {
          return evaluacionesRadarSelected2?.find(
            (evalaucionSeleccionada) =>
              evalaucionSeleccionada == evaluacion?.nombre,
          );
        }) // Filtre las evaluaciones del Select
        .map((evaluacionSeleccionada) => {
          return puntajes?.filter((puntaje) => {
            return (
              puntaje.evaluacion_id == evaluacionSeleccionada?.id &&
              puntaje.adaptacion_al_cambio &&
              puntaje.comunicacion &&
              puntaje.habilidades_relacionales &&
              puntaje.liderazgo &&
              puntaje.porcentaje_asistencia &&
              puntaje.presencia &&
              puntaje.proactividad &&
              puntaje.puntualidad &&
              puntaje.rendimiento_laboral &&
              puntaje.responsabilidades &&
              puntaje.trabajo_en_equipo
            );
          });
        });
      const puntajesPrimerProyecto = arrayPrimerPuntajesPorEvaluacion?.map(
        (arrayPuntajes) => calcularPromedioPuntajes(arrayPuntajes)[0],
      );
      const puntajesSegundoProyecto = arraySegundoPuntajesPorEvaluacion?.map(
        (arrayPuntajes) => calcularPromedioPuntajes(arrayPuntajes)[0],
      );
      let puntajesPrimerPromedio;
      let puntajesSegundoPromedio;
      if (typeButton == "PROMEDIO") {
        puntajesPrimerPromedio = calcularPromedioPuntajes(
          puntajesPrimerProyecto,
        );
      }
      if (typeButton == "PROMEDIO") {
        puntajesSegundoPromedio = calcularPromedioPuntajes(
          puntajesSegundoProyecto,
        );
      }
      const newRadarData = combineRadarDataAndPuntajes(
        radarData,
        typeButton == "PROMEDIO"
          ? puntajesPrimerPromedio?.concat(puntajesSegundoPromedio || [])
          : puntajesPrimerProyecto?.concat(puntajesSegundoProyecto || []),
        typeButton == "INDIVIDUAL" ? false : true,
        true,
        evaluaciones,
        primerPealSeleccionado,
        segundoPealSeleccionado,
      );

      dispatch(setRadarData(newRadarData));
      dispatch(
        setRadarKey(
          typeButton == "PROMEDIO"
            ? (puntajesPrimerPromedio as PuntajeProps[]).length == 0
              ? (puntajesSegundoPromedio as PuntajeProps[]).length == 0
                ? []
                : [`${segundoPealSeleccionado?.nombre}: Promedio`]
              : (puntajesSegundoPromedio as PuntajeProps[]).length == 0
                ? [`${primerPealSeleccionado?.nombre}: Promedio`]
                : [
                    `${primerPealSeleccionado?.nombre}: Promedio`,
                    `${segundoPealSeleccionado?.nombre}: Promedio`,
                  ]
            : (evaluacionesRadarSelected1 as string[])
                .map(
                  (evaluacionNombre) =>
                    `${primerPealSeleccionado?.nombre}: ${evaluacionNombre}`,
                )
                .concat(
                  (evaluacionesRadarSelected2 as string[]).map(
                    (evaluacionNombre) =>
                      `${segundoPealSeleccionado?.nombre}: ${evaluacionNombre}`,
                  ),
                ),
        ),
      );
    }
  }, [evaluacionesRadarSelected1, evaluacionesRadarSelected2, typeButton]);

  const handleChangeSelectRadar1 = (
    event: SelectChangeEvent<typeof evaluacionesRadarSelected1>,
  ) => {
    const {
      target: { value },
    } = event;
    setEvaluacionesRadarSelected1(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleChangeSelectRadar2 = (
    event: SelectChangeEvent<typeof evaluacionesRadarSelected2>,
  ) => {
    const {
      target: { value },
    } = event;
    setEvaluacionesRadarSelected2(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <AnalisisContainer>
      <MainCardContainer>
        <HeaderCard>
          <PageLink
            onClick={() => dispatch(setLinkSelected("TRABAJADOR"))}
            selected={linkSeleccionado == "TRABAJADOR"}
          >
            {TRABAJADORES}
          </PageLink>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PROYECTO"))}
            selected={linkSeleccionado == "PROYECTO"}
          >
            {PROYECTOS}
          </PageLink>
          <PageLink
            onClick={() => dispatch(setLinkSelected("COMPARACION"))}
            selected={linkSeleccionado == "COMPARACION"}
          >
            {COMPARACION}
          </PageLink>
        </HeaderCard>
        <SubHeaderCard>
          <AutocompleteContainer>
            {linkSeleccionado == "TRABAJADOR" && (
              <SearchBar
                options={colaboradores ? colaboradores : []}
                getOptionLabel={(option: any) =>
                  `${option.nombre} ${option.apellido}`
                }
                defaultValue={trabajadorSeleccionado}
                renderInput={(params) => (
                  <SearchBarTextField
                    {...params}
                    label={
                      trabajadorSeleccionado
                        ? `${trabajadorSeleccionado?.nombre} ${trabajadorSeleccionado?.apellido}`
                        : BUSCAR_TRABAJADOR
                    }
                    variant="outlined"
                    margin="normal"
                  />
                )}
                renderOption={(props: any, option, state) => (
                  <div
                    {...props}
                    style={{ width: "100%" }}
                    onClick={() => {
                      dispatch(
                        setTrabajadorSelected(option as ColaboradorProps),
                      );
                    }}
                  >
                    {`${(option as ColaboradorProps).nombre} ${(option as ColaboradorProps).apellido}`}
                  </div>
                )}
              />
            )}
            {linkSeleccionado == "PROYECTO" && (
              <SearchBar
                options={peales ? peales : []}
                getOptionLabel={(option: any) => `${option.nombre}`}
                defaultValue={proyectoPealSeleccionado}
                renderInput={(params) => (
                  <SearchBarTextField
                    {...params}
                    label={
                      proyectoPealSeleccionado
                        ? proyectoPealSeleccionado?.nombre
                        : BUSCAR_PEAL
                    }
                    variant="outlined"
                    margin="normal"
                  />
                )}
                renderOption={(props: any, option, state) => (
                  <div
                    {...props}
                    style={{ width: "100%" }}
                    onClick={() => {
                      dispatch(setProyectoPealSelected(option as PealProps));
                    }}
                  >
                    {(option as PealProps).nombre}
                  </div>
                )}
              />
            )}
            {linkSeleccionado == "COMPARACION" && (
              <>
                <SearchBar
                  options={peales ? peales : []}
                  getOptionLabel={(option: any) => `${option.nombre}`}
                  defaultValue={primerPealSeleccionado}
                  renderInput={(params) => (
                    <SearchBarTextField
                      {...params}
                      label={
                        primerPealSeleccionado
                          ? primerPealSeleccionado?.nombre
                          : BUSCAR_PEAL
                      }
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                  renderOption={(props: any, option, state) => (
                    <div
                      {...props}
                      style={{ width: "100%" }}
                      onClick={() => {
                        dispatch(setPrimerPealSelected(option as PealProps));
                      }}
                    >
                      {(option as PealProps).nombre}
                    </div>
                  )}
                />
                <Separator>/</Separator>
                <SearchBar
                  options={peales ? peales : []}
                  getOptionLabel={(option: any) => `${option.nombre}`}
                  defaultValue={segundoPealSeleccionado}
                  renderInput={(params) => (
                    <SearchBarTextField
                      {...params}
                      label={
                        segundoPealSeleccionado
                          ? segundoPealSeleccionado?.nombre
                          : BUSCAR_PEAL
                      }
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                  renderOption={(props: any, option, state) => (
                    <div
                      {...props}
                      style={{ width: "100%" }}
                      onClick={() => {
                        dispatch(setSegundoPealSelected(option as PealProps));
                      }}
                    >
                      {(option as PealProps).nombre}
                    </div>
                  )}
                />
              </>
            )}
          </AutocompleteContainer>
          <ColaboradoresAddButton
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            onClick={() => dispatch(setModalActive(true))}
          >
            <Image
              src={hoverButton ? AddButtonSelectedPNG : AddButtonPNG}
              height={14}
              width={14}
              alt=""
            />
            <ButtonText hover={hoverButton}>{NUEVO_REPORTE}</ButtonText>
          </ColaboradoresAddButton>
        </SubHeaderCard>
        <GraphsContainer>
          <LeftGraphContainer>
            <PromedioContainer>
              <PromedioCard
                promedio
                comparacion={linkSeleccionado == "COMPARACION"}
              >
                <PromedioTitleContainer>
                  <PromedioTitle>{PROMEDIO_GENERAL}</PromedioTitle>
                </PromedioTitleContainer>
                <PromedioTextContainer>
                  {linkSeleccionado == "COMPARACION" || (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <div style={{ height: "18px", width: "100%" }}></div>
                      <PromedioText type="NORMAL">
                        {promedioGeneral ? promedioGeneral.toFixed(2) : "-"}
                      </PromedioText>
                    </div>
                  )}
                  {!(linkSeleccionado == "COMPARACION") || (
                    <>
                      <PromedioTextSubsContainer
                        style={{ borderRight: "1px solid rgba(0, 0, 0, 0.1)" }}
                      >
                        <LabelPromedioText type="NORMAL">
                          {primerPealSeleccionado?.nombre}
                        </LabelPromedioText>
                        <PromedioText type="NORMAL">
                          {promedioGeneral ? promedioGeneral.toFixed(2) : "-"}
                        </PromedioText>
                      </PromedioTextSubsContainer>
                      <PromedioTextSubsContainer>
                        <LabelPromedioText type="NORMAL">
                          {segundoPealSeleccionado?.nombre}
                        </LabelPromedioText>
                        <PromedioText type="NORMAL">
                          {promedioGeneral2 ? promedioGeneral2.toFixed(2) : "-"}
                        </PromedioText>
                      </PromedioTextSubsContainer>
                    </>
                  )}
                </PromedioTextContainer>
              </PromedioCard>
              {linkSeleccionado == "COMPARACION" || (
                <PromedioCard>
                  <PromedioTitleContainer>
                    <PromedioTitle>{CARACTERISTICAS_DESTACADAS}</PromedioTitle>
                  </PromedioTitleContainer>
                  <PromedioTextContainer>
                    <PromedioTextSubsContainer
                      style={{ borderRight: "1px solid rgba(0, 0, 0, 0.1)" }}
                    >
                      {caracteristicaMejor ? (
                        <LabelPromedioText type="MEJOR">
                          {caracteristicaMejor.nombre}
                        </LabelPromedioText>
                      ) : (
                        <div style={{ height: "18px", width: "100%" }}></div>
                      )}
                      <PromedioText
                        type={caracteristicaMejor ? "MEJOR" : "NORMAL"}
                      >
                        {caracteristicaMejor
                          ? caracteristicaMejor.valor.toFixed(2)
                          : "-"}
                      </PromedioText>
                    </PromedioTextSubsContainer>
                    <PromedioTextSubsContainer>
                      {caracteristicaPeor ? (
                        <LabelPromedioText type="PEOR">
                          {caracteristicaPeor.nombre}
                        </LabelPromedioText>
                      ) : (
                        <div style={{ height: "18px", width: "100%" }}></div>
                      )}
                      <PromedioText
                        type={caracteristicaPeor ? "PEOR" : "NORMAL"}
                      >
                        {caracteristicaPeor
                          ? caracteristicaPeor.valor.toFixed(2)
                          : "-"}
                      </PromedioText>
                    </PromedioTextSubsContainer>
                  </PromedioTextContainer>
                </PromedioCard>
              )}
            </PromedioContainer>
            <div
              style={{
                boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
                width: "100%",
                height: "60%",
                borderRadius: "16px",
              }}
            >
              <LineTitleContainer>
                <LineTitle>{PROMEDIO_POR_EVALUACION}</LineTitle>
              </LineTitleContainer>
              <div
                style={{
                  width: "100%",
                  height: "calc(100% - 48px)",
                }}
              >
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 10, right: 40, bottom: 40, left: 70 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: 0,
                    max: 10,
                    stacked: false,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Promedio",
                    legendOffset: -40,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                  }}
                  pointSize={3}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  enableArea={true}
                  areaOpacity={0.1}
                  enableTouchCrosshair={true}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "top-left",
                      direction: "row",
                      justify: false,
                      translateX: 10,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 205,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                    },
                  ]}
                />
              </div>
            </div>
          </LeftGraphContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
              width: "50%",
              height: "100%",
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                width: "600px",
                height: "calc(100% - 32px)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <ResponsiveRadar
                data={radarData}
                keys={keyArray}
                indexBy="criterio"
                valueFormat=" >-.2f"
                maxValue={10}
                margin={{ top: 0, right: 80, bottom: 0, left: 80 }}
                borderColor={{ from: "color", modifiers: [] }}
                gridLevels={10}
                gridLabelOffset={12}
                dotSize={4}
                dotColor={{ theme: "background" }}
                dotBorderWidth={2}
                dotBorderColor={{ from: "color", modifiers: [] }}
                colors={{ scheme: "nivo" }}
                blendMode="multiply"
                motionConfig="wobbly"
              />
            </div>
            <RadarButtonContainer>
              <SelectRadar
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                comparacion={linkSeleccionado == "COMPARACION"}
                multiple
                value={evaluacionesRadarSelected1}
                onChange={handleChangeSelectRadar1}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: any) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <ChipSelect key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      width: 250,
                      maxHeight: "150px",
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#888 transparent",
                    },
                  },
                }}
              >
                {evaluacionesRadar1
                  ?.map((evaluacion) => evaluacion?.nombre)
                  ?.map((name) => (
                    <SelectOptions key={name} value={name}>
                      <CheckboxSelect
                        checked={
                          evaluacionesRadarSelected1?.find(
                            (nombre) => nombre == name,
                          )
                            ? true
                            : false
                        }
                      />
                      <ListItemText primary={name} />
                    </SelectOptions>
                  ))}
              </SelectRadar>
              {linkSeleccionado !== "COMPARACION" || (
                <SelectRadar
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  comparacion={linkSeleccionado == "COMPARACION"}
                  multiple
                  value={evaluacionesRadarSelected2}
                  onChange={handleChangeSelectRadar2}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected: any) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <ChipSelect key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        width: 250,
                        maxHeight: "150px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#888 transparent",
                      },
                    },
                  }}
                >
                  {evaluacionesRadar2
                    ?.map((evaluacion) => evaluacion?.nombre)
                    ?.map((name) => (
                      <SelectOptions key={name} value={name}>
                        <CheckboxSelect
                          checked={
                            evaluacionesRadarSelected2?.find(
                              (nombre) => nombre == name,
                            )
                              ? true
                              : false
                          }
                        />
                        <ListItemText primary={name} />
                      </SelectOptions>
                    ))}
                </SelectRadar>
              )}
              <ButtonsRadarContainer>
                <ButtonRadar
                  focused={typeButton == "INDIVIDUAL"}
                  onClick={() => setTypeButton("INDIVIDUAL")}
                >
                  {INDIVIDUAL}
                </ButtonRadar>
                <ButtonRadar
                  promedio
                  focused={typeButton == "PROMEDIO"}
                  onClick={() => setTypeButton("PROMEDIO")}
                >
                  {PROMEDIO}
                </ButtonRadar>
              </ButtonsRadarContainer>
            </RadarButtonContainer>
          </div>
        </GraphsContainer>
      </MainCardContainer>
      {!modalActive || <ModalPDF type={linkSeleccionado} />}
    </AnalisisContainer>
  );
};
export default AnalisisPage;
