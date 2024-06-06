export const ColaboradorPOST = async (
  nombre: string,
  apellido: string,
  edad: number,
  hijos: number,
  barrio: string,
  telefono: string,
  nivel_educativo: string,
  egresos: string,
  peal_id: number,
) => {
  const colaboradorData = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    hijos: hijos,
    zona_residencial: barrio,
    telefono: telefono,
    nivel_educativo: nivel_educativo,
    egresos: egresos,
    peal_id: peal_id,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/colaboradores`,
      {
        method: "POST",
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
        "Error creating colaborador:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error creating colaborador:", error);
    return null;
  }
};
