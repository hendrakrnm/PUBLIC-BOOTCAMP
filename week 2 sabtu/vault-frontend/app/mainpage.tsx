import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite, usePrepareContractWrite, useBalance } from "wagmi";
import { useState } from "react";

const VaultABI = [
  // Masukkan ABI contract Vault kamu di sini
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];

export default function MainPage() {
  const { isConnected, address } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>("0");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  
  // Menghubungkan dengan smart contract Vault
  const contractAddress = "0x4cEA9cEc9A6a429458393d0Deee36f9356D44756"; // Ganti dengan address Vault kamu
  const { config: depositConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: VaultABI,
    functionName: "deposit",
    args: [depositAmount],
  });
  
  const { config: withdrawConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: VaultABI,
    functionName: "withdraw",
    args: [withdrawAmount],
  });

  const { write: deposit } = useContractWrite(depositConfig);
  const { write: withdraw } = useContractWrite(withdrawConfig);

  const { data: balanceData } = useBalance({
    address,
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ConnectButton />
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h2>Vault dApp</h2>
        <div>
          <p>Balance: {balanceData?.formatted} {balanceData?.symbol}</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Deposit Amount"
            className="border p-2"
          />
          <button onClick={() => deposit?.()} disabled={!depositAmount || !isConnected} className="bg-blue-500 text-white p-2 rounded">
            Deposit
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Withdraw Amount"
            className="border p-2"
          />
          <button onClick={() => withdraw?.()} disabled={!withdrawAmount || !isConnected} className="bg-red-500 text-white p-2 rounded">
            Withdraw
          </button>
        </div>
      </main>
    </div>
  );
}
