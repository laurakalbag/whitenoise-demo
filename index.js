import { createActor, fromCallback } from "xstate";
import { machine } from "./machine";
import {
  iconPower,
  iconBulbOn,
  iconBulbOff,
  iconWaves,
  iconFan,
  iconNoise,
  iconVolumeHigh,
  iconVolumeLow,
  iconTimer,
} from "./icons.js";
import "./styles.css";

document.querySelector("#app").innerHTML = `
<h1>White noise machine</h1>
<div id="info">
  <h2 class="state-list-label">State(s):</h2>
  <ul data-states></ul>
  <h2 class="context-list-label">Context:</h2>
  <p data-context></p>
</div>
<div id="noise-maker">
  <div class="overlay"></div>
  <ul id="buttons">
    <li id="power">
      <h2 class="button-text">Power</h2>
      <button id="button-power"><span class="text">On/off</span></button>
    </li>
    <li id="light">
      <h2 class="button-text">Light</h2>
      <span class="light-indicator"></span>
      <button id="button-light"><span class="text">Light</span></button>
    </li>
    <li id="sound">
      <h2 class="button-text">Sound</h2>
      <span id="sound-indicator"></span>
      <button id="button-sound"><span class="text">Sound</span></button>
    </li>
    <li id="vol-down">
      <h2 class="button-text">Volume down</h2>
      <button id="button-vol-down"><span class="text">Volume down</span></button>
    </li>
    <li id="vol-up">
      <h2 class="button-text">Volume up</h2>
      <button id="button-vol-up"><span class="text">Volume up</span></button>
    </li>
  </ul>
</div>
<audio id="audio-player" loop>
  <p>
    Sorry your browser does not support the audio player.
  </p>
</audio>
`;

const audio = document.querySelector("#audio-player");
const powerButton = document.querySelector("#button-power");
const lightButton = document.querySelector("#button-light");
const soundButton = document.querySelector("#button-sound");
const volUpButton = document.querySelector("#button-vol-up");
const volDownButton = document.querySelector("#button-vol-down");

const noiseTrack = "noise.mp3";
const wavesTrack = "waves.mp3";
const fanTrack = "fan.mp3";

const minVolume = 1;
const maxVolume = 10;

function convertVolume(volume) {
  volume = volume / 10;
  return volume;
}

// Disable buttons
function disableButtons() {
  lightButton.setAttribute("disabled", "disabled");
  soundButton.setAttribute("disabled", "disabled");
  volUpButton.setAttribute("disabled", "disabled");
  volDownButton.setAttribute("disabled", "disabled");
  getIcons();
}

function enableButtons() {
  lightButton.removeAttribute("disabled");
  soundButton.removeAttribute("disabled");
  volUpButton.removeAttribute("disabled");
  volDownButton.removeAttribute("disabled");
  getIcons();
}

// Icons
function lightIcon(state) {
  const lightOff = state.matches({
    Light: "Light off",
  });
  if (lightOff === true) {
    lightButton.innerHTML = iconBulbOff;
  } else {
    lightButton.innerHTML = iconBulbOn;
  }
}

function soundIcon(sound) {
  const soundTrack = sound;
  if (soundTrack === "noise") {
    soundButton.innerHTML = iconNoise;
  } else if (soundTrack === "waves") {
    soundButton.innerHTML = iconWaves;
  } else if (soundTrack === "fan") {
    soundButton.innerHTML = iconFan;
  }
}

function getIcons() {
  powerButton.innerHTML = iconPower;
  volUpButton.innerHTML = iconVolumeHigh;
  volDownButton.innerHTML = iconVolumeLow;
}

function updateIcons(state) {
  lightIcon(state);
}

function setLightColour(colour) {
  if (colour === "none") {
    document.querySelector("#noise-maker").className = "";
  } else {
    document.querySelector("#noise-maker").className = colour;
  }
}

function updateSource(noiseTrack) {
  const existingSource = document.querySelector("source");
  if (existingSource != null) {
    existingSource.remove();
  }
  let source;
  source = document.createElement("source");
  source.type = "audio/mpeg";
  source.src = noiseTrack;
  audio.prepend(source);
}

