import { useEffect, useState } from "react";
import { formatAddress } from "../../../../assets/js/utils";
import PropTypes from "prop-types";

export default function Address({ address, format, active }) {
  const [responsiveFormat, setResponsiveFormat] = useState(false);

  useEffect(() => {
    setResize();
  });

  window.addEventListener("resize", () => {
    setResize();
  });

  function setResize() {
    if (window.innerWidth < 1400) {
      setResponsiveFormat(true);
    } else {
      setResponsiveFormat(false);
    }
  }

  return (
    <>
      <div
        className={`address ${active ? "address__active" : ""}`}
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
      >
        {format || responsiveFormat ? formatAddress(address) : address}
      </div>
    </>
  );
}

Address.propTypes = {
  address: PropTypes.string,
  format: PropTypes.bool,
  active: PropTypes.bool,
};
