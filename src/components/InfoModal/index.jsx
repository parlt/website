import {
    Typography,
    Box,
    Modal,
    Paper,
    SvgIcon,
    Button,
    IconButton,
  } from "@material-ui/core";
  import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
  import "./infoModal.scss";
  import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
  
  function InfoModal({
    open,
    handleInfoModalClose,
    type,
    number = 0
  }) {
    return (
      <Modal id="hades" open={open} onClose={handleInfoModalClose} hideBackdrop>
        <Paper className="ohm-card info-popover">
          <IconButton style={{alignSelf: 'flex-end', padding: '0px', borderRadius: '0%', backgroundColor: '#54239D'}} onClick={handleInfoModalClose}>
              <SvgIcon color="primary" component={XIcon} style={{fontSize: '1rem', margin: '2px'}}/>
          </IconButton>
          <Box display="flex">
            <div style={{width: '100%', textAlign: 'center'}}><ErrorOutlineRoundedIcon style={{width: '80px', height: '80px'}} /></div>
          </Box>
  
          {type === "create" &&
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <p className="info-text">Creating a node requires 10 $PENT tokens.</p><p className="info-text"> There will be lost as a result of creating a node.</p><p className="info-text">Your node will be permanent, making you passive income forever.</p>
              <Button
                  className="stake-button"
                  variant="contained"
                  color="primary"
                  style={{width: '25px', marginTop: '20px'}}
                  onClick={handleInfoModalClose}
              >
                  I understand
              </Button>
            </Box>
          }
          {type === "stake" &&
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <p className="info-text">Staking your nodes will lock your tokens up for a certain time-period, earning you rewards. </p><p className="info-text">Once this period has passed you will be able to reclaim your staked tokens.</p>
              <Button
                  className="stake-button"
                  variant="contained"
                  color="primary"
                  style={{width: '25px', marginTop: '20px'}}
                  onClick={handleInfoModalClose}
              >
                  I understand
              </Button>
            </Box>
          }
          {type === "lesser" &&
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <p className="info-text">Fusing nodes will result in losing previous nodes in return for a higher tier ndoe.  </p><p className="info-text">Fusing lesser nodes into a common node requires {number} <b style={{color: "#54239D"}}>PENT</b> tokens.</p>
              <Button
                  className="stake-button"
                  variant="contained"
                  color="primary"
                  style={{width: '25px', marginTop: '20px'}}
                  onClick={handleInfoModalClose}
              >
                  Understand
              </Button>
            </Box>
          }
          {type === "common" &&
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <p className="info-text">Fusing nodes will result in losing previous nodes in return for a higher tier ndoe.  </p><p className="info-text">Fusing common nodes into a legendary node requires {number} <b style={{color: "#54239D"}}>PENT</b> tokens.</p>
              <Button
                  className="stake-button"
                  variant="contained"
                  color="primary"
                  style={{width: '25px', marginTop: '20px'}}
                  onClick={handleInfoModalClose}
              >
                  Understand
              </Button>
            </Box>
          }
          {type === "legendary" &&
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <p className="info-text">Fusing nodes will result in losing previous nodes in return for a higher tier ndoe.  </p><p className="info-text">Fusing legendary nodes into an OMEGA node requires {number} <b style={{color: "#54239D"}}>PENT</b> tokens.</p>
              <Button
                  className="stake-button"
                  variant="contained"
                  color="primary"
                  style={{width: '25px', marginTop: '20px'}}
                  onClick={handleInfoModalClose}
              >
                  Understand
              </Button>
            </Box>
          }
        </Paper>
      </Modal>
    );
  }
  
  export default InfoModal;
  