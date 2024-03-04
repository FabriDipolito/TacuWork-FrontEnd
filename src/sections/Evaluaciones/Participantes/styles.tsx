/* eslint-disable prettier/prettier */
import { Autocomplete, styled, TextField, Typography } from "@mui/material";

export const ParticipantesContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "calc(100vh - 48px)",
    padding: "12px 12px 12px 8px",
    backgroundColor: theme.customPalette.background,
  };
});

export const MainCardContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.customPalette.white,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
  };
});

export const HeaderCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    gap: "13px",
    width: "100%",
    backgroundColor: "transparent",
    height: "62px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "15px 25px",
  };
});

export const SubHeaderCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "52px",
    gap: "50px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "16px 16px 0px 0px",
    padding: "10px 30px",
  };
});

export const SearchBar = styled(Autocomplete)(({ theme }) => {
  return {
    height: "32px",
    width: "164px",
    marginTop: "-18px",
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "none !important",
      borderWidth: "1px !important",
    },
    ".MuiInputBase-root": {
      paddingTop: "0px",
      paddingBottom: "0px",
      border: `2px solid ${theme.customPalette.primary}`,
    },
    ".MuiSvgIcon-root": {
      color: theme.customPalette.primary,
    }
  };
});

export const SearchBarTextField = styled(TextField)(({ theme }) => {
  return {
    height: "32px",
    width: "164px",
    borderRadius: "6px",
    borderWidth: "0px",
    fontFamily: theme.customTypography.InterRegular,
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "32px",
    },
    ".MuiOutlinedInput-root.Mui-focused": {
      border: `2px solid ${theme.customPalette.primary}`,
      height: "36px",
    },
    ".MuiInputBase-input": {
      height: "32px",
      padding: "0px !important",
      fontSize: "12px",
    },
    ".MuiInputLabel-root": {
      marginTop: "-6.5px",
      fontSize: "12px",
      color: "rgba(247, 178, 0, 0.7)",
      
    },
  };
});

export const TextBoxContainer = styled("div")(({ theme }) => {
  return {
    width: "100%",
    height: "fit-content",
    padding : "42px 60px",
  };
});

interface pageLinkProps {
  selected?: boolean;
}

export const PageLink = styled(Typography)<pageLinkProps>(({ theme, selected }) => {
  const {
    customTypography: {
      InterMedium,
    },
    customSizes: {
      pageLinks: pageLinksSize
    },
    customPalette: {
      pageLinks: pageLinksPalette,
    },
  } = theme;

  return {
    borderBottom: selected ? "2px solid #1E1E31" : "0px",
    cursor: "pointer",
    fontFamily: InterMedium,
    fontSize: pageLinksSize.fontSize,
    fontWeight: pageLinksSize.fontWeight,
    color: pageLinksPalette.text,
  };
});

export const Separator = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "20px",
    color: "#1E1E31",
    opacity: 0.2,
  };
});
