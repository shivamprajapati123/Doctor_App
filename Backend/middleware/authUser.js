import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
  try {
    let token = req.headers.authorization || req.headers.token;
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
    if(!token){
      return res.json({success:false,message:"Not authorized please login again"})
    }
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next()
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export default authUser;

