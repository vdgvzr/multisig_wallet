import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function CustomButton({
  text,
  classes,
  variant,
  type,
  action,
  disabled,
}) {
  return (
    <>
      <Button
        type={type ? type : "button"}
        className={classes ? classes : ""}
        onClick={action ? action : null}
        variant={variant ? variant : "primary"}
        disabled={disabled}
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
  disabled: PropTypes.bool,
};
