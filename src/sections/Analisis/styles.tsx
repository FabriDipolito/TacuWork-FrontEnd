/* eslint-disable prettier/prettier */
import { Autocomplete, Checkbox, Chip, MenuItem, Select, styled, TextField, Typography } from "@mui/material";

export const AnalisisContainer = styled("div")(({ theme }) => {
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

export const SubHeaderCard = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "13px",
    width: "100%",
    backgroundColor: "transparent",
    height: "66px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "15px 40px 15px 25px",
  };
});

export const AutocompleteContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    gap: "13px",
    width: "fit-content",
    backgroundColor: "transparent",
    height: "fit-content",
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

export const GraphsContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    height: "calc(100% - 110px)",
    padding: "20px 40px",
  };
});

export const RadarButtonContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "32px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  };
});

interface SelectRadarProps {
  comparacion?: boolean;
}

export const SelectRadar = styled(Select)<SelectRadarProps>(({ theme, comparacion=false }) => {
  return {
    height: "32px",
    width: comparacion ? "150px" : "300px",
    borderRadius: "0px",
    borderBottomLeftRadius: "16px",
    overflow: "hidden",
    ".MuiOutlinedInput-notchedOutline": {
      border: 'none !important',
      ".Mui-focused": {
        borderColor: "none !important",
        borderWidth: "0px !important",
      },
    },
    ".MuiSelect-select": {
      padding: "0px",
    },
    ".MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4px 2px",
    },
    ".MuiSelect-multiple": {
      maxHeight: "32px",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-button": {
        display: "none",
      },
    },
    ".MuiSvgIcon-root": {
      color: theme.customPalette.primary,
    }
  };
});

export const ChipSelect = styled(Chip)(({ theme }) => {
  const {
    customPalette: { black, white },
    customSizes: { chips },
  } = theme;

  return {
    width: 'fit-content',
    height: '12px',
    padding: "1px 3px",
    backgroundColor: white,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    ".MuiChip-label": {
      color: black,
      fontSize: chips.fontSize,
      fontWeight: chips.fontWeight,
      padding: "0px",
    },
  };
});

export const SelectOptions = styled(MenuItem)(({ theme }) => {
  const {
    customPalette: { white },
  } = theme;

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20px',
    backgroundColor: white,
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    "&.Mui-selected": {
      backgroundColor: "rgba(247, 178, 0, 0.05)",
    },
    
  };
});

export const CheckboxSelect = styled(Checkbox)(({ theme }) => {
  const {
    customPalette: { primary },
  } = theme;

  return {
    color: primary,
    '&.Mui-checked': {
      color: primary,
    },
  };
});

export const ButtonsRadarContainer = styled("div")(() => {
  return {
    width: "calc(100% - 300px)",
    height: "100%",
    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
  };
});

interface ButtonRadarProps {
  focused?: boolean;
  promedio?: boolean;
}

export const ButtonRadar = styled("button")<ButtonRadarProps>(({theme, focused, promedio}) => {
  const {
    customPalette: { primary },
  } = theme;

  return {
    width: "50%",
    height: "100%",
    border: focused ? `1px solid ${primary}` : "1px solid rgba(0, 0, 0, 0.1)",
    color: focused ? primary : "rgba(0, 0, 0, 0.2)",
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: promedio ? "16px" : "0px",
    cursor: "pointer",
    ":hover": {
      border: `1px solid ${primary}`,
      color: primary,
    },
  };
});

export const LeftGraphContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    backgroundColor: "transparent",
    height: "100%",
    paddingRight: "40px",
  };
});

export const LineTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    height: "48px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "10px 25px",
  };
});

export const LineTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "20px",
    color: "#1E1E31",
    opacity: 0.7,
  };
});

export const PromedioContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    height: "35%",
  };
});

interface PromedioCardProps {
  promedio?: boolean;
  comparacion?: boolean;
}

export const PromedioCard = styled("div")<PromedioCardProps>(({ promedio, comparacion=false }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: comparacion ? "100%" : promedio ? "30%" : "65%",
    backgroundColor: "transparent",
    height: "100%",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
  };
});

export const PromedioTitleContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "fit-content",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "20px 5px 10px 5px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  };
});

export const PromedioTitle = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: "17px",
    color: "#1E1E31",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const PromedioTextContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    height: "100%",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    padding: "10px",
  };
});

export const PromedioTextSubsContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    backgroundColor: "transparent",
    height: "100%",
    //padding: "10px",
  };
});

interface PromedioTextProps {
  type: "NORMAL" | "MEJOR" | "PEOR";
}

export const PromedioText = styled(Typography)<PromedioTextProps>(({ theme, type  }) => {
  const {
    customTypography: {
      InterBold,
    },
  } = theme;

  return {
    fontFamily: InterBold,
    fontSize: "58px",
    color: type == "NORMAL" ? "#1E1E31" : type == "MEJOR" ? "#90EE90" : "#FF7F7F",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const LabelPromedioText = styled(Typography)<PromedioTextProps>(({ theme, type }) => {
  const {
    customTypography: {
      InterSemiBold,
    },
  } = theme;

  return {
    fontFamily: InterSemiBold,
    fontSize: "12px",
    color: type == "NORMAL" ? "#1E1E31" : type == "MEJOR" ? "#90EE90" : "#FF7F7F",
    opacity: 0.7,
    textAlign: "center",
  };
});

export const ColaboradoresAddButton = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
    height: "32px",
    borderRadius: "20px",
    backgroundColor: "transparent",
    padding: "6px 12px 8px 12px",
    gap: "6px",
    border: `2px solid ${theme.customPalette.primary}`,
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.customPalette.primary,
    }
  };
});

interface ButtonTextProps {
  hover: boolean;
}

export const ButtonText = styled(Typography)<ButtonTextProps>(({ theme, hover }) => {
  const {
    customPalette: {
      primary,
      white,
    },
  } = theme;

  return {
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "-2px",
    color: hover ? white : primary,
  };
});