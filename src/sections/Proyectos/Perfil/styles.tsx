/* eslint-disable prettier/prettier */
import { Autocomplete, Select, styled, TextField, Typography } from "@mui/material";

export const PerfilContainer = styled("div")(({ theme }) => {
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

export const TitleText = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
    customSizes: {
      titleText: titleTextSize,
    },
    customPalette: {
      titleText: titleTextPalette,
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: titleTextSize.fontSize,
    fontWeight: titleTextSize.fontWeight,
    color: titleTextPalette.text,
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

export const InfoContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflowY: "hidden",
    paddingRight: "8px",
    "&:hover": {
      overflowY: "scroll",
      paddingRight: "0px",
    },
    "::-webkit-scrollbar": {
      width: "8px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  };
});

export const InfoTrabajadorContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
    padding: "40px 60px 0px 60px",
  };
});

export const InfoCardContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "268px",
    height: "364px",
    marginRight: "55px",
  };
});

export const PhotoContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "89px",
    height: "89px",
    borderRadius: "29px",
    backgroundColor: `#FCC0C0`,
    marginBottom: "-47px",
    zIndex: 1,
  };
});

export const InfoCard = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "268px",
    height: "256px",
    borderRadius: "7px",
    padding: "34px 18px",
    border: `1px solid ${PerfilPalette.card.border}`,
    backgroundColor: `${PerfilPalette.card.background}`,
  };
});

export const TagContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
  };
});

export const EditContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "3px",
    width: "fit-content",
    height: "fit-content",
    marginTop: "-19px",
    marginRight: "10px",
    cursor: "pointer",
  };
});

export const EditText = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
    customSizes: {
      Perfil: PerfilSizes
    },
    customPalette: {
      primary
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: PerfilSizes.card.edit.fontSize,
    fontWeight: PerfilSizes.card.edit.fontWeight,
    color: primary,
  };
});

export const TitleCardContainer = styled("div")(() => {

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
  };
});

export const TitleCard = styled(Typography)(({ theme }) => {
  const {
    customTypography: {
      InterMedium,
    },
    customSizes: {
      Perfil: PerfilSizes
    },
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    fontFamily: InterMedium,
    fontSize: PerfilSizes.card.title.fontSize,
    fontWeight: PerfilSizes.card.title.fontWeight,
    color: PerfilPalette.card.title,
  };
});

export const TableCardContainer = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    margin: "2px 2px",
    border: `0.5px solid ${PerfilPalette.card.table.border}`,
    backgroundColor: `${PerfilPalette.card.table.background}`,
    width: "100%",
    height: "fit-content",
  };
});

export const LeftContainer = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: `0.5px solid ${PerfilPalette.card.table.border}`,
    backgroundColor: "transparent",
    width: "50%",
    height: "fit-content",
  };
});

export const RightContainer = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: `0.5px solid ${PerfilPalette.card.table.border}`,
    backgroundColor: "transparent",
    width: "50%",
    height: "fit-content",
  };
});

export const Slot = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderTop: `0.5px solid ${PerfilPalette.card.table.border}`,
    borderBottom: `0.5px solid ${PerfilPalette.card.table.border}`,
    paddingLeft: "11px",
    backgroundColor: "transparent",
    width: "100%",
    height: "30px",
  };
});

export const SlotText = styled(Typography)(({ theme }) => {
  const {
    customSizes: {
      Perfil: PerfilSizes
    },
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    fontSize: PerfilSizes.card.table.fontSize,
    fontWeight: PerfilSizes.card.table.fontWeight,
    color: PerfilPalette.card.table.text,
  };
});

export const ProyectoContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
    padding: "35px 115px 60px 60px",
  };
});

export const ProyectoBox = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    width: "265px",
    height: "51px",
    border: `1px solid ${PerfilPalette.proyectos.border}`,
  };
});

export const Container = styled("div")(() => {

  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: "10px",
  };
});

