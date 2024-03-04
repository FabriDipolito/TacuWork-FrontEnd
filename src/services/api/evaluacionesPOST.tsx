import { format, parseISO } from "date-fns";

export const EvaluacionPOST = async (
  nombre: string,
  comienzo: string,
  ultima_actualizacion: string,
  peal_id: number,
) => {
  const formattedComienzo = format(parseISO(comienzo), "yyyy-MM-dd");
  const formattedDate = format(parseISO("2024-02-21"), "yyyy-MM-dd");

  const evaluacionData = {
    nombre: nombre,
    comienzo: formattedComienzo,
    ultima_actualizacion: formattedDate,
    peal_id: peal_id,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/evaluaciones`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evaluacionData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error creating evaluacion:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error creating evaluacion:", error);
    return null;
  }
};
