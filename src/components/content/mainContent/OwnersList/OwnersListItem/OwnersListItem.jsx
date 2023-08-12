import Address from "../../../components/Address/Address";
import CustomButton from "../../../components/CustomButton/CustomButton";
import Form from "../../../../forms/Form/Form";
import { useMetaMask } from "../../../../../hooks/useMetamask";
import Message from "../../../../../assets/js/customClasses/messageClasses";

export default function OwnersListItem({ index, owner, isOwner }) {
  const { owners, contract, loadWeb3, wallet, toastMessage } = useMetaMask();
  const account = window.web3.utils.toChecksumAddress(wallet.accounts[0]);

  function deleteOwner(from, index) {
    contract.methods
      .deleteOwner(index)
      .send({ from })
      .once("receipt", () => {
        loadWeb3();
      })
      .catch((e) => {
        toastMessage(new Message("error", `${e}`));
      });

    contract.events.deleteOwnerComplete().on("data", function () {
      toastMessage(new Message("suceess", "Removed owner from contract!"));
    });
  }

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
                  deleteOwner(wallet.accounts[0], index);
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
