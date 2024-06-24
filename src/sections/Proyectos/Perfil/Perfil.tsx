/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import {
  PerfilContainer,
  MainCardContainer,
  SubHeaderCard,
  HeaderCard,
  PageLink,
  TitleText,
  InfoTrabajadorContainer,
  InfoCardContainer,
  PhotoContainer,
  InfoCard,
  TitleCardContainer,
  TitleCard,
  TableCardContainer,
  LeftContainer,
  RightContainer,
  Slot,
  SlotText,
  ProyectoContainer,
  ProyectoBox,
  Container,
  ProyectoBoxDiv,
  ProyectoText,
  InfoContainer,
  InfoEmergenciaContainer,
  InfoBancariaCard,
  InfoEmergencyCard,
  InputText,
  SelectText,
  FilterPlaceholder,
  InputBox,
  LabelText,
  ColaboradoresAddButton,
  ButtonText,
  TextBoxContainer,
  TagContainer,
  EditContainer,
  EditText,
} from "./styles";
import {
  AGREGAR_COLABORADOR,
  AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION,
  AQUI_ESTA_TODA_INFORMACION,
  BANCO,
  BARRIO,
  BUSCAR,
  COMIENZO,
  CONTACTO_EMERGENCIA,
  DETALLES_CUENTA_BANCARIA,
  DURACION,
  EDAD,
  EDITAR,
  EGRESOS,
  ESTOS_SON_PROYECTOS,
  FIN_ESTIMADO,
  HIJOS,
  INFORMACION_BANCARIA,
  INFORMACION_DEL_PROYECTO,
  INFORMACION_DEL_TRABAJADOR,
  NIVEL_EDUCATIVO,
  NOMBRE,
  NUMERO_CUENTA,
  NUMERO_TELEFONO,
  PARTICIPANTES,
  PERFIL,
  PERSONAL,
  PRESENTE_INFORMACION,
  PROYECTO,
  PROYECTOS,
  SIN_PROYECTOS_ATRIBUIDOS,
  SUCURSAL,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLinkSelected } from "@redux/slices/perfilProyectosSlice";
import { Avatar } from "@mui/material";
import { SearchBox, TextBox } from "@components";
import {
  AddButtonPNG,
  AddButtonSelectedPNG,
  AddPhotoPerfilPNG,
  ContactoEmergenciaIconPNG,
  InformacionBancariaIconPNG,
  InformacionTrabajoIconPNG,
  ParticipantesIconPNG,
  PealPerfilIconPNG,
  PlusEditButtonPNG,
  ProyectosGroupIconPNG,
} from "src/assests";
import Image from "next/image";
import { StateTag } from "src/components/StateTag/StateTag";
import { setActive } from "@redux/slices/modalSlice";
import { Modal } from "src/components/Modal/Modal";
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

const PerfilPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const linkSeleccionado = useAppSelector(
    (state) => state.perfilProyecto.linkSelected,
  );
  const pealSeleccionado = useAppSelector(
    (state) => state.perfilProyecto.pealSelected,
  );
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const modalActive = useAppSelector((state) => state.modal.active);

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

  const [hoverButton, setHoverButton] = useState(false);

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
    perfil?: boolean;
  }

  const RandomIcon: React.FC<randomProps> = ({ id, perfil = false }) => {
    const IconComponent = icons[id % icons.length];
    return <IconComponent size={perfil ? 50 : 25} />;
  };

  return (
    <PerfilContainer>
      <MainCardContainer>
        <HeaderCard>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "35px",
              height: "35px",
              backgroundColor: getColorByTypeAndString(
                pealSeleccionado ? pealSeleccionado?.nombre : "1",
              ),
              borderRadius: "11px",
            }}
          >
            <RandomIcon id={pealSeleccionado ? pealSeleccionado?.id : 1} />
          </div>
          <TitleText>{pealSeleccionado?.nombre}</TitleText>
        </HeaderCard>
        <SubHeaderCard>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PROYECTO"))}
            selected={linkSeleccionado == "PROYECTO"}
          >
            {PROYECTO}
          </PageLink>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PARTICIPANTES"))}
            selected={linkSeleccionado == "PARTICIPANTES"}
          >
            {PARTICIPANTES}
          </PageLink>
        </SubHeaderCard>
        {linkSeleccionado == "PROYECTO" ? (
          <InfoContainer>
            <InfoTrabajadorContainer>
              <TextBox
                icon={InformacionTrabajoIconPNG}
                title={INFORMACION_DEL_PROYECTO}
                description={AQUI_ESTA_TODA_INFORMACION}
                type="Info Trabajo"
                name={`${pealSeleccionado?.nombre}`}
              />
              <InfoCardContainer>
                <PhotoContainer>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "90px",
                      height: "90px",
                      backgroundColor: getColorByTypeAndString(
                        pealSeleccionado ? pealSeleccionado?.nombre : "1",
                      ),
                      borderRadius: "28px",
                    }}
                  >
                    <RandomIcon
                      id={pealSeleccionado ? pealSeleccionado?.id : 1}
                      perfil
                    />
                  </div>
                </PhotoContainer>
                <InfoCard>
                  <TagContainer onClick={() => dispatch(setActive(true))}>
                    <StateTag state={"Activo"} />
                    <EditContainer>
                      <Image
                        src={PlusEditButtonPNG}
                        alt=""
                        width={8}
                        height={8}
                      />
                      <EditText>{EDITAR}</EditText>
                    </EditContainer>
                  </TagContainer>
                  <TitleCardContainer>
                    <TitleCard>{pealSeleccionado?.nombre}</TitleCard>
                  </TitleCardContainer>
                  <TableCardContainer>
                    <LeftContainer>
                      <Slot style={{ borderTop: "none" }}>
                        <SlotText>{COMIENZO}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{DURACION}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{FIN_ESTIMADO}</SlotText>
                      </Slot>
                      <Slot style={{ borderBottom: "none" }}>
                        <SlotText>{PARTICIPANTES}</SlotText>
                      </Slot>
                    </LeftContainer>
                    <RightContainer>
                      <Slot style={{ borderTop: "none" }}>
                        <SlotText>
                          {pealSeleccionado?.comienzo.slice(5, -13)}
                        </SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>
                          {pealSeleccionado?.comienzo
                            ? calcularDiferenciaFechas(
                                pealSeleccionado.comienzo.slice(5, -13),
                              )
                            : "-"}
                        </SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>
                          {pealSeleccionado?.fin.slice(5, -13)}
                        </SlotText>
                      </Slot>
                      <Slot style={{ borderBottom: "none" }}>
                        <SlotText>
                          {colaboradores
                            ?.filter(
                              (colaborador) =>
                                colaborador.peal_id == pealSeleccionado?.id,
                            )
                            .length.toString()}
                        </SlotText>
                      </Slot>
                    </RightContainer>
                  </TableCardContainer>
                </InfoCard>
              </InfoCardContainer>
            </InfoTrabajadorContainer>
          </InfoContainer>
        ) : (
          <InfoContainer>
            <TextBoxContainer>
              <TextBox
                icon={ParticipantesIconPNG}
                title={PARTICIPANTES}
                description={AQUI_ESTAN_TODAS_PARTICIPANTES_EVALUACION}
                type="Info Bancaria"
                name={pealSeleccionado?.nombre}
              />
            </TextBoxContainer>
            <InfoEmergenciaContainer></InfoEmergenciaContainer>
            <SearchBox
              type="COLABORADOR"
              array={colaboradores?.filter(
                (colaborador) => colaborador.peal_id == pealSeleccionado?.id,
              )}
              participantesProyecto
            />
            {!modalActive || <Modal type="COLABORADOR" />}
          </InfoContainer>
        )}
      </MainCardContainer>
      {!modalActive || <Modal type="PROYECTO" edit />}
    </PerfilContainer>
  );
};
export default PerfilPage;
