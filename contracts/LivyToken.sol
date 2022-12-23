// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LivyToken is ERC20 {

    constructor() ERC20("Livy Token", "LT"){
        _mint(msg.sender, 1000000000000000000 * 10 ** decimals());
    }
}