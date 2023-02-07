import { Typography, useTheme } from "@mui/material";

const Logo = ({size ,alpha}) => {
  const theme = useTheme();

  return (
    <Typography
      fontWeight={"700"}
      fontSize={size}
      color={theme.palette.primary.contrastText}
    >
      {alpha?"P":"Project"}
      <span
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {alpha?"P":"Pilot"}
      </span>
    </Typography>
  );
};

export default Logo;
