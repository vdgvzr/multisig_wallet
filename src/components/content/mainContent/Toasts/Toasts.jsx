import { Toast, ToastContainer } from "react-bootstrap";
import { useRef } from "react";
import { useMetaMask } from "../../../../hooks/useMetamask";

export default function Toasts() {
  const { error, errorMessage, clearError } = useMetaMask();

  const containerRef = useRef();

  window.addEventListener("scroll", () => {
    fixedContainer(containerRef.current);
  });

  function fixedContainer(container) {
    if (window.scrollY > 177) {
      container.classList.add("toast-container__fixed");
    } else {
      container.classList.remove("toast-container__fixed");
    }
  }

  return (
    <>
      <ToastContainer ref={containerRef} className="my-2" style={{ zIndex: 1 }}>
        {error &&
          errorMessage.map((message) => {
            return (
              <Toast
                key={message.id}
                onClose={() => clearError(message.id)}
                delay={5000}
                bg="primary"
                className={`toast-${message.variant}`}
                autohide
              >
                <Toast.Header>
                  <strong className="me-auto">
                    {import.meta.env.VITE_SITE_NAME}
                  </strong>
                </Toast.Header>
                <Toast.Body>{message.message}</Toast.Body>
                <span className={`bg-${message.variant}`}></span>
              </Toast>
            );
          })}
      </ToastContainer>
    </>
  );
}
