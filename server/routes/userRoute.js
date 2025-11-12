import express from "express"

import { create, getAllUsers, getUserById, update, deleteUser } from "../controller/usercontroller.js"

const route = express.Router();

route.post("/user",create);
route.get("/user",getAllUsers);
route.get("/user/:id",getUserById)
route.put("/update/user/:id",update)
route.delete("/delete/user/:id", deleteUser)

export default route;