import Address from "../../components/Address/Address";
import { useMetaMask } from "../../../../hooks/useMetamask";

export default function Owners() {
  const { owners, wallet } = useMetaMask();

  return (
    <>
      <div className="owners">
        <h5>Owners:</h5>
        <ul>
          {owners.map((owner, index) => {
            return (
              <li className="my-2" key={index}>
                <Address
                  address={owner}
                  active={wallet.accounts[0] === owner}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
