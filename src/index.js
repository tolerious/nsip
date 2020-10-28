var sipRequest = require("./parseRequest.js");
const dgram = require("dgram");
const { request } = require("http");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  let siprequest = new sipRequest(msg);
  let str = `%c##############################Received from client##############################
${siprequest.sipString}
#############################Received end#######################################`;
  console.log(str, "color:gold");
  /**
   * 判断是什么命令
   */
  let requestType = siprequest.getRequestType();
  console.log(requestType);
  switch (requestType) {
    case "REGISTER":
      if (siprequest.sipString.includes("Authorization") > 0) {
        // 说明已经发送过401请求了， 需要发送200请求
      } else {
        console.log(".....");
        // 说明没有发送过401请求，在这里进行发送
        server.send(
          // Buffer.from(siprequest.generate401Response()),
          siprequest.generate401Response(),
          5060,
          "192.168.13.100",
          (err) => {
            console.log(`error:${err}`);
          }
        );
      }
      break;
    default:
      break;
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log(`监听${address.address},${address.port}`);
});

server.bind(5060);
