import { prisma } from "@/lib/prisma";


export async function POST(req) {
try {
  const {amount,type,description} = await req.json();
  const newTransaction = await prisma.transactions.create({
    data: {
      amount,
      type,
      description
    }
  })
  
  return new Response(JSON.stringify(newTransaction),{status : 201})
} catch (error) {
  return new Response(JSON.stringify({error : "failed to create a new transaction"}),{status: 500})
}
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id");
    
    const getTransactions = await prisma.transactions.findUnique({
      where:{
        id
      }
    })
    return new Response(JSON.stringify(getTransactions),{status : 200})
  } catch (error) {
    return new Response(JSON.stringify({error : "Failed to get Transactions History"}),{status:500})
  }
}
