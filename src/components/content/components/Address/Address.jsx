import { useContext, useEffect, useState } from "react";
import { utils } from "../../../../assets/js/utils";
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
        className={`address ${
          active ? "address__active d-flex align-items-center" : ""
        }`}
        onClick={() => {
          if (clickable) {
            navigator.clipboard.writeText(address);
            toastMessage({
              id: crypto.randomUUID(),
              variant: "success",
              message: "Copied address!",
            });
          }
        }}
      >
        {format || responsiveFormat ? utils.formatAddress(address) : address}
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
