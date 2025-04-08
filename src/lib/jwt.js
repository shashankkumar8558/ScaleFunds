import jwt from "jsonwebtoken"

const accessSecretKey = process.env.ACCESSSECRETKEY
const refreshSecretKey = process.env.REFRESHSECRETKEY

export const generateToken = (user) => {
  const payload = { id: user.id, email: user.email, phoneNumber: user.phoneNumber, role: user.role }
  const accessToken = jwt.sign(payload,
    accessSecretKey, { expiresIn: "30min" }
  )

  const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: "10d" });

  return { accessToken, refreshToken };
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, accessSecretKey);
  } catch (error) {
    return null;
  }
}

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token,refreshSecretKey);
  } catch (error) {
    return null;
  }
}