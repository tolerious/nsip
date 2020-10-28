const uuid = require("uuid");
class sipRequest {
  constructor(sipString) {
    this.sipString = sipString.toString();
    this.sipStringParse2Array = this.sipString.split("\r\n");
    this.firstLine = this.sipStringParse2Array[0];
    this.username = "340200000013200000001";
    this.clientServer = "192.168.13.100:5060";
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
   * username@hostname
   */
  getSipClientSipAddress() {
    let middle = this.firstLine.split(" ")[1];
    return middle;
  }
  getFromLine() {
    for (var i = 0; i < this.sipStringParse2Array.length; i++) {
      if (this.sipStringParse2Array[i].includes("From") > 0) {
        return this.sipStringParse2Array[i];
      }
    }
  }
  getToLine() {
    for (var i = 0; i < this.sipStringParse2Array.length; i++) {
      if (this.sipStringParse2Array[i].includes("To") > 0) {
        return this.sipStringParse2Array[i];
      }
    }
  }
  getViaLine() {
    for (var i = 0; i < this.sipStringParse2Array.length; i++) {
      if (this.sipStringParse2Array[i].includes("Via") > 0) {
        return this.sipStringParse2Array[i];
      }
    }
  }
  getCSeq() {
    return this.sipStringParse2Array[5];
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
  generate200Response() {
    let d = new Date();
    let yearMonthDay = d.toLocaleDateString().replace("/", "-");
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let mill = d.getMilliseconds();
    let timeString = `T${hour}:${minute}:${second}.${mill}`;
    let date = yearMonthDay + timeString;
    let str =
      `SIP/2.0 200 OK` +
      "\r\n" +
      this.getViaLine() +
      "\r\n" +
      this.getFromLine() +
      "\r\n" +
      this.getToLine() +
      "\r\n" +
      this.getCSeq() +
      "\r\n" +
      `${this.getCallID()}` +
      "\r\n" +
      `Contact: <sip:${this.username}@${this.clientServer}>` +
      "\r\n" +
      `Expires: 3600` +
      "\r\n" +
      `Date: ${date}` +
      "\r\n" +
      `Content-Length: 0` +
      "\r\n" +
      "\r\n";
    console.log(`#########generate 200 response#########`);
    console.log(str);
    console.log(`#########end 200 response#########`);
    return str;
  }
  generate401Response() {
    let firstLine = "SIP/2.0 401 Unauthorized" + "\r\n";
    let toString = "<sip:" + this.getSipClientSipAddress() + ">" + "\r\n";
    let fromString = "<sip:" + this.getSipClientSipAddress() + ">" + "\r\n";
    let Cseq = "CSeq: 1 REGISTER" + "\r\n";
    let VIA =
      "Via: SIP/2.0/UDP " +
      this.clientServer +
      ";rport=" +
      this.clientServer.split(":")[1] +
      ";branch=" +
      this.getViaBranch() +
      ";received=" +
      this.clientServer.split(":")[0] +
      "\r\n";
    let callID = this.getCallID() + "\r\n";
    let wwwAuthenticate =
      'WWW-Authenticate: Digest realm="64010000",nonce="6fe9ba44a76be22a",algorithm=MD5' +
      "\r\n";
    let contentLength = "Content-Length: 0" + "\r\n";
    let finalStr =
      firstLine +
      this.getViaLine() +
      "\r\n" +
      this.getFromLine() +
      "\r\n" +
      this.getToLine() +
      "\r\n" +
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
