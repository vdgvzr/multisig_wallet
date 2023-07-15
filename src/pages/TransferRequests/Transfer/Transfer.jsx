import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { RootContext } from "../../../layouts/RootLayout";
import CustomButton from "../../../components/content/CustomButton/CustomButton";

function Transfer() {
  const { transferId } = useLoaderData();
  const {
    transferRequests,
    signaturesRequired,
    account,
    approvals,
    approveRequest,
  } = useContext(RootContext);

  const id = transferRequests[transferId].id.toString();
  const recipient = transferRequests[transferId].recipient.toString();
  const amount = window.web3.utils.fromWei(
    transferRequests[transferId].amount.toString(),
    "ether"
  );
  const approvalCount = transferRequests[transferId].approvalCount.toString();

  return (
    <>
      <h1>Transfer</h1>
      <p>{id}</p>
      <p>{recipient}</p>
      <p>{amount} ETH</p>
      <p>{approvalCount}</p>
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
    </>
  );
}

async function loader({ params }) {
  return { transferId: await params.transferId };
}

export const transferRoute = {
  loader,
  element: <Transfer />,
};
