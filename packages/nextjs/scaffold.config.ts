import * as chains from "wagmi/chains";

export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  web3AuthClientId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
  googleOAuthClientId: string;
  web3AuthVerifier: string;
};

const scaffoldConfig = {
  // The network where your DApp lives in
  targetNetwork: chains.hardhat,

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect on the local network
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // This is our Web3Auth Client ID.
  // You can get your own at https://dashboard.web3auth.io/home/web3auth
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  web3AuthClientId:
    process.env.NEXT_WEB3AUTH_CLIENT_ID ||
    "BG7vMGIhzy7whDXXJPZ-JHme9haJ3PmV1-wl9SJPGGs9Cjk5_8m682DJ-lTDmwBWJe-bEHYE_t9gw0cdboLEwR8",

  web3AuthVerifier: process.env.NEXT_VERIFIER || "web3auth-core-google",

  // This is our Google OAuth Client ID.
  // Obtain the OAuth Client ID from your App on the Google Developer dashboard: https://console.cloud.google.com/
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.

  googleOAuthClientId:
    process.env.NEXT_GOOGLE_OAUTH_CLIENT_ID ||
    "774338308167-q463s7kpvja16l4l0kko3nb925ikds2p.apps.googleusercontent.com",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
} satisfies ScaffoldConfig;

export default scaffoldConfig;
