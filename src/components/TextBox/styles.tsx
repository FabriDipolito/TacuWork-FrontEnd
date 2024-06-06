import { Typography, styled } from "@mui/material";

export const ColumnContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    maxWidth: "350px",
    gap: "4px",
    height: "fit-content",
  };
});

export const IconContainer = styled("div")(() => {
  return {
    width: "27px",
    height: "24px",
  };
});

export const TitleText = styled(Typography)(({ theme }) => {
  const {
    customTypography: { InterBold },
    customPalette: { TextBox },
    customSizes: {
      TextBox: { title },
    },
  } = theme;

  return {
    fontFamily: InterBold,
    fontSize: title.fontSize,
    fontWeight: title.fontWeight,
    color: TextBox.text,
  };
});

export const DescriptionText = styled(Typography)(({ theme }) => {
  const {
    customPalette: { TextBox },
    customSizes: {
      TextBox: { description },
    },
  } = theme;

  return {
    fontSize: description.fontSize,
    fontWeight: description.fontWeight,
    color: TextBox.text,
  };
});
