/* eslint-disable prettier/prettier */
export const evaluacionesPealGET = async (id: number) => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/evaluaciones/peal/${id}`
      );
      

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error("Error fetching peales:", response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error("Error fetching peales:", error);
      return null;
  }
};