import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Card } from "@mui/material";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { SlCallOut } from "react-icons/sl";

const callHistory = [
  { number: "+254 7123456789", status: "Incoming", missed: false },
  { number: "+254 7123456789", status: "Incoming", missed: false },
  { number: "+254 7123456789", status: "Missed", missed: true },
  { number: "+254 7123456789", status: "Incoming", missed: false },
];

const CallHistory = () => {
  return (
    <Card sx={{ borderRadius: "24px", boxShadow: "none", padding: "0 10px", marginBottom: "1rem" }}>
      <List
      sx={{maxHeight:"40vh",overflowY:"auto"}}
      >
        {callHistory.map((call, index) => (
          <ListItem
            key={index}
            sx={{
              marginBottom: "2px",
              borderBottom: "solid #E4E4E7 1px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: call.missed ? "#FFDAD666" : "transparent", // Background for missed calls
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px", display: "flex", justifyContent: "left" }}>
              <SlCallOut color="#16A34A" />
            </ListItemIcon>
            <ListItemText
              className="call-history-number"
              primary={call.number}
              secondary={call.status + " call"}
              sx={{ color: call.missed ? "red" : "black" }}
            />
            {!call.missed ? ( // Hide CallEndIcon for missed calls
              <ListItemIcon sx={{ minWidth: "40px", display: "flex", justifyContent: "right" }}>
                <CallEndIcon color="error" />
              </ListItemIcon>
            ) :  <ListItemIcon sx={{ minWidth: "40px", display: "flex", justifyContent: "right" }}>
            
          </ListItemIcon>}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default CallHistory;
