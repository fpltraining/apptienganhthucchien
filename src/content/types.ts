/**
 * Content library shapes.
 *
 * This is the one part of the data model with no `accountId` — the same content
 * serves both learners, read-only (curriculum §13.1).
 */

/**
 * A vocabulary card.
 *
 * The unit is a phrase with context, not a word with a translation (§8.1): the
 * learner does not need to recall a definition, they need the whole phrase to
 * come out in about a second.
 */
export type VocabItem = {
  id: string;
  week: number;
  /** What the learner must be able to say. */
  phrase: string;
  meaningVi: string;
  /** Where this is used, shown as context rather than a rule. */
  situation: string;
  /** One of the 100 fixed chunks that carry most of the value (§8.2). */
  isCoreChunk: boolean;
};

export type ListeningLine = {
  speaker: string;
  text: string;
  /**
   * Voice for this one line, overriding the week's. Only the accent gauntlet
   * needs it — a passage where each speaker has a different accent is the whole
   * exercise, not decoration.
   */
  lang?: string;
};

export type ListeningQuestion = {
  /** Asked in Vietnamese so the test is of listening, not of reading English. */
  promptVi: string;
  options: string[];
  answerIndex: number;
};

/**
 * One listening passage, heard three times with three different tasks (§5.2) —
 * gist, then detail, then the exact words.
 */
export type ListeningPassage = {
  id: string;
  week: number;
  titleVi: string;
  lines: ListeningLine[];
  /** Round 1: what is happening at all. */
  gist: ListeningQuestion;
  /** Round 2: the specifics — numbers, times, names. */
  detail: ListeningQuestion[];
  /** Round 3: gaps in the transcript, in order of appearance. */
  gaps: { before: string; answer: string; after: string }[];
};

export type ShadowingLine = {
  id: string;
  text: string;
  /** The sound this line drills, from the week's pronunciation focus (§9.1). */
  focusVi: string;
};

/**
 * A scripted role-play turn.
 *
 * Zone A of the hybrid design (§12.1): fixed branches, no model call, works
 * offline and costs nothing. Branching is by keyword rather than exact match,
 * which is what keeps a fixed script from feeling like a fill-in-the-blank
 * exercise (§12.2).
 */
export type RoleplayTurn = {
  id: string;
  /** What the app's character says, in English. */
  say: string;
  /** Vietnamese gloss, shown only if the learner asks for help. */
  sayVi: string;
  /** Suggested replies, revealed by the "Gợi ý" button. */
  hints: string[];
  branches: {
    /** Any one of these words in the reply selects this branch. */
    keywords: string[];
    next: string | null;
  }[];
  /** Taken when nothing matches — the character asks again more slowly. */
  fallbackNext: string | null;
};

export type RoleplayScript = {
  id: string;
  week: number;
  /** The situation, named the way the learner would name it. */
  titleVi: string;
  /** What counts as succeeding at this conversation. */
  goalVi: string;
  startTurnId: string;
  turns: RoleplayTurn[];
  /**
   * How much of a hint to show — the scaffolding comes away as the phases go on
   * (§ giai đoạn 2: weeks 9–11 whole sentences, 12–14 keywords, 15–17 nothing).
   *
   * `hints` always holds whole sentences whatever this says. They are the
   * tappable replies when the microphone is unavailable, and a learner cannot
   * tap "gate" to mean "has the gate changed?". This setting governs the hint
   * panel only.
   */
  hintLevel?: "sentence" | "keyword" | "none";
  /**
   * A turn the other person may divert to instead of the scripted one, from
   * week 12 (§ giai đoạn 2: 20% khả năng lệch kịch bản).
   *
   * Taken at most once per conversation, and it must lead back into the script
   * — the point is that something unexpected happens and the conversation
   * carries on, not that the learner is dropped somewhere new.
   */
  surpriseTurnId?: string;
};

export type WeekContent = {
  week: number;
  titleVi: string;
  /** The week's pronunciation target (§9.1). */
  pronunciationFocusVi: string;
  vocabulary: VocabItem[];
  listening: ListeningPassage;
  shadowing: ShadowingLine[];
  roleplay: RoleplayScript;
  /**
   * How long the learner gets to start answering (§giai đoạn 3, chế độ đồng hồ:
   * 8s → 6s → 5s → 3s across weeks 18–23).
   *
   * Unset means the default eight seconds. This is pressure, not a pass mark:
   * running out still records an attempt and the lesson carries on, because
   * §9.3's rule that nothing gates the lesson does not stop applying in phase 3.
   */
  responseDeadlineMs?: number;
  /**
   * BCP-47 tag for the voice this week speaks with, e.g. "en-IN", "en-GB",
   * "en-AU". Unset means the device default.
   *
   * The accent work (§giai đoạn 3) is what the curriculum calls the difference
   * between understanding the app and understanding people. A device with no
   * matching voice simply speaks in its own — an accent the learner cannot hear
   * is not worth failing a lesson over.
   */
  voiceLang?: string;
};
