import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../layouts/RootLayout";
import DepositToContractForm from "../components/forms/depositToContractForm/DepositToContractForm";
import AddOwnerForm from "../components/forms/AddOwnerForm/AddOwnerForm";
import CustomButton from "../components/content/CustomButton/CustomButton";
import TransferRequestForm from "../components/forms/TransferRequestForm/TransferRequestForm";

export default function Home({ name }) {
  const {
    account,
    isOwner,
    balance,
    owner,
    owners,
    addressLimit,
    signaturesRequired,
    contract,
    depositToContract,
    addOwner,
    transferRequests,
    deleteOwner,
    requestTransfer,
    approveRequest,
  } = useContext(RootContext);

  const [address, setAddress] = useState("Contract not lodaded");

  useEffect(() => {
    setAddress(contract._address);
  }, [contract._address, contract._methods]);

  return (
    <>
      <h1>{name}</h1>
      <div>
        <p>Contract address: {address}</p>
        <p>Contract Owner: {owner}</p>
        <p>Contract balance: {balance} ETH</p>
        <p>Address Limit: {addressLimit}</p>
        <p>Signatures Required: {signaturesRequired}</p>
        <div>
          <p>Owners:</p>
          <ul>
            {owners.map((owner, index) => {
              return (
                <li
                  className={account === owner ? "text-success my-2" : " my-2"}
                  key={index}
                >
                  <span>{owner}</span>
                  {isOwner && owner !== account ? (
                    <CustomButton
                      text="Remove Owner"
                      classes="ms-2"
                      action={() => {
                        deleteOwner(account, index);
                      }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <DepositToContractForm
          account={account}
          depositToContract={depositToContract}
        />
        {isOwner && owners.length <= addressLimit ? (
          <AddOwnerForm account={account} addOwner={addOwner} />
        ) : null}
        <TransferRequestForm
          account={account}
          requestTransfer={requestTransfer}
        />
        <ul>
          {transferRequests.map((transfer) => {
            const id = transfer.id.toString();
            const recipient = transfer.recipient.toString();
            const amount = window.web3.utils.fromWei(
              transfer.amount.toString(),
              "ether"
            );
            const approvalCount = transfer.approvalCount.toString();

            return (
              <li className="my-2" key={id}>
                transfer no: {id} - recipient: {recipient} - amount: {amount}{" "}
                ETH - approvals: {approvalCount}{" "}
                {approvalCount < signaturesRequired ? (
                  account != recipient ? (
                    <CustomButton
                      text="Approve"
                      classes="ms-2"
                      action={() => {
                        approveRequest(account, id, true);
                      }}
                    />
                  ) : null
                ) : (
                  <p className="text-success">Transfer Complete</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
