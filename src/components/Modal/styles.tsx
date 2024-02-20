import { TextField, Typography, styled } from "@mui/material";

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
    alignItems: "center",
    width: "100%",
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

export const TitleBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
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
