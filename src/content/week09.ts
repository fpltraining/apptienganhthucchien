/**
 * Tuần 9 — Nhà hàng nâng cao + BỘ CÂU CỨU HỘ (curriculum §7, giai đoạn 2).
 *
 * Tuần này mở màn giai đoạn 2, và việc quan trọng nhất của nó không phải là món
 * ăn — mà là bộ câu cứu hộ. Giáo trình xếp nhóm câu này ngang hàng với từ vựng
 * vì lý do rất thực tế: người học sẽ nghe không kịp, sẽ bí từ, sẽ hiểu nhầm.
 * Ai có sẵn câu để gỡ thì cuộc nói chuyện đi tiếp; ai không có thì đứng im rồi
 * bỏ cuộc.
 *
 * Vì vậy bài đóng vai tuần này cố tình có một chỗ nói nhanh và một từ lạ, để
 * người học buộc phải dùng câu cứu hộ chứ không chỉ học thuộc nó.
 */

import type { WeekContent } from "./types";

export const week09: WeekContent = {
  week: 9,
  titleVi: "Nhà hàng nâng cao & bộ câu cứu hộ",
  pronunciationFocusVi: "Nói câu dài mà không đứt hơi — ngắt đúng chỗ, không ngắt từng chữ",

  vocabulary: [
    {
      id: "w9-say-that-again",
      week: 9,
      phrase: "Sorry, could you say that again?",
      meaningVi: "Xin lỗi, bạn nói lại được không?",
      situation: "CÂU CỨU HỘ — nghe không kịp",
      isCoreChunk: true,
    },
    {
      id: "w9-speak-slower",
      week: 9,
      phrase: "Could you speak a bit slower, please?",
      meaningVi: "Bạn nói chậm lại một chút được không?",
      situation: "CÂU CỨU HỘ — người ta nói nhanh quá",
      isCoreChunk: true,
    },
    {
      id: "w9-what-does-mean",
      week: 9,
      phrase: "What does that mean?",
      meaningVi: "Cái đó nghĩa là gì?",
      situation: "CÂU CỨU HỘ — gặp từ lạ",
      isCoreChunk: true,
    },
    {
      id: "w9-i-dont-know-that-word",
      week: 9,
      phrase: "Sorry, I don't know that word.",
      meaningVi: "Xin lỗi, tôi không biết từ đó.",
      situation: "CÂU CỨU HỘ — nói thẳng ra, đừng gật bừa",
      isCoreChunk: true,
    },
    {
      id: "w9-let-me-think",
      week: 9,
      phrase: "Let me think...",
      meaningVi: "Để tôi nghĩ đã...",
      situation: "CÂU CỨU HỘ — câu giờ khi bí từ, thay vì đứng im",
      isCoreChunk: true,
    },
    {
      id: "w9-how-do-i-say-this",
      week: 9,
      phrase: "How do I say this...",
      meaningVi: "Nói cái này thế nào nhỉ...",
      situation: "CÂU CỨU HỘ — câu giờ mà vẫn giữ lượt nói của mình",
      isCoreChunk: true,
    },
    {
      id: "w9-its-like-a",
      week: 9,
      phrase: "It's like a small bowl.",
      meaningVi: "Nó giống như một cái bát nhỏ.",
      situation: "CÂU CỨU HỘ — không biết từ thì tả vòng ra",
      isCoreChunk: true,
    },
    {
      id: "w9-the-thing-you-use-for",
      week: 9,
      phrase: "The thing you use for eating soup.",
      meaningVi: "Cái dùng để ăn súp ấy.",
      situation: "CÂU CỨU HỘ — tả công dụng khi quên tên đồ vật",
      isCoreChunk: true,
    },
    {
      id: "w9-so-you-mean",
      week: 9,
      phrase: "So you mean the fish, not the chicken?",
      meaningVi: "Ý bạn là món cá, không phải món gà, đúng không?",
      situation: "CÂU CỨU HỘ — xác nhận lại cho chắc",
      isCoreChunk: true,
    },
    {
      id: "w9-just-to-make-sure",
      week: 9,
      phrase: "Just to make sure — no seafood?",
      meaningVi: "Cho chắc nhé — không có hải sản đúng không?",
      situation: "CÂU CỨU HỘ — kiểm tra lại chuyện quan trọng",
      isCoreChunk: true,
    },
    {
      id: "w9-id-like-to-book",
      week: 9,
      phrase: "I'd like to book a table for four.",
      meaningVi: "Tôi muốn đặt bàn cho bốn người.",
      situation: "Đặt bàn",
      isCoreChunk: true,
    },
    {
      id: "w9-at-seven-tonight",
      week: 9,
      phrase: "At seven o'clock tonight.",
      meaningVi: "Bảy giờ tối nay.",
      situation: "Nói giờ đặt bàn",
      isCoreChunk: false,
    },
    {
      id: "w9-do-you-have-a-table",
      week: 9,
      phrase: "Do you have a table free?",
      meaningVi: "Còn bàn trống không?",
      situation: "Tới quán mà chưa đặt trước",
      isCoreChunk: true,
    },
    {
      id: "w9-whats-in-this-dish",
      week: 9,
      phrase: "What's in this dish?",
      meaningVi: "Món này có những gì trong đó?",
      situation: "Hỏi thành phần — quan trọng với người kiêng hoặc dị ứng",
      isCoreChunk: true,
    },
    {
      id: "w9-does-it-have-nuts",
      week: 9,
      phrase: "Does it have nuts in it?",
      meaningVi: "Trong đó có đậu phộng không?",
      situation: "Hỏi thành phần cụ thể",
      isCoreChunk: true,
    },
    {
      id: "w9-i-cant-eat",
      week: 9,
      phrase: "I can't eat seafood.",
      meaningVi: "Tôi không ăn được hải sản.",
      situation: "Nói dứt khoát, không phải nói cho lịch sự",
      isCoreChunk: true,
    },
    {
      id: "w9-without-onion",
      week: 9,
      phrase: "Without onion, please.",
      meaningVi: "Cho tôi bỏ hành ra nhé.",
      situation: "Yêu cầu riêng cho món",
      isCoreChunk: true,
    },
    {
      id: "w9-is-it-possible",
      week: 9,
      phrase: "Is it possible to change that?",
      meaningVi: "Đổi cái đó được không ạ?",
      situation: "Yêu cầu kiểu lịch sự gián tiếp",
      isCoreChunk: false,
    },
    {
      id: "w9-this-is-not-what-i-ordered",
      week: 9,
      phrase: "Sorry, this is not what I ordered.",
      meaningVi: "Xin lỗi, đây không phải món tôi gọi.",
      situation: "Khiếu nại món sai — nói bình thản, quán sẽ đổi",
      isCoreChunk: true,
    },
    {
      id: "w9-the-food-is-cold",
      week: 9,
      phrase: "Excuse me, the food is cold.",
      meaningVi: "Xin lỗi, món này nguội rồi.",
      situation: "Khiếu nại nhẹ",
      isCoreChunk: false,
    },
    {
      id: "w9-could-you-check",
      week: 9,
      phrase: "Could you check the bill, please?",
      meaningVi: "Anh xem lại hoá đơn giúp tôi.",
      situation: "Nghi hoá đơn tính sai — hỏi 'xem lại giúp' chứ đừng nói 'sai rồi'",
      isCoreChunk: true,
    },
    {
      id: "w9-we-didnt-order-this",
      week: 9,
      phrase: "We didn't order this drink.",
      meaningVi: "Chúng tôi không gọi món nước này.",
      situation: "Hoá đơn có món lạ",
      isCoreChunk: false,
    },
    {
      id: "w9-can-we-split-the-bill",
      week: 9,
      phrase: "Can we split the bill?",
      meaningVi: "Chúng tôi chia tiền được không?",
      situation: "Đi ăn nhóm",
      isCoreChunk: true,
    },
    {
      id: "w9-separate-bills-please",
      week: 9,
      phrase: "Separate bills, please.",
      meaningVi: "Cho tính riêng từng người.",
      situation: "Nói rõ hơn khi chia tiền",
      isCoreChunk: false,
    },
    {
      id: "w9-everything-was-lovely",
      week: 9,
      phrase: "Everything was lovely, thank you.",
      meaningVi: "Mọi thứ đều ngon, cảm ơn.",
      situation: "Câu khen lúc ra về",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w9-listen-booking",
    week: 9,
    titleVi: "Đặt bàn rồi phát hiện món có hải sản",
    lines: [
      { speaker: "Anna", text: "Good evening. Do you have a booking?" },
      { speaker: "Hung", text: "Yes, a table for four at seven. The name is Hung." },
      { speaker: "Anna", text: "Perfect. Tonight we have a special — prawn laksa." },
      { speaker: "Hung", text: "Sorry, I don't know that word. What does laksa mean?" },
      { speaker: "Anna", text: "It's like a soup, with noodles and prawns." },
      { speaker: "Hung", text: "Just to make sure — no seafood for me. I can't eat seafood." },
      { speaker: "Anna", text: "Of course. I'll bring you the chicken one instead." },
    ],
    gist: {
      promptVi: "Chuyện gì xảy ra trong đoạn này?",
      options: [
        "Ông Hùng hỏi lại một từ lạ rồi báo mình dị ứng",
        "Ông Hùng khiếu nại hoá đơn sai",
        "Ông Hùng đổi giờ đặt bàn",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng đặt bàn mấy người, lúc mấy giờ?",
        options: ["4 người, 7 giờ", "7 người, 4 giờ", "2 người, 7 giờ"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng làm gì khi nghe từ 'laksa'?",
        options: ["Hỏi từ đó nghĩa là gì", "Gật đầu cho qua", "Gọi luôn món đó"],
        answerIndex: 0,
      },
      {
        promptVi: "Cuối cùng quán mang món gì ra?",
        options: ["Món gà", "Món tôm", "Không mang gì"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Sorry, I don't know that", answer: "word", after: ". What does laksa mean?" },
      { before: "It's like a", answer: "soup", after: ", with noodles and prawns." },
      { before: "Just to make", answer: "sure", after: "— no seafood for me." },
    ],
  },

  shadowing: [
    {
      id: "w9-sh-1",
      text: "Sorry, I don't know that word. What does that mean?",
      focusVi: "Hai câu, ngắt hơi một lần ở giữa — đừng nói liền một mạch",
    },
    {
      id: "w9-sh-2",
      text: "Let me think... how do I say this...",
      focusVi: "Nói chậm và thoải mái — đây là câu câu giờ, càng bình tĩnh càng tốt",
    },
    {
      id: "w9-sh-3",
      text: "It's like a small bowl, the thing you use for soup.",
      focusVi: "Câu dài — ngắt sau 'bowl', rồi nói tiếp",
    },
    {
      id: "w9-sh-4",
      text: "Just to make sure — no seafood?",
      focusVi: "Lên giọng ở cuối, cho người ta biết mình đang hỏi lại",
    },
    {
      id: "w9-sh-5",
      text: "Sorry, this is not what I ordered.",
      focusVi: "Nói nhẹ nhàng, bật rõ 'd' cuối trong 'ordered'",
    },
  ],

  roleplay: {
    id: "w9-rp-restaurant",
    week: 9,
    titleVi: "Ăn nhà hàng: hỏi món, báo dị ứng, đổi món sai",
    goalVi: "Dùng được câu cứu hộ khi gặp từ lạ, và báo được món mình không ăn được",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Good evening! Do you have a booking with us tonight?",
        sayVi: "Chào buổi tối! Anh có đặt bàn trước không ạ?",
        hints: ["Yes, a table for four at seven.", "No. Do you have a table free?"],
        branches: [
          { keywords: ["yes", "booking", "table", "four", "seven", "name"], next: "special" },
          { keywords: ["no", "free", "have"], next: "special" },
        ],
        fallbackNext: "repeat-booking",
      },
      {
        id: "repeat-booking",
        say: "Sorry — did you book a table?",
        sayVi: "Xin lỗi — anh có đặt bàn không ạ?",
        hints: ["Yes, a table for four.", "No. Do you have a table free?"],
        branches: [
          { keywords: ["yes", "no", "table", "book", "four", "free"], next: "special" },
        ],
        fallbackNext: "special",
      },
      {
        id: "special",
        // Chỗ này cố tình ném ra một từ người học chắc chắn không biết. Nhánh
        // "đúng" của tuần 9 là hỏi lại, không phải đoán bừa rồi gật.
        say: "Tonight's special is prawn laksa. Would you like that?",
        sayVi: "Món đặc biệt tối nay là laksa tôm. Anh dùng thử nhé?",
        hints: ["Sorry, I don't know that word. What does that mean?", "What's in this dish?"],
        branches: [
          { keywords: ["what", "mean", "word", "know", "sorry", "dish"], next: "explain" },
          { keywords: ["yes", "okay", "ok", "like"], next: "allergy-check" },
        ],
        fallbackNext: "explain",
      },
      {
        id: "explain",
        say: "Of course. It's like a soup, with noodles and prawns.",
        sayVi: "Được ạ. Nó giống món súp, có mì và tôm.",
        hints: ["I can't eat seafood.", "Just to make sure — does it have nuts in it?"],
        branches: [
          { keywords: ["seafood", "cant", "allergic", "nuts", "sure", "without"], next: "allergy-check" },
          { keywords: ["okay", "ok", "yes", "like", "good"], next: "allergy-check" },
        ],
        fallbackNext: "allergy-check",
      },
      {
        id: "allergy-check",
        say: "Is there anything you can't eat?",
        sayVi: "Anh có kiêng món gì không ạ?",
        hints: ["I can't eat seafood.", "Without onion, please."],
        branches: [
          { keywords: ["seafood", "cant", "allergic", "onion", "without", "nuts", "meat"], next: "wrong-dish" },
          { keywords: ["no", "nothing", "fine"], next: "wrong-dish" },
        ],
        fallbackNext: "wrong-dish",
      },
      {
        id: "wrong-dish",
        // Món bị mang nhầm: người học phải nói ra, chứ ăn cho xong thì tuần 9
        // coi như không dạy được gì.
        say: "Here is your food — the prawn laksa.",
        sayVi: "Món của anh đây ạ — laksa tôm.",
        hints: ["Sorry, this is not what I ordered.", "Excuse me, I can't eat seafood."],
        branches: [
          { keywords: ["not", "sorry", "ordered", "seafood", "cant", "wrong", "excuse"], next: "fix" },
        ],
        fallbackNext: "fix",
      },
      {
        id: "fix",
        say: "Oh! I'm so sorry. I'll bring the chicken one right away.",
        sayVi: "Ôi! Tôi xin lỗi ạ. Tôi mang món gà ra ngay.",
        hints: ["Thank you.", "Thank you. Could you check the bill, please?"],
        branches: [
          { keywords: ["thanks", "thank", "bill", "check", "okay", "ok"], next: "bill" },
        ],
        fallbackNext: "bill",
      },
      {
        id: "bill",
        say: "Here is your bill. Together or separately?",
        sayVi: "Hoá đơn của anh đây. Tính chung hay tính riêng ạ?",
        hints: ["Can we split the bill?", "Together, please. Everything was lovely."],
        branches: [
          { keywords: ["split", "separate", "together", "lovely", "thanks", "thank"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
