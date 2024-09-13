import React, { useState } from "react";
import Image from "next/image";

import {
  Button,
  ButtonBox,
  ButtonText,
  CloseModalContainer,
  ComentCard,
  ComentText,
  ComentTextContainer,
  ComentTitle,
  Header,
  LabelPromedioText,
  LineTitle,
  LineTitleContainer,
  LogoContainer,
  ModalBackground,
  ModalCard,
  OverflowContainer,
  PDFContainer,
  PromedioCard,
  PromedioContainer,
  PromedioText,
  PromedioTextContainer,
  PromedioTextSubsContainer,
  PromedioTitle,
  PromedioTitleContainer,
  StyledTextareaAutosize,
} from "./styles";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { CloseModalPNG, LogoBlackPNG } from "src/assests";
import { setComentario, setModalActive } from "@redux/slices/analisisSlice";
import {
  CARACTERISTICAS_DESTACADAS,
  COMENTARIO,
  DESCARGAR,
  DE_DESEMPENO_DE,
  DE_DESEMPENO_DEL,
  ENTRE,
  INGRESE_UN_COMENTARIO,
  PROMEDIO_GENERAL,
  REPORTE_DE_EVALUACION,
  Y,
} from "@constants";
import dynamic from "next/dynamic";

interface modalProps {
  type: "TRABAJADOR" | "PROYECTO" | "COMPARACION";
}

const ModalPDF: React.FC<modalProps> = ({ type }) => {
  const ResponsiveRadar = dynamic<any>(
    () => import("@nivo/radar").then((m) => m.ResponsiveRadar),
    { loading: () => <p>Loading...</p>, ssr: false },
  );

  const ResponsiveLine = dynamic<any>(
    () => import("@nivo/line").then((m) => m.ResponsiveLine),
    { loading: () => <p>Loading...</p>, ssr: false },
  );

  const dispatch = useAppDispatch();
  const comentario = useAppSelector((state) => state.analisis.comentario);

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

  // Line Grafico
  const lineData = useAppSelector((state) => state.analisis.lineData);
  // Line Grafico

  // Radar Grafico
  const radarData = useAppSelector((state) => state.analisis.radarData);
  const keyArray = useAppSelector((state) => state.analisis.keyArray);
  // Radar Grafico

  const [hoverButton, setHoverButton] = useState(false);

  const handleClickSave = async () => {
    if (typeof window !== "undefined") {
      const pdfHTML = document.getElementById("pdfContainer");

      const div = document.createElement("div");

      if (pdfHTML) {
        div.innerHTML = pdfHTML.outerHTML;
      }
      sendPDF(div);
      dispatch(setModalActive(false));
      dispatch(setComentario(undefined));
    }
  };

  const sendPDF = async (div: HTMLDivElement) => {
    const options = {
      margin: 10,
      filename:
        type == "TRABAJADOR"
          ? `Reporte${trabajadorSeleccionado?.nombre}${trabajadorSeleccionado?.apellido}.pdf`
          : type == "PROYECTO"
            ? `Reporte${proyectoPealSeleccionado?.nombre}.pdf`
            : `Reporte${primerPealSeleccionado?.nombre}Y${segundoPealSeleccionado?.nombre}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      html2pdf().set(options).from(div).save();
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  };

  return (
    <ModalBackground>
      <ModalCard>
        <Header>
          <div
            style={{
              display: "flex",
              height: "fit-content",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginBottom: "5px",
            }}
          >
            <CloseModalContainer
              onClick={() => {
                dispatch(setModalActive(false));
                dispatch(setComentario(undefined));
              }}
            >
              <Image src={CloseModalPNG} alt="" width={16} height={16} />
            </CloseModalContainer>
          </div>
        </Header>
        <OverflowContainer>
          <PDFContainer id="pdfContainer">
            <LogoContainer>
              <Image src={LogoBlackPNG} height={70} width={123} alt="" />
            </LogoContainer>
            <LineTitleContainer>
              <LineTitle>{REPORTE_DE_EVALUACION}</LineTitle>
              <LineTitle>
                {type == "TRABAJADOR"
                  ? DE_DESEMPENO_DE +
                    ` ${trabajadorSeleccionado?.nombre}` +
                    ` ${trabajadorSeleccionado?.apellido}`
                  : type == "PROYECTO"
                    ? DE_DESEMPENO_DEL + ` ${proyectoPealSeleccionado?.nombre}`
                    : ENTRE +
                      ` ${primerPealSeleccionado?.nombre} ` +
                      Y +
                      ` ${segundoPealSeleccionado?.nombre}`}
              </LineTitle>
            </LineTitleContainer>
            <div
              style={{
                width: "690px",
                height: "350px",
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
                enablePointLabel={true}
                isInteractive={false}
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
            <div
              style={{
                width: "600px",
                height: "500px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
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
                isInteractive={false}
                enableDotLabel={true}
                dotBorderColor={{ from: "color", modifiers: [] }}
                colors={{ scheme: "nivo" }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                  {
                    anchor: "top-left",
                    direction: "column",
                    translateX: -80,
                    translateY: 60,
                    itemWidth: 80,
                    itemHeight: 15,
                    itemTextColor: "#999",
                    symbolSize: 10,
                    symbolShape: "circle",
                  },
                ]}
              />
            </div>
            {/* [ promedio graficas ] */}
            <PromedioContainer>
              <PromedioCard promedio comparacion={type == "COMPARACION"}>
                <PromedioTitleContainer>
                  <PromedioTitle>{PROMEDIO_GENERAL}</PromedioTitle>
                </PromedioTitleContainer>
                <PromedioTextContainer>
                  {type == "COMPARACION" || (
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
                  {!(type == "COMPARACION") || (
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
              {type == "COMPARACION" || (
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
            <ComentCard>
              <ComentTitle>{COMENTARIO}:</ComentTitle>
              <ComentTextContainer>
                <ComentText>{comentario}</ComentText>
              </ComentTextContainer>
            </ComentCard>
            {/* [ promedio graficas ] */}
          </PDFContainer>
        </OverflowContainer>
        <ButtonBox>
          <StyledTextareaAutosize
            placeholder={INGRESE_UN_COMENTARIO}
            onChange={(e) => dispatch(setComentario(e.target.value))}
            value={comentario}
            spellCheck="false"
          />
          <Button
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            onClick={() => handleClickSave()}
          >
            <ButtonText hover={hoverButton}>{DESCARGAR}</ButtonText>
          </Button>
        </ButtonBox>
      </ModalCard>
    </ModalBackground>
  );
};

export { ModalPDF };
