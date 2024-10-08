const express = require("express");
const fs = require("fs");
const app = express();
const { execSync, exec, spawn } = require("child_process");

let child;

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

let mcserver;
let servers = {};

app.get("/getservers", (req, res) => {
  // TODO: Get all current minecraft servers, then display them for the user. We can probably use something like for loops for this.

  fs.readFile("data/servers.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    // var count = Object.keys(data).length;
    let servers = [];

    try {
      if (data) {
        servers = JSON.parse(data);
        var count = Object.keys(servers).length;
        console.log(count);
        res.send(servers);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/createserver", (req, res) => {
  const servername = req.query.servername;
  const server_type = req.query.server_type;
  const server_version = req.query.server_version;

  const newServer = { servername, server_type, server_version };

  // Read the existing servers from the JSON file
  fs.readFile("data/servers.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading server data: " + err);
    }

    let servers = [];

    try {
      // If there is data in the file, parse it
      if (data) {
        servers = JSON.parse(data);
      }
    } catch (parseErr) {
      return res.status(500).send("Error parsing server data: " + parseErr);
    }

    // Append the new server to the array of servers
    servers.push(newServer);

    // Write the updated servers array back to the file
    fs.writeFile(
      "data/servers.json",
      JSON.stringify(servers, null, 2),
      (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error saving server data: " + writeErr);
        }

        res.status(200).send("Server added successfully!");
      }
    );

    // Vanilla

    if (server_type == "Vanilla") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/vanilla/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    // Paper

    if (server_type == "Paper/Bukkit") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/paper/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    // purpur

    if (server_type == "Purpur/Bukkit") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/purpur/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    // spigot
    if (server_type == "Spigot/Bukkit") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/spigot/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    // forge
    if (server_type == "Forge") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/forge/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }

    // fabric

    if (server_type == "Fabric") {
      if (!fs.existsSync(servername)) {
        fs.mkdirSync("./servers/" + servername);

        console.log("created!");
      } else {
        res.send("You cant use the same name twice!");
      }

      process.chdir("./servers/" + servername, { root: __dirname });
      const child = execSync(
        "wget -O server.jar https://mcutils.com/api/server-jars/fabric/" +
          server_version +
          "/download"
      );
      console.log("downloaded");

      fs.appendFileSync("eula.txt", "eula=true", function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    }
  });
});

// Route to display logs for a specific server
app.get("/logs", (req, res) => {
  const servername = req.query.servername;
  if (!servers[servername]) {
    return res.status(404).send("Server not running.");
  }

  res.setHeader("Content-Type", "text/html");

  // Send the logs page with input field and log output area
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Logs - ${servername}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-image: url('http://math2w.uk.to:1000/currentwebbackground/image.png');
          background-size: cover;
          color: white;
        }

        main {
          padding-top: 2%;
        }

        h1 {
          font-size: 2em;
          text-align: center;
        }

        button {
          font-size: 1em;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.123);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          color: white;
        }

        #input-container {
          margin: 20px 0;
          text-align: center;
        }

        #log-output {
          max-height: 700px;
          overflow-y: auto;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
          border-radius: 5px;
          margin: 10px 20px;
        }

        pre {
          background-color: transparent;
          margin: 0;
          color: white;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <main>
        <h1>Server Logs for ${servername}</h1>
        <div id="input-container">
          <input type="text" placeholder="Type command" id="inputtext" />
          <button id="button">Send</button>
        </div>
        <div id="log-output"></div>
      </main>
      <script>
        const input = document.getElementById("inputtext");
        const button = document.getElementById("button");
        const logOutput = document.getElementById("log-output");

        button.onclick = function() {
          const command = input.value;
          fetch('/sendcommand?servername=${servername}&cmd=' + encodeURIComponent(command))
            .then(response => response.text())
            .then(data => {
              logOutput.innerHTML += '<p><strong>Command sent:</strong> ' + command + '</p>';
              input.value = ''; // Clear the input field after sending
            });
        }

        function appendLog(data) {
          const logElement = document.createElement('pre');
          logElement.textContent = data;
          logOutput.appendChild(logElement);
          logOutput.scrollTop = logOutput.scrollHeight;
        }

        // Fetch and update logs in real-time
        const source = new EventSource('/streamlogs?servername=${servername}');
        source.onmessage = function(event) {
          appendLog(event.data);
        };

        // Clean up the event source when the page is closed
        window.onbeforeunload = function() {
          source.close();
        };
      </script>
    </body>
    </html>
  `);
});

// Route to start a specific server and stream logs
app.get("/runserver", (req, res) => {
  const servername = req.query.servername;
  const serverPath =
    "/media/files/Github Projects/Nodejs-Minecraft-Server-Manager/servers/" +
    servername;

  if (servers[servername]) {
    return res.send(`Server "${servername}" is already running.`);
  }

  process.chdir(serverPath);

  // Start the server
  const child = spawn(
    "java",
    ["-Xmx1024M", "-Xms1024M", "-jar", "server.jar"],
    {
      shell: false, // Enables shell features
      stdio: ["pipe", "pipe", "pipe"], // Use pipes for stdin, stdout, stderr
    }
  );

  servers[servername] = {
    child: child,
    logs: [], // Initialize an empty log array for the server
  };

  // Log stdout and stderr
  child.stdout.on("data", (data) => {
    console.log(data.toString());
    servers[servername].logs.push(data.toString());
  });

  child.stderr.on("data", (data) => {
    console.error(data.toString());
    servers[servername].logs.push(data.toString());
  });

  child.on("close", (code) => {
    console.log(`Server "${servername}" stopped with code ${code}`);
    delete servers[servername]; // Remove server from the list when it stops
  });

  res.send(`Server "${servername}" started.`);
});

// Stream logs for a specific server via SSE
app.get("/streamlogs", (req, res) => {
  const servername = req.query.servername;
  if (!servers[servername]) {
    return res.status(404).send("Server not running.");
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send existing logs to the client when they connect
  servers[servername].logs.forEach((log) => {
    res.write(`data: ${log}\n\n`);
  });

  const interval = setInterval(() => {
    if (servers[servername].logs.length > 0) {
      const latestLog = servers[servername].logs.pop();
      res.write(`data: ${latestLog}\n\n`);
    }
  }, 10);

  req.on("close", () => {
    clearInterval(interval);
  });
});

// Send commands to a specific server
app.get("/sendcommand", (req, res) => {
  const servername = req.query.servername;
  const command = req.query.cmd;

  if (servers[servername] && servers[servername].child) {
    servers[servername].child.stdin.write(command + "\n"); // Send command to the server
    res.send(`Command "${command}" sent to server "${servername}".`);
  } else {
    res.status(500).send(`Server "${servername}" is not running.`);
  }
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

app.listen(2000);
