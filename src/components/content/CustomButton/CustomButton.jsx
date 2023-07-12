import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function CustomButton({ text, classes, variant, type, action }) {
  return (
    <>
      <Button
        type={type ? type : "button"}
        className={classes ? classes : ""}
        onClick={action ? action : null}
        variant={variant ? variant : "primary"}
      >
        {text ? text : "button"}
      </Button>
    </>
  );
}

CustomButton.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.any,
};
