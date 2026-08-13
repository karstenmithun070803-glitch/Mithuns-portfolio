export type ChatMessage = {
  sender: "you" | "mithun";
  time: string;
  text: string;
  file?: { name: string; type: "doc" | "image" };
  reaction?: { emoji: string; count: number };
};

export type ChatSection = {
  label: string;
  messages: ChatMessage[];
};

export const CHAT_SCRIPT: ChatSection[] = [
  {
    label: "01 · YOU REACH OUT",
    messages: [
      {
        sender: "you",
        time: "10:02",
        text: "i need a website. not a template — something custom.",
      },
      {
        sender: "mithun",
        time: "10:03",
        text: "cool. send over what you've got — mood boards, sketches, even a napkin photo. i'll take it from there.",
      },
    ],
  },
  {
    label: "02 · SCOPE + PRICE",
    messages: [
      {
        sender: "mithun",
        time: "Day 1",
        text: "here's what we're looking at. flat rate — no hourly surprises.",
        file: { name: "scope.pdf", type: "doc" },
      },
      {
        sender: "you",
        time: "Day 2",
        text: "works for me. let's go.",
      },
    ],
  },
  {
    label: "03 · DESIGN",
    messages: [
      {
        sender: "mithun",
        time: "Day 4",
        text: "first round's up. have a look and tell me what feels off.",
        file: { name: "design-v1.png", type: "image" },
      },
      {
        sender: "you",
        time: "Day 5",
        text: "honestly, this is pretty close already.",
        reaction: { emoji: "🔥", count: 2 },
      },
      {
        sender: "mithun",
        time: "Day 6",
        text: "nice. tweaking a few things, then we lock it down.",
      },
    ],
  },
  {
    label: "04 · BUILD + LAUNCH",
    messages: [
      {
        sender: "mithun",
        time: "Day 10",
        text: "design's locked. building it out now.",
      },
      {
        sender: "mithun",
        time: "Day 14",
        text: "site's live. everything's running clean — check it out.",
        file: { name: "deploy.log", type: "doc" },
      },
      {
        sender: "you",
        time: "Day 14",
        text: "smooth. already thinking about the next project.",
      },
    ],
  },
];
