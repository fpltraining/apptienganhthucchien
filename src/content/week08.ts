/**
 * Tuần 8 — Thời tiết, sức khoẻ, small talk + ÔN TẬP (curriculum §7).
 *
 * Tuần cuối của giai đoạn 1, nên nó làm hai việc cùng lúc: dạy cách nói chuyện
 * xã giao, và kéo lại toàn bộ bảy tuần trước. Từ vựng tuần này cố tình trộn lẫn
 * chủ đề — hỏi giờ, hỏi giá, hỏi đường — vì ngoài đời không ai nói chuyện theo
 * từng chủ đề một.
 *
 * Trọng tâm phát âm: ôn lại 12 âm khó và nhịp câu. Không có âm mới.
 */

import type { WeekContent } from "./types";

export const week08: WeekContent = {
  week: 8,
  titleVi: "Thời tiết, sức khoẻ & nói chuyện xã giao",
  pronunciationFocusVi: "Ôn lại các âm khó của 7 tuần + nhịp câu",

  vocabulary: [
    {
      id: "w8-nice-weather",
      week: 8,
      phrase: "Nice weather today, isn't it?",
      meaningVi: "Hôm nay trời đẹp nhỉ?",
      situation: "Bắt chuyện — câu mở đầu an toàn nhất trên đời",
      isCoreChunk: true,
    },
    {
      id: "w8-its-very-hot",
      week: 8,
      phrase: "It's very hot today.",
      meaningVi: "Hôm nay nóng quá.",
      situation: "Bình luận thời tiết",
      isCoreChunk: true,
    },
    {
      id: "w8-its-raining",
      week: 8,
      phrase: "It's raining outside.",
      meaningVi: "Ngoài trời đang mưa.",
      situation: "Bình luận thời tiết",
      isCoreChunk: true,
    },
    {
      id: "w8-do-you-think-it-will-rain",
      week: 8,
      phrase: "Do you think it will rain?",
      meaningVi: "Bạn nghĩ trời có mưa không?",
      situation: "Hỏi để kéo dài câu chuyện",
      isCoreChunk: false,
    },
    {
      id: "w8-how-have-you-been",
      week: 8,
      phrase: "How have you been?",
      meaningVi: "Dạo này bạn thế nào?",
      situation: "Gặp lại người quen sau một thời gian",
      isCoreChunk: true,
    },
    {
      id: "w8-not-too-bad",
      week: 8,
      phrase: "Not too bad, thanks.",
      meaningVi: "Cũng tạm, cảm ơn.",
      situation: "Trả lời thật mà vẫn nhẹ nhàng",
      isCoreChunk: true,
    },
    {
      id: "w8-im-a-bit-tired",
      week: 8,
      phrase: "I'm a bit tired today.",
      meaningVi: "Hôm nay tôi hơi mệt.",
      situation: "Nói về sức khoẻ mình",
      isCoreChunk: true,
    },
    {
      id: "w8-i-have-a-headache",
      week: 8,
      phrase: "I have a headache.",
      meaningVi: "Tôi bị đau đầu.",
      situation: "Nói triệu chứng — chuẩn bị cho tuần khám bệnh sau này",
      isCoreChunk: true,
    },
    {
      id: "w8-i-have-a-cold",
      week: 8,
      phrase: "I have a cold.",
      meaningVi: "Tôi bị cảm.",
      situation: "Nói bệnh nhẹ",
      isCoreChunk: true,
    },
    {
      id: "w8-i-need-to-rest",
      week: 8,
      phrase: "I need to rest.",
      meaningVi: "Tôi cần nghỉ ngơi.",
      situation: "Xin phép nghỉ",
      isCoreChunk: false,
    },
    {
      id: "w8-are-you-okay",
      week: 8,
      phrase: "Are you okay?",
      meaningVi: "Bạn không sao chứ?",
      situation: "Hỏi thăm khi thấy người ta có vẻ mệt",
      isCoreChunk: true,
    },
    {
      id: "w8-get-well-soon",
      week: 8,
      phrase: "Get well soon.",
      meaningVi: "Chúc bạn mau khoẻ.",
      situation: "Nói với người đang ốm",
      isCoreChunk: true,
    },
    {
      id: "w8-take-care-of-yourself",
      week: 8,
      phrase: "Take care of yourself.",
      meaningVi: "Bạn giữ gìn sức khoẻ nhé.",
      situation: "Câu chia tay ấm áp",
      isCoreChunk: true,
    },
    {
      id: "w8-how-was-your-weekend",
      week: 8,
      phrase: "How was your weekend?",
      meaningVi: "Cuối tuần của bạn thế nào?",
      situation: "Bắt chuyện đầu tuần",
      isCoreChunk: true,
    },
    {
      id: "w8-it-was-good",
      week: 8,
      phrase: "It was good. I stayed at home.",
      meaningVi: "Cũng vui. Tôi ở nhà.",
      situation: "Trả lời rồi kể thêm một câu — đừng trả lời cụt",
      isCoreChunk: true,
    },
    {
      id: "w8-what-about-you",
      week: 8,
      phrase: "What about you?",
      meaningVi: "Còn bạn thì sao?",
      situation: "Ba chữ giữ cho hội thoại không chết",
      isCoreChunk: true,
    },
    {
      id: "w8-thats-interesting",
      week: 8,
      phrase: "That's interesting.",
      meaningVi: "Hay đấy.",
      situation: "Phản hồi khi người ta kể chuyện",
      isCoreChunk: true,
    },
    {
      id: "w8-really",
      week: 8,
      phrase: "Really? Tell me more.",
      meaningVi: "Thật à? Kể tiếp đi.",
      situation: "Khuyến khích người ta nói tiếp — mình đỡ phải nói",
      isCoreChunk: true,
    },
    {
      id: "w8-i-see",
      week: 8,
      phrase: "I see.",
      meaningVi: "Tôi hiểu rồi.",
      situation: "Câu đệm khi đang nghe",
      isCoreChunk: true,
    },
    {
      id: "w8-sorry-i-have-to-go",
      week: 8,
      phrase: "Sorry, I have to go now.",
      meaningVi: "Xin lỗi, tôi phải đi rồi.",
      situation: "Kết thúc cuộc nói chuyện cho gọn",
      isCoreChunk: true,
    },
    {
      id: "w8-it-was-nice-talking",
      week: 8,
      phrase: "It was nice talking to you.",
      meaningVi: "Nói chuyện với bạn vui lắm.",
      situation: "Câu chia tay lịch sự",
      isCoreChunk: true,
    },
    {
      id: "w8-see-you-around",
      week: 8,
      phrase: "See you around.",
      meaningVi: "Hẹn gặp lại.",
      situation: "Chào tạm biệt kiểu nhẹ nhàng",
      isCoreChunk: false,
    },
    {
      id: "w8-say-hello-to-your-family",
      week: 8,
      phrase: "Say hello to your family.",
      meaningVi: "Cho tôi gửi lời chào gia đình bạn.",
      situation: "Câu chia tay ấm áp — ôn lại từ vựng tuần 3",
      isCoreChunk: false,
    },
    {
      id: "w8-sorry-could-you-repeat",
      week: 8,
      phrase: "Sorry, could you repeat that?",
      meaningVi: "Xin lỗi, bạn nhắc lại được không?",
      situation: "Câu cứu hộ — ôn lại tuần 1, dùng suốt sáu tháng",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w8-listen-smalltalk",
    week: 8,
    titleVi: "Gặp lại hàng xóm sau kỳ nghỉ",
    lines: [
      { speaker: "Anna", text: "Hello, Hung! How have you been?" },
      { speaker: "Hung", text: "Not too bad, thanks. I'm a bit tired today." },
      { speaker: "Anna", text: "Oh dear. Are you okay?" },
      { speaker: "Hung", text: "I have a cold. But it's not serious." },
      { speaker: "Anna", text: "Get well soon! Nice weather today, isn't it?" },
      { speaker: "Hung", text: "Yes, but I think it will rain later. How was your weekend?" },
      { speaker: "Anna", text: "It was good. Sorry, I have to go now — take care!" },
    ],
    gist: {
      promptVi: "Hai người đang làm gì?",
      options: ["Chào hỏi, hỏi thăm nhau", "Cãi nhau", "Mua bán hàng"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng bị làm sao?",
        options: ["Bị cảm", "Bị đau chân", "Không sao cả"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng nghĩ lát nữa trời thế nào?",
        options: ["Sẽ mưa", "Sẽ nắng to", "Sẽ lạnh"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao Anna kết thúc câu chuyện?",
        options: ["Phải đi có việc", "Giận ông Hùng", "Trời mưa rồi"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Not too bad, thanks. I'm a bit", answer: "tired", after: "today." },
      { before: "I have a", answer: "cold", after: ". But it's not serious." },
      { before: "How was your", answer: "weekend", after: "?" },
    ],
  },

  shadowing: [
    {
      id: "w8-sh-1",
      text: "Nice weather today, isn't it?",
      focusVi: "Đuôi câu lên giọng — đây là câu hỏi, dù nghe như câu kể",
    },
    {
      id: "w8-sh-2",
      text: "I have a headache and a cold.",
      focusVi: "Bật rõ 'd' cuối trong 'cold' — ôn âm cuối tuần 1",
    },
    {
      id: "w8-sh-3",
      text: "Thirty people, three days.",
      focusVi: "Âm 'th' — ôn lại tuần 2",
    },
    {
      id: "w8-sh-4",
      text: "She works and lives here.",
      focusVi: "Đuôi -s: 'works' /s/, 'lives' /z/ — ôn lại tuần 3",
    },
    {
      id: "w8-sh-5",
      text: "It was nice talking to you. Take care.",
      focusVi: "Nói cả câu một nhịp, đừng ngắt từng chữ",
    },
  ],

  roleplay: {
    id: "w8-rp-smalltalk",
    week: 8,
    titleVi: "Nói chuyện xã giao với hàng xóm",
    goalVi: "Bắt chuyện, hỏi thăm, giữ câu chuyện chạy, rồi chào tạm biệt cho gọn",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Hello! I haven't seen you for a while. How have you been?",
        sayVi: "Chào bạn! Lâu rồi không gặp. Dạo này bạn thế nào?",
        hints: ["Not too bad, thanks. And you?", "I'm a bit tired today."],
        branches: [
          { keywords: ["bad", "fine", "good", "tired", "okay", "well", "thanks"], next: "health" },
        ],
        fallbackNext: "repeat-how",
      },
      {
        id: "repeat-how",
        say: "Sorry — how are you these days?",
        sayVi: "Xin lỗi — dạo này bạn khoẻ không?",
        hints: ["Not too bad, thanks.", "I'm a bit tired today."],
        branches: [
          { keywords: ["bad", "fine", "good", "tired", "okay", "well"], next: "health" },
        ],
        fallbackNext: "health",
      },
      {
        id: "health",
        say: "You look a little tired. Are you okay?",
        sayVi: "Trông bạn hơi mệt. Bạn ổn chứ?",
        hints: ["I have a cold.", "I'm fine, thanks. Just a bit tired."],
        branches: [
          { keywords: ["cold", "headache", "tired", "sick", "rest"], next: "get-well" },
          { keywords: ["fine", "okay", "good", "yes"], next: "weather" },
        ],
        fallbackNext: "get-well",
      },
      {
        id: "get-well",
        say: "Oh dear. Get well soon!",
        sayVi: "Ôi. Chúc bạn mau khoẻ nhé!",
        hints: ["Thank you.", "Thanks. Nice weather today, isn't it?"],
        branches: [
          { keywords: ["thanks", "thank", "weather", "nice", "hot", "rain"], next: "weather" },
        ],
        fallbackNext: "weather",
      },
      {
        id: "weather",
        say: "It's very hot today, isn't it?",
        sayVi: "Hôm nay nóng quá nhỉ?",
        // Tuần này dạy giữ hội thoại sống: trả lời rồi hỏi ngược lại. Nhánh có
        // câu hỏi ngược đi tiếp; trả lời cụt thì bị nhắc khéo một lần.
        hints: ["Yes, very hot. How was your weekend?", "Do you think it will rain?"],
        branches: [
          { keywords: ["weekend", "you", "rain", "think", "about"], next: "weekend" },
        ],
        fallbackNext: "prompt-question",
      },
      {
        id: "prompt-question",
        say: "Mmm. So... anything new with you?",
        sayVi: "Ừm. Thế... bạn có gì mới không?",
        hints: ["How was your weekend?", "What about you?"],
        branches: [
          { keywords: ["weekend", "you", "how", "what", "about"], next: "weekend" },
        ],
        fallbackNext: "weekend",
      },
      {
        id: "weekend",
        say: "My weekend was good. I stayed at home with my family.",
        sayVi: "Cuối tuần của tôi vui. Tôi ở nhà với gia đình.",
        hints: ["That's interesting.", "Really? Tell me more."],
        branches: [
          { keywords: ["interesting", "really", "more", "nice", "good", "see"], next: "goodbye" },
        ],
        fallbackNext: "goodbye",
      },
      {
        id: "goodbye",
        say: "Sorry, I have to go now. It was nice talking to you!",
        sayVi: "Xin lỗi, tôi phải đi rồi. Nói chuyện với bạn vui lắm!",
        hints: ["Take care of yourself.", "See you around. Say hello to your family."],
        branches: [
          { keywords: ["care", "see", "bye", "later", "hello", "family", "nice"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
