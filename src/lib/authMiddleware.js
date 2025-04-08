import jwt, { decode } from "jsonwebtoken"

const accessSecretKey = process.env.ACCESSSECRETKEY;

export const authUserMiddleware = async (req) => {

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {status : 401,message : "No Token Provided"}
  }

  const token = authHeader.split(" ")[1];

  try {

    const decode = jwt.verify(token,accessSecretKey);
    return {status : 200,user : decode}
  } catch (error) {
    return { status: 403, message: "Invalid or expired token" };
  }
}