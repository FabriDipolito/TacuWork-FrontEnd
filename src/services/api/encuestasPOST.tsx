export const EncuestaPOST = async (
  respuesta1: string,
  respuesta2: string,
  respuesta3: string,
  comentario: string | undefined,
  peal_id: number,
  nombre: string | undefined,
) => {
  const encuestaData = {
    respuesta1: respuesta1,
    respuesta2: respuesta2,
    respuesta3: respuesta3,
    comentario: comentario ? comentario : null,
    peal_id: peal_id,
    nombre: nombre ? nombre : null,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/encuestas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encuestaData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error creating encuesta:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error creating encuesta:", error);
    return null;
  }
};
