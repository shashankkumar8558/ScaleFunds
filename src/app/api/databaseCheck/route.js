import { dataBaseConnection } from "@/lib/database";

export async function GET() {
  try {
    await dataBaseConnection();
    return Response.json({ message : "Database is connected "})
  } catch (error) {
    return Response.json({error : "Database connection is failed"},{status : 500})
  }
}