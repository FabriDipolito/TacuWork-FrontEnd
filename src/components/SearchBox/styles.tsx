import { MenuItem, Select, TextField, Typography, styled } from "@mui/material";

export const ColumnContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "0px 48px 48px 48px",
    overflow: "hidden",
  };
});

export const SeparatorContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
});

export const Header = styled("div")(({ theme }) => {
  const {
    customPalette: {
      SearchBox: { header },
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "row",
    gap: "7px",
    width: "100%",
    height: "62.5px",
    padding: "14px 20px",
    backgroundColor: header.backgroundColor,
    borderTop: `1px solid ${header.borderColor}`,
    borderRight: `1px solid ${header.borderColor}`,
    borderBottom: `0.5px solid ${header.borderColor}`,
    borderLeft: `1px solid ${header.borderColor}`,
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
  };
});

export const Footer = styled("div")(({ theme }) => {
  const {
    customPalette: {
      SearchBox: { footer },
    },
  } = theme;

  return {
    width: "100%",
    height: "32.5px",
    backgroundColor: footer.backgroundColor,
    padding: "9px 20px",
    borderRight: `1px solid ${footer.borderColor}`,
    borderBottom: `1px solid ${footer.borderColor}`,
    borderLeft: `1px solid ${footer.borderColor}`,
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
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

export const StyledSelect = styled(Select)(({ theme }) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    width: "123px",
    height: "35px",
    paddingLeft: "11px",
    backgroundColor: SearchBoxPalette.header.filter.background,
    border: `1px solid ${SearchBoxPalette.header.filter.border}`,
    ".MuiInputAdornment-root": {
      width: "100%",
      height: "100%",
      marginRight: "9px",
    },
    ".MuiSvgIcon-root": {
      color: SearchBoxPalette.header.filter.arrow,
    },
    ".Mui-focused": {
      border: `1px solid ${SearchBoxPalette.header.filter.border}`,
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
  };
});

export const SelectOptions = styled(MenuItem)(({ theme }) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "103px",
    height: "35px",
    paddingLeft: "11px",
    paddingRight: "11px",
    backgroundColor: SearchBoxPalette.header.filter.background,
    whiteSpace: "normal",
    wordBreak: "break-all",
  };
});

interface FilterTextProps {
  option?: boolean;
  selected?: boolean;
}

export const FilterText = styled(Typography)<FilterTextProps>(({
  theme,
  option = false,
  selected = false,
}) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    marginTop: selected ? "4px" : "0px",
    fontSize: option
      ? SearchBoxSize.header.option.fontSize
      : SearchBoxSize.header.filter.fontSize,
    fontWeight: SearchBoxSize.header.filter.fontWeight,
    color: SearchBoxPalette.header.filter.text,
  };
});

export const SearchBar = styled(TextField)(({ theme }) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    width: "100%",
    height: "35px",
    textDecorationLine: "none",
    backgroundColor: SearchBoxPalette.header.search.background,
    border: `1px solid ${SearchBoxPalette.header.search.border}`,
    borderRadius: "17.5px",
    fontFamily: theme.customTypography.InterRegular,
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "35px",
    },
    ".MuiInputBase-input": {
      height: "35px",
      padding: "0px !important",
      fontSize: `${SearchBoxSize.header.search.fontSize}`,
      fontWeight: `${SearchBoxSize.header.search.fontWeight}`,
      borderRadius: "17.5px",
      marginTop: "-1px",
      color: `${SearchBoxPalette.header.search.border}`,
    },
    ".MuiInputBase-root": {
      paddingLeft: "10px",
    },
    ".MuiInputAdornment-root": {
      width: "15px",
    },
  };
});

export const SearchText = styled(Typography)(({ theme }) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    fontSize: SearchBoxSize.header.search.fontSize,
    fontWeight: SearchBoxSize.header.search.fontWeight,
    color: SearchBoxPalette.header.search.text,
  };
});

export const TableDiv = styled("div")(() => {
  return {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
});

export const Table = styled("table")(({ theme }) => {
  const {
    customPalette: {
      SearchBox: { subHeader },
    },
  } = theme;

  return {
    display: "inline-block",
    width: "100%",
    height: "100%",
    borderSpacing: "0px",
    borderTop: `0.5px solid ${subHeader.borderColor}`,
    borderRight: `1px solid ${subHeader.borderColor}`,
    borderLeft: `1px solid ${subHeader.borderColor}`,
    overflowY: "scroll",
    scrollbarWidth: "none",
  };
});

interface TRowProps {
  subHeader?: boolean;
}

export const TRow = styled("tr")<TRowProps>(({ theme, subHeader = false }) => {
  return {
    width: "100%",
    height: subHeader ? "33px" : "58px",
  };
});

export const THead = styled("thead")(({ theme }) => {
  const {
    customPalette: {
      SearchBox: { subHeader },
    },
  } = theme;

  return {
    width: "100%",
    height: "33px",
    backgroundColor: subHeader.backgroundColor,
  };
});

interface THProps {
  firstColumn?: boolean;
}

export const TH = styled("th")<THProps>(({ theme, firstColumn = false }) => {
  const {
    customTypography: { InterBold },
    customPalette: {
      SearchBox: { subHeader: subHeaderPalette },
    },
    customSizes: {
      SearchBox: { subHeader: subHeaderSize },
    },
  } = theme;

  return {
    color: subHeaderPalette.text,
    fontFamily: InterBold,
    fontSize: subHeaderSize.fontSize,
    textAlign: "center",
    borderBottom: `1px solid ${subHeaderPalette.borderColor}`,
    width: firstColumn ? "200px" : "575px",
    paddingLeft: firstColumn ? "40px" : "0px",
  };
});

export const TBody = styled("tbody")(({ theme }) => {
  const {
    customPalette: {
      SearchBox: { body },
    },
  } = theme;

  return {
    width: "100%",
    backgroundColor: body.backgroundColor,
    borderTop: `0.5px solid ${body.borderColor}`,
    borderRight: `1px solid ${body.borderColor}`,
    borderBottom: `0.5px solid ${body.borderColor}`,
    borderLeft: `1px solid ${body.borderColor}`,
  };
});

interface TDProps {
  firstColumn?: boolean;
}

export const TD = styled("td")<TDProps>(({ theme, firstColumn = false }) => {
  const {
    customPalette: {
      SearchBox: { body: bodyPalette },
    },
    customSizes: {
      SearchBox: { body: bodySize },
    },
  } = theme;

  return {
    textAlign: "center",
    color: bodyPalette.text,
    fontSize: bodySize.fontSize,
    whiteSpace: "normal",
    borderBottom: `1px solid ${bodyPalette.borderColor}`,
    width: firstColumn ? "200px" : "575px",
    paddingLeft: firstColumn ? "40px" : "0px",
  };
});

export const FooterText = styled(Typography)(({ theme }) => {
  const {
    customPalette: { SearchBox: SearchBoxPalette },
    customSizes: { SearchBox: SearchBoxSize },
  } = theme;

  return {
    fontSize: SearchBoxSize.footer.fontSize,
    fontWeight: SearchBoxSize.footer.fontWeight,
    color: SearchBoxPalette.footer.text,
  };
});
