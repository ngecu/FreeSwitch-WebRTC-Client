import React, { useState, useEffect, useRef } from "react";
import {
  UserAgent,
  Inviter,
  Registerer,
  RegistererState,
  SessionState,
} from "sip.js";
import Header from "./components/Header/Header";
import CallScreen from "./components/CallScreen";
import DialPad from "./components/DialPad";
import CallControls from "./components/CallControls";
import "./App.css";
import { Container, createTheme, ThemeProvider, Grid, IconButton, Card, Typography } from "@mui/material";
import CallModal from "./components/CallModal";
import CallHistory from "./components/CallHistory";
import DialpadIcon from '@mui/icons-material/Dialpad';

const App = () => {
  const [userAgent, setUserAgent] = useState(null);
  const [registerer, setRegisterer] = useState(null);
  const [session, setSession] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [caller, setCaller] = useState("");
  const [time, setTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  const [hasVideo, setHasVideo] = useState(false); // Track mute state

  const [showDialPad, setShowDialPad] = useState(false);

  const callStatusRef = useRef(null);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to open modal
  const handleOpenModal = () => {
    // setCaller("John Doe"); // Set the caller name dynamically
    console.log("open modal")
    setModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const appRef = useRef(null);

  const credentials = {
    username: "1006",
    domain: "10.4.1.10",
    password: "1234",
    wssServer: "wss://10.4.1.10:7443/",
  };

  useEffect(() => {
    setupUserAgent();
    return () => unregister();
  }, []);

  const setupUserAgent = async () => {
    const uri = UserAgent.makeURI(
      `sip:${credentials.username}@${credentials.domain}`
    );
    console.log(uri);
    if (!uri) return console.error("Invalid SIP URI");

    const uaOptions = {
      uri,
      authorizationUsername: credentials.username,
      authorizationPassword: credentials.password,
      transportOptions: { server: credentials.wssServer },
      sessionDescriptionHandlerFactoryOptions: {
        peerConnectionConfiguration: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
        constraints: { audio: true, video: false },
      },
      delegate: { onInvite: handleIncomingCall },
    };

    const ua = new UserAgent(uaOptions);
    const registerer = new Registerer(ua);

    ua.transport.onConnect = () => console.log("Connected to SIP server");
    ua.transport.onDisconnect = (error) =>
      console.log(`Disconnected: ${error || "Unknown reason"}`);

    registerer.stateChange.addListener(handleRegistrationState);

    setUserAgent(ua);

    await ua.start();
    console.log("UserAgent started");
    await registerer.register();
  };

  const handleRegistrationState = (state) => {
    setRegistered(state === RegistererState.Registered);
    console.log(
      state === RegistererState.Registered ? "Registered" : "Unregistered"
    );
  };

  const setupSessionListeners = (session) => {
    session.stateChange.addListener((state) => {
      console.log(`Call state: ${state}`);

      if (state === SessionState.Established) {
        updateCallStatus(`Connected with: ${session.remoteIdentity.uri.user}`);
        setIsCallActive(true);
        setTime(0); // Reset Timer
        //start timer
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);

      } else if (state === SessionState.Terminated) {
        setSession(null);
        updateCallStatus("Call ended");
      }
    });

    session.delegate = {
      onSessionDescriptionHandler: (sdh) => {
        sdh.peerConnectionDelegate = {
          ontrack: (event) => {
            if (event.track.kind === "audio") {
              const stream = new MediaStream();
              event.streams[0]
                .getTracks()
                .forEach((track) => stream.addTrack(track));

              // Assign the stream to an audio element for playback
              let audioElement = document.getElementById("remoteAudio");
              if (!audioElement) {
                audioElement = document.createElement("audio");
                audioElement.id = "remoteAudio";
                audioElement.autoplay = true;
                document.body.appendChild(audioElement);
              }
              audioElement.srcObject = stream;
            }
          },
        };
      },
    };
  };

  const updateCallStatus = (status) => {
    if(callStatusRef.current){
        console.log("callstat curr")
    }
  };

  const handleIncomingCall = (invitation) => {
    console.log("incoming call")
    handleOpenModal();
    setSession(invitation);
    setCaller(invitation.remoteIdentity.uri.user);

    // appRef.current?.classList.add("is-active"); // Show modal
    setupSessionListeners(invitation);
 
  };

  const answerCall = async () => {
    if (session) {
      await session.accept({
        sessionDescriptionHandlerOptions: {
          constraints: { audio: true, video: false },
        },
      });
  
      setIsCallActive(true);
      setTime(0); // Reset Timer
      //start timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    handleCloseModal();
    }
  };

  const hangupCall = () => {
    if (session) {
      session.state === SessionState.Established
        ? session.bye()
        : console.log("Call Ended");
      setSession(null);
      setIsCallActive(false);
      setTime(0); //reset timer
      clearInterval(timerRef.current);

      handleCloseModal();
    }
  };

  const makeCall = async (extension) => {
    if (!registered) {
      console.error("Not registered");
      return;
    }
    console.log(extension);

    const targetURI = UserAgent.makeURI(
      `sip:${extension}@${credentials.domain}`
    );
    if (!targetURI) {
      console.error("Invalid target URI");
      return;
    }

    console.log(`Initiating call to ${extension}`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const newSession = new Inviter(userAgent, targetURI);
      setSession(newSession); // Store session in state

      setupSessionListeners(newSession); // Attach session listeners

      await newSession.invite({
        sessionDescriptionHandlerOptions: {
          constraints: { audio: true, video: false },
          localMediaStream: stream,
        },
      });

      updateCallStatus(`Calling ${extension}...`);
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  const unregister = async () => {
    if (registerer) await registerer.unregister();
    if (userAgent) await userAgent.stop();
    setUserAgent(null);
    setRegisterer(null);
    setRegistered(false);
  };

  //
  const toggleMute = () => {
    const pc = session?.sessionDescriptionHandler?.peerConnection;
    if (!pc) {
      console.log("No active call to mute");
      return;
    }

    pc.getSenders().forEach((sender) => {
      if (sender.track?.kind === "audio") {
        sender.track.enabled = !isMuted;// Toggle based on current state
      }
    });
    setIsMuted(!isMuted); // Flip state
    console.log(isMuted ? "Call unmuted " : "Call muted");
   
  };

  const toggleHold = async (hold) => {
    if (!session || !session.sessionDescriptionHandler) {
      console.log("No active call to hold");
      throw new Error("No active call");
    }

    try {
      if (appRef.current) {
        const localVideo = document.querySelector("#localVideo");
        console.log(localVideo);
        // Get current local stream
        const stream =
          localVideo.srcObject ||
          (await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          }));

        // Create hold/unhold INVITE options
        const options = {
          sessionDescriptionHandlerOptions: {
            constraints: { audio: true, video: false },
            localMediaStream: stream,
            onSessionDescriptionHandlerCreated: (sdh) => {
              // Modify SDP before sending
              const originalGetDescription = sdh.getDescription;
              sdh.getDescription = async (options) => {
                const desc = await originalGetDescription.call(sdh, options);
                desc.sdp = this.modifyHoldSDP(desc.sdp, hold);
                return desc;
              };
            },
          },
        };

        // Send re-INVITE
        await session.invite(options);

        // Only modify local audio state after successful hold
        if (hold) {
          toggleMute(false); // Mute local audio when on hold
        } else {
          toggleMute(true); // Unmute local audio when resuming
        }

        console.log(hold ? "Call placed on hold" : "Call resumed from hold");
        // UI.buttons.hold.disabled = hold;
        // UI.buttons.unhold.disabled = !hold;
      }
    } catch (error) {
      console.log(`Hold operation failed: ${error.message}`);
      // Restore audio state on failure
      toggleMute(true);
      throw error;
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <div className="call-ui">
        <Container sx={{ mt: 2 }}>
          <Header />
          <Grid container spacing={3} className="call-body">
            <Grid item md={9} xs={12}>
              <CallScreen
                ref={appRef}
                caller={caller}
                session={session}
                answerCall={answerCall}
                hangupCall={hangupCall}
                makeCall={makeCall}
                toggleMute={toggleMute}
                toggleHold={toggleHold}
                formatTime={formatTime}
                time={time}
                isMuted={isMuted}
                hasVideo={hasVideo}
              />

              <CallControls
                caller={caller}
                session={session}
                answerCall={answerCall}
                hangupCall={hangupCall}
                makeCall={makeCall}
                toggleMute={toggleMute}
                toggleHold={toggleHold}
              />
              <CallModal 
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                    answerCall={answerCall}
                    hangupCall={hangupCall}
                    isModalOpen={isModalOpen}
                    session={session}
                    caller={caller}

              ></CallModal>
            </Grid>
            
            <Grid item md={3} xs={12}>
              <CallHistory /> 
              
              {showDialPad ?  
          
              <DialPad
                ref={appRef}
                caller={caller}
                session={session}
                answerCall={answerCall}
                hangupCall={hangupCall}
                makeCall={makeCall}
                toggleMute={toggleMute}
                toggleHold={toggleHold}
                onClose={() => setShowDialPad(false)}
              /> :  
              
              <Card sx={{
                borderRadius:"24px",
                boxShadow:"none",
                boxSizing: "border-box",
                padding: "16px",
                border: "1px solid rgba(223, 234, 218, 0.5)",
                borderRadius: "28px"
                }}>
                <Grid container spacing={3} >
                    <Grid item md={6} xs={6} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                        <Typography variant="body1">
                            Dial Pad
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={6} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                    <IconButton
                    sx={{border:"solid #73796E 1px"}}
                    onClick={() => setShowDialPad(true)}
                    >
                        <DialpadIcon color="black" />
                    </IconButton>
                    </Grid>
                    

                </Grid>
            
                
              </Card>
              
                }
            </Grid>
          </Grid>
        </Container>

        {/* Pass session and actions as props to CallModal */}
        {/* <CallModal
                    ref={appRef}
                    caller={caller}
                    session={session}
                    answerCall={answerCall}
                    hangupCall={hangupCall}
                /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
