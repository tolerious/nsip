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
  /**
   * TODO: 实现可以处理多个头域行的情况和用逗号分割的合并的单个头域行的情况。 RFC3261 7.3.1
   */
}

module.exports = sipRequest;
