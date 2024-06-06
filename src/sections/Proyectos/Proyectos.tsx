import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ButtonText,
  HeaderCard,
  MainCardContainer,
  ProyectosAddButton,
  ProyectosContainer,
  TextBoxContainer,
} from "./styles";
import {
  AQUI_ESTAN_TODAS_PROYECTOS,
  NUEVA_PROYECTO,
  PROYECTOS,
} from "@constants";
import { pealesGET } from "src/services/api/allPealesGET";
import { TextBox } from "@components";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  AddButtonPNG,
  AddButtonSelectedPNG,
  ProyectosIconPNG,
} from "src/assests";
import {
  setColaboradores,
  setPeales,
} from "@redux/slices/generalVariableSlice";
import { SearchBox } from "src/components/SearchBox/SearchBox";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";
import { Modal } from "src/components/Modal/Modal";
import { setActive } from "@redux/slices/modalSlice";
import { setEditProyecto } from "@redux/slices/proyectosSlice";
import { DeleteModal } from "src/components/Modal/DeleteModal/DeleteModal";
import { setProyectoPerfil } from "@redux/slices/perfilProyectosSlice";

const ProyectosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const colaboradores = useAppSelector((state) => state.general.colaboradores);
  const peales = useAppSelector((state) => state.general.peales);
  const pealSeleccionado = useAppSelector(
    (state) => state.proyecto.pealSelected,
  );
  const edit = useAppSelector((state) => state.proyecto.edit);
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
    <ProyectosContainer>
      <MainCardContainer>
        <HeaderCard>
          <ProyectosAddButton
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            onClick={() => {
              dispatch(setEditProyecto(false)),
                dispatch(setProyectoPerfil(undefined)),
                dispatch(setActive(true));
            }}
          >
            <Image
              src={hoverButton ? AddButtonSelectedPNG : AddButtonPNG}
              height={14}
              width={14}
              alt=""
            />
            <ButtonText hover={hoverButton}>{NUEVA_PROYECTO}</ButtonText>
          </ProyectosAddButton>
        </HeaderCard>
        <TextBoxContainer>
          <TextBox
            icon={ProyectosIconPNG}
            title={PROYECTOS}
            description={AQUI_ESTAN_TODAS_PROYECTOS}
          />
        </TextBoxContainer>
        <SearchBox type="PROYECTO" array={peales} />
      </MainCardContainer>
      {!modalActive || <Modal type="PROYECTO" edit={edit} />}
      {!modalDeleteActive || <DeleteModal type="PROYECTO" />}
    </ProyectosContainer>
  );
};
export default ProyectosPage;
