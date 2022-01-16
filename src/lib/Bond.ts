import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

import { getTokenPrice } from "src/helpers";
import { addresses } from "src/constants";
import React from "react";

export enum NetworkID {
  Mainnet = 1,
  Testnet = 80001,
  LocalNet = 1987,
}

export enum BondType {
  StableAsset,
  LP,
}

export interface BondAddresses {
  reserveAddress: string;
  bondAddress: string;
}

export interface NetworkAddresses {
  [NetworkID.Mainnet]: BondAddresses;
  [NetworkID.Testnet]: BondAddresses;
  [NetworkID.LocalNet]: BondAddresses;
}

export interface Available {
  [NetworkID.Mainnet]?: boolean;
  [NetworkID.Testnet]?: boolean;
  [NetworkID.LocalNet]?: boolean;
}

interface BondOpts {
  name: string; // Internal name used for references
  BID: string;
  feoAddress: string;
  displayName: string; // Displayname on UI
  isAvailable: Available; // set false to hide
  bondIconSvg: React.ReactNode; //  SVG path for icons
  bondContractABI: ethers.ContractInterface; // ABI for contract
  networkAddrs: NetworkAddresses; // Mapping of network --> Addresses
  bondToken: string; // Unused, but native token to buy the bond.
}

// Keep all LP specific fields/logic within the LPBond class
export interface LPBondOpts extends BondOpts {
  reserveContract: ethers.ContractInterface;
  lpUrl: string;
}

// Generic BondClass we should be using everywhere
// Assumes the token being deposited follows the standard ERC20 spec
export interface StableBondOpts extends BondOpts {}

// These are special bonds that have different valuation methods