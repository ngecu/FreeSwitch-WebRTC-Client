import { Box, Container, IconButton, Typography } from "@mui/material";
import { BiMicrophoneOff } from "react-icons/bi";
import { MdOutlinePhonePaused } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CiVideoOn } from "react-icons/ci";
import { IoCall } from "react-icons/io5";

import Grid from '@mui/material/Grid2';

const CallControls = () => (
    <div className="call-controls">
        <Grid container spacing={2}>
            <Grid item size={9}>
            <Container sx={{my:2}}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    <BiMicrophoneOff color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Mute</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    <MdOutlinePhonePaused color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Hold</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    <BsTelephoneForward color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Forward</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#FF3B30",padding:"10px",marginBottom:"5px",height: "100%",width: "68px"}} >
                    <IoCall   color="#fff" />
                </IconButton>
                
               
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    <BsGrid  color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Mute</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    
                    <HiOutlineSpeakerWave color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Speaker</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton  className="control-btn" sx={{background:"#fff",padding:"10px",marginBottom:"5px"}} >
                    
                    <CiVideoOn color="#4B5563" />
                </IconButton>
                
                <Typography variant="body2">Video</Typography>
                </Box>

               
            </Box>


        
            </Container>
        <Grid item size={3}>

            </Grid>
            </Grid>
            </Grid>
      
   
    </div>
  );

export default CallControls;