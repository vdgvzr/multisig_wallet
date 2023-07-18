import { useContext } from "react";
import { RootContext } from "../../../../layouts/RootLayout/RootLayout";
import Address from "../../components/Address/Address";

export default function Owners() {
  const { owners, account } = useContext(RootContext);

  return (
    <>
      <div className="owners">
        <h5>Owners:</h5>
        <ul>
          {owners.map((owner, index) => {
            return (
              <li className="my-2" key={index}>
                <Address address={owner} active={account === owner} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
