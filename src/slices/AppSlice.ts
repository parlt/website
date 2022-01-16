import { ethers } from "ethers";
import { addresses } from "../constants";
import { setAll, getTokenPrice, getMarketPrice } from "../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, IBaseAsyncThunk } from "./interfaces";
import moment from 'moment';

import { abi as PENTABI } from "src/abi/PENT.json";

interface IProtocolMetrics {
  readonly timestamp: string;
  readonly ohmCirculatingSupply: string;
  readonly sOhmCirculatingSupply: string;
  readonly totalSupply: number;
  readonly ohmPrice: string;
  readonly marketCap: number;
  readonly totalValueLocked: string;
  readonly treasuryMarketValue: string;
  readonly nextEpochRebase: string;
  readonly nextDistributedOhm: string;
  readonly myNodeNumber: string;
}

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {

    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    const totalNodeNumer = await pentContract.getTotalNodesCreated();
    const myNodeNumber = await pentContract.getNodeNumberOf(address);
    const availableRewards = await pentContract.getRewardAmount();

    let nodes;
    let temp = [];

    if (myNodeNumber > 0) {
      let nodesCreatime = await pentContract.getNodesCreatime();
      let nodesRewards = await pentContract.getNodesRewards();
      let nodesLastClaims = await pentContract.getNodesLastClaims();
      let nodesName = await pentContract.getNodesName();
      let nodesType = await pentContract.getNodesType();
      let nodesInfo = await pentContract.getNodesInfo();
      let nodesExpireTime = await pentContract.getNodesExpireTime();

      let createTimes = nodesCreatime.split('#');
      let rewards = nodesRewards.split('#');
      let lastClaimes = nodesLastClaims.split('#');
      let names = nodesName.split('#');
      let types = nodesType.split('#');
      let infos = nodesInfo.split('#');
      let expiretimes = nodesExpireTime.split("#");

      for (let i = 0; i < myNodeNumber; i ++) {
        temp.push({
          createTime: moment.unix(createTimes[i]).format("HH:mm:ss MM/DD/YYYY"),
          lastClaim: moment.unix(lastClaimes[i]).format("HH:mm:ss MM/DD/YYYY"),
          reward: ethers.utils.formatUnits(rewards[i], 'ether'),
          name: names[i],
          type: types[i],
          info: infos[i],
          expireTime: moment.unix(expiretimes[i]).format("HH:mm:ss MM/DD/YYYY"),
          index: i
        })
      }

      nodes = temp;
    }

    let stakePositions;
    stakePositions = await pentContract.getStakePositions(address);
    temp = [];

    for (let i = 0; i < stakePositions.length; i ++) {
      temp.push({
        balance: ethers.utils.formatUnits(stakePositions[i].balance, 'ether'),
        createTime: moment.unix(Number(stakePositions[i].creationTime)).format("HH:mm:ss MM/DD/YYYY"),
        expireTime: moment.unix(Number(stakePositions[i].expireTime)).format("HH:mm:ss MM/DD/YYYY"),
        id: Number(stakePositions[i].id),
      })
    }
    let staking;
    staking = temp;

    let counts = await pentContract.getNodeCounts();

    let lesserNodeCount = counts[0];
    let commonNodeCount = counts[1];
    let legendaryNodeCount = counts[2];
    let omegaNodeCount = counts[3];

    let costs = await pentContract.getFusionCost();

    let lesserFusionCost = costs[0];
    let commonFusionCost = costs[1];
    let legendaryFusionCost = costs[2];

    let taxes = await pentContract.getTaxForFusion();

    let lesserFusionTax = ethers.utils.formatUnits(taxes[0], 'ether');
    let commonFusionTax = ethers.utils.formatUnits(taxes[1], 'ether');
    let legendaryFusionTax = ethers.utils.formatUnits(taxes[2], 'ether');

    return {
      myNodeNumber,
      totalNodeNumer,
      availableRewards: ethers.utils.formatUnits(availableRewards, 'ether'),
      nodes,
      staking,
      lesserNodeCount,
      commonNodeCount,
      legendaryNodeCount,
      omegaNodeCount,
      lesserFusionCost,
      commonFusionCost,
      legendaryFusionCost,
      lesserFusionTax,
      commonFusionTax,
      legendaryFusionTax
    } as IAppData;
  },
);

export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrice;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrice) {
      // go get marketPrice from app.state
      marketPrice = state.app.marketPrice;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error("Returned a null response from dispatch(loadMarketPrice)");
        return;
      }
    }
    return { marketPrice };
  },
);

interface IAppData {
  readonly loading: boolean;
  readonly loadingMarketPrice: boolean;
  readonly myNodeNumber?: string;
  readonly totalNodeNumer?: string;
  readonly availableRewards?: string;
  readonly lesserNodeCount?: string;
  readonly commonNodeCount?: string;
  readonly legendaryNodeCount?: string;
  readonly omegaNodeCount?: string;
  readonly lesserFusionCost?: string;
  readonly commonFusionCost?: string;
  readonly legendaryFusionCost?: string;
  readonly lesserFusionTax?: string;
  readonly commonFusionTax?: string;
  readonly legendaryFusionTax?: string;
  readonly nodes?: Array<{
    readonly createTime: string;
    readonly reward: string;
    readonly lastClaim: string;
    readonly name: string;
    readonly type: string;
    readonly info: string;
    readonly expireTime: string;
    readonly index: number;
  }>;
  readonly staking?: Array<{
    readonly balance: string;
    readonly createTime: string;
    readonly expireTime: string;
    readonly id: number;
  }>
}

const initialState: IAppData = {
  loading: false,
  loadingMarketPrice: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        setAll(state, {
          myNodeNumber: "0",
          totalNodeNumer: "0",
          availableRewards: "0",
          nodes: []
        });
        console.error(error.name, error.message, error.stack);
      })
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
