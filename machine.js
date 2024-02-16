import { createMachine, sendTo, assign, fromCallback } from "xstate";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHUAWBLALmABAOwHt1ZcBbAQwGMM8wA6ABQIHcwAnHAgMy4GJMCUKABtcABxbsA2gAYAuolATYWdATyKQAD0QBmAOwBWOjMMA2ABwAmACwWAnGZk37ARgA0IAJ6In9uvr6Di4u5pb6AL4RnmhYuITEZFQ09EysHOp0AMoEAK54EHSx2PhEJPyCIriweQWyCkggyqrqmjoIrjK6VnR2MoFm5lYWZla6nj4Ioz36jiM2dmOzhlExGCUJJDgU1Oi0jJIZeNm1hcjkAG5wFUKiODX5EPWazZhqGo3tFs50Vvb2hkMrjMnSCrn0E0QNkMM3sVhhdhstn0nRsqxAxXiZSSu32aXYnGOOUedAAYuQ8DcqvdTs9Gq93m1EK4bP06GZWfozGZAvYLLpTJCEEjdHRdK43JYxhZDLpDM50ZjSoltsk9qlDoS6AAZdBQVCYHV6g2cHhUu7CY2YOlKAgqN6tT6ICz89lWIIyAH82WuKxCvk2OjgywGKzuqyuX2K9ZYlU7FIHdJa3X6w0ATTAwmELHNuEtqZtTTtLQ+oHavsM+jo-0rAt9MlM9nG3kQAaDXP5+jDXcjVmjcWVW3j6sTBMyKYNdAAQsJcmBczh8wbCwzHWXmWZumLN4MZINBhZ9DZ-RZA8HO92I1HohiY4OcQn8Ucjam6ABxNhgMCUgS3PNWldiwdUttGdV1Rg9L05XFP0WwQYIg35ew7DhCC7H7DZsVVXENSTTIADUCFnUh5wuIjchInBcjEQD7UZJ0ECsUxA30cVK0jJtI0Mf1OnZGRXAsATwicaEMNjIc1TxTUCPIkjeDI4jcAgFg8FoksmUY5iAjYlEJXFVxuLgyMWV+YERi5eEbAMlYbyVTYHxHJ9CQXCR0jU4CNIMYxTClFCRLcIUgX8IInBBCUbFY2wohvQgIDgTQ7Kw4daBeID6PXDpYMmABaesTBcXt-iPeUZTE+9sMfaSeFSui11AqYZCFPoTHsVjiuGDrgTK+yKsc6SQNXED2kMCKTE9exxs6QFKyFLd9E9VkXBRVluV0bqksk3CxyJU4avUhjWOMXRrCCOEHHmrK9EjMU+V0O7wThKxuRstYBx65KtufYkCiKO97L2jyDtdY73QcYZWpkS6EEBKsrOhUx+IRCL1rjTbRy+04ikueL6TSurywrAJ+QlcHzv4pqZAsAIRpGCDWt0SwzBRiScPRrVvsKckBrxobmQZmQAkZziglCDw4MBAWuzMNwjFDaE1tsv6NtZpzxytAH0vqwwATG-5JtMGGhVmMw6BOuURM9PTmYcqS8OOCdDQd00uA1-HfBsUUGz1-4psNuC3Cp2YFkCLkGws63ett7aX0nDMsxYV3eY6ZxA341xdGhCNWv+ZtJmQgX05l2ng5RCOPrZtXXxnOdE40lkBLFWYnsrcxui5f1WSDXQi+5EvXDLtHVftq130-b9a4Yh6ZgioS-mGQFc9bBug4igYw9GAeVf6uhCMUieMolBuEUpnkkWhAEhUjblfn6Y7WQml0BOiiIgA */
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
                    target: "Fan",
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
                    target: "Waves",
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
