import { Typography, styled } from "@mui/material";

interface StateTagProps {
  state: string;
}

export const TagContainer = styled("div")<StateTagProps>(({ theme, state }) => {
  const {
    customPalette: { StateTag: StateTagPalette },
  } = theme;
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "20px",
    paddingLeft: "7px",
    paddingRight: "7px",
    borderRadius: "7px",
    backgroundColor:
      state == "Activo"
        ? StateTagPalette.tag.active.background
        : StateTagPalette.tag.inactive.background,
  };
});

export const Circle = styled("div")<StateTagProps>(({ theme, state }) => {
  const {
    customPalette: { StateTag: StateTagPalette },
  } = theme;
  return {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    marginRight: "7px",
    border: `1.5px solid ${state == "Activo" ? StateTagPalette.tag.active.circleBorder : StateTagPalette.tag.inactive.circleBorder}`,
    backgroundColor:
      state == "Activo"
        ? StateTagPalette.tag.active.circle
        : StateTagPalette.tag.inactive.circle,
  };
});

export const Title = styled(Typography)(({ theme }) => {
  const {
    customSizes: { StateTag: StateTagSize },
    customPalette: { StateTag: StateTagPalette },
  } = theme;

  return {
    fontSize: StateTagSize.label.fontSize,
    fontWeight: StateTagSize.label.fontWeight,
    color: StateTagPalette.label.text,
  };
});
