/* eslint-disable prettier/prettier */
export interface AuthModule {
  [key: string]: string[];
}

export interface ContentModule {
  [key: string]: string[];
}

export interface Data {
  auth_module: AuthModule;
  content_module: ContentModule;
}

export interface ButtonProps {
  typeOfButton: "default" | "delete" | "advice" | "create" | "submit";
  onClick?: () => void;
  label?: string;
  selected?: boolean;
  userButton?: boolean;
}

export type usersState = {
  data: Data | undefined;
  moduleSelected: string;
  moduleKeySelected: string;
  userSelected: string;
};