import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "hardhat";

const deploySuperLivyToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;

  const url = process.env.POLYGON_MUMBAI_URL;
  const httpProvider = new ethers.providers.JsonRpcProvider(url);
  const network = await httpProvider._networkPromise;

  // Setting up the out Framework object with Mumbai
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: httpProvider,
  });

  const { godspower } = await getNamedAccounts();

  const LivyToken = await get("LivyToken");

  const tx = await deploy("SuperLivyToken", {
    from: godspower,
    log: true,
    args: [sf.settings.config.hostAddress],
    waitConfirmations: 1,
    proxy: {
      owner: godspower,
      proxyContract: "OptimizedTransparentProxy",
      execute: {
        methodName: "initialize",
        args: [LivyToken.address, 18, "Super Livy Token", "SLT"],
      },
    },
  });
};

export default deploySuperLivyToken;
deploySuperLivyToken.tags = ["SuperLivyToken"];
