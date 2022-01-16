import { ethers, BigNumber } from "ethers";
import { addresses } from "../constants";
// import { abi as MDAOStakingABI } from "../abi/MDAOStaking.json";
// import { abi as StakingHelperABI } from "../abi/StakingHelper.json";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { error, info } from "../slices/MessagesSlice";
import { IActionValueAsyncThunk, IBaseAddressAsyncThunk, IClaimAsyncThunk, IStakeActionValueAsyncThunk, IWithdrawAsyncThunk } from "./interfaces";
import { segmentUA } from "../helpers/userAnalyticHelpers";
import { loadAppDetails } from "./AppSlice";
import { abi as PENTABI } from "src/abi/PENT.json";

// import { abi as PENTABI } from "src/abi/PENT.json";

interface IUAData {
  address: string;
  value: string;
  approved: boolean;
  txHash: string | null;
  type: string | null;
}

export const createNodeAsync = createAsyncThunk(
  "stake/changeStake",
  async ({ provider, address, networkID, nodeName, nodeType }: IActionValueAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.createNodeWithTokens(nodeName, nodeType);
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);

export const createNodeStakeAsync = createAsyncThunk(
  "stake/changeStake",
  async ({ provider, address, networkID, nodeName, stakeDays, nodeType }: IStakeActionValueAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.createNodeWithStakePosition(nodeName, stakeDays, nodeType);
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);

export const claimAllRewardAsync = createAsyncThunk(
  "stake/changeStake",
  async ({ provider, address, networkID }: IBaseAddressAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.cashoutAll();
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);

export const claimRewardAsync = createAsyncThunk(
  "stake/changeStake",
  async ({ provider, address, networkID, index }: IClaimAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.cashoutReward(index.toString());
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);

export const withdrawStakeAsync = createAsyncThunk(
  "stake/changeStake",
  async ({ provider, networkID, id, address }: IWithdrawAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.withdrawStakingPosition(id);
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);
