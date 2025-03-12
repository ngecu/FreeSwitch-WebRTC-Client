import React, { useState } from "react";

import Header from "./components/Header/Header";
import CallScreen from "./components/CallScreen";
import DialPad from "./components/DialPad";
import CallControls from "./components/CallControls";
import "./App.css";
import { Container, createTheme, ThemeProvider,Grid } from "@mui/material";


const App = () => {
  const [pgFont,setPgFont] = useState('Montserrat')

  const theme = createTheme({
    typography: {
      fontFamily: [
        `${String(pgFont).toLowerCase()}`, // Fallback font family
      ].join(','),
    },
    palette: {
      primary: {
        main: "#20A805", // Fallback color
      },
      
    },
  });


  return (
    <ThemeProvider theme={theme}>
    <div className="call-ui">
      <Container sx={{ mt: 2 }}>
      <Header />
    <Grid container spacing={3} className="call-body">
      <Grid item md={9} xs={12} >
        <CallScreen />
      </Grid>
      <Grid item md={3} xs={12}>
        <DialPad />
      </Grid>
    </Grid>
    <CallControls />
      </Container>
   
  </div>
  </ThemeProvider>
  );
};

export default App;
