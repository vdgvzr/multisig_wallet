import { useContext } from "react";
import Address from "../../../components/Address/Address";
import CustomButton from "../../../components/CustomButton/CustomButton";
import PropTypes from "prop-types";
import { RootContext } from "../../../../../layouts/RootLayout/RootLayout";
import Form from "../../../../forms/Form/Form";

export default function OwnersListItem({ index, owner, account, isOwner }) {
  const { deleteOwner, owners } = useContext(RootContext);
  return (
    <>
      <li className="owners-list-item my-3">
        <div className="d-flex justify-content-between">
          <div className="owners-list-item__address d-flex align-items-center">
            <Address
              address={owner}
              active={account === owner}
              online={account === owner}
            />
          </div>
          {isOwner && window.location.pathname === "/manage-owners" ? (
            owner !== account ? (
              <CustomButton
                text="Remove Owner"
                classes="ms-2"
                icon="delete"
                action={() => {
                  deleteOwner(account, index);
                }}
              />
            ) : null
          ) : null}
        </div>
        <div className="mt-3">
          {isOwner &&
            owner === account &&
            window.location.pathname === "/manage-owners" && (
              <Form type="change" disabled={owners.length > 0} />
            )}
        </div>
      </li>
    </>
  );
}

OwnersListItem.propTypes = {
  index: PropTypes.number,
  owner: PropTypes.string,
  account: PropTypes.string,
  isOwner: PropTypes.bool,
};
