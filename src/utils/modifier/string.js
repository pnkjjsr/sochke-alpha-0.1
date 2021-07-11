export default class StringModifier {
  constructor(props) { }

  removeWord = async (string, words) => {
    let name = "";
    let nameBefore = i.officename;


    await words.map((word) => {
      let index = nameBefore.search(word);
      if (index != -1) name = nameBefore.slice(0, index);
    });

    return name;
  }

  removeWordInArr = (e, words) => {
    let arr = [];

    e.map(async (i) => {
      let nameBefore = i.officename;
      let name = "";

      await words.map((word) => {
        let index = nameBefore.search(word);
        if (index != -1) name = nameBefore.slice(0, index);
      });

      arr.push({
        office: name.trim(),
        division: i.divisionname,
        district: i.districtname,
        state: i.statename,
        taluk: i.taluk,
        region: i.regionname,
        circle: i.circlename,
      });
    });

    return arr;
  };

  currencyFormat = (e) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      compactDisplay: "long",
    }).format(e);
  };

  currencyFormatCompact = (e) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      compactDisplay: "long",
    }).format(e);
  };

  tillFirstCommaString = (e) => {
    var string = /[^,]*/.exec(e)[0];
    return string;
  };

  hyphenatedName = (e) => {
    var string = e.replace(/ /g, "-");
    return string;
  };
}
