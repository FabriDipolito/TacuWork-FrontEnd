import { Typography, styled } from "@mui/material";

export const StyledNavBar = styled("div")(({ theme }) => {
  const {
    customPalette: { NavBar },
  } = theme;
  return {
    display: "flex",
    flexDirection: "column",
    width: "272px",
    height: "calc(100vh - 48px)",
    backgroundColor: NavBar.background,
    padding: "18px 0px 16px 15px",
    justifyContent: "space-between",
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
  };
});

export const ColumnContainer = styled("div")(() => {
  return {
    width: "fit-content",
    height: "fit-content",
  };
});

export const LogoContainer = styled("div")(() => {
  return {
    width: "90px",
    height: "50px",
    paddingLeft: "5px",
    marginBottom: "35px",
  };
});

export const LinksContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
    gap: "24px",
  };
});

export const LinkContent = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
    gap: "10px",
    cursor: "pointer",
  };
});

interface LinkTextProps {
  selected: boolean;
}

export const LinkText = styled(Typography)<LinkTextProps>(({
  theme,
  selected,
}) => {
  const {
    customPalette: { NavBar },
    customSizes: { NavBar: NavBarText },
  } = theme;

  return {
    fontSize: NavBarText.links.selected.fontSize,
    fontWeight: NavBarText.links.selected.fontWeight,
    color: selected ? NavBar.links.selected : NavBar.links.unselected,
    textShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
    height: "18px",
  };
});
