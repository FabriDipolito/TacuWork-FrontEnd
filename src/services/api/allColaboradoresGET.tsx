export const colaboradoresGET = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/colaboradores`,
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error fetching colaboradores:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching colaboradores:", error);
    return null;
  }
};
