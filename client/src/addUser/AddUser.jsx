import React, { useState } from 'react'
import "./addUser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from "react-hot-toast";
const AddUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users)
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8000/sbi/user",user)
    .then((response)=>{
      // console.log("Succuss");
      toast.success(response.data.message, {position: "top-center"});
      navigate("/");
    })
   .catch((error) => {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message, { position: "top-center" });
  } else {
    toast.error("Something went wrong!", { position: "top-center" });
  }
});

  }
  return (
    <div className="addUser" onSubmit={submitForm}>
      <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
      <h3>Add New User</h3>
      <form className="adduserform">
        <div className='inputGroup'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete='off'
            placeholder='Enter Your Name' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="name">E-Mail</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}

            name="email"
            autoComplete='off'
            placeholder='Enter Your Email' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="name">Address</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}

            name="address"
            autoComplete='off'
            placeholder='Enter Your Address' />
          <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </form>
    </div>
  )
}

export default AddUser
