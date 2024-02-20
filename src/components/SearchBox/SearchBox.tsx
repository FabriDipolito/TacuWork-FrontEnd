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
  COMIENZO,
  EVALUACION,
  EVALUACIONES,
  EVALUACION_FILTER,
  EVALUACION_TAGS,
  FILTRO,
  GRUPO,
  PARTICIPANTES,
  PROYECTOS,
  PROYECTO_FILTER,
  PROYECTO_TAGS,
  TRIMESTRE,
  ULTIMA_ACTUALIZACION,
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
import { clearModal } from "@redux/slices/modalSlice";
import { StateTag } from "../StateTag/StateTag";

interface SearchBoxProps {
  type?: "COLABORADOR" | "PROYECTO" | "EVALUACION";
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

  const [focused, setFocused] = useState(false);

  const peales = useAppSelector((state) => state.general.peales);

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
                    : EVALUACION_TAGS.map((tag) => <TH key={tag}>{tag}</TH>)}
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
                  ? (array as Array<PealProps>)?.map((object) => (
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
                        <TD>{object.comienzo.slice(5, -13)}</TD>
                        <TD>{object.id}</TD>
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
                  : (array as Array<EvaluacionProps>)?.map((object) => (
                      <TRow key={object.id}>
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
                        <TD>{object.comienzo.slice(5, -13)}</TD>
                        <TD>{object.id}</TD>
                        <TD>{object.ultima_actualizacion.slice(5, -13)}</TD>
                      </TRow>
                    ))}
            </TBody>
          </Table>
        </TableDiv>
      </SeparatorContainer>
      <Footer>
        <FooterText>
          {A_MOSTRAR} {filterArray?.length}{" "}
          {type == "COLABORADOR"
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
