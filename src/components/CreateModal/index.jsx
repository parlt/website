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
import "./createModal.scss";
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LesserImg from '../../assets/icons/lesser-node-icon.png';
import CommonImg from '../../assets/icons/common-node-icon.png';
import LegendaryImg from '../../assets/icons/legendary-node-icon.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    lesser: {
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        border: '1px solid #565656',
        textAlign: 'center',
        fontSize: '18px',
        backgroundColor: '#020202',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '15px',
    },
    lesser_title: {
        color: 'white',
    },
    common: {
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        border: '1px solid #565656',
        textAlign: 'center',
        fontSize: '18px',
        backgroundColor: '#020202',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '15px',
    },
    common_title: {
        color: '#54239D',
    },
    legendary: {
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        border: '1px solid #565656',
        textAlign: 'center',
        fontSize: '18px',
        backgroundColor: '#020202',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '15px',
    },
    legendary_title: {
        color: '#FFBA08',
    },
    pent: {
        color: '#54239D',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function CraeteModal({
    open,
    handleCreateModalClose,
    nodeType,
    handleNodeTypeChange,
    createNode,
  }) {
    const classes = useStyles();

    return (
    <Modal id="hades" open={open} onClose={handleCreateModalClose} hideBackdrop>
        <Paper className="ohm-card create-popover">
            <IconButton style={{alignSelf: 'flex-end', padding: '0px', borderRadius: '0%', backgroundColor: '#54239D'}} onClick={handleCreateModalClose}>
                <SvgIcon color="primary" component={XIcon} style={{fontSize: '1rem', margin: '2px'}}/>
            </IconButton>
            <Box display="flex">
                <Typography variant="h2" style={{width: '100%', textAlign: 'center'}}>Pick your node:</Typography>
            </Box>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Paper className={classes.lesser} onClick={() => handleNodeTypeChange('1')} style={{border: nodeType === '1' ? '5px solid white' : '1px solid #565656'}}>
                        <img src={LesserImg} />
                        <p className={classes.lesser_title}>Lesser Node</p>
                        <p>Cost = 1 <b className={classes.pent}>$PENT</b></p>
                        <p>Rewards = 0.03</p>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.common} onClick={() => handleNodeTypeChange('2')} style={{border: nodeType === '2' ? '5px solid #54239D' : '1px solid #565656'}}>
                        <img src={CommonImg} />
                        <p className={classes.common_title}>Common Node</p>
                        <p>Cost = 5 <b className={classes.pent}>$PENT</b></p>
                        <p>Rewards = 0.18</p>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.legendary} onClick={() => handleNodeTypeChange('3')} style={{border: nodeType === '3' ? '5px solid #FFBA08' : '1px solid #565656'}}>
                        <img src={LegendaryImg} />
                        <p className={classes.legendary_title}>Legendary Node</p>
                        <p>Cost = 10 <b className={classes.pent}>$PENT</b></p>
                        <p>Rewards = 0.39</p>
                    </Paper>
                </Grid>
            </Grid>
    
            <Box className="card-content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
                <Button
                    className="stake-button"
                    variant="contained"
                    color="primary"
                    style={{width: '25px'}}
                    onClick={createNode}
                >
                    Create Node
                </Button>
            </Box>
        </Paper>
    </Modal>
    );
  }
  
  export default CraeteModal;
  