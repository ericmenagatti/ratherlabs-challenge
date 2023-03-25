import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useState, useEffect } from 'react';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 5, 42, 56, 97, 137] });

export enum EChainIds {
  GOERLI_TESTNET = 5,
};

export enum ESupportedNetworks {
  GOERLI = 'goerli',
}

interface IWalletConnected {
  value: number;
  message: string;
}

export interface ISupportedChains {
  chainId: EChainIds;
  chainHex: string;
  chainName: string;
  rpcUrl: string;
  symbol: string;
  explorer: string;
  value: ESupportedNetworks;
  decimals: number;
  iconSrc: string;
}

export const walletStatus: IWalletConnected[] = [
  {
    value: -1,
    message: 'Wallet is not connected'
  },
  {
    value: 0,
    message: 'Wallet is on a different network'
  },
  {
    value: 1,
    message: 'Wallet is connected'
  }
]

export const supportedChains: ISupportedChains[] = [
  {
    chainId: EChainIds.GOERLI_TESTNET,
    chainHex: `0x${EChainIds.GOERLI_TESTNET.toString(16)}`,
    chainName: 'Goerli',
    rpcUrl: "https://rpc.ankr.com/eth_goerli",
    symbol: 'ETH',
    explorer: "https://goerli.etherscan.io/",
    value: ESupportedNetworks.GOERLI,
    decimals: 18,
    iconSrc: '/favicon.ico',
  }
];

/**
 * 
 * @param expectedChainId 
 * @returns -1 Wallet is not connected
 * @returns 0 Wallet is on a different network
 * @returns 1 Wallet is connected
 */
export const useWalletConnected = (expectedChainId = 5): number => {
  const { account, chainId } = useWeb3React();

  const correctNetwork = chainId === expectedChainId;

  if (!account) {
    return -1;
  }
  if (account && correctNetwork) {
    return 1;
  }
  return 0;
};

export const connectMetamask = async (activate: Function, onConnected?: Function, onError?: Function) => {
  try {
    await activate(injected, onError);
    onConnected?.();
  } catch (error) {
    onError?.(error);
  }
}

export const addNetwork = async (chain: ISupportedChains = supportedChains[0], onAdded?: Function, onError?: Function) => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chain.chainHex,
          chainName: chain.chainName,
          rpcUrls: [chain.rpcUrl],
          blockExplorerUrls: [chain.explorer],
          nativeCurrency: {
            symbol: chain.symbol,
            decimals: chain.decimals,
          },
        },
      ],
    });
    onAdded?.();
  } catch (error) {
    console.log(error);
    onError?.(error);
  }
}

export const changeNetwork = async (chain: ISupportedChains, onChanged?: Function, onError?: Function) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.chainHex }],
    });
    onChanged?.();
  } catch (error) {
    console.error(error);
    onError?.(error);
  }
}

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch((error) => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}