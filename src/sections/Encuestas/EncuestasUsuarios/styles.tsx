/* eslint-disable prettier/prettier */
import { Radio, styled, TextareaAutosize, TextField, Typography } from "@mui/material";

export const EncuestaContainer = styled("div")(({ theme }) => {
  return {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.customPalette.white,
    zIndex: 10,
  };
});

export const EncuestaSegundaCapaContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: theme.customPalette.background,
    zIndex: 10,
  };
});

export const MainCardContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "850px",
    height: "100%",
    backgroundColor: theme.customPalette.white,
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

export const Header = styled("div")(({ theme}) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "48px",
    paddingTop: "48px",
    backgroundColor: "rgba(247, 178, 0, 1)",
    [theme.breakpoints.down(682)]: {
      paddingTop: "48px",
    },
  };
});

export const LineTitleContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    backgroundColor: "transparent",
    height: "122px",
    padding: "25px",
    textAlign: "center",
    [theme.breakpoints.down(850)]: {
      height: "fit-content",
    },
  };
});

export const LineTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "24px",
    color: "#1E1E31",
    opacity: 0.7,
    [theme.breakpoints.down(700)]: {
      fontSize: "20px",
    },
  };
});

export const Body = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    height: "calc(100% - 170px)",
    padding: "20px 40px 40px 40px",
    [theme.breakpoints.down(850)]: {
      height: "fit-content",
    },
  };
});

export const QuestionContainer = styled("div")(({ }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
    paddingLeft: "20px",
    paddingBottom: "20px",
    gap: "10px",
  };
});

export const QuestionText = styled(Typography)(({ theme }) => {
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

export const QuestionBody = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "30px",
    width: "100%",
    height: "fit-content",
    flexWrap: "wrap",
    [theme.breakpoints.down(670)]: {
      flexDirection: "column",
    },
  };
});

export const QuestionResponse = styled("div")(({ }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
  };
});

export const RadioButton = styled(Radio)(({ theme }) => ({
  color: 'rgba(247, 178, 0, 1)',
  '&.Mui-checked': {
    color: 'rgba(247, 178, 0, 1)',
  },
  '&:hover': {
    backgroundColor: 'rgba(247, 178, 0, 0.08)',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(247, 178, 0, 0.12)',
  },
  '&.MuiRadio-root': {
    backgroundColor: 'white',
  },
}));

export const TextResponse = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "14px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const InputAreaBox = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "fit-content",
    height: "fit-content",
    [theme.breakpoints.down(670)]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
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
    [theme.breakpoints.down(850)]: {
      minWidth: "550px",
      maxWidth: "550px",
    },
    [theme.breakpoints.down(770)]: {
      minWidth: "500px",
      maxWidth: "500px",
    },
    [theme.breakpoints.down(720)]: {
      minWidth: "450px",
      maxWidth: "450px",
    },
    [theme.breakpoints.down(670)]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
  };
});

export const ButtonBox = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginTop: "15px",
    height: "135px",
    [theme.breakpoints.down(670)]: {
      flexDirection: "column",
      height: "fit-content",
      gap: "15px",
    },
  };
});

interface ButtonProps {
  available?: boolean;
}

export const Button = styled("div")<ButtonProps>(({ theme, available=false }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "97px",
    height: "27px",
    borderRadius: "17.5px",
    marginBottom: "3px",
    marginRight: "19px",
    backgroundColor: available ? theme.customPalette.Modal.modal.button.background : theme.customPalette.background,
    border: available ? `2px solid ${theme.customPalette.Modal.modal.button.background}` : `2px solid rgba(0, 0, 0, 0.2)`,
    cursor: available ? "pointer" : "default",
    ":hover": {
      backgroundColor: available ? theme.customPalette.Modal.modal.button.text : theme.customPalette.background,
    },
  };
});

interface textProps {
  hover?: boolean;
  available?: boolean;
}

export const ButtonText = styled(Typography)<textProps>(({
  theme,
  hover = false,
  available=false
}) => {
  return {
    fontSize: theme.customSizes.Modal.button.fontSize,
    fontWeight: theme.customSizes.Modal.button.fontWeight, 
    color: available ? hover
      ? theme.customPalette.Modal.modal.button.border
      : theme.customPalette.Modal.modal.button.text : "rgba(0, 0, 0, 0.4)",
    userSelect: "none",
  };
});

export const InputContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    columnGap: "12px",
    width: "100%",
    height: "fit-content",
    padding: "0px 60px",
  };
});

export const LabelInput = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterMedium },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "14px",
    color: "#1E1E31",
    opacity: 0.7,
    paddingBottom: "6px",
  };
});

export const InputBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "200px",
    height: "fit-content",
  };
});

export const InputTitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.customSizes.Modal.input.title.fontSize,
    fontWeight: theme.customSizes.Modal.input.title.fontWeight,
    color: theme.customPalette.Modal.modal.input.title,
    paddingLeft: "5px",
  };
});

export const Input = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "33px",
    backgroundColor: theme.customPalette.Modal.modal.input.background,
  };
});

export const InputText = styled(TextField)(({ theme }) => {
  return {
    width: "100%",
    height: "33px",

    backgroundColor: theme.customPalette.Modal.modal.input.background,
    border: `1px solid ${theme.customPalette.Modal.modal.input.border}`,
    borderRadius: "6px",
    fontFamily: theme.customTypography.InterRegular,
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "33px",
    },
    ".MuiInputBase-input": {
      height: "33px",
      padding: "0px !important",
      fontSize: `${theme.customSizes.Modal.input.placeholder.fontSize}`,
      fontWeight: `${theme.customSizes.Modal.input.placeholder.fontWeight}`,
      borderRadius: "6px",
      marginTop: "-1px",
      color: "black",
      "&::placeholder": {
        color: `${theme.customPalette.Modal.modal.input.placeholder}`,
      },
    },
    ".MuiInputBase-root": {
      paddingLeft: "10px",
    },
    ".MuiInputAdornment-root": {
      width: "15px",
    },
  };
});

export const ModalContainer = styled("div")(({ theme }) => {
  return {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.customPalette.primary,
    zIndex: 11,
  };
});

export const ModalCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "350px",
    height: "250px",
    gap: "10px",
    padding: "0px 30px",
    backgroundColor: theme.customPalette.white,
    border: "1px solid rgba(0, 0, 0, 0.4)",
    borderRadius: "16px",
  };
});

export const ModalTitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: "24px",
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  };
});