function changeTrack(soundTrack) {
  const sound = soundTrack;

  if (sound === "noise") {
    updateSource(noiseTrack);
    soundIcon(sound);
  } else if (sound === "waves") {
    updateSource(wavesTrack);
    soundIcon(sound);
  } else if (sound === "fan") {
    updateSource(fanTrack);
    soundIcon(sound);
  }
}

function updateDisplayedStates(state) {
  const stateAsList = stateToList(state);
  // Display current state
  document.querySelector("[data-states]").replaceWith(stateAsList);
}

function stateToList(state) {
  const stateArray = state.configuration
    .filter((s) => s.type === "atomic" || s.type === "final")
    .map((s) => s.id);
  const list = document.createElement("ul");
  list.setAttribute("data-states", "");
  stateArray.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item.replaceAll(".", " → ");
    list.append(listItem);
  });
  return list;
}

function contextToList(state) {
  const contextArray = Object.entries(state.context);
  const contextList = document.createElement("ul");
  contextList.setAttribute("data-context", "");
  contextArray.forEach(function (item) {
    const contextItem = document.createElement("li");
    contextItem.textContent = item[0] + `: ` + item[1];
    contextList.append(contextItem);
  });
  return contextList;
}

function updateDisplayedContext(state) {
  const contextAsList = contextToList(state);
  // Display current state
  document.querySelector("[data-context]").replaceWith(contextAsList);
}

const noiseMaker = createActor(
  machine.provide({
    actions: {
      setVolume: ({ context }) => {
        const defaultVolume = convertVolume(context.volume);
        audio.volume = defaultVolume;
      },
      showButtons: ({ context, event }) => {
        enableButtons();
      },
      hideButtons: ({ context, event }) => {
        disableButtons();
      },
      removeColour: ({ context, event }) => {
        const colour = "none";
        setLightColour(colour);
      },
      setYellow: ({ context, event }) => {
        const colour = "yellow";
        setLightColour(colour);
      },
      setBlue: ({ context, event }) => {
        const colour = "blue";
        setLightColour(colour);
      },
      setGreen: ({ context, event }) => {
        const colour = "green";
        setLightColour(colour);
      },
      changeToNoise: ({ context, event }) => {
        const soundTrack = "noise";
        changeTrack(soundTrack);
      },
      changeToWaves: ({ context, event }) => {
        const soundTrack = "waves";
        changeTrack(soundTrack);
      },
      changeToFan: ({ context, event }) => {
        const soundTrack = "fan";
        changeTrack(soundTrack);
      },
      volUp: ({ context }) => {
        const upVolume = convertVolume(context.volume);
        audio.volume = upVolume;
      },
      volDown: ({ context }) => {
        const downVolume = convertVolume(context.volume);
        audio.volume = downVolume;
      },
    },
    actors: {
      audioPlayer: fromCallback(({ receive }) => {
        let playStatus = "paused";
        receive((event) => {
          if (event.type === "play") {
            playStatus = "playing";
            audio.play();
          } else if (event.type === "pause") {
            playStatus = "paused";
            audio.pause();
          }
        });
      }),
    },
    guards: {
      isNotMaxVolume: ({ context }) => {
        return context.volume < maxVolume;
      },
      isNotMinVolume: ({ context }) => {
        return context.volume > minVolume;
      },
    },
  })
);

noiseMaker.subscribe((state) => {
  updateDisplayedStates(state);
  updateDisplayedContext(state);
  updateIcons(state);
});

noiseMaker.start();

powerButton?.addEventListener("click", () => {
  noiseMaker.send({ type: "toggle power" });
});

lightButton?.addEventListener("click", () => {
  noiseMaker.send({ type: "toggle light" });
});

soundButton?.addEventListener("click", () => {
  noiseMaker.send({ type: "toggle sound" });
});

volUpButton?.addEventListener("click", () => {
  noiseMaker.send({ type: "volume up" });
});

volDownButton?.addEventListener("click", () => {
  noiseMaker.send({ type: "volume down" });
});
