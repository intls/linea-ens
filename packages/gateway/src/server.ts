import { Server } from "@chainlink/ccip-read-server";
import { EVMGateway } from "./evm-gateway";
import { ethers } from "ethers";
import { L2ProofService } from "./L2ProofService";
import "dotenv/config";

const l1ProviderUrl = process.env.L1_PROVIDER_URL;
const l2ProviderUrl = process.env.L2_PROVIDER_URL;
const l2ChainId = parseInt(process.env.L2_CHAIN_ID);
const rollupAddress = process.env.L1_ROLLUP_ADDRESS;
const port = process.env.PORT || 3000;

const providerL1 = new ethers.JsonRpcProvider(l1ProviderUrl);
const providerL2 = new ethers.JsonRpcProvider(l2ProviderUrl, l2ChainId, {
  staticNetwork: true,
});

const gateway = new EVMGateway(
  new L2ProofService(providerL1, providerL2, rollupAddress)
);

const server = new Server();
gateway.add(server);
const app = server.makeApp("/");

(async () => {
  app.listen(port, function () {
    console.log(`Listening on ${port}`);
  });
})();
