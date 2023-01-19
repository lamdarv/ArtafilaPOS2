import jwt from "jsonwebtoken";

export const generateToken = (profile) => {
    return jwt.sign(
        {
        id: profile._id,
        // name: profile.name,
        // email: profile.email
        },
        process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const isAuth = async (req,res,next)=>{
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
    // try {
    //     const {token} = req.cookies;
    //     if(!token){
    //         return next('Please login to access the data');
    //     }
    //     const verify = jwt.verify(token,process.env.SECRET_KEY);
    //     req.user = await userModel.findById(verify.id);
    //     next();
    // } catch (error) {
    //    return next(error); 
    // }
}