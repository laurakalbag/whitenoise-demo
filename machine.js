import { createMachine, sendTo, assign, fromCallback } from "xstate";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHUAWBLALmABAOwHt1ZcBbAQwGMM8wA6ABQIHcwAnHAgMy4GJMCUKABtcABxbsA2gAYAuolATYWdATyKQAD0QBmAOwAWOgA4ArDJkAmM-qO7bhgDQgAnogBsARhN0zVwxMZc0Ngs11DAF9IlzQsXEJiMioaeiZWDnU6AGUCAFc8CDo47HwiEn5BEVxYfMLZBSQQZVV1TR0ELxkPKzoPfQ8LKwBOAcMLZzdPAL8rGS6uoJHDL2jYjFLEkhwKanRaRklMvBy6ouRyADc4SqFRHFqCiAbNFsw1DSaOrzMvXpMvKNxjJRgMzGYXO4ED1jP55vClsMVmsQCUEuVknsDul2JwTrknnQAGLkPC3aoPM4vJpvD7tRBdfQyOjBDz9Oa6EZmNmQxD+fR+Ey6czBQEeBwmFFospJHYpfZpI54ugAGXQUFQmFV6s1nB45Puwh1mGpSgIKnebS+iGG3UFJisdkBZhMdmGvIQwyRpn6uhkTIM4QBUo26Nlu1ShwyyrVGq1AE0wMJhCwDbgjXHTc1za1PqBvn6vHQrA4PCCfvoTEiPV7jCZff6ZIHhasYqjQzLthGFVHcVlY5q6AAhYR5MBpnAZzVZ2lW-MMjzDMymB1Irzrr1dSZQ2s+-R+gP6IOt9bxTuYyM447auN0ADibDAYDJAju6eNM5zlrz2htdpdDpOkurr6O6UyevMpiGPocy-E2hhslYIZnlsF49leyoAGoEKOpDjpcOF5HhOB5GIn4WnS1oIFYXjCn4fqOn6ALDFY-Q1n8dDQboujDF4-TggESFttKqFyliirRlk2G4fhhHERALB4ORub0tRtG+OE1j7qKLFseB66OsWoQOCs3EDIMyGbBiYmXkq6gThIGTKd+qkGHWFjWLY9iOB6-jLhMTJst0lY-NEbaEBAcCaCJ1ndrQrxfpR86dFYHoALRenQujeCsWm0UydiWWGXbytidk8AlFFzr+0IyB6gQCoEXiGFYrVlsKNhRMJHaiXFEl9j+s4-h04IeCycxeiY0FzIYwy6L5uh0Op4qDGu+49EV542ehdn4mclUqVRR7MrW2V-JWgyDB63EncK3jrgCES2JtvWlf114EoUxQ9RiB0uUdwy+Kd3iOvW3IQuB4KwqERijHNIz6Ce7YobFb29h9ZzFFcUU0ol1XfAEi2-LRFigVWpa+XYnG0V0TbckEZhdaeVnhmjGFZJ9RQkoNePDQuc19IzZgsSxnn+r5jN+DDs2gZyoxIzFrPiejMbGn9SU1WWxjWCCgPTTIs3zeBQTGB4002A9DG6C9qPK+zJwDlqjt6lw6v454-jjbrU0wQbc01jMJiukutgWIzCs-UrtmSQ7xp0ImyYsG7fOdP6y66F4TJ-E1fzCzW0F0AMTbdBnoSzUJzPFWhZUxzeg4jmOyeqc1i50MMZsRIYXel61+cCkXfris1fsV8jLMlXbu111qD5PjzVUpz4Zt9Ou-RmzIvwukbO6B8H4LHeHNtRzttfSURYBN1RgLt30R5loDR7+FNHoPb0tahO3S662FkRAA */
    context: {
      volume: 5,
    },
    id: "White noise machine",
    initial: "Power off",
    states: {
      "Power off": {
        description:
          "We need power states because \n\nbrowsers don’t like autoplaying audio.",
        entry: {
          type: "hideButtons",
        },
        on: {
          "toggle power": {
            target: "Power on",
            reenter: false,
          },
        },
      },
      "Power on": {
        entry: [
          {
            type: "showButtons",
          },
          {
            type: "setVolume",
          },
          sendTo("audioPlayer", { type: "play" }),
        ],
        exit: [
          {
            type: "hideButtons",
          },
          sendTo("audioPlayer", { type: "pause" }),
        ],
        invoke: {
          src: "audioPlayer",
          id: "audioPlayer",
        },
        states: {
          Sound: {
            initial: "White noise",
            states: {
              "White noise": {
                entry: {
                  type: "changeToNoise",
                },
                on: {
                  "toggle sound": {
                    target: "Fan",
                    reenter: false,
                  },
                },
              },
              Waves: {
                entry: {
                  type: "changeToWaves",
                },
                on: {
                  "toggle sound": {
                    target: "White noise",
                    reenter: false,
                  },
                },
              },
              Fan: {
                entry: {
                  type: "changeToFan",
                },
                on: {
                  "toggle sound": {
                    target: "White noise",
                    reenter: false,
                  },
                },
              },
            },
          },
          Light: {
            initial: "Light off",
            states: {
              "Light off": {
                entry: {
                  type: "removeColour",
                },
                on: {
                  "toggle light": {
                    target: "Yellow",
                    reenter: false,
                  },
                },
              },
              Yellow: {
                entry: {
                  type: "setYellow",
                },
                on: {
                  "toggle light": {
                    target: "Blue",
                    reenter: false,
                  },
                },
              },
              Blue: {
                entry: {
                  type: "setBlue",
                },
                on: {
                  "toggle light": {
                    target: "Green",
                    reenter: false,
                  },
                },
              },
              Green: {
                entry: {
                  type: "setGreen",
                },
                on: {
                  "toggle light": {
                    target: "Light off",
                    reenter: false,
                  },
                },
              },
            },
          },
          Volume: {
            on: {
              "volume up": {
                guard: "isNotMaxVolume",
                actions: [
                  {
                    type: "volUp",
                  },
                  assign({
                    volume: (event) => {
                      return event.context.volume + 1;
                    },
                  }),
                ],
                reenter: true,
              },
              "volume down": {
                guard: "isNotMinVolume",
                actions: [
                  {
                    type: "volDown",
                  },
                  "inline:White noise machine.Power on.Volume#volume down[-1]#transition[1]",
                ],
                reenter: true,
              },
            },
          },
        },
        on: {
          "toggle power": {
            target: "Power off",
            reenter: false,
          },
        },
        type: "parallel",
      },
    },
  },
  {
    actions: {
      showButtons: ({ context, event }) => {},

      setVolume: ({ context, event }) => {},

      hideButtons: ({ context, event }) => {},

      changeToNoise: ({ context, event }) => {},

      changeToWaves: ({ context, event }) => {},

      changeToFan: ({ context, event }) => {},

      removeColour: ({ context, event }) => {},

      setYellow: ({ context, event }) => {},

      setBlue: ({ context, event }) => {},

      setGreen: ({ context, event }) => {},

      volUp: ({ context, event }) => {},

      volDown: ({ context, event }) => {},
    },
    actors: {
      audioPlayer: fromCallback(({ sendBack, receive }) => {}),
    },
    guards: {
      isNotMaxVolume: ({ context, event, guard }) => false,

      isNotMinVolume: ({ context, event, guard }) => false,
    },
    delays: {},
  }
);
