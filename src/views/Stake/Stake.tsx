import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Divider,
} from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { t, Trans } from "@lingui/macro";
import { createNodeAsync, claimAllRewardAsync, claimRewardAsync, createNodeStakeAsync, withdrawStakeAsync } from "../../slices/StakeThunk";
import "./stake.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { useAppSelector } from "src/hooks";
import { loadAppDetails } from 'src/slices/AppSlice';
import InfoModal from "src/components/InfoModal";
import CraeteModal from "src/components/CreateModal";
import { makeStyles } from '@material-ui/core/styles';


import LesserImage from 'src/assets/icons/lesser-node-icon.png';
import CommonImage from 'src/assets/icons/common-node-icon.png';
import LegendaryImage from 'src/assets/icons/legendary-node-icon.png';
import OmegaImage from 'src/assets/icons/omega-icon.png';
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

function Stake() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID } = useWeb3Context();

  const [zoomed, setZoomed] = useState(false);
  const [nodeNameCreate, setNodeNameCreate] = useState("");
  const [nodeNameStake, setNodeNameStake] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [nodeType, setNodeType] = useState('3');

  const [days, setDays] = useState(30);
  const [isCreate, setIsCreate] = useState(true);

  const handleNodeTypeChange = (type: any) => {
      setNodeType(type);
  }

  const handleSliderChange = (e: any) => {
    setDays(Number(e.target.outerText));
  };

  const SECONDS_TO_REFRESH = 60;
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);
  
  useEffect(() => {
    let interval: any;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh(secondsToRefresh => secondsToRefresh - 1);
      }, 1000);
    } else {
      async function reload() {
        await dispatch(loadAppDetails({ networkID: chainID, provider: provider, address }));
      }
      reload();
      clearInterval(interval);
      setSecondsToRefresh(SECONDS_TO_REFRESH);
    }
    return () => clearInterval(interval);
  }, [secondsToRefresh]);

  const nodes = useAppSelector(state => {
    return state.app.nodes;
  });
  const staking = useAppSelector(state => {
    return state.app.staking;
  });
  const myNodeNumber = useAppSelector(state => {
    return state.app.myNodeNumber;
  });
  const totalNodeNumer = useAppSelector(state => {
    return state.app.totalNodeNumer || 0;
  });
  const availableRewards = useAppSelector(state => {
    return state.app.availableRewards;
  });

  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });
  
  const createNode = () => {
    setOpenCreate(false);
    if (isCreate) {
      dispatch(createNodeAsync({provider, address, networkID: chainID, nodeName: nodeNameCreate, nodeType}))
    } else {
      dispatch(createNodeStakeAsync({provider, address, networkID: chainID, nodeName: nodeNameStake, stakeDays: days.toString(), nodeType}))
    }
    setNodeType("3");
    setNodeNameCreate("");
    setNodeNameStake("");
    setDays(30);
  }

  const claimAllRewards = () => {
    dispatch(claimAllRewardAsync({provider, address, networkID: chainID}));
  }

  const claimRewards = (index: number) => {
    dispatch(claimRewardAsync({provider, address, networkID: chainID, index}));
  }

  const withdrawStaking = (index: number) => {
    dispatch(withdrawStakeAsync({provider, address, networkID: chainID, id: index.toString()}));
  }

  const handleInfoModalOpen = () => {
    setIsCreate(true);
    setOpenInfo(true);
  }

  const handleStakeInfoModalOpen = () => {
    setIsCreate(false);
    setOpenInfo(true);
  }

  const handleInfoModalClose = () => {
    setIsCreate(true);
    setOpenInfo(false);
  }

  const handleCreateModalOpen = () => {
    setIsCreate(true);
    setOpenCreate(true);
  }

  const handleCreateModalOpenStake = () => {
    setIsCreate(false);
    setOpenCreate(true);
  }

  const handleCreateModalClose = () => {
    setOpenCreate(false);
  }

  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      <Trans>Claim Rewards</Trans>
    </Button>,
  );

  return (
    <div id="stake-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="card-header">
                <Typography variant="h5">Nodes</Typography>
              </div>
            </Grid>

            <Grid item>
              <div className="stake-top-metrics">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-apy">
                      <Typography variant="h5" color="textSecondary">
                        <Trans>My Nodes</Trans>
                      </Typography>
                      <Typography variant="h4">
                        {myNodeNumber ? (
                          <span data-testid="apy-value">
                            {Number(myNodeNumber)}
                          </span>
                        ) : (
                          <Skeleton width="150px" data-testid="apy-loading" />
                        )}
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-tvl">
                      <Typography variant="h5" color="textSecondary">
                        <Trans>All Nodes</Trans>
                      </Typography>
                      <Typography variant="h4">
                        {totalNodeNumer ? (
                          <span data-testid="tvl-value">
                            {Number(totalNodeNumer)}
                          </span>
                        ) : (
                          <Skeleton width="150px" data-testid="tvl-loading" />
                        )}
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-index">
                      <Typography variant="h5" color="textSecondary">
                        <Trans>Available Rewards</Trans>
                      </Typography>
                      <Typography variant="h4">
                        {availableRewards ? (
                          <span data-testid="index-value">{Number(availableRewards).toFixed(4)}</span>
                        ) : (
                          <Skeleton width="150px" data-testid="index-loading" />
                        )}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <div className="staking-area">
                <div className="stake-wallet-notification">
                  {/* <div className="wallet-menu" id="wallet-menu">
                    {modalButton}
                  </div> */}
                  <Button
                    className="wallet-menu connect-button"
                    variant="contained"
                    color="primary"
                    disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                    onClick={claimAllRewards}
                  >
                    Claim Rewards
                  </Button>
                  <Typography variant="h6">
                    {/* <Trans>Daily Rewards = 1 PENT / day</Trans> */}
                  </Typography>
                </div>
            </div>
          </Grid>
        </Paper>
      </Zoom>
      <div className={`ohm-card`} style={{width: "97%", display: "flex", justifyContent: "space-between"}}>
        <Zoom in={true} onEntered={() => setZoomed(true)}>
          <Paper className={`ohm-card width-50`}>
            <Grid container direction="column" spacing={2}>
              <div className="staking-area">
                  <div className="stake-wallet-notification" style={{marginTop: "-13px"}}>
                    <Typography variant="h6" style={{marginTop: '15px'}}>
                      <Trans>1 Node = 10 PENT</Trans>
                    </Typography>
                  </div>
              </div>

              <div className="staking-area">
                  <div className="stake-wallet-notification">
                    <FormControl className="ohm-input" variant="outlined" color="primary">
                      <InputLabel htmlFor="amount-input"></InputLabel>
                      <OutlinedInput
                        id="amount-input"
                        type="text"
                        placeholder="Enter Node Name"
                        className="stake-input"
                        value={nodeNameCreate}
                        onChange={e => setNodeNameCreate(e.target.value)}
                        labelWidth={0}
                      />
                    </FormControl>
                  </div>
              </div>

              <div className="staking-area">
                <Box className="stake-action-area">
                  <Box className="stake-action-row " display="flex" alignItems="center">
                    <div className="stake-wallet-notification">
                      <Button
                        className="stake-button"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateModalOpen}
                        disabled={!(nodeNameCreate && nodeNameCreate.length > 3 && nodeNameCreate.length < 20)}
                      >
                        Create Node
                      </Button>
                      <CraeteModal
                        open={openCreate}
                        handleCreateModalClose={handleCreateModalClose}
                        nodeType={nodeType}
                        handleNodeTypeChange={handleNodeTypeChange}
                        createNode={createNode}
                      />
                    </div>
                    <div className="stake-wallet-notification">
                      <Button
                        className="stake-button"
                        variant="contained"
                        color="primary"
                        onClick={handleInfoModalOpen}
                      >
                        Info
                      </Button>
                    </div>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Paper>
        </Zoom>
        <Zoom in={true} onEntered={() => setZoomed(true)}>
          <Paper className={`ohm-card width-50`} style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
            <Grid container direction="column" spacing={2}>
              <div className="staking-area" style={{marginBottom: '-12px'}}>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                  Staking Days {days}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Slider
                    defaultValue={30}
                    step={1}
                    // marks
                    min={1}
                    max={30}
                    valueLabelDisplay="auto"
                    style={{width: '90%'}}
                    onChangeCommitted={e => handleSliderChange(e)}
                  />
                </div>
              </div>
              <div className="staking-area">
                  <div className="stake-wallet-notification">
                    <FormControl className="ohm-input" variant="outlined" color="primary">
                      <InputLabel htmlFor="amount-input"></InputLabel>
                      <OutlinedInput
                        id="amount-input"
                        type="text"
                        placeholder="Enter Node Name"
                        className="stake-input"
                        value={nodeNameStake}
                        onChange={e => setNodeNameStake(e.target.value)}
                        labelWidth={0}
                      />
                    </FormControl>
                  </div>
              </div>

              <div className="staking-area">
                <Box className="stake-action-area">
                  <Box className="stake-action-row " display="flex" alignItems="center">
                    <div className="stake-wallet-notification">
                      <Button
                        className="stake-button"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateModalOpenStake}
                        disabled={!(nodeNameStake && nodeNameStake.length > 3 && nodeNameStake.length < 20)}
                      >
                        Stake PENT
                      </Button>
                    </div>
                    <div className="stake-wallet-notification">
                      <Button
                        className="stake-button"
                        variant="contained"
                        color="primary"
                        onClick={handleStakeInfoModalOpen}
                      >
                        Info
                      </Button>
                      <InfoModal
                        type={isCreate ? "create" : "stake"}
                        open={openInfo}
                        handleInfoModalClose={handleInfoModalClose}
                      />
                    </div>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Paper>
        </Zoom>
      </div>
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`} style={{maxHeight: '350px', overflow: 'scroll'}}>
          <Grid container direction="column" spacing={2}>
            <div className="staking-area" style={{marginTop: '0px'}}>
                <div className="stake-wallet-notification">
                  <h1>My <b style={{color: '#54239D'}}>PENTAGON</b> Nodes</h1>
                  <table style={{width: '100%', fontSize: '15px'}}>
                    <thead>
                      <th>Types</th>
                      <th>Names</th>
                      <th>Create Time</th>
                      <th>Last Claim</th>
                      <th>Avaliable Rewards</th>
                    </thead>
                    <tbody>
                      {!!nodes && nodes.map((node, i) => 
                        <tr key={i}>
                          <td>{!!node &&
                            <img src={node.type === "1" ? LesserImage : node.type === "2" ? CommonImage : node.type === "3" ? LegendaryImage : OmegaImage } style={{width: '30px'}}/>
                          }</td>
                          <td>{!!node && node.name}</td>
                          <td>{!!node && node.createTime}</td>
                          <td>{!!node && node.lastClaim}</td>
                          <td>{!!node && node.reward}</td>
                          <td>
                            <Button
                              className="claim-button"
                              variant="contained"
                              color="primary"
                              onClick={() => claimRewards(node.index)}
                            >
                              Claim
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
          </Grid>
        </Paper>
      </Zoom>
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`} style={{maxHeight: '350px', overflow: 'scroll'}}>
          <Grid container direction="column" spacing={2}>
            <div className="staking-area" style={{marginTop: '0px'}}>
                <div className="stake-wallet-notification">
                  <h1>My Staked <b style={{color: '#54239D'}}>PENT</b></h1>
                  <table style={{width: '100%', fontSize: '15px'}}>
                    <thead>
                      <th>ID</th>
                      <th>Create Time</th>
                      <th>Expire Time</th>
                      <th>Balance</th>
                    </thead>
                    <tbody>
                      {!!staking && staking.filter(node => node.balance !== "0").map((node, i) => 
                        <tr key={i}>
                          <td>{!!node && i + 1}</td>
                          <td>{!!node && node.createTime}</td>
                          <td>{!!node && node.expireTime}</td>
                          <td>{!!node && node.balance}</td>
                          <td>
                            <Button
                              className="claim-button withdraw"
                              variant="contained"
                              color="primary"
                              onClick={() => withdrawStaking(node.id)}
                              disabled={Number(moment(node.expireTime).unix()) > Number(moment().unix())}
                            >
                              Withdraw
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
          </Grid>
        </Paper>
      </Zoom>

      {/* <ExternalStakePool /> */}
    </div>
  );
}

export default Stake;
