export const PuntajePUT = async (
  colaborador_id: number,
  evaluacion_id: number,
  adaptacion_al_cambio: number | undefined,
  habilidades_relacionales: number | undefined,
  comunicacion: number | undefined,
  liderazgo: number | undefined,
  proactividad: number | undefined,
  presencia: number | undefined,
  puntualidad: number | undefined,
  porcentaje_asistencia: number | undefined,
  trabajo_en_equipo: number | undefined,
  responsabilidades: number | undefined,
  rendimiento_laboral: number | undefined,
) => {
  const puntajeData = {
    adaptacion_al_cambio: adaptacion_al_cambio,
    habilidades_relacionales: habilidades_relacionales,
    comunicacion: comunicacion,
    liderazgo: liderazgo,
    proactividad: proactividad,
    presencia: presencia,
    puntualidad: puntualidad,
    porcentaje_asistencia: porcentaje_asistencia,
    trabajo_en_equipo: trabajo_en_equipo,
    responsabilidades: responsabilidades,
    rendimiento_laboral: rendimiento_laboral,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/puntajes/${colaborador_id}/${evaluacion_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puntajeData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error updating puntaje:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error updating puntaje:", error);
    return null;
  }
};
