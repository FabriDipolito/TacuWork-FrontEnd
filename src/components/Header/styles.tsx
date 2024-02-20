import { styled } from "@mui/material";

export const StyledHeader = styled("div")(({ theme }) => {
  const {
    customPalette: { primary },
  } = theme;
  return {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "48px",
    backgroundColor: primary,
    border: "none",
  };
});
