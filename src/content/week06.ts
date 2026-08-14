/**
 * Tuần 6 — Hỏi đường & phương hướng (curriculum §7).
 *
 * Trọng tâm phát âm: ngữ điệu câu hỏi. Câu hỏi có/không thì lên giọng cuối câu,
 * câu hỏi bắt đầu bằng "where/how" thì xuống giọng. Nói đúng chữ mà sai giọng
 * thì người ta không biết mình đang hỏi hay đang kể.
 *
 * Tuần này còn dạy một việc quan trọng hơn cả từ vựng: nghe không hiểu thì hỏi
 * lại, và nhắc lại chỉ dẫn cho người ta xác nhận. Người học không cần hiểu 100%
 * — chỉ cần biết cách kiểm tra lại.
 */

import type { WeekContent } from "./types";

export const week06: WeekContent = {
  week: 6,
  titleVi: "Hỏi đường & phương hướng",
  pronunciationFocusVi: "Ngữ điệu: câu hỏi có/không lên giọng, câu hỏi 'where' xuống giọng",

  vocabulary: [
    {
      id: "w6-excuse-me-can-you-help",
      week: 6,
      phrase: "Excuse me, can you help me?",
      meaningVi: "Xin lỗi, bạn giúp tôi được không?",
      situation: "Mở lời trước khi hỏi đường",
      isCoreChunk: true,
    },
    {
      id: "w6-where-is-the-station",
      week: 6,
      phrase: "Where is the station?",
      meaningVi: "Nhà ga ở đâu?",
      situation: "Hỏi đường tới một chỗ",
      isCoreChunk: true,
    },
    {
      id: "w6-how-do-i-get-to",
      week: 6,
      phrase: "How do I get to the market?",
      meaningVi: "Tôi đi tới chợ bằng cách nào?",
      situation: "Hỏi đường — câu này dùng được cho mọi địa điểm",
      isCoreChunk: true,
    },
    {
      id: "w6-is-it-far",
      week: 6,
      phrase: "Is it far from here?",
      meaningVi: "Từ đây tới đó có xa không?",
      situation: "Hỏi để biết nên đi bộ hay bắt xe",
      isCoreChunk: true,
    },
    {
      id: "w6-can-i-walk",
      week: 6,
      phrase: "Can I walk there?",
      meaningVi: "Tôi đi bộ tới đó được không?",
      situation: "Hỏi thêm về khoảng cách",
      isCoreChunk: true,
    },
    {
      id: "w6-how-long-does-it-take",
      week: 6,
      phrase: "How long does it take?",
      meaningVi: "Đi mất bao lâu?",
      situation: "Hỏi thời gian đi",
      isCoreChunk: true,
    },
    {
      id: "w6-go-straight",
      week: 6,
      phrase: "Go straight on.",
      meaningVi: "Đi thẳng.",
      situation: "Chỉ dẫn — phải nghe hiểu, không cần nói nhiều",
      isCoreChunk: true,
    },
    {
      id: "w6-turn-left",
      week: 6,
      phrase: "Turn left at the corner.",
      meaningVi: "Tới góc đường thì rẽ trái.",
      situation: "Chỉ dẫn",
      isCoreChunk: true,
    },
    {
      id: "w6-turn-right",
      week: 6,
      phrase: "Turn right after the bank.",
      meaningVi: "Qua ngân hàng thì rẽ phải.",
      situation: "Chỉ dẫn",
      isCoreChunk: true,
    },
    {
      id: "w6-its-on-the-left",
      week: 6,
      phrase: "It's on the left.",
      meaningVi: "Nó nằm bên trái.",
      situation: "Chỉ vị trí",
      isCoreChunk: true,
    },
    {
      id: "w6-next-to",
      week: 6,
      phrase: "It's next to the hospital.",
      meaningVi: "Nó nằm cạnh bệnh viện.",
      situation: "Chỉ vị trí theo mốc quen thuộc",
      isCoreChunk: true,
    },
    {
      id: "w6-opposite",
      week: 6,
      phrase: "It's opposite the school.",
      meaningVi: "Nó nằm đối diện trường học.",
      situation: "Chỉ vị trí",
      isCoreChunk: false,
    },
    {
      id: "w6-behind",
      week: 6,
      phrase: "It's behind the market.",
      meaningVi: "Nó nằm sau chợ.",
      situation: "Chỉ vị trí",
      isCoreChunk: false,
    },
    {
      id: "w6-second-street",
      week: 6,
      phrase: "Take the second street.",
      meaningVi: "Đi vào con đường thứ hai.",
      situation: "Chỉ dẫn có đếm — dễ nghe nhầm, phải hỏi lại",
      isCoreChunk: false,
    },
    {
      id: "w6-cross-the-road",
      week: 6,
      phrase: "Cross the road.",
      meaningVi: "Qua đường.",
      situation: "Chỉ dẫn",
      isCoreChunk: false,
    },
    {
      id: "w6-so-turn-left",
      week: 6,
      phrase: "So, turn left and go straight?",
      meaningVi: "Vậy là rẽ trái rồi đi thẳng, đúng không?",
      situation: "Nhắc lại cho người ta xác nhận — kỹ năng quan trọng nhất tuần này",
      isCoreChunk: true,
    },
    {
      id: "w6-can-you-show-me",
      week: 6,
      phrase: "Can you show me on the map?",
      meaningVi: "Bạn chỉ giúp tôi trên bản đồ được không?",
      situation: "Khi nghe mãi không hiểu — đưa điện thoại ra",
      isCoreChunk: true,
    },
    {
      id: "w6-im-lost",
      week: 6,
      phrase: "I'm lost.",
      meaningVi: "Tôi bị lạc.",
      situation: "Hai chữ, giải quyết được rất nhiều chuyện",
      isCoreChunk: true,
    },
    {
      id: "w6-where-am-i",
      week: 6,
      phrase: "Where am I now?",
      meaningVi: "Giờ tôi đang ở đâu?",
      situation: "Hỏi khi mở bản đồ ra mà vẫn không biết mình ở đâu",
      isCoreChunk: false,
    },
    {
      id: "w6-is-this-the-right-way",
      week: 6,
      phrase: "Is this the right way?",
      meaningVi: "Đi lối này có đúng không?",
      situation: "Hỏi kiểm tra giữa đường",
      isCoreChunk: true,
    },
    {
      id: "w6-where-is-the-toilet",
      week: 6,
      phrase: "Where is the toilet?",
      meaningVi: "Nhà vệ sinh ở đâu?",
      situation: "Câu ai cũng cần, không ai muốn học muộn",
      isCoreChunk: true,
    },
    {
      id: "w6-is-there-a-bus",
      week: 6,
      phrase: "Is there a bus to the airport?",
      meaningVi: "Có xe buýt đi sân bay không?",
      situation: "Hỏi phương tiện",
      isCoreChunk: false,
    },
    {
      id: "w6-sorry-i-dont-know",
      week: 6,
      phrase: "Sorry, I don't know.",
      meaningVi: "Xin lỗi, tôi không biết.",
      situation: "Khi người khác hỏi đường mình — cứ trả lời thật",
      isCoreChunk: false,
    },
    {
      id: "w6-thanks-for-your-help-w6",
      week: 6,
      phrase: "Thanks a lot for your help.",
      meaningVi: "Cảm ơn bạn nhiều đã giúp.",
      situation: "Câu chốt sau khi được chỉ đường",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w6-listen-directions",
    week: 6,
    titleVi: "Hỏi đường ra nhà ga",
    lines: [
      { speaker: "Hung", text: "Excuse me, can you help me? I'm lost." },
      { speaker: "Anna", text: "Of course. Where do you want to go?" },
      { speaker: "Hung", text: "Where is the station? Is it far from here?" },
      { speaker: "Anna", text: "Not far. Go straight on, then turn left at the corner." },
      { speaker: "Hung", text: "So, go straight and turn left?" },
      { speaker: "Anna", text: "Yes. The station is next to the hospital, on the left." },
      { speaker: "Hung", text: "Thanks a lot for your help!" },
    ],
    gist: {
      promptVi: "Ông Hùng cần gì?",
      options: ["Tìm đường ra nhà ga", "Mua vé xe buýt", "Tìm bệnh viện gần nhất"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Đi thẳng xong thì rẽ hướng nào?",
        options: ["Rẽ trái", "Rẽ phải", "Quay lại"],
        answerIndex: 0,
      },
      {
        promptVi: "Nhà ga nằm cạnh cái gì?",
        options: ["Bệnh viện", "Trường học", "Chợ"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng làm gì sau khi nghe chỉ dẫn?",
        options: ["Nhắc lại để xác nhận", "Bỏ đi luôn", "Hỏi giá vé"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Excuse me, can you help me? I'm", answer: "lost", after: "." },
      { before: "Go straight on, then turn", answer: "left", after: "at the corner." },
      { before: "The station is", answer: "next", after: "to the hospital, on the left." },
    ],
  },

  shadowing: [
    {
      id: "w6-sh-1",
      text: "Is it far from here?",
      focusVi: "Câu hỏi có/không — lên giọng ở chữ cuối",
    },
    {
      id: "w6-sh-2",
      text: "Where is the station?",
      focusVi: "Câu hỏi 'where' — xuống giọng ở chữ cuối",
    },
    {
      id: "w6-sh-3",
      text: "Go straight on, then turn left.",
      focusVi: "'str' trong 'straight' — ôn lại cụm phụ âm tuần 4",
    },
    {
      id: "w6-sh-4",
      text: "So, turn left and go straight?",
      focusVi: "Nhắc lại thì lên giọng cuối câu, cho người ta biết mình đang hỏi",
    },
    {
      id: "w6-sh-5",
      text: "Can you show me on the map?",
      focusVi: "Bật rõ 'p' cuối trong 'map'",
    },
  ],

  roleplay: {
    id: "w6-rp-directions",
    week: 6,
    titleVi: "Hỏi đường người lạ",
    goalVi: "Hỏi được đường, nghe chỉ dẫn, và nhắc lại cho chắc",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Hello? You look a bit lost. Are you okay?",
        sayVi: "Chào bạn? Trông bạn như đang lạc đường. Bạn ổn chứ?",
        hints: ["Excuse me, can you help me?", "Yes, I'm lost. Where is the station?"],
        branches: [
          { keywords: ["lost", "help", "where", "station", "market", "yes"], next: "give-directions" },
        ],
        fallbackNext: "repeat-where",
      },
      {
        id: "repeat-where",
        say: "Sorry — where do you want to go?",
        sayVi: "Xin lỗi — bạn muốn đi đâu?",
        hints: ["Where is the station?", "How do I get to the market?"],
        branches: [
          { keywords: ["station", "market", "hospital", "where", "how", "get"], next: "give-directions" },
        ],
        fallbackNext: "give-directions",
      },
      {
        id: "give-directions",
        say: "Go straight on, then turn left at the corner.",
        sayVi: "Đi thẳng, tới góc đường thì rẽ trái.",
        // Nhắc lại là kỹ năng chính của tuần, nên nó có nhánh riêng và được
        // khen; hỏi "xa không" cũng là câu đúng và đi tiếp bình thường.
        hints: ["So, turn left and go straight?", "Is it far from here?"],
        branches: [
          { keywords: ["so", "left", "straight", "right"], next: "confirm" },
          { keywords: ["far", "walk", "long", "bus"], next: "how-far" },
        ],
        fallbackNext: "repeat-directions",
      },
      {
        id: "repeat-directions",
        say: "Let me say it again, slowly. Go straight, then turn left.",
        sayVi: "Để tôi nói lại chậm nhé. Đi thẳng, rồi rẽ trái.",
        hints: ["So, turn left and go straight?", "Can you show me on the map?"],
        branches: [
          { keywords: ["so", "left", "straight", "map", "show"], next: "confirm" },
        ],
        fallbackNext: "confirm",
      },
      {
        id: "confirm",
        say: "Exactly! It's next to the hospital, on the left.",
        sayVi: "Đúng rồi! Nó nằm cạnh bệnh viện, bên trái.",
        hints: ["Is it far from here?", "Thanks a lot for your help."],
        branches: [
          { keywords: ["far", "walk", "long", "how"], next: "how-far" },
          { keywords: ["thanks", "thank", "help", "bye"], next: null },
        ],
        fallbackNext: "how-far",
      },
      {
        id: "how-far",
        say: "It's not far. You can walk — about ten minutes.",
        sayVi: "Không xa đâu. Bạn đi bộ được — khoảng mười phút.",
        hints: ["Thanks a lot for your help.", "Thank you very much."],
        branches: [
          { keywords: ["thanks", "thank", "help", "great", "bye", "later"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
