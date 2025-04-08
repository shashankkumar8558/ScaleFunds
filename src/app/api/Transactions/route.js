import { authUserMiddleware } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

// for Doing transaction by the user
export async function POST(req) {
  const auth = await authUserMiddleware(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify({message: "not Authorized"}),{status : auth.status})
  }

  const user = auth.user;
try {
  const {amount,type,description} = await req.json();
  console.log(amount,type,description,user.id,"dekhte hai sb sahi se aaya hai ya nai ??!!");

  const newTransaction = await prisma.transactions.create({
    data: {
      amount,
      type,
      description,
      userId : user.id
    }
  })
  
  return new Response(JSON.stringify(newTransaction),{status : 201})
} catch (error) {
  console.error(error,"transaction create nai hua ");
  
  return new Response(JSON.stringify({error : "failed to create a new transaction"}),{status: 500})
}
}

//To get all the transactions related to that user
export async function GET(req) {
  const auth = await authUserMiddleware(req);
  if (auth.status !== 200) {
    return new Response(JSON.stringify({message : "not Authorized "}),{status : auth.status})
  }

  const user = auth.user;

  try {
    
    const getTransactions = await prisma.transactions.findMany({
      where:{
        userId : user.id
      }
    });
    return new Response(JSON.stringify(getTransactions),{status : 200})
  } catch (error) {
    return new Response(JSON.stringify({error : "Failed to get Transactions History"}),{status:500})
  }
}