import jwt from 'jsonwebtoken'

const authDoctor = async(req,res,next)=>{
  try {
    let dToken = req.headers.authorization || req.headers.token;
    if (dToken && dToken.startsWith('Bearer ')) {
      dToken = dToken.split(' ')[1];
    }
    if(!dToken){
      return res.json({success:false,message:"Not authorized please login again"})
    }
    const token_decode = jwt.verify(dToken,process.env.JWT_SECRET);
    req.DocId = token_decode.id;
    next()
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


export default authDoctor;
