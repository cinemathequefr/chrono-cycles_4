<script>
  import Cycles from "./Cycles.svelte";
  import moment from "moment";

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
  let lookAheadPonc, lookAheadReg;
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

  button {
    font-size: 1.4rem;
    text-transform: none;
    letter-spacing: normal;
    padding: 0 16px;
  }
</style>

<header
  on:DOMMouseScroll={e => {
    changeDate(e.deltaY);
    e.preventDefault();
  }}
  on:wheel={e => {
    changeDate(e.deltaY);
    e.preventDefault();
  }}>
  <label id="datepicker">
    Date
    <input type="date" bind:value={curDate} />
  </label>

  <button
    on:click={e => {
      curDate = moment(curDate)
        .startOf('day')
        .add(-1, 'day')
        .format('YYYY-MM-DD');
      e.preventDefault();
    }}>
    -1 j.
  </button>
  <button
    on:click={e => {
      curDate = moment(curDate)
        .startOf('day')
        .add(1, 'day')
        .format('YYYY-MM-DD');
      e.preventDefault();
    }}>
    +1 j.
  </button>

  <button
    on:click={e => {
      curDate = moment()
        .startOf('day')
        .format('YYYY-MM-DD');
      e.preventDefault();
    }}>
    Aujourd'hui
  </button>

  <label>
    Lookahead : cycles ponctuels
    <select bind:value={lookAheadPonc}>
      <option value="0">0</option>
      <option value="6">7</option>
      <option value="13">14</option>
      <option value="21" selected>21</option>
      <option value="28">28</option>
      <option value="120">120</option>
    </select>
    j.
  </label>
  <label>
    cycles réguliers
    <select bind:value={lookAheadReg}>
      <option value="0">0</option>
      <option value="6">6</option>
      <option value="13" selected>13</option>
      <option value="20">20</option>
      <option value="27">27</option>
      <option value="120">120</option>
    </select>
    j.
  </label>
  <!---
  <label>
    Fixer l'ordre des surcycles
    <input type="checkbox" bind:checked={regOrderFixed} />
  </label>
  <label>
    Montrer les surcycles vides
    <input type="checkbox" bind:checked={showEmptySurcycles} />
  </label>
  -->
  <label>
    Voir les données
    <input type="checkbox" bind:checked={showData} />
  </label>

</header>

<div class="container">
  <h1>{moment(curDateValid).format('ddd D MMMM YYYY')}</h1>

  <Cycles
    {curDateValid}
    lookAheadPonc={parseInt(lookAheadPonc, 10)}
    lookAheadReg={parseInt(lookAheadReg, 10)}
    showData={!!showData} />

</div>
