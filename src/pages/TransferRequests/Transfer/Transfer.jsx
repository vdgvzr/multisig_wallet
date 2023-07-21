import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import CustomButton from "../../../components/content/components/CustomButton/CustomButton";
import Address from "../../../components/content/components/Address/Address";
import { Col, Row, Table } from "react-bootstrap";

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

  const pending = (
    <div className="d-flex align-items-center">
      <p className="m-0">Pending Approval</p>
    </div>
  );

  return (
    <>
      <Row className="my-5 justify-content-center transfer py-4 px-5">
        <Col xs={10}>
          <h1>Transfer #{id}</h1>
          <Table striped bordered hover className="my-3">
            <thead className="transfer-table__head">
              <tr>
                <th>Amount</th>
                <th>To</th>
                <th>Approvals</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody className="transfer-table__body">
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <span>{amount} ETH</span>
                  </div>
                </td>
                <td>
                  <Address address={recipient} />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span>{approvalCount}</span>
                  </div>
                </td>
                <td className="text-center">
                  {approvalCount < signaturesRequired ? (
                    account != recipient ? (
                      approvals[id].toString() !== "true" ? (
                        <CustomButton
                          text="Approve"
                          icon="approve"
                          action={() => {
                            approveRequest(account, id, true);
                          }}
                        />
                      ) : (
                        <>{pending}</>
                      )
                    ) : (
                      <>{pending}</>
                    )
                  ) : (
                    <div className="d-flex align-items-center">
                      <p className="text-success m-0">Transfer Complete</p>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
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
