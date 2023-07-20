import { Form } from "react-bootstrap";
import { useContext } from "react";
import { RootContext } from "../../../layouts/RootLayout/RootLayout";
import Input from "../Input/Input";
import PropTypes from "prop-types";

export default function FilterTableRowsForm({ setRowsPerPage }) {
  const { transferRequests } = useContext(RootContext);

  return (
    <>
      <Form>
        <Input
          type="select"
          label="Rows Per Page"
          controlId="filterTableRowsId"
          setInput={(e) => setRowsPerPage(e.target.value)}
          transfer={false}
          defaultValue="100"
          options={
            <>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value={transferRequests?.length}>All</option>
            </>
          }
        />
      </Form>
    </>
  );
}

FilterTableRowsForm.propTypes = {
  setRowsPerPage: PropTypes.func,
};
