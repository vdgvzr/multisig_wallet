// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.5.0 <0.9.0;
// pragma experimental ABIEncoderV2;

import "./Owner.sol";

/**
 * @title MultisigWallet
 * @dev Shaun Lindsley
 */
contract MultisigWallet is Owner {
    uint256 public addressLimit;
    uint public signaturesRequired;
    uint public contractBalance = 0;

    struct Transfer {
        uint id;
        address payable recipient;
        uint amount;
        uint approvalCount;
    }

    Transfer[] transferRequests;
    mapping(address => mapping(uint => bool)) approvals;

    constructor() public {
        // owners[] defaults to containing msg.sender
        owners.push(msg.sender);
        //  Address limit defaults to 3
        addressLimit = 3;
        // Signatures required defaults to 2
        signaturesRequired = 2;
    }

    // Events
    event addOwnerComplete(address owner, string message);
    event tooManyOwners(string message);
    event depositComplete(uint amount, address indexed depositedTo);
    event transferRequestComplete(address to, uint amount, string message);
    event requestApproved(uint transferId, bool approved);
    event moreSignaturesRequired(string message);
    event transferComplete(address indexed from, address indexed to, uint amount);

    // Add owner function
    function addOwner(address newOwner) public isOwner {
        if (owners.length <= addressLimit) {
            owners.push(newOwner); 
            emit addOwnerComplete(newOwner, "Successfully added owner"); 
        } else {
            emit tooManyOwners("Limit of owners has been reached");
        }
    }

    // Deposit to contract function
    function depositToContract() public payable {
        contractBalance += msg.value;
        emit depositComplete(msg.value, address(this));
    }

    // Request transfer function
    function requestTransfer(address payable recipient, uint amount) public onlyOwners {
        transferRequests.push(Transfer(transferRequests.length, recipient, amount, 0));
        emit transferRequestComplete(recipient, amount, "Transfer request successful");
    }

    // Approve request function
    function approveRequest(uint transferId, bool approved) public onlyOwners {
        approvals[msg.sender][transferId] = approved;
        transferRequests[transferId].approvalCount++;

        if (transferRequests[transferId].approvalCount >= signaturesRequired) {
            emit requestApproved(transferId, approved);
            _transfer(transferRequests[transferId].recipient, transferRequests[transferId].amount);
        } else {
            emit moreSignaturesRequired("More signatures required");
        }
    }

    // Transfer function
    function _transfer(address payable recipient, uint amount) private {
        require(address(this).balance >= amount, "Insufficient balance");
        contractBalance -= amount;
        uint previousContractBalance = address(this).balance;
        recipient.transfer(amount);
        emit transferComplete(address(this), recipient, amount);
        assert(address(this).balance == previousContractBalance - amount);
    }

    function getAddressLimit() external view returns (uint) {
        return addressLimit;
    }
}