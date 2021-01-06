class stringModifier {
  constructor(props) {}

  removeWord = (e, words) => {
    let arr = [];
    e.map(async (i) => {
      let nameBefore = i.officename;
      let name = i.officename;

      await words.map((word) => {
        let index = nameBefore.search(word);
        if (index != -1) name = nameBefore.slice(0, index);
      });

      let taluk = i.taluk;
      let state = i.statename;
      let district = i.districtname;
      let division = i.divisionname;
      let regionName = i.regionname;
      let circleName = i.circleName;

      arr.push({
        area: name.trim(),
        division: division,
        district: district,
        state: state,
        taluk: taluk,
        regionName: regionName,
        circleName: circleName,
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

export default stringModifier;
