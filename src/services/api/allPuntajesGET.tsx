/* eslint-disable prettier/prettier */
export const puntajesGET = async () => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/puntajes`
      );

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error("Error fetching puntajes:", response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error("Error fetching puntajes:", error);
      return null;
  }
};