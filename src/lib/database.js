import { Client} from "pg";

const clientConfig = new Client({
  user : "postgres",
  host : "localhost",
  database : "financial_db",
  password : "8pet0@AAvA",
  port : 5432
})

export const dataBaseConnection = async () => {
  try {
    await clientConfig.connect();
    console.log("Connnection to Database is successfull");
  } catch (error) {
    console.error("Getting Error in Connection to Database : ", error);
  }
}