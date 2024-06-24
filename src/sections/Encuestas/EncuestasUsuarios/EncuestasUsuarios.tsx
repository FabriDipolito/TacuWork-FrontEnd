import React, { useEffect, useState } from "react";

import {
  Body,
  Button,
  ButtonBox,
  ButtonText,
  EncuestaContainer,
  EncuestaSegundaCapaContainer,
  Header,
  InputAreaBox,
  InputBox,
  InputContainer,
  InputText,
  InputTitle,
  LabelInput,
  LineTitle,
  LineTitleContainer,
  MainCardContainer,
  ModalCard,
  ModalContainer,
  ModalTitle,
  QuestionBody,
  QuestionContainer,
  QuestionResponse,
  QuestionText,
  RadioButton,
  StyledTextareaAutosize,
  TextResponse,
} from "./styles";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useRouter } from "next/router";
import {
  BIENVENIDOS_ENCUESTA,
  FINALIZAR,
  GRACIAS_POR_TU_RESPUESTA,
  INGRESA_TU_NOMBRE,
  INGRESE_UN_COMENTARIO,
  NOMBRE,
  OPCIONAL,
  PREGUNTA1_USUARIO,
  PREGUNTA2_USUARIO,
  PREGUNTA3_USUARIO,
} from "@constants";
import {
  setComentario,
  setId,
  setNombre,
  setPealSelected,
  setRespuesta1,
  setRespuesta2,
  setRespuesta3,
} from "@redux/slices/encuestasUsuariosSlice";
import { EncuestaPOST } from "src/services/api/encuestasPOST";
import Image from "next/image";
import { TacuruLogoPNG } from "src/assests";

const EncuestasUsuariosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const peales = useAppSelector((state) => state.general.peales);

  const pealSeleccionado = useAppSelector(
    (state) => state.encuestasUsuario.pealSelected,
  );
  const respuesta1 = useAppSelector(
    (state) => state.encuestasUsuario.respuesta1,
  );
  const respuesta2 = useAppSelector(
    (state) => state.encuestasUsuario.respuesta2,
  );
  const respuesta3 = useAppSelector(
    (state) => state.encuestasUsuario.respuesta3,
  );
  const comentario = useAppSelector(
    (state) => state.encuestasUsuario.comentario,
  );
  const nombre = useAppSelector((state) => state.encuestasUsuario.nombre);

  const router = useRouter();
  const { ids } = router.query;

  const [hoverButton, setHoverButton] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (ids) {
      dispatch(setId(Number(ids)));
      dispatch(setPealSelected(peales?.find((peal) => peal.id == Number(ids))));
    }
  }, [ids]);

  return (
    <EncuestaContainer>
      <EncuestaSegundaCapaContainer>
        <MainCardContainer>
          <Header />
          <LineTitleContainer>
            <LineTitle>
              {BIENVENIDOS_ENCUESTA} {pealSeleccionado?.nombre}
            </LineTitle>
          </LineTitleContainer>
          <InputContainer>
            <LabelInput>{NOMBRE}:</LabelInput>
            <InputBox>
              <InputTitle>{OPCIONAL}</InputTitle>
              <InputText
                value={nombre}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(setNombre(event.target.value));
                }}
                inputProps={{
                  maxLength: 50,
                }}
                placeholder={INGRESA_TU_NOMBRE}
              />
            </InputBox>
          </InputContainer>
          <Body>
            <QuestionContainer>
              <QuestionText>{PREGUNTA1_USUARIO}</QuestionText>
              <QuestionBody>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta1 == "Excelente"}
                    onChange={() => dispatch(setRespuesta1("Excelente"))}
                    value="Excelente"
                  />
                  <TextResponse>Excelente</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta1 == "Buena"}
                    onChange={() => dispatch(setRespuesta1("Buena"))}
                    value="Buena"
                  />
                  <TextResponse>Buena</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta1 == "Regular"}
                    onChange={() => dispatch(setRespuesta1("Regular"))}
                    value="Regular"
                  />
                  <TextResponse>Regular</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta1 == "Mala"}
                    onChange={() => dispatch(setRespuesta1("Mala"))}
                    value="Mala"
                  />
                  <TextResponse>Mala</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta1 == "Muy mala"}
                    onChange={() => dispatch(setRespuesta1("Muy mala"))}
                    value="Muy mala"
                  />
                  <TextResponse>Muy mala</TextResponse>
                </QuestionResponse>
              </QuestionBody>
            </QuestionContainer>
            <QuestionContainer>
              <QuestionText>{PREGUNTA2_USUARIO}</QuestionText>
              <QuestionBody>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta2 == "Siempre"}
                    onChange={() => dispatch(setRespuesta2("Siempre"))}
                    value="Siempre"
                  />
                  <TextResponse>Siempre</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta2 == "La mayor parte del tiempo"}
                    onChange={() =>
                      dispatch(setRespuesta2("La mayor parte del tiempo"))
                    }
                    value="La mayor parte del tiempo"
                  />
                  <TextResponse>La mayor parte del tiempo</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta2 == "A veces"}
                    onChange={() => dispatch(setRespuesta2("A veces"))}
                    value="A veces"
                  />
                  <TextResponse>A veces</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta2 == "Rara vez"}
                    onChange={() => dispatch(setRespuesta2("Rara vez"))}
                    value="Rara vez"
                  />
                  <TextResponse>Rara vez</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta2 == "Nunca"}
                    onChange={() => dispatch(setRespuesta2("Nunca"))}
                    value="Nunca"
                  />
                  <TextResponse>Nunca</TextResponse>
                </QuestionResponse>
              </QuestionBody>
            </QuestionContainer>
            <QuestionContainer>
              <QuestionText>{PREGUNTA3_USUARIO}</QuestionText>
              <QuestionBody>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta3 == "Muy positivo"}
                    onChange={() => dispatch(setRespuesta3("Muy positivo"))}
                    value="Muy positivo"
                  />
                  <TextResponse>Muy positivo</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta3 == "Positivo"}
                    onChange={() => dispatch(setRespuesta3("Positivo"))}
                    value="Positivo"
                  />
                  <TextResponse>Positivo</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta3 == "Neutral"}
                    onChange={() => dispatch(setRespuesta3("Neutral"))}
                    value="Neutral"
                  />
                  <TextResponse>Neutral</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta3 == "Negativo"}
                    onChange={() => dispatch(setRespuesta3("Negativo"))}
                    value="Negativo"
                  />
                  <TextResponse>Negativo</TextResponse>
                </QuestionResponse>
                <QuestionResponse>
                  <RadioButton
                    checked={respuesta3 == "Muy negativo"}
                    onChange={() => dispatch(setRespuesta3("Muy negativo"))}
                    value="Muy negativo"
                  />
                  <TextResponse>Muy negativo</TextResponse>
                </QuestionResponse>
              </QuestionBody>
            </QuestionContainer>
            <ButtonBox>
              <InputAreaBox>
                <InputTitle>{OPCIONAL}</InputTitle>
                <StyledTextareaAutosize
                  placeholder={INGRESE_UN_COMENTARIO}
                  onChange={(e) => dispatch(setComentario(e.target.value))}
                  value={comentario}
                  spellCheck="false"
                  maxLength={255}
                />
              </InputAreaBox>
              <Button
                available={
                  Boolean(respuesta1) &&
                  Boolean(respuesta2) &&
                  Boolean(respuesta3)
                }
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                onClick={() => {
                  if (respuesta1 && respuesta2 && respuesta3) {
                    EncuestaPOST(
                      respuesta1,
                      respuesta2,
                      respuesta3,
                      comentario,
                      Number(ids),
                      nombre && nombre.trim() !== "" ? nombre : undefined,
                    );
                  }
                  setModalActive(true);
                }}
              >
                <ButtonText
                  hover={hoverButton}
                  available={
                    Boolean(respuesta1) &&
                    Boolean(respuesta2) &&
                    Boolean(respuesta3)
                  }
                >
                  {FINALIZAR}
                </ButtonText>
              </Button>
            </ButtonBox>
          </Body>
        </MainCardContainer>
        {!modalActive || (
          <ModalContainer>
            <ModalCard>
              <Image src={TacuruLogoPNG} alt="" width={120} height={120} />
              <ModalTitle>{GRACIAS_POR_TU_RESPUESTA}</ModalTitle>
            </ModalCard>
          </ModalContainer>
        )}
      </EncuestaSegundaCapaContainer>
    </EncuestaContainer>
  );
};
export default EncuestasUsuariosPage;
