import userSchema from '../Model/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userSchema.findOne({ email });
    if (!userData) {
      console.log(userData);
      return res.status(404).json({message:'Invalid Credentials'});
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword) {
      return res.status(404).json({message:'Invalid Credentials'});
    }

    const token = jwt.sign({ email: userData.email, id: userData._id }, process.env.SECRET_KEY, { expiresIn: "1h" });


    return res.status(200).json({ message: 'user successfully login', token, userData })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to logged In' })
  }
}


export const register = async (req, res) => {

  try {

    const { userName, email, password, role } = req.body;

    if (!req.body) {
      return res.status(404).json("Fill the appropriate field")
    }

    const userData1 = await userSchema.findOne({ email });

    if (userData1) {
      return res.status(409).json({message:'User Already Exist'});
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const userData = await userSchema.create({ userName, email, password: hashPassword, role});

    const token = jwt.sign({ email: userData.email, id: userData._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

    return res.status(200).json({ message: "User successfully registered", token, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Failed To register user"})
  }
}