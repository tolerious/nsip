var sipRequest = require("./parseRequest.js");
const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(msg);
  console.log(rinfo);
});
server.on("connect", (res) => {
  console.log(res);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`监听${address.address},${address.port}`);
});

server.bind(5066);

setInterval(() => {
  console.log("....");
  let s = new sipRequest("123");
  let r = s.generate401Response();
  console.log(r);
  server.send(Buffer.from(r), 5061, "localhost", (err) => {
    console.log(err);
  });
}, 2000);
