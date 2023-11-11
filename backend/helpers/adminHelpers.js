import User from "../models/userModel.js";

const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, _id: 1 });
    return users;
  } catch (error) {
    console.log("Error fetching users", error);
    throw error;
  }
};


const updateUser=async(userData)=>{



    try{

        const user =await User.findById(userData.userId)
        
        if(!user){

            return {success:false,message:"User not found"};
        }

        user.name=userData.name
        user.email=userData.email

        await user.save()

        return {success:true,message:"User updated successfully"}

    }
    catch(error){

        console.error("Error updating user",error)
        throw error;
    }
}

const deleteUser =async(userId)=>{

    try {
        
        const deleteUser =await User.findByIdAndDelete(userId);

        if(!deleteUser){

            return {success :false ,message:"User not found"}
        }

        return {success:true,message:"User deleted successfully"}
    } catch (error) {
        
        console.error("Error deleting user:",error)

        throw error;
    }
}


export { fetchAllUsers,updateUser,deleteUser };
