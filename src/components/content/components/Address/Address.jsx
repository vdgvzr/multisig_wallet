import { useEffect, useState } from "react";
import { utils } from "../../../../assets/js/utils";
import Message from "../../../../assets/js/customClasses/messageClasses";
import { useMetaMask } from "../../../../hooks/useMetamask";

export default function Address({
  address,
  format,
  active,
  online = false,
  clickable = true,
}) {
  const { toastMessage } = useMetaMask();
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
            toastMessage(new Message("success", "Copied address!"));
          }
        }}
      >
        {format || responsiveFormat ? utils.formatAddress(address) : address}
        {online ? <div className="address__online ms-2"></div> : null}
      </div>
    </>
  );
}
