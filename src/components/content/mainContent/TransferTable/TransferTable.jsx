import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";
import SitePagination from "../../../global/SitePagination/SitePagination";
import useTable from "../../../../assets/js/customHooks/useTable";
import Form from "../../../forms/Form/Form";
import { Col, Row, Table } from "react-bootstrap";

export default function TransferTable() {
  const { transferRequests, signaturesRequired } = useContext(RootContext);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(transferRequests, page, rowsPerPage);

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <>
      <Row>
        <Col xs={6}>
          <h2>Transfer Requests</h2>
        </Col>
        <Form col="6" type="filterRows" customFunction={setRowsPerPage} />
      </Row>
      <Table responsive striped bordered hover className="transfer-table my-3">
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
          {slice.map((transfer) => {
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
      <SitePagination range={range} setPage={setPage} page={page} />
    </>
  );
}
