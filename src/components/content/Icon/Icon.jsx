import PropTypes from "prop-types";
import Icons from "../../../assets/svg/icons.svg";

export default function Icon({ icon, classes }) {
  return (
    <>
      <svg aria-hidden="true" className={`icon ${classes && classes}`}>
        <use xlinkHref={`${Icons}#icon-${icon}`} />
      </svg>
    </>
  );
}

Icon.propTypes = {
  icon: PropTypes.string,
  classes: PropTypes.string,
};
