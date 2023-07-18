import PropTypes from "prop-types";
import Form from "../../components/forms/Form";

export default function Home() {
  return (
    <>
      <div>
        <Form type="deposit" />
      </div>
    </>
  );
}

Home.propTypes = {
  name: PropTypes.string,
};
