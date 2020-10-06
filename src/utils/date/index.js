var moment = require("moment");

export default class Date {
  constructor() { }

  format = (e, type) => {
    let formated = null;
    switch (type) { //full
      case "full":
        formated = moment(e).format("dddd, DD MMMM YYYY");
        break;
      default:
        formated = moment(e).format("ddd, DD MMMM");
        break;
    }

    return formated;
  };

  dob = e => {
    let dob = {};
    dob.date = moment(e).format("D");
    dob.month = moment(e).format("MMMM");
    dob.year = moment(e).format("YYYY");
    return dob;
  };
}
