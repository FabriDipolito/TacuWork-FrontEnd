import { Typography, styled } from "@mui/material";

export const AuthFixedPage = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(247, 178, 0, 0.2)",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflowY: "scroll",
  };
});

export const CardContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "180px",
    width: "350px",
    border: "2px solid rgba(247, 178, 0, 1)",
    borderRadius: "16px",
    padding: "10px",
    backgroundColor: "rgba(247, 178, 0, 0.4)",
  };
});

export const CloseModalContainer = styled("div")(() => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    cursor: "pointer",
    borderRadius: "16px",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  };
});

export const TextContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
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

export const H1 = styled(Typography)(({ theme }) => {
  return {
    fontSize: "30px",
    fontWeight: 1000,
    height: "12px",
    color: "black",
  };
});

export const P = styled(Typography)(({ theme }) => {
  return {
    fontSize: "16px",
    fontWeight: 500,
    height: "12px",
    color: "black",
  };
});

export const Button = styled("button")(({ theme }) => {
  const {
    customPalette: { primary, white },
  } = theme;

  return {
    width: "fit-content",
    height: "27px",
    borderRadius: "17.5px",
    color: white,
    backgroundColor: primary,
    marginTop: "12px",
    border: `2px solid ${primary}`,
    cursor: "pointer",
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
