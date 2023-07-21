function formatAddress(address) {
  return (
    address &&
    address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length)
  );
}

function formatBigNumber(bigNumber) {
  const newAmount = window.web3.utils.toNumber(bigNumber);
  return window.web3.utils.fromWei(newAmount, "ether");
}

export const utils = {
  formatAddress,
  formatBigNumber,
};
