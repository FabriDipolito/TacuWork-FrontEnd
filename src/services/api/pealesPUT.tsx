import { Dayjs } from "dayjs";

export const PealPUT = async (
  peal_id: number,
  nombre: string,
  comienzo: Dayjs | null,
  fin: Dayjs | null,
) => {
  const pealData = {
    nombre: nombre,
    comienzo: comienzo,
    fin: fin,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/peal/${peal_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pealData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error updating peal:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error updating peal:", error);
    return null;
  }
};
