import React, { forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, Button } from "@mui/material";
import { Close as CloseIcon, CallEnd as CallEndIcon, Call as CallIcon } from "@mui/icons-material";

const CallModal = forwardRef(({session,isModalOpen,  caller, answerCall,hangupCall, onReject,handleOpenModal,handleCloseModal },ref) => {
  return (
    <Dialog  open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs" ref={ref}>
     
      <DialogContent className="modal-bg">
        <Box display="flex" sx={{justifyContent:"flex-end"}}>
            <IconButton sx={{float:"right", color:"#fff"}} onClick={()=>handleCloseModal()}>
                <CloseIcon />
            </IconButton>
        </Box>
        
        <Box  flexDirection="column" alignItems="center" textAlign="center">
          <Typography variant="h4" sx={{color:"#fff"}}>{session?caller:''}</Typography>
          <Typography id="modalCallStatus" variant="subtitle1" sx={{color:"#fff"}}>Calling</Typography>

          <Box display="flex" justifyContent="center" mt={5}>
            <Box textAlign="center" mx={5}>
              <Button
                id="callBtn"
                sx={{  borderRadius:"50%",
                    height:"60px",
                    marginLeft:"auto",
                    marginRight:"auto"

                }}
                variant="contained"
                color="error"
                onClick={()=>hangupCall()}
                endIcon={<CallEndIcon />}
              >
              </Button>
            </Box>
            <Box textAlign="center" mx={5}>
              <Button
                id="rejectBtn"
                sx={{  borderRadius:"50%",
                    height:"60px",
                       marginLeft:"auto",
                    marginRight:"auto"
                }}
                variant="contained"
                color="success"
                onClick={()=>answerCall()}
                endIcon={<CallIcon />}
              >
            
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export default CallModal;
