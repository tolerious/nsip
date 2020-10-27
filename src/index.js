var sipRequest = require("./parseRequest.js");
const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  let siprequest = new sipRequest(msg);
  let str = `%c##############################Received##############################
${siprequest.sipString}
####################################################################
  `;
  console.log(str, "color:gold");

  console.log(siprequest.generate401Response());
  server.send(
    // Buffer.from(siprequest.generate401Response()),
    siprequest.generate401Response(),
    5060,
    "192.168.13.100",
    (err) => {
      console.log(err);
    }
  );
});

server.on("listening", () => {
  const address = server.address();
  console.log(`监听${address.address},${address.port}`);
});

server.bind(5060);
