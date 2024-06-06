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
    width: "300px",
    height: "fit-content",
    backgroundColor: "#FFFFFF",
    gap: "5px",
    padding: "25px 25px 30px 25px",
    borderRadius: "7px",
    border: `1px solid ${theme.customPalette.Modal.modal.border}`,
  };
});

export const Header = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-betwwen",
    width: "100%",
    height: "fit-content",
  };
});

export const TitleBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    height: "fit-content",
  };
});

export const Title = styled(Typography)(({ theme }) => {
  return {
    fontFamily: theme.customTypography.InterSemiBold,
    textAlign: "center",
    fontSize: "15px",
    fontWeight: theme.customSizes.Modal.title.fontWeight,
    color: theme.customPalette.Modal.modal.title,
  };
});

export const SubTitle = styled(Typography)(({ theme }) => {
  return {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: theme.customSizes.Modal.title.fontWeight,
    color: "#666666",
  };
});

export const MainBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: "5px",
    height: "fit-content",
  };
});

export const IconContainer = styled("div")(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 102, 102, 0.3)",
    width: "28px",
    height: "28px",
    paddingBottom: "1px",
  };
});

export const ButtonBox = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "50%",
    height: "49px",
  };
});

interface ButtonProps {
  warning?: boolean;
}

export const Button = styled("div")<ButtonProps>(({
  theme,
  warning = false,
}) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "32px",
    borderRadius: "3px",
    backgroundColor: warning ? "rgba(255, 102, 102, 1)" : "#FFFFFF",
    border: warning ? "1px solid rgba(255, 102, 102, 1)" : `1px solid #666666`,
    cursor: "pointer",
    ":hover": {
      backgroundColor: warning ? "#FFFFFF" : "#F6F6F6",
    },
  };
});

interface textProps {
  hover?: boolean;
  warning?: boolean;
}

export const ButtonText = styled(Typography)<textProps>(({
  theme,
  hover = false,
  warning = false,
}) => {
  return {
    fontSize: theme.customSizes.Modal.button.fontSize,
    fontWeight: theme.customSizes.Modal.button.fontWeight,
    color: warning
      ? hover
        ? "rgba(255, 102, 102, 1)"
        : "#FFFFFF"
      : hover
        ? "#000000"
        : "#000000",
    userSelect: "none",
  };
});
