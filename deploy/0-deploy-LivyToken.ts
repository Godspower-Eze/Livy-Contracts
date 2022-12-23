import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const deployLivyToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;

  const { godspower } = await getNamedAccounts();

  const tx = await deploy("LivyToken", {
    from: godspower,
    log: true,
    waitConfirmations: 1,
  });
};

export default deployLivyToken;
deployLivyToken.tags = ["LivyToken"];
