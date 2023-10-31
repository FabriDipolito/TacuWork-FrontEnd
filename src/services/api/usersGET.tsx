/* eslint-disable prettier/prettier */

export const usersGET = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/ejercicio-a?frontend=true`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
};
