import { createBrowserRouter } from "react-router-dom";
import { homeRoute } from "./pages/Home/Home";
import ManageOwners from "./pages/ManageOwners/ManageOwners";
import TransferRequests from "./pages/TransferRequests/TransferRequests";
import { transferRoute } from "./pages/TransferRequests/Transfer/Transfer";
import ErrorPage from "./pages/staticPages/ErrorPage/ErrorPage";
import PageNotFoundPage from "./pages/staticPages/PageNotFoundPage/PageNotFoundPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, ...homeRoute },
          {
            path: "manage-owners",
            element: <ManageOwners />,
          },
          {
            path: "transfer-requests",
            children: [
              { index: true, element: <TransferRequests /> },
              { path: ":transferId", ...transferRoute },
            ],
          },
          { path: "*", element: <PageNotFoundPage /> },
        ],
      },
    ],
  },
]);

export const PAGES = [];

router.routes[0].children[0].children.map((page) => {
  if (page.path && page.path != "*") {
    let newPath = [];
    page.path != undefined &&
      page.path.split("-").forEach((word) => {
        const capitalise = word[0].toUpperCase() + word.substr(1);
        newPath.push(capitalise);
      });
    PAGES.push({ name: newPath.join(" "), url: "/" + page.path });
  }
});
