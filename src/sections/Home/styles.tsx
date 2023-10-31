/* eslint-disable prettier/prettier */
import { styled, Typography } from "@mui/material";

export const HomeContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "100px",
    paddingBottom: "100px",
    backgroundColor: theme.customPalette.white,
    [theme.breakpoints.down(768)]: {
      height: "120%"
    },
    [theme.breakpoints.down(400)]: {
      height: "135%"
    },
  };
});

export const MainCardContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "960px",
    minHeight: "880px",
    width: "95%",
    height: "fit-content",
    border: "1px solid black",
    paddingBottom: "15px",
    borderRadius: "10px",
  };
});

export const CardContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "95%",
    minHeight: "758px",
    height: "fit-content",
    border: "1px solid black",
    borderRadius: "10px",
    marginTop: "15px",
  };
});

export const HeaderContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "fit-content",
    gap: "20px",
    padding: "20px",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: theme.customPalette.header,
    [theme.breakpoints.down(400)]: {
      justifyContent: "center",
    },
  };
});

export const Container = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
  };
});

export const TopContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
    padding: "35px 30px",
  };
});

export const UserContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: "20px",
    width: "100%",
    height: "400px",
    [theme.breakpoints.down(400)]: {
      height: "fit-content",
    },
  };
});

export const FooterButtonContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    width: "100%",
    height: "fit-content",
    gap: "20px",
    padding: "35px 30px",
    [theme.breakpoints.down(400)]: {
      justifyContent: "center",
    },
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
