import { useContext } from "react";
import { Table } from "react-bootstrap";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";

export default function TransferTable() {
  const { transferRequests, signaturesRequired } = useContext(RootContext);

  return (
    <>
      <Table striped bordered hover className="transfer-table">
        <thead className="transfer-table__head">
          <tr>
            <th>Transfer ID</th>
            <th>Amount</th>
            <th>To</th>
            <th>Approvals</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody className="transfer-table__body">
          {transferRequests.map((transfer) => {
            const id = transfer.id.toString();
            const recipient = transfer.recipient.toString();
            const amount = window.web3.utils.fromWei(
              transfer.amount.toString(),
              "ether"
            );
            const approvalCount = transfer.approvalCount.toString();

            return (
              <tr
                onClick={() => {
                  document.location = `/transfer-requests/${id}`;
                }}
                key={id}
              >
                <td>{id}</td>
                <td>{amount} ETH</td>
                <td>
                  <Address address={recipient} clickable={false} />
                </td>
                <td>{approvalCount}</td>
                <td>
                  {approvalCount >= signaturesRequired ? (
                    <span className="text-success">Transfer Complete</span>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

// data-href={`/transfer-requests/${id}`}
