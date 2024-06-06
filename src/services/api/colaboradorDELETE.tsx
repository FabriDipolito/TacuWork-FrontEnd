export const ColaboradoresDELETE = async (colaborador_ids: number[]) => {
  const colaboradorData = {
    ids: colaborador_ids,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/colaboradores`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colaboradorData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error deleting colaboradores:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error deleting colaboradores:", error);
    return null;
  }
};
