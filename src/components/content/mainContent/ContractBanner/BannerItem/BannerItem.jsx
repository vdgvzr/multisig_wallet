import PropTypes from "prop-types";
import { useContext } from "react";
import { RootContext } from "../../../../../layouts/RootLayout/RootLayout";
import Icon from "../../../Icon/Icon";

export default function BannerItem({ title, element, col }) {
  const { isSignatory } = useContext(RootContext);

  return (
    <>
      <div
        className={`d-flex flex-column col-md-${col} col-12 text-md-start text-center my-3 justify-content-center`}
      >
        {title}:
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
  title: PropTypes.string,
  element: PropTypes.any,
  col: PropTypes.string,
};
