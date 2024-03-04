import React, { useEffect } from "react";

import { ResponsiveRadar } from "@nivo/radar";
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
import { ColaboradorProps, DataProps, PealProps, PuntajeProps } from "@types";
import {
  setColaboradores,
  setPeales,
} from "@redux/slices/generalVariableSlice";
import {
  setLinkSelected,
  setPrimerPealSelected,
  setRadarData,
  setRadarKey,
  setSegundoPealSelected,
  setTrabajadorSelected,
} from "@redux/slices/analisisSlice";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";

const AnalisisPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const evaluaciones = useAppSelector((state) => state.general.evaluaciones);
  const puntajes = useAppSelector((state) => state.general.puntajes);

  const linkSeleccionado = useAppSelector(
    (state) => state.analisis.linkSelected,
  );
  const radarData = useAppSelector((state) => state.analisis.radarData);
  const keyArray = useAppSelector((state) => state.analisis.keyArray);
  const trabajadorSeleccionado = useAppSelector(
    (state) => state.analisis.trabajadorSelected,
  );
  const primerPealSeleccionado = useAppSelector(
    (state) => state.analisis.primerPealSelected,
  );
  const segundoPealSeleccionado = useAppSelector(
    (state) => state.analisis.segundoPealSelected,
  );

  const data = [
    {
      criterio: "Adaptación al Cambio",
      chardonay: 85,
      carmenere: 74,
      syrah: 86,
    },
    {
      criterio: "Habilidades Relacionales",
      chardonay: 58,
      carmenere: 99,
      syrah: 68,
    },
    {
      criterio: "Comunicación",
      chardonay: 31,
      carmenere: 70,
      syrah: 46,
    },
    {
      criterio: "Liderazgo",
      chardonay: 70,
      carmenere: 85,
      syrah: 74,
    },
    {
      criterio: "Proactividad",
      chardonay: 61,
      carmenere: 70,
      syrah: 77,
    },
    {
      criterio: "Responsabilidad",
      chardonay: 85,
      carmenere: 74,
      syrah: 96,
    },
    {
      criterio: "Trabajo en Equipo",
      chardonay: 58,
      carmenere: 99,
      syrah: 68,
    },
    {
      criterio: "% de Asistencias",
      chardonay: 31,
      carmenere: 70,
      syrah: 46,
    },
    {
      criterio: "Presencia",
      chardonay: 70,
      carmenere: 85,
      syrah: 74,
    },
    {
      criterio: "Puntualidad",
      chardonay: 61,
      carmenere: 70,
      syrah: 77,
    },
    {
      criterio: "Rendimiento Laboral",
      chardonay: 61,
      carmenere: 70,
      syrah: 77,
    },
  ];

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

  useEffect(() => {
    const puntajesTrabajador = puntajes?.filter(
      (puntaje) => puntaje.colaborador_id == trabajadorSeleccionado?.id,
    );
    const newRadarData = combineRadarDataAndPuntajes(
      radarData,
      puntajesTrabajador,
    );
    const newKeyArray = puntajesTrabajador
      ?.filter(
        (puntaje) =>
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
      )
      ?.map((puntaje) => {
        return evaluaciones?.find(
          (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
        )?.nombre;
      });
    dispatch(setRadarData(newRadarData));
    dispatch(setRadarKey(newKeyArray as string[]));
  }, [trabajadorSeleccionado]);

  const combineRadarDataAndPuntajes = (
    data: { criterio: string }[],
    puntajes: PuntajeProps[] | undefined,
  ): DataProps[] => {
    return data.map((item) => {
      const criterioKey = item.criterio.toLowerCase().replace(/\s+/g, "_");

      const updatedItem: DataProps = { criterio: item.criterio };

      puntajes?.forEach((puntaje) => {
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
          const puntajeKey =
            item.criterio === "% de Asistencias"
              ? "porcentaje_asistencia"
              : Object.keys(puntaje).find((key) => key === criterioKey);
          const evaluacion = evaluaciones?.find(
            (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
          );

          if (puntajeKey && evaluacion) {
            if (item.criterio === "% de Asistencias")
              updatedItem[evaluacion.nombre] =
                (puntaje[puntajeKey] as unknown as number) / 10;
            else updatedItem[evaluacion.nombre] = puntaje[puntajeKey];
          }
        }
      });

      return updatedItem;
    });
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
        <div
          style={{
            width: "450px",
            height: "400px",
            borderRadius: "16px",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <ResponsiveRadar
            data={radarData}
            keys={keyArray}
            indexBy="criterio"
            valueFormat=" >-.2f"
            maxValue={10}
            margin={{ top: 0, right: 80, bottom: 40, left: 80 }}
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
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateX: -60,
                translateY: -20,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </MainCardContainer>
    </AnalisisContainer>
  );
};
export default AnalisisPage;
