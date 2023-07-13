import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

export const PAGES = [
  {
    name: "Home",
    element: <Home name={"Home"} />,
    url: "/",
    index: true,
  },
  {
    name: "Manage Owners",
    element: null,
    url: "/manage-owners",
    index: false,
  },
  {
    name: "About",
    element: null,
    url: "/about",
    index: false,
  },
];

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <h1>404</h1>,
        children: PAGES.map((page) => {
          return {
            path: page.url,
            children: [{ index: page.index, element: page.element }],
          };
        }),
      },
    ],
  },
]);
