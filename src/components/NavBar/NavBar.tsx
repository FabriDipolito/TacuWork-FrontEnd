import React, { useEffect, useState } from "react";
import {
  ColumnContainer,
  LinkContent,
  LinkText,
  LinksContainer,
  LogoContainer,
  LogoutContainer,
  StyledNavBar,
} from "./styles";
import Image from "next/image";
import {
  TacuWorkLogoPNG,
  EvaluacionIconActivoPNG,
  AnalisisIconActivoPNG,
  ColaboradoresIconActivoPNG,
  ProyectosIconActivoPNG,
  ColaboradoresIconInactivoPNG,
  ProyectosIconInactivoPNG,
  EvaluacionIconInactivoPNG,
  AnalisisIconInactivoPNG,
  LogOutPNG,
  LogOutHoverPNG,
  EncuestaIconActivePNG,
  EncuestaIconPNG,
  RankingIconInactivePNG,
  RankingIconActivePNG,
} from "../../assests";
import {
  ANALISIS,
  CERRAR_SESSION,
  COLABORADORES,
  ENCUESTAS,
  EVALUACIONES,
  PROYECTOS,
  RANKING,
} from "@constants";
import Link from "next/link";
import router, { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const route = useRouter();
  const [isFocused1, setIsFocused1] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
    console.log("entro");
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
    console.log("se fue");
  };

  return (
    <StyledNavBar>
      <ColumnContainer>
        <LogoContainer>
          <Image src={TacuWorkLogoPNG} height={50} width={90} alt="" />
        </LogoContainer>
        <LinksContainer>
          <Link href="/Ranking" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "18px", width: "18px" }}>
                {route.pathname == "/Ranking" || route.pathname == "/" ? (
                  <Image
                    src={RankingIconActivePNG}
                    height={20}
                    width={20}
                    alt=""
                  />
                ) : (
                  <Image
                    src={RankingIconInactivePNG}
                    height={20}
                    width={20}
                    alt=""
                  />
                )}
              </div>
              <LinkText selected={route.pathname == "/Ranking"} logout={false}>
                {RANKING}
              </LinkText>
            </LinkContent>
          </Link>
          <Link href="/Analisis" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "14px", width: "18px" }}>
                {route.pathname == "/Analisis" ? (
                  <Image
                    src={AnalisisIconActivoPNG}
                    height={14}
                    width={18}
                    alt=""
                  />
                ) : (
                  <Image
                    src={AnalisisIconInactivoPNG}
                    height={14}
                    width={18}
                    alt=""
                  />
                )}
              </div>
              <LinkText selected={route.pathname == "/Analisis"} logout={false}>
                {ANALISIS}
              </LinkText>
            </LinkContent>
          </Link>
          <Link href="/Colaboradores" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "15px", width: "20px" }}>
                {route.pathname == "/Colaboradores" ? (
                  <Image
                    src={ColaboradoresIconActivoPNG}
                    height={15}
                    width={20}
                    alt=""
                  />
                ) : (
                  <Image
                    src={ColaboradoresIconInactivoPNG}
                    height={15}
                    width={20}
                    alt=""
                  />
                )}
              </div>
              <LinkText
                selected={route.pathname == "/Colaboradores"}
                logout={false}
              >
                {COLABORADORES}
              </LinkText>
            </LinkContent>
          </Link>
          <Link href="/Proyectos" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "18px", width: "16px" }}>
                {route.pathname == "/Proyectos" ? (
                  <Image
                    src={ProyectosIconActivoPNG}
                    height={18}
                    width={16}
                    alt=""
                  />
                ) : (
                  <Image
                    src={ProyectosIconInactivoPNG}
                    height={18}
                    width={16}
                    alt=""
                  />
                )}
              </div>
              <LinkText
                selected={route.pathname == "/Proyectos"}
                logout={false}
              >
                {PROYECTOS}
              </LinkText>
            </LinkContent>
          </Link>
          <Link href="/Evaluaciones" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "16px", width: "16px" }}>
                {route.pathname == "/Evaluaciones" ? (
                  <Image
                    src={EvaluacionIconActivoPNG}
                    height={16}
                    width={16}
                    alt=""
                  />
                ) : (
                  <Image
                    src={EvaluacionIconInactivoPNG}
                    height={16}
                    width={16}
                    alt=""
                  />
                )}
              </div>
              <LinkText
                selected={route.pathname == "/Evaluaciones"}
                logout={false}
              >
                {EVALUACIONES}
              </LinkText>
            </LinkContent>
          </Link>
          <Link href="/Encuestas" style={{ textDecoration: "none" }}>
            <LinkContent>
              <div style={{ height: "16px", width: "16px" }}>
                {route.pathname == "/Encuestas" ? (
                  <Image
                    src={EncuestaIconActivePNG}
                    height={16}
                    width={18}
                    alt=""
                  />
                ) : (
                  <Image src={EncuestaIconPNG} height={16} width={18} alt="" />
                )}
              </div>
              <LinkText
                selected={route.pathname == "/Encuestas"}
                logout={false}
              >
                {ENCUESTAS}
              </LinkText>
            </LinkContent>
          </Link>
        </LinksContainer>
      </ColumnContainer>
      <LogoutContainer
        onClick={() => router.push("/auth/logout")}
        onMouseEnter={handleFocus1}
        onMouseLeave={handleBlur1}
      >
        <LinkContent>
          <div style={{ height: "25px", width: "25px" }}>
            <Image
              src={isFocused1 ? LogOutHoverPNG : LogOutPNG}
              height={22}
              width={22}
              alt=""
            />
          </div>
          <LinkText selected={false} logout>
            {CERRAR_SESSION}
          </LinkText>
        </LinkContent>
      </LogoutContainer>
    </StyledNavBar>
  );
};

export { NavBar };
