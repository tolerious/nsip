const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(msg.toString());
  console.log(typeof msg);
  console.log(rinfo);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`监听${address.address},${address.port}`);
});

server.bind(5061);
