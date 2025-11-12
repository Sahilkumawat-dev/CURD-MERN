import React, { useEffect, useState } from 'react'
import "./Update.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from "react-hot-toast";
const UpdateUser = () => {
    
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users)
  const navigate = useNavigate();
  const {id} = useParams();
  const inputHandler = (e) => {
    const { name, value } = e.target
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  useEffect(() =>{
    axios.get(`http://localhost:8000/sbi/user/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error) =>{
        console.log(error);
    });
  },[id]);
  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/sbi/update/user/${id}`,user)
    .then((response)=>{
      // console.log("Succuss");
      toast.success(response.data.message, {position: "top-center"});
      navigate("/");
    })
    .catch((error) =>{
      console.log(error)
    })
  }
  return (
    <div className="addUser" onSubmit={submitForm}>
      <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
      <h3>Update User</h3>
      <form className="adduserform">
        <div className='inputGroup'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            value={user.name}
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
            value={user.email}

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
            value={user.address}

            autoComplete='off'
            placeholder='Enter Your Address' />
          <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </form>
    </div>
  )
}

export default UpdateUser
