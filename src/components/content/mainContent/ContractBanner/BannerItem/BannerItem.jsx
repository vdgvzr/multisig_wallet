import Icon from "../../../Icon/Icon";
import { useMetaMask } from "../../../../../hooks/useMetamask";

export default function BannerItem({ title, element, col }) {
  const { isSignatory } = useMetaMask();

  return (
    <>
      <div
        className={`d-flex flex-column col-md-${col} col-12 text-md-start text-center my-3 justify-content-center`}
      >
        {title}:
        {isSignatory ? (
          element
        ) : (
          <div>
            <Icon icon="lock" />
          </div>
        )}
      </div>
    </>
  );
}
