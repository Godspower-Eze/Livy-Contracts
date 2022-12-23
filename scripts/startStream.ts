import { ethers } from "hardhat";
import { Framework } from "@superfluid-finance/sdk-core";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.POLYGON_MUMBAI_URL
  );

  const sf = await Framework.create({
    chainId: (await provider.getNetwork()).chainId,
    provider: provider,
  });

  const signers = await ethers.getSigners();

  const godspower = signers[0];

  const LivySuperToken = await sf.loadSuperToken(
    "0xd78F8d01516086676ae7Bf3dA0375C2CaC7ff550"
  );

  const createFlowOperation = sf.cfaV1.createFlow({
    sender: godspower.address,
    receiver: "0x1d19ef8FC94D8aF1EC921Fd0B4978831D147EBf8",
    flowRate: "385802469135802",
    superToken: LivySuperToken.address,
  });

  const result = await createFlowOperation.exec(godspower);
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
