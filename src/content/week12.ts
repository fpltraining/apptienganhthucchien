/**
 * Tuần 12 — Sân bay & máy bay (curriculum §7).
 *
 * Hai thứ mới bắt đầu từ tuần này, và cả hai đều là chuyện "gỡ nạng":
 *
 *  - Gợi ý rút xuống còn từ khoá (`hintLevel: "keyword"`). Người học vẫn được
 *    nhắc, nhưng phải tự ghép thành câu.
 *  - Đối phương có thể lệch kịch bản (`surpriseTurnId`). Ở đây là đổi cổng ra
 *    máy bay — chuyện xảy ra thật, và xảy ra đúng lúc mình đang yên tâm nhất.
 *    Giáo trình gọi đây là điểm chuyển từ "học thuộc" sang "phản xạ".
 *
 * Tình huống nặng nhất của tuần là mất hành lý. Nó được xếp vào đây vì đó là
 * lúc người ta hoảng nhất mà lại cần nói rõ nhất.
 */

import type { WeekContent } from "./types";

export const week12: WeekContent = {
  week: 12,
  titleVi: "Sân bay & máy bay",
  pronunciationFocusVi: "Nghe loa thông báo: nhanh, rè, và không nhắc lại lần hai",

  vocabulary: [
    {
      id: "w12-im-checking-in-for",
      week: 12,
      phrase: "I'm checking in for the flight to Singapore.",
      meaningVi: "Tôi làm thủ tục cho chuyến bay đi Singapore.",
      situation: "Câu mở đầu ở quầy check-in",
      isCoreChunk: true,
    },
    {
      id: "w12-heres-my-passport-w12",
      week: 12,
      phrase: "Here's my passport and ticket.",
      meaningVi: "Hộ chiếu và vé của tôi đây.",
      situation: "Đưa giấy tờ",
      isCoreChunk: true,
    },
    {
      id: "w12-one-bag-to-check-in",
      week: 12,
      phrase: "One bag to check in.",
      meaningVi: "Tôi gửi một kiện hành lý.",
      situation: "Gửi hành lý",
      isCoreChunk: true,
    },
    {
      id: "w12-this-is-hand-luggage",
      week: 12,
      phrase: "This is hand luggage.",
      meaningVi: "Cái này tôi xách tay.",
      situation: "Phân biệt hành lý gửi và xách tay",
      isCoreChunk: true,
    },
    {
      id: "w12-is-it-overweight",
      week: 12,
      phrase: "Is my bag overweight?",
      meaningVi: "Hành lý của tôi có quá cân không?",
      situation: "Hỏi trước khi bị tính thêm tiền",
      isCoreChunk: false,
    },
    {
      id: "w12-a-window-seat",
      week: 12,
      phrase: "A window seat, please.",
      meaningVi: "Cho tôi ghế cạnh cửa sổ.",
      situation: "Chọn chỗ ngồi",
      isCoreChunk: true,
    },
    {
      id: "w12-an-aisle-seat",
      week: 12,
      phrase: "An aisle seat, if possible.",
      meaningVi: "Nếu được thì cho tôi ghế cạnh lối đi.",
      situation: "Chọn chỗ ngồi — người lớn tuổi hay cần ghế lối đi",
      isCoreChunk: true,
    },
    {
      id: "w12-can-we-sit-together",
      week: 12,
      phrase: "Can we sit together?",
      meaningVi: "Cho chúng tôi ngồi cạnh nhau được không?",
      situation: "Đi hai người",
      isCoreChunk: true,
    },
    {
      id: "w12-which-gate",
      week: 12,
      phrase: "Which gate is it?",
      meaningVi: "Cổng số mấy ạ?",
      situation: "Hỏi cổng ra máy bay",
      isCoreChunk: true,
    },
    {
      id: "w12-what-time-is-boarding",
      week: 12,
      phrase: "What time is boarding?",
      meaningVi: "Mấy giờ lên máy bay?",
      situation: "Hỏi giờ ra cổng",
      isCoreChunk: true,
    },
    {
      id: "w12-has-the-gate-changed",
      week: 12,
      phrase: "Sorry, has the gate changed?",
      meaningVi: "Xin lỗi, cổng có đổi không ạ?",
      situation: "Nghe loa mà không chắc — hỏi lại người ta cho chắc",
      isCoreChunk: true,
    },
    {
      id: "w12-i-didnt-catch-that",
      week: 12,
      phrase: "Sorry, I didn't catch that announcement.",
      meaningVi: "Xin lỗi, tôi không nghe kịp thông báo.",
      situation: "CÂU CỨU HỘ — loa sân bay nói nhanh và rè, không ai nghe hết được",
      isCoreChunk: true,
    },
    {
      id: "w12-where-is-the-gate",
      week: 12,
      phrase: "Where is gate twelve?",
      meaningVi: "Cổng số mười hai ở đâu?",
      situation: "Hỏi đường trong sân bay",
      isCoreChunk: true,
    },
    {
      id: "w12-im-in-transit",
      week: 12,
      phrase: "I'm in transit to Sydney.",
      meaningVi: "Tôi quá cảnh để đi Sydney.",
      situation: "Nói ở quầy chuyển tiếp",
      isCoreChunk: true,
    },
    {
      id: "w12-do-i-collect-my-bag",
      week: 12,
      phrase: "Do I collect my bag here?",
      meaningVi: "Tôi có phải lấy hành lý ở đây không?",
      situation: "Quá cảnh — hỏi cho chắc, sai chỗ này là mất cả chuyến sau",
      isCoreChunk: true,
    },
    {
      id: "w12-im-here-on-holiday",
      week: 12,
      phrase: "I'm here on holiday.",
      meaningVi: "Tôi qua đây du lịch.",
      situation: "HẢI QUAN — trả lời ngắn gọn, thật thà",
      isCoreChunk: true,
    },
    {
      id: "w12-for-two-weeks",
      week: 12,
      phrase: "For two weeks.",
      meaningVi: "Hai tuần.",
      situation: "HẢI QUAN — hỏi ở bao lâu",
      isCoreChunk: true,
    },
    {
      id: "w12-im-staying-at",
      week: 12,
      phrase: "I'm staying at a hotel in the city.",
      meaningVi: "Tôi ở khách sạn trong thành phố.",
      situation: "HẢI QUAN — hỏi ở đâu",
      isCoreChunk: true,
    },
    {
      id: "w12-nothing-to-declare",
      week: 12,
      phrase: "Nothing to declare.",
      meaningVi: "Tôi không có gì phải khai báo.",
      situation: "HẢI QUAN",
      isCoreChunk: true,
    },
    {
      id: "w12-my-bag-didnt-arrive",
      week: 12,
      phrase: "My bag didn't arrive.",
      meaningVi: "Hành lý của tôi không thấy tới.",
      situation: "MẤT HÀNH LÝ — câu đầu tiên phải nói được",
      isCoreChunk: true,
    },
    {
      id: "w12-its-a-black-suitcase",
      week: 12,
      phrase: "It's a black suitcase, medium size.",
      meaningVi: "Va li màu đen, cỡ vừa.",
      situation: "MẤT HÀNH LÝ — tả cho người ta tìm",
      isCoreChunk: true,
    },
    {
      id: "w12-heres-my-baggage-tag",
      week: 12,
      phrase: "Here's my baggage tag.",
      meaningVi: "Đây là cuống vé hành lý của tôi.",
      situation: "MẤT HÀNH LÝ — giữ cái cuống này, nó là bằng chứng",
      isCoreChunk: false,
    },
    {
      id: "w12-can-you-send-it-to-my-hotel",
      week: 12,
      phrase: "Can you send it to my hotel?",
      meaningVi: "Bạn gửi tới khách sạn cho tôi được không?",
      situation: "MẤT HÀNH LÝ — nói luôn mình muốn gì",
      isCoreChunk: true,
    },
    {
      id: "w12-how-long-will-it-take-w12",
      week: 12,
      phrase: "How long will it take?",
      meaningVi: "Mất bao lâu ạ?",
      situation: "Hỏi thời gian, giữ giọng bình tĩnh",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w12-listen-airport",
    week: 12,
    titleVi: "Check-in rồi nghe loa đổi cổng",
    lines: [
      { speaker: "Anna", text: "Good morning. Where are you flying today?" },
      { speaker: "Hung", text: "I'm checking in for the flight to Singapore." },
      { speaker: "Anna", text: "Any bags to check in?" },
      { speaker: "Hung", text: "One bag. And this is hand luggage. A window seat, please." },
      { speaker: "Anna", text: "Done. Gate twelve, boarding at nine forty." },
      { speaker: "Loa", text: "Attention please. Flight to Singapore now boarding at gate twenty." },
      { speaker: "Hung", text: "Sorry, I didn't catch that. Has the gate changed?" },
    ],
    gist: {
      promptVi: "Chuyện gì xảy ra?",
      options: [
        "Làm thủ tục xong thì loa báo đổi cổng",
        "Ông Hùng bị mất hành lý",
        "Chuyến bay bị huỷ",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ban đầu nhân viên báo cổng số mấy?",
        options: ["Cổng 12", "Cổng 20", "Cổng 2"],
        answerIndex: 0,
      },
      {
        promptVi: "Loa thông báo cổng số mấy?",
        options: ["Cổng 20", "Cổng 12", "Cổng 9"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng làm gì khi nghe loa?",
        options: ["Hỏi lại cho chắc", "Chạy ra cổng cũ", "Ngồi im chờ tiếp"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "One bag. And this is hand", answer: "luggage", after: ". A window seat, please." },
      { before: "Done. Gate twelve,", answer: "boarding", after: "at nine forty." },
      { before: "Sorry, I didn't", answer: "catch", after: "that. Has the gate changed?" },
    ],
  },

  shadowing: [
    {
      id: "w12-sh-1",
      text: "I'm checking in for the flight to Singapore.",
      focusVi: "Câu dài — ngắt nhẹ sau 'checking in'",
    },
    {
      id: "w12-sh-2",
      text: "A window seat, please. An aisle seat, if possible.",
      focusVi: "'aisle' đọc là 'ai-l', chữ 's' câm hoàn toàn",
    },
    {
      id: "w12-sh-3",
      text: "Sorry, I didn't catch that.",
      focusVi: "Bật rõ 'didn't' — nuốt mất là câu đổi nghĩa",
    },
    {
      id: "w12-sh-4",
      text: "My bag didn't arrive. It's a black suitcase.",
      focusVi: "Nói chậm và rõ — lúc này càng cuống càng phải nói chậm",
    },
    {
      id: "w12-sh-5",
      text: "Nothing to declare.",
      focusVi: "Ba chữ, nói dứt khoát, nhìn thẳng",
    },
  ],

  roleplay: {
    id: "w12-rp-airport",
    week: 12,
    titleVi: "Sân bay: check-in, gửi hành lý, ra cổng",
    goalVi: "Làm xong thủ tục và xử lý được khi cổng đổi giờ chót",
    startTurnId: "start",
    // Từ tuần 12 chỉ còn gợi ý từ khoá (§giai đoạn 2) — người học tự ghép câu.
    hintLevel: "keyword",
    // 20% khả năng lệch kịch bản: đang yên thì loa báo đổi cổng.
    surpriseTurnId: "gate-change",
    turns: [
      {
        id: "start",
        say: "Good morning. Where are you flying today?",
        sayVi: "Chào buổi sáng. Hôm nay anh bay đi đâu ạ?",
        hints: ["I'm checking in for the flight to Singapore.", "To Singapore."],
        branches: [
          { keywords: ["singapore", "checking", "flight", "sydney", "to"], next: "bags" },
        ],
        fallbackNext: "repeat-where",
      },
      {
        id: "repeat-where",
        say: "Sorry — which flight are you on?",
        sayVi: "Xin lỗi — anh đi chuyến nào ạ?",
        hints: ["I'm checking in for the flight to Singapore."],
        branches: [
          { keywords: ["singapore", "flight", "checking", "to"], next: "bags" },
        ],
        fallbackNext: "bags",
      },
      {
        id: "bags",
        say: "Any bags to check in today?",
        sayVi: "Anh có gửi hành lý không ạ?",
        hints: ["One bag to check in.", "One bag. This is hand luggage."],
        branches: [
          { keywords: ["one", "two", "bag", "bags", "hand", "luggage", "no"], next: "seat" },
        ],
        fallbackNext: "seat",
      },
      {
        id: "seat",
        say: "Would you like a window or an aisle seat?",
        sayVi: "Anh muốn ghế cạnh cửa sổ hay cạnh lối đi ạ?",
        hints: ["A window seat, please.", "An aisle seat, if possible."],
        branches: [
          { keywords: ["window", "aisle", "seat", "together", "please"], next: "gate-info" },
        ],
        fallbackNext: "gate-info",
      },
      {
        id: "gate-info",
        say: "All done. Gate twelve, boarding at nine forty.",
        sayVi: "Xong rồi ạ. Cổng 12, lên máy bay lúc chín giờ bốn mươi.",
        hints: ["Where is gate twelve?", "What time is boarding?"],
        branches: [
          { keywords: ["where", "gate", "twelve", "time", "boarding", "thanks", "thank"], next: "directions" },
        ],
        fallbackNext: "directions",
      },
      {
        id: "gate-change",
        // Đây là turn "lệch kịch bản". Nó chen vào bất ngờ, rồi trả người học
        // về lại mạch chính — giống hệt đời thật: chuyện xảy ra rồi đi tiếp.
        say: "Oh — wait. They've just changed it. Your flight is now at gate twenty.",
        sayVi: "Ồ — khoan đã. Người ta vừa đổi. Chuyến của anh giờ ở cổng 20.",
        hints: ["Sorry, has the gate changed?", "Sorry, I didn't catch that."],
        branches: [
          { keywords: ["sorry", "gate", "changed", "catch", "twenty", "again", "repeat"], next: "directions" },
          { keywords: ["okay", "ok", "thanks", "thank", "yes"], next: "directions" },
        ],
        fallbackNext: "directions",
      },
      {
        id: "directions",
        say: "Go straight, then turn left after security. You can't miss it.",
        sayVi: "Anh đi thẳng, qua chỗ kiểm tra an ninh thì rẽ trái. Dễ thấy lắm ạ.",
        hints: ["So, straight and then left?", "Thank you very much."],
        branches: [
          { keywords: ["so", "straight", "left", "right", "thanks", "thank"], next: "customs" },
        ],
        fallbackNext: "customs",
      },
      {
        id: "customs",
        say: "One more thing — what's the purpose of your trip?",
        sayVi: "Còn một câu nữa — anh đi với mục đích gì ạ?",
        hints: ["I'm here on holiday.", "I'm in transit to Sydney."],
        branches: [
          { keywords: ["holiday", "transit", "business", "family", "visit", "weeks"], next: "done" },
        ],
        fallbackNext: "done",
      },
      {
        id: "done",
        say: "Thank you. Have a good flight!",
        sayVi: "Cảm ơn anh. Chúc anh bay vui vẻ!",
        hints: ["Thank you.", "Thank you very much. Goodbye."],
        branches: [
          { keywords: ["thanks", "thank", "bye", "goodbye", "you"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
