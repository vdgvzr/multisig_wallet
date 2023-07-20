import Form from "../../components/forms/Form/Form";
import { Col, Row } from "react-bootstrap";
import TransferTable from "../../components/content/mainContent/TransferTable/TransferTable";

export default function TransferRequests() {
  return (
    <>
      <Row className="justify-content-center my-5">
        <Form title="Request a transfer" type="transfer" col="10" />
      </Row>
      <Row className="justify-content-center my-5">
        <Col xs={10} className="p-0">
          <TransferTable />
        </Col>
      </Row>
    </>
  );
}
