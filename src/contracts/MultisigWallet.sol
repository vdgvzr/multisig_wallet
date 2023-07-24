// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Owner.sol";
import "./utils/safemath.sol";

contract MultisigWallet is Owner {
    using SafeMath for uint;

    uint256 public addressLimit;
    uint public signaturesRequired;
    uint public contractBalance = 0;

    struct Transfer {
        uint id;
        address payable recipient;
        uint amount;
        uint approvalCount;
    }

    Transfer[] public transferRequests;
    mapping(address => mapping(uint => bool)) public approvals;

    constructor() {
        // owners[] defaults to containing msg.sender
        owners.push(msg.sender);
        //  Address limit defaults to 3
        addressLimit = 3;
        // Signatures required defaults to 2
        signaturesRequired = 2;
    }

    // Events
    event addOwnerComplete(address owner);
    event deleteOwnerComplete();
    event depositComplete(uint amount, address indexed depositedTo);
    event transferRequestComplete(address to, uint amount);
    event requestApproved(uint transferId);
    event transferComplete(address indexed from, address indexed to, uint amount);

    // Add owner function
    function addOwner(address newOwner) public isOwner {
        require(owners.length < addressLimit, "Limit of owners has been reached");
        for (uint256 i=0; i<owners.length; i++) {
            require(owners[i] != newOwner, "Owner already exists");
        }
        owners.push(newOwner); 
        emit addOwnerComplete(newOwner); 
    }

    // Delete owner
    function deleteOwner(uint index) public {
        if (index >= owners.length) return;
        for (uint i = index; i<owners.length-1; i++){
            owners[i] = owners[i+1];
        }
        owners.pop();
        emit deleteOwnerComplete(); 
    }

    // Deposit to contract function
    function depositToContract() public payable {
        contractBalance += msg.value;
        emit depositComplete(msg.value, address(this));
    }

    // Request transfer function
    function requestTransfer(address payable recipient, uint amount) public onlyOwners {
        transferRequests.push(Transfer(transferRequests.length, recipient, amount, 0));
        emit transferRequestComplete(recipient, amount);
    }

    // Approve request function
    function approveRequest(uint transferId, bool approved) public onlyOwners {
        require(approvals[msg.sender][transferId] != true, "Can't approve same transaction twice");
        approvals[msg.sender][transferId] = approved;
        transferRequests[transferId].approvalCount++;
        emit requestApproved(transferId);

        if (transferRequests[transferId].approvalCount >= signaturesRequired) {
            _transfer(transferRequests[transferId].recipient, transferRequests[transferId].amount);
        }
    }

    // Transfer function
    function _transfer(address payable recipient, uint amount) private returns(bool) {
        require(address(this).balance >= amount, "Insufficient balance");
        contractBalance -= amount;
        uint previousContractBalance = address(this).balance;
        (bool success,) = recipient.call{value: amount}("");
        emit transferComplete(address(this), recipient, amount);
        assert(address(this).balance == previousContractBalance - amount);
        return success;
    }

    function getTransferRequests() public view returns(Transfer[] memory) {
        return transferRequests;
    }

    function getApproval(address account,uint transferId) public view returns(bool) {
        return approvals[account][transferId];
    }
}