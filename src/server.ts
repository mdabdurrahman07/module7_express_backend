import express, { type Request, type Response } from "express";

const app = express();
const port = 5500;

// middleware

app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("This is new server");
});

app.post("/", (req: Request, res: Response) => {
  //   console.log("this is body", req.body);
  const body = req.body;
  const { name, email, role } = body;
  res.status(201).json({
    message: "Created",
    data: {
      name,
      email,
      role,
    },
    error: false,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
