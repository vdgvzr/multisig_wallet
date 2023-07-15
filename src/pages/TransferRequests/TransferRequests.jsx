import { useContext } from "react";
import TransferRequestForm from "../../components/forms/TransferRequestForm/TransferRequestForm";
import { RootContext } from "../../layouts/RootLayout";
import CustomButton from "../../components/content/CustomButton/CustomButton";

export default function TransferRequests() {
  const {
    account,
    requestTransfer,
    transferRequests,
    signaturesRequired,
    approvals,
    approveRequest,
  } = useContext(RootContext);

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
                transfer no: {id} - recipient: {recipient} - amount: {amount}{" "}
                ETH - approvals: {approvalCount}{" "}
                {approvalCount < signaturesRequired ? (
                  account != recipient ? (
                    approvals[id].toString() !== "true" ? (
                      <CustomButton
                        text="Approve"
                        classes="ms-2"
                        action={() => {
                          approveRequest(account, id, true);
                        }}
                      />
                    ) : null
                  ) : null
                ) : (
                  <p className="text-success">Transfer Complete</p>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
