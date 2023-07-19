import PropTypes from "prop-types";
import { useContext } from "react";
import { RootContext } from "../../../../../layouts/RootLayout/RootLayout";
import Icon from "../../../Icon/Icon";

export default function BannerItem({ type, element }) {
  const { isSignatory } = useContext(RootContext);

  return (
    <>
      <div className="col-md-4 col-12 text-md-start text-center my-md-0 my-3">
        Contract {type}:{" "}
        {isSignatory ? (
          element
        ) : (
          <div>
            <Icon icon="lock" />
          </div>
        )}
      </div>
    </>
  );
}

BannerItem.propTypes = {
  type: PropTypes.string,
  element: PropTypes.any,
};
