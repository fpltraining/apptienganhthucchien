/**
 * Tuần 4 — Đồ ăn & gọi món cơ bản (curriculum §7).
 *
 * Trọng tâm phát âm: cụm phụ âm đầu str-, spr-, br-. Tiếng Việt không ghép ba
 * phụ âm liền nhau nên người học hay chèn thêm nguyên âm vào giữa
 * ("sư-trít" thay vì "street"). Cách chữa là nói chậm mà liền, không phải nói
 * to hơn.
 */

import type { WeekContent } from "./types";

export const week04: WeekContent = {
  week: 4,
  titleVi: "Đồ ăn & gọi món",
  pronunciationFocusVi: "Cụm phụ âm đầu: str-, spr-, br- (street, spring, bread)",

  vocabulary: [
    {
      id: "w4-table-for-two",
      week: 4,
      phrase: "A table for two, please.",
      meaningVi: "Cho tôi bàn hai người.",
      situation: "Vừa bước vào quán",
      isCoreChunk: true,
    },
    {
      id: "w4-can-i-see-the-menu",
      week: 4,
      phrase: "Can I see the menu, please?",
      meaningVi: "Cho tôi xem thực đơn.",
      situation: "Xin thực đơn",
      isCoreChunk: true,
    },
    {
      id: "w4-id-like",
      week: 4,
      phrase: "I'd like this one, please.",
      meaningVi: "Cho tôi món này.",
      situation: "Gọi món — chỉ vào thực đơn cũng được, nhưng nói được thì hơn",
      isCoreChunk: true,
    },
    {
      id: "w4-can-i-have",
      week: 4,
      phrase: "Can I have a coffee, please?",
      meaningVi: "Cho tôi một ly cà phê.",
      situation: "Gọi đồ uống",
      isCoreChunk: true,
    },
    {
      id: "w4-what-do-you-recommend",
      week: 4,
      phrase: "What do you recommend?",
      meaningVi: "Ở đây món gì ngon?",
      situation: "Nhờ nhân viên gợi ý — câu ngắn mà rất hiệu quả",
      isCoreChunk: true,
    },
    {
      id: "w4-is-it-spicy",
      week: 4,
      phrase: "Is it spicy?",
      meaningVi: "Món này có cay không?",
      situation: "Hỏi trước khi gọi",
      isCoreChunk: true,
    },
    {
      id: "w4-not-too-spicy",
      week: 4,
      phrase: "Not too spicy, please.",
      meaningVi: "Đừng cay quá nhé.",
      situation: "Dặn nhà bếp",
      isCoreChunk: true,
    },
    {
      id: "w4-no-sugar",
      week: 4,
      phrase: "No sugar, please.",
      meaningVi: "Đừng bỏ đường.",
      situation: "Dặn đồ uống — quan trọng với người kiêng đường",
      isCoreChunk: true,
    },
    {
      id: "w4-im-allergic",
      week: 4,
      phrase: "I'm allergic to seafood.",
      meaningVi: "Tôi bị dị ứng hải sản.",
      situation: "Câu an toàn — phải nói được, không phải nói cho đẹp",
      isCoreChunk: true,
    },
    {
      id: "w4-i-dont-eat-meat",
      week: 4,
      phrase: "I don't eat meat.",
      meaningVi: "Tôi không ăn thịt.",
      situation: "Nói kiêng khem",
      isCoreChunk: false,
    },
    {
      id: "w4-some-bread",
      week: 4,
      phrase: "Some bread, please.",
      meaningVi: "Cho tôi xin ít bánh mì.",
      situation: "Xin thêm đồ ăn kèm",
      isCoreChunk: false,
    },
    {
      id: "w4-a-glass-of-water",
      week: 4,
      phrase: "A glass of water, please.",
      meaningVi: "Cho tôi một ly nước.",
      situation: "Xin nước",
      isCoreChunk: true,
    },
    {
      id: "w4-thats-all",
      week: 4,
      phrase: "That's all, thank you.",
      meaningVi: "Vậy thôi, cảm ơn.",
      situation: "Chốt lại đơn gọi món",
      isCoreChunk: true,
    },
    {
      id: "w4-anything-else",
      week: 4,
      phrase: "Anything else?",
      meaningVi: "Anh chị dùng gì nữa không?",
      situation: "Câu nhân viên hay hỏi — nghe được là đủ",
      isCoreChunk: true,
    },
    {
      id: "w4-its-delicious",
      week: 4,
      phrase: "It's delicious.",
      meaningVi: "Ngon lắm.",
      situation: "Khen món ăn",
      isCoreChunk: true,
    },
    {
      id: "w4-excuse-me-waiter",
      week: 4,
      phrase: "Excuse me!",
      meaningVi: "Anh/chị ơi!",
      situation: "Gọi nhân viên — đừng vẫy tay, chỉ cần nói câu này",
      isCoreChunk: true,
    },
    {
      id: "w4-the-bill-please",
      week: 4,
      phrase: "The bill, please.",
      meaningVi: "Tính tiền giúp tôi.",
      situation: "Xin hoá đơn",
      isCoreChunk: true,
    },
    {
      id: "w4-can-we-pay-separately",
      week: 4,
      phrase: "Can we pay separately?",
      meaningVi: "Chúng tôi trả riêng được không?",
      situation: "Đi ăn với bạn",
      isCoreChunk: false,
    },
    {
      id: "w4-take-away",
      week: 4,
      phrase: "Can I take it away?",
      meaningVi: "Tôi mang về được không?",
      situation: "Gói mang đi",
      isCoreChunk: false,
    },
    {
      id: "w4-i-didnt-order-this",
      week: 4,
      phrase: "Sorry, I didn't order this.",
      meaningVi: "Xin lỗi, tôi không gọi món này.",
      situation: "Nhà bếp mang nhầm — nói nhẹ nhàng thôi",
      isCoreChunk: false,
    },
    {
      id: "w4-is-this-street-food",
      week: 4,
      phrase: "Is this street food?",
      meaningVi: "Đây là đồ ăn đường phố à?",
      situation: "Hỏi về món — và luyện luôn cụm 'str-'",
      isCoreChunk: false,
    },
    {
      id: "w4-one-more-please",
      week: 4,
      phrase: "One more, please.",
      meaningVi: "Cho thêm một cái nữa.",
      situation: "Gọi thêm",
      isCoreChunk: true,
    },
    {
      id: "w4-for-here-or-takeaway",
      week: 4,
      phrase: "For here or takeaway?",
      meaningVi: "Ăn tại chỗ hay mang về?",
      situation: "Câu nhân viên hay hỏi ở quán cà phê",
      isCoreChunk: true,
    },
    {
      id: "w4-thank-you-that-was-great",
      week: 4,
      phrase: "Thank you, that was great.",
      meaningVi: "Cảm ơn, món ăn ngon lắm.",
      situation: "Câu nói lúc ra về",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w4-listen-restaurant",
    week: 4,
    titleVi: "Gọi món ở quán ăn",
    lines: [
      { speaker: "Anna", text: "Good evening. A table for two?" },
      { speaker: "Hung", text: "Yes, please. Can I see the menu?" },
      { speaker: "Anna", text: "Here you are. Our street food is very good today." },
      { speaker: "Hung", text: "Is it spicy? I'm allergic to seafood." },
      { speaker: "Anna", text: "No seafood in this one. Not too spicy." },
      { speaker: "Hung", text: "Good. I'd like this one, and some bread, please." },
      { speaker: "Anna", text: "Anything else? A glass of water?" },
    ],
    gist: {
      promptVi: "Chuyện này xảy ra ở đâu?",
      options: ["Ở quán ăn", "Ở bệnh viện", "Trên xe taxi"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng bị dị ứng gì?",
        options: ["Hải sản", "Đậu phộng", "Sữa"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng gọi thêm gì?",
        options: ["Bánh mì", "Cà phê", "Trái cây"],
        answerIndex: 0,
      },
      {
        promptVi: "Nhân viên hỏi thêm gì ở cuối?",
        options: ["Có dùng gì nữa không", "Trả tiền mặt hay thẻ", "Ngồi bàn nào"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Our", answer: "street", after: "food is very good today." },
      { before: "Is it spicy? I'm", answer: "allergic", after: "to seafood." },
      { before: "I'd like this one, and some", answer: "bread", after: ", please." },
    ],
  },

  shadowing: [
    {
      id: "w4-sh-1",
      text: "Street food, please.",
      focusVi: "'str' nói liền một hơi, đừng chèn nguyên âm vào giữa",
    },
    {
      id: "w4-sh-2",
      text: "Some bread and a glass of water.",
      focusVi: "'br' trong 'bread' — hai phụ âm dính nhau",
    },
    {
      id: "w4-sh-3",
      text: "Not too spicy, please.",
      focusVi: "'sp' trong 'spicy' nói gọn, không thành 'sư-pai-xi'",
    },
    {
      id: "w4-sh-4",
      text: "I'm allergic to seafood.",
      focusVi: "Câu quan trọng nhất tuần này — nói to và rõ",
    },
    {
      id: "w4-sh-5",
      text: "The bill, please. That was great.",
      focusVi: "Bật rõ 'l' cuối trong 'bill' và 't' cuối trong 'great'",
    },
  ],

  roleplay: {
    id: "w4-rp-order",
    week: 4,
    titleVi: "Gọi món ở quán",
    goalVi: "Gọi được món, dặn được kiêng khem, và xin tính tiền",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Good evening! A table for two?",
        sayVi: "Chào buổi tối! Bàn hai người ạ?",
        hints: ["Yes, please.", "Yes. Can I see the menu, please?"],
        branches: [{ keywords: ["yes", "please", "menu", "table", "two"], next: "menu" }],
        fallbackNext: "menu",
      },
      {
        id: "menu",
        say: "Here is the menu. What would you like?",
        sayVi: "Thực đơn đây ạ. Anh dùng gì?",
        hints: ["What do you recommend?", "I'd like this one, please."],
        branches: [
          { keywords: ["recommend", "good", "what"], next: "recommend" },
          { keywords: ["like", "have", "this", "one"], next: "check-spicy" },
        ],
        fallbackNext: "recommend",
      },
      {
        id: "recommend",
        say: "Our street food is very good today.",
        sayVi: "Hôm nay món ăn đường phố của quán ngon lắm ạ.",
        hints: ["Is it spicy?", "I'd like this one, please."],
        branches: [
          { keywords: ["spicy", "seafood", "allergic", "meat"], next: "check-spicy" },
          { keywords: ["like", "have", "this", "one", "okay", "ok"], next: "check-spicy" },
        ],
        fallbackNext: "check-spicy",
      },
      {
        id: "check-spicy",
        say: "It's a little spicy. Is that okay?",
        sayVi: "Món hơi cay một chút. Anh dùng được không ạ?",
        hints: ["Not too spicy, please.", "I'm allergic to seafood."],
        branches: [
          {
            keywords: ["spicy", "allergic", "seafood", "meat", "sugar", "no", "not"],
            next: "anything-else",
          },
          { keywords: ["okay", "ok", "yes", "fine"], next: "anything-else" },
        ],
        fallbackNext: "anything-else",
      },
      {
        id: "anything-else",
        say: "No problem. Anything else?",
        sayVi: "Không sao ạ. Anh dùng gì nữa không?",
        hints: ["A glass of water, please.", "That's all, thank you."],
        branches: [
          {
            keywords: ["water", "bread", "coffee", "more", "all", "thanks", "thank"],
            next: "bill",
          },
        ],
        fallbackNext: "bill",
      },
      {
        id: "bill",
        say: "Here you are. Was everything good?",
        sayVi: "Của anh đây. Món ăn có ổn không ạ?",
        hints: ["It's delicious.", "Yes, thank you. The bill, please."],
        branches: [
          { keywords: ["delicious", "good", "great", "bill", "pay", "yes"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
