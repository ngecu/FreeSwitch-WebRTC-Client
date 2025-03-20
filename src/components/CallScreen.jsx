import React, { useState, useEffect, forwardRef } from "react";
import { Typography, Avatar, Card,Grid, CardContent, Box, CardMedia } from "@mui/material";
import { BiMicrophoneOff } from "react-icons/bi";

const CallScreen  = forwardRef(({ caller, session, answerCall, hangupCall, formatTime, time,isMuted,hasVideo}, ref) => {
    console.log("isMuted ",isMuted,hasVideo)

  return (
    <Card className="call-screen" sx={{minHeight:"350px",borderRadius:"24px",boxShadow:"none"}} ref={ref}>
      <CardContent sx={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Red blinking live indicator */}
         

          {/* Countdown Timer */}
          <Typography variant="body2" className="call-status">
            <span className="live-indicator"></span>
            <span>{formatTime(time)}</span>
            
          </Typography>

          {/* Customer Name */}
          <Typography variant="body1" className="customer-name">{session? caller : ''}</Typography>

          {/* Mic Off Icon */}
          <Avatar sx={{ background: "#FFFFFF", border: "solid 1px #20A805" }}>
            <BiMicrophoneOff color="#4B5563" />
          </Avatar>
        </Box>
        {hasVideo ? 
        <Grid container >
          
          <Grid item md={6} xs={6} sx={{paddingTop:'2rem'}}>
           
            <CardMedia component="video" id="localVideo"></CardMedia>
          </Grid>
          <Grid item md={6} xs={6} sx={{paddingTop:'2rem'}}>
            <CardMedia component="video" id="remoteVideo"></CardMedia>
          </Grid>
        </Grid>
        :

        <Grid container sx={{height:"100%"}} >
          
        <Grid item md={12} xs={12} sx={{paddingTop:'2rem',height:"100%",display:"flex",alignContent:"center",justifyContent:"center"}}>
         
        <div class="client-name">DG</div>
        </Grid>
        
      </Grid>
}

      </CardContent>
    </Card>
  );
});

export default CallScreen;
