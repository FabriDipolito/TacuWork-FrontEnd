import React, { useEffect } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import {
  AnalisisContainer,
  HeaderCard,
  MainCardContainer,
  SearchBar,
  SearchBarTextField,
  SubHeaderCard,
  PageLink,
  Separator,
} from "./styles";
import {
  BUSCAR_PEAL,
  BUSCAR_TRABAJADOR,
  COMPARACION,
  PROYECTOS,
  TRABAJADORES,
} from "@constants";
import { pealesGET } from "src/services/api/allPealesGET";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ColaboradorProps, PealProps } from "@types";
import {
  setColaboradores,
  setPeales,
} from "@redux/slices/generalVariableSlice";
import {
  setLinkSelected,
  setPrimerPealSelected,
  setSegundoPealSelected,
  setTrabajadorSelected,
} from "@redux/slices/analisisSlice";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";

const AnalisisPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const linkSeleccionado = useAppSelector(
    (state) => state.analisis.linkSelected,
  );
  const trabajadorSeleccionado = useAppSelector(
    (state) => state.analisis.trabajadorSelected,
  );
  const primerPealSeleccionado = useAppSelector(
    (state) => state.analisis.primerPealSelected,
  );
  const segundoPealSeleccionado = useAppSelector(
    (state) => state.analisis.segundoPealSelected,
  );

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

    colaboradoresGET()
      .then((allColaboradores) => {
        if (allColaboradores) {
          dispatch(setColaboradores(allColaboradores));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of users:", error);
      });
  }, []);

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
              renderOption={(props, option, state) => (
                <div
                  {...props}
                  style={{ width: "100%" }}
                  onClick={() => {
                    dispatch(setTrabajadorSelected(option as ColaboradorProps));
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
              renderOption={(props, option, state) => (
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
                renderOption={(props, option, state) => (
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
                renderOption={(props, option, state) => (
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
        </SubHeaderCard>
        <iframe
          title="TrabajadoresTest"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=290e9e77-daf5-4d0b-b629-0d3e2ae5897d&autoAuth=true&ctid=c4fdd762-c795-4c8a-b44b-036035add416"
        ></iframe>
      </MainCardContainer>
    </AnalisisContainer>
  );
};
export default AnalisisPage;
