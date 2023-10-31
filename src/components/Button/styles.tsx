import { styled, Typography } from "@mui/material";
import { ButtonProps } from "@types";
import theme from "src/utils/theme";

const getBackgroundColor = (
  type: "default" | "delete" | "advice" | "create" | "submit",
) => {
  if (type == "default") return theme.customPalette.buttonDefault;
  if (type == "delete") return theme.customPalette.buttonDelete;
  if (type == "advice") return theme.customPalette.buttonAdvice;
  if (type == "create") return theme.customPalette.buttonCreate;
  if (type == "submit") return theme.customPalette.buttonSubmit;
};

export const StyledButton = styled("button")<ButtonProps>(({ theme, typeOfButton, selected }) => {
  const {
    customPalette: { buttonHover },
  } = theme;
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "135px",
    height: "50px",
    borderRadius: "16px",
    border: "none",
    gap: "5px",
    backgroundColor: (selected && typeOfButton == "default") ? buttonHover : getBackgroundColor(typeOfButton),
    boxShadow: "4px 2px 5px rgba(0, 0, 0, 0.2)",
    ":hover": {
      backgroundColor: typeOfButton == "default" ? buttonHover : getBackgroundColor(typeOfButton),
      cursor: "pointer",
    },
    ":focus": {
      backgroundColor: typeOfButton == "default" ? buttonHover : getBackgroundColor(typeOfButton),
    }
  }
});

export const ButtonText = styled(Typography)<ButtonProps>(({ theme, typeOfButton, userButton }) => {
  const {
    customTypography: { CaustenRegular},
    customPalette: { white, black },
    customSizes: { button , buttonUsers}
  } = theme;

  return {
    fontFamily: CaustenRegular,
    fontSize: userButton ? buttonUsers.fontSize : button.fontSize,
    fontWeight: userButton ? buttonUsers.fontWeight : button.fontWeight,
    lineHeight: userButton ? buttonUsers.lineHeight : button.lineHeight,
    color: typeOfButton == "create" ? black : white,
  };
});
