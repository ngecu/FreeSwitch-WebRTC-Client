import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Grid, Box, IconButton } from "@mui/material";
import DialpadIcon from '@mui/icons-material/Dialpad';
import { IoBackspaceOutline } from "react-icons/io5";
const DialPad = () => {
    const [phoneNumber, setPhoneNumber] = useState("+254 ");

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
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",mb:2 }}>
        <Typography variant="h6" className="phone-number" sx={{fontWeight: 600,fontSize: "24px",lineHeight: "32px",textAlign: "center",color: "#000000"}}>{phoneNumber}</Typography>
        <IconButton className="clear-btn" onClick={handleClear} sx={{ background: "#C1EFAF", borderRadius: "0" }}>
        <IoBackspaceOutline color="#000" />
        </IconButton>
      </Box>
      <Grid container spacing={1} className="number-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num, index) => (
            <Grid item xs={4} key={index}>
              <Button variant="outlined" sx={{
                color:"#000",
                filter: "drop-shadow(2px 2px 4px rgba(28, 117, 253, 0.3)) drop-shadow(0px 4px 4px rgba(28, 117, 253, 0.3))",
              }} className="num-btn" onClick={() => handleNumberClick(num)}>
                {num}
              </Button>
            </Grid>
          ))}
          {/* Additional Grid Button */}
          <Grid item xs={4}>
            <Button variant="outlined" 
            sx={{
                color:"#000",
                filter: "drop-shadow(2px 2px 4px rgba(28, 117, 253, 0.3)) drop-shadow(0px 4px 4px rgba(28, 117, 253, 0.3))",
              }} 
              className="num-btn extra-btn">
              <DialpadIcon />
            </Button>
          </Grid>
        </Grid>
    </CardContent>
  </Card>
  );
};

export default DialPad;
