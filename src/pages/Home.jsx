import PropTypes from "prop-types";

export default function Home({ name }) {
  return <div>{name}</div>;
}

Home.propTypes = {
  name: PropTypes.string,
};
