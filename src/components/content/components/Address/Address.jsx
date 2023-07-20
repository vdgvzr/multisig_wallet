import { useContext, useEffect, useState } from "react";
import { formatAddress } from "../../../../assets/js/utils";
import PropTypes from "prop-types";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";

export default function Address({
  address,
  format,
  active,
  online = false,
  clickable = true,
}) {
  const { toastMessage } = useContext(RootContext);
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
        className={`address d-flex align-items-center ${
          active ? "address__active" : ""
        }`}
        onClick={() => {
          if (clickable) {
            navigator.clipboard.writeText(address);
            toastMessage({
              variant: "success",
              message: "Copied address!",
            });
          }
        }}
      >
        {format || responsiveFormat ? formatAddress(address) : address}
        {online ? <div className="address__online ms-2"></div> : null}
      </div>
    </>
  );
}

Address.propTypes = {
  address: PropTypes.string,
  format: PropTypes.bool,
  active: PropTypes.bool,
  online: PropTypes.bool,
  clickable: PropTypes.bool,
};
