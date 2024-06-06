import { MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

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
    width: "521px",
    height: "fit-content",
    backgroundColor: theme.customPalette.Modal.modal.background,
    gap: "16px",
    padding: "25px 25px 30px 25px",
    borderRadius: "7px",
    border: `1px solid ${theme.customPalette.Modal.modal.border}`,
  };
});

export const Header = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "16px",
    height: "fit-content",
  };
});

export const TextPhotoContianer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
    gap: "16px",
    height: "fit-content",
  };
});

export const Photo = styled("div")(() => {
  return {
    width: "75px",
    height: "70px",
    borderRadius: "11px",
    backgroundColor: "#CCE6FF",
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

export const TitleBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    height: "fit-content",
  };
});

export const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.customSizes.Modal.title.fontSize,
    fontWeight: theme.customSizes.Modal.title.fontWeight,
    color: theme.customPalette.Modal.modal.title,
  };
});

export const SubTitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.customSizes.Modal.subtitle.fontSize,
    fontWeight: theme.customSizes.Modal.subtitle.fontWeight,
    color: theme.customPalette.Modal.modal.subtitle,
  };
});

export const MainBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    width: "100%",
    height: "fit-content",
  };
});

export const LeftBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "19px",
    width: "50%",
    height: "fit-content",
  };
});

export const RightBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "19px",
    width: "50%",
    height: "fit-content",
  };
});

export const InputBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
    height: "fit-content",
  };
});

export const InputTitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.customSizes.Modal.input.title.fontSize,
    fontWeight: theme.customSizes.Modal.input.title.fontWeight,
    color: theme.customPalette.Modal.modal.input.title,
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

interface FilterComponentProps {
  placeholder?: boolean;
}

export const SelectText = styled(Select)<FilterComponentProps>(({
  theme,
  placeholder = true,
}) => {
  return {
    width: "100%",
    height: "33px",
    backgroundColor: theme.customPalette.Perfil.personal.input.background,
    border: `1px solid ${theme.customPalette.Perfil.personal.input.border}`,
    borderRadius: "6px",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "33px",
    },
    ".MuiInputBase-input": {
      height: "33px",
      padding: "0px !important",
      fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
      fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
      borderRadius: "6px",
      marginTop: placeholder ? "-1px" : "10px",
      marginLeft: placeholder ? "0px" : "0px",
      color: `${theme.customPalette.Perfil.personal.input.text}`,
      "&::placeholder": {
        color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
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

export const FilterPlaceholder = styled(Typography)(({ theme }) => {
  return {
    fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
    fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
    color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
    cursor: "pointer",
  };
});

export const SelectOptions = styled(MenuItem)(({ theme }) => {
  const {
    customPalette: { white },
  } = theme;

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20px",
    backgroundColor: white,
    whiteSpace: "normal",
    wordBreak: "break-all",
    "&.Mui-selected": {
      backgroundColor: "rgba(247, 178, 0, 0.05)",
    },
  };
});

export const DateSelect = styled(MobileDatePicker)(({ theme }) => {
  return {
    width: "100%",
    height: "33px",
    backgroundColor: theme.customPalette.Perfil.personal.input.background,
    border: `1px solid ${theme.customPalette.Perfil.personal.input.border}`,
    borderRadius: "6px",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "33px",
    },
    ".MuiInputBase-input": {
      height: "33px",
      padding: "0px !important",
      fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
      fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
      borderRadius: "6px",
      color: `${theme.customPalette.Perfil.personal.input.text}`,
      "&::placeholder": {
        color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
      },
    },
    ".MuiInputBase-root": {
      paddingLeft: "10px",
    },
  };
});

export const ButtonBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: "49px",
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
