import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function POST (req) {
  try {
    const {name,email,phoneNumber,password,role} = await req.json();
    
    const checkUser = await prisma.user.findFirst({
      where:{
        OR:[{email},{phoneNumber}]
      }
    })
    
    if (checkUser) {
      return new Response(JSON.stringify({message : "User already present with this email or phoneNumber"}),{status:401})
    }
    
    const newUser = await prisma.user.create({
      data : {
      name,
      email,
      phoneNumber,
      password,
      role: role === "ADMIN" ? "ADMIN" : "USER"
      }
    })
    
    const {accessToken,refreshToken} = generateToken(newUser); // passing newly created user to this function for getting token specific to this user.
    
    return new Response(JSON.stringify({
      user : newUser,
      accessToken,
      refreshToken
    }),{status:200});
  } catch (error) {
    return new Response(JSON.stringify({error : "Error creating new User"}),{status : 500})
  }
}