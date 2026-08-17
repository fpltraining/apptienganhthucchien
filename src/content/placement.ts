/**
 * Placement test material (curriculum §4.2).
 *
 * Seven minutes, five parts, and the word "test" appears nowhere the learner
 * can see it. §4.1 is explicit: this has to feel like a short conversation, not
 * an exam, or the person it is aimed at will not finish it.
 */

export type PlacementSentence = { id: string; text: string; focusVi: string };

export type PlacementClip = {
  id: string;
  text: string;
  /** Playback speed for this rung of the ladder. */
  rate: number;
  promptVi: string;
  options: string[];
  answerIndex: number;
};

export type PlacementQuestion = {
  id: string;
  /** 1 (A0) to 4 (B1) — credit is weighted by this. */
  rung: number;
  ask: string;
  askVi: string;
};

export type PlacementRoleplayTurn = {
  id: string;
  say: string;
  sayVi: string;
  keywords: string[];
};

/** Part 2 — six sentences, difficulty rising, each drilling a known weak spot. */
export const READ_ALOUD: readonly PlacementSentence[] = [
  { id: "p-r1", text: "Good morning.", focusVi: "Câu ngắn nhất, để khởi động" },
  { id: "p-r2", text: "My name is Nam.", focusVi: "Âm cuối /m/" },
  { id: "p-r3", text: "I want two tickets, please.", focusVi: "Âm cuối /t/ và đuôi -s" },
  { id: "p-r4", text: "She asked me three times.", focusVi: "/θ/ trong 'three', cụm 'sked'" },
  { id: "p-r5", text: "The street was crowded yesterday.", focusVi: "Cụm phụ âm 'str', đuôi -ed" },
  {
    id: "p-r6",
    text: "I would have finished it if I had known.",
    focusVi: "Nối âm và âm yếu — câu khó nhất",
  },
];

/**
 * Part 3 — eight clips, speed rising from 0.75x to 1.1x.
 *
 * Two clips per rung so one lucky guess cannot promote a learner into audio
 * they cannot actually follow.
 */
export const LISTENING_LADDER: readonly PlacementClip[] = [
  {
    id: "p-l1",
    text: "My name is Linda.",
    rate: 0.75,
    promptVi: "Người đó tên gì?",
    options: ["Linda", "Lisa", "Nina"],
    answerIndex: 0,
  },
  {
    id: "p-l2",
    text: "I have two children.",
    rate: 0.75,
    promptVi: "Người đó có mấy người con?",
    options: ["Hai", "Ba", "Không có"],
    answerIndex: 0,
  },
  {
    id: "p-l3",
    text: "The bus leaves at half past seven.",
    rate: 0.85,
    promptVi: "Xe buýt chạy lúc mấy giờ?",
    options: ["7 giờ rưỡi", "7 giờ", "8 giờ rưỡi"],
    answerIndex: 0,
  },
  {
    id: "p-l4",
    text: "It costs about fifteen dollars.",
    rate: 0.85,
    promptVi: "Giá khoảng bao nhiêu?",
    options: ["15 đô", "50 đô", "5 đô"],
    answerIndex: 0,
  },
  {
    id: "p-l5",
    text: "Could you tell me where the station is?",
    rate: 1.0,
    promptVi: "Người đó đang hỏi gì?",
    options: ["Hỏi đường tới nhà ga", "Hỏi giờ tàu chạy", "Hỏi giá vé"],
    answerIndex: 0,
  },
  {
    id: "p-l6",
    text: "I'd rather meet on Thursday than on Monday.",
    rate: 1.0,
    promptVi: "Người đó thích gặp hôm nào hơn?",
    options: ["Thứ năm", "Thứ hai", "Thứ ba"],
    answerIndex: 0,
  },
  {
    id: "p-l7",
    text: "If the weather clears up, we'll head out early.",
    rate: 1.1,
    promptVi: "Họ sẽ đi sớm khi nào?",
    options: ["Khi trời tạnh", "Khi trời mưa", "Khi có xe"],
    answerIndex: 0,
  },
  {
    id: "p-l8",
    text: "She said she'd already handed in the paperwork.",
    rate: 1.1,
    promptVi: "Cô ấy nói gì?",
    options: ["Đã nộp giấy tờ rồi", "Sẽ nộp giấy tờ", "Làm mất giấy tờ"],
    answerIndex: 0,
  },
];

/** Part 4 — four open questions, rungs 1 to 4 (§4.2). */
export const OPEN_QUESTIONS: readonly PlacementQuestion[] = [
  {
    id: "p-q1",
    rung: 1,
    ask: "What is your name and where do you live?",
    askVi: "Bạn tên gì và sống ở đâu?",
  },
  { id: "p-q2", rung: 2, ask: "Tell me about your family.", askVi: "Kể về gia đình bạn." },
  { id: "p-q3", rung: 3, ask: "What did you do yesterday?", askVi: "Hôm qua bạn làm gì?" },
  {
    id: "p-q4",
    rung: 4,
    ask: "What do you want to use English for?",
    askVi: "Bạn muốn dùng tiếng Anh để làm gì?",
  },
];

/** Part 5 — three turns ordering a coffee (§4.2). */
export const PLACEMENT_ROLEPLAY: readonly PlacementRoleplayTurn[] = [
  {
    id: "p-rp1",
    say: "Hi there! What can I get you?",
    sayVi: "Chào bạn! Bạn dùng gì ạ?",
    keywords: ["coffee", "tea", "water", "like", "want", "have", "please"],
  },
  {
    id: "p-rp2",
    say: "Sure. Small or large?",
    sayVi: "Được. Cỡ nhỏ hay lớn ạ?",
    keywords: ["small", "large", "big", "medium", "one", "please"],
  },
  {
    id: "p-rp3",
    say: "That's four dollars. Anything else?",
    sayVi: "Hết bốn đô. Bạn dùng gì nữa không?",
    keywords: ["no", "thanks", "thank", "that's", "all", "yes", "also"],
  },
];
