import { prisma } from "@/lib/prisma";

export async function POST (req) {
  try {
    const {name,email,phoneNumber,password} = await req.json();
    const checkUser = await prisma.user.findUnique({
      where:{
       OR:[{email,phoneNumber}]
      }
    })
    if (checkUser) {
      return new Response(JSON.stringify({message : "User already present with this email or phoneNumber"}),{status:400})
    }
    const newUser = await prisma.user.create({
      name,
      email,
      phoneNumber,
      password
    })
    
    return new Response(JSON.stringify(newUser),{status:200});
  } catch (error) {
    return new Response(JSON.stringify({error : "Error creating new User"}),{status : 500})
  }
}