import { formatAddress } from "../../../assets/js/utils";
import PropTypes from "prop-types";

export default function Address({ address, format, variant }) {
  return (
    <>
      <div className={variant === "active" && "address__active"}>
        {format ? formatAddress(address) : address}
      </div>
    </>
  );
}

Address.propTypes = {
  address: PropTypes.string,
  format: PropTypes.bool,
  variant: PropTypes.string,
};
