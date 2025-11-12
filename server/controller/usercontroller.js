import userModel from "../model/userModel.js";

export const create = async (req, res)=> {
    try {
        const newUser = new userModel(req.body);
        const {name, email} = newUser;

        const userExist = await userModel.findOne({$or:[{email},{name}],});
        if(userExist){
            return res.status(400).json({message: "user already exists."});

        }
        const saveData = await newUser.save();
        // res.status(200).json(saveData);
        res.status(200).json({message: "user created successfully."});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const userData = await userModel.find(); // fetch all users
    if (!userData || userData.length === 0){
      return res.status(404).json({message: "user data not found."})
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const getUserById = async(req, res) =>{
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if(!userExist){
      return res.status(404).json({message: "user not found."});
    }
        res.status(200).json(userExist);

  } catch (error) {
        res.status(500).json({ errorMessage: error.message });
  }
}

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if(!userExist){
      return res.status(404).json({message: "user not found."});
    }
    const updatedData = await userModel.findByIdAndUpdate(id, req.body,{
      new:true
    })
    // res.status(200).json(updatedData)
            res.status(200).json({message: "user updated successfully."});

  } catch (error) {
            res.status(500).json({ errorMessage: error.message });

  }
}

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if(!userExist){
      return res.status(404).json({message: "user not found."});
    }
    await userModel.findByIdAndDelete(id)
    res.status(200).json({message:"user deleted successfully."})
  } catch (error) {
            res.status(500).json({ errorMessage: error.message });

  }
}