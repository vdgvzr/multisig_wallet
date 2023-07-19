import Icon from "../../Icon/Icon";
import PropTypes from "prop-types";

export default function IconHero({ icon, text }) {
  return (
    <>
      <div className="row justify-content-center align-items-center my-5 icon-hero">
        <div className="col-4 text-center">
          <Icon icon={icon} classes={icon === "cog" ? "spin" : ""} />
          <h1 className="icon-hero__header">{text}</h1>
        </div>
      </div>
    </>
  );
}

IconHero.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
