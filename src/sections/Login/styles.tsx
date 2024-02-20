import { Typography, styled } from "@mui/material";

export const AuthFixedPage = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.customPalette.white,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflowY: "scroll",
  };
});

export const ImageContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "56.5vw",
    backgroundColor: theme.customPalette.primary,
  };
});

export const FormContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "3px",
    alignItems: "center",
    height: "100%",
    width: "43.5vw",
  };
});

export const InputContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
  };
});

export const Label = styled(Typography)(({ theme }) => {
  const {
    customSizes: {
      Login: { label },
    },
    customPalette: { primary },
  } = theme;

  return {
    fontSize: label.fontSize,
    fontWeight: label.fontWeight,
    height: "12px",
    color: primary,
    marginBottom: "1px",
  };
});

export const Input = styled("input")(({ theme }) => {
  const {
    customPalette: { primary },
  } = theme;

  return {
    width: "183px",
    height: "29px",
    border: `2px solid ${primary}`,
    borderRadius: "10px",
    color: primary,
    opacity: 0.5,
    ":hover": {
      border: `2px solid ${primary}`,
    },
    ":focus": {
      outline: "none",
    },
  };
});

export const Button = styled("button")(({ theme }) => {
  const {
    customPalette: { primary, white },
  } = theme;

  return {
    width: "81px",
    height: "27px",
    borderRadius: "17.5px",
    color: white,
    backgroundColor: primary,
    marginTop: "12px",
    border: `2px solid ${primary}`,
    ":hover": {
      color: primary,
      backgroundColor: white,
      border: `2px solid ${primary}`,
    },
    ":focus": {
      outline: "none",
    },
  };
});
