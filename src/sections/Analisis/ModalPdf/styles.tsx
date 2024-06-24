import { TextareaAutosize, Typography, styled } from "@mui/material";

export const ModalBackground = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.customPalette.Modal.background,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflowY: "scroll",
  };
});

export const ModalCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    height: "calc(100vh - 64px)",
    backgroundColor: "#F4F5F5",
    padding: "15px 25px 30px 25px",
    borderRadius: "7px",
    border: `1px solid ${theme.customPalette.Modal.modal.border}`,
  };
});

export const Header = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
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

export const OverflowContainer = styled("div")(() => {
  return {
    width: "fit-content",
    height: "calc(100% - 150px)",
    borderRadius: "16px",
    overflowY: "hidden",
    overflowX: "hidden",
    "&:hover": {
      overflowY: "scroll",
      marginRight: "-8px",
    },
    "::-webkit-scrollbar": {
      width: "8px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  };
});

export const PDFContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "750px",
    height: "fit-content",
    gap: "15px",
    borderRadius: "16px",
    backgroundColor: "#FFFFFF",
    padding: "20px 30px",
  };
});

export const LogoContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
  };
});

export const LineTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "fit-content",
    marginTop: "-15px",
  };
});

export const LineTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "20px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const PromedioContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "200px",
    marginTop: "10px",
  };
});

interface PromedioCardProps {
  promedio?: boolean;
  comparacion?: boolean;
}

export const PromedioCard = styled("div")<PromedioCardProps>(({
  promedio,
  comparacion = false,
}) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: comparacion ? "100%" : promedio ? "32%" : "68%",
    backgroundColor: "transparent",
    height: "100%",
    border: "2px solid rgba(0, 0, 0, 0.1)",
    borderRight: promedio ? "0px" : "2px solid rgba(0, 0, 0, 0.1)",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: promedio ? "16px" : "0px",
    borderTopRightRadius: promedio ? "0px" : "16px",
  };
});

export const PromedioTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "fit-content",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "20px 5px 10px 5px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  };
});

export const PromedioTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "17px",
    color: "#1E1E31",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const PromedioTextContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "100%",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    padding: "10px",
  };
});

export const PromedioTextSubsContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    backgroundColor: "transparent",
    height: "100%",
    //padding: "10px",
  };
});

interface PromedioTextProps {
  type: "NORMAL" | "MEJOR" | "PEOR";
}

export const PromedioText = styled(Typography)<PromedioTextProps>(({
  theme,
  type,
}) => {
  const {
    customTypography: { InterBold },
  } = theme;

  return {
    fontFamily: InterBold,
    fontSize: "58px",
    color:
      type == "NORMAL" ? "#1E1E31" : type == "MEJOR" ? "#90EE90" : "#FF7F7F",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const LabelPromedioText = styled(Typography)<PromedioTextProps>(({
  theme,
  type,
}) => {
  const {
    customTypography: { InterSemiBold },
  } = theme;

  return {
    fontFamily: InterSemiBold,
    fontSize: "12px",
    color:
      type == "NORMAL" ? "#1E1E31" : type == "MEJOR" ? "#90EE90" : "#FF7F7F",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const ComentCard = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "fit-content",
    minHeight: "100px",
    width: "100%",
    padding: "20px",
    backgroundColor: "transparent",
    borderLeft: "2px solid rgba(0, 0, 0, 0.1)",
    borderRight: "2px solid rgba(0, 0, 0, 0.1)",
    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    marginTop: "-15px",
  };
});

export const ComentTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "18px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const ComentTextContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "fit-content",
    width: "100%",
    padding: "10px 20px 0px 20px",
    backgroundColor: "transparent",
  };
});

export const ComentText = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "14px",
    color: "#1E1E31",
    opacity: 0.7,
    whiteSpace: "pre-line",
  };
});

export const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => {
  return {
    fontWeight: 500,
    color: "#1E1E31",
    border: `2px solid rgba(0, 0, 0, 0.3)`,
    minWidth: "600px",
    maxWidth: "600px",
    minHeight: "135px",
    maxHeight: "135px",
    height: "100%",
    borderRadius: "7px",
    padding: "8px 8px",
    ":hover": {
      borderColor: `${theme.customPalette.primary}`,
    },
    ":focus": {
      borderColor: `${theme.customPalette.primary}`,
      color: "#1E1E31",
    },
    ":focus-visible": {
      outline: 0,
    },
  };
});

export const ButtonBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginTop: "15px",
    height: "135px",
  };
});

export const Button = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "97px",
    height: "27px",
    borderRadius: "17.5px",
    marginBottom: "3px",
    marginRight: "19px",
    backgroundColor: theme.customPalette.Modal.modal.button.background,
    border: `2px solid ${theme.customPalette.Modal.modal.button.background}`,
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.customPalette.Modal.modal.button.text,
    },
  };
});

interface textProps {
  hover?: boolean;
}

export const ButtonText = styled(Typography)<textProps>(({
  theme,
  hover = false,
}) => {
  return {
    fontSize: theme.customSizes.Modal.button.fontSize,
    fontWeight: theme.customSizes.Modal.button.fontWeight,
    color: hover
      ? theme.customPalette.Modal.modal.button.border
      : theme.customPalette.Modal.modal.button.text,
    userSelect: "none",
  };
});
