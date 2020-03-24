const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
 
//   res.status(503).send('Site is currently down. check back soon!!')
// })


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware: new request -> run route handler

// with Middleware: new request -> do something -> run route handler

app.listen(port, () => {
  console.log("Server is Up on port: ", port);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abe123" }, "thisismynewcourse");
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse", { expiresIn: "7 days" });
  console.log(data);
};

myFunction();
