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

  let method = siprequest.getMethod();
  console.log(`method:${method}`);
  let version = siprequest.getSipVersion();
  console.log(`version: ${version}`);
  // server.send(Buffer.from("abc"), 5060, "192.168.13.100", (err) => {
  //   console.log(err);
  // });
  // let sipBody = msg.toString();
  // console.log(`sip body:  ${sipBody}`);
  // let splitString = sipBody.split("\r\n");
  // console.log(splitString);
  // console.log(rinfo);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`监听${address.address},${address.port}`);
});

server.bind(5061);
