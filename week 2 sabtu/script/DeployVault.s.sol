// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockUSDC.sol";
import "../src/Vault.sol";

contract DeployVault is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy MockUSDC dulu jika belum ada
        MockUSDC usdc = new MockUSDC();

        // Deploy Vault dengan alamat USDC
        Vault vault = new Vault(address(usdc));

        vm.stopBroadcast();
    }
}
