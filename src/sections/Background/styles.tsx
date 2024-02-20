import { styled } from "@mui/material";

export const NextFixedPage = styled("div")(({ theme }) => {
  return {
    backgroundColor: theme.customPalette.white,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflowY: "scroll",
  };
});
