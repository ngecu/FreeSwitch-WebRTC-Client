import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Dialpad = () => {
    const [dialedNumber, setDialedNumber] = useState("");

     const handleDial = (digit) => {
      setDialedNumber((prev) => prev + digit);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
        <Typography variant="h6">Dial Pad:</Typography>
        <TextField value={dialedNumber} fullWidth margin="normal" disabled />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit) => (
            <Button key={digit} variant="outlined" onClick={() => handleDial(digit)}>{digit}</Button>
          ))}
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button variant="contained" color="primary">Call</Button>
          <Button variant="contained" color="error" style={{ marginLeft: "5px" }}>Hangup</Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button variant="contained">Transfer</Button>
          <Button variant="contained" style={{ marginLeft: "5px" }}>Mute</Button>
          <Button variant="contained" style={{ marginLeft: "5px" }}>Hold</Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button variant="contained" color="secondary">Destroy Verto Instance</Button>
        </div>
      </div>
    );
  };


export default Dialpad;