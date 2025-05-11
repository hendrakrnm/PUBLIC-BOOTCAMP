pragma solidity ^0.8.13;

contract Counter {
    address public owner;
    uint256 public price;
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

    constructor()
    {
        owner = msg.sender;
    }
    function setPrice(uint256 newPrice) public {
        require(msg.sender == owner, "Only the owner can set the price");
        price = newPrice;   
    }

}
