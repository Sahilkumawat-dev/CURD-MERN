import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./user.css";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/sbi/user");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) =>{
    await axios.delete(`http://localhost:8000/sbi/delete/user/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));
      toast.success(response.data.message,{position: "top-right"})

    })
    .catch((error) =>{
      console.log(error);
    })
  }

  return (
    <div className="userTable">
      <Link to="/add" type="button" class="btn btn-primary">Add User <i class="fa-solid fa-user-plus"></i></Link>
      {users.length===0?(
        <div className="noData">
          <h3>No Data to Display.</h3>
          <p>Please add new users</p>
          </div>
      ):( <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionbuttons">
                  <Link to={`/update/` + user._id} type="button" class="btn btn-danger"><i class="fa-solid fa-pen-to-square"></i></Link>
                  <button onClick={()=>deleteUser(user._id)}
                    type="button" class="btn btn-success"><i class="fa-solid fa-trash"></i></button>

                </td>
              </tr>
            )
          })}

        </tbody>
      </table>)}
     
    </div>
  )
}

export default User


// import React, { useEffect, useState } from "react";
// import axios from "axios"; // ✅ You forgot this import
// import "./user.css";

// const User = () => {
//   const [users, setUsers] = useState([]); // ✅ rename variable for clarity

//   useEffect(() => {
//     // ✅ useEffect callback cannot be async directly
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/user");
//         setUsers(response.data);
//       } catch (error) {
//         console.log("Error while fetching data:", error);
//       }
//     };

//     fetchData(); // ✅ call the async function
//   }, []); // ✅ empty dependency array → runs once when component mounts

//   return (
//     <div className="userTable">
//       <button type="button" className="btn btn-primary">
//         Add User <i className="fa-solid fa-user-plus"></i>
//       </button>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">S.No.</th>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//             <th scope="col">Address</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.address}</td>
//               <td className="actionbuttons">
//                 <button type="button" className="btn btn-success">
//                   <i className="fa-solid fa-trash"></i>
//                 </button>
//                 <button type="button" className="btn btn-danger">
//                   <i className="fa-solid fa-pen-to-square"></i>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;
