export const PealPOST = async (
  nombre: string,
  comienzo: string,
  fin: string,
) => {
  const pealData = {
    nombre: nombre,
    comienzo: comienzo,
    fin: fin,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/peal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pealData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        "Error creating peal:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error creating peal:", error);
    return null;
  }
};
