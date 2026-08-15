/**
 * Tuần 22 — Khiếu nại, đàm phán, thuyết phục (curriculum §7).
 *
 * Áp lực của tuần này không nằm ở đồng hồ mà nằm ở người đối diện: **đối phương
 * từ chối hai lần** trước khi nhượng bộ. Kịch bản được dựng đúng như thế — hai
 * turn từ chối liên tiếp, và chỉ tới lần thứ ba mới có kết quả.
 *
 * Đó là bài học chính, và nó là bài học về tâm lý chứ không phải về từ vựng:
 * người học tiếng Anh thường bỏ cuộc ngay sau lần từ chối đầu tiên, vì nghĩ
 * mình nói sai nên người ta mới không đồng ý. Thực ra lần từ chối đầu là thủ
 * tục. Ai hỏi lại lần thứ hai, thứ ba mới được việc — và điều đó đúng với cả
 * người bản xứ.
 *
 * Nguyên tắc thứ hai: giữ giọng bình thản. To tiếng không làm người ta hoàn
 * tiền nhanh hơn, chỉ làm họ gọi bảo vệ.
 */

import type { WeekContent } from "./types";

export const week22: WeekContent = {
  week: 22,
  titleVi: "Khiếu nại, đàm phán & thuyết phục",
  pronunciationFocusVi: "Giữ giọng thấp và đều khi bị từ chối — bình tĩnh mới có sức nặng",
  responseDeadlineMs: 5000,

  vocabulary: [
    {
      id: "w22-id-like-to-make-a-complaint",
      week: 22,
      phrase: "I'd like to make a complaint.",
      meaningVi: "Tôi muốn khiếu nại một việc.",
      situation: "Mở đầu — nói thẳng ngay từ câu đầu, đừng vòng vo",
      isCoreChunk: true,
    },
    {
      id: "w22-theres-a-problem-with",
      week: 22,
      phrase: "There's a problem with my order.",
      meaningVi: "Đơn hàng của tôi có vấn đề.",
      situation: "Nêu vấn đề — nói việc, không nói cảm xúc",
      isCoreChunk: true,
    },
    {
      id: "w22-this-isnt-what-i-paid-for",
      week: 22,
      phrase: "This isn't what I paid for.",
      meaningVi: "Đây không phải thứ tôi đã trả tiền.",
      situation: "Câu ngắn, rõ, khó cãi",
      isCoreChunk: true,
    },
    {
      id: "w22-i-was-charged-twice",
      week: 22,
      phrase: "I was charged twice.",
      meaningVi: "Tôi bị tính tiền hai lần.",
      situation: "Khiếu nại hoá đơn",
      isCoreChunk: true,
    },
    {
      id: "w22-it-stopped-working-after",
      week: 22,
      phrase: "It stopped working after two days.",
      meaningVi: "Được hai hôm là nó hỏng.",
      situation: "Khiếu nại hàng hoá — có mốc thời gian thì thuyết phục hơn",
      isCoreChunk: true,
    },
    {
      id: "w22-i-have-the-receipt",
      week: 22,
      phrase: "I have the receipt here.",
      meaningVi: "Tôi có hoá đơn đây.",
      situation: "Bằng chứng — đưa ra sớm, khỏi phải tranh cãi",
      isCoreChunk: true,
    },
    {
      id: "w22-id-like-a-refund",
      week: 22,
      phrase: "I'd like a refund, please.",
      meaningVi: "Tôi muốn được hoàn tiền.",
      situation: "NÓI RÕ MÌNH MUỐN GÌ — kêu ca mà không nói muốn gì thì không ai giải quyết",
      isCoreChunk: true,
    },
    {
      id: "w22-id-like-it-replaced",
      week: 22,
      phrase: "I'd like it replaced.",
      meaningVi: "Tôi muốn đổi cái khác.",
      situation: "NÓI RÕ MÌNH MUỐN GÌ",
      isCoreChunk: true,
    },
    {
      id: "w22-what-can-you-do-for-me",
      week: 22,
      phrase: "What can you do for me?",
      meaningVi: "Vậy bên bạn giải quyết thế nào cho tôi?",
      situation: "Đẩy trách nhiệm về phía họ — câu rất mạnh mà vẫn lịch sự",
      isCoreChunk: true,
    },
    {
      id: "w22-i-understand-but",
      week: 22,
      phrase: "I understand, but that doesn't solve my problem.",
      meaningVi: "Tôi hiểu, nhưng như vậy chưa giải quyết được việc của tôi.",
      situation: "BỊ TỪ CHỐI LẦN 1 — công nhận rồi giữ nguyên yêu cầu",
      isCoreChunk: true,
    },
    {
      id: "w22-i-hear-you-however",
      week: 22,
      phrase: "I hear you. However, I paid for this.",
      meaningVi: "Tôi nghe rồi. Tuy nhiên tôi đã trả tiền cho cái này.",
      situation: "BỊ TỪ CHỐI LẦN 2 — nhắc lại sự thật, đừng nhắc lại cảm xúc",
      isCoreChunk: true,
    },
    {
      id: "w22-is-there-anything-else-you-can-do",
      week: 22,
      phrase: "Is there anything else you can do?",
      meaningVi: "Còn cách nào khác không ạ?",
      situation: "BỊ TỪ CHỐI — mở đường cho họ đề xuất, thường là lúc họ nhượng bộ",
      isCoreChunk: true,
    },
    {
      id: "w22-could-i-speak-to-the-manager",
      week: 22,
      phrase: "Could I speak to the manager, please?",
      meaningVi: "Cho tôi gặp quản lý được không ạ?",
      situation: "Nước cuối — nói bình thản, không nói kiểu doạ",
      isCoreChunk: true,
    },
    {
      id: "w22-im-not-angry-with-you",
      week: 22,
      phrase: "I'm not angry with you. I just need this fixed.",
      meaningVi: "Tôi không giận bạn. Tôi chỉ cần việc này được giải quyết.",
      situation: "Câu vàng — tách người ra khỏi vấn đề, nhân viên sẽ giúp mình thật",
      isCoreChunk: true,
    },
    {
      id: "w22-lets-find-a-solution",
      week: 22,
      phrase: "Let's find a solution together.",
      meaningVi: "Mình cùng tìm cách giải quyết nhé.",
      situation: "Chuyển từ đối đầu sang cùng phe",
      isCoreChunk: true,
    },
    {
      id: "w22-would-you-consider",
      week: 22,
      phrase: "Would you consider half the price?",
      meaningVi: "Bên bạn xem xét giảm nửa giá được không?",
      situation: "ĐÀM PHÁN — đề nghị cụ thể, dễ gật hơn là đòi chung chung",
      isCoreChunk: true,
    },
    {
      id: "w22-if-you-can-do-that-then",
      week: 22,
      phrase: "If you can do that, I'll take it today.",
      meaningVi: "Nếu bên bạn làm được vậy thì tôi lấy luôn hôm nay.",
      situation: "ĐÀM PHÁN — cho họ một cái được, đổi lấy cái mình muốn",
      isCoreChunk: true,
    },
    {
      id: "w22-thats-more-than-i-wanted-to-pay",
      week: 22,
      phrase: "That's more than I wanted to pay.",
      meaningVi: "Mức đó cao hơn tôi định trả.",
      situation: "ĐÀM PHÁN — chê giá mà không nói 'đắt'",
      isCoreChunk: true,
    },
    {
      id: "w22-can-we-meet-in-the-middle",
      week: 22,
      phrase: "Can we meet in the middle?",
      meaningVi: "Hay mình chia đôi khoảng cách nhé?",
      situation: "ĐÀM PHÁN — câu rất hiệu quả, ai cũng thấy công bằng",
      isCoreChunk: true,
    },
    {
      id: "w22-thats-my-final-offer",
      week: 22,
      phrase: "That's the most I can pay.",
      meaningVi: "Tôi chỉ trả được tới đó thôi.",
      situation: "ĐÀM PHÁN — chốt giới hạn của mình",
      isCoreChunk: true,
    },
    {
      id: "w22-let-me-think-about-it-w22",
      week: 22,
      phrase: "Let me think about it. I'll come back tomorrow.",
      meaningVi: "Để tôi suy nghĩ. Mai tôi quay lại.",
      situation: "Bỏ đi cũng là một nước — nhiều khi hôm sau họ gọi lại",
      isCoreChunk: true,
    },
    {
      id: "w22-that-sounds-fair",
      week: 22,
      phrase: "That sounds fair. Thank you.",
      meaningVi: "Vậy cũng hợp lý. Cảm ơn bạn.",
      situation: "Chấp nhận phương án — chốt xong thì cảm ơn ngay",
      isCoreChunk: true,
    },
    {
      id: "w22-could-i-have-that-in-writing",
      week: 22,
      phrase: "Could I have that in writing?",
      meaningVi: "Cho tôi xin cái đó bằng văn bản được không?",
      situation: "Sau khi họ hứa — miệng nói thì mai quên, giấy thì không",
      isCoreChunk: true,
    },
    {
      id: "w22-thanks-for-sorting-that-out",
      week: 22,
      phrase: "Thanks for sorting that out.",
      meaningVi: "Cảm ơn bạn đã giải quyết giúp.",
      situation: "Câu cuối — kết thúc tử tế, lần sau mình còn quay lại",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w22-listen-refund",
    week: 22,
    titleVi: "Đòi hoàn tiền, bị từ chối hai lần",
    lines: [
      { speaker: "Hung", text: "I'd like to make a complaint. It stopped working after two days." },
      { speaker: "Anna", text: "I'm sorry, but we don't give refunds after seven days." },
      { speaker: "Hung", text: "I understand, but that doesn't solve my problem. I have the receipt here." },
      { speaker: "Anna", text: "I'm afraid that's our policy. There's nothing I can do." },
      { speaker: "Hung", text: "I hear you. However, I paid for this. Is there anything else you can do?" },
      { speaker: "Anna", text: "...Let me check with my manager. We could replace it." },
      { speaker: "Hung", text: "That sounds fair. Could I have that in writing?" },
    ],
    gist: {
      promptVi: "Chuyện gì xảy ra?",
      options: [
        "Ông Hùng bị từ chối hai lần rồi mới được đổi hàng",
        "Ông Hùng được hoàn tiền ngay",
        "Ông Hùng bỏ về không đòi được gì",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Món hàng hỏng sau bao lâu?",
        options: ["Hai ngày", "Bảy ngày", "Hai tuần"],
        answerIndex: 0,
      },
      {
        promptVi: "Cửa hàng từ chối mấy lần?",
        options: ["Hai lần", "Một lần", "Không từ chối"],
        answerIndex: 0,
      },
      {
        promptVi: "Cuối cùng hai bên thoả thuận thế nào?",
        options: ["Đổi hàng khác", "Hoàn tiền đầy đủ", "Giảm nửa giá"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "It stopped working after two", answer: "days", after: "." },
      { before: "I understand, but that doesn't", answer: "solve", after: "my problem." },
      { before: "I hear you. However, I", answer: "paid", after: "for this." },
    ],
  },

  shadowing: [
    {
      id: "w22-sh-1",
      text: "I understand, but that doesn't solve my problem.",
      focusVi: "Giọng đều từ đầu tới cuối — đừng gằn ở chữ 'but'",
    },
    {
      id: "w22-sh-2",
      text: "I hear you. However, I paid for this.",
      focusVi: "Ngắt hẳn sau 'you' — chỗ ngắt chính là chỗ có sức nặng",
    },
    {
      id: "w22-sh-3",
      text: "Is there anything else you can do?",
      focusVi: "Lên giọng cuối, giọng nhẹ — đây là câu mở đường, không phải câu ép",
    },
    {
      id: "w22-sh-4",
      text: "I'm not angry with you. I just need this fixed.",
      focusVi: "Nói chậm và thấp giọng — câu này chỉ hiệu quả khi nghe thật bình tĩnh",
    },
    {
      id: "w22-sh-5",
      text: "Can we meet in the middle?",
      focusVi: "Nối 'meet in' thành một hơi",
    },
  ],

  roleplay: {
    id: "w22-rp-complaint",
    week: 22,
    titleVi: "Đòi hoàn tiền khi bị từ chối liên tục",
    goalVi: "Bị từ chối hai lần mà vẫn giữ được bình tĩnh và vẫn đạt được kết quả",
    startTurnId: "start",
    hintLevel: "none",
    turns: [
      {
        id: "start",
        say: "Good afternoon. How can I help you?",
        sayVi: "Chào bác. Tôi giúp gì được ạ?",
        hints: [
          "I'd like to make a complaint. It stopped working after two days.",
          "There's a problem with my order.",
        ],
        branches: [
          { keywords: ["complaint", "problem", "stopped", "working", "charged", "refund", "wrong"], next: "refuse-one" },
        ],
        fallbackNext: "ask-problem",
      },
      {
        id: "ask-problem",
        say: "Sorry — what seems to be the issue?",
        sayVi: "Xin lỗi — có chuyện gì vậy ạ?",
        hints: ["It stopped working after two days.", "This isn't what I paid for."],
        branches: [
          { keywords: ["stopped", "working", "paid", "problem", "broken", "wrong", "twice"], next: "refuse-one" },
        ],
        fallbackNext: "refuse-one",
      },
      {
        id: "refuse-one",
        // TỪ CHỐI LẦN 1. Người học chưa quen sẽ bỏ cuộc ở đây — và đó chính là
        // thói quen tuần này phải phá.
        say: "I'm sorry, but we don't give refunds after seven days.",
        sayVi: "Tôi xin lỗi, nhưng quá bảy ngày là bên tôi không hoàn tiền ạ.",
        hints: [
          "I understand, but that doesn't solve my problem.",
          "I have the receipt here. I'd like it replaced.",
        ],
        branches: [
          { keywords: ["understand", "solve", "receipt", "replaced", "however", "paid", "problem", "but"], next: "refuse-two" },
        ],
        fallbackNext: "nudge-one",
      },
      {
        id: "nudge-one",
        say: "Is there anything else, or shall I help the next customer?",
        sayVi: "Bác còn gì nữa không, hay để tôi phục vụ khách tiếp theo ạ?",
        hints: [
          "I understand, but that doesn't solve my problem.",
          "What can you do for me?",
        ],
        branches: [
          { keywords: ["understand", "solve", "what", "can", "do", "wait", "problem"], next: "refuse-two" },
        ],
        fallbackNext: "refuse-two",
      },
      {
        id: "refuse-two",
        // TỪ CHỐI LẦN 2. Lần này cứng hơn: "không có gì tôi làm được".
        say: "I'm afraid that's our policy. There's nothing I can do.",
        sayVi: "Tiếc là quy định bên tôi như vậy. Tôi không làm gì được đâu ạ.",
        hints: [
          "I hear you. However, I paid for this. Is there anything else you can do?",
          "I'm not angry with you. I just need this fixed.",
        ],
        branches: [
          { keywords: ["hear", "however", "paid", "anything", "else", "angry", "fixed", "manager", "solution"], next: "yield" },
        ],
        fallbackNext: "nudge-two",
      },
      {
        id: "nudge-two",
        say: "...Was there something else?",
        sayVi: "...Bác còn cần gì nữa không ạ?",
        hints: [
          "Is there anything else you can do?",
          "Could I speak to the manager, please?",
        ],
        branches: [
          { keywords: ["anything", "else", "manager", "speak", "solution", "consider"], next: "yield" },
        ],
        fallbackNext: "yield",
      },
      {
        id: "yield",
        // Lần thứ ba mới có kết quả. Đây là điểm rút ra của cả tuần.
        say: "...Let me check with my manager. We could replace it, if that helps.",
        sayVi: "...Để tôi hỏi quản lý. Bên tôi có thể đổi cái khác, nếu bác thấy được ạ.",
        hints: [
          "That sounds fair. Thank you.",
          "Would you consider half the price instead?",
        ],
        branches: [
          { keywords: ["fair", "sounds", "thank", "consider", "half", "price", "middle", "okay"], next: "haggle" },
        ],
        fallbackNext: "haggle",
      },
      {
        id: "haggle",
        say: "A replacement is the most I can offer today.",
        sayVi: "Đổi hàng là mức cao nhất hôm nay tôi làm được ạ.",
        hints: [
          "That works for me. Could I have that in writing?",
          "Can we meet in the middle?",
        ],
        branches: [
          { keywords: ["works", "writing", "middle", "meet", "fair", "fine", "okay", "accept"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "Of course. I'll write it down for you now.",
        sayVi: "Vâng ạ. Tôi ghi ra cho bác ngay đây.",
        hints: [
          "Thanks for sorting that out.",
          "Thank you. That sounds fair.",
        ],
        branches: [
          { keywords: ["thanks", "thank", "sorting", "fair", "appreciate"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
