function depositToContract(contract, from, value, loadBlockchainData) {
  contract.methods
    .depositToContract()
    .send({ from, value })
    .once("receipt", (receipt) => {
      // Logging for now, will change
      console.log(receipt);
      // loadBlockchainData();
    });
}

function addOwner(contract, from, newOwner, loadBlockchainData) {
  contract.methods
    .addOwner(newOwner)
    .send({ from })
    .once("receipt", (receipt) => {
      // Logging for now, will change
      console.log(receipt);
      // loadBlockchainData();
    });
}

function deleteOwner(contract, from, index, loadBlockchainData) {
  contract.methods
    .deleteOwner(index)
    .send({ from })
    .once("receipt", (receipt) => {
      // Logging for now, will change
      console.log(receipt);
      // loadBlockchainData();
    });
}

function requestTransfer(contract, from, to, value, loadBlockchainData) {
  contract.methods
    .requestTransfer(to, value)
    .send({ from })
    .once("receipt", (receipt) => {
      // Logging for now, will change
      console.log(receipt);
      // loadBlockchainData();
    });
}

function approveRequest(contract, from, id, approved, loadBlockchainData) {
  contract.methods
    .approveRequest(id, approved)
    .send({ from })
    .once("receipt", (receipt) => {
      // Logging for now, will change
      console.log(receipt);
      // loadBlockchainData();
    });
}

export const contractMethods = {
  depositToContract,
  addOwner,
  deleteOwner,
  requestTransfer,
  approveRequest,
};
