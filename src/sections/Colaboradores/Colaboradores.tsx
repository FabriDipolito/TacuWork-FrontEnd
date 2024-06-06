import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ButtonText,
  ColaboradoresAddButton,
  ColaboradoresContainer,
  HeaderCard,
  MainCardContainer,
  TextBoxContainer,
} from "./styles";
import {
  AQUI_ESTAN_TODAS_COLABORADORES,
  COLABORADORES,
  NUEVO_COLABORADOR,
} from "@constants";
import { pealesGET } from "src/services/api/allPealesGET";
import { TextBox } from "@components";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  AddButtonPNG,
  AddButtonSelectedPNG,
  ColaboradoresIconPNG,
} from "src/assests";
import {
  setColaboradores,
  setPeales,
} from "@redux/slices/generalVariableSlice";
import { SearchBox } from "src/components/SearchBox/SearchBox";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";
import { Modal } from "src/components/Modal/Modal";
import { setActive } from "@redux/slices/modalSlice";
import { setEditColaborador } from "@redux/slices/colaboradoresSlice";
import { DeleteModal } from "src/components/Modal/DeleteModal/DeleteModal";
import { setColaboradorPerfil } from "@redux/slices/perfilColaboradoresSlice";

const ColaboradoresPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const colaboradorSeleccionado = useAppSelector(
    (state) => state.colaborador.colaboradorSelected,
  );
  const peales = useAppSelector((state) => state.general.peales);
  const pealSeleccionado = useAppSelector(
    (state) => state.colaborador.pealSelected,
  );
  const edit = useAppSelector((state) => state.colaborador.edit);
  const modalActive = useAppSelector((state) => state.modal.active);
  const modalDeleteActive = useAppSelector((state) => state.modalDelete.active);

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
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
    pealesGET()
      .then((allPeales) => {
        if (allPeales) {
          dispatch(setPeales(allPeales));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of users:", error);
      });
  }, []);

  return (
    <ColaboradoresContainer>
      <MainCardContainer>
        <HeaderCard>
          <ColaboradoresAddButton
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            onClick={() => {
              dispatch(setEditColaborador(false)),
                dispatch(setColaboradorPerfil(undefined)),
                dispatch(setActive(true));
            }}
          >
            <Image
              src={hoverButton ? AddButtonSelectedPNG : AddButtonPNG}
              height={14}
              width={14}
              alt=""
            />
            <ButtonText hover={hoverButton}>{NUEVO_COLABORADOR}</ButtonText>
          </ColaboradoresAddButton>
        </HeaderCard>
        <TextBoxContainer>
          <TextBox
            icon={ColaboradoresIconPNG}
            title={COLABORADORES}
            description={AQUI_ESTAN_TODAS_COLABORADORES}
          />
        </TextBoxContainer>
        <SearchBox type="COLABORADOR" array={colaboradores} />
      </MainCardContainer>
      {!modalActive || <Modal type="COLABORADOR" edit={edit} />}
      {!modalDeleteActive || <DeleteModal type="COLABORADOR" />}
    </ColaboradoresContainer>
  );
};
export default ColaboradoresPage;
