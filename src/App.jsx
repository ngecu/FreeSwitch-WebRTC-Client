import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Snackbar, Card, Chip, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Appbar from "./components/Appbar";
import { ToastContainer, toast } from 'react-toastify';
import { IoCall } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { BiTransferAlt } from "react-icons/bi";
import { IoVolumeMute } from "react-icons/io5";
import { FaHandHolding } from "react-icons/fa";

var vertoInstance, vertoCallbacks, currentCall;


const App = () => {
  const [formData, setFormData] = useState({
    login: "1000@1.2.3.4",
    password: "1234",
    socketUrl: "wss://1.2.3.4:8082"
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [onCall,setonCall] = useState(false)
  const notify = () => toast("Wow so easy!");



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://webrtc.github.io/samples/src/js/adapter-latest.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertOpen(true);
    setloading(true)
    notify()
    createGlobalVertoInstance(formData.login, formData.password, formData.socketUrl);
  };

  function createGlobalVertoInstance(login, password, socketUrl) {
    function bootstrap(status) {
      vertoInstance = new jQuery.verto({
        login,
        passwd: password,
        socketUrl,
        deviceParams: {
          useMic: 'any',
          useSpeak: 'any',
          useCamera: 'any',
        },
        tag: "remote-video",
        localTag: "local-video-from-remote",
      }, vertoCallbacks);
      
    }
    
    console.log("vertoInstance ",vertoInstance)

    $.verto.init({}, bootstrap);
    setloading(false)
  }

  function onHangupClick() {
    if (currentCall) {
      currentCall.hangup();
    }
  }
  
function makeCall(extension) {
  currentCall  = vertoInstance.newCall({
    destination_number: extension,
    caller_id_name: 'Test User',
    caller_id_number: '1005',
    outgoingBandwidth: 'default',
    incomingBandwidth: 'default',
    useStereo: true,
    dedEnc: false,
    useVideo: true,
    userVariables: {
      email: 'test@test.com'
    },
  })

}


  return (
    <>
    <Appbar />

          <Grid container spacing={2} sx={{my:2}}>
          <Grid size={12} container justifyContent="center" alignItems="center">
            {onCall ? <Chip label="On Call" color="success" />
 : 
              <Chip label="No Active Calls" />
            }
</Grid>


        <Grid xs={12} size={4} >
        {loading ? (
  <CircularProgress />
) : vertoInstance == null ? (
  <Paper sx={{ p: 2 }}>
    
    <form onSubmit={handleSubmit}>
      <TextField
        label="Login"
        name="login"
        value={formData.login}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Socket URL"
        name="socketUrl"
        value={formData.socketUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        Create Verto Instance
      </Button>
    </form>
  </Paper>
) : (
  <Dialpad vertoInstance={vertoInstance} makeCall={makeCall} onHangupClick={onHangupClick} setonCall={setonCall} />
)}

     

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          initializing Verto Instance
        </Alert>
      </Snackbar>
      </Grid>
    
      <Grid 
    size={8} 
  sx={{ 
    p: 2, 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    textAlign: "center"
  }} 
>

<Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={4} md={3}>
        <video id="local-video-from-remote" width="100%" autoPlay playsInline></video>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <video id="remote-video" width="100%" autoPlay playsInline></video>
      </Grid>
    </Grid>

 
</Grid>


     </Grid>
     
    </>
  );
};

export default App;

const Dialpad = ({ vertoInstance,makeCall,onHangupClick,setonCall }) => {
  const [dialedNumber, setDialedNumber] = useState("");

   const handleDial = (digit) => {
    setDialedNumber((prev) => prev + digit);
  };

  const destroyVertoInstance = () => {

      vertoInstance = null // Remove global reference
      console.log(vertoInstance);
      
  };

  return (
    <Paper sx={{p:2}} >
      <div style={{ textAlign: "center", marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
      <Typography variant="h6">Dial Pad:</Typography>
      <TextField value={dialedNumber} fullWidth margin="normal" disabled />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit) => (
          <Button key={digit} variant="outlined" onClick={() => handleDial(digit)}>{digit}</Button>
        ))}
      </div>
      {dialedNumber && <>
      
      
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="primary" onClick={()=>{makeCall(dialedNumber); setonCall(true)}}><IoCall /></Button>
        <Button variant="contained" color="error" style={{ marginLeft: "5px" }} onClick={()=> {onHangupClick(); setonCall(false)}} ><MdCallEnd /></Button>
        <Button variant="contained" color="warning" style={{ marginLeft: "5px" }} onClick={()=>setDialedNumber("")}><RxReset /></Button>

      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained"> <BiTransferAlt /> Transfer</Button>
        <Button variant="contained" style={{ marginLeft: "5px" }}> <IoVolumeMute /> Mute</Button>
        <Button variant="contained" style={{ marginLeft: "5px" }}> <FaHandHolding />  Hold</Button>
      </div>
      </>}
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="secondary" onClick={destroyVertoInstance}>Destroy Verto Instance</Button>
      </div>
    </div>
    </Paper>
  );
};