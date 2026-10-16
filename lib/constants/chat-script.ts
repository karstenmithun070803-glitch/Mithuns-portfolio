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
        text: "hey, not sure if you're taking on work right now but i need a website. saw your work and it's kind of what i had in mind",
      },
      {
        sender: "mithun",
        time: "10:09",
        text: "yeah i'm free. what's the project? just give me the rough idea first",
      },
    ],
  },
  {
    label: "02 · SCOPE + PRICE",
    messages: [
      {
        sender: "you",
        time: "Day 1",
        text: "how much does something like this usually cost? i don't really know what's a normal budget for this",
      },
      {
        sender: "mithun",
        time: "Day 1",
        text: "depends on scope. i'll put together what makes sense for you — one flat number, no hourly billing.",
        file: { name: "scope.pdf", type: "doc" },
      },
      {
        sender: "you",
        time: "Day 2",
        text: "okay that's fair. let's do it",
      },
    ],
  },
  {
    label: "03 · DESIGN",
    messages: [
      {
        sender: "mithun",
        time: "Day 5",
        text: "first draft's ready. be honest about what feels off",
        file: { name: "design-v1.png", type: "image" },
      },
      {
        sender: "you",
        time: "Day 5",
        text: "wait this is already really close to what i was imagining",
        reaction: { emoji: "🔥", count: 2 },
      },
      {
        sender: "mithun",
        time: "Day 6",
        text: "good. few small things to tighten up, then we lock it",
      },
    ],
  },
  {
    label: "04 · BUILD + LAUNCH",
    messages: [
      {
        sender: "you",
        time: "Day 13",
        text: "wait is it actually live already?",
      },
      {
        sender: "mithun",
        time: "Day 13",
        text: "live since this morning. go check it on your phone",
        file: { name: "deploy.log", type: "doc" },
      },
      {
        sender: "you",
        time: "Day 13",
        text: "okay yeah that's exactly it. already sent it to three people",
      },
    ],
  },
];
