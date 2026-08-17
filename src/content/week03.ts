/**
 * Tuần 3 — Gia đình & công việc (curriculum §7).
 *
 * Trọng tâm phát âm: đuôi -s số nhiều, ba cách đọc /s/ /z/ /ɪz/. Tiếng Việt
 * không có phụ âm cuối kiểu này nên đuôi -s hay bị nuốt mất; nuốt một lần thì
 * người ta vẫn hiểu, nhưng nuốt cả câu thì nghe rời rạc.
 */

import type { WeekContent } from "./types";

export const week03: WeekContent = {
  week: 3,
  titleVi: "Gia đình & công việc",
  pronunciationFocusVi: "Đuôi -s: /s/ (works), /z/ (lives), /ɪz/ (nurses)",

  vocabulary: [
    {
      id: "w3-how-many-children",
      week: 3,
      phrase: "How many children do you have?",
      meaningVi: "Bạn có mấy người con?",
      situation: "Hỏi về gia đình",
      isCoreChunk: true,
    },
    {
      id: "w3-i-have-two",
      week: 3,
      phrase: "I have two children.",
      meaningVi: "Tôi có hai người con.",
      situation: "Nói về con cái",
      isCoreChunk: true,
    },
    {
      id: "w3-a-son-and-a-daughter",
      week: 3,
      phrase: "A son and a daughter.",
      meaningVi: "Một trai một gái.",
      situation: "Nói rõ hơn về con",
      isCoreChunk: false,
    },
    {
      id: "w3-my-son-works",
      week: 3,
      phrase: "My son works in Hanoi.",
      meaningVi: "Con trai tôi làm việc ở Hà Nội.",
      situation: "Kể con mình làm ở đâu",
      isCoreChunk: false,
    },
    {
      id: "w3-my-daughter-lives",
      week: 3,
      phrase: "My daughter lives with us.",
      meaningVi: "Con gái tôi sống với vợ chồng tôi.",
      situation: "Kể về nhà mình",
      isCoreChunk: false,
    },
    {
      id: "w3-are-you-married",
      week: 3,
      phrase: "Are you married?",
      meaningVi: "Bạn lập gia đình chưa?",
      situation: "Hỏi thăm — hỏi nhẹ nhàng thôi",
      isCoreChunk: false,
    },
    {
      id: "w3-yes-im-married",
      week: 3,
      phrase: "Yes, I'm married.",
      meaningVi: "Rồi, tôi có gia đình rồi.",
      situation: "Trả lời về tình trạng hôn nhân",
      isCoreChunk: false,
    },
    {
      id: "w3-this-is-my-son",
      week: 3,
      phrase: "This is my son, Minh.",
      meaningVi: "Đây là con trai tôi, Minh.",
      situation: "Giới thiệu người nhà",
      isCoreChunk: true,
    },
    {
      id: "w3-what-do-you-do",
      week: 3,
      phrase: "What do you do?",
      meaningVi: "Bạn làm nghề gì?",
      situation: "Hỏi nghề nghiệp — câu chuẩn, không cần dài dòng",
      isCoreChunk: true,
    },
    {
      id: "w3-im-a-teacher",
      week: 3,
      phrase: "I'm a teacher.",
      meaningVi: "Tôi là giáo viên.",
      situation: "Nói nghề của mình",
      isCoreChunk: true,
    },
    {
      id: "w3-i-was-a-driver",
      week: 3,
      phrase: "I was a driver before.",
      meaningVi: "Trước đây tôi làm tài xế.",
      situation: "Kể nghề cũ",
      isCoreChunk: false,
    },
    {
      id: "w3-im-retired-now",
      week: 3,
      phrase: "I'm retired now.",
      meaningVi: "Giờ tôi nghỉ hưu rồi.",
      situation: "Nói mình đã nghỉ hưu",
      isCoreChunk: true,
    },
    {
      id: "w3-where-do-you-work",
      week: 3,
      phrase: "Where do you work?",
      meaningVi: "Bạn làm việc ở đâu?",
      situation: "Hỏi nơi làm việc",
      isCoreChunk: true,
    },
    {
      id: "w3-i-work-in-a-hospital",
      week: 3,
      phrase: "I work in a hospital.",
      meaningVi: "Tôi làm ở bệnh viện.",
      situation: "Nói nơi làm việc",
      isCoreChunk: false,
    },
    {
      id: "w3-how-long",
      week: 3,
      phrase: "How long have you worked there?",
      meaningVi: "Bạn làm ở đó bao lâu rồi?",
      situation: "Hỏi sâu thêm một chút",
      isCoreChunk: false,
    },
    {
      id: "w3-for-ten-years",
      week: 3,
      phrase: "For ten years.",
      meaningVi: "Được mười năm rồi.",
      situation: "Trả lời về thời gian",
      isCoreChunk: false,
    },
    {
      id: "w3-do-you-like-your-job",
      week: 3,
      phrase: "Do you like your job?",
      meaningVi: "Bạn có thích công việc không?",
      situation: "Câu hỏi mở, giữ cho hội thoại chạy tiếp",
      isCoreChunk: true,
    },
    {
      id: "w3-yes-i-like-it",
      week: 3,
      phrase: "Yes, I like it a lot.",
      meaningVi: "Có, tôi thích lắm.",
      situation: "Trả lời tích cực",
      isCoreChunk: true,
    },
    {
      id: "w3-its-hard-work",
      week: 3,
      phrase: "It's hard work, but I like it.",
      meaningVi: "Việc vất vả, nhưng tôi thích.",
      situation: "Trả lời thật lòng hơn một chút",
      isCoreChunk: false,
    },
    {
      id: "w3-my-wife-is-a-nurse",
      week: 3,
      phrase: "My wife is a nurse.",
      meaningVi: "Vợ tôi là y tá.",
      situation: "Kể về người nhà làm nghề gì",
      isCoreChunk: false,
    },
    {
      id: "w3-i-have-grandchildren",
      week: 3,
      phrase: "I have three grandchildren.",
      meaningVi: "Tôi có ba đứa cháu.",
      situation: "Khoe cháu — chuyện dễ nói nhất với người lớn tuổi",
      isCoreChunk: false,
    },
    {
      id: "w3-they-live-far",
      week: 3,
      phrase: "They live far from here.",
      meaningVi: "Chúng nó ở xa đây.",
      situation: "Nói về khoảng cách",
      isCoreChunk: false,
    },
    {
      id: "w3-i-miss-them",
      week: 3,
      phrase: "I miss them.",
      meaningVi: "Tôi nhớ chúng nó.",
      situation: "Nói cảm xúc — ngắn mà thật",
      isCoreChunk: false,
    },
    {
      id: "w3-tell-me-about-your-family",
      week: 3,
      phrase: "Tell me about your family.",
      meaningVi: "Kể tôi nghe về gia đình bạn đi.",
      situation: "Mời người ta nói — câu vàng để không phải nói nhiều",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w3-listen-family",
    week: 3,
    titleVi: "Nói chuyện gia đình ở công viên",
    lines: [
      { speaker: "Anna", text: "Hello, Hung! Is this your family?" },
      { speaker: "Hung", text: "Yes. This is my son, Minh. He works in Hanoi." },
      { speaker: "Anna", text: "Nice! And what do you do?" },
      { speaker: "Hung", text: "I was a driver before. I'm retired now." },
      { speaker: "Anna", text: "I see. I work in a hospital. My wife is a nurse too." },
      { speaker: "Hung", text: "Do you like your job?" },
      { speaker: "Anna", text: "It's hard work, but I like it a lot." },
    ],
    gist: {
      promptVi: "Hai người đang nói về chuyện gì?",
      options: ["Gia đình và công việc", "Giá cả ngoài chợ", "Thời tiết cuối tuần"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Con trai ông Hùng làm việc ở đâu?",
        options: ["Hà Nội", "Đà Nẵng", "Sài Gòn"],
        answerIndex: 0,
      },
      {
        promptVi: "Trước đây ông Hùng làm nghề gì?",
        options: ["Tài xế", "Giáo viên", "Y tá"],
        answerIndex: 0,
      },
      {
        promptVi: "Anna nghĩ gì về công việc của mình?",
        options: ["Vất vả nhưng thích", "Nhàn nhưng chán", "Muốn nghỉ việc"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "This is my son, Minh. He", answer: "works", after: "in Hanoi." },
      { before: "I was a", answer: "driver", after: "before." },
      { before: "My wife is a", answer: "nurse", after: "too." },
    ],
  },

  shadowing: [
    {
      id: "w3-sh-1",
      text: "He works in Hanoi.",
      focusVi: "Đuôi 'works' đọc /s/ — nghe như tiếng rắn kêu",
    },
    {
      id: "w3-sh-2",
      text: "She lives with us.",
      focusVi: "Đuôi 'lives' đọc /z/ — có rung cổ họng",
    },
    {
      id: "w3-sh-3",
      text: "The nurses finish at six.",
      focusVi: "Đuôi 'nurses' đọc /ɪz/ — thành một âm riêng",
    },
    {
      id: "w3-sh-4",
      text: "I have three grandchildren.",
      focusVi: "Âm 'th' trong 'three' — lưỡi ra giữa răng",
    },
    {
      id: "w3-sh-5",
      text: "It's hard work, but I like it.",
      focusVi: "Bật rõ 'd' cuối trong 'hard' và 'k' cuối trong 'work'",
    },
  ],

  roleplay: {
    id: "w3-rp-newfriend",
    week: 3,
    titleVi: "Kể về gia đình với người mới quen",
    goalVi: "Nói được mình có mấy con, làm nghề gì, và hỏi lại người ta",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "So, tell me about your family. Do you have children?",
        sayVi: "Kể tôi nghe về gia đình bạn đi. Bạn có con chưa?",
        hints: ["I have two children.", "Yes, a son and a daughter."],
        branches: [
          {
            keywords: ["children", "child", "son", "daughter", "two", "three", "yes"],
            next: "ask-work",
          },
        ],
        fallbackNext: "repeat-children",
      },
      {
        id: "repeat-children",
        say: "Sorry — how many children do you have?",
        sayVi: "Xin lỗi — bạn có mấy người con?",
        hints: ["I have two children."],
        branches: [
          {
            keywords: ["children", "child", "one", "two", "three", "son", "daughter"],
            next: "ask-work",
          },
        ],
        fallbackNext: "ask-work",
      },
      {
        id: "ask-work",
        say: "That's lovely. And what do you do?",
        sayVi: "Hay quá. Còn bạn làm nghề gì?",
        hints: ["I'm retired now.", "I was a driver before."],
        branches: [
          { keywords: ["retired", "teacher", "driver", "work", "was", "job"], next: "ask-back" },
        ],
        fallbackNext: "repeat-work",
      },
      {
        id: "repeat-work",
        say: "Could you say that again? What is your job?",
        sayVi: "Bạn nói lại được không? Bạn làm nghề gì?",
        hints: ["I'm retired now.", "I'm a teacher."],
        branches: [
          { keywords: ["retired", "teacher", "driver", "work", "job"], next: "ask-back" },
        ],
        fallbackNext: "ask-back",
      },
      {
        id: "ask-back",
        // Tuần này dạy một việc: hỏi ngược lại. Người học nói xong mà không hỏi
        // lại thì hội thoại chết, nên nhánh chính ở đây là nhánh có câu hỏi.
        say: "I work in a hospital.",
        sayVi: "Tôi làm ở bệnh viện.",
        hints: ["Do you like your job?", "How long have you worked there?"],
        branches: [{ keywords: ["like", "long", "how", "do"], next: "answer-like" }],
        fallbackNext: "answer-like",
      },
      {
        id: "answer-like",
        say: "It's hard work, but I like it a lot. Nice talking to you!",
        sayVi: "Việc vất vả, nhưng tôi thích lắm. Nói chuyện với bạn vui thật!",
        hints: ["Nice to meet you too.", "See you later."],
        branches: [
          { keywords: ["nice", "you", "see", "bye", "later", "thanks"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
