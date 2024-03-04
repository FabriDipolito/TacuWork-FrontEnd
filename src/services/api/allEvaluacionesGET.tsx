/* eslint-disable prettier/prettier */
export const evaluacionesGET = async () => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/evaluaciones`
      );
      

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error("Error fetching evaluacion:", response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error("Error fetching evaluacion:", error);
      return null;
  }
};