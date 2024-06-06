export const PealDELETE = async (peal_ids: number[]) => {
  const pealData = {
    ids: peal_ids,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/peales`, {
      method: "DELETE",
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
        "Error deleting peales:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error deleting peales:", error);
    return null;
  }
};
