export const EvaluacionesDELETE = async (evaluacion_ids: number[]) => {
  const evaluacionData = {
    ids: evaluacion_ids,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/evaluaciones`,
      {
        method: "DELETE",
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
        "Error deleting evaluaciones:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error deleting evaluaciones:", error);
    return null;
  }
};
