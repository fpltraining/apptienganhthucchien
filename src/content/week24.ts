/**
 * Tuần 24 — Giao tiếp xã hội chiều sâu (curriculum §7).
 *
 * Đồng hồ nới lại 5 giây. Không phải nhẹ đi: tuần 23 đo phản xạ, tuần này đo
 * sức bền — kể một câu chuyện hai phút, nêu quan điểm, tranh luận nhẹ. Ba giây
 * là đúng cho câu cấp cứu, nhưng bắt người ta kể chuyện trong ba giây thì chỉ
 * tạo ra những câu cụt.
 *
 * Giáo trình yêu cầu "hội thoại mở, không kịch bản" ở tuần này. Phần mở thật sự
 * nằm ở khối nói tự do cuối buổi (Zone B) — kịch bản dưới đây chỉ làm một việc:
 * đẩy người học vào thói quen nói dài hơn một câu. Mỗi turn ở đây đều hỏi thêm
 * "vì sao", "rồi sao nữa", để lượt nói dài dần ra.
 *
 * Đây cũng là tuần cuối có từ mới đáng kể — tuần 25 và 26 đóng băng nội dung
 * theo §giai đoạn 3, chỉ củng cố chứ không thêm.
 */

import type { WeekContent } from "./types";

export const week24: WeekContent = {
  week: 24,
  titleVi: "Kể chuyện, nêu quan điểm & tranh luận nhẹ",
  pronunciationFocusVi: "Nói dài mà không đều đều — lên xuống giọng theo nội dung",
  responseDeadlineMs: 5000,

  vocabulary: [
    {
      id: "w24-something-funny-happened",
      week: 24,
      phrase: "Something funny happened last week.",
      meaningVi: "Tuần trước có chuyện buồn cười lắm.",
      situation: "MỞ CHUYỆN — câu mở làm người ta dừng lại nghe",
      isCoreChunk: true,
    },
    {
      id: "w24-you-wont-believe-this",
      week: 24,
      phrase: "You won't believe this.",
      meaningVi: "Bạn không tin được đâu.",
      situation: "MỞ CHUYỆN — kéo sự chú ý",
      isCoreChunk: true,
    },
    {
      id: "w24-so-i-was",
      week: 24,
      phrase: "So I was waiting at the station...",
      meaningVi: "Số là tôi đang đứng chờ ở nhà ga...",
      situation: "KỂ CHUYỆN — dựng bối cảnh, dùng thì tiếp diễn quá khứ",
      isCoreChunk: true,
    },
    {
      id: "w24-and-then-suddenly",
      week: 24,
      phrase: "And then, suddenly, the lights went out.",
      meaningVi: "Rồi tự nhiên đèn tắt phụt.",
      situation: "KỂ CHUYỆN — chỗ ngoặt. 'Suddenly' báo cho người nghe biết đang tới đoạn hay",
      isCoreChunk: true,
    },
    {
      id: "w24-at-first-i-thought",
      week: 24,
      phrase: "At first I thought it was a joke.",
      meaningVi: "Ban đầu tôi tưởng đùa.",
      situation: "KỂ CHUYỆN — kể cả suy nghĩ của mình, chuyện mới sống",
      isCoreChunk: true,
    },
    {
      id: "w24-it-turned-out",
      week: 24,
      phrase: "It turned out he was my neighbour.",
      meaningVi: "Hoá ra anh ấy là hàng xóm của tôi.",
      situation: "KỂ CHUYỆN — cú lật",
      isCoreChunk: true,
    },
    {
      id: "w24-anyway-in-the-end",
      week: 24,
      phrase: "Anyway, in the end, everyone laughed.",
      meaningVi: "Nói chung là cuối cùng ai cũng cười.",
      situation: "KỂ CHUYỆN — câu đóng. 'Anyway' báo hiệu chuyện sắp hết",
      isCoreChunk: true,
    },
    {
      id: "w24-thats-the-funny-part",
      week: 24,
      phrase: "And that's the funny part.",
      meaningVi: "Chỗ buồn cười là ở đó đấy.",
      situation: "KỂ CHUYỆN — chỉ cho người nghe biết chỗ nào đáng cười",
      isCoreChunk: false,
    },
    {
      id: "w24-i-feel-strongly-about",
      week: 24,
      phrase: "I feel strongly about this.",
      meaningVi: "Chuyện này tôi thấy khá quan trọng.",
      situation: "QUAN ĐIỂM — báo trước rằng mình sắp nói nghiêm túc",
      isCoreChunk: true,
    },
    {
      id: "w24-the-way-i-see-it",
      week: 24,
      phrase: "The way I see it, both sides have a point.",
      meaningVi: "Theo cách tôi nhìn thì cả hai bên đều có lý.",
      situation: "QUAN ĐIỂM — mẫu câu vừa có chính kiến vừa không gây gổ",
      isCoreChunk: true,
    },
    {
      id: "w24-it-depends-on",
      week: 24,
      phrase: "It depends on the situation.",
      meaningVi: "Cái đó còn tuỳ tình huống.",
      situation: "QUAN ĐIỂM — câu an toàn khi chưa muốn chọn phe",
      isCoreChunk: true,
    },
    {
      id: "w24-i-used-to-think-but-now",
      week: 24,
      phrase: "I used to think that, but now I'm not sure.",
      meaningVi: "Trước tôi cũng nghĩ vậy, nhưng giờ thì chưa chắc.",
      situation: "QUAN ĐIỂM — cho thấy mình chịu nghĩ lại, rất dễ được quý",
      isCoreChunk: true,
    },
    {
      id: "w24-i-take-your-point-but",
      week: 24,
      phrase: "I take your point, but have you thought about the cost?",
      meaningVi: "Tôi hiểu ý bạn, nhưng bạn đã tính tới chi phí chưa?",
      situation: "TRANH LUẬN NHẸ — phản biện bằng câu hỏi, không bằng lời khẳng định",
      isCoreChunk: true,
    },
    {
      id: "w24-i-see-it-differently",
      week: 24,
      phrase: "I see it a bit differently.",
      meaningVi: "Tôi thì nhìn hơi khác một chút.",
      situation: "TRANH LUẬN NHẸ — cách nói 'tôi không đồng ý' mà không ai phật ý",
      isCoreChunk: true,
    },
    {
      id: "w24-fair-enough",
      week: 24,
      phrase: "Fair enough.",
      meaningVi: "Ừ, cũng được.",
      situation: "TRANH LUẬN NHẸ — kết thúc êm khi không ai thuyết phục được ai",
      isCoreChunk: true,
    },
    {
      id: "w24-lets-agree-to-disagree",
      week: 24,
      phrase: "Let's agree to disagree.",
      meaningVi: "Thôi mỗi người một ý vậy.",
      situation: "TRANH LUẬN NHẸ — dừng đúng lúc, giữ được tình bạn",
      isCoreChunk: true,
    },
    {
      id: "w24-to-be-honest",
      week: 24,
      phrase: "To be honest, I was a bit disappointed.",
      meaningVi: "Nói thật thì tôi hơi thất vọng.",
      situation: "CẢM XÚC — 'to be honest' báo trước một câu thật lòng",
      isCoreChunk: true,
    },
    {
      id: "w24-i-was-really-moved",
      week: 24,
      phrase: "I was really moved by that.",
      meaningVi: "Chuyện đó làm tôi xúc động thật sự.",
      situation: "CẢM XÚC — nói tình cảm mà không sến",
      isCoreChunk: false,
    },
    {
      id: "w24-that-must-have-been-hard",
      week: 24,
      phrase: "That must have been hard for you.",
      meaningVi: "Chắc lúc đó bạn khổ tâm lắm.",
      situation: "ĐỒNG CẢM — câu quan trọng nhất khi người ta kể chuyện buồn",
      isCoreChunk: true,
    },
    {
      id: "w24-im-glad-it-worked-out",
      week: 24,
      phrase: "I'm glad it worked out.",
      meaningVi: "Mừng là chuyện rồi cũng ổn.",
      situation: "ĐỒNG CẢM — câu đáp khi chuyện kết thúc tốt",
      isCoreChunk: true,
    },
    {
      id: "w24-that-reminds-me-of",
      week: 24,
      phrase: "That reminds me of something.",
      meaningVi: "Chuyện đó làm tôi nhớ tới một việc.",
      situation: "NỐI CHUYỆN — cách chen chuyện của mình vào mà không cướp lời",
      isCoreChunk: true,
    },
    {
      id: "w24-speaking-of-that",
      week: 24,
      phrase: "Speaking of that, did you hear about...?",
      meaningVi: "Nhân nói chuyện đó, bạn nghe tin... chưa?",
      situation: "NỐI CHUYỆN — chuyển chủ đề mượt",
      isCoreChunk: true,
    },
    {
      id: "w24-sorry-im-talking-too-much",
      week: 24,
      phrase: "Sorry, I'm talking too much. What about you?",
      meaningVi: "Xin lỗi, tôi nói nhiều quá. Còn bạn thì sao?",
      situation: "Trả lượt — nói dài rồi thì nhớ nhường",
      isCoreChunk: true,
    },
    {
      id: "w24-weve-been-talking-for-ages",
      week: 24,
      phrase: "We've been talking for ages!",
      meaningVi: "Mình nói chuyện lâu ghê!",
      situation: "Câu vui lúc kết thúc — và cũng là dấu hiệu buổi học có kết quả",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w24-listen-story",
    week: 24,
    titleVi: "Bạn bè kể chuyện và tranh luận nhẹ",
    lines: [
      { speaker: "Anna", text: "Something funny happened last week. You won't believe this." },
      { speaker: "Hung", text: "Go on, I'm listening." },
      { speaker: "Anna", text: "So I was waiting at the station, and then suddenly the lights went out." },
      { speaker: "Hung", text: "At the station? That must have been strange." },
      { speaker: "Anna", text: "At first I thought it was a joke. It turned out a bird hit the wires." },
      { speaker: "Hung", text: "I see it a bit differently — I'd have been worried, not laughing!" },
      { speaker: "Anna", text: "Fair enough. Anyway, in the end everyone laughed about it." },
    ],
    gist: {
      promptVi: "Anna đang làm gì?",
      options: ["Kể một câu chuyện vui", "Phàn nàn về nhà ga", "Rủ đi chơi"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Chuyện xảy ra ở đâu?",
        options: ["Nhà ga", "Chợ", "Văn phòng"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao đèn tắt?",
        options: ["Chim đâm vào dây điện", "Có người tắt nhầm", "Bão"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng phản ứng thế nào?",
        options: [
          "Nói mình nhìn khác đi một chút",
          "Đồng ý hoàn toàn",
          "Không nói gì",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Something", answer: "funny", after: "happened last week." },
      { before: "And then suddenly the lights went", answer: "out", after: "." },
      { before: "At first I thought it was a", answer: "joke", after: "." },
    ],
  },

  shadowing: [
    {
      id: "w24-sh-1",
      text: "So I was waiting at the station, and then suddenly the lights went out.",
      focusVi: "Câu dài — giọng đều ở nửa đầu, nhấn mạnh ở 'suddenly'",
    },
    {
      id: "w24-sh-2",
      text: "At first I thought it was a joke. It turned out he was my neighbour.",
      focusVi: "Hai nhịp: tưởng thế này, hoá ra thế kia. Đổi giọng ở giữa",
    },
    {
      id: "w24-sh-3",
      text: "The way I see it, both sides have a point.",
      focusVi: "Ngắt nhẹ sau 'see it' — cho người nghe kịp bắt ý",
    },
    {
      id: "w24-sh-4",
      text: "That must have been hard for you.",
      focusVi: "Nói chậm và thấp giọng — đây là câu an ủi, không phải câu nhận xét",
    },
    {
      id: "w24-sh-5",
      text: "Fair enough. Let's agree to disagree.",
      focusVi: "Giọng nhẹ nhõm, không gằn — đây là câu làm hoà",
    },
  ],

  roleplay: {
    id: "w24-rp-story",
    week: 24,
    titleVi: "Kể chuyện và trao đổi quan điểm với bạn",
    goalVi: "Kể được một câu chuyện có đầu có cuối, và bất đồng mà vẫn vui vẻ",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "turn-it-around",
    turns: [
      {
        id: "start",
        say: "So — anything interesting happen to you lately?",
        sayVi: "Này — dạo này có chuyện gì hay không?",
        hints: [
          "Something funny happened last week. You won't believe this.",
          "Actually yes. So I was waiting at the station...",
        ],
        branches: [
          { keywords: ["something", "funny", "believe", "was", "happened", "actually", "yes", "week"], next: "go-on" },
        ],
        fallbackNext: "prompt-story",
      },
      {
        id: "prompt-story",
        say: "Nothing at all? Come on, there must be something.",
        sayVi: "Không có gì thật à? Thôi nào, chắc chắn phải có chuyện gì chứ.",
        hints: [
          "Something funny happened last week.",
          "So I was waiting at the station...",
        ],
        branches: [
          { keywords: ["something", "funny", "was", "waiting", "happened", "week", "okay"], next: "go-on" },
        ],
        fallbackNext: "go-on",
      },
      {
        id: "go-on",
        // Mỗi turn từ đây đều đẩy người học nói dài thêm một nhịp.
        say: "Oh? Go on, I'm listening.",
        sayVi: "Ồ? Kể đi, tôi đang nghe đây.",
        hints: [
          "So I was waiting at the station, and then suddenly the lights went out.",
          "At first I thought it was a joke.",
        ],
        branches: [
          { keywords: ["was", "then", "suddenly", "first", "thought", "waiting", "went"], next: "what-happened" },
        ],
        fallbackNext: "what-happened",
      },
      {
        id: "what-happened",
        say: "And then what?",
        sayVi: "Rồi sao nữa?",
        hints: [
          "It turned out he was my neighbour.",
          "Anyway, in the end, everyone laughed.",
        ],
        branches: [
          { keywords: ["turned", "out", "anyway", "end", "everyone", "laughed", "funny"], next: "opinion" },
        ],
        fallbackNext: "opinion",
      },
      {
        id: "turn-it-around",
        // Lệch kịch bản: bị hỏi ngược về cảm xúc thật, giữa lúc đang kể chuyện
        // vui. Đây là chỗ hội thoại chuyển từ xã giao sang chiều sâu.
        say: "That's funny... but honestly, were you a bit scared at the time?",
        sayVi: "Buồn cười thật... nhưng thật lòng, lúc đó bạn có sợ không?",
        hints: [
          "To be honest, I was a bit worried.",
          "To be honest, yes. At first I thought it was serious.",
        ],
        branches: [
          { keywords: ["honest", "worried", "scared", "yes", "first", "thought", "bit", "no"], next: "opinion" },
        ],
        fallbackNext: "opinion",
      },
      {
        id: "opinion",
        say: "You know, I think stations should have better back-up power. Don't you?",
        sayVi: "Này, tôi nghĩ nhà ga phải có điện dự phòng tốt hơn chứ. Bạn thấy sao?",
        hints: [
          "The way I see it, both sides have a point.",
          "I see it a bit differently. It depends on the cost.",
        ],
        branches: [
          { keywords: ["way", "see", "differently", "depends", "point", "think", "agree", "sure"], next: "push-back" },
        ],
        fallbackNext: "push-back",
      },
      {
        id: "push-back",
        say: "Really? But surely safety comes before cost.",
        sayVi: "Thật à? Nhưng an toàn phải trên chi phí chứ.",
        hints: [
          "I take your point, but have you thought about who pays?",
          "I used to think that, but now I'm not sure.",
        ],
        branches: [
          { keywords: ["take", "point", "thought", "used", "sure", "depends", "pays", "fair"], next: "settle" },
        ],
        fallbackNext: "settle",
      },
      {
        id: "settle",
        say: "Hmm. I still think I'm right, but I see what you mean.",
        sayVi: "Hừm. Tôi vẫn nghĩ tôi đúng, nhưng tôi hiểu ý bạn.",
        hints: [
          "Fair enough. Let's agree to disagree.",
          "Fair enough. Sorry, I'm talking too much. What about you?",
        ],
        branches: [
          { keywords: ["fair", "enough", "agree", "disagree", "talking", "about", "you"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "Ha! We've been talking for ages. Same time next week?",
        sayVi: "Ha! Mình nói chuyện lâu ghê. Tuần sau giờ này nhé?",
        hints: [
          "That would be lovely. See you then.",
          "Yes, same time. I'm glad we talked.",
        ],
        branches: [
          { keywords: ["lovely", "yes", "same", "time", "see", "glad", "then"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
