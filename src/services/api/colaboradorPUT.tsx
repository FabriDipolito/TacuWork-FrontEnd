export const ColaboradorPUT = async (
  colaborador_id: number,
  nombre: string,
  apellido: string,
  edad: number,
  hijos: number,
  barrio: string,
  telefono: string,
  nivel_educativo: string,
  egresos: string,
  peal_id: number,
  imagen?: Blob | File | null,
  banco?: string | null,
  sucursal?: string | null,
  numero_cuenta?: string | null,
  nombre_emergencia?: string | null,
  telefono_emergencia?: string | null,
) => {
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("edad", edad.toString());
  formData.append("hijos", hijos.toString());
  formData.append("zona_residencial", barrio);
  formData.append("telefono", telefono);
  formData.append("nivel_educativo", nivel_educativo);
  formData.append("egresos", egresos);
  formData.append("peal_id", peal_id.toString());

  if (banco) formData.append("banco", banco);
  if (sucursal) formData.append("sucursal", sucursal);
  if (numero_cuenta) formData.append("numero_cuenta", numero_cuenta);
  if (nombre_emergencia)
    formData.append("nombre_emergencia", nombre_emergencia);
  if (telefono_emergencia)
    formData.append("telefono_emergencia", telefono_emergencia);
  if (imagen) {
    formData.append("imagen", imagen);
  }

  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/colaboradores/${colaborador_id}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error updating colaborador:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error updating colaborador:", error);
    return null;
  }
};
