import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InventoryIcon from "@mui/icons-material/Inventory";

const main = [
  {
    path: "/",
    icon: HomeOutlinedIcon,
    state: "app",
  },
  {
    path: "/teams",
    icon: PeopleAltOutlinedIcon,
    state: "teams",
  },
];

const topBarMenu = [
  {
    icon: FormatListBulletedIcon,
    name: "List",
  },
  {
    icon: InventoryIcon,
    name: "Board",
  },
];

const menuConfigs = { main, topBarMenu };

export default menuConfigs;
