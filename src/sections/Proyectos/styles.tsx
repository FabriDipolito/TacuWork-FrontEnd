/* eslint-disable prettier/prettier */
import { Autocomplete, styled, TextField, Typography } from "@mui/material";

export const ProyectosContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "calc(100vh - 48px)",
    padding: "12px 12px 12px 8px",
    backgroundColor: theme.customPalette.background,
  };
});

export const MainCardContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.customPalette.white,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
  };
});

export const HeaderCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "transparent",
    height: "52px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "16px 16px 0px 0px",
    padding: "10px 30px",
  };
});

export const PealSearch = styled(Autocomplete)(({ theme }) => {
  return {
    height: "32px",
    width: "164px",
    marginTop: "-18px",
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "none !important",
      borderWidth: "1px !important",
    },
    ".MuiInputBase-root": {
      paddingTop: "0px",
      paddingBottom: "0px",
      border: `2px solid ${theme.customPalette.primary}`,
    },
    ".MuiSvgIcon-root": {
      color: theme.customPalette.primary,
    }
  };
});

export const PealSearchTextField = styled(TextField)(({ theme }) => {
  return {
    height: "32px",
    width: "164px",
    borderRadius: "6px",
    borderWidth: "0px",
    fontFamily: theme.customTypography.InterRegular,
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "32px",
    },
    ".MuiOutlinedInput-root.Mui-focused": {
      border: `2px solid ${theme.customPalette.primary}`,
      height: "36px",
    },
    ".MuiInputBase-input": {
      height: "32px",
      padding: "0px !important",
      fontSize: "12px",
    },
    ".MuiInputLabel-root": {
      marginTop: "-6.5px",
      fontSize: "12px",
      color: "rgba(247, 178, 0, 0.7)",
      
    },
  };
});

export const ProyectosAddButton = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
    height: "32px",
    borderRadius: "20px",
    backgroundColor: "transparent",
    padding: "6px 12px 8px 12px",
    gap: "6px",
    border: `2px solid ${theme.customPalette.primary}`,
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.customPalette.primary,
    }
  };
});

export const TextBoxContainer = styled("div")(({ theme }) => {
  return {
    width: "100%",
    height: "fit-content",
    padding : "42px 60px",
  };
});

interface ButtonTextProps {
  hover: boolean;
}

export const ButtonText = styled(Typography)<ButtonTextProps>(({ theme, hover }) => {
  const {
    customPalette: {
      white,
      primary,
    },
  } = theme;

  return {
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "-2px",
    color: hover ? white : primary,
  };
});

export const Title = styled(Typography)(({ theme }) => {
  const {
    customSizes: {
      title
    },
    customPalette: {
      black,
    },
  } = theme;

  return {
    marginBottom: "35px",
    fontSize: title.fontSize,
    fontWeight: title.fontWeight,
    lineHeight: title.lineHeight,
    color: black,
  };
});
