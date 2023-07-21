import { useContext } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import PropTypes from "prop-types";
import OwnersListItem from "./OwnersListItem/OwnersListItem";
import { Col } from "react-bootstrap";

export default function OwnersList({ col }) {
  const { owners, account, isOwner } = useContext(RootContext);
  return (
    <>
      <Col xs={12} lg={col} className="py-4 px-5 owners-list">
        <h2>Owners</h2>
        <ul>
          {owners.map((owner, index) => {
            return (
              <OwnersListItem
                key={index}
                index={index}
                owner={owner}
                account={account}
                isOwner={isOwner}
              />
            );
          })}
        </ul>
      </Col>
    </>
  );
}

OwnersList.propTypes = {
  col: PropTypes.string,
};
