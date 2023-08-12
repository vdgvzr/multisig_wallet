import { Col, Row } from "react-bootstrap";
import Icon from "../../Icon/Icon";

export default function IconHero({ icon, title, text }) {
  return (
    <>
      <Row className="justify-content-center align-items-center my-5 icon-hero">
        <Col xs={6} className="text-center">
          <Icon icon={icon} classes={icon === "cog" ? "spin" : ""} />
          <h1 className="icon-hero__header">{title}</h1>
          <span className="icon-hero__copy">{text}</span>
        </Col>
      </Row>
    </>
  );
}
