const uuid = require("uuid");
class sipRequest {
  constructor(sipString) {
    this.sipString = sipString.toString();
    this.sipStringParse2Array = this.sipString.split("\r\n");
    this.firstLine = this.sipStringParse2Array[0];
    this.username = "";
    this.clientServer = "";
  }
  /**
   * 获取请求类型
   * answer 代表是“应答”
   * request 代表是“请求”
   */
  getRequestType() {
    if (this.firstLine.split(" ").includes("SIP") > 0) {
      // 说明是响应
      return "answer";
    } else {
      //  说明是命令
      let type = this.firstLine.split(" ")[0];
      return type;
    }
  }
  /**
   * 获取向服务器发起注册的客户端的地址信息,注意只在客户端往服务器发送的消息中有效
   */
  getSipClientSipAddress() {
    let middle = this.firstLine.split(" ")[1];
    return middle;
  }
  getSipClientAddress() {
    let m = this.getSipClientSipAddress().replace("spi:", "");
    [this.username, this.clientServer] = m.split("@");
  }
  getFromeString() {
    return this.sipStringParse2Array[2];
  }
  getToString() {
    return this.sipStringParse2Array[3];
  }
  getCallID() {
    return this.sipStringParse2Array[4];
  }
  getViaBranch() {
    return this.sipStringParse2Array[1].split("=")[1];
  }
  generate401Response() {
    this.getSipClientAddress();
    let firstLine = "SIP/2.0 401 Unauthorized" + "\r\n";
    let toString = "<sip:" + this.getSipClientSipAddress() + ">" + "\r\n";
    let fromString = "<sip:" + this.getSipClientSipAddress() + ">" + "\r\n";
    let Cseq = "CSeq: 1 REGISTER" + "\r\n";
    let VIA =
      "Via: SIP/2.0/UDP 192.168.13.100:5060;rport=5060;branch=" +
      this.getViaBranch() +
      ";received=192.168.13.100" +
      "\r\n";
    let callID = this.getCallID() + "\r\n";
    let wwwAuthenticate =
      'WWW-Authenticate: Digest realm="64010000",nonce="6fe9ba44a76be22a",algorithm=MD5' +
      "\r\n";
    let contentLength = "Content-Length: 0" + "\r\n";
    let finalStr =
      firstLine +
      VIA +
      fromString +
      toString +
      Cseq +
      callID +
      wwwAuthenticate +
      contentLength +
      "\r\n";
    console.log(`#########generate 401 response#########`);
    console.log(finalStr);
    console.log(`#########end 401 response#########`);
    return finalStr;
  }
  /**
   * TODO: 实现可以处理多个头域行的情况和用逗号分割的合并的单个头域行的情况。 RFC3261 7.3.1
   */
}

module.exports = sipRequest;
