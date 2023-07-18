import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Icon from "../../Icon/Icon";

export default function CustomButton({
  text,
  classes,
  variant,
  type,
  action,
  disabled,
  icon,
}) {
  return (
    <>
      <Button
        type={type ? type : "button"}
        className={classes ? classes + " custom-button" : "custom-button"}
        role="button"
        aria-label={text}
        onClick={action ? action : null}
        variant={variant ? variant : "primary"}
        disabled={disabled}
      >
        <span>{text ? text : "button"}</span>
        <Icon icon={icon} />
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
  icon: PropTypes.string,
};
