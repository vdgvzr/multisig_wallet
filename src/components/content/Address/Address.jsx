import { useEffect, useRef, useState } from "react";
import { formatAddress } from "../../../assets/js/utils";
import PropTypes from "prop-types";

export default function Address({ address, format = true, active }) {
  const addressRef = useRef();
  const [formatting, setFormatting] = useState(format);

  useEffect(() => {
    addressRef.current.addEventListener("click", () => {
      setFormatting(!formatting);
    });
  });

  return (
    <>
      <div
        className={`address ${active ? "address__active" : ""}`}
        ref={addressRef}
      >
        {formatting ? formatAddress(address) : address}
      </div>
    </>
  );
}

Address.propTypes = {
  address: PropTypes.string,
  format: PropTypes.bool,
  active: PropTypes.bool,
};
