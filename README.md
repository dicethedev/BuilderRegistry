# 🏗 BuilderRegistry V1

The 🏗 BuilderRegistry is a platform for overseeing Ethereum communities and their outreach initiatives. Its objective is to provide a means to accurately quantify the number of builders within remote communities worldwide. Additionally, it facilitates implementing a bounty system, enabling protocols to create bounties to engage these smaller communities effectively.

<img width="400" alt="Screenshot 2024-03-22 at 11 10 10 AM" src="https://github.com/ethereumAbuja/BuilderRegistry/assets/47566579/b6d5fb14-47c1-4e7b-97f9-725caf68fa52">
<img width="400" alt="Screenshot 2024-03-22 at 11 10 14 AM" src="https://github.com/ethereumAbuja/BuilderRegistry/assets/47566579/8d6a5046-2289-4745-befe-2d201cc2c35d">
<img width="400" alt="Screenshot 2024-03-22 at 11 10 17 AM" src="https://github.com/ethereumAbuja/BuilderRegistry/assets/47566579/7855ed68-52a3-47b1-9cb7-a0357b52df42">
<img width="400" alt="Screenshot 2024-03-22 at 11 11 03 AM" src="https://github.com/ethereumAbuja/BuilderRegistry/assets/47566579/2432cbf9-421e-4328-9bc8-feb8b2a85ad1">

## Prerequisites

[Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/).

The Next.js package within this monorepo, alongside Hardhat, includes an `env.example` file. Specifically, the `env.example` file located within `packages/next` is the only one that needs to be configured. Simply copy it to `packages/next/.env`, as the rest function without requiring any additional setup.

### Connecting to Local Firebase Instance with Next.js

To connect to a **local** Firebase instance in your Next.js project, follow these steps:

1. **Install Firebase CLI:**
   - Ensure you have the [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) installed on your local machine.

2. **Configure Firebase Environment Variables:**
   - Set `FIRESTORE_EMULATOR_HOST=localhost:8080` in `packages/nextjs/.env` to configure your Next.js application to connect to the local Firebase instance.
     
3. **Seed Local Firebase Data:**
   - Seed Data are stored in JSON  `packages/nextjs/local_database/` 
   - Their schema is stored in `packages/nextjs/service/db/` for each data type. Customize  the schaema according to your needs.
   - If required, you can clean up the data in the Firestore UI and re-import by stopping and running `yarn start` again.
     
 
## Project setup

1. Install dependencies:

```bash

yarn install

```

2. (Optional) Start the firebase emulators (vs set up a live Firebase instance)
```bash
# You might need to add a real "--project <projectName>" (run firebase projects:list)
firebase emulators:start

```

3. Create your `.env` file inside `packages/foundry`:

```
(echo "DEPLOYER_PRIVATE_KEY=";  echo "ALCHEMY_API_KEY=oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"; echo "ETHERSCAN_API_KEY=DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW") >> packages/foundry/.env
```

4. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Anvil in Foundry. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `foundry.toml`

5. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/src` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script/Deploy.s.sol` to deploy the contract to the network. You can also customize the deploy script.

6. On a third terminal, start your NextJS app:

```
yarn start
```

Run smart contract test with `yarn foundry:test`

At this point, the APP should be available at <http://localhost:3000>.


## Deploying your Smart Contracts to a Live Network

Once you are ready to deploy your smart contracts, there are a few things you need to adjust.

1. Select the network

By default, `yarn deploy` will deploy the contract to the local network. You can change the defaultNetwork in `packages/foundry/foundry.toml`

2. Generate a new account or add one to deploy the contract(s) from . Additionally you will need to add your Alchemy API key. Rename `.env.example` to `.env` and fill the required keys.

```
ALCHEMY_API_KEY="",
DEPLOYER_PRIVATE_KEY=""
```

You can generate a random account / private key with `yarn generate` or add the private key of your crypto wallet. `yarn generate` will create a random account and add the `DEPLOYER_PRIVATE_KEY` to the `.env` file. You can check the generated account with `yarn account`.

3. Deploy your smart contract(s)

```
yarn deploy --network network_name
```

4. Deploy and verify your smart contract(s)
```
yarn deploy:verify --network network_name
```

## Deploying your NextJS App

If you want to connect to your **live** firebase instance:
 - Download the `serviceAccountKey.json` file from the Firebase UI
 - Comment out the `FIRESTORE_EMULATOR_HOST` env var.
 - Set `GOOGLE_APPLICATION_CREDENTIALS` to the correct path to your `serviceAccountKey.json`

**Hint**: We recommend connecting your GitHub repo to Vercel (through the Vercel UI) so it gets automatically deployed when pushing to `main`.

If you want to deploy directly from the CLI, run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.


