// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.5.0 <0.9.0;

contract Owner {
    address private owner;
    address[] public owners;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    modifier onlyOwners() {
        bool contractOwner = false;
        for (uint256 i = 1; i<owners.length; i++) {
            if (owners[i] == msg.sender) {
                contractOwner = true;
            }
        }
        _;
    }

    constructor() public {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getOwners() external view returns (address[] memory) {
        return owners;
    }
} 