import OwnersListItem from "./OwnersListItem/OwnersListItem";
import { Col } from "react-bootstrap";
import { useMetaMask } from "../../../../hooks/useMetamask";

export default function OwnersList({ col }) {
  const { owners, isOwner } = useMetaMask();
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
                isOwner={isOwner}
              />
            );
          })}
        </ul>
      </Col>
    </>
  );
}
