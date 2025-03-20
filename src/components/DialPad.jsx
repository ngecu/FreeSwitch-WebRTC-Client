import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Grid, Box, IconButton } from "@mui/material";
import DialpadIcon from '@mui/icons-material/Dialpad';
import CallIcon from '@mui/icons-material/Call';
import { IoBackspaceOutline } from "react-icons/io5";

const DialPad = React.forwardRef(({ caller, session, answerCall, hangupCall, makeCall,onClose }, ref) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleNumberClick = (num) => {
      if (phoneNumber.length < 13) {
        setPhoneNumber(phoneNumber + num);
      }
    };
  
    const handleClear = () => {
      setPhoneNumber(phoneNumber.slice(0, -1));
    };

  return (
    <Card className="dial-pad" sx={{borderRadius:"24px",boxShadow:"none"}}>
    <CardContent sx={{p:4}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",mb:2,px:3 }}>
        <Typography variant="h6" className="phone-number" sx={{fontfamily: 'Montserrat',fontStyle: "normal",fontWeight: 500,fontSize: "16px",lineHeight: "32px",textAlign: "center",color: "#000000"}}>{phoneNumber}</Typography>
        <IconButton className="clear-btn" onClick={handleClear} sx={{ background: "#C1EFAF", borderRadius: "4px",height:"24px",width:"30px" }}>
        <IoBackspaceOutline color="#000" />
        </IconButton>
      </Box>
      <hr/>
      <Grid container spacing={1} className="number-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num, index) => (
        <Grid item xs={4} md={4} key={index}>
          <Button
            variant="outlined"
            sx={{
              color: "#000",
              borderRadius: "50%",
              height: "45px", // Reduced height
              width: "45px", // Ensuring width matches
              minWidth: "unset", // Prevents Material-UI default min-width
              fontSize: "16px", // Adjust font size
              border: "#73796E 0.2px solid",
              boxShadow: "0px 4px 10px rgba(28, 117, 253, 0.3)",
              transition: "box-shadow 0.3s ease-in-out"
            }}
            className="num-btn"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </Button>
        </Grid>
          ))}

          {/* Additional Grid Button */}
          <Grid item xs={4} md={4}>
            <Button variant="outlined" 
            onClick={onClose}
            sx={{
              color:"#000",
              borderRadius:"50%",
              height: "45px", // Reduced height
              width: "45px", // Ensuring width matches
              minWidth: "unset", // Prevents Material-UI default min-width
              fontSize: "16px", // Adjust font size
              border:"#73796E 0.2px solid",
            }} 
              className="num-btn extra-btn">
              <DialpadIcon />
            </Button>
            
          </Grid>
          <Grid item xs={3} md={3}>
            <Button onClick={()=>makeCall(phoneNumber)} variant="contained"
            sx={{
                color:"#fff",
                backgroundColor:" rgba(32, 168, 5, 1)",
                borderRadius:"50%",
                height: "45px", // Reduced height
                width: "45px", // Ensuring width matches
                minWidth: "unset", // Prevents Material-UI default min-width
                fontSize: "16px", // Adjust font size
                
              }} 
              className="num-btn extra-btn">
              <CallIcon />
            </Button>
            
          </Grid>
        </Grid>
    </CardContent>
  </Card>
  );
});

export default DialPad;
