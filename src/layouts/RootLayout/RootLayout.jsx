import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../../components/global/MainNav/MainNav";
import LoadingPage from "../../pages/staticPages/LoadingPage/LoadingPage";
import WelcomePage from "../../pages/staticPages/WelcomePage/WelcomePage";
import AccessDeniedPage from "../../pages/staticPages/AccessDeniedPage/AccessDeniedPage";
import ContractBanner from "../../components/content/mainContent/ContractBanner/ContractBanner";
import Footer from "../../components/global/Footer/Footer";
import { useMetaMask } from "../../hooks/useMetamask";
import { Container } from "react-bootstrap";

export default function RootLayout() {
  const { loading, isSignatory, wallet } = useMetaMask();
  /* function toastMessage(message) {
    setMessages((prev) => [...prev, message]);
    setShowMessage(true);
  } */

  return (
    <>
      <main className="main-content">
        <MainNav />
        <ContractBanner />
        <ScrollRestoration />
        <Container>
          {loading ? (
            <LoadingPage />
          ) : isSignatory ? (
            <>
              <Outlet />
            </>
          ) : !wallet?.accounts[0] ? (
            <WelcomePage />
          ) : (
            <AccessDeniedPage />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
