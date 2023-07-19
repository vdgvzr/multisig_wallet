import Icon from "../../Icon/Icon";
import PropTypes from "prop-types";

export default function IconHero({ icon, title, text }) {
  return (
    <>
      <div className="row justify-content-center align-items-center my-5 icon-hero">
        <div className="col-4 text-center">
          <Icon icon={icon} classes={icon === "cog" ? "spin" : ""} />
          <h1 className="icon-hero__header">{title}</h1>
          <span className="icon-hero__copy">{text}</span>
        </div>
      </div>
    </>
  );
}

IconHero.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};
