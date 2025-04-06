import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const {phoneNumber,email} = await req.json();

    let foundUser;

    if (phoneNumber) {
      foundUser = await prisma.user.findUnique({where: {phoneNumber}});
    }else if(email){
      foundUser = await prisma.user.findUnique({
        where : {email}
      })
    }else{
      return new Response(JSON.stringify({message: "phoneNumber or email is required to Login"}),{status: 400})
    }

    if (!foundUser) {
      return new Response(
        JSON.stringify({ message: "No user found with this email/phone number" }),
        { status: 404 }
      );
    }

    const {accessToken,refreshToken} = generateToken(foundUser);

    return new Response(JSON.stringify({
      user: foundUser,
      accessToken,
      refreshToken
    }),{status:201});
    
  } catch (error) {
    return new Response(JSON.stringify({error : "Error logging in"}),{status : 500});
  }
}