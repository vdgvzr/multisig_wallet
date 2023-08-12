import { Form } from "react-bootstrap";
import Input from "../Input/Input";
import { useMetaMask } from "../../../hooks/useMetamask";

export default function FilterTableRowsForm({ setRowsPerPage }) {
  const { transferRequests } = useMetaMask();

  return (
    <>
      <Form>
        <Input
          type="select"
          label="Rows Per Page"
          controlId="filterTableRowsId"
          setInput={(e) => setRowsPerPage(e.target.value)}
          transfer={false}
          defaultValue="10"
          options={
            <>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="100">100</option>
              <option value={transferRequests?.length}>All</option>
            </>
          }
        />
      </Form>
    </>
  );
}
