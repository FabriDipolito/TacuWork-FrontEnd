import React, { ReactNode, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  ColumnContainer,
  DateSelect,
  DeleteTrashContainer,
  EditPencilContainer,
  FilterText,
  Footer,
  FooterText,
  Header,
  InputBox,
  InputTitle,
  SearchBar,
  SearchText,
  SelectOptions,
  SeparatorBox,
  SeparatorContainer,
  SeparatorText,
  StyledSelect,
  TBody,
  TD,
  TH,
  THead,
  TRow,
  Table,
  TableDiv,
} from "./styles";
import Image from "next/image";
import {
  EditPencilHoverPNG,
  EditPencilPNG,
  FilterSelectIconPNG,
  GroupFilterSelectIconPNG,
  SearchSelectIconPNG,
  TrashDeleteButtonPNG,
} from "src/assests";
import { Avatar, InputAdornment, SelectChangeEvent } from "@mui/material";
import {
  A_MOSTRAR,
  BUSCAR,
  COLABORADORES,
  COLABORADOR_FILTER,
  COLABORADOR_TAGS,
  COMIENZO,
  EVALUACIONES,
  EVALUACION_FILTER,
  EVALUACION_TAGS,
  FILTRO,
  FINALIZACION,
  GRUPO,
  PARTICIPANTES_EVALUACION_FILTER,
  PARTICIPANTES_EVALUACION_TAGS,
  PROYECTOS,
  PROYECTO_FILTER,
  PROYECTO_PARTICIPANTES_TAGS,
  PROYECTO_TAGS,
  ROMAN_ICONS,
} from "@constants";
import { ColaboradorProps, EvaluacionProps, PealProps } from "@types";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setComienzoFilterSelected,
  setFilter,
  setFilterArray,
  setFilterSelected,
  setFinalizacionFilterSelected,
  setGroupFilter,
  setGroupFilterSelected,
  setSearchFilterSelected,
} from "@redux/slices/searchBoxSlice";
import { clearModal, setActive } from "@redux/slices/modalSlice";
import { StateTag } from "../StateTag/StateTag";
import {
  setColaboradorSelected,
  setEvaluacionSelected,
  setPealSelected,
  setPuntajes,
} from "@redux/slices/participantesEvaluacionSlice";
import { useRouter } from "next/router";
import { setColaboradorPerfil } from "@redux/slices/perfilColaboradoresSlice";
import { setProyectoPerfil } from "@redux/slices/perfilProyectosSlice";
import {
  setActiveDelete,
  setColaborador,
  setEvaluacion,
  setPeal,
  setPuntaje,
} from "@redux/slices/modalDeleteSlice";
import { setEditColaborador } from "@redux/slices/colaboradoresSlice";
import { setEditProyecto } from "@redux/slices/proyectosSlice";
import { setEditEvaluacion } from "@redux/slices/evaluacionesSlice";
import {
  FaCat,
  FaDog,
  FaFish,
  FaSpider,
  FaHorse,
  FaFrog,
  FaDragon,
  FaHippo,
  FaOtter,
  FaCrow,
} from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(utc);

interface SearchBoxProps {
  type?: "COLABORADOR" | "PROYECTO" | "EVALUACION" | "PARTICIPANTESEVALUACION";
  array?: Array<ColaboradorProps> | Array<PealProps> | Array<EvaluacionProps>;
  participantesProyecto?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  type,
  array,
  participantesProyecto = false,
}) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.searchBox.filter);
  const filterSelected = useAppSelector(
    (state) => state.searchBox.filterSelected,
  );
  const groupFilter = useAppSelector((state) => state.searchBox.groupFilter);
  const groupFilterSelected = useAppSelector(
    (state) => state.searchBox.groupFilterSelected,
  );
  const searchFilterSelected = useAppSelector(
    (state) => state.searchBox.searchFilterSelected,
  );
  const searchComienzoFilterSelected = useAppSelector(
    (state) => state.searchBox.comienzoFilter,
  );
  const searchFinalizacionFilterSelected = useAppSelector(
    (state) => state.searchBox.finalizacionFilter,
  );
  const filterArray = useAppSelector((state) => state.searchBox.filterArray);
  const pealParticipantes = useAppSelector(
    (state) => state.participantesEvaluacion.pealSelected,
  );

  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);
  const allPuntajes = useAppSelector((state) => state.general.puntajes);
  const evaluacionSelected = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
  );
  const icons = [
    FaCat,
    FaDog,
    FaFish,
    FaSpider,
    FaHorse,
    FaFrog,
    FaDragon,
    FaHippo,
    FaOtter,
    FaCrow,
  ];

  useEffect(() => {
    dispatch(setFilterArray(array));
  }, [array]);

  useEffect(() => {
    dispatch(setFilterSelected(undefined));
    dispatch(setGroupFilterSelected(undefined));
    dispatch(setSearchFilterSelected(undefined));
    dispatch(setComienzoFilterSelected(undefined));
    dispatch(setFinalizacionFilterSelected(undefined));
    if (type == "COLABORADOR") {
      dispatch(setFilter(COLABORADOR_FILTER));
      dispatch(setGroupFilter(peales?.map((peal) => peal.nombre)));
    }
    if (type == "PROYECTO") {
      dispatch(setFilter(PROYECTO_FILTER));
    }
    if (type == "EVALUACION") {
      dispatch(setFilter(EVALUACION_FILTER));
    }
    if (type == "PARTICIPANTESEVALUACION")
      dispatch(setFilter(PARTICIPANTES_EVALUACION_FILTER));
  }, []);

  useEffect(() => {
    // Verifica si filterSelected está definido y realiza el ordenamiento
    const newArray = [
      ...(array as
        | Array<ColaboradorProps>
        | Array<PealProps>
        | Array<EvaluacionProps>),
    ];

    if (type == "COLABORADOR") {
      if (
        filterSelected !== undefined ||
        groupFilterSelected !== undefined ||
        searchFilterSelected !== undefined ||
        searchComienzoFilterSelected?.isValid() ||
        searchFinalizacionFilterSelected?.isValid()
      ) {
        (newArray as Array<ColaboradorProps>)?.sort((a, b) => {
          switch (filterSelected) {
            case "Nombre de A a Z":
              return a.nombre.localeCompare(b.nombre);
            case "Nombre de Z a A":
              return b.nombre.localeCompare(a.nombre);
            case "Apellido de A a Z":
              return a.apellido.localeCompare(b.apellido);
            case "Apellido de Z a A":
              return b.apellido.localeCompare(a.apellido);
            case "Activos":
              return a.egresos === "Activo" ? -1 : 1;
            case "Inactivos":
              return a.egresos !== "Activo" ? -1 : 1;
            default:
              return 0; // No hagas nada si filterSelected no coincide con ninguna opción
          }
        });
        dispatch(
          setFilterArray(
            (newArray as Array<ColaboradorProps>)
              ?.filter((object) =>
                groupFilterSelected
                  ? peales?.find((peal) => peal.nombre == groupFilterSelected)
                      ?.id == object.peal_id
                  : true,
              )
              .filter((object) => {
                const objectComienzo = dayjs.utc(object.comienzo);
                const objectFinalizacion = object.finalizacion
                  ? dayjs.utc(object.finalizacion)
                  : null;

                const filterComienzo = searchComienzoFilterSelected?.isValid()
                  ? searchComienzoFilterSelected
                  : null;
                const filterFinalizacion =
                  searchFinalizacionFilterSelected?.isValid()
                    ? searchFinalizacionFilterSelected
                    : null;

                // Si no hay ambos filtros de fecha, devolver todos los objetos
                if (!filterComienzo && !filterFinalizacion) {
                  return true;
                }

                // Si solo hay filtro de comienzo, considerar intervalo [filterComienzo, infinito]
                if (filterComienzo && !filterFinalizacion) {
                  return (
                    objectComienzo.isSame(filterComienzo) ||
                    objectComienzo.isAfter(filterComienzo)
                  );
                }

                // Si solo hay filtro de finalización, considerar intervalo [-infinito, filterFinalizacion]
                if (!filterComienzo && filterFinalizacion) {
                  if (objectFinalizacion) {
                    return (
                      objectFinalizacion.isSame(filterFinalizacion) ||
                      objectFinalizacion.isBefore(filterFinalizacion)
                    );
                  } else {
                    return false;
                  }
                }

                // Si hay ambos filtros
                if (filterComienzo && filterFinalizacion) {
                  // Verificar si objectFinalizacion no es null
                  if (objectFinalizacion) {
                    return (
                      (objectComienzo.isSame(filterComienzo) ||
                        objectComienzo.isAfter(filterComienzo)) &&
                      (objectFinalizacion.isSame(filterFinalizacion) ||
                        objectFinalizacion.isBefore(filterFinalizacion))
                    );
                  } else {
                    return false;
                  }
                }
                return false;
              })
              ?.filter((object) =>
                searchFilterSelected
                  ? object.nombre
                      .toLowerCase()
                      .includes(searchFilterSelected.toLowerCase()) ||
                    object.apellido
                      .toLowerCase()
                      .includes(searchFilterSelected.toLowerCase()) ||
                    `${object.nombre.toLowerCase()} ${object.apellido.toLowerCase()}`.includes(
                      searchFilterSelected.toLowerCase(),
                    )
                  : true,
              ),
          ),
        );
      }
    }

    if (type === "PROYECTO") {
      if (filterSelected !== undefined || searchFilterSelected !== undefined) {
      }
      (newArray as Array<PealProps>).sort((a, b) => {
        switch (filterSelected) {
          case "Nombre de A a Z":
            return a.nombre.localeCompare(b.nombre);
          case "Nombre de Z a A":
            return b.nombre.localeCompare(a.nombre);
          case "Más Reciente":
            return (
              new Date(b.comienzo).getTime() - new Date(a.comienzo).getTime()
            );
          case "Menos Reciente":
            return (
              new Date(a.comienzo).getTime() - new Date(b.comienzo).getTime()
            );
          case "Más Participantes":
            if (colaboradores) {
              return (
                colaboradores.filter(
                  (colaborador) => colaborador.peal_id === b.id,
                ).length -
                colaboradores.filter(
                  (colaborador) => colaborador.peal_id === a.id,
                ).length
              );
            } else {
              return 0;
            }
          case "Menos Participantes":
            if (colaboradores) {
              return (
                colaboradores.filter(
                  (colaborador) => colaborador.peal_id === a.id,
                ).length -
                colaboradores.filter(
                  (colaborador) => colaborador.peal_id === b.id,
                ).length
              );
            } else {
              return 0;
            }
          default:
            return 0;
        }
      });
      dispatch(
        setFilterArray(
          (newArray as Array<PealProps>)?.filter((object) =>
            searchFilterSelected
              ? object.nombre
                  .toLowerCase()
                  .includes(searchFilterSelected.toLowerCase())
              : true,
          ),
        ),
      );
    }

    if (type === "EVALUACION") {
      if (
        filterSelected !== undefined ||
        groupFilterSelected !== undefined ||
        searchFilterSelected !== undefined
      ) {
        (newArray as Array<EvaluacionProps>).sort((a, b) => {
          switch (filterSelected) {
            case "Nombre de A a Z":
              return a.nombre.localeCompare(b.nombre);
            case "Nombre de Z a A":
              return b.nombre.localeCompare(a.nombre);
            case "Más Reciente":
              return (
                new Date(b.comienzo).getTime() - new Date(a.comienzo).getTime()
              );
            case "Menos Reciente":
              return (
                new Date(a.comienzo).getTime() - new Date(b.comienzo).getTime()
              );
            case "Evaluados":
              if (puntajes) {
                return puntajes
                  ?.filter((puntaje) => {
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
                      if (puntaje.evaluacion_id == b.id) {
                        return true;
                      } else {
                        return false;
                      }
                    } else {
                      return false;
                    }
                  })
                  .length.toString()
                  .localeCompare(
                    puntajes
                      ?.filter((puntaje) => {
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
                          if (puntaje.evaluacion_id == a.id) {
                            return true;
                          } else {
                            return false;
                          }
                        } else {
                          return false;
                        }
                      })
                      .length.toString(),
                  );
              } else {
                return 0;
              }
            case "Falta Evaluar":
              if (puntajes) {
                return puntajes
                  ?.filter((puntaje) => {
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
                      if (puntaje.evaluacion_id == a.id) {
                        return true;
                      } else {
                        return false;
                      }
                    } else {
                      return false;
                    }
                  })
                  .length.toString()
                  .localeCompare(
                    puntajes
                      ?.filter((puntaje) => {
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
                          if (puntaje.evaluacion_id == b.id) {
                            return true;
                          } else {
                            return false;
                          }
                        } else {
                          return false;
                        }
                      })
                      .length.toString(),
                  );
              } else {
                return 0;
              }
            case "Actualizados":
              return (
                new Date(b.ultima_actualizacion).getTime() -
                new Date(a.ultima_actualizacion).getTime()
              );
            case "Desactualizados":
              return (
                new Date(a.ultima_actualizacion).getTime() -
                new Date(b.ultima_actualizacion).getTime()
              );
            default:
              return 0;
          }
        });
        dispatch(
          setFilterArray(
            (newArray as Array<EvaluacionProps>)?.filter((object) =>
              searchFilterSelected
                ? object.nombre
                    .toLowerCase()
                    .includes(searchFilterSelected.toLowerCase())
                : true,
            ),
          ),
        );
      }
    }

    if (type == "PARTICIPANTESEVALUACION") {
      if (
        filterSelected !== undefined ||
        groupFilterSelected !== undefined ||
        searchFilterSelected !== undefined
      ) {
        (newArray as Array<ColaboradorProps>)?.sort((a, b) => {
          switch (filterSelected) {
            case "Nombre de A a Z":
              return a.nombre.localeCompare(b.nombre);
            case "Nombre de Z a A":
              return b.nombre.localeCompare(a.nombre);
            case "Apellido de A a Z":
              return a.apellido.localeCompare(b.apellido);
            case "Apellido de Z a A":
              return b.apellido.localeCompare(a.apellido);
            case "Mayor Promedio":
              const promedioA = calcularPromedioYEstado("PROMEDIO", a);
              const promedioB = calcularPromedioYEstado("PROMEDIO", b);

              if (promedioA === "-" && promedioB === "-") return 0;
              if (promedioA === "-") return 1;
              if (promedioB === "-") return -1;
              return (
                (promedioB as unknown as number) -
                (promedioA as unknown as number)
              );
            case "Menor Promedio":
              const promedioC = calcularPromedioYEstado("PROMEDIO", a);
              const promedioD = calcularPromedioYEstado("PROMEDIO", b);

              if (promedioC === "-" && promedioD === "-") return 0;
              if (promedioC === "-") return 1;
              if (promedioD === "-") return -1;
              return (
                (promedioC as unknown as number) -
                (promedioD as unknown as number)
              );
            case "Evaluados":
              const estadoA = calcularPromedioYEstado("ESTADO", a) as
                | "EVALUADO"
                | "PENDIENTE"
                | "SIN EVALUAR";
              const estadoB = calcularPromedioYEstado("ESTADO", b) as
                | "EVALUADO"
                | "PENDIENTE"
                | "SIN EVALUAR";
              const prioridadEstado: Record<
                "EVALUADO" | "PENDIENTE" | "SIN EVALUAR",
                number
              > = {
                EVALUADO: 1,
                PENDIENTE: 2,
                "SIN EVALUAR": 3,
              };

              return prioridadEstado[estadoA] - prioridadEstado[estadoB];
            case "Sin Evaluar":
              const estadoC = calcularPromedioYEstado("ESTADO", a) as
                | "EVALUADO"
                | "PENDIENTE"
                | "SIN EVALUAR";
              const estadoD = calcularPromedioYEstado("ESTADO", b) as
                | "EVALUADO"
                | "PENDIENTE"
                | "SIN EVALUAR";
              const prioridadEstadoSinEvaluar: Record<
                "EVALUADO" | "PENDIENTE" | "SIN EVALUAR",
                number
              > = {
                "SIN EVALUAR": 1,
                PENDIENTE: 2,
                EVALUADO: 3,
              };

              return (
                prioridadEstadoSinEvaluar[estadoC] -
                prioridadEstadoSinEvaluar[estadoD]
              );
            default:
              return 0; // No hagas nada si filterSelected no coincide con ninguna opción
          }
        });
        dispatch(
          setFilterArray(
            (newArray as Array<ColaboradorProps>)?.filter((object) =>
              searchFilterSelected
                ? object.nombre
                    .toLowerCase()
                    .includes(searchFilterSelected.toLowerCase()) ||
                  object.apellido
                    .toLowerCase()
                    .includes(searchFilterSelected.toLowerCase()) ||
                  `${object.nombre.toLowerCase()} ${object.apellido.toLowerCase()}`.includes(
                    searchFilterSelected.toLowerCase(),
                  )
                : true,
            ),
          ),
        );
      }
    }
  }, [
    filterSelected,
    groupFilterSelected,
    searchFilterSelected,
    searchComienzoFilterSelected,
    searchFinalizacionFilterSelected,
    pealParticipantes,
    array,
    puntajes,
  ]);

  const handleChangeFilter = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode,
  ) => {
    dispatch(setFilterSelected(event.target.value as string));
  };

  const handleChangeGroupFilter = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode,
  ) => {
    dispatch(setGroupFilterSelected(event.target.value as string));
  };

  const handleColaboradorClick = (colaborador: ColaboradorProps) => {
    dispatch(setColaboradorPerfil(colaborador));
    router.push("/Colaboradores/Perfil");
  };

  const handlePealClick = (peal: PealProps) => {
    dispatch(setProyectoPerfil(peal));
    router.push("/Proyectos/Perfil");
  };

  const handleEvaluacionClick = (evaluacion: EvaluacionProps) => {
    dispatch(setEvaluacionSelected(evaluacion));
    dispatch(
      setPealSelected(peales?.find((peal) => peal.id == evaluacion.peal_id)),
    );
    dispatch(
      setPuntajes(
        allPuntajes?.filter(
          (puntaje) => puntaje.evaluacion_id == evaluacion.id,
        ),
      ),
    );
    router.push("/Evaluaciones/Participantes");
  };

  const handleParticipantesEvaluacionClick = (
    colaborador: ColaboradorProps,
  ) => {
    dispatch(setActive(true));
    dispatch(setColaboradorSelected(colaborador));
  };

  const calcularPromedioYEstado = (
    type: "PROMEDIO" | "ESTADO",
    colaborador: ColaboradorProps,
  ) => {
    const puntaje = allPuntajes?.find(
      (puntaje) =>
        puntaje.colaborador_id == colaborador.id &&
        puntaje.evaluacion_id == evaluacionSelected?.id,
    );
    if (puntaje) {
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
        if (type == "PROMEDIO") {
          return `${(
            (puntaje.adaptacion_al_cambio +
              puntaje.comunicacion +
              puntaje.habilidades_relacionales +
              puntaje.liderazgo +
              puntaje.porcentaje_asistencia / 10 +
              puntaje.presencia +
              puntaje.proactividad +
              puntaje.puntualidad +
              puntaje.rendimiento_laboral +
              puntaje.responsabilidades +
              puntaje.trabajo_en_equipo) /
            11
          ).toFixed(2)}`;
        }
        if (type == "ESTADO") return "EVALUADO";
      }
      if (type == "PROMEDIO") return "-";
      if (type == "ESTADO") return "PENDIENTE";
    }
    if (type == "PROMEDIO") return "-";
    return "SIN EVALUAR";
  };

  function calcularDiferenciaFechas(fechaString: string) {
    const fechaIngresada = new Date(fechaString);
    const fechaActual = new Date();
    const diferenciaMiliSegundos =
      fechaActual.getTime() - fechaIngresada.getTime();

    const milisegundosEnUnMes = 1000 * 60 * 60 * 24 * 30.44;
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;

    const meses = Math.floor(diferenciaMiliSegundos / milisegundosEnUnMes);
    const años = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    const dias = Math.floor(
      (diferenciaMiliSegundos % milisegundosEnUnMes) / milisegundosEnUnDia,
    );

    if (años > 0) {
      return `${años} ${años === 1 ? "año" : "años"} y ${mesesRestantes} ${meses === 1 ? "mes" : "meses"}`;
    } else if (meses > 0) {
      return `${meses} ${meses === 1 ? "mes" : "meses"}`;
    } else {
      return `${dias} ${dias === 1 ? "día" : "días"}`;
    }
  }

  function getColorByTypeAndString(str: string) {
    const hashCode = str
      .split("")
      .reduce((acc: number, char: string) => acc * char.charCodeAt(0), 1);
    const baseColor = `hsl(${hashCode % 360}, 70%, 50%)`;
    const color = `${baseColor.slice(0, -1)}, 80%)`;

    return color;
  }

  interface randomProps {
    id: number;
  }

  const RandomIcon: React.FC<randomProps> = ({ id }) => {
    const IconComponent = icons[id % icons.length];
    return <IconComponent size={25} />;
  };

  const RomanIcon = (ids: number[], id: number) => {
    const index = ids.indexOf(id);
    if (index === -1) {
      return "!";
    }
    const romanNumeral = ROMAN_ICONS[index % ROMAN_ICONS.length];
    return romanNumeral;
  };

  return (
    <ColumnContainer>
      <SeparatorContainer>
        <Header>
          <StyledSelect
            startAdornment={
              filterSelected ? (
                <></>
              ) : (
                <>
                  <InputAdornment position="start">
                    <Image
                      src={FilterSelectIconPNG}
                      alt=""
                      width={11}
                      height={12}
                    />
                  </InputAdornment>
                  <FilterText>{FILTRO}</FilterText>
                </>
              )
            }
            value={filterSelected}
            onChange={handleChangeFilter}
          >
            {filter?.map((string: string) => (
              <SelectOptions key={string} value={string}>
                <FilterText option selected={filterSelected ? true : false}>
                  {string}
                </FilterText>
              </SelectOptions>
            ))}
          </StyledSelect>
          {type == "COLABORADOR" && !participantesProyecto ? (
            <StyledSelect
              startAdornment={
                groupFilterSelected ? (
                  <></>
                ) : (
                  <>
                    <InputAdornment position="start">
                      <Image
                        src={GroupFilterSelectIconPNG}
                        alt=""
                        width={14}
                        height={14}
                      />
                    </InputAdornment>
                    <FilterText>{GRUPO}</FilterText>
                  </>
                )
              }
              value={groupFilterSelected}
              onChange={handleChangeGroupFilter}
            >
              {groupFilter?.map((string: string) => (
                <SelectOptions key={string} value={string}>
                  <FilterText
                    option
                    selected={groupFilterSelected ? true : false}
                  >
                    {string}
                  </FilterText>
                </SelectOptions>
              ))}
            </StyledSelect>
          ) : type == "COLABORADOR" && participantesProyecto ? (
            <>
              <InputBox style={{ marginLeft: "2px" }}>
                <InputTitle>{COMIENZO}</InputTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateSelect
                    value={searchComienzoFilterSelected}
                    onChange={(newDate) =>
                      dispatch(setComienzoFilterSelected(newDate))
                    }
                  />
                </LocalizationProvider>
              </InputBox>
              <SeparatorBox>
                <SeparatorText>-</SeparatorText>
              </SeparatorBox>
              <InputBox>
                <InputTitle>{FINALIZACION}</InputTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateSelect
                    value={searchFinalizacionFilterSelected}
                    onChange={(newDate) =>
                      dispatch(setFinalizacionFilterSelected(newDate))
                    }
                  />
                </LocalizationProvider>
              </InputBox>
            </>
          ) : (
            <></>
          )}
          <SearchBar
            InputProps={{
              startAdornment:
                focused || searchFilterSelected ? (
                  <></>
                ) : (
                  <>
                    <InputAdornment position="start">
                      <Image
                        src={SearchSelectIconPNG}
                        alt=""
                        width={14}
                        height={14}
                      />
                    </InputAdornment>
                    <SearchText>{BUSCAR}</SearchText>
                  </>
                ),
              autoComplete: "off",
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearchFilterSelected(event.target.value));
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </Header>
        <TableDiv>
          <Table>
            <THead>
              <TRow subHeader>
                <TH firstColumn></TH>
                {type == "COLABORADOR"
                  ? participantesProyecto
                    ? PROYECTO_PARTICIPANTES_TAGS.map((tag) => (
                        <TH key={tag}>{tag}</TH>
                      ))
                    : COLABORADOR_TAGS.map((tag) => <TH key={tag}>{tag}</TH>)
                  : type == "PROYECTO"
                    ? PROYECTO_TAGS.map((tag) => <TH key={tag}>{tag}</TH>)
                    : type == "EVALUACION"
                      ? EVALUACION_TAGS.map((tag) => <TH key={tag}>{tag}</TH>)
                      : PARTICIPANTES_EVALUACION_TAGS.map((tag) => (
                          <TH key={tag}>{tag}</TH>
                        ))}
              </TRow>
            </THead>
            <TBody>
              {type == "COLABORADOR"
                ? (filterArray as Array<ColaboradorProps>)?.map((object) => (
                    <TRow key={object.id}>
                      <TD firstColumn>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px",
                            width: "fit-content",
                            height: "100%",
                          }}
                        >
                          {participantesProyecto || (
                            <DeleteTrashContainer
                              onClick={() => {
                                dispatch(setColaborador(object));
                                dispatch(setActiveDelete(true));
                              }}
                            >
                              <Image
                                src={TrashDeleteButtonPNG}
                                alt=""
                                width={13}
                                height={13}
                              />
                            </DeleteTrashContainer>
                          )}
                          {object.imagen ? (
                            <Image
                              src={`data:image/jpeg;base64,${object.imagen}`}
                              alt={object?.nombre || "Imagen"}
                              width={33}
                              height={33}
                              style={{
                                borderRadius: "11px",
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                bgcolor: getColorByTypeAndString(
                                  object && object?.nombre && object?.apellido
                                    ? `${object?.nombre[0]} ${object?.apellido[0]}`
                                    : "black",
                                ),
                                width: 33,
                                height: 33,
                                borderRadius: "11px",
                              }}
                              variant="rounded"
                            >
                              {object && object?.nombre && object?.apellido
                                ? object?.nombre[0]
                                : ""}
                              {object && object?.nombre && object?.apellido
                                ? object?.apellido[0]
                                : ""}
                            </Avatar>
                          )}
                          {participantesProyecto || (
                            <EditPencilContainer
                              onClick={() => {
                                dispatch(setColaboradorPerfil(object));
                                dispatch(setEditColaborador(true));
                                dispatch(setActive(true));
                              }}
                            >
                              <Image
                                src={EditPencilPNG}
                                alt=""
                                width={13}
                                height={13}
                              />
                            </EditPencilContainer>
                          )}
                        </div>
                      </TD>
                      <TD onClick={() => handleColaboradorClick(object)}>
                        {object.nombre}
                      </TD>
                      <TD onClick={() => handleColaboradorClick(object)}>
                        {object.apellido}
                      </TD>
                      <TD onClick={() => handleColaboradorClick(object)}>
                        {participantesProyecto
                          ? `${object.comienzo?.substring(5, 16)} / ${object.finalizacion?.substring(5, 16) || "Actualidad"}`
                          : peales?.find((peal) => peal.id == object.peal_id)
                              ?.nombre}
                      </TD>
                      <TD onClick={() => handleColaboradorClick(object)}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <StateTag state={object.egresos} />
                        </div>
                      </TD>
                    </TRow>
                  ))
                : type == "PROYECTO"
                  ? (filterArray as Array<PealProps>)?.map((object) => (
                      <TRow key={object.id}>
                        <TD firstColumn>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "5px",
                              width: "fit-content",
                              height: "100%",
                            }}
                          >
                            <DeleteTrashContainer
                              onClick={() => {
                                dispatch(setPeal(object));
                                dispatch(setActiveDelete(true));
                              }}
                            >
                              <Image
                                src={TrashDeleteButtonPNG}
                                alt=""
                                width={13}
                                height={13}
                              />
                            </DeleteTrashContainer>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "33px",
                                height: "33px",
                                backgroundColor: getColorByTypeAndString(
                                  object.nombre,
                                ),
                                borderRadius: "11px",
                              }}
                            >
                              <RandomIcon id={object.id} />
                            </div>
                            <EditPencilContainer
                              onClick={() => {
                                dispatch(setProyectoPerfil(object));
                                dispatch(setEditProyecto(true));
                                dispatch(setActive(true));
                              }}
                            >
                              <Image
                                src={EditPencilPNG}
                                alt=""
                                width={13}
                                height={13}
                              />
                            </EditPencilContainer>
                          </div>
                        </TD>
                        <TD onClick={() => handlePealClick(object)}>
                          {object.nombre}
                        </TD>
                        <TD onClick={() => handlePealClick(object)}>
                          {calcularDiferenciaFechas(
                            object.comienzo?.slice(5, -13),
                          )}
                        </TD>
                        <TD onClick={() => handlePealClick(object)}>
                          {colaboradores
                            ?.filter(
                              (colaborador) =>
                                colaborador.peal_id == object.id &&
                                colaborador.egresos == "Activo",
                            )
                            .length.toString()}
                        </TD>
                        <TD onClick={() => handlePealClick(object)}>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <StateTag state="Activo" />
                          </div>
                        </TD>
                      </TRow>
                    ))
                  : type == "EVALUACION"
                    ? (filterArray as Array<EvaluacionProps>)?.map((object) => (
                        <TRow key={object.id}>
                          <TD firstColumn>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "5px",
                                width: "fit-content",
                                height: "100%",
                              }}
                            >
                              <DeleteTrashContainer
                                onClick={() => {
                                  dispatch(setEvaluacion(object));
                                  dispatch(setActiveDelete(true));
                                }}
                              >
                                <Image
                                  src={TrashDeleteButtonPNG}
                                  alt=""
                                  width={13}
                                  height={13}
                                />
                              </DeleteTrashContainer>
                              <Avatar
                                sx={{
                                  bgcolor: getColorByTypeAndString(
                                    object && object?.nombre
                                      ? `${object?.nombre}`
                                      : "black",
                                  ),
                                  width: 33,
                                  height: 33,
                                  borderRadius: "11px",
                                }}
                                variant="rounded"
                              >
                                {RomanIcon(
                                  array
                                    ?.map((evaluacion) => evaluacion.id)
                                    .sort((a, b) => a - b) || [],
                                  object.id,
                                )}
                              </Avatar>
                              <EditPencilContainer
                                onClick={() => {
                                  dispatch(setEvaluacionSelected(object));
                                  dispatch(setEditEvaluacion(true));
                                  dispatch(setActive(true));
                                }}
                              >
                                <Image
                                  src={EditPencilPNG}
                                  alt=""
                                  width={13}
                                  height={13}
                                />
                              </EditPencilContainer>
                            </div>
                          </TD>
                          <TD onClick={() => handleEvaluacionClick(object)}>
                            {object.nombre}
                          </TD>
                          <TD onClick={() => handleEvaluacionClick(object)}>
                            {object.comienzo?.slice(5, -13)}
                          </TD>
                          <TD onClick={() => handleEvaluacionClick(object)}>
                            {puntajes
                              ?.filter((puntaje) => {
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
                                  if (puntaje.evaluacion_id == object.id) {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                } else {
                                  return false;
                                }
                              })
                              .length.toString()}
                            /
                            {colaboradores
                              ?.filter(
                                (colaborador) =>
                                  colaborador.peal_id == object.peal_id,
                              )
                              ?.filter((colaborador) => {
                                const comienzoColaborador = dayjs.utc(
                                  colaborador.comienzo,
                                );
                                const finalizacionColaborador =
                                  colaborador.finalizacion
                                    ? dayjs.utc(colaborador.finalizacion)
                                    : null;
                                const comienzoObject = dayjs.utc(
                                  object.comienzo,
                                );

                                if (comienzoColaborador.isValid()) {
                                  const comienzoMatch =
                                    comienzoColaborador.isBefore(
                                      comienzoObject,
                                    ) ||
                                    comienzoColaborador.isSame(comienzoObject);
                                  const finalizacionMatch =
                                    finalizacionColaborador === null ||
                                    finalizacionColaborador.isAfter(
                                      comienzoObject,
                                    ) ||
                                    finalizacionColaborador.isSame(
                                      comienzoObject,
                                    );
                                  return comienzoMatch && finalizacionMatch;
                                }
                              })
                              .length.toString()}
                          </TD>
                          <TD onClick={() => handleEvaluacionClick(object)}>
                            {object.ultima_actualizacion?.slice(5, -13)}
                          </TD>
                        </TRow>
                      ))
                    : (filterArray as Array<ColaboradorProps>)?.map(
                        (object) => (
                          <TRow key={object.id}>
                            <TD firstColumn>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "5px",
                                  width: "fit-content",
                                  height: "100%",
                                }}
                              >
                                <DeleteTrashContainer
                                  onClick={() => {
                                    dispatch(
                                      setPuntaje(
                                        puntajes?.find(
                                          (puntaje) =>
                                            puntaje.colaborador_id ==
                                              object.id &&
                                            puntaje.evaluacion_id ==
                                              evaluacionSelected?.id,
                                        ),
                                      ),
                                    );
                                    dispatch(setActiveDelete(true));
                                  }}
                                >
                                  <Image
                                    src={TrashDeleteButtonPNG}
                                    alt=""
                                    width={13}
                                    height={13}
                                  />
                                </DeleteTrashContainer>
                                {object.imagen ? (
                                  <Image
                                    src={`data:image/jpeg;base64,${object.imagen}`}
                                    alt={object?.nombre || "Imagen"}
                                    width={33}
                                    height={33}
                                    style={{
                                      borderRadius: "11px",
                                    }}
                                  />
                                ) : (
                                  <Avatar
                                    sx={{
                                      bgcolor: getColorByTypeAndString(
                                        object &&
                                          object?.nombre &&
                                          object?.apellido
                                          ? `${object?.nombre[0]} ${object?.apellido[0]}`
                                          : "black",
                                      ),
                                      width: 33,
                                      height: 33,
                                      borderRadius: "11px",
                                    }}
                                    variant="rounded"
                                  >
                                    {object &&
                                    object?.nombre &&
                                    object?.apellido
                                      ? object?.nombre[0]
                                      : ""}
                                    {object &&
                                    object?.nombre &&
                                    object?.apellido
                                      ? object?.apellido[0]
                                      : ""}
                                  </Avatar>
                                )}
                              </div>
                            </TD>
                            <TD
                              onClick={() =>
                                handleParticipantesEvaluacionClick(object)
                              }
                            >
                              {object.nombre}
                            </TD>
                            <TD
                              onClick={() =>
                                handleParticipantesEvaluacionClick(object)
                              }
                            >
                              {object.apellido}
                            </TD>
                            <TD
                              onClick={() =>
                                handleParticipantesEvaluacionClick(object)
                              }
                            >
                              {calcularPromedioYEstado("PROMEDIO", object)}
                            </TD>
                            <TD
                              onClick={() =>
                                handleParticipantesEvaluacionClick(object)
                              }
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <StateTag
                                  state={calcularPromedioYEstado(
                                    "ESTADO",
                                    object,
                                  )}
                                />
                              </div>
                            </TD>
                          </TRow>
                        ),
                      )}
            </TBody>
          </Table>
        </TableDiv>
      </SeparatorContainer>
      <Footer>
        <FooterText>
          {A_MOSTRAR} {filterArray?.length}{" "}
          {type == "COLABORADOR" || type == "PARTICIPANTESEVALUACION"
            ? COLABORADORES
            : type == "PROYECTO"
              ? PROYECTOS
              : EVALUACIONES}
        </FooterText>
      </Footer>
    </ColumnContainer>
  );
};

export { SearchBox };
