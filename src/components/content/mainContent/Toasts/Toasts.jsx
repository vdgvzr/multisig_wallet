import { Toast, ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function Toasts({
  messages,
  setShowMessage,
  showMessage,
  setMessages,
}) {
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
        {messages.map((toast, index) => {
          return (
            <Toast
              key={index}
              onClose={() => {
                setShowMessage(false);
                setMessages([]);
              }}
              show={showMessage}
              delay={5000}
              bg="primary"
              className={`toast-${toast.variant}`}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">
                  {import.meta.env.VITE_SITE_NAME}
                </strong>
              </Toast.Header>
              <Toast.Body>{toast.message}</Toast.Body>
              <span className={`bg-${toast.variant}`}></span>
            </Toast>
          );
        })}
      </ToastContainer>
    </>
  );
}

Toasts.propTypes = {
  messages: PropTypes.array,
  setShowMessage: PropTypes.func,
  setMessages: PropTypes.func,
  showMessage: PropTypes.bool,
};
