import moment from "moment";
import _ from "lodash";

moment.updateLocale("fr", {
  months: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ],
  monthsShort: [
    "jan",
    "fév",
    "mar",
    "avr",
    "mai",
    "juin",
    "juil",
    "aoû",
    "sep",
    "oct",
    "nov",
    "déc"
  ],
  weekdays: [
    "Dimanche",
    "Lundi ",
    "Mardi ",
    "Mercredi ",
    "Jeudi ",
    "Vendredi ",
    "Samedi "
  ],
  weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
});

/**
 * concatDates
 * @description
 * Concaténation intelligente de dates de début / date de fin.
 * @example
 * ["1", "jan", "2016"], ["31", "déc", "2016"] => "1 jan-31 déc 2016"
 * @param {Object} a Objet moment : date de début.
 * @param {Objet} b Objet moment : date de fin.
 * @returns {string} Chaîne des deux dates concaténées.
 */
function concatDates(a, b) {
  let weekDayFrom = formatDate(a, "ddd");
  a = formatDate(a, "D MMMM YYYY");
  b = formatDate(b, "D MMMM YYYY");

  let o = _([a.split(" "), b.split(" ")])
    .unzip()
    .thru(d => {
      let doStop = false;
      return _(d).reduceRight(
        (acc, v) => {
          if (!(v[0] === v[1] && doStop === false)) {
            doStop = true;
            acc[0].unshift(v[0]);
          }
          acc[1].unshift(v[1]);
          return acc;
        },
        [[], []]
      );
    })
    .value();
  if (o[0].length === 0) return `${weekDayFrom} ${o[1].join(" ")}`;
  return `Du ${o[0].join(" ")} au ${o[1].join(" ")}`;
}

/**
 * formateDate
 * @param {Object|null} a Objet moment : date.
 * @param {string} format Chaîne de format de date (exemple : "D MMMM YY")
 */
function formatDate(a, format) {
  return moment.isMoment(a) ? a.format(format) : null;
}

export { concatDates, formatDate };
