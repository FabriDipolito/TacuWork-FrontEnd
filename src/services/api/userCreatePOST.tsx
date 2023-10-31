/* eslint-disable prettier/prettier */

import { useAppDispatch } from "@redux/hooks";
import { setData } from "@redux/slices/usersSlice";

export const userCreatePOST = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/add-data`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Request failed');
    } else {
      response.json().then((response) => dispatch(setData(response)));
    }
    console.log(response);
  } catch (error) {
    console.error('Error creating user data:', error);
    return null;
  }
};