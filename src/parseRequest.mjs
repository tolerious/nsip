exports.sipRequest = function (sipString) {
  this.sipString = sipString;
  this.getMethod = function () {
    return sipString;
  };
};
