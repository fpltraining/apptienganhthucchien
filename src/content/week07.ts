/**
 * Tuần 7 — Gọi taxi / xe công nghệ (curriculum §7).
 *
 * Trọng tâm phát âm: nối âm — "pick up" nghe thành "pi-cắp", "get off" thành
 * "ghe-tóp". Đây là lý do lớn nhất khiến người học nghe từng chữ thì hiểu mà
 * nghe cả câu thì không: người bản xứ không đọc rời từng chữ.
 *
 * Tuần này cũng là lần đầu người học phải phàn nàn bằng tiếng Anh. Câu phàn nàn
 * để ở mức nhẹ và lịch sự — mục tiêu là giải quyết được việc, không phải thắng
 * cuộc cãi.
 */

import type { WeekContent } from "./types";

export const week07: WeekContent = {
  week: 7,
  titleVi: "Gọi taxi / xe công nghệ",
  pronunciationFocusVi: "Nối âm: pick_up, get_off, drop_me — đọc liền, không rời từng chữ",

  vocabulary: [
    {
      id: "w7-are-you-free",
      week: 7,
      phrase: "Are you free?",
      meaningVi: "Xe có trống không?",
      situation: "Vẫy taxi ngoài đường",
      isCoreChunk: true,
    },
    {
      id: "w7-can-you-take-me-to",
      week: 7,
      phrase: "Can you take me to this address?",
      meaningVi: "Cho tôi tới địa chỉ này được không?",
      situation: "Đưa địa chỉ cho tài xế — chỉ vào điện thoại cũng được",
      isCoreChunk: true,
    },
    {
      id: "w7-to-the-airport",
      week: 7,
      phrase: "To the airport, please.",
      meaningVi: "Cho tôi ra sân bay.",
      situation: "Nói điểm đến",
      isCoreChunk: true,
    },
    {
      id: "w7-how-much-to",
      week: 7,
      phrase: "How much to the airport?",
      meaningVi: "Ra sân bay bao nhiêu tiền?",
      situation: "Hỏi giá trước khi lên xe — hỏi trước đỡ cãi sau",
      isCoreChunk: true,
    },
    {
      id: "w7-do-you-use-the-meter",
      week: 7,
      phrase: "Do you use the meter?",
      meaningVi: "Anh có bật đồng hồ không?",
      situation: "Hỏi cách tính tiền",
      isCoreChunk: true,
    },
    {
      id: "w7-please-use-the-meter",
      week: 7,
      phrase: "Please use the meter.",
      meaningVi: "Anh bật đồng hồ giúp tôi.",
      situation: "Yêu cầu — nói bình thản, không gắt",
      isCoreChunk: true,
    },
    {
      id: "w7-how-long-to-get-there",
      week: 7,
      phrase: "How long does it take to get there?",
      meaningVi: "Đi tới đó mất bao lâu?",
      situation: "Hỏi thời gian",
      isCoreChunk: false,
    },
    {
      id: "w7-im-in-a-hurry",
      week: 7,
      phrase: "I'm in a hurry.",
      meaningVi: "Tôi đang vội.",
      situation: "Nói khi sắp trễ giờ",
      isCoreChunk: true,
    },
    {
      id: "w7-can-you-pick-me-up",
      week: 7,
      phrase: "Can you pick me up here?",
      meaningVi: "Anh đón tôi ở đây được không?",
      situation: "Nói với tài xế qua điện thoại",
      isCoreChunk: true,
    },
    {
      id: "w7-im-waiting-outside",
      week: 7,
      phrase: "I'm waiting outside the gate.",
      meaningVi: "Tôi đang đứng chờ ngoài cổng.",
      situation: "Nói vị trí mình đang đứng",
      isCoreChunk: true,
    },
    {
      id: "w7-im-wearing-a-blue-shirt",
      week: 7,
      phrase: "I'm wearing a blue shirt.",
      meaningVi: "Tôi mặc áo xanh.",
      situation: "Để tài xế nhận ra mình",
      isCoreChunk: false,
    },
    {
      id: "w7-stop-here-please",
      week: 7,
      phrase: "Stop here, please.",
      meaningVi: "Cho tôi xuống ở đây.",
      situation: "Yêu cầu dừng xe",
      isCoreChunk: true,
    },
    {
      id: "w7-drop-me-at-the-corner",
      week: 7,
      phrase: "Drop me at the corner.",
      meaningVi: "Cho tôi xuống ở góc đường.",
      situation: "Chỉ chỗ xuống cụ thể",
      isCoreChunk: true,
    },
    {
      id: "w7-i-get-off-here",
      week: 7,
      phrase: "I get off here.",
      meaningVi: "Tôi xuống ở đây.",
      situation: "Nói lúc chuẩn bị xuống xe",
      isCoreChunk: true,
    },
    {
      id: "w7-could-you-wait",
      week: 7,
      phrase: "Could you wait five minutes?",
      meaningVi: "Anh đợi tôi năm phút được không?",
      situation: "Khi cần ghé nhanh một chỗ",
      isCoreChunk: false,
    },
    {
      id: "w7-can-you-slow-down",
      week: 7,
      phrase: "Could you slow down, please?",
      meaningVi: "Anh chạy chậm lại giúp tôi.",
      situation: "Xe chạy nhanh quá — nói lịch sự nhưng nói ngay",
      isCoreChunk: true,
    },
    {
      id: "w7-this-is-not-the-way",
      week: 7,
      phrase: "Sorry, this is not the way.",
      meaningVi: "Xin lỗi, đi lối này không đúng.",
      situation: "Phàn nàn nhẹ khi thấy xe đi vòng",
      isCoreChunk: false,
    },
    {
      id: "w7-the-meter-says",
      week: 7,
      phrase: "The meter says eighty thousand.",
      meaningVi: "Đồng hồ báo tám mươi nghìn.",
      situation: "Khi tài xế đòi giá khác với đồng hồ",
      isCoreChunk: false,
    },
    {
      id: "w7-can-i-have-a-receipt-w7",
      week: 7,
      phrase: "Can I have a receipt, please?",
      meaningVi: "Cho tôi xin hoá đơn.",
      situation: "Xin hoá đơn khi xuống xe",
      isCoreChunk: false,
    },
    {
      id: "w7-keep-the-change-w7",
      week: 7,
      phrase: "Keep the change, thanks.",
      meaningVi: "Khỏi thối, cảm ơn anh.",
      situation: "Trả tiền xong",
      isCoreChunk: false,
    },
    {
      id: "w7-i-left-my-bag",
      week: 7,
      phrase: "I left my bag in the car.",
      meaningVi: "Tôi để quên túi trên xe.",
      situation: "Câu cứu hộ — hy vọng không phải dùng, nhưng phải biết",
      isCoreChunk: true,
    },
    {
      id: "w7-is-this-the-right-car",
      week: 7,
      phrase: "Is this the right car?",
      meaningVi: "Đây có đúng xe không?",
      situation: "Kiểm tra trước khi lên xe",
      isCoreChunk: false,
    },
    {
      id: "w7-please-turn-on-the-air",
      week: 7,
      phrase: "Could you turn on the air conditioning?",
      meaningVi: "Anh bật máy lạnh giúp tôi.",
      situation: "Yêu cầu nhỏ trên xe",
      isCoreChunk: false,
    },
    {
      id: "w7-thank-you-drive-safely",
      week: 7,
      phrase: "Thank you. Drive safely!",
      meaningVi: "Cảm ơn anh. Anh đi đường cẩn thận!",
      situation: "Câu chào lúc xuống xe",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w7-listen-taxi",
    week: 7,
    titleVi: "Đi taxi ra sân bay",
    lines: [
      { speaker: "Anna", text: "Hello! Are you free? Where are you going?" },
      { speaker: "Hung", text: "To the airport, please. How much to the airport?" },
      { speaker: "Anna", text: "About two hundred thousand. I use the meter." },
      { speaker: "Hung", text: "Good. I'm in a hurry — my flight is at seven." },
      { speaker: "Anna", text: "No problem. I'll pick up the highway. Twenty minutes." },
      { speaker: "Hung", text: "Could you slow down, please?" },
      { speaker: "Anna", text: "Sorry! Okay. You can get off at the corner there." },
    ],
    gist: {
      promptVi: "Ông Hùng đang đi đâu?",
      options: ["Ra sân bay", "Về nhà", "Tới bệnh viện"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Đi hết khoảng bao nhiêu tiền?",
        options: ["200 nghìn", "20 nghìn", "80 nghìn"],
        answerIndex: 0,
      },
      {
        promptVi: "Chuyến bay của ông Hùng lúc mấy giờ?",
        options: ["7 giờ", "9 giờ", "5 giờ"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng yêu cầu tài xế điều gì?",
        options: ["Chạy chậm lại", "Bật máy lạnh", "Dừng lại đợi"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "To the airport, please. How much to the", answer: "airport", after: "?" },
      { before: "I'm in a", answer: "hurry", after: "— my flight is at seven." },
      { before: "You can get", answer: "off", after: "at the corner there." },
    ],
  },

  shadowing: [
    {
      id: "w7-sh-1",
      text: "Can you pick me up here?",
      focusVi: "'pick up' đọc liền thành 'pi-cắp'",
    },
    {
      id: "w7-sh-2",
      text: "I get off at the corner.",
      focusVi: "'get off' đọc liền thành 'ghe-tóp'",
    },
    {
      id: "w7-sh-3",
      text: "Drop me at the gate, please.",
      focusVi: "'drop me' — chữ 'p' dính luôn vào 'me'",
    },
    {
      id: "w7-sh-4",
      text: "Could you slow down, please?",
      focusVi: "Nói nhẹ nhàng — đây là câu nhờ, không phải câu gắt",
    },
    {
      id: "w7-sh-5",
      text: "I'm in a hurry.",
      focusVi: "'in a' nối liền thành một hơi",
    },
  ],

  roleplay: {
    id: "w7-rp-taxi",
    week: 7,
    titleVi: "Đi taxi",
    goalVi: "Nói được điểm đến, hỏi giá, và yêu cầu dừng xe",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Hello! Where are you going?",
        sayVi: "Xin chào! Anh đi đâu ạ?",
        hints: ["To the airport, please.", "Can you take me to this address?"],
        branches: [
          { keywords: ["airport", "address", "station", "take", "to", "market"], next: "price" },
        ],
        fallbackNext: "repeat-where",
      },
      {
        id: "repeat-where",
        say: "Sorry — where to?",
        sayVi: "Xin lỗi — anh đi đâu ạ?",
        hints: ["To the airport, please."],
        branches: [
          { keywords: ["airport", "address", "station", "market", "home"], next: "price" },
        ],
        fallbackNext: "price",
      },
      {
        id: "price",
        say: "Okay. Two hundred thousand dong.",
        sayVi: "Được ạ. Hai trăm nghìn đồng.",
        hints: ["Do you use the meter?", "That's too expensive."],
        branches: [
          { keywords: ["meter", "expensive", "much", "cheaper"], next: "meter" },
          { keywords: ["okay", "ok", "yes", "hurry", "fine"], next: "on-the-way" },
        ],
        fallbackNext: "meter",
      },
      {
        id: "meter",
        say: "Yes, I use the meter. Please get in.",
        sayVi: "Vâng, tôi bật đồng hồ. Mời anh lên xe.",
        hints: ["I'm in a hurry.", "How long does it take to get there?"],
        branches: [
          { keywords: ["hurry", "long", "how", "time", "fast"], next: "on-the-way" },
        ],
        fallbackNext: "on-the-way",
      },
      {
        id: "on-the-way",
        say: "We'll be there in twenty minutes.",
        sayVi: "Khoảng hai mươi phút nữa là tới ạ.",
        hints: ["Could you slow down, please?", "Could you turn on the air conditioning?"],
        branches: [
          { keywords: ["slow", "air", "conditioning", "wait", "window"], next: "arrive" },
          { keywords: ["okay", "ok", "thanks", "thank", "good"], next: "arrive" },
        ],
        fallbackNext: "arrive",
      },
      {
        id: "arrive",
        say: "Here we are. Where should I stop?",
        sayVi: "Tới nơi rồi ạ. Anh xuống chỗ nào?",
        hints: ["Stop here, please.", "Drop me at the corner."],
        branches: [
          { keywords: ["stop", "drop", "corner", "here", "gate", "off"], next: "pay" },
        ],
        fallbackNext: "pay",
      },
      {
        id: "pay",
        say: "That's two hundred thousand. Thank you!",
        sayVi: "Của anh hai trăm nghìn. Cảm ơn anh!",
        hints: ["Here you are. Keep the change.", "Thank you. Drive safely!"],
        branches: [
          { keywords: ["here", "change", "thanks", "thank", "receipt", "safely"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
