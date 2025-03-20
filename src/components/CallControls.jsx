import { Box, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import { BiMicrophoneOff } from "react-icons/bi";
import { MdOutlinePhonePaused } from "react-icons/md";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { BsTelephoneForward, BsGrid } from "react-icons/bs";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CiVideoOn } from "react-icons/ci";

const CallControls = React.forwardRef(
  ({ isMuted, hangupCall, toggleMute, toggleHold }, ref) => {
    return (
      <div className="call-controls" ref={ref}>
        <Container sx={{ my: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              overflowX: "auto",
              whiteSpace: "nowrap",
            
            }}
          >
            {[
              {
                icon: <BiMicrophoneOff color="#4B5563" />,
                label: "Mute",
                onClick: toggleMute,
                bg: isMuted ? "green" : "#fff",
              },
              {
                icon: <MdOutlinePhonePaused color="#4B5563" />,
                label: "Hold",
                onClick: toggleHold,
                bg: "#fff",
              },
              {
                icon: <BsTelephoneForward color="#4B5563" />,
                label: "Forward",
                bg: "#fff",
              },
              {
                icon: <CallEndIcon sx={{ color: "#fff" }} />,
                label: "",
                onClick: hangupCall,
                bg: "#FF3B30",
              },
              {
                icon: <BsGrid color="#4B5563" />,
                label: "Grid",
                bg: "#fff",
              },
              {
                icon: <HiOutlineSpeakerWave color="#4B5563" />,
                label: "Speaker",
                bg: "#fff",
              },
              {
                icon: <CiVideoOn color="#4B5563" />,
                label: "Video",
                bg: "#fff",
              },
            ].map((btn, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  className="control-btn"
                  sx={{
                    background: btn.bg,
                    padding: "12px",
                    marginBottom: "5px",
                    border: "solid #E5E7EB 0.2px",
                    minWidth: "50px",
                  }}
                  onClick={btn.onClick}
                >
                  {btn.icon}
                </IconButton>
                {btn.label && (
                  <Typography className="control-name" variant="body2">
                    {btn.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </div>
    );
  }
);

export default CallControls;
