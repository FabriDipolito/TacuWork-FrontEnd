/* eslint-disable prettier/prettier */
export const encuestasGET = async () => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/encuestas`
      );
      
      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error("Error fetching encuestas:", response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error("Error fetching encuestas:", error);
      return null;
  }
};