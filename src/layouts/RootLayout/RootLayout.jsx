import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../../components/global/MainNav/MainNav";
// import LoadingPage from "../../pages/staticPages/LoadingPage/LoadingPage";
// import WelcomePage from "../../pages/staticPages/WelcomePage/WelcomePage"; 
// import AccessDeniedPage from "../../pages/staticPages/AccessDeniedPage/AccessDeniedPage"; 
import ContractBanner from "../../components/content/mainContent/ContractBanner/ContractBanner";
import Footer from "../../components/global/Footer/Footer";
import { MetaMaskContextProvider } from "../../hooks/useMetamask";

export default function RootLayout() {
  /* function toastMessage(message) {
    setMessages((prev) => [...prev, message]);
    setShowMessage(true);
  } */

  return (
    <MetaMaskContextProvider>
      <main className="main-content">
        <MainNav />
        {/* <div className="line"></div> */}
        <ContractBanner />
        <ScrollRestoration />
        <div className="container">
          {/* {loading ? (
            <LoadingPage />
          ) : isSignatory ? (
            <>
              <Outlet />
            </>
          ) : !account ? (
            <WelcomePage />
          ) : (
            <AccessDeniedPage />
          )} */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </MetaMaskContextProvider>
  );
}
