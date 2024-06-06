/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from "react";

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
  InfoBancariaContainer,
  InfoEmergenciaContainer,
  InfoBancariaCard,
  InfoEmergencyCard,
  InputText,
  SelectText,
  FilterPlaceholder,
  InputBox,
  LabelText,
  TagContainer,
  EditContainer,
  EditText,
  PhotoInput,
  GuardarContainer,
  InputContainer,
  SelectOptions,
} from "./styles";
import {
  AQUI_ESTA_TODA_INFORMACION,
  BANCO,
  BANCOS_URUGUAY,
  BARRIO,
  BUSCAR,
  CONTACTO_EMERGENCIA,
  DETALLES_CUENTA_BANCARIA,
  EDAD,
  EDITAR,
  EGRESOS,
  ESTOS_SON_PROYECTOS,
  GUARDAR,
  HIJOS,
  INFORMACION_BANCARIA,
  INFORMACION_DEL_TRABAJADOR,
  NIVEL_EDUCATIVO,
  NOMBRE,
  NUMERO_CUENTA,
  NUMERO_TELEFONO,
  PERFIL,
  PERSONAL,
  PRESENTE_INFORMACION,
  PROYECTOS,
  SIN_PROYECTOS_ATRIBUIDOS,
  SUCURSAL,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setBanco,
  setLinkSelected,
  setNombreEmergencia,
  setNumeroCuenta,
  setSrcImage,
  setSucursal,
  setTelefonoEmergencia,
} from "@redux/slices/perfilColaboradoresSlice";
import { Avatar, SelectChangeEvent } from "@mui/material";
import { TextBox } from "@components";
import {
  AddPhotoPerfilPNG,
  ContactoEmergenciaIconPNG,
  InformacionBancariaIconPNG,
  InformacionTrabajoIconPNG,
  PlusEditButtonPNG,
  PlusEditButtonUnActivePNG,
  ProyectosGroupIconPNG,
} from "src/assests";
import { setColaboradores } from "@redux/slices/generalVariableSlice";
import { ColaboradorProps } from "@types";
import { setColaboradorPerfil } from "@redux/slices/perfilColaboradoresSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { StateTag } from "src/components/StateTag/StateTag";
import { Modal } from "src/components/Modal/Modal";
import { setActive, setNombreColaborador } from "@redux/slices/modalSlice";
import { ColaboradorPUT } from "src/services/api/colaboradorPUT";
import { setEditColaborador } from "@redux/slices/colaboradoresSlice";
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
  const linkSeleccionado = useAppSelector((state) => state.perfil.linkSelected);
  const banco = useAppSelector((state) => state.perfil.banco);
  const sucursal = useAppSelector((state) => state.perfil.sucursal);
  const numeroCuenta = useAppSelector((state) => state.perfil.numero_cuenta);
  const nombreEmergencia = useAppSelector(
    (state) => state.perfil.nombre_emergencia,
  );
  const telefonoEmergencia = useAppSelector(
    (state) => state.perfil.telefono_emergencia,
  );

  const colaboradorSeleccionado = useAppSelector(
    (state) => state.perfil.colaboradorSelected,
  );
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);

  const modalActive = useAppSelector((state) => state.modal.active);

  const srcImage = useAppSelector((state) => state.perfil.srcImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused1, setIsFocused1] = useState(false);

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
    dispatch(setLinkSelected("PERFIL"));
    if (colaboradorSeleccionado) {
      dispatch(setBanco(colaboradorSeleccionado.banco));
      dispatch(setSucursal(colaboradorSeleccionado.sucursal));
      dispatch(setNumeroCuenta(colaboradorSeleccionado.numero_cuenta));
      dispatch(setNombreEmergencia(colaboradorSeleccionado.nombre_emergencia));
      dispatch(
        setTelefonoEmergencia(colaboradorSeleccionado.telefono_emergencia),
      );
    }
  }, [colaboradorSeleccionado]);

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (colaboradorSeleccionado && file) {
      const OkColaboradores = await ColaboradorPUT(
        colaboradorSeleccionado.id,
        colaboradorSeleccionado.nombre,
        colaboradorSeleccionado.apellido,
        colaboradorSeleccionado.edad,
        colaboradorSeleccionado.hijos,
        colaboradorSeleccionado.zona_residencial,
        colaboradorSeleccionado.telefono,
        colaboradorSeleccionado.nivel_educativo,
        colaboradorSeleccionado.egresos,
        colaboradorSeleccionado.peal_id,
        file as File,
      );
      if (OkColaboradores) {
        const base64Image = ((await convertToBase64(file)) as string).slice(23);
        const updatedColaborador = {
          id: colaboradorSeleccionado.id,
          nombre: colaboradorSeleccionado.nombre,
          apellido: colaboradorSeleccionado.apellido,
          edad: colaboradorSeleccionado.edad,
          hijos: colaboradorSeleccionado.hijos,
          zona_residencial: colaboradorSeleccionado.zona_residencial,
          telefono: colaboradorSeleccionado.telefono,
          nivel_educativo: colaboradorSeleccionado.nivel_educativo,
          egresos: colaboradorSeleccionado.egresos,
          peal_id: colaboradorSeleccionado.peal_id,
          imagen: base64Image,
        };
        dispatch(
          setColaboradores(
            colaboradores?.map((colaborador) =>
              (updatedColaborador as ColaboradorProps).id == colaborador.id
                ? updatedColaborador
                : colaborador,
            ),
          ),
        );
        dispatch(setColaboradorPerfil(updatedColaborador));
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGuardarContainerClick = () => {
    if (colaboradorSeleccionado) {
      const OkColaboradores = ColaboradorPUT(
        colaboradorSeleccionado.id,
        colaboradorSeleccionado.nombre,
        colaboradorSeleccionado.apellido,
        colaboradorSeleccionado.edad,
        colaboradorSeleccionado.hijos,
        colaboradorSeleccionado.zona_residencial,
        colaboradorSeleccionado.telefono,
        colaboradorSeleccionado.nivel_educativo,
        colaboradorSeleccionado.egresos,
        colaboradorSeleccionado.peal_id,
        undefined,
        banco,
        sucursal,
        numeroCuenta,
        nombreEmergencia,
        telefonoEmergencia,
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
    }
  };

  useEffect(() => {
    if (colaboradorSeleccionado) {
      if (colaboradorSeleccionado.imagen) {
        const base64Image = `data:image/jpeg;base64,${colaboradorSeleccionado.imagen}`;
        dispatch(setSrcImage(base64Image));
      } else {
        dispatch(setSrcImage(null));
      }
    }
  }, [colaboradorSeleccionado]);

  return (
    <PerfilContainer>
      <MainCardContainer>
        <HeaderCard>
          {srcImage ? (
            <Image
              src={srcImage}
              alt={colaboradorSeleccionado?.nombre || "Imagen"}
              width={35}
              height={35}
              style={{
                borderRadius: "7px",
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
                width: 35,
                height: 35,
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
          )}

          <TitleText>
            {colaboradorSeleccionado &&
            colaboradorSeleccionado?.nombre &&
            colaboradorSeleccionado?.apellido
              ? colaboradorSeleccionado?.nombre
              : ""}{" "}
            {colaboradorSeleccionado &&
            colaboradorSeleccionado?.nombre &&
            colaboradorSeleccionado?.apellido
              ? colaboradorSeleccionado?.apellido
              : ""}
          </TitleText>
        </HeaderCard>
        <SubHeaderCard>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PERFIL"))}
            selected={linkSeleccionado == "PERFIL"}
          >
            {PERFIL}
          </PageLink>
          <PageLink
            onClick={() => dispatch(setLinkSelected("PERSONAL"))}
            selected={linkSeleccionado == "PERSONAL"}
          >
            {PERSONAL}
          </PageLink>
        </SubHeaderCard>
        {linkSeleccionado == "PERFIL" ? (
          <InfoContainer>
            <InfoTrabajadorContainer>
              <TextBox
                icon={InformacionTrabajoIconPNG}
                title={INFORMACION_DEL_TRABAJADOR}
                description={AQUI_ESTA_TODA_INFORMACION}
                type="Info Trabajo"
                name={`${colaboradorSeleccionado?.nombre} ${colaboradorSeleccionado?.apellido}`}
              />
              <InfoCardContainer>
                <PhotoInput
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  id="file-upload"
                ></PhotoInput>
                {srcImage ? (
                  <PhotoContainer onClick={handleContainerClick}>
                    <Image
                      src={srcImage}
                      alt={colaboradorSeleccionado?.nombre || "Imagen"}
                      width={89}
                      height={89}
                      style={{ borderRadius: "29px" }}
                    />
                  </PhotoContainer>
                ) : (
                  <PhotoContainer onClick={handleContainerClick}>
                    <Image
                      src={AddPhotoPerfilPNG}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </PhotoContainer>
                )}

                <InfoCard>
                  <TagContainer>
                    <StateTag state={colaboradorSeleccionado?.egresos || ""} />
                    <EditContainer
                      onClick={() => {
                        dispatch(setEditColaborador(true));
                        dispatch(setActive(true));
                      }}
                    >
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
                    <TitleCard>
                      {colaboradorSeleccionado?.nombre}{" "}
                      {colaboradorSeleccionado?.apellido}
                    </TitleCard>
                  </TitleCardContainer>
                  <TableCardContainer>
                    <LeftContainer>
                      <Slot style={{ borderTop: "none" }}>
                        <SlotText>{EDAD}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{HIJOS}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{NIVEL_EDUCATIVO}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{NUMERO_TELEFONO}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{BARRIO}</SlotText>
                      </Slot>
                      <Slot style={{ borderBottom: "none" }}>
                        <SlotText>{EGRESOS}</SlotText>
                      </Slot>
                    </LeftContainer>
                    <RightContainer>
                      <Slot style={{ borderTop: "none" }}>
                        <SlotText>{colaboradorSeleccionado?.edad}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{colaboradorSeleccionado?.hijos}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>
                          {colaboradorSeleccionado?.nivel_educativo}
                        </SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>{colaboradorSeleccionado?.telefono}</SlotText>
                      </Slot>
                      <Slot>
                        <SlotText>
                          {colaboradorSeleccionado?.zona_residencial}
                        </SlotText>
                      </Slot>
                      <Slot style={{ borderBottom: "none" }}>
                        <SlotText>{colaboradorSeleccionado?.egresos}</SlotText>
                      </Slot>
                    </RightContainer>
                  </TableCardContainer>
                </InfoCard>
              </InfoCardContainer>
            </InfoTrabajadorContainer>
            <ProyectoContainer>
              <TextBox
                icon={ProyectosGroupIconPNG}
                title={PROYECTOS}
                description={`${ESTOS_SON_PROYECTOS}:`}
              />
              <ProyectoBox>
                {colaboradorSeleccionado?.peal_id ? (
                  <Container>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "35px",
                        height: "35px",
                        backgroundColor: getColorByTypeAndString(
                          peales?.find(
                            (peal) =>
                              peal.id == colaboradorSeleccionado.peal_id,
                          )?.nombre || "1",
                        ),
                        borderRadius: "11px",
                      }}
                    >
                      <RandomIcon
                        id={
                          peales?.find(
                            (peal) =>
                              peal.id == colaboradorSeleccionado.peal_id,
                          )?.id || 1
                        }
                      />
                    </div>
                    <ProyectoText>
                      {
                        peales?.find(
                          (peal) => peal.id == colaboradorSeleccionado.peal_id,
                        )?.nombre
                      }
                    </ProyectoText>
                  </Container>
                ) : (
                  <ProyectoText>{SIN_PROYECTOS_ATRIBUIDOS}</ProyectoText>
                )}
              </ProyectoBox>
            </ProyectoContainer>
          </InfoContainer>
        ) : (
          <InfoContainer>
            <InfoBancariaContainer>
              <TextBox
                icon={InformacionBancariaIconPNG}
                title={INFORMACION_BANCARIA}
                description={DETALLES_CUENTA_BANCARIA}
                type="Info Bancaria"
              />
              <InfoBancariaCard>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "fit-content",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <GuardarContainer
                    onClick={() => {
                      if (
                        !(
                          colaboradorSeleccionado?.banco == banco &&
                          colaboradorSeleccionado?.sucursal == sucursal &&
                          colaboradorSeleccionado?.numero_cuenta == numeroCuenta
                        )
                      ) {
                        handleGuardarContainerClick();
                      }
                    }}
                    clickeable={
                      !(
                        colaboradorSeleccionado?.banco == banco &&
                        colaboradorSeleccionado?.sucursal == sucursal &&
                        colaboradorSeleccionado?.numero_cuenta == numeroCuenta
                      )
                    }
                  >
                    <Image
                      src={
                        !(
                          colaboradorSeleccionado?.banco == banco &&
                          colaboradorSeleccionado?.sucursal == sucursal &&
                          colaboradorSeleccionado?.numero_cuenta == numeroCuenta
                        )
                          ? PlusEditButtonPNG
                          : PlusEditButtonUnActivePNG
                      }
                      alt=""
                      width={8}
                      height={8}
                    />
                    <EditText
                      clickeable={
                        !(
                          colaboradorSeleccionado?.banco == banco &&
                          colaboradorSeleccionado?.sucursal == sucursal &&
                          colaboradorSeleccionado?.numero_cuenta == numeroCuenta
                        )
                      }
                    >
                      {GUARDAR}
                    </EditText>
                  </GuardarContainer>
                </div>
                <InputContainer>
                  <InputBox>
                    <LabelText>{BANCO}</LabelText>
                    <SelectText
                      // @ts-ignore
                      placeholder={!isFocused1 && !banco}
                      defaultValue={
                        colaboradorSeleccionado && colaboradorSeleccionado.banco
                          ? colaboradorSeleccionado.banco
                          : ""
                      }
                      onOpen={handleFocus1}
                      onClose={handleBlur1}
                      onChange={(event: SelectChangeEvent) => {
                        dispatch(setBanco(event.target.value as string));
                      }}
                      startAdornment={
                        isFocused1 || banco ? (
                          <></>
                        ) : (
                          <>
                            <FilterPlaceholder>{BUSCAR}</FilterPlaceholder>
                          </>
                        )
                      }
                    >
                      {BANCOS_URUGUAY?.map((name) => (
                        <SelectOptions key={name} value={name}>
                          {name}
                        </SelectOptions>
                      ))}
                    </SelectText>
                  </InputBox>
                  <InputBox>
                    <LabelText>{SUCURSAL}</LabelText>
                    <InputText
                      value={sucursal}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        dispatch(setSucursal(event.target.value));
                      }}
                    />
                  </InputBox>
                  <InputBox>
                    <LabelText>{NUMERO_CUENTA}</LabelText>
                    <InputText
                      value={numeroCuenta}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        dispatch(setNumeroCuenta(event.target.value));
                      }}
                    />
                  </InputBox>
                </InputContainer>
              </InfoBancariaCard>
            </InfoBancariaContainer>
            <InfoEmergenciaContainer>
              <TextBox
                icon={ContactoEmergenciaIconPNG}
                title={CONTACTO_EMERGENCIA}
                description={PRESENTE_INFORMACION}
                type="Info Emergencia"
              />
              <InfoEmergencyCard>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "fit-content",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <GuardarContainer
                    onClick={() => {
                      if (
                        !(
                          colaboradorSeleccionado?.nombre_emergencia ==
                            nombreEmergencia &&
                          colaboradorSeleccionado?.telefono_emergencia ==
                            telefonoEmergencia
                        )
                      ) {
                        handleGuardarContainerClick();
                      }
                    }}
                    clickeable={
                      !(
                        colaboradorSeleccionado?.nombre_emergencia ==
                          nombreEmergencia &&
                        colaboradorSeleccionado?.telefono_emergencia ==
                          telefonoEmergencia
                      )
                    }
                  >
                    <Image
                      src={
                        !(
                          colaboradorSeleccionado?.nombre_emergencia ==
                            nombreEmergencia &&
                          colaboradorSeleccionado?.telefono_emergencia ==
                            telefonoEmergencia
                        )
                          ? PlusEditButtonPNG
                          : PlusEditButtonUnActivePNG
                      }
                      alt=""
                      width={8}
                      height={8}
                    />
                    <EditText
                      clickeable={
                        !(
                          colaboradorSeleccionado?.nombre_emergencia ==
                            nombreEmergencia &&
                          colaboradorSeleccionado?.telefono_emergencia ==
                            telefonoEmergencia
                        )
                      }
                    >
                      {GUARDAR}
                    </EditText>
                  </GuardarContainer>
                </div>
                <InputContainer>
                  <InputBox>
                    <LabelText>{NOMBRE}</LabelText>
                    <InputText
                      value={nombreEmergencia}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        dispatch(setNombreEmergencia(event.target.value));
                      }}
                    />
                  </InputBox>
                  <InputBox>
                    <LabelText>{NUMERO_TELEFONO}</LabelText>
                    <InputText
                      value={telefonoEmergencia}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        dispatch(setTelefonoEmergencia(event.target.value));
                      }}
                    />
                  </InputBox>
                </InputContainer>
              </InfoEmergencyCard>
            </InfoEmergenciaContainer>
          </InfoContainer>
        )}
      </MainCardContainer>
      {!modalActive || <Modal type="COLABORADOR" edit />}
    </PerfilContainer>
  );
};
export default PerfilPage;
