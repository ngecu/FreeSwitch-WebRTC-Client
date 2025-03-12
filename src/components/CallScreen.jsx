import React, { useState, useEffect } from "react";
import { Typography, Avatar, Card, CardContent, Box } from "@mui/material";
import { BiMicrophoneOff } from "react-icons/bi";

const CallScreen = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

  return (
    <Card className="call-screen" sx={{minHeight:"350px",borderRadius:"24px",boxShadow:"none"}}>
      <CardContent sx={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Red blinking live indicator */}
         

          {/* Countdown Timer */}
          <Typography variant="body2" className="call-status">
            <span className="live-indicator"></span>
            <span>{formatTime(time)}</span>
          </Typography>

          {/* Customer Name */}
          <Typography variant="body1" className="customer-name">Customer Name</Typography>

          {/* Mic Off Icon */}
          <Avatar sx={{ background: "#FFFFFF", border: "solid 1px #20A805" }}>
            <BiMicrophoneOff color="#4B5563" />
          </Avatar>
        </Box>

      </CardContent>
    </Card>
  );
};

export default CallScreen;
