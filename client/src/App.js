import User from "./getUser/user.jsx";
import AddUser from "./addUser/AddUser.jsx";
import Update  from "./updateuser/Update.jsx";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
function App() {
  const rout = createBrowserRouter([
    {
      path: "/",
      element: <User/>,
    },
    {
      path: "/add",
      element:<AddUser/>,
    },
     {
      path: "/update/:id",
      element:<Update/>,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={rout}></RouterProvider>
    </div>
  );
}

export default App;
