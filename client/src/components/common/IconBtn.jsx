import { Avatar, Badge, Button, Tooltip, useTheme } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";

const IconBtn = ({
  click,
  handelClick,
  badgeIcon,
  avatarIcon,
  outline,
  transparent,
  user,
  letter,
  avatar_color,
  title,
  sx,
  sxIcon,
  icon_color,
}) => {
  const theme = useTheme();

  const { themeMode } = useSelector((state) => state.themeMode);
  const BadgeIcon = badgeIcon;
  const AvatarIcon = avatarIcon;

  return (
    <Button
      disableRipple
      sx={{
        padding: 0,
        "&:hover": { backgroundColor: "transparent" },
        ...sx,
      }}
    >
      <Tooltip title={title} placement="top">
        <Badge
          overlap="circular"
          // onClick={(event) => (!user && click && click(event))}
          anchorOrigin={{
            vertical: user ? "top" : "bottom",
            horizontal: "right",
          }}
          badgeContent={
            BadgeIcon && (
              <BadgeIcon
                onClick={(event) => (user ? handelClick() : click(event))}
                sx={{
                  backgroundColor: themeMode === "dark" ? "#2a2e34" : "#fff",
                  borderRadius: "50%",
                  fontSize: ".9rem",
                }}
              />
            )
          }
          sx={{
            margin: "0 auto",
            color: theme.palette.icon.default,
            "&:hover .MuiSvgIcon-root": {
              display: "inline-block",
            },
            "& .MuiSvgIcon-root": {
              display: user ? "none" : "",
            },
          }}
        >
          <Avatar
            onClick={click}
            sx={{
              height: "25px",
              width: "25px",
              backgroundColor:
                !user && transparent ? "transparent" : avatar_color,
              fontSize: "15px",
              color: "#eee",
              border:
                !user && outline && `1px dashed ${theme.palette.icon.default}`,
            }}
          >
            {!user ? (
              <AvatarIcon
                sx={{
                  fontSize: "1.3rem",
                  color: icon_color ? icon_color : theme.palette.icon.default,
                  ...sxIcon,
                }}
              />
            ) : (
              letter
            )}
          </Avatar>
        </Badge>
      </Tooltip>
    </Button>
  );
};

export default IconBtn;
