import { Dayjs } from "dayjs";

export const EvaluacionPOST = async (
  nombre: string,
  comienzo: Dayjs | null,
  ultima_actualizacion: Dayjs | null,
  peal_id: number,
) => {
  const evaluacionData = {
    nombre: nombre,
    comienzo: comienzo,
    ultima_actualizacion: ultima_actualizacion,
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
