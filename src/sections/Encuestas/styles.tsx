/* eslint-disable prettier/prettier */
import { Autocomplete, styled, TextField, Typography } from "@mui/material";

export const EncuestaContainer = styled("div")(({ theme }) => {
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
    justifyContent: "space-between",
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

interface EncuestaNavegacionButtonProps {
  available: boolean;
}

export const EncuestaNavegacionButton = styled("div")<EncuestaNavegacionButtonProps>(({ theme, available=false }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "32px",
    borderRadius: "28px",
    backgroundColor: available ? "transparent" : "rgba(0, 0, 0, 0.3)",
    padding: "6px",
    gap: "4px",
    border: available ? `2px solid ${theme.customPalette.primary}` : "2px solid rgba(0, 0, 0, 0.1)",
    cursor: available ? "pointer" : "default",
    ":hover": {
      backgroundColor: available ? theme.customPalette.primary : "2px solid rgba(0, 0, 0, 0.1)",
    }
  };
});

export const IconContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    width: "fit-content",
    height: "fit-content",
    marginBottom: "-2px",
    marginLeft: "-2px",
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
      primary,
      white,
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

export const LinkContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  borderRadius: "16px",
  bottom: "20px",
  right: "20px",
  width: "300px",
  height: "52px",
  padding: "10px 15px",
  backgroundColor: "#F4F5F5",
  border: "1px solid #F7B200",
  zIndex: 1,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
}));

export const LinkTextContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
  borderRadius: "7px",
  paddingLeft: "5px",
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(0, 0, 0, 0.2)",
}));

export const LinkText = styled(Typography)(({ theme }) => {
  const {
    customPalette: {
      black,
    },
  } = theme;

  return {
    fontSize: "14px",
    fontWeight: 500,
    color: black,
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingRight: "10px",
    textOverflow: "ellipsis",
    width: "100%", 
  };
});

export const LinkIconContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "100%",
  borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
}));

export const CopiarIconContainer = styled("div")(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    borderRadius: "13px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  };
});

export const GraphContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "calc(100% - 52px)",
  };
});

export const LeftGraphContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "100%",
    padding : "25px 10px 25px 20px",
  };
});

export const BarGraphMainContainer = styled("div")(({ theme }) => {
  return {
    width: "100%",
    height: "50%",
    padding : "0px 20px 5px 20px",
  };
});

export const BarGraphContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    padding : "25px 20px",
  };
});

export const BarTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "32px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  };
});

export const BarTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "18px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const PieGraphMainContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "100%",
    height: "50%",
    padding : "5px 20px 0px 20px",
  };
});

export const PieGraphContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "100%",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    padding : "25px 20px",
  };
});

export const PieTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "32px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  };
});

export const PieTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "12px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const ComentariosMainContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "100%",
    padding : "25px 40px 25px 0px",
  };
});

export const ComentarioContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    borderRadius: "16px",
    padding : "25px 20px",
  };
});

export const ComentariosSection = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: "16px",
    padding : "25px 20px",
    gap: "15px",
    backgroundColor: theme.customPalette.background,
    border: "1px solid rgba(0, 0, 0, 0.2)",
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

export const ComentarioBox = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
    borderRadius: "16px",
    padding : "20px 20px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.2)",
  };
});

export const ComentarioTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "20px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  };
});

export const ComentarioTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterSemiBold,
    },
  } = theme;

  return {
    fontFamily: InterSemiBold,
    fontSize: "12px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const ComentarioTextContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "fit-content",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    paddingLeft: "20px",
  };
});

export const ComentarioText = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "14px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const ComentarioMainTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "48px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  };
});

export const ComentarioMainTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "18px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});