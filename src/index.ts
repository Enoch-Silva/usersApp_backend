import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/users";

const app = express();
const port = process.env.PORT || 3300;

const allowedOrigins = "*";
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use("/", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Bem Vindo a usersApp Mr. Enoch Silva!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
