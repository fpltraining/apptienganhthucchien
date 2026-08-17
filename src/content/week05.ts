/**
 * Tuần 5 — Mua sắm (curriculum §7).
 *
 * Trọng tâm phát âm: /ʃ/ (shop) so với /s/ (sop), và trọng âm từ. Nhầm hai âm
 * này ít khi làm hỏng nghĩa, nhưng nó là thứ khiến câu nghe "sai sai"; đặt ở
 * tuần 5 vì đến đây người học đã đủ tự tin để sửa chi tiết.
 */

import type { WeekContent } from "./types";

export const week05: WeekContent = {
  week: 5,
  titleVi: "Mua sắm",
  pronunciationFocusVi: "Âm /ʃ/ (shop, shoes) khác /s/ (sock, size)",

  vocabulary: [
    {
      id: "w5-im-just-looking",
      week: 5,
      phrase: "I'm just looking, thank you.",
      meaningVi: "Tôi xem thôi, cảm ơn.",
      situation: "Nhân viên hỏi mà mình chưa muốn mua",
      isCoreChunk: true,
    },
    {
      id: "w5-do-you-have-this",
      week: 5,
      phrase: "Do you have this in blue?",
      meaningVi: "Cái này có màu xanh không?",
      situation: "Hỏi màu khác",
      isCoreChunk: true,
    },
    {
      id: "w5-do-you-have-bigger",
      week: 5,
      phrase: "Do you have a bigger size?",
      meaningVi: "Có size lớn hơn không?",
      situation: "Hỏi cỡ",
      isCoreChunk: true,
    },
    {
      id: "w5-smaller-size",
      week: 5,
      phrase: "A smaller size, please.",
      meaningVi: "Cho tôi size nhỏ hơn.",
      situation: "Đổi cỡ",
      isCoreChunk: false,
    },
    {
      id: "w5-can-i-try-it-on",
      week: 5,
      phrase: "Can I try it on?",
      meaningVi: "Tôi mặc thử được không?",
      situation: "Trước khi mua quần áo",
      isCoreChunk: true,
    },
    {
      id: "w5-where-is-the-fitting-room",
      week: 5,
      phrase: "Where is the fitting room?",
      meaningVi: "Phòng thử đồ ở đâu?",
      situation: "Hỏi chỗ thử đồ",
      isCoreChunk: false,
    },
    {
      id: "w5-its-too-small",
      week: 5,
      phrase: "It's too small.",
      meaningVi: "Chật quá.",
      situation: "Thử xong thấy không vừa",
      isCoreChunk: true,
    },
    {
      id: "w5-it-fits",
      week: 5,
      phrase: "It fits well.",
      meaningVi: "Vừa rồi.",
      situation: "Thử xong thấy được",
      isCoreChunk: false,
    },
    {
      id: "w5-how-much-is-this-shirt",
      week: 5,
      phrase: "How much is this shirt?",
      meaningVi: "Cái áo này bao nhiêu?",
      situation: "Hỏi giá món cụ thể — và luyện luôn âm 'sh'",
      isCoreChunk: true,
    },
    {
      id: "w5-can-you-give-me-a-discount",
      week: 5,
      phrase: "Can you give me a discount?",
      meaningVi: "Bớt cho tôi được không?",
      situation: "Mặc cả — hỏi thẳng, cười một cái",
      isCoreChunk: true,
    },
    {
      id: "w5-thats-too-much",
      week: 5,
      phrase: "That's too much for me.",
      meaningVi: "Với tôi thì đắt quá.",
      situation: "Chê giá mà không mất lòng",
      isCoreChunk: true,
    },
    {
      id: "w5-ill-take-it",
      week: 5,
      phrase: "Okay, I'll take it.",
      meaningVi: "Được, tôi lấy cái này.",
      situation: "Chốt mua",
      isCoreChunk: true,
    },
    {
      id: "w5-ill-think-about-it",
      week: 5,
      phrase: "I'll think about it.",
      meaningVi: "Để tôi suy nghĩ đã.",
      situation: "Cách từ chối lịch sự nhất",
      isCoreChunk: true,
    },
    {
      id: "w5-where-are-the-shoes",
      week: 5,
      phrase: "Where are the shoes?",
      meaningVi: "Giày dép ở khu nào?",
      situation: "Hỏi khu hàng trong siêu thị",
      isCoreChunk: false,
    },
    {
      id: "w5-do-you-take-card",
      week: 5,
      phrase: "Do you take card?",
      meaningVi: "Ở đây nhận thẻ không?",
      situation: "Hỏi trước khi ra quầy",
      isCoreChunk: true,
    },
    {
      id: "w5-can-i-have-a-bag",
      week: 5,
      phrase: "Can I have a bag, please?",
      meaningVi: "Cho tôi xin cái túi.",
      situation: "Ở quầy tính tiền",
      isCoreChunk: false,
    },
    {
      id: "w5-can-i-have-a-receipt",
      week: 5,
      phrase: "Can I have a receipt, please?",
      meaningVi: "Cho tôi xin hoá đơn.",
      situation: "Cần hoá đơn để đổi trả",
      isCoreChunk: true,
    },
    {
      id: "w5-can-i-return-this",
      week: 5,
      phrase: "Can I return this?",
      meaningVi: "Cái này trả lại được không?",
      situation: "Đổi trả hàng",
      isCoreChunk: true,
    },
    {
      id: "w5-its-broken",
      week: 5,
      phrase: "Sorry, it's broken.",
      meaningVi: "Xin lỗi, cái này bị hỏng.",
      situation: "Lý do đổi trả",
      isCoreChunk: false,
    },
    {
      id: "w5-i-bought-it-yesterday",
      week: 5,
      phrase: "I bought it yesterday.",
      meaningVi: "Tôi mua hôm qua.",
      situation: "Nói khi đi đổi hàng",
      isCoreChunk: false,
    },
    {
      id: "w5-is-it-on-sale",
      week: 5,
      phrase: "Is it on sale?",
      meaningVi: "Cái này có giảm giá không?",
      situation: "Hỏi khuyến mãi",
      isCoreChunk: false,
    },
    {
      id: "w5-what-time-do-you-close-shop",
      week: 5,
      phrase: "What time does the shop close?",
      meaningVi: "Cửa hàng đóng cửa lúc mấy giờ?",
      situation: "Hỏi giờ — ôn lại tuần 2",
      isCoreChunk: false,
    },
    {
      id: "w5-im-looking-for",
      week: 5,
      phrase: "I'm looking for a jacket.",
      meaningVi: "Tôi đang tìm một cái áo khoác.",
      situation: "Nói rõ mình cần gì để nhân viên khỏi đoán",
      isCoreChunk: true,
    },
    {
      id: "w5-thank-you-for-your-help",
      week: 5,
      phrase: "Thank you for your help.",
      meaningVi: "Cảm ơn bạn đã giúp.",
      situation: "Nói lúc ra về, mua hay không mua cũng nói được",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w5-listen-shop",
    week: 5,
    titleVi: "Mua áo ở cửa hàng",
    lines: [
      { speaker: "Anna", text: "Hello! Can I help you?" },
      { speaker: "Hung", text: "Yes. I'm looking for a jacket." },
      { speaker: "Anna", text: "This shirt and jacket are on sale today." },
      { speaker: "Hung", text: "How much is this shirt? Can I try it on?" },
      { speaker: "Anna", text: "Of course. The fitting room is over there." },
      { speaker: "Hung", text: "It's too small. Do you have a bigger size?" },
      { speaker: "Anna", text: "Yes, here. And we take card." },
    ],
    gist: {
      promptVi: "Ông Hùng đang làm gì?",
      options: ["Mua quần áo", "Trả lại hàng hỏng", "Hỏi đường tới siêu thị"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng đang tìm gì?",
        options: ["Áo khoác", "Giày", "Túi xách"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao ông ấy xin đổi?",
        options: ["Chật quá", "Sai màu", "Bị hỏng"],
        answerIndex: 0,
      },
      {
        promptVi: "Cửa hàng nhận thanh toán kiểu gì?",
        options: ["Nhận thẻ", "Chỉ tiền mặt", "Chỉ chuyển khoản"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I'm looking for a", answer: "jacket", after: "." },
      { before: "This", answer: "shirt", after: "and jacket are on sale today." },
      { before: "It's too small. Do you have a", answer: "bigger", after: "size?" },
    ],
  },

  shadowing: [
    {
      id: "w5-sh-1",
      text: "This shirt, not this sock.",
      focusVi: "'sh' chu môi ra, 's' thì không — nghe khác hẳn",
    },
    {
      id: "w5-sh-2",
      text: "Where are the shoes?",
      focusVi: "'shoes' bắt đầu bằng 'sh', kết thúc bằng /z/",
    },
    {
      id: "w5-sh-3",
      text: "Can you give me a discount?",
      focusVi: "Nhấn vào 'DIS-count', không phải 'dis-COUNT'",
    },
    {
      id: "w5-sh-4",
      text: "That's too much for me.",
      focusVi: "'ch' cuối trong 'much' — bật ra rồi mới dừng",
    },
    {
      id: "w5-sh-5",
      text: "I'll think about it.",
      focusVi: "'th' trong 'think' — ôn lại âm của tuần 2",
    },
  ],

  roleplay: {
    id: "w5-rp-shop",
    week: 5,
    titleVi: "Mua và mặc cả ở cửa hàng",
    goalVi: "Hỏi được size, mặc cả, rồi quyết định mua hay không",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Hello! Are you looking for something?",
        sayVi: "Xin chào! Anh tìm gì ạ?",
        hints: ["I'm looking for a jacket.", "I'm just looking, thank you."],
        branches: [
          { keywords: ["looking", "jacket", "shirt", "shoes", "want", "need"], next: "show-item" },
        ],
        fallbackNext: "show-item",
      },
      {
        id: "show-item",
        say: "This one is very nice. Do you like it?",
        sayVi: "Cái này đẹp lắm ạ. Anh thấy sao?",
        hints: ["Can I try it on?", "How much is this shirt?"],
        branches: [
          { keywords: ["try", "fitting", "room", "wear"], next: "try-on" },
          { keywords: ["much", "price", "cost", "how"], next: "price" },
        ],
        fallbackNext: "try-on",
      },
      {
        id: "try-on",
        say: "Of course. The fitting room is over there.",
        sayVi: "Được chứ ạ. Phòng thử đồ ở đằng kia.",
        hints: ["It's too small. Do you have a bigger size?", "It fits well."],
        branches: [
          { keywords: ["small", "big", "bigger", "smaller", "size"], next: "bigger" },
          { keywords: ["fits", "good", "nice", "fine"], next: "price" },
        ],
        fallbackNext: "bigger",
      },
      {
        id: "bigger",
        say: "Here is a bigger one. Better?",
        sayVi: "Cái này to hơn ạ. Được không anh?",
        hints: ["It fits well. How much is it?", "Yes, better."],
        branches: [
          { keywords: ["fits", "yes", "better", "good", "much", "price"], next: "price" },
        ],
        fallbackNext: "price",
      },
      {
        id: "price",
        say: "It's four hundred thousand dong.",
        sayVi: "Bốn trăm nghìn ạ.",
        hints: ["That's too much for me.", "Can you give me a discount?"],
        branches: [
          { keywords: ["much", "expensive", "discount", "cheaper"], next: "discount" },
          { keywords: ["take", "buy", "okay", "ok", "card"], next: "buy" },
        ],
        fallbackNext: "discount",
      },
      {
        id: "discount",
        say: "Okay — three hundred and fifty for you.",
        sayVi: "Thôi được — ba trăm năm mươi cho anh.",
        // Không mua cũng là một kết cục đúng: "I'll think about it" là câu chốt
        // quan trọng của tuần này, không phải câu thua cuộc.
        hints: ["Okay, I'll take it.", "I'll think about it."],
        branches: [
          { keywords: ["take", "buy", "okay", "ok", "yes", "card"], next: "buy" },
          { keywords: ["think", "later", "no", "thanks"], next: "leave" },
        ],
        fallbackNext: "buy",
      },
      {
        id: "buy",
        say: "Great! Do you need a bag?",
        sayVi: "Tuyệt! Anh có cần túi không ạ?",
        hints: ["Can I have a receipt, please?", "Yes, please."],
        branches: [
          { keywords: ["receipt", "bag", "yes", "please", "thanks", "thank"], next: null },
        ],
        fallbackNext: null,
      },
      {
        id: "leave",
        say: "No problem. Come back any time!",
        sayVi: "Không sao ạ. Hôm nào anh ghé lại nhé!",
        hints: ["Thank you for your help.", "See you later."],
        branches: [
          { keywords: ["thank", "thanks", "help", "see", "bye", "later"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
