import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./pages/Root";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
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
import Non_found from "./components/non_found";
import TicketsPage from "./pages/TicketsPage";

const user = JSON.parse(localStorage.getItem("User"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Non_found />,
    loader: rootLoader,
    // action: rootAction,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Non_found />,
    // loader: rootLoader,
    // action: loginAction,
  },
  {
    path: "register",
    element: <Registration />,
    errorElement: <Non_found />,
    // loader: rootLoader,
    // action: rootAction,
  },
  {
    path: "colletions/view/:id",
    element: <CollectionsPage />,
    errorElement: <Non_found />,
    loader: CollPageLoader,
  },
  {
    path: "items/view/:id",
    element: <ItemsPage />,
    errorElement: <Non_found />,
    loader: ItmPageLoader,
  },
  {
    path: "item/view/:id",
    element: <ViewItem />,
    errorElement: <Non_found />,
    loader: viewItmLoader,
  },
  {
    path: "user",
    element: <UserPage />,
    errorElement: <Non_found />,
    // loader: userLoader,
    // action: rootAction,
    children: [
      {
        path: "dashboard",
        element: (
          <div className="md:ml-[17rem] sm:ml-[15rem] ml-8 mt-16 flex flex-col gap-5 rounded-lg bg-gray-700 text-white p-8">
            <p className="lg:text-2xl text-xl font-medium">
              <em className="font-normal">Name:</em> {user?.name}
            </p>
            <hr />
            <p className="lg:text-2xl text-xl font-medium">
              <em className="font-normal">Email:</em> {user?.email}
            </p>
            <hr />
          </div>
        ),
        errorElement: <Non_found />,
      },
      {
        path: "colletions",
        element: <Collections />,
        errorElement: <Non_found />,
        loader: collectionsLoader,
      },
      {
        path: "colletions/new",
        element: <CreateCollection />,
        errorElement: <Non_found />,
      },
      {
        path: "colletions/edit/:id",
        element: <EditCollection />,
        errorElement: <Non_found />,
        loader: collectionLoader,
      },
      {
        path: "items",
        element: <Items />,
        errorElement: <Non_found />,
        // loader: itemsLoader,
        // action: itemsAction,
      },
      {
        path: "items/:id",
        element: <Item />,
        errorElement: <Non_found />,
        loader: itemLoader,
        // action: itemsAction,
      },
      {
        path: "items/new",
        element: <CreateItem />,
        errorElement: <Non_found />,
      },
      {
        path: "items/edit/:id",
        element: <EditItem />,
        errorElement: <Non_found />,
        loader: itemEditLoader,
      },
      {
        path: "tickets",
        element: <TicketsPage />,
        errorElement: <Non_found />,
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
