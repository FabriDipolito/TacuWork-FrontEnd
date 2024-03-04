import React, { useEffect } from "react";

import { NextFixedPage } from "./styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@redux/hooks";
import { colaboradoresGET } from "src/services/api/allColaboradoresGET";
import { pealesGET } from "src/services/api/allPealesGET";
import {
  setColaboradores,
  setEvaluaciones,
  setPeales,
  setPuntajes,
} from "@redux/slices/generalVariableSlice";
import { puntajesGET } from "src/services/api/allPuntajesGET";
import { evaluacionesGET } from "src/services/api/allEvaluacionesGET";

const Background: React.FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const checkSession = async () => {
    if (status == "unauthenticated") {
      await router.push("auth/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, [session]);

  useEffect(() => {
    colaboradoresGET()
      .then((allColaboradores) => {
        if (allColaboradores) {
          dispatch(setColaboradores(allColaboradores));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of colaboradores:", error);
      });

    pealesGET()
      .then((allPeales) => {
        if (allPeales) {
          dispatch(setPeales(allPeales));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of peales:", error);
      });

    evaluacionesGET()
      .then((allEvaluaciones) => {
        if (allEvaluaciones) {
          dispatch(setEvaluaciones(allEvaluaciones));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of evaluaciones:", error);
      });

    puntajesGET()
      .then((allPuntajes) => {
        if (allPuntajes) {
          dispatch(setPuntajes(allPuntajes));
        }
      })
      .catch((error) => {
        console.error("Error to obtain data of puntajes:", error);
      });
  }, []);

  return <NextFixedPage>{children}</NextFixedPage>;
};
export default Background;
