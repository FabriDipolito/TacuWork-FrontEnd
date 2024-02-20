import React, { useEffect } from "react";
import {
  ColumnContainer,
  LinkContent,
  LinkText,
  LinksContainer,
  LogoContainer,
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
} from "../../assests";
import { ANALISIS, COLABORADORES, EVALUACIONES, PROYECTOS } from "@constants";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const route = useRouter();

  return (
    <StyledNavBar>
      <ColumnContainer>
        <LogoContainer>
          <Image src={TacuWorkLogoPNG} height={50} width={90} alt="" />
        </LogoContainer>
        <LinksContainer>
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
              <LinkText selected={route.pathname == "/Colaboradores"}>
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
              <LinkText selected={route.pathname == "/Proyectos"}>
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
              <LinkText selected={route.pathname == "/Evaluaciones"}>
                {EVALUACIONES}
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
              <LinkText selected={route.pathname == "/Analisis"}>
                {ANALISIS}
              </LinkText>
            </LinkContent>
          </Link>
        </LinksContainer>
      </ColumnContainer>
    </StyledNavBar>
  );
};

export { NavBar };
