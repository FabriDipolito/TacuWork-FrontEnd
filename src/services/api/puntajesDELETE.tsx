export const PuntajeDELETE = async (
  colaborador_ids: number[],
  evaluacion_ids: number[],
) => {
  const puntajeData = {
    colaborador_ids: colaborador_ids,
    evaluacion_ids: evaluacion_ids,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/puntajes`,
      {
        method: "DELETE",
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
        "Error deleting puntajes:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error deleting puntajes:", error);
    return null;
  }
};
