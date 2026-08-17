/**
 * Tuần 17 — ÔN TẬP: một ngày du lịch trọn vẹn (curriculum §7).
 *
 * Chốt giai đoạn 2. Điểm khác biệt duy nhất mà cũng là toàn bộ ý nghĩa của tuần
 * này: các tình huống nối liền nhau trong một bài đóng vai, không cắt ra từng
 * mảnh. Sân bay → taxi → khách sạn → hỏi đường → nhà hàng → mua sắm.
 *
 * Lý do phải làm vậy: học riêng từng tuần thì người học biết trước sắp nói về
 * chủ đề gì, và một nửa cái khó biến mất. Ngoài đời không ai báo trước. Chuyển
 * tình huống liên tục chính là bài kiểm tra thật.
 *
 * Từ mới rất ít (giáo trình đặt 30) — tuần này là để dùng lại, không phải để
 * học thêm.
 */

import type { WeekContent } from "./types";

export const week17: WeekContent = {
  week: 17,
  titleVi: "Ôn tập: một ngày du lịch trọn vẹn",
  pronunciationFocusVi: "Giữ nhịp ổn định khi chuyển tình huống — không hụt hơi giữa chừng",

  vocabulary: [
    {
      id: "w17-just-passing-through",
      week: 17,
      phrase: "I'm just passing through.",
      meaningVi: "Tôi chỉ ghé qua thôi.",
      situation: "Hải quan hỏi mà mình chỉ quá cảnh",
      isCoreChunk: false,
    },
    {
      id: "w17-could-you-help-me-with-my-bag",
      week: 17,
      phrase: "Could you help me with my bag?",
      meaningVi: "Bạn xách giúp tôi cái túi được không?",
      situation: "Nhờ vả — người lớn tuổi cứ nhờ, không sao cả",
      isCoreChunk: true,
    },
    {
      id: "w17-how-far-is-it-from-here",
      week: 17,
      phrase: "How far is it from here?",
      meaningVi: "Từ đây tới đó bao xa?",
      situation: "Hỏi khoảng cách trước khi quyết định đi bộ hay bắt xe",
      isCoreChunk: true,
    },
    {
      id: "w17-is-it-within-walking-distance",
      week: 17,
      phrase: "Is it within walking distance?",
      meaningVi: "Đi bộ tới được không?",
      situation: "Hỏi kiểu người bản xứ hay dùng",
      isCoreChunk: false,
    },
    {
      id: "w17-im-not-in-a-hurry",
      week: 17,
      phrase: "I'm not in a hurry.",
      meaningVi: "Tôi không vội đâu.",
      situation: "Nói với tài xế — câu này làm mình đỡ bị chạy ẩu",
      isCoreChunk: true,
    },
    {
      id: "w17-whats-the-best-way-to-get-there",
      week: 17,
      phrase: "What's the best way to get there?",
      meaningVi: "Đi tới đó bằng cách nào là tiện nhất?",
      situation: "Hỏi mở — người ta sẽ chỉ luôn cả phương tiện lẫn đường",
      isCoreChunk: true,
    },
    {
      id: "w17-could-i-check-in-early",
      week: 17,
      phrase: "Could I check in early?",
      meaningVi: "Tôi nhận phòng sớm được không ạ?",
      situation: "Tới khách sạn trước giờ",
      isCoreChunk: true,
    },
    {
      id: "w17-is-there-anywhere-good-to-eat",
      week: 17,
      phrase: "Is there anywhere good to eat nearby?",
      meaningVi: "Gần đây có chỗ nào ăn ngon không?",
      situation: "Hỏi lễ tân — câu hỏi hay nhất khi tới chỗ lạ",
      isCoreChunk: true,
    },
    {
      id: "w17-what-do-people-eat-here",
      week: 17,
      phrase: "What do people eat here?",
      meaningVi: "Ở đây người ta hay ăn món gì?",
      situation: "Hỏi món địa phương",
      isCoreChunk: false,
    },
    {
      id: "w17-ill-have-what-they-are-having",
      week: 17,
      phrase: "I'll have what they're having.",
      meaningVi: "Cho tôi giống món bàn kia.",
      situation: "Không đọc nổi thực đơn thì chỉ sang bàn bên",
      isCoreChunk: false,
    },
    {
      id: "w17-could-i-get-that-to-go",
      week: 17,
      phrase: "Could I get that to go?",
      meaningVi: "Cho tôi mang về được không?",
      situation: "Đổi ý phút chót",
      isCoreChunk: false,
    },
    {
      id: "w17-im-just-browsing",
      week: 17,
      phrase: "I'm just browsing, thanks.",
      meaningVi: "Tôi xem thôi, cảm ơn.",
      situation: "Trong cửa hàng",
      isCoreChunk: true,
    },
    {
      id: "w17-do-you-have-anything-cheaper",
      week: 17,
      phrase: "Do you have anything cheaper?",
      meaningVi: "Có cái nào rẻ hơn không?",
      situation: "Mặc cả kiểu nhẹ nhàng",
      isCoreChunk: true,
    },
    {
      id: "w17-ill-take-two",
      week: 17,
      phrase: "I'll take two, please.",
      meaningVi: "Cho tôi lấy hai cái.",
      situation: "Chốt mua",
      isCoreChunk: true,
    },
    {
      id: "w17-could-you-wrap-it",
      week: 17,
      phrase: "Could you wrap it, please? It's a gift.",
      meaningVi: "Bạn gói giúp tôi nhé? Tôi mua làm quà.",
      situation: "Mua quà",
      isCoreChunk: false,
    },
    {
      id: "w17-sorry-im-a-bit-lost",
      week: 17,
      phrase: "Sorry, I'm a bit lost. Could you help?",
      meaningVi: "Xin lỗi, tôi hơi lạc. Bạn giúp tôi được không?",
      situation: "Mở lời khi cần giúp — đủ lịch sự để ai cũng dừng lại",
      isCoreChunk: true,
    },
    {
      id: "w17-am-i-going-the-right-way",
      week: 17,
      phrase: "Am I going the right way?",
      meaningVi: "Tôi đi hướng này có đúng không?",
      situation: "Kiểm tra giữa đường",
      isCoreChunk: true,
    },
    {
      id: "w17-i-think-ive-been-here-before",
      week: 17,
      phrase: "I think I've been here before.",
      meaningVi: "Hình như tôi đi qua đây rồi.",
      situation: "Nhận ra mình đang đi vòng",
      isCoreChunk: false,
    },
    {
      id: "w17-that-makes-sense",
      week: 17,
      phrase: "That makes sense.",
      meaningVi: "Vậy thì hợp lý.",
      situation: "Phản hồi khi hiểu ra — câu đệm dùng khắp nơi",
      isCoreChunk: true,
    },
    {
      id: "w17-sorry-one-more-question",
      week: 17,
      phrase: "Sorry, one more question.",
      meaningVi: "Xin lỗi, cho tôi hỏi thêm một câu.",
      situation: "Hỏi tiếp mà không bị coi là phiền",
      isCoreChunk: true,
    },
    {
      id: "w17-youve-been-very-helpful",
      week: 17,
      phrase: "You've been very helpful.",
      meaningVi: "Bạn giúp tôi nhiều lắm.",
      situation: "Cảm ơn kiểu ấm áp hơn 'thank you'",
      isCoreChunk: true,
    },
    {
      id: "w17-its-been-a-long-day",
      week: 17,
      phrase: "It's been a long day.",
      meaningVi: "Hôm nay dài thật.",
      situation: "Small talk cuối ngày",
      isCoreChunk: false,
    },
    {
      id: "w17-i-really-appreciate-it",
      week: 17,
      phrase: "I really appreciate it.",
      meaningVi: "Tôi cảm ơn bạn thật lòng.",
      situation: "Cảm ơn khi ai đó giúp việc đáng kể",
      isCoreChunk: true,
    },
    {
      id: "w17-have-a-good-evening",
      week: 17,
      phrase: "Have a good evening.",
      meaningVi: "Chúc bạn buổi tối vui vẻ.",
      situation: "Chào tạm biệt buổi tối",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w17-listen-arrival",
    week: 17,
    titleVi: "Từ sân bay về tới khách sạn",
    lines: [
      { speaker: "Nhân viên", text: "Nothing to declare? Good. Enjoy your stay." },
      { speaker: "Tài xế", text: "Where to? The Riverside Hotel? That's about thirty minutes." },
      { speaker: "Hung", text: "I'm not in a hurry. How far is it from here?" },
      { speaker: "Tài xế", text: "Twelve kilometres. Traffic is bad, but we'll get there." },
      { speaker: "Lễ tân", text: "Welcome. I'm afraid your room isn't ready until two." },
      { speaker: "Hung", text: "Could I check in early? And is there anywhere good to eat nearby?" },
      { speaker: "Lễ tân", text: "I'll see what I can do. There's a noodle place two streets away." },
    ],
    gist: {
      promptVi: "Đoạn này kể chuyện gì?",
      options: [
        "Ông Hùng đi từ sân bay về khách sạn",
        "Ông Hùng bị mất hành lý ở sân bay",
        "Ông Hùng đi mua sắm trong thành phố",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Từ sân bay về khách sạn bao xa?",
        options: ["12 km", "30 km", "2 km"],
        answerIndex: 0,
      },
      {
        promptVi: "Phòng khách sạn sẵn sàng lúc mấy giờ?",
        options: ["2 giờ", "12 giờ", "Đã sẵn sàng rồi"],
        answerIndex: 0,
      },
      {
        promptVi: "Lễ tân gợi ý chỗ ăn nào?",
        options: ["Quán mì cách hai con phố", "Nhà hàng trong khách sạn", "Chợ đêm"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I'm not in a", answer: "hurry", after: ". How far is it from here?" },
      { before: "Twelve", answer: "kilometres", after: ". Traffic is bad, but we'll get there." },
      { before: "Could I check in", answer: "early", after: "?" },
    ],
  },

  shadowing: [
    {
      id: "w17-sh-1",
      text: "Sorry, I'm a bit lost. Could you help?",
      focusVi: "Hai câu ngắn, giọng nhẹ — ôn lại tuần 6",
    },
    {
      id: "w17-sh-2",
      text: "What's the best way to get there?",
      focusVi: "Nối 'get there' cho mượt — ôn nối âm tuần 7",
    },
    {
      id: "w17-sh-3",
      text: "Is there anywhere good to eat nearby?",
      focusVi: "Câu dài — một hơi, đừng ngắt vụn",
    },
    {
      id: "w17-sh-4",
      text: "You've been very helpful. I really appreciate it.",
      focusVi: "Bật rõ 'v' trong 'very' và 't' cuối trong 'it'",
    },
    {
      id: "w17-sh-5",
      text: "That makes sense. Sorry, one more question.",
      focusVi: "Đổi giọng giữa hai câu: câu đầu xuống, câu sau mở ra",
    },
  ],

  roleplay: {
    id: "w17-rp-oneday",
    week: 17,
    titleVi: "Một ngày trọn vẹn: hải quan → taxi → khách sạn → hỏi đường → quán ăn",
    goalVi: "Đi hết một ngày mà không đứt mạch, dù tình huống đổi liên tục",
    startTurnId: "customs",
    // Vẫn không gợi ý — đây là bài chốt giai đoạn 2.
    hintLevel: "none",
    surpriseTurnId: "room-not-ready",
    turns: [
      {
        id: "customs",
        say: "Next, please. What's the purpose of your visit?",
        sayVi: "Mời người tiếp theo. Anh sang đây với mục đích gì ạ?",
        hints: ["I'm here on holiday, for two weeks.", "I'm just passing through."],
        branches: [
          { keywords: ["holiday", "passing", "through", "visit", "weeks", "business", "family"], next: "taxi" },
        ],
        fallbackNext: "customs-again",
      },
      {
        id: "customs-again",
        say: "Sorry — business or holiday?",
        sayVi: "Xin lỗi — công việc hay du lịch ạ?",
        hints: ["Holiday.", "I'm here on holiday."],
        branches: [
          { keywords: ["holiday", "business", "passing", "visit"], next: "taxi" },
        ],
        fallbackNext: "taxi",
      },
      {
        id: "taxi",
        // Chuyển tình huống không báo trước: vừa xong hải quan là tới taxi.
        say: "Taxi? Where are you going?",
        sayVi: "Taxi không anh? Anh đi đâu ạ?",
        hints: ["The Riverside Hotel, please.", "To the Riverside Hotel. How far is it from here?"],
        branches: [
          { keywords: ["hotel", "riverside", "far", "how", "please", "take"], next: "in-taxi" },
        ],
        fallbackNext: "in-taxi",
      },
      {
        id: "in-taxi",
        say: "About thirty minutes. Traffic is bad today.",
        sayVi: "Khoảng ba mươi phút. Hôm nay đường đông lắm.",
        hints: ["I'm not in a hurry.", "That's fine. I'm not in a hurry."],
        branches: [
          { keywords: ["hurry", "fine", "okay", "ok", "no", "problem", "slow"], next: "hotel" },
        ],
        fallbackNext: "hotel",
      },
      {
        id: "hotel",
        say: "Welcome to the Riverside. Do you have a booking?",
        sayVi: "Chào mừng tới Riverside. Anh có đặt phòng không ạ?",
        hints: ["Yes, under the name Hung.", "Yes. Could I check in early?"],
        branches: [
          { keywords: ["yes", "booking", "name", "hung", "check", "early", "reservation"], next: "ask-food" },
        ],
        fallbackNext: "ask-food",
      },
      {
        id: "room-not-ready",
        // Lệch kịch bản: phòng chưa dọn xong. Đây là chuyện xảy ra thật nhất
        // trong cả ngày, và nó buộc người học phải xoay chứ không đọc thuộc.
        say: "Ah — one problem. Your room isn't ready until two o'clock.",
        sayVi: "À — có một chuyện. Phòng của anh tới hai giờ mới xong ạ.",
        hints: [
          "Do you mind if I leave my bags here?",
          "That's fine. Is there anywhere good to eat nearby?",
        ],
        branches: [
          { keywords: ["bags", "leave", "mind", "fine", "eat", "nearby", "okay", "ok", "wait"], next: "ask-food" },
        ],
        fallbackNext: "ask-food",
      },
      {
        id: "ask-food",
        say: "Is there anything else I can help you with?",
        sayVi: "Anh còn cần gì nữa không ạ?",
        hints: [
          "Is there anywhere good to eat nearby?",
          "Yes. What's the best way to get to the old town?",
        ],
        branches: [
          { keywords: ["eat", "nearby", "food", "best", "way", "town", "where", "anywhere"], next: "directions" },
        ],
        fallbackNext: "directions",
      },
      {
        id: "directions",
        say: "There's a noodle place two streets away. Turn left, then right at the bank.",
        sayVi: "Có quán mì cách hai con phố. Anh rẽ trái, tới ngân hàng thì rẽ phải.",
        hints: ["So, left then right at the bank?", "Is it within walking distance?"],
        branches: [
          { keywords: ["so", "left", "right", "bank", "walking", "distance", "far"], next: "restaurant" },
        ],
        fallbackNext: "restaurant",
      },
      {
        id: "restaurant",
        say: "Good evening! Table for one? Here's the menu.",
        sayVi: "Chào buổi tối! Bàn một người ạ? Thực đơn đây.",
        hints: ["What do people eat here?", "What do you recommend? I can't eat seafood."],
        branches: [
          { keywords: ["eat", "recommend", "people", "seafood", "cant", "what", "here"], next: "shop" },
        ],
        fallbackNext: "shop",
      },
      {
        id: "shop",
        say: "...Later, at the shop next door: Hello! Looking for anything?",
        sayVi: "...Lát sau, ở cửa hàng bên cạnh: Xin chào! Anh tìm gì ạ?",
        hints: ["I'm just browsing, thanks.", "Do you have anything cheaper?"],
        branches: [
          { keywords: ["browsing", "cheaper", "looking", "just", "take", "two", "gift"], next: "end" },
        ],
        fallbackNext: "end",
      },
      {
        id: "end",
        say: "No problem. It's been a long day for you, I think!",
        sayVi: "Không sao ạ. Chắc hôm nay anh đi cả ngày mệt rồi nhỉ!",
        hints: ["It has. You've been very helpful.", "Yes. Have a good evening."],
        branches: [
          { keywords: ["helpful", "evening", "yes", "long", "thanks", "thank", "appreciate"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
