import { Wallet } from "@rainbow-me/rainbowkit";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";

const { web3AuthClientId, googleOAuthClientId, web3AuthVerifier } = scaffoldConfig;

export interface WalletOptions {
  chains: Chain[];
}

export let web3AuthInstance: Web3AuthNoModal | null;

const googleWalletIconBase64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMS4zNTk5IDE2LjM2NEMzMS4zNTk5IDE1LjIyOTUgMzEuMjU4MSAxNC4xMzg2IDMxLjA2OSAxMy4wOTEzSDE2VjE5LjI4MDRIMjQuNjEwOEMyNC4yMzk5IDIxLjI4MDQgMjMuMTEyNyAyMi45NzQ5IDIxLjQxODEgMjQuMTA5NFYyOC4xMjRIMjYuNTg5QzI5LjYxNDQgMjUuMzM4NSAzMS4zNTk5IDIxLjIzNjcgMzEuMzU5OSAxNi4zNjRaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDAxMiAzMS45OTk1QzIwLjMyMTIgMzEuOTk5NSAyMy45NDMgMzAuNTY2OCAyNi41OTAyIDI4LjEyMzJMMjEuNDE5NCAyNC4xMDg3QzE5Ljk4NjYgMjUuMDY4NyAxOC4xNTM5IDI1LjYzNTkgMTYuMDAxMiAyNS42MzU5QzExLjgzNCAyNS42MzU5IDguMzA2NzEgMjIuODIxNCA3LjA0ODU0IDE5LjAzOTZIMS43MDMxMlYyMy4xODVDNC4zMzU4MyAyOC40MTQxIDkuNzQ2NzEgMzEuOTk5NSAxNi4wMDEyIDMxLjk5OTVaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNy4wNDcyMiAxOS4wMzk5QzYuNzI3MjMgMTguMDc5OSA2LjU0NTQxIDE3LjA1NDQgNi41NDU0MSAxNS45OTk5QzYuNTQ1NDEgMTQuOTQ1MyA2LjcyNzIzIDEzLjkxOTkgNy4wNDcyMiAxMi45NTk5VjguODE0NDhIMS43MDE4MUMwLjYxODE3NyAxMC45NzQ1IDAgMTMuNDE4MSAwIDE1Ljk5OTlDMCAxOC41ODE3IDAuNjE4MTc3IDIxLjAyNTMgMS43MDE4MSAyMy4xODUzTDcuMDQ3MjIgMTkuMDM5OVoiIGZpbGw9IiNGQkJDMDUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4wMDEyIDYuMzYzNTlDMTguMzUwMyA2LjM2MzU5IDIwLjQ1OTQgNy4xNzA4NiAyMi4xMTc1IDguNzU2M0wyNi43MDY2IDQuMTY3MjRDMjMuOTM1NyAxLjU4NTQ0IDIwLjMxMzkgMCAxNi4wMDEyIDBDOS43NDY3IDAgNC4zMzU4MyAzLjU4NTQzIDEuNzAzMTIgOC44MTQ0OEw3LjA0ODU0IDEyLjk1OTlDOC4zMDY3MSA5LjE3ODEyIDExLjgzNCA2LjM2MzU5IDE2LjAwMTIgNi4zNjM1OVoiIGZpbGw9IiNFQTQzMzUiLz4KPC9zdmc+Cg==";
/**
 * Wagmi config for burner wallet
 * @param param0
 * @returns
 */

const id = "google-wallet";
const name = "Google Wallet";

export const googleWalletConfig = ({ chains }: WalletOptions): Wallet => {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
  };

  web3AuthInstance = new Web3AuthNoModal({
    clientId: web3AuthClientId,
    web3AuthNetwork: "testnet",
    chainConfig,
  });
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      clientId: web3AuthClientId, //Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      uxMode: "popup",
      loginConfig: {
        google: {
          name: "Google Login",
          verifier: web3AuthVerifier,
          typeOfLogin: "google",
          clientId: googleOAuthClientId,
        },
      },
    },
    privateKeyProvider,
  });

  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  return {
    id,
    name,
    iconUrl: googleWalletIconBase64,
    iconBackground: "#ffffff",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains,
        options: {
          web3AuthInstance,
          loginParams: {
            loginProvider: "google",
          },
        },
      });
      return {
        connector,
      };
    },
  };
};
