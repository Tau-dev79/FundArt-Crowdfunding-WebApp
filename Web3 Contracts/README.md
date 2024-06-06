# Contracts for the Crowdfunding Web App

Welcome to our crowdfunding web application repository! This application allows users to create and participate in crowdfunding campaigns for various projects. The smart contracts powering this application are deployed on ThirdWeb.

## Getting Started

To get started with the project, follow these steps:

1. Download this folder in your local machine.
2. Navigate to the project directory:
```
cd Web3 Contracts
```

3. Install the required Node.js modules using npm:
```
npm install
```

4. Navigate to the `.env` file and enter the private key of your wallet.
5. Sign up for an account on ThirdWeb at [ThirdWeb](https://thirdweb.io/).
   
Once you have your account set up and your private key added to the `.env` file, you are ready to deploy or build your contracts on the thirdweb.

## Building the project

After any changes to the contract, run:

```bash
npm run build
# or
yarn build
```

to compile your contracts. This will also detect the [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) detected on your contract.

## Deploying Contracts

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
npm run deploy
# or
yarn deploy
```

