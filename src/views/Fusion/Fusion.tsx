import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";

import InfoModal from "src/components/InfoModal";
import { useAppSelector } from "src/hooks";

import { fusionNodeAsync } from "../../slices/FusionThunk";
import { useWeb3Context } from "src/hooks/web3Context";

import LesserIcon from '../../assets/icons/lesser-node-icon.png';
import CommonIcon from '../../assets/icons/common-node-icon.png';
import LegendaryIcon from '../../assets/icons/legendary-node-icon.png';
import OmegaIcon from '../../assets/icons/omega-icon.png';

import ArrowIcon from '../../assets/icons/arrow.png';
import FusionIcon from '../../assets/icons/fusion-icon.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    itemPadding: {
        paddingTop: '50px',
    },
    lesser: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '400px',
        margin: 'auto',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        border: '3px solid white',
        borderRadius: '5px',
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
    },
    common: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '400px',
        margin: 'auto',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        border: '3px solid #54239D',
        borderRadius: '5px',
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
    },
    legendary: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '400px',
        margin: 'auto',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        border: '3px solid #FFBA08',
        borderRadius: '5px',
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        maxWidth: '900px',
        margin: 'auto',
    },
    pent: {
        color: '#54239D'
    },
    fuseNode: {
        width: '90%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    buttonGroup: {
        width: '60%',
        margin: 'auto',
    },
    image: {
        width: '100px',
    },
    button: {
        fontSize: '18px',
        padding: '1px 15px',
        marginTop: '10px',
    },
}));

