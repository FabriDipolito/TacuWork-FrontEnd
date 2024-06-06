import React, { useEffect, useState } from "react";

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
import Loader from "./Loader/Loader";
import { EvaluacionProps } from "@types";

const Background: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const checkSession = async () => {
    if (status === "unauthenticated" && router.pathname !== "/auth/login") {
      await router.push("auth/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, [status, router.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allColaboradores = await colaboradoresGET();
        if (allColaboradores) {
          dispatch(setColaboradores(allColaboradores));
        }

        const allPeales = await pealesGET();
        if (allPeales) {
          dispatch(setPeales(allPeales));
        }

        const allEvaluaciones = await evaluacionesGET();
        if (allEvaluaciones) {
          dispatch(
            setEvaluaciones(
              allEvaluaciones?.sort(
                (a: EvaluacionProps, b: EvaluacionProps) => a.id - b.id,
              ),
            ),
          );
        }

        const allPuntajes = await puntajesGET();
        if (allPuntajes) {
          dispatch(setPuntajes(allPuntajes));
        }
      } catch (error) {
        console.error("Error to obtain data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return <NextFixedPage>{loading ? <Loader /> : children}</NextFixedPage>;
};

export default Background;
