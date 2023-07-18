import { useContext } from "react";
import TransferRequestForm from "../../components/forms/TransferRequestForm/TransferRequestForm";
import { RootContext } from "../../layouts/RootLayout/RootLayout";
import Address from "../../components/content/components/Address/Address";

export default function TransferRequests() {
  const { account, requestTransfer, transferRequests, signaturesRequired } =
    useContext(RootContext);

  return (
    <>
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
              <a href={`/transfer-requests/${id}`}>
                transfer no: {id} - recipient: <Address address={recipient} /> -
                amount: {amount} ETH - approvals: {approvalCount}{" "}
                {approvalCount >= signaturesRequired ? (
                  <p className="text-success">Transfer Complete</p>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