function Fusion() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openInfo, setOpenInfo] = useState(false);
    const { provider, address, connected, connect, chainID } = useWeb3Context();

    const [nodeName, setNodeName] = useState("");
    const [nodeNameMode1, setNodeNameMode1] = useState("");
    const [nodeNameMode2, setNodeNameMode2] = useState("");
    const [nodeNameMode3, setNodeNameMode3] = useState("");
    const [tax, setTax] = useState("");
    const [type, setType] = useState("legendary");

    const lesserNodeCount = useAppSelector(state => {
      return state.app.lesserNodeCount;
    });
    const commonNodeCount = useAppSelector(state => {
      return state.app.commonNodeCount;
    });
    const legendaryNodeCount = useAppSelector(state => {
      return state.app.legendaryNodeCount;
    });
    const omegaNodeCount = useAppSelector(state => {
      return state.app.omegaNodeCount;
    });

    const lesserFusionCost = useAppSelector(state => {
      return state.app.lesserFusionCost;
    });
    const commonFusionCost = useAppSelector(state => {
      return state.app.commonFusionCost;
    });
    const legendaryFusionCost = useAppSelector(state => {
      return state.app.legendaryFusionCost;
    });

    const lesserFusionTax = useAppSelector(state => {
      return state.app.lesserFusionTax;
    });
    const commonFusionTax = useAppSelector(state => {
      return state.app.commonFusionTax;
    });
    const legendaryFusionTax = useAppSelector(state => {
      return state.app.legendaryFusionTax;
    });

    const handleInfoModalOpen = (type: string) => {
        if (type === 'lesser') {
            setTax(lesserFusionTax? lesserFusionTax: "")
            setType("lesser")
        } else if (type === 'common') {
            setTax(commonFusionTax? commonFusionTax: "")
            setType("common")
        } else if (type === 'legendary') {
            setTax(legendaryFusionTax? legendaryFusionTax: "")
            setType("legendary")
        }
        setOpenInfo(true);
    }
  
    const handleInfoModalClose = () => {
      setOpenInfo(false);
    }

    const fusionNode = (method: string) => {
        console.log(nodeName)
        dispatch(fusionNodeAsync({provider, address, networkID: chainID, nodeName: nodeName, nodeType: method}));
        setNodeName("");
        setNodeNameMode1("");
        setNodeNameMode2("");
        setNodeNameMode3("");
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.container} container spacing={3}>

                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.lesser}>
                        <p>Your lesser nodes = {lesserNodeCount? lesserNodeCount.toString() : 0}</p>
                        <p>Fusion cost = {lesserFusionCost? lesserFusionCost.toString() : 0} nodes</p>
                        <p>Fusion tax = {lesserFusionTax? lesserFusionTax.toString() : 0} <b className={classes.pent}>$PENT</b></p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.lesser}>
                        <Grid className={classes.fuseNode} container spacing={3}>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={LesserIcon} className={classes.image} />
                            </Grid>
                            <Grid item xs={12} md={2} style={{padding: '0px'}}>
                                <div><img src={FusionIcon} style={{width: '45px'}}/></div>
                            </Grid>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={CommonIcon} className={classes.image} />
                            </Grid>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <FormControl className="ohm-input" variant="outlined" color="primary">
                                <InputLabel htmlFor="amount-input"></InputLabel>
                                <OutlinedInput
                                    id="amount-input"
                                    type="text"
                                    placeholder="Enter Node Name"
                                    value={nodeNameMode1}
                                    onChange={e => {setNodeNameMode1(e.target.value), setNodeName(e.target.value)}}
                                    labelWidth={0}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fusionNode("1")}
                                    disabled={!(nodeNameMode1 && nodeNameMode1.length > 3 && nodeNameMode1.length < 20 && Number(lesserFusionCost) <= Number(lesserNodeCount))}
                                >
                                    Fuse
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleInfoModalOpen('lesser')}
                                >
                                    Info
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.common}>
                        <p>Your lesser nodes = {commonNodeCount? commonNodeCount.toString() : 0}</p>
                        <p>Fusion cost = {commonFusionCost? commonFusionCost.toString() : 0} nodes</p>
                        <p>Fusion tax = {commonFusionTax? commonFusionTax.toString() : 0} <b className={classes.pent}>$PENT</b></p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.common}>
                        <Grid className={classes.fuseNode} container spacing={3}>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={CommonIcon} className={classes.image} />
                            </Grid>
                            <Grid item xs={12} md={2} style={{padding: '0px'}}>
                                <div><img src={FusionIcon} style={{width: '45px'}}/></div>
                            </Grid>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={LegendaryIcon} className={classes.image} />
                            </Grid>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <FormControl className="ohm-input" variant="outlined" color="primary">
                                <InputLabel htmlFor="amount-input"></InputLabel>
                                <OutlinedInput
                                    id="amount-input"
                                    type="text"
                                    placeholder="Enter Node Name"
                                    value={nodeNameMode2}
                                    onChange={e => {setNodeNameMode2(e.target.value), setNodeName(e.target.value)}}
                                    labelWidth={0}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fusionNode("2")}
                                    disabled={!(nodeNameMode2 && nodeNameMode2.length > 3 && nodeNameMode2.length < 20 && Number(commonFusionCost) <= Number(commonNodeCount))}
                                >
                                    Fuse
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleInfoModalOpen('common')}
                                >
                                    Info
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.legendary}>
                        <p>Your lesser nodes = {legendaryNodeCount? legendaryNodeCount.toString() : 0}</p>
                        <p>Fusion cost = {legendaryFusionCost? legendaryFusionCost.toString() : 0} nodes</p>
                        <p>Fusion tax = {legendaryFusionTax? legendaryFusionTax.toString() : 0} <b className={classes.pent}>$PENT</b></p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} style={{paddingTop: '50px'}}>
                    <Paper className={classes.legendary}>
                        <Grid className={classes.fuseNode} container spacing={3}>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={LegendaryIcon} className={classes.image} />
                            </Grid>
                            <Grid item xs={12} md={2} style={{padding: '0px'}}>
                                <div><img src={FusionIcon} style={{width: '45px'}}/></div>
                            </Grid>
                            <Grid item xs={12} md={5} style={{padding: '0px'}}>
                                <img src={OmegaIcon} className={classes.image} />
                            </Grid>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <FormControl className="ohm-input" variant="outlined" color="primary">
                                <InputLabel htmlFor="amount-input"></InputLabel>
                                <OutlinedInput
                                    id="amount-input"
                                    type="text"
                                    placeholder="Enter Node Name"
                                    value={nodeNameMode3}
                                    onChange={e => {setNodeNameMode3(e.target.value), setNodeName(e.target.value)}}
                                    labelWidth={0}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.buttonGroup} container spacing={3}>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fusionNode("3")}
                                    disabled={!(nodeNameMode3 && nodeNameMode3.length > 3 && nodeNameMode3.length < 20 && omegaNodeCount?.toString() === "0" && Number(legendaryFusionCost) <= Number(legendaryNodeCount))}
                                >
                                    Fuse
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} style={{padding: '0px'}}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleInfoModalOpen('legendary')}
                                >
                                    Info
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <InfoModal
                type={type}
                open={openInfo}
                handleInfoModalClose={handleInfoModalClose}
                number={Number(tax)}
            />
        </div>
    );
}

export default Fusion;