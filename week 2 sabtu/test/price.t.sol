
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {Price} from "../src/Price.sol";

contract PriceTest is Test {
    Price public price;

    function setUp() public {
        vm.createSelectFork("https://arb-mainnet.g.alchemy.com/v2/4cdCiARdC7hL9_Nf5ed8F0C2ObiUxKKL", 335093227);
        price = new Price();
    }
    function getPrice() public {
        uint256 price = price.getPrice();
        console.log("price:", price);
    }
}
