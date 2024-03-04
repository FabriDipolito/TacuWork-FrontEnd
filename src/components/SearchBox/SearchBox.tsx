import React, { ReactNode, useEffect, useState } from "react";
import {
  ColumnContainer,
  FilterText,
  Footer,
  FooterText,
  Header,
  SearchBar,
  SearchText,
  SelectOptions,
  SeparatorContainer,
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
  FilterSelectIconPNG,
  GroupFilterSelectIconPNG,
  SearchSelectIconPNG,
} from "src/assests";
import { InputAdornment, SelectChangeEvent } from "@mui/material";
import {
  A_MOSTRAR,
  BUSCAR,
  COLABORADORES,
  COLABORADOR_FILTER,
  COLABORADOR_TAGS,
  EVALUACIONES,
  EVALUACION_FILTER,
  EVALUACION_TAGS,
  FILTRO,
  GRUPO,
  PARTICIPANTES_EVALUACION_TAGS,
  PROYECTOS,
  PROYECTO_FILTER,
  PROYECTO_TAGS,
} from "@constants";
import { ColaboradorProps, EvaluacionProps, PealProps } from "@types";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setFilter,
  setFilterArray,
  setFilterSelected,
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

interface SearchBoxProps {
  type?: "COLABORADOR" | "PROYECTO" | "EVALUACION" | "PARTICIPANTESEVALUACION";
  array?: Array<ColaboradorProps> | Array<PealProps> | Array<EvaluacionProps>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ type, array }) => {
  const dispatch = useAppDispatch();
  const modalActive = useAppSelector((state) => state.modal.active);
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
  const filterArray = useAppSelector((state) => state.searchBox.filterArray);
  const pealParticipantes = useAppSelector(
    (state) => state.participantesEvaluacion.pealSelected,
  );

  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const peales = useAppSelector((state) => state.general.peales);
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const allPuntajes = useAppSelector((state) => state.general.puntajes);
  const evaluacionSelected = useAppSelector(
    (state) => state.participantesEvaluacion.evaluacionSelected,
  );

  useEffect(() => {
    dispatch(clearModal());
  }, [modalActive]);

  useEffect(() => {
    dispatch(setFilterSelected(undefined));
    dispatch(setGroupFilterSelected(undefined));
    dispatch(setSearchFilterSelected(undefined));
    dispatch(setFilterArray(array));
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
      dispatch(setFilter(COLABORADOR_FILTER));
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
          case "Activos":
            //return a.egresos === "Activo" ? -1 : 1;
            return 0;
          case "Inactivos":
            //return a.egresos !== "Activo" ? -1 : 1;
            return 0;
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
              return 0;
            case "Falta Evaluar":
              return 0;
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
      dispatch(
        setFilterArray(
          (array as Array<ColaboradorProps>)?.filter(
            (colaborador) => colaborador.peal_id == pealParticipantes?.id,
          ),
        ),
      );
    }
  }, [filterSelected, groupFilterSelected, searchFilterSelected, array]);

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
          {type == "COLABORADOR" ? (
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
                  ? COLABORADOR_TAGS.map((tag) => <TH key={tag}>{tag}</TH>)
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
                            width: "33px",
                            height: "33px",
                            backgroundColor: "lightblue",
                            borderRadius: "11px",
                          }}
                        ></div>
                      </TD>
                      <TD>{object.nombre}</TD>
                      <TD>{object.apellido}</TD>
                      <TD>
                        {
                          peales?.find((peal) => peal.id == object.peal_id)
                            ?.nombre
                        }
                      </TD>
                      <TD>
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
                              width: "33px",
                              height: "33px",
                              backgroundColor: "lightpink",
                              borderRadius: "11px",
                            }}
                          ></div>
                        </TD>
                        <TD>{object.nombre}</TD>
                        <TD>
                          {calcularDiferenciaFechas(
                            object.comienzo?.slice(5, -13),
                          )}
                        </TD>
                        <TD>
                          {colaboradores
                            ?.filter(
                              (colaborador) => colaborador.peal_id == object.id,
                            )
                            .length.toString()}
                        </TD>
                        <TD>
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
                        <TRow
                          key={object.id}
                          onClick={() => handleEvaluacionClick(object)}
                        >
                          <TD firstColumn>
                            <div
                              style={{
                                width: "33px",
                                height: "33px",
                                backgroundColor: "lightgreen",
                                borderRadius: "11px",
                              }}
                            ></div>
                          </TD>
                          <TD>{object.nombre}</TD>
                          <TD>{object.comienzo?.slice(5, -13)}</TD>
                          <TD>
                            0/
                            {colaboradores
                              ?.filter(
                                (colaborador) =>
                                  colaborador.peal_id == object.peal_id,
                              )
                              .length.toString()}
                          </TD>
                          <TD>{object.ultima_actualizacion?.slice(5, -13)}</TD>
                        </TRow>
                      ))
                    : (filterArray as Array<ColaboradorProps>)?.map(
                        (object) => (
                          <TRow
                            key={object.id}
                            onClick={() =>
                              handleParticipantesEvaluacionClick(object)
                            }
                          >
                            <TD firstColumn>
                              <div
                                style={{
                                  width: "33px",
                                  height: "33px",
                                  backgroundColor: "lightcoral",
                                  borderRadius: "11px",
                                }}
                              ></div>
                            </TD>
                            <TD>{object.nombre}</TD>
                            <TD>{object.apellido}</TD>
                            <TD>
                              {calcularPromedioYEstado("PROMEDIO", object)}
                            </TD>
                            <TD>
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
