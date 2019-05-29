<script>
  import Cycles from "./Cycles.svelte";
  import moment from "moment";
  // import { pubDate } from "./prepDataCyclesReg.js";

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

  let curDate = moment()
    .startOf("day")
    .format("YYYY-MM-DD");
  let lookAheadDays;
  let regOrderFixed = false;
  let showEmptySurcycles = true;
  let showData = false;

  $: curDateValid =
    curDate ||
    moment()
      .startOf("day")
      .format("YYYY-MM-DD");

  function changeDate(e) {
    curDate = moment(curDate)
      .startOf("day")
      .add(e < 0 ? -1 : 1, "days")
      .format("YYYY-MM-DD");
  }
</script>

<style>
  h1 {
    font-size: 2.4rem;
    font-weight: 300;
    padding: 1.6rem 0;
  }
  label {
    font-size: 0.938em;
    display: inline-block;
    height: 92px;
    line-height: 48px;
    padding: 24px 6px;
    box-sizing: border-box;
    margin-bottom: 0;
  }

  button {
    font-size: 2.4rem;
    font-weight: 600;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 92px;
    background-color: #ccc;
    z-index: 2;
  }

  .container {
    margin-top: 94px;
    margin-bottom: 48px;
  }

  #datepicker:hover {
    background-color: #eee;
    cursor: ns-resize;
  }
</style>

<header>
  <label
    id="datepicker"
    on:DOMMouseScroll={e => {
      changeDate(e.deltaY);
      e.preventDefault();
    }}
    on:wheel={e => {
      changeDate(e.deltaY);
      e.preventDefault();
    }}>
    Date
    <input type="date" bind:value={curDate} />
    (
    <span
      style="text-decoration: underline; cursor: pointer;"
      on:click={e => {
        curDate = moment()
          .startOf('day')
          .format('YYYY-MM-DD');
        e.preventDefault();
      }}>
      aujourd'hui
    </span>
    )
  </label>
  <label>
    Affichage exhaustif sur
    <select bind:value={lookAheadDays}>
      <option value="0">0</option>
      <option value="6">6</option>
      <option value="13" selected>13</option>
      <option value="14">14</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="29">29</option>
      <option value="59">59</option>
      <option value="89">89</option>
    </select>
    jours
  </label>
  <label>
    Fixer l'ordre des surcycles
    <input type="checkbox" bind:checked={regOrderFixed} />
  </label>
  <label>
    Montrer les surcycles vides
    <input type="checkbox" bind:checked={showEmptySurcycles} />
  </label>
  <label>
    Voir les données
    <input type="checkbox" bind:checked={showData} />
  </label>

</header>

<div class="container">
  <h1>{moment(curDateValid).format('ddd D MMMM YYYY')}</h1>

  <Cycles
    {curDateValid}
    lookAheadDays={parseInt(lookAheadDays, 10)}
    regOrderFixed={!!regOrderFixed}
    showEmptySurcycles={!!showEmptySurcycles}
    showData={!!showData} />

</div>
