import { ORDEN } from "@constants";
import {
  ColaboradorProps,
  DataProps,
  EvaluacionProps,
  LineProps,
  PealProps,
  PuntajeProps,
} from "@types";

export function obtenerExtremosPuntajes(
  puntaje: PuntajeProps,
  general: boolean,
) {
  if (
    puntaje &&
    puntaje.adaptacion_al_cambio &&
    puntaje.comunicacion &&
    puntaje.habilidades_relacionales &&
    puntaje.liderazgo &&
    puntaje.porcentaje_asistencia &&
    puntaje.presencia &&
    puntaje.proactividad &&
    puntaje.puntualidad &&
    puntaje.rendimiento_laboral &&
    puntaje.responsabilidades &&
    puntaje.trabajo_en_equipo
  ) {
    if (general) {
      const puntajes = Object.keys(puntaje)
        .filter((key) => key !== "colaborador_id" && key !== "evaluacion_id")
        .map((key) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          key === "porcentaje_asistencia" ? puntaje[key] / 10 : puntaje[key],
        );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const total = puntajes.reduce((acc, valor) => acc + valor, 0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const promedio = total / Object.keys(puntajes).length;

      return promedio;
    } else {
      const puntajes = Object.keys(puntaje)
        .filter((key) => key !== "colaborador_id" && key !== "evaluacion_id")
        .map((key) => ({
          nombre: formatearNombre(key),
          valor:
            key === "porcentaje_asistencia"
              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                puntaje[key] / 10
              : puntaje[key],
        }));

      const puntajeMasAlto = puntajes.reduce((max, puntaje) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        puntaje.valor > max.valor ? puntaje : max,
      );
      const puntajeMasBajo = puntajes.reduce((min, puntaje) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        puntaje.valor < min.valor ? puntaje : min,
      );

      return [puntajeMasAlto, puntajeMasBajo];
    }
  }
}

export function formatearNombre(nombre: string) {
  return nombre.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const combineLineDataAndPuntajes = (
  puntajes: (PuntajeProps | undefined)[] | undefined,
  evaluaciones: (EvaluacionProps | undefined)[] | undefined,
  linkSeleccionado?: "TRABAJADOR" | "PROYECTO" | "COMPARACION",
  trabajadorSeleccionado?: ColaboradorProps | undefined,
  proyectoPealSeleccionado?: PealProps | undefined,
  primerPealSeleccionado?: PealProps | undefined,
  segundoPealSeleccionado?: PealProps | undefined,
  primero?: boolean,
  cantidadEvaluaciones?: number,
  evaluacionesOtro?: (EvaluacionProps | undefined)[] | undefined,
): LineProps[] => {
  const arrayData =
    evaluaciones?.map((evaluacion, index) => {
      return {
        x: ORDEN[index],
        y:
          calcularPromedioPuntajes(
            puntajes?.filter(
              (puntaje) =>
                puntaje?.evaluacion_id == evaluacion?.id &&
                puntaje &&
                puntaje.adaptacion_al_cambio &&
                puntaje.comunicacion &&
                puntaje.habilidades_relacionales &&
                puntaje.liderazgo &&
                puntaje.porcentaje_asistencia &&
                puntaje.presencia &&
                puntaje.proactividad &&
                puntaje.puntualidad &&
                puntaje.rendimiento_laboral &&
                puntaje.responsabilidades &&
                puntaje.trabajo_en_equipo,
            ),
          ).reduce((acumulado, actual) => {
            if (
              actual.adaptacion_al_cambio &&
              actual.comunicacion &&
              actual.habilidades_relacionales &&
              actual.liderazgo &&
              actual.porcentaje_asistencia &&
              actual.presencia &&
              actual.proactividad &&
              actual.puntualidad &&
              actual.rendimiento_laboral &&
              actual.responsabilidades &&
              actual.trabajo_en_equipo
            ) {
              const sumaAtributos =
                actual.adaptacion_al_cambio +
                actual.comunicacion +
                actual.habilidades_relacionales +
                actual.liderazgo +
                actual.porcentaje_asistencia / 10 +
                actual.presencia +
                actual.proactividad +
                actual.puntualidad +
                actual.rendimiento_laboral +
                actual.responsabilidades +
                actual.trabajo_en_equipo;
              acumulado += sumaAtributos / 11;
            }

            return acumulado;
          }, 0) || 0,
      };
    }) || [];
  if (cantidadEvaluaciones && arrayData.length < cantidadEvaluaciones) {
    const diferencia = cantidadEvaluaciones - arrayData.length;
    for (let i = 0; i < diferencia; i++) {
      arrayData.push({
        x: evaluacionesOtro
          ? ORDEN[evaluacionesOtro.length - 1 - (diferencia - 1 - i)]
          : "no deberia entrar jamas aca",
        y: 0,
      });
    }
  }
  return trabajadorSeleccionado ||
    proyectoPealSeleccionado ||
    primerPealSeleccionado ||
    segundoPealSeleccionado
    ? [
        {
          id:
            (linkSeleccionado == "TRABAJADOR" && trabajadorSeleccionado
              ? `${trabajadorSeleccionado?.nombre} ${trabajadorSeleccionado?.apellido}`
              : linkSeleccionado == "PROYECTO" && proyectoPealSeleccionado
                ? proyectoPealSeleccionado?.nombre
                : primero
                  ? primerPealSeleccionado?.nombre
                  : segundoPealSeleccionado?.nombre) || "",
          color: primero ? "hsl(35, 70%, 75%)" : "hsl(15, 70%, 65%)",
          data: arrayData,
        },
      ]
    : [];
};

export const combineRadarDataAndPuntajes = (
  data: { criterio: string }[],
  puntajes: (PuntajeProps | undefined)[] | undefined,
  promedio: boolean,
  comparacion: boolean,
  evaluaciones: Array<EvaluacionProps> | undefined,
  primerPealSeleccionado?: PealProps | undefined,
  segundoPealSeleccionado?: PealProps | undefined,
): DataProps[] => {
  return data.map((item) => {
    const criterioKey = item.criterio.toLowerCase().replace(/\s+/g, "_");

    const updatedItem: DataProps = { criterio: item.criterio };

    puntajes?.forEach((puntaje) => {
      if (
        puntaje &&
        puntaje.adaptacion_al_cambio &&
        puntaje.comunicacion &&
        puntaje.habilidades_relacionales &&
        puntaje.liderazgo &&
        puntaje.porcentaje_asistencia &&
        puntaje.presencia &&
        puntaje.proactividad &&
        puntaje.puntualidad &&
        puntaje.rendimiento_laboral &&
        puntaje.responsabilidades &&
        puntaje.trabajo_en_equipo
      ) {
        const puntajeKey =
          item.criterio === "% de Asistencias"
            ? "porcentaje_asistencia"
            : Object.keys(puntaje).find((key) => key === criterioKey);
        const evaluacion = evaluaciones?.find(
          (evaluacion) => evaluacion.id == puntaje.evaluacion_id,
        );
        const peal =
          evaluacion?.peal_id == primerPealSeleccionado?.id
            ? primerPealSeleccionado
            : segundoPealSeleccionado;
        if (puntajeKey && evaluacion) {
          if (item.criterio === "% de Asistencias") {
            if (comparacion) {
              updatedItem[
                promedio
                  ? `${peal?.nombre}: Promedio`
                  : `${peal?.nombre}: ${evaluacion.nombre}`
              ] = (puntaje[puntajeKey] as unknown as number) / 10;
            } else {
              updatedItem[promedio ? "Promedio" : evaluacion.nombre] =
                (puntaje[puntajeKey] as unknown as number) / 10;
            }
          } else {
            if (comparacion) {
              updatedItem[
                promedio
                  ? `${peal?.nombre}: Promedio`
                  : `${peal?.nombre}: ${evaluacion.nombre}`
              ] = puntaje[puntajeKey];
            } else {
              updatedItem[promedio ? "Promedio" : evaluacion.nombre] =
                puntaje[puntajeKey];
            }
          }
        }
      }
    });

    return updatedItem;
  });
};

export function calcularPromedioPuntajes(
  puntajes: (PuntajeProps | undefined)[] | undefined,
): PuntajeProps[] {
  if (puntajes && puntajes.length != 0) {
    let suma_adaptacion_al_cambio = 0;
    let suma_habilidades_relacionales = 0;
    let suma_comunicacion = 0;
    let suma_liderazgo = 0;
    let suma_proactividad = 0;
    let suma_presencia = 0;
    let suma_puntualidad = 0;
    let suma_porcentaje_asistencia = 0;
    let suma_trabajo_en_equipo = 0;
    let suma_responsabilidades = 0;
    let suma_rendimiento_laboral = 0;

    puntajes?.forEach((puntaje) => {
      for (const key in puntaje) {
        if (key !== "colaborador_id" && key !== "evaluacion_id") {
          // Inicializar la propiedad en el objeto de sumas si es la primera vez que se encuentra
          if (key == "adaptacion_al_cambio")
            suma_adaptacion_al_cambio += puntaje[key] || 0;
          if (key == "habilidades_relacionales")
            suma_habilidades_relacionales += puntaje[key] || 0;
          if (key == "comunicacion") suma_comunicacion += puntaje[key] || 0;
          if (key == "liderazgo") suma_liderazgo += puntaje[key] || 0;
          if (key == "proactividad") suma_proactividad += puntaje[key] || 0;
          if (key == "presencia") suma_presencia += puntaje[key] || 0;
          if (key == "puntualidad") suma_puntualidad += puntaje[key] || 0;
          if (key == "porcentaje_asistencia")
            suma_porcentaje_asistencia += puntaje[key] || 0;
          if (key == "trabajo_en_equipo")
            suma_trabajo_en_equipo += puntaje[key] || 0;
          if (key == "responsabilidades")
            suma_responsabilidades += puntaje[key] || 0;
          if (key == "rendimiento_laboral")
            suma_rendimiento_laboral += puntaje[key] || 0;
        }
      }
    });

    // Calcular el promedio de cada propiedad
    const promedios: PuntajeProps = {
      colaborador_id: puntajes[0]?.colaborador_id || 1,
      evaluacion_id: puntajes[0]?.evaluacion_id || 1,
      adaptacion_al_cambio: Number(
        (suma_adaptacion_al_cambio / puntajes.length).toFixed(2),
      ),
      habilidades_relacionales: Number(
        (suma_habilidades_relacionales / puntajes.length).toFixed(2),
      ),
      comunicacion: Number((suma_comunicacion / puntajes.length).toFixed(2)),
      liderazgo: Number((suma_liderazgo / puntajes.length).toFixed(2)),
      proactividad: Number((suma_proactividad / puntajes.length).toFixed(2)),
      presencia: Number((suma_presencia / puntajes.length).toFixed(2)),
      puntualidad: Number((suma_puntualidad / puntajes.length).toFixed(2)),
      porcentaje_asistencia: Number(
        (suma_porcentaje_asistencia / puntajes.length).toFixed(2),
      ),
      trabajo_en_equipo: Number(
        (suma_trabajo_en_equipo / puntajes.length).toFixed(2),
      ),
      responsabilidades: Number(
        (suma_responsabilidades / puntajes.length).toFixed(2),
      ),
      rendimiento_laboral: Number(
        (suma_rendimiento_laboral / puntajes.length).toFixed(2),
      ),
    };

    return [promedios];
  } else {
    return [];
  }
}
