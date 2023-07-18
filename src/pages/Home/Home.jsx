import PropTypes from "prop-types";
import Form from "../../components/forms/Form";

export default function Home() {
  return (
    <>
      <div>
        <Form title="Deposit to Contract" type="deposit" col="6" />
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
