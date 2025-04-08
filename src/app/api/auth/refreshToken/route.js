import { generateToken, verifyRefreshToken } from "@/lib/jwt";


export async function POST(req) {
  try {
    const {refreshToken} = await req.json();

    if (!refreshToken) {
      return new Response(JSON.stringify({message : "refreshToken is missing"}),{status:400})
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return new Response(JSON.stringify({message : "refreshToken is not valid "}),{status : 403})
    }

    const {accessToken} = generateToken(decoded);

    return new Response(JSON.stringify({accessToken}),{status:200})
  } catch (error) {
    return new Response(JSON.stringify({message : "cannot refresh you accessToken "}),{status : 500})
  }
}