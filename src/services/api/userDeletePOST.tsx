import { useAppDispatch } from "@redux/hooks";
import { setData } from "@redux/slices/usersSlice";
import { Data } from "@types";

/* eslint-disable prettier/prettier */

export const userDeletePOST = async (name: string, data: Data, dispatch: ReturnType<typeof useAppDispatch>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/delete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error('Request failed');
    } else{
      // Create a new contentModule without User X
      const contentModuleKeys: Array<string> = [];
      for (const key in data?.content_module) {
        contentModuleKeys.push(key);
      }
      const resultContent = contentModuleKeys.reduce(
        (acc, curr) => (
          (acc[curr] = data?.content_module[curr].filter(
            (user) => user !== name
          )),
          acc
        ),
        {} as { [key: string]: Array<string> });
      // Create a new contentModule without User X

      // Create a new authModule without User X
      const authModuleKeys: Array<string> = [];
      for (const key in data?.auth_module) {
        authModuleKeys.push(key);
      }
      const resultAuth = authModuleKeys.reduce(
        (acc, curr) => (
          (acc[curr] = data?.auth_module[curr].filter(
            (user) => user !== name
          )),
          acc
        ),
        {} as { [key: string]: Array<string> });
      // Create a new authModule without User X
      
      const newData = {
        auth_module: resultAuth,
        content_module: resultContent
      }

      dispatch(setData(newData)); // update Data because of async things
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};
