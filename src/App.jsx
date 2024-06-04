import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import Root, { loader as rootLoader } from "./pages/Root";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Header from "./components/root_page/Header";
import ProfileDrop from "./components/ProfileDrop";
import Dashboard from "./pages/Dashboard";
import Collections, { loader as collectionsLoader } from "./pages/Collections";
import CreateCollection from "./pages/CreateCollection";
import EditCollection, {
  loader as collectionLoader,
} from "./pages/EditCollection";
import Items from "./pages/Items";
import CreateItem from "./pages/CreateItem";
import EditItem, { loader as itemEditLoader } from "./pages/EditItem";
import Item, { loader as itemLoader } from "./pages/Item";
import UserPage from "./pages/UserPage";
import CollectionsPage, {
  loader as CollPageLoader,
} from "./pages/CollectionsPage";
import ItemsPage, { loader as ItmPageLoader } from "./pages/ItemsPage";
import ViewItem, { loader as viewItmLoader } from "./pages/ViewItem";

const user = JSON.parse(localStorage.getItem("User"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    loader: rootLoader,
    // action: rootAction,
  },
  {
    path: "login",
    element: <Login />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: loginAction,
  },
  {
    path: "register",
    element: <Registration />,

    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
  },
  {
    path: "colletions/view/:id",
    element: <CollectionsPage />,
    loader: CollPageLoader,
  },
  {
    path: "items/view/:id",
    element: <ItemsPage />,
    loader: ItmPageLoader,
  },
  {
    path: "item/view/:id",
    element: <ViewItem />,
    loader: viewItmLoader,
  },
  {
    path: "user",
    element: <UserPage />,
    // errorElement: <ErrorPage />,
    // loader: userLoader,
    // action: rootAction,
    children: [
      {
        path: "dashboard",
        element: (
          <div className="lg:ml-[17rem] ml-8 mt-16 flex flex-col gap-7 rounded-lg bg-gray-700 text-white p-8">
            <p className="lg:text-2xl text-xl font-medium">
              <em className="font-normal">Name:</em> {user?.name}
              <hr />
            </p>
            <p className="lg:text-2xl text-xl font-medium">
              <em className="font-normal">Email:</em> {user?.email}
              <hr />
            </p>
          </div>
        ),
      },
      {
        path: "colletions",
        element: <Collections />,
        loader: collectionsLoader,
      },
      {
        path: "colletions/new",
        element: <CreateCollection />,
      },
      {
        path: "colletions/edit/:id",
        element: <EditCollection />,
        loader: collectionLoader,
      },
      {
        path: "items",
        element: <Items />,
        // loader: itemsLoader,
        // action: itemsAction,
      },
      {
        path: "items/:id",
        element: <Item />,
        loader: itemLoader,
        // action: itemsAction,
      },
      {
        path: "items/new",
        element: <CreateItem />,
      },
      {
        path: "items/edit/:id",
        element: <EditItem />,
        loader: itemEditLoader,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
