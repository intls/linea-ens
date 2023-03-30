import { ethers } from "hardhat";

async function main() {
  // Deploy Linea Resolver to L2
  const LineaResolver = await ethers.getContractFactory("LineaResolver");
  const lineaResolver = await LineaResolver.deploy();
  await lineaResolver.deployed();
  console.log(
    `LineaResolver deployed to, L2_RESOLVER_ADDRESS: ${lineaResolver.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
