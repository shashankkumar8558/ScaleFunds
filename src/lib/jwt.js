import jwt from "jsonwebtoken"

const accessSecretKey = process.env.ACCESSSECRETKEY
const refreshSecretKey = process.env.REFRESHSECRETKEY

export const generateToken = (user) => {
  const accessToken = jwt.sign({id: user.id,email: user.email, phoneNumber : user.phoneNumber,role : user.role},
    accessSecretKey,{expiresIn: "30min"}
  )

  const refrehToken = jwt.sign({id : user.id},refreshSecretKey,{expiresIn:"10d"});

  return {accessToken,refrehToken};
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token,accessSecretKey);
  } catch (error) {
    return null;
  }
}