<script>
  import { onMount } from "svelte";
  import { prepData } from "./prepData.js";
  import { concatDates, formatDate } from "./utils.js";
  export let curDateValid, lookAheadReg, lookAheadPonc, showData;
  import _ from "lodash";

  let data = [];
  let idPinned = null;
  let dataPinned = [];

  $: dataDisplay = prepData(data, curDateValid, idPinned, {
    lookAheadPonc: lookAheadPonc,
    lookAheadReg: lookAheadReg
  });

  onMount(async () => {
    let dataPonc = await (await fetch(
      "https://gist.githubusercontent.com/nltesown/e0992fae1cd70e5c2a764fb369ea6515/raw/cycles.json"
    )).json();

    let dataReg = await (await fetch(
      "https://gist.githubusercontent.com/nltesown/a310518cfa88cd52b13a55f3e737d75f/raw/cycles-ext-2.json"
    )).json();

    // NOTICE: je retire manuellement l'item Fellini/Picasso (= exposition)
    dataPonc = _(dataPonc)
      .filter(b => b.idCycle !== 442)
      .value();

    data = [dataPonc, dataReg];
    // console.log("Cycles mounted");
  });
</script>

<style>
  .cycles-container {
    margin-top: 24px;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .zone-a {
    position: relative;
    display: block;
    float: left;
    width: calc(66.67% - 4px);
    height: 304px;
    margin: 2px;
    padding: 6px;
    background-color: #936;
    color: #fff;
    box-sizing: border-box;
    text-decoration: inherit;
  }

  .zone-b {
    position: relative;
    display: block;
    float: left;
    width: calc(33.33% - 4px);
    height: 304px;
    margin: 2px;
    padding: 6px;
    background-color: #963;
    color: #fff;
    box-sizing: border-box;
    text-decoration: inherit;
  }

  .zone-c,
  .zone-d {
    position: relative;
    display: block;
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: #fff;
    box-sizing: border-box;
    text-decoration: inherit;
  }

  .cycle {
    position: relative;
    display: block;
    float: left;
    width: calc(33.33% - 4px);
    height: 150px;
    margin: 2px;
    padding: 6px;
    background-color: #396;
    color: #fff;
    box-sizing: border-box;
    text-decoration: inherit;
  }

  .cycle.reg {
    background-color: #369;
  }

  .pin {
    display: block;
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    opacity: 0;
    transition: 0.05s;
    cursor: pointer;
  }

  .cycle:hover .pin {
    opacity: 0.75;
  }

  .pin:hover {
    transform: translateY(2px);
    opacity: 1 !important;
  }

  .pin.pinned {
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;
    opacity: 1;
  }

  .pinned:hover {
    transform: translateY(-2px) !important;
  }

  .icon-pin {
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 312 312'%3E %3Cpath fill='%23fff' d='M309.713,112.829L199.08,2.196C197.674,0.79,195.766,0,193.777,0c-1.989,0-3.896,0.79-5.303,2.196 c-5.904,5.903-9.186,13.729-9.241,22.035c-0.042,6.201,1.72,12.114,5.034,17.152l-91.088,71.15 c-2.628-1.51-6.215-2.701-10.994-2.701c-14.604,0-34.842,11.169-52.82,29.147c-2.929,2.929-2.929,7.677,0,10.606l51.691,51.69 l-55.205,55.204c-0.494,0.494-0.916,1.054-1.256,1.664L0.942,300.771c-1.624,2.928-1.112,6.576,1.255,8.943 c1.443,1.443,3.363,2.196,5.306,2.196c1.243,0,2.495-0.309,3.637-0.942l42.624-23.654c0.609-0.339,1.17-0.761,1.664-1.254 l55.205-55.206l51.69,51.69c1.464,1.464,3.384,2.196,5.304,2.196c1.918,0,3.838-0.732,5.303-2.196 c20.877-20.877,35.569-48.381,26.459-63.829l71.139-91.073c4.98,3.274,10.818,5.035,16.941,5.036c0.001,0,0.001,0,0.002,0 c8.384,0,16.284-3.282,22.243-9.241C312.642,120.507,312.642,115.759,309.713,112.829z M45.564,274.709l-18.791,10.428 l10.428-18.792l54.463-54.46l8.361,8.362L45.564,274.709z M167.476,266.483L45.426,144.434 c15.059-13.426,29.252-19.601,36.76-19.601c1.104,0,3.1,0.145,4.066,1.111l99.714,99.714 C189.619,229.313,184.943,246.893,167.476,266.483z M189.072,207.552l-84.715-84.715l90.086-70.369l64.998,64.998L189.072,207.552z M287.47,117.678c-0.001,0-0.001,0-0.001,0c-4.258,0-8.244-1.642-11.224-4.622l-77.39-77.391c-3.01-3.009-4.651-7.033-4.623-11.333 c0.012-1.708,0.286-3.38,0.804-4.967l97.509,97.51C290.925,117.403,289.217,117.678,287.47,117.678z'/%3E %3C/svg%3E");
  }

  .surcycle {
    background-color: #147;
  }

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.4rem;
  }

  .surcycle-title {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 2.4rem;
  }

  .progress {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 8px;
    background-color: #000;
    opacity: 0.25;
  }

  .info {
    position: absolute;
    bottom: 6px;
    left: 4px;
    font-size: 1em;
    /* font-weight: 300; */
  }

  .soon {
    position: absolute;
    bottom: 4px;
    right: 4px;
    border: solid 2px #fff;
    border-radius: 1000px;
    width: 65px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    opacity: 0.75;
    font-size: 0.938em;
    text-transform: uppercase;
  }
</style>

{#if showData}
  <pre>
    <code>{JSON.stringify(dataDisplay, null, 2)}</code>
  </pre>
{:else}
  <div class="cycles-container">
    <div class="zone-a">
      {#if dataDisplay.zoneA}
        {#if dataDisplay.isPinned}
          <div
            class="pin pinned icon-pin"
            on:click={e => {
              idPinned = null;
            }} />
        {/if}
        {#if dataDisplay.zoneA.surcycle}
          <div class="surcycle-title">{dataDisplay.zoneA.surcycle}</div>
        {/if}
        {#if dataDisplay.zoneA.title}
          <div class="title">{dataDisplay.zoneA.title}</div>
        {/if}
        {#if dataDisplay.zoneA.dateFrom || dataDisplay.zoneA.dateTo}
          <div>
            {concatDates(dataDisplay.zoneA.dateFrom, dataDisplay.zoneA.dateTo)}
          </div>
        {:else if dataDisplay.zoneA.date}
          <div>{formatDate(dataDisplay.zoneA.date, 'D MMM YYYY')}</div>
        {/if}
        <div
          class="progress"
          style="width:{dataDisplay.zoneA.progressPositive}%;" />
        <div class="info">
          {#if dataDisplay.zoneA.progress}{dataDisplay.zoneA.progress}% /{/if}
          J{`${dataDisplay.zoneA.startsIn <= 0 ? '+' : ''}${-dataDisplay.zoneA.startsIn}`}
        </div>
        {#if dataDisplay.zoneA.startsIn > 0}
          <div class="soon">À venir</div>
        {/if}
      {/if}
    </div>
    <div class="zone-b" />

    <div class="zone-c">
      {#each dataDisplay.zoneC as cycle, i}
        <div class="cycle">
          <div
            data-id={cycle.idCycleProg}
            class="pin icon-pin"
            on:click={e => {
              idPinned = e.target.dataset.id;
              console.log(idPinned);
            }} />
          <div class="title">{cycle.title}</div>
          <div>{concatDates(cycle.dateFrom, cycle.dateTo)}</div>
          <div class="progress" style="width:{cycle.progressPositive}%;" />

          <div class="info">
            {cycle.progress}% / J{`${cycle.startsIn <= 0 ? '+' : ''}${-cycle.startsIn}`}
          </div>

          {#if cycle.startsIn > 0}
            <div class="soon">À venir</div>
          {/if}
          <!-- {#if cycle.startsIn >= 0}
            <div class="soon">J-{cycle.startsIn}</div>
          {/if} -->

        </div>
      {/each}
    </div>
    <div class="zone-d">
      {#each dataDisplay.zoneD as cycle, i}
        <div class="cycle reg {cycle.type === 'surcycle' ? 'surcycle' : ''}">

          <div
            data-id={cycle.id}
            class="pin icon-pin"
            on:click={e => {
              console.log(idPinned);
              idPinned = e.target.dataset.id;
            }} />
          <div class="surcycle-title">{cycle.surcycle}</div>
          {#if cycle.title}
            <div class="title">{cycle.title}</div>
          {/if}
          {#if cycle.dateFrom || cycle.dateTo}
            <div>{concatDates(cycle.dateFrom, cycle.dateTo)}</div>
          {:else if cycle.date}
            <div>{concatDates(cycle.date, cycle.date)}</div>
          {/if}

          {#if cycle.startsIn >= 0}
            <div class="info">J-{cycle.startsIn}</div>
            <!-- <div class="soon">J-{cycle.startsIn}</div> -->
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
