import { useLoaderData } from "react-router-dom";
import CustomButton from "../../../components/content/components/CustomButton/CustomButton";
import Address from "../../../components/content/components/Address/Address";
import { Col, Row, Table } from "react-bootstrap";
import { useMetaMask } from "../../../hooks/useMetamask";

function Transfer() {
  const { transferId } = useLoaderData();
  const {
    transferRequests,
    signaturesRequired,
    wallet,
    approvals,
    contract,
    loadWeb3,
  } = useMetaMask();

  const id = transferRequests[transferId]?.id.toString();
  const recipient = transferRequests[transferId]?.recipient.toString();
  const amount =
    transferRequests[transferId] !== undefined &&
    window.web3.utils.fromWei(
      transferRequests[transferId]?.amount.toString(),
      "ether"
    );
  const approvalCount = transferRequests[transferId]?.approvalCount.toString();

  const pending = (
    <div className="d-flex align-items-center">
      <p className="m-0">Pending Approval</p>
    </div>
  );

  function approveRequest(from, id, approved) {
    contract.methods
      .approveRequest(id, approved)
      .send({ from })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        console.log(e.message);
        // toastMessage(new Message("error", `${e}`));
      });

    /* contract.events.requestApproved().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Transfer request #${e.returnValues.transferId} approved!`
        )
      );
    }); */

    /* contract.events.transferComplete().on("data", function (e) {
      toastMessage(
        new Message(
          "success",
          `Transfer of ${utils.formatBigNumber(e.returnValues.amount)} ETH to ${
            e.returnValues.to
          } from ${utils.formatAddress(e.returnValues.from)} complete!`
        )
      );
    }); */
  }

  return (
    <>
      <Row className="my-5 justify-content-center transfer py-4 px-lg-5 px-4">
        <Col xs={12} lg={10}>
          <h1>Transfer #{id}</h1>
          <Table
            responsive
            striped
            bordered
            hover
            className="my-3 d-none d-lg-block"
          >
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
                    wallet.accounts[0] != recipient ? (
                      approvals[id].toString() !== "true" ? (
                        <CustomButton
                          text="Approve"
                          icon="approve"
                          action={() => {
                            approveRequest(wallet.accounts[0], id, true);
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
          <Table striped bordered hover className="my-3 d-block d-lg-none">
            <thead className="transfer-table__head">
              <tr>
                <th>Amount</th>
                <td>
                  <div className="d-flex align-items-center">
                    <span>{amount} ETH</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>To</th>
                <td>
                  <Address address={recipient} />
                </td>
              </tr>
              <tr>
                <th>Approvals</th>
                <td>
                  <div className="d-flex align-items-center">
                    <span>{approvalCount}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Approve</th>
                <td className="text-center">
                  {approvalCount < signaturesRequired ? (
                    wallet.accounts[0] != recipient ? (
                      approvals[id].toString() !== "true" ? (
                        <CustomButton
                          text="Approve"
                          icon="approve"
                          action={() => {
                            approveRequest(wallet.accounts[0], id, true);
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
            </thead>
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
