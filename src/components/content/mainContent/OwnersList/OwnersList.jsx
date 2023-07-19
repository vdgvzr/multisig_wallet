import { useContext } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import PropTypes from "prop-types";
import OwnersListItem from "./OwnersListItem/OwnersListItem";

export default function OwnersList({ col }) {
  const { owners, account, isOwner } = useContext(RootContext);
  return (
    <>
      <div className={`col-lg-${col} col-12 py-4 px-5 owners-list`}>
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
      </div>
    </>
  );
}

OwnersList.propTypes = {
  col: PropTypes.string,
};
