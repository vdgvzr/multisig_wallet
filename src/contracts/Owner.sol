// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.5.0 <0.9.0;

/**
 * @title Owner
 * @dev Shaun Lindsley
 */
contract Owner {

    address private owner;
    address[] public owners;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    // modifier to check if caller is owner
    modifier onlyOwners() {
        bool contractOwner = false;
        for (uint256 i = 1; i<owners.length; i++) {
            if (owners[i] == msg.sender) {
                contractOwner = true;
            }
        }
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor() public {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
} 