const uuid = require("uuid");
class sipRequest {
  constructor(sipString) {
    this.sipString = sipString.toString();
    this.sipStringParse2Array = this.sipString.split("\r\n");
    this.firstLine = this.sipStringParse2Array[0];
  }
  /**
   * answer 代表是“应答”
   * request 代表是“请求”
   */
  getRequestType() {
    if (this.firstLine.split(" ").includes("SIP") > 0) {
      return "answer";
    } else {
      return "request";
    }
  }
  getFromTag() {
    let fromString = this.sipStringParse2Array[2].split(";")[1].split("=")[1];
    return fromString;
  }
  getMethod() {
    let method = this.firstLine.split(" ")[0];
    return method;
  }
  getSipVersion() {
    let version = this.firstLine.split(" ")[2];
    return version;
  }
  generate401Response() {
    let firstLine = "SIP/2.0 401 Unauthorized" + "\r\n";
    let toString =
      "To: <sip:340200000013200000001@192.168.13.100:5060>" +
      "\r\n";
    let fromString =
      "From: <sip:340200000013200000001@192.168.13.100:5060>;tag=" +
      this.getFromTag() +
      "\r\n";
    let Cseq = "Cseq: 1 REGISTER" + "\r\n";
    let VIA =
      "Via: SIP/2.0/UDP 192.168.13.100:5060;rport=5060;branch=z9hG4bK" +
      uuid.v4() +
      "\r\n";
    let callID = "Call-ID: " + uuid.v4() + "@192.168.13.100" + "\r\n";
    let MaxForwards = "Max-Forwards: 70" + "\r\n";
    let wwwAuthenticate =
      `WWW-Authenticate: Digest username="34020000002000000001", realm="3402000000", nonce="bd2e4df9e3d9b280", uri="sip:64000000002000000001@192.168.13.100:5060", response="9c8411f2b96c5aef55eb136ba3f34655", algorithm=MD5` +
      "\r\n";
    let contentLength = "Content-Length: 0" + "\r\n" + "\r\n";
    return (
      firstLine +
      VIA +
      toString +
      fromString +
      Cseq +
      callID +
      MaxForwards +
      wwwAuthenticate +
      contentLength
    );
  }
  /**
   * TODO: 实现可以处理多个头域行的情况和用逗号分割的合并的单个头域行的情况。 RFC3261 7.3.1
   */
}

module.exports = sipRequest;
