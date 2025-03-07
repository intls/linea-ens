import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const args: any[] = [];

  switch (network.name) {
    case "sepolia":
      args.push(
        ["https://linea-ccip-gateway.sepolia.linea.build/{sender}/{data}.json"],
        "0xB218f8A4Bc926cF1cA7b3423c154a0D627Bdb7E5"
      );
      break;
    case "mainnet":
      args.push(
        ["https://linea-ccip-gateway.linea.build/{sender}/{data}.json"],
        "0xd19d4B5d358258f05D7B411E21A1460D11B0876F"
      );
      break;
    default:
      console.log(`Network ${network.name} not supported`);
      return;
  }

  const sparseMerkleProof = await get("SparseMerkleProof");

  const lineaSparseProofVerifier = await deploy("LineaSparseProofVerifier", {
    from: deployer,
    libraries: {
      SparseMerkleProof: sparseMerkleProof.address,
    },
    args,
    log: true,
  });
  console.log(
    `Deployed LineaSparseProofVerifier to ${lineaSparseProofVerifier.address}`
  );
};

func.tags = ["lineaSparseProofVerifier"];
func.dependencies = ["sparseMerkleProof"];

export default func;
