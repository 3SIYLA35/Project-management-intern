const User = require('../Models/USERS');
const { generatetoken } = require('../config/JWT');
const axios = require('axios');
require('dotenv').config();
const LoginService=require('../Services/User');

exports.login=async(req, res)=>{
  try {
    const {email,password}=req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = generatetoken(user);
    
    // Return user info (without password) and token
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.LoginWithgoogle = async (req, res) => {
  try {
    const {code}=req.query;
    if (!code){
      return res.status(400).json({message: 'Authorization code missing' });
    }

    const {data} = await axios.post('https://oauth2.googleapis.com/token',{
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri:'http://localhost:8000/auth/google/Login',
      grant_type: 'authorization_code',
    });

    const userInfo=await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers:{ Authorization: `Bearer ${data.access_token}` },
    });

    let user=await LoginService.getUser(userInfo.data.email);;
    console.log(userInfo.data);
    if (user==null){
        return  res.status(401).json({message:'user not foundd'});
    }
    const token=generatetoken(user);
    res.redirect(`http://localhost:3000/auth-callback?token=${token}`);
  } catch (error) {
    console.error('google login error:', error.response?.data || error.message);
    res.redirect(`http://localhost:3000/login?error=google_auth_failed`);
  }
};

exports.verifyToken=async(req, res)=>{
  try {
    console.log(`request user`,req.user);
    const user=await User.findById(req.user.id).select('-password');
    
    if(!user){
        console.log(`user not found`);
      return res.status(404).json({ message: 'User not found' });;
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};