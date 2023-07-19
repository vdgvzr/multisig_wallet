import { useContext } from "react";
import Address from "../../../components/Address/Address";
import CustomButton from "../../../components/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { RootContext } from "../../../../../layouts/RootLayout/RootLayout";

export default function OwnersListItem({ index, owner, account, isOwner }) {
  const { deleteOwner } = useContext(RootContext);
  return (
    <>
      <li className="owners-list-item my-3 d-flex justify-content-between">
        <div className="owners-list-item__address d-flex align-items-center">
          <Address address={owner} active={account === owner} />
        </div>
        {isOwner &&
        owner !== account &&
        window.location.pathname === "/manage-owners" ? (
          <CustomButton
            text="Remove Owner"
            classes="ms-2"
            icon="delete"
            action={() => {
              deleteOwner(account, index);
            }}
          />
        ) : null}
      </li>
    </>
  );
}

OwnersListItem.propTypes = {
  index: PropTypes.string,
  owner: PropTypes.string,
  account: PropTypes.string,
  isOwner: PropTypes.bool,
};
