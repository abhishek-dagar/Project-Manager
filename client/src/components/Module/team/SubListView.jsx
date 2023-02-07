import {
  useTheme,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import { useState } from "react";

const SubListView = ({ task, index }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  return (
    <Stack>
    </Stack>
  );
};

export default SubListView;
