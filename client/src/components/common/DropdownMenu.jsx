import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";

import IconBtn from "./IconBtn";

const DropdownMenu = ({
  id,
  btnId,
  items,
  handleClose,
  handelClick,
  anchorEl,
  open,
  search,
  sx,
  sxMenuList,
  sxMenu,
  divider,
  avatarIcon,
  colors,
  icon_color,
}) => {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": btnId,
        style: {
          ...sxMenuList,
        },
      }}
      PaperProps={{
        style: {
          ...sx,
          maxHeight: "400px",
          maxWidth: "448px",
          borderRadius: "6px",
          padding: 0,
        },
      }}
    >
      {search && (
        <TextField
          id="outlined-size-small"
          placeholder="search"
          variant="standard"
          // onChange={onChange}
          size="small"
          autoFocus
          sx={{
            marginBottom: "6px",
            "& .MuiInputBase-input": {
              padding: "0px 20px 10px 0",
            },
          }}
          InputProps={{
            startAdornment: (
              <IconButton
                disableRipple
                sx={{
                  padding: "0 12px 0 24 px",
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: "1.2rem",
                    animation: "changeWidthIcon 1s linear",
                    "@keyframes changeWidthIcon": {
                      "0%": { width: "0" },
                      "100%": { width: "190px" },
                    },
                  }}
                />
              </IconButton>
            ),
          }}
        />
      )}
      {items.map((item, index) => {
        return (
          <Box key={index}>
            <Stack
              direction={"row"}
              // onClick={handleClose}
              onClick={() => {
                handelClick(item);
                handleClose();
              }}
              sx={{
                margin: "0 12px",
                "&:hover": {
                  backgroundColor: "#2a2e34",
                  borderRadius: "6px",
                },
                ...sxMenu,
              }}
            >
              <IconBtn
                letter={item.displayName ? item.displayName[0] : item[0]}
                user={!avatarIcon}
                avatarIcon={item === "Clear" ? CloseIcon : avatarIcon}
                avatar_color={colors ? colors[index] : ""}
                transparent
                icon_color={icon_color && icon_color[index]}
                sx={{
                  minWidth: "40px",
                  height: "44px",
                }}
              />
              <MenuItem
                sx={{
                  paddingLeft: 0,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#2a2e34",
                    borderRadius: "6px",
                  },
                }}
              >
                {item.displayName ? item.displayName : item}
              </MenuItem>
            </Stack>
            {divider && <Divider />}
          </Box>
        );
      })}
    </Menu>
  );
};

export default DropdownMenu;