export const ProyectoText = styled(Typography)(({ theme }) => {
  const {
    customSizes: {
      Perfil: PerfilSizes
    },
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    fontSize: PerfilSizes.proyectos.fontSize,
    fontWeight: PerfilSizes.proyectos.fontWeight,
    color: PerfilPalette.proyectos.text,
  };
});

export const ProyectoBoxDiv = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    border: `1px solid pink`,
    backgroundColor: "lightpink",
  };
});

export const TextBoxContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "fit-content",
    padding: "40px 60px 0px 60px",
  };
});

export const InfoEmergenciaContainer = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    height: "50px",
    padding: "0px 60px 12px 60px",
  };
});

export const InfoBancariaCard = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "270px",
    height: "235px",
    borderRadius: "7px",
    border: `1px solid ${PerfilPalette.personal.border}`,
    backgroundColor: `${PerfilPalette.personal.background}`,
    padding: "25px",
  };
});

export const InfoEmergencyCard = styled("div")(({ theme }) => {
  const {
    customPalette: {
      Perfil: PerfilPalette
    },
  } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "270px",
    height: "167px",
    borderRadius: "7px",
    border: `1px solid ${PerfilPalette.personal.border}`,
    backgroundColor: `${PerfilPalette.personal.background}`,
    padding: "25px",
  };
});

export const InputBox = styled("div")(() => {

  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "49px",
    gap: "4px",
  };
});

export const LabelText = styled(Typography)(({ theme }) => {

  return {
    fontSize: `${theme.customSizes.Perfil.personal.card.label.fontSize}`,
    fontWeight: `${theme.customSizes.Perfil.personal.card.label.fontWeight}`,
    color: `${theme.customPalette.Perfil.personal.label}`,
  };
});

export const InputText = styled(TextField)(({ theme }) => {
  return {
    width: "100%",
    height: "33px",
    backgroundColor: theme.customPalette.Perfil.personal.input.background,
    border: `1px solid ${theme.customPalette.Perfil.personal.input.border}`,
    borderRadius: "6px",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "33px",
    },
    ".MuiInputBase-input": {
      height: "33px",
      padding: "0px !important",
      fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
      fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
      borderRadius: "6px",
      marginTop: "-1px",
      color: `${theme.customPalette.Perfil.personal.input.text}`,
      "&::placeholder": {
        color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
      },
    },
    ".MuiInputBase-root": {
      paddingLeft: "10px",
    },
    ".MuiInputAdornment-root": {
      width: "15px",
    },
  };
});

interface FilterComponentProps {
  placeholder?: boolean;
}

export const SelectText = styled(Select)<FilterComponentProps>(({ theme, placeholder = true, }) => {
  return {
    width: "100%",
    height: "33px",
    backgroundColor: theme.customPalette.Perfil.personal.input.background,
    border: `1px solid ${theme.customPalette.Perfil.personal.input.border}`,
    borderRadius: "6px",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
      height: "33px",
    },
    ".MuiInputBase-input": {
      height: "33px",
      padding: "0px !important",
      fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
      fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
      borderRadius: "6px",
      marginTop: "-1px",
      width: placeholder ? '220px' : '220px',
      marginLeft: placeholder ? '-55px' : '0px',
      color: `${theme.customPalette.Perfil.personal.input.text}`,
      "&::placeholder": {
        color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
      },
    },
    ".MuiInputBase-root": {
      paddingLeft: "10px",
    },
    ".MuiInputAdornment-root": {
      width: "15px",
    },
  };
});

export const FilterPlaceholder = styled(Typography)(({ theme }) => {

  return {
    fontSize: `${theme.customSizes.Perfil.personal.card.input.fontSize}`,
    fontWeight: `${theme.customSizes.Perfil.personal.card.input.fontWeight}`,
    color: `${theme.customPalette.Perfil.personal.input.placeholder}`,
    cursor: 'pointer',
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