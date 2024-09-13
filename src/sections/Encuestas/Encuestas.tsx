/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BarGraphContainer,
  BarGraphMainContainer,
  BarTitle,
  BarTitleContainer,
  ComentarioBox,
  ComentarioContainer,
  ComentarioMainTitle,
  ComentarioMainTitleContainer,
  ComentarioText,
  ComentarioTextContainer,
  ComentarioTitle,
  ComentarioTitleContainer,
  ComentariosMainContainer,
  ComentariosSection,
  CopiarIconContainer,
  EncuestaContainer,
  EncuestaNavegacionButton,
  GraphContainer,
  HeaderCard,
  IconContainer,
  LeftGraphContainer,
  LinkContainer,
  LinkIconContainer,
  LinkText,
  LinkTextContainer,
  MainCardContainer,
  PealSearch,
  PealSearchTextField,
  PieGraphContainer,
  PieGraphMainContainer,
  PieTitle,
  PieTitleContainer,
} from "./styles";
import { ANONIMO, BUSCAR_PEAL, COMENTARIOS, PREGUNTA1_ADMIN, PREGUNTA2_ADMIN, PREGUNTA3_ADMIN } from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  CopiarIconPNG,
  CursorIconActivePNG,
  CursorIconInactivePNG,
} from "src/assests";
import { DataBarProps, EncuestaProps, PealProps } from "@types";
import { setActive, setBarData, setPealSelected, setPie1Data, setPie2Data } from "@redux/slices/encuestasSlice";
import dynamic from "next/dynamic";

const EncuestasPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const peales = useAppSelector((state) => state.general.peales);
  const encuestas = useAppSelector((state) => state.general.encuestas);
  const pealSeleccionado = useAppSelector(
    (state) => state.encuestas.pealSelected,
  );
  const data = useAppSelector(
    (state) => state.encuestas.barData,
  );
  const active = useAppSelector((state) => state.encuestas.active);

  const dataPie1 = useAppSelector(
    (state) => state.encuestas.pie1Data,
  );
  const dataPie2 = useAppSelector(
    (state) => state.encuestas.pie2Data,
  );

  const [hoverButton, setHoverButton] = useState(false);

  const ResponsiveBar = dynamic<any>(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false },
  );

  const ResponsivePie = dynamic<any>(
    () => import("@nivo/pie").then((m) => m.ResponsivePie),
    { ssr: false },
  );

  useEffect(() => {
    if (pealSeleccionado) {
      const filteredEncuestas = encuestas?.filter(encuesta => encuesta.peal_id === pealSeleccionado.id);
      const updatedBarData = updateBarData(filteredEncuestas || []);
      dispatch(setBarData(updatedBarData));
      const updatedPie1Data = updatePie1Data(filteredEncuestas || []);
      dispatch(setPie1Data(updatedPie1Data));
      const updatedPie2Data = updatePie2Data(filteredEncuestas || []);
      dispatch(setPie2Data(updatedPie2Data));
      dispatch(setActive(false));
    }
  }, [pealSeleccionado]);

  const handleCopyClick = async () => {
    const textToCopy = `${process.env.NEXT_PUBLIC_HOST_URL}/Encuestas/${pealSeleccionado?.id}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log("Texto copiado al portapapeles:", textToCopy);
    } catch (err) {
      console.error("Error al copiar el texto:", err);
    }
  };

  const updateBarData = (filteredEncuestas: EncuestaProps[]) => {
    const newBarData: DataBarProps[] = [
      { respuesta: "Muy mala", darkRed: 0, red: 0, lightRed: 0, orange: 0, lightOrange: 0, yellow: 0, lightLime: 0, lime: 0, lightGreen: 0, green: 0, darkGreen: 0 },
      { respuesta: "Mala", darkRed: 0, red: 0, lightRed: 0, orange: 0, lightOrange: 0, yellow: 0, lightLime: 0, lime: 0, lightGreen: 0, green: 0, darkGreen: 0 },
      { respuesta: "Regular", darkRed: 0, red: 0, lightRed: 0, orange: 0, lightOrange: 0, yellow: 0, lightLime: 0, lime: 0, lightGreen: 0, green: 0, darkGreen: 0 },
      { respuesta: "Buena", darkRed: 0, red: 0, lightRed: 0, orange: 0, lightOrange: 0, yellow: 0, lightLime: 0, lime: 0, lightGreen: 0, green: 0, darkGreen: 0 },
      { respuesta: "Excelente", darkRed: 0, red: 0, lightRed: 0, orange: 0, lightOrange: 0, yellow: 0, lightLime: 0, lime: 0, lightGreen: 0, green: 0, darkGreen: 0 },
    ];
  
    filteredEncuestas?.forEach(encuesta => {
      if (encuesta.respuesta1 === "Excelente") {
        newBarData[4].darkGreen += 1;
      } else if (encuesta.respuesta1 === "Buena") {
        newBarData[3].lightGreen += 1;
      } else if (encuesta.respuesta1 === "Regular") {
        newBarData[2].lightOrange += 1;
      } else if (encuesta.respuesta1 === "Mala") {
        newBarData[1].red += 1;
      } else if (encuesta.respuesta1 === "Muy mala") {
        newBarData[0].darkRed += 1;
      }
    });
  
    return newBarData;
  };

  const updatePie1Data = (filteredEncuestas: EncuestaProps[]) => {
    const newPie1Data = [
      { id: "brown", label: "brown", value: 0 },
      { id: "Nunca", label: "Nunca", value: 0 },
      { id: "A veces", label: "A veces", value: 0 },
      { id: "Rara vez", label: "Rara vez", value: 0 },
      { id: "Siempre", label: "Siempre", value: 0 },
      { id: "La mayor parte del tiempo", label: "La mayor parte del tiempo", value: 0 },
    ];

    filteredEncuestas?.forEach(encuesta => {
      if (encuesta.respuesta2 === "Siempre") {
        newPie1Data[4].value += 1;
      } else if (encuesta.respuesta2 === "La mayor parte del tiempo") {
        newPie1Data[5].value += 1;
      } else if (encuesta.respuesta2 === "A veces") {
        newPie1Data[2].value += 1;
      } else if (encuesta.respuesta2 === "Rara vez") {
        newPie1Data[3].value += 1;
      } else if (encuesta.respuesta2 === "Nunca") {
        newPie1Data[1].value += 1;
      }
    });
  
    return newPie1Data;
  };

  const updatePie2Data = (filteredEncuestas: EncuestaProps[]) => {
    const newPie2Data = [
      { id: "brown", label: "brown", value: 0 },
      { id: "Muy negativo", label: "Muy negativo", value: 0 },
      { id: "Neutral", label: "Neutral", value: 0 },
      { id: "Negativo", label: "Negativo", value: 0 },
      { id: "Muy positivo", label: "Muy positivo", value: 0 },
      { id: "Positivo", label: "Positivo", value: 0 },
    ];

    filteredEncuestas?.forEach(encuesta => {
      if (encuesta.respuesta3 === "Muy positivo") {
        newPie2Data[4].value += 1;
      } else if (encuesta.respuesta3 === "Positivo") {
        newPie2Data[5].value += 1;
      } else if (encuesta.respuesta3 === "Neutral") {
        newPie2Data[2].value += 1;
      } else if (encuesta.respuesta3 === "Negativo") {
        newPie2Data[3].value += 1;
      } else if (encuesta.respuesta3 === "Muy negativo") {
        newPie2Data[1].value += 1;
      }
    });
  
    return newPie2Data;
  };

  return (
    <EncuestaContainer>
      <MainCardContainer>
        <HeaderCard>
          <PealSearch
            options={peales ? peales : []}
            getOptionLabel={(option: any) => `${option.nombre}`}
            defaultValue={useAppSelector(
              (state) => state.encuestas.pealSelected,
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
            renderOption={(props: any, option, state) => (
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
          <EncuestaNavegacionButton
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            available={Boolean(pealSeleccionado)}
            onClick={() => {
              !pealSeleccionado || dispatch(setActive(!active));
            }}
          >
            <IconContainer>
              <Image
                src={
                  !pealSeleccionado
                    ? CursorIconActivePNG
                    : hoverButton
                      ? CursorIconActivePNG
                      : CursorIconInactivePNG
                }
                height={18}
                width={18}
                alt=""
              />
            </IconContainer>
          </EncuestaNavegacionButton>
        </HeaderCard>
        <GraphContainer>
          <LeftGraphContainer>
            <BarGraphMainContainer>
              <BarGraphContainer>
                <BarTitleContainer>
                  <BarTitle>{PREGUNTA1_ADMIN}</BarTitle>
                </BarTitleContainer>
                <div style={{ width: "100%", height: "100%" }}>
                  <ResponsiveBar
                    data={data}
                    keys={["darkRed", "red", "lightRed", "orange", "lightOrange", "yellow", "lightLime", "lime", "lightGreen", "green", "darkGreen"]}
                    indexBy="respuesta"
                    margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                    padding={0.4}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "red_yellow_green" }}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    minValue={0}
                    maxValue={pealSeleccionado ? "auto" : 5}
                    axisTop={null}
                    axisRight={null}
                    enableLabel={false}
                    enableTotals={pealSeleccionado ? true : false}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: 32,
                      truncateTickAt: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: -40,
                      truncateTickAt: 0,
                    }}
                    isInteractive={false}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) =>
                      e.id + ": " + e.formattedValue + " in country: " + e.indexValue
                    }
                  />
                </div>
              </BarGraphContainer>
            </BarGraphMainContainer>
            <PieGraphMainContainer>
              <PieGraphContainer>
                <PieTitleContainer>
                  <PieTitle>{PREGUNTA2_ADMIN}</PieTitle>
                </PieTitleContainer>
                <div style={{ width: "100%", height: "100%" }}>
                  <ResponsivePie
                    data={dataPie1}
                    margin={{ top: 20, right: 10, bottom: 30, left: 10 }}
                    innerRadius={0}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={1}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={0}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabel={e=>e.id+" ("+e.value+")"}
                    arcLabelsRadiusOffset={0.8}
                    arcLabelsSkipAngle={1}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1
                            ]
                        ]
                    }}
                  />
                </div>
              </PieGraphContainer>
              <PieGraphContainer>
              <PieTitleContainer>
                  <PieTitle>{PREGUNTA3_ADMIN}</PieTitle>
                </PieTitleContainer>
                <div style={{ width: "100%", height: "100%" }}>
                  <ResponsivePie
                    data={dataPie2}
                    margin={{ top: 20, right: 10, bottom: 30, left: 10 }}
                    innerRadius={0}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={1}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={0}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabel={e=>e.id+" ("+e.value+")"}
                    arcLabelsRadiusOffset={0.8}
                    arcLabelsSkipAngle={1}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1
                            ]
                        ]
                    }}
                  />
                </div>
              </PieGraphContainer>
            </PieGraphMainContainer>
          </LeftGraphContainer>
          <ComentariosMainContainer>
            <ComentarioContainer>
              <ComentarioMainTitleContainer>
                <ComentarioMainTitle>{COMENTARIOS}:</ComentarioMainTitle>
              </ComentarioMainTitleContainer>
              <ComentariosSection>
                {encuestas?.filter(encuesta => encuesta.peal_id === pealSeleccionado?.id && encuesta.comentario).map((encuesta) => (
                  <ComentarioBox key={encuesta.id}>
                    <ComentarioTitleContainer>
                      <ComentarioTitle>{encuesta.nombre ? encuesta.nombre : ANONIMO}</ComentarioTitle>
                    </ComentarioTitleContainer>
                    <ComentarioTextContainer>
                      <ComentarioText>{encuesta.comentario}</ComentarioText>
                    </ComentarioTextContainer>
                  </ComentarioBox>
                ))}
              </ComentariosSection>
            </ComentarioContainer>
          </ComentariosMainContainer>
        </GraphContainer>
        {!active || (
          <LinkContainer>
            <LinkTextContainer>
              <LinkText>{`${process.env.NEXT_PUBLIC_HOST_URL}/Encuestas/${pealSeleccionado?.id}`}</LinkText>
              <LinkIconContainer>
                <CopiarIconContainer onClick={() => handleCopyClick()}>
                  <Image src={CopiarIconPNG} height={16} width={16} alt="" />
                </CopiarIconContainer>
              </LinkIconContainer>
            </LinkTextContainer>
          </LinkContainer>
        )}
      </MainCardContainer>
    </EncuestaContainer>
  );
};
export default EncuestasPage;
