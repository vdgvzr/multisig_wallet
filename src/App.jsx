import { MetaMaskContextProvider } from "./hooks/useMetamask";
import RootLayout from "./layouts/RootLayout/RootLayout";

export default function App() {
  return (
    <>
      <MetaMaskContextProvider>
        <RootLayout />
      </MetaMaskContextProvider>
    </>
  );
}
