import { ethers, BigNumber } from "ethers";
import { addresses } from "../constants";
// import { abi as MDAOStakingABI } from "../abi/MDAOStaking.json";
// import { abi as StakingHelperABI } from "../abi/StakingHelper.json";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { error, info } from "../slices/MessagesSlice";
import { IActionValueAsyncThunk, IBaseAddressAsyncThunk, IClaimAsyncThunk } from "./interfaces";
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

export const fusionNodeAsync = createAsyncThunk(
  "fusion/fusionNode",
  async ({ provider, address, networkID, nodeName, nodeType }: IActionValueAsyncThunk, { dispatch }) => {
    const signer = provider.getSigner();

    const pentContract = new ethers.Contract(addresses[networkID].PENT_ADDRESS, PENTABI, signer);

    try {
      let tx = await pentContract.fusionNode(ethers.utils.formatUnits(nodeType, 'wei'), nodeName);
      await tx.wait();
    } finally {
      dispatch(loadAppDetails({networkID, provider, address}));
    }
  },
);