import PropTypes from "prop-types";

export default function BannerItem({ type, element }) {
  return (
    <>
      <div className="col-md-4 col-12 text-md-start text-center my-md-0 my-3">
        Contract {type}: {element}
      </div>
    </>
  );
}

BannerItem.propTypes = {
  type: PropTypes.string,
  element: PropTypes.any,
};
