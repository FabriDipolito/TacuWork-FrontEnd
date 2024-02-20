import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonBox,
  ButtonText,
  Header,
  Input,
  InputBox,
  InputText,
  InputTitle,
  LeftBox,
  MainBox,
  ModalBackground,
  ModalCard,
  Photo,
  RightBox,
  SubTitle,
  Title,
  TitleBox,
} from "./styles";
import {
  COLABORADOR,
  COLABORADORES_MODAL,
  CREAR,
  EVALUAR,
  PROYECTO_MODAL,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  clearModal,
  setActive,
  setApellido,
  setBarrio,
  setComienzo,
  setEdad,
  setEgresos,
  setFin,
  setHijos,
  setNivelEducativo,
  setNombreColaborador,
  setNombrePeal,
  setPealId,
  setTelefono,
} from "@redux/slices/modalSlice";
import { ColaboradorPOST } from "src/services/api/colaboradorPOST";
import { PealPOST } from "src/services/api/pealesPOST";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";
import { setColaboradores } from "@redux/slices/generalVariableSlice";

interface modalProps {
  type: "COLABORADOR" | "PROYECTO" | "EVALUACION";
}

const Modal: React.FC<modalProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  // COLABORADOR
  const nombreColaborador = useAppSelector(
    (state) => state.modal.nombre_colaborador,
  );
  const apellidoColaborador = useAppSelector((state) => state.modal.apellido);
  const edad = useAppSelector((state) => state.modal.edad);
  const hijos = useAppSelector((state) => state.modal.hijos);
  const barrio = useAppSelector((state) => state.modal.barrio);
  const telefono = useAppSelector((state) => state.modal.telefono);
  const nivelEducativo = useAppSelector((state) => state.modal.nivel_educativo);
  const egresos = useAppSelector((state) => state.modal.egresos);
  const pealId = useAppSelector((state) => state.modal.peal_id);

  // PROYECTO
  const nombreProyecto = useAppSelector((state) => state.modal.nombre_peal);
  const comienzo = useAppSelector((state) => state.modal.comienzo);
  const fin = useAppSelector((state) => state.modal.fin);

  const [hoverButton, setHoverButton] = useState(false);

  const handleOnClick = () => {
    if (
      type == "COLABORADOR" &&
      nombreColaborador &&
      apellidoColaborador &&
      edad &&
      hijos &&
      barrio &&
      telefono &&
      nivelEducativo &&
      egresos &&
      pealId
    )
      ColaboradorPOST(
        nombreColaborador,
        apellidoColaborador,
        edad,
        hijos,
        barrio,
        telefono,
        nivelEducativo,
        egresos,
        pealId,
      );

    if (type == "PROYECTO" && nombreProyecto && comienzo && fin)
      PealPOST(nombreProyecto, comienzo, fin);

    dispatch(setActive(false));
  };

  return (
    <ModalBackground>
      <ModalCard>
        <Header>
          <Photo />
          <TitleBox>
            <Title>
              {nombreColaborador} {apellidoColaborador}
            </Title>
            <SubTitle>{egresos}</SubTitle>
          </TitleBox>
        </Header>
        <MainBox>
          <LeftBox>
            {type == "COLABORADOR" ? (
              <>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[0]}</InputTitle>
                  <InputText
                    value={nombreColaborador}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNombreColaborador(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[2]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setEdad(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[4]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNivelEducativo(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[6]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setBarrio(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[8]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setPealId(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PROYECTO" ? (
              <>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[0]}</InputTitle>
                  <InputText
                    value={nombreProyecto}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setNombrePeal(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[2]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setFin(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : (
              <></>
            )}
          </LeftBox>
          <RightBox>
            {type == "COLABORADOR" ? (
              <>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[1]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setApellido(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[3]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setHijos(event.target.value as unknown as number),
                      );
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[5]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setTelefono(event.target.value));
                    }}
                  />
                </InputBox>
                <InputBox>
                  <InputTitle>{COLABORADORES_MODAL[7]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setEgresos(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : type == "PROYECTO" ? (
              <>
                <InputBox>
                  <InputTitle>{PROYECTO_MODAL[1]}</InputTitle>
                  <InputText
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setComienzo(event.target.value));
                    }}
                  />
                </InputBox>
              </>
            ) : (
              <></>
            )}
            <ButtonBox>
              <Button
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                onClick={() => handleOnClick()}
              >
                <ButtonText hover={hoverButton}>
                  {type == "EVALUACION" ? EVALUAR : CREAR}
                </ButtonText>
              </Button>
            </ButtonBox>
          </RightBox>
        </MainBox>
      </ModalCard>
    </ModalBackground>
  );
};

export { Modal };
