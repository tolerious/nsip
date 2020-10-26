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
    let toString = "To: <sip:340200000013200000001@192.168.13.100:5060>" + "\r\n";
    let fromString = "From: <sip:340200000013200000001@192.168.13.100:5060>" + "\r\n";
    let Cseq = "CSeq: 2 Response" + "\r\n";
    let callID = "Call-ID:" + "\r\n";
    let MaxForwards = "Max-Forwards: 70" + "\r\n";
    let wwwAuthenticate='WWW-Authenticate: '
  }
  /**
   * TODO: 实现可以处理多个头域行的情况和用逗号分割的合并的单个头域行的情况。 RFC3261 7.3.1
   */
}

module.exports = sipRequest;
