import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { MdCallSplit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const Header = () => (
  
  <AppBar position="static" className="header" sx={{ borderRadius:"12px",mb:2,backgroundColor:"#fff",color:"#000",boxSshadow: "0px 4px 8px 3px rgba(28, 117, 253, 0.3), 0px 1px 3px rgba(28, 117, 253, 0.3); !important" }}>
    <Toolbar>
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Avatar sx={{ background: "#20A805", marginRight: 1 }}>
          <MdCallSplit />
        </Avatar>
        <Typography sx={{fontWeight:700,lineHeight:"20px",letterSpacing:"0.1px"}}>NENACALL</Typography>
      </Box>

      <Avatar sx={{background:"#69785D",marginX:"10px"}}><FaRegUser /></Avatar>
      <Typography sx={{fontWeight:400,lineHeight:"24px",letterSpacing:"0.5px"}}>Denis G</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;