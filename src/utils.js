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
 * @param {Object|null} a Objet moment : date de début. (NOTE : Actuellement, ne prend pas en compte les cas où la date de début se serait pas fourni.)
 * @param {Objet|null} b Objet moment ou valeur `null` : date de fin.
 * @returns {string} Chaîne des deux dates concaténées.
 * @todo Pouvoir passer `separators` en paramètre.
 */
function concatDates(a, b) {

  a = formatDate(a, "D MMMM YYYY");
  b = formatDate(b, "D MMMM YYYY");

  let separators = ["Du ", " au ", "À partir du ", "Jusqu'au ", ""];

  if (a === b) {
    return separators[4] + a;
  }

  if (a && b) {
    a = a.split(" ");
    b = b.split(" ");
    let b2 = _.clone(b);
    let i = a.length - 1;
    if (a[i] === b[i] && i > -1) {
      i--;
      a.pop();
      b.pop();
      concatDates(a, b);
    }
    return a.length === 0 ?
      b2.join(" ") :
      separators[0] + [a.join(" "), b2.join(" ")].join(separators[1]);
  }

  if (a && !b) {
    return separators[2] + a;
  }
}

/**
 * formateDate
 * @param {Object|null} a Objet moment : date.
 * @param {string} format Chaîne de format de date (exemple : "D MMMM YY")
 */
function formatDate(a, format) {
  return moment.isMoment(a) ? a.format(format) : null;
}

export {
  concatDates,
  formatDate
}