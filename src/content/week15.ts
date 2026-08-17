/**
 * Tuần 15 — Hàng xóm nước ngoài & giao tiếp xã hội (curriculum §7).
 *
 * Từ tuần này bỏ hẳn gợi ý (`hintLevel: "none"`). Người học vẫn được xem nghĩa
 * tiếng Việt của câu đối phương nói — đó là giúp hiểu, không phải mớm lời — còn
 * câu trả lời thì phải tự nghĩ ra.
 *
 * Kỹ năng của tuần là duy trì hội thoại, và nó khó hơn nó nghe: người mới học
 * hay trả lời đúng một chữ rồi im, thế là mạch chết. Ba việc chữa được chuyện
 * đó, và cả tuần này dạy đúng ba việc ấy:
 *
 *   1. Trả lời xong thì thêm một câu nữa (không dừng ở "Yes").
 *   2. Hỏi ngược lại.
 *   3. Có câu đệm để giữ lượt khi chưa nghĩ ra gì ("That's interesting...").
 *
 * Từ chối lịch sự cũng nằm ở đây, vì người Việt hay ngại nói "không" và cuối
 * cùng nhận lời rồi không đi được.
 */

import type { WeekContent } from "./types";

export const week15: WeekContent = {
  week: 15,
  titleVi: "Hàng xóm nước ngoài & giữ câu chuyện không chết",
  pronunciationFocusVi: "Nhịp và ngữ điệu tự nhiên — nói cả câu một hơi, đừng đọc từng chữ",

  vocabulary: [
    {
      id: "w15-i-dont-think-weve-met",
      week: 15,
      phrase: "I don't think we've met. I'm Hung.",
      meaningVi: "Hình như mình chưa gặp nhau. Tôi là Hùng.",
      situation: "Tự giới thiệu trước — không chờ người ta mở lời",
      isCoreChunk: true,
    },
    {
      id: "w15-do-you-live-here",
      week: 15,
      phrase: "Do you live here too?",
      meaningVi: "Bạn cũng sống ở đây à?",
      situation: "Câu hỏi mở đầu với hàng xóm",
      isCoreChunk: true,
    },
    {
      id: "w15-how-long-have-you-lived-here",
      week: 15,
      phrase: "How long have you lived here?",
      meaningVi: "Bạn sống ở đây bao lâu rồi?",
      situation: "Câu hỏi kéo dài được câu chuyện",
      isCoreChunk: true,
    },
    {
      id: "w15-what-brought-you-here",
      week: 15,
      phrase: "What brought you here?",
      meaningVi: "Điều gì đưa bạn tới đây vậy?",
      situation: "Hỏi mở — người ta thường trả lời dài, mình đỡ phải nói",
      isCoreChunk: true,
    },
    {
      id: "w15-thats-interesting-tell-me",
      week: 15,
      phrase: "That's interesting. Tell me more.",
      meaningVi: "Hay đấy. Kể thêm đi.",
      situation: "GIỮ MẠCH — câu đệm khi chưa nghĩ ra gì để nói",
      isCoreChunk: true,
    },
    {
      id: "w15-really-how-come",
      week: 15,
      phrase: "Really? How come?",
      meaningVi: "Thật à? Sao lại thế?",
      situation: "GIỮ MẠCH — hai chữ, đẩy người ta nói tiếp",
      isCoreChunk: true,
    },
    {
      id: "w15-i-know-what-you-mean",
      week: 15,
      phrase: "I know what you mean.",
      meaningVi: "Tôi hiểu ý bạn.",
      situation: "GIỮ MẠCH — tỏ ra mình đang nghe",
      isCoreChunk: true,
    },
    {
      id: "w15-same-here",
      week: 15,
      phrase: "Same here.",
      meaningVi: "Tôi cũng vậy.",
      situation: "GIỮ MẠCH — hai chữ, dùng được ở khắp nơi",
      isCoreChunk: true,
    },
    {
      id: "w15-and-what-about-you",
      week: 15,
      phrase: "And what about you?",
      meaningVi: "Còn bạn thì sao?",
      situation: "HỎI NGƯỢC — trả lời xong là hỏi lại ngay",
      isCoreChunk: true,
    },
    {
      id: "w15-yes-and",
      week: 15,
      phrase: "Yes, and I go there every Sunday.",
      meaningVi: "Có, và tôi tới đó mỗi Chủ nhật.",
      situation: "NÓI THÊM — đừng dừng ở 'Yes', thêm một câu nữa là mạch sống",
      isCoreChunk: true,
    },
    {
      id: "w15-not-really-but",
      week: 15,
      phrase: "Not really, but I'd like to try.",
      meaningVi: "Không hẳn, nhưng tôi cũng muốn thử.",
      situation: "NÓI THÊM — trả lời 'không' mà vẫn mở đường đi tiếp",
      isCoreChunk: true,
    },
    {
      id: "w15-would-you-like-to-come-over",
      week: 15,
      phrase: "Would you like to come over for tea?",
      meaningVi: "Bạn qua nhà tôi uống trà nhé?",
      situation: "Mời sang chơi",
      isCoreChunk: true,
    },
    {
      id: "w15-youre-welcome-any-time",
      week: 15,
      phrase: "You're welcome any time.",
      meaningVi: "Lúc nào bạn qua cũng được.",
      situation: "Mời kiểu thân tình, không ép",
      isCoreChunk: false,
    },
    {
      id: "w15-that-would-be-lovely",
      week: 15,
      phrase: "That would be lovely, thank you.",
      meaningVi: "Vậy thì hay quá, cảm ơn bạn.",
      situation: "Nhận lời mời",
      isCoreChunk: true,
    },
    {
      id: "w15-id-love-to-but",
      week: 15,
      phrase: "I'd love to, but I'm busy on Sunday.",
      meaningVi: "Tôi rất muốn, nhưng Chủ nhật tôi bận.",
      situation: "TỪ CHỐI LỊCH SỰ — khen lời mời rồi mới nói lý do",
      isCoreChunk: true,
    },
    {
      id: "w15-maybe-another-time",
      week: 15,
      phrase: "Maybe another time?",
      meaningVi: "Để hôm khác nhé?",
      situation: "TỪ CHỐI LỊCH SỰ — từ chối mà vẫn giữ cửa mở",
      isCoreChunk: true,
    },
    {
      id: "w15-thanks-for-asking",
      week: 15,
      phrase: "Thanks for asking, though.",
      meaningVi: "Dù sao cũng cảm ơn bạn đã mời.",
      situation: "TỪ CHỐI LỊCH SỰ — câu này làm lời từ chối mềm hẳn",
      isCoreChunk: true,
    },
    {
      id: "w15-could-i-ask-you-a-favour",
      week: 15,
      phrase: "Could I ask you a favour?",
      meaningVi: "Tôi nhờ bạn một việc được không?",
      situation: "NHỜ VẢ — hỏi trước rồi mới nói việc",
      isCoreChunk: true,
    },
    {
      id: "w15-could-you-keep-an-eye-on",
      week: 15,
      phrase: "Could you keep an eye on my house?",
      meaningVi: "Bạn trông nhà giúp tôi được không?",
      situation: "NHỜ VẢ — việc hàng xóm hay nhờ nhau",
      isCoreChunk: false,
    },
    {
      id: "w15-only-if-its-no-trouble",
      week: 15,
      phrase: "Only if it's no trouble.",
      meaningVi: "Nếu không phiền thì thôi nhé.",
      situation: "NHỜ VẢ — thêm câu này để người ta dễ từ chối",
      isCoreChunk: true,
    },
    {
      id: "w15-of-course-no-problem",
      week: 15,
      phrase: "Of course, no problem at all.",
      meaningVi: "Được chứ, không có gì đâu.",
      situation: "Nhận lời giúp",
      isCoreChunk: true,
    },
    {
      id: "w15-let-me-know-if-you-need",
      week: 15,
      phrase: "Let me know if you need anything.",
      meaningVi: "Cần gì thì cứ nói với tôi nhé.",
      situation: "Câu hàng xóm tốt bụng nào cũng nói",
      isCoreChunk: true,
    },
    {
      id: "w15-i-should-let-you-go",
      week: 15,
      phrase: "Well, I should let you go.",
      meaningVi: "Thôi, để bạn còn đi việc.",
      situation: "KẾT THÚC — cách dừng câu chuyện mà không cụt lủn",
      isCoreChunk: true,
    },
    {
      id: "w15-lovely-to-chat",
      week: 15,
      phrase: "Lovely to chat. See you around!",
      meaningVi: "Nói chuyện vui lắm. Hẹn gặp lại nhé!",
      situation: "KẾT THÚC",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w15-listen-neighbour-chat",
    week: 15,
    titleVi: "Nói chuyện dài với hàng xóm ngoài sân",
    lines: [
      { speaker: "Anna", text: "Morning! I don't think we've met. I'm Anna, from number nine." },
      { speaker: "Hung", text: "Hello Anna, I'm Hung. Do you live here too? " },
      { speaker: "Anna", text: "Yes, about two years now. What brought you here?" },
      { speaker: "Hung", text: "My daughter lives nearby. And what about you?" },
      { speaker: "Anna", text: "Work, mostly. Listen — would you like to come over for tea?" },
      { speaker: "Hung", text: "I'd love to, but I'm busy on Sunday. Maybe another time?" },
      { speaker: "Anna", text: "Of course. Well, I should let you go. Lovely to chat!" },
    ],
    gist: {
      promptVi: "Hai người đang làm gì?",
      options: [
        "Làm quen và mời nhau sang chơi",
        "Phàn nàn về tiếng ồn",
        "Hỏi đường ra bến xe",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Anna sống ở đây bao lâu rồi?",
        options: ["Khoảng 2 năm", "Khoảng 2 tháng", "Mới chuyển tới"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao ông Hùng tới sống ở đây?",
        options: ["Con gái ở gần đây", "Vì công việc", "Vì khí hậu"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng trả lời lời mời thế nào?",
        options: [
          "Từ chối nhẹ nhàng, hẹn dịp khác",
          "Nhận lời ngay",
          "Không trả lời gì",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I don't think we've", answer: "met", after: ". I'm Anna, from number nine." },
      { before: "What", answer: "brought", after: "you here?" },
      { before: "I'd love to, but I'm", answer: "busy", after: "on Sunday." },
    ],
  },

  shadowing: [
    {
      id: "w15-sh-1",
      text: "I don't think we've met. I'm Hung.",
      focusVi: "Hai câu ngắn, ngắt rõ ở giữa",
    },
    {
      id: "w15-sh-2",
      text: "That's interesting. Tell me more.",
      focusVi: "Nói tự nhiên, hơi lên giọng ở 'interesting'",
    },
    {
      id: "w15-sh-3",
      text: "I'd love to, but I'm busy on Sunday.",
      focusVi: "Nửa đầu vui vẻ, nửa sau tiếc nuối — giọng phải đổi giữa câu",
    },
    {
      id: "w15-sh-4",
      text: "Could I ask you a favour? Only if it's no trouble.",
      focusVi: "Câu dài — ngắt sau 'favour', giọng nhẹ suốt cả câu",
    },
    {
      id: "w15-sh-5",
      text: "Well, I should let you go. Lovely to chat!",
      focusVi: "Nói liền mạch, đừng đọc rời từng chữ",
    },
  ],

  roleplay: {
    id: "w15-rp-neighbour",
    week: 15,
    titleVi: "Nói chuyện với hàng xóm trong hai phút",
    goalVi: "Giữ câu chuyện sống: trả lời có thêm ý, hỏi ngược lại, và từ chối lịch sự",
    startTurnId: "start",
    // Từ tuần 15 bỏ gợi ý (§giai đoạn 2). Chỉ còn nghĩa tiếng Việt của câu
    // đối phương — hiểu thì được giúp, còn nói thì phải tự nói.
    hintLevel: "none",
    surpriseTurnId: "interrupted",
    turns: [
      {
        id: "start",
        say: "Morning! I don't think we've met. I'm Anna, from number nine.",
        sayVi: "Chào buổi sáng! Hình như mình chưa gặp nhau. Tôi là Anna, nhà số 9.",
        hints: ["Hello Anna, I'm Hung.", "Hello, I'm Hung. Do you live here too?"],
        branches: [
          { keywords: ["hello", "hi", "hung", "im", "name", "nice", "meet", "live"], next: "how-long" },
        ],
        fallbackNext: "repeat-greeting",
      },
      {
        id: "repeat-greeting",
        say: "Sorry — I didn't catch your name?",
        sayVi: "Xin lỗi — bạn tên gì nhỉ?",
        hints: ["I'm Hung.", "My name is Hung. Nice to meet you."],
        branches: [
          { keywords: ["hung", "im", "name", "nice", "meet"], next: "how-long" },
        ],
        fallbackNext: "how-long",
      },
      {
        id: "how-long",
        say: "Nice to meet you, Hung. How long have you lived here?",
        sayVi: "Rất vui được gặp bạn, Hùng. Bạn sống ở đây bao lâu rồi?",
        // Trả lời cụt thì bị nhắc khéo; trả lời có thêm ý hoặc hỏi ngược thì
        // đi thẳng tiếp. Đây là bài học chính của tuần, nên nó nằm trong nhánh.
        hints: ["About six months. And what about you?", "Six months. My daughter lives nearby."],
        branches: [
          { keywords: ["about", "and", "you", "daughter", "months", "years", "because", "nearby"], next: "what-brought" },
        ],
        fallbackNext: "prompt-more",
      },
      {
        id: "prompt-more",
        say: "Mmm. ...Sorry, I'm not very good at small talk!",
        sayVi: "Ừm. ...Xin lỗi nhé, tôi nói chuyện xã giao dở lắm!",
        hints: ["Same here. And what about you?", "That's interesting. Tell me more."],
        branches: [
          { keywords: ["same", "you", "about", "interesting", "more", "really", "know"], next: "what-brought" },
        ],
        fallbackNext: "what-brought",
      },
      {
        id: "what-brought",
        say: "I moved here for work. It's quiet, I like it.",
        sayVi: "Tôi chuyển tới đây vì công việc. Ở đây yên tĩnh, tôi thích.",
        hints: ["That's interesting. Tell me more.", "Same here. I like it too."],
        branches: [
          { keywords: ["interesting", "same", "more", "really", "know", "mean", "like", "too"], next: "invite" },
        ],
        fallbackNext: "invite",
      },
      {
        id: "interrupted",
        // Lệch kịch bản: đang nói dở thì có người gọi. Người học phải xử lý một
        // quãng ngắt rồi nối lại mạch — chuyện xảy ra suốt ngoài đời.
        say: "Oh — sorry, that's my phone. ...Right, where were we?",
        sayVi: "Ồ — xin lỗi, điện thoại của tôi. ...Rồi, mình đang nói tới đâu nhỉ?",
        hints: ["You were telling me about your work.", "No problem. You live here for work."],
        branches: [
          { keywords: ["work", "telling", "were", "problem", "about", "you", "said"], next: "invite" },
        ],
        fallbackNext: "invite",
      },
      {
        id: "invite",
        say: "Listen — would you like to come over for tea on Sunday?",
        sayVi: "Này — Chủ nhật bạn qua nhà tôi uống trà nhé?",
        hints: ["That would be lovely, thank you.", "I'd love to, but I'm busy on Sunday."],
        branches: [
          { keywords: ["lovely", "love", "busy", "another", "maybe", "thanks", "sunday"], next: "favour" },
        ],
        fallbackNext: "favour",
      },
      {
        id: "favour",
        say: "No problem at all. Actually — could I ask you a favour?",
        sayVi: "Không sao đâu. À mà — tôi nhờ bạn một việc được không?",
        hints: ["Of course, no problem at all.", "Yes, what is it?"],
        branches: [
          { keywords: ["course", "yes", "problem", "sure", "what", "help"], next: "closing" },
        ],
        fallbackNext: "closing",
      },
      {
        id: "closing",
        say: "Could you keep an eye on my house next week? Only if it's no trouble.",
        sayVi: "Tuần sau bạn trông nhà giúp tôi được không? Nếu không phiền thôi nhé.",
        hints: ["Of course, no problem at all.", "Yes. Let me know if you need anything."],
        branches: [
          { keywords: ["course", "problem", "yes", "know", "need", "anything", "sure"], next: "goodbye" },
        ],
        fallbackNext: "goodbye",
      },
      {
        id: "goodbye",
        say: "Thank you so much. Well, I should let you go. Lovely to chat!",
        sayVi: "Cảm ơn bạn nhiều. Thôi, để bạn còn đi việc. Nói chuyện vui lắm!",
        hints: ["Lovely to chat. See you around!", "See you around. Take care."],
        branches: [
          { keywords: ["lovely", "chat", "see", "around", "care", "bye", "you"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
