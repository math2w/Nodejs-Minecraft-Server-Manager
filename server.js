const express = require("express");
const fs = require("fs");
const app = express();

app.use("/public", express.static("public"));
/* function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
} */

app.get("/", async (req, res) => {
  res.sendFile("public/html/index.html", { root: __dirname });
});

app.get("/dashboard", async (req, res) => {
  res.sendFile("public/html/dashboard.html", { root: __dirname });
});

app.get("/dashboardlogin", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  console.log(username, password);
  try {
    const userdata = fs.readFileSync("data/users.json");
    users = JSON.parse(userdata);
    console.log(users);
    console.log(username);
    console.log(password);
    const exists = users.some((item) => {
      return item.username === username && item.password === password;
    });

    if (exists) {
      console.log("userallowed");
    } else if (!exists) {
      res.status(401).sendFile("public/html/index.html", { root: __dirname });
    }
  } catch (e) {}
});

app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  let users = [];
  try {
    const usersdata = fs.readFileSync("data/users.json");
    users = JSON.parse(usersdata);

    const exists = users.some((item) => {
      // Customize this condition based on your JSON structure and the value you want to check
      return item.username === username && item.password === password; // Example: Checking if 'someKey' matches the targetValue
    });
    if (exists) {
      res.send(username);
      res.send(password);
    } else if (!exists) {
      res.status(401).send("Wrong username or password!");
    }
  } catch (e) {
    res.status(500);
  }
});

app.listen(3000);
