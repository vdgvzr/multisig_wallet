const MultisigWallet = artifacts.require("./MultisigWallet.sol");

contract("MultisigWallet", (accounts) => {
  let multisigWallet;

  before(async () => {
    multisigWallet = await MultisigWallet.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await multisigWallet.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("deployer is first owner", async () => {
      const deployer = await multisigWallet.constructor.class_defaults.from;
      const owner = await multisigWallet.owners(0);
      assert.equal(deployer, owner);
    });
  });
});
