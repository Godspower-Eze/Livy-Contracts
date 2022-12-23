// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

import { SuperToken } from "@superfluid-finance/ethereum-contracts/contracts/superfluid/SuperToken.sol";
import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract SuperLivyToken is SuperToken {
    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;

    constructor (ISuperfluid _host) SuperToken(_host){}

    function mint(uint256 amount) external {
        _mint(msg.sender, msg.sender, amount, false /* requireReceptionAck */, new bytes(0), new bytes(0));
    }
}