/**
 * Tuần 21 — Phỏng vấn xin việc, phần 2 (curriculum §7).
 *
 * Đồng hồ xuống 5 giây, và người phỏng vấn "lạnh" — không gật gù, không khen,
 * không đỡ lời. Đây là chỗ khác hẳn mọi tuần trước: từ tuần 1 tới giờ, nhân vật
 * trong app luôn tử tế và luôn đỡ cho người học. Tuần này thì không.
 *
 * Lý do phải làm vậy chứ không phải để làm khó: người học quen với đối phương
 * dễ chịu sẽ sụp ngay lần đầu gặp người khó chịu thật. Thà gặp trong app trước.
 *
 * Nội dung: câu hỏi tình huống ("kể một lần bạn..."), xử lý câu hỏi khó, đàm
 * phán lương, và đặt câu hỏi ngược. Phần đàm phán lương dạy đúng một nguyên tắc:
 * đừng nói con số trước, và nếu buộc phải nói thì nói một khoảng.
 */

import type { WeekContent } from "./types";

export const week21: WeekContent = {
  week: 21,
  titleVi: "Phỏng vấn xin việc — phần 2",
  pronunciationFocusVi: "Giữ giọng vững khi người ta không phản hồi gì — im lặng không phải là chê",
  responseDeadlineMs: 5000,

  vocabulary: [
    {
      id: "w21-can-i-give-you-an-example",
      week: 21,
      phrase: "Can I give you an example?",
      meaningVi: "Tôi kể một ví dụ được không ạ?",
      situation: "CÂU HỎI TÌNH HUỐNG — mở đầu, và mua được vài giây để nhớ chuyện",
      isCoreChunk: true,
    },
    {
      id: "w21-in-one-case",
      week: 21,
      phrase: "In one case, a customer was very angry.",
      meaningVi: "Có một lần, một khách hàng rất tức giận.",
      situation: "KỂ CHUYỆN — nhịp 1: tình huống",
      isCoreChunk: true,
    },
    {
      id: "w21-what-i-did-was",
      week: 21,
      phrase: "What I did was listen first, then explain.",
      meaningVi: "Tôi đã nghe trước, rồi mới giải thích.",
      situation: "KỂ CHUYỆN — nhịp 2: mình làm gì",
      isCoreChunk: true,
    },
    {
      id: "w21-in-the-end",
      week: 21,
      phrase: "In the end, he stayed with us.",
      meaningVi: "Cuối cùng anh ấy vẫn ở lại với công ty.",
      situation: "KỂ CHUYỆN — nhịp 3: kết quả. Ba nhịp là đủ, đừng kể lê thê",
      isCoreChunk: true,
    },
    {
      id: "w21-i-learned-from-that",
      week: 21,
      phrase: "I learned from that.",
      meaningVi: "Tôi rút được kinh nghiệm từ chuyện đó.",
      situation: "KỂ CHUYỆN — câu kết khi chuyện có phần thất bại",
      isCoreChunk: true,
    },
    {
      id: "w21-it-didnt-go-well-at-first",
      week: 21,
      phrase: "It didn't go well at first.",
      meaningVi: "Ban đầu việc đó không suôn sẻ.",
      situation: "Kể chuyện thất bại — thành thật nghe đáng tin hơn hoàn hảo",
      isCoreChunk: true,
    },
    {
      id: "w21-i-handle-pressure-by",
      week: 21,
      phrase: "I handle pressure by planning ahead.",
      meaningVi: "Tôi chịu áp lực bằng cách lên kế hoạch trước.",
      situation: "Câu hỏi về áp lực — trả lời bằng cách làm, không bằng tính cách",
      isCoreChunk: true,
    },
    {
      id: "w21-if-i-disagree-with-my-boss",
      week: 21,
      phrase: "If I disagree with my boss, I say so privately.",
      meaningVi: "Nếu không đồng ý với sếp, tôi nói riêng.",
      situation: "Câu hỏi khó — trả lời cho thấy mình vừa có chính kiến vừa biết điều",
      isCoreChunk: true,
    },
    {
      id: "w21-thats-a-difficult-question",
      week: 21,
      phrase: "That's a difficult question.",
      meaningVi: "Câu này khó đấy ạ.",
      situation: "CÂU GIỜ — thừa nhận là câu khó, tự nhiên hơn là im",
      isCoreChunk: true,
    },
    {
      id: "w21-honestly",
      week: 21,
      phrase: "Honestly, I don't have experience with that.",
      meaningVi: "Thật lòng thì tôi chưa có kinh nghiệm việc đó.",
      situation: "CÂU KHÓ — không biết thì nhận, đừng bịa. Người phỏng vấn nào cũng nhận ra",
      isCoreChunk: true,
    },
    {
      id: "w21-but-i-learn-quickly",
      week: 21,
      phrase: "But I learn quickly, and I'd like to try.",
      meaningVi: "Nhưng tôi học nhanh, và tôi muốn thử.",
      situation: "CÂU KHÓ — nối ngay sau câu nhận, để không kết thúc bằng chữ 'không'",
      isCoreChunk: true,
    },
    {
      id: "w21-what-does-the-role-involve",
      week: 21,
      phrase: "What does the role involve day to day?",
      meaningVi: "Công việc hằng ngày của vị trí này gồm những gì ạ?",
      situation: "HỎI NGƯỢC — câu hỏi tốt nhất, cho thấy mình nghĩ về việc thật",
      isCoreChunk: true,
    },
    {
      id: "w21-who-would-i-report-to",
      week: 21,
      phrase: "Who would I report to?",
      meaningVi: "Tôi sẽ làm việc dưới quyền ai ạ?",
      situation: "HỎI NGƯỢC",
      isCoreChunk: true,
    },
    {
      id: "w21-whats-the-team-like",
      week: 21,
      phrase: "What's the team like?",
      meaningVi: "Đội ngũ ở đây thế nào ạ?",
      situation: "HỎI NGƯỢC — câu nhẹ nhàng, ai cũng thích trả lời",
      isCoreChunk: true,
    },
    {
      id: "w21-whats-the-next-step",
      week: 21,
      phrase: "What's the next step?",
      meaningVi: "Bước tiếp theo là gì ạ?",
      situation: "HỎI NGƯỢC — luôn hỏi câu này trước khi ra về",
      isCoreChunk: true,
    },
    {
      id: "w21-what-is-the-salary-range",
      week: 21,
      phrase: "What's the salary range for this role?",
      meaningVi: "Vị trí này mức lương khoảng bao nhiêu ạ?",
      situation: "LƯƠNG — hỏi khoảng của họ trước, đừng nói số của mình",
      isCoreChunk: true,
    },
    {
      id: "w21-what-did-you-have-in-mind",
      week: 21,
      phrase: "What did you have in mind?",
      meaningVi: "Bên anh chị dự tính khoảng bao nhiêu ạ?",
      situation: "LƯƠNG — đẩy câu hỏi về phía họ một cách lịch sự",
      isCoreChunk: true,
    },
    {
      id: "w21-im-looking-for-between",
      week: 21,
      phrase: "I'm looking for between twenty and twenty-five.",
      meaningVi: "Tôi mong mức từ hai mươi tới hai mươi lăm.",
      situation: "LƯƠNG — buộc phải nói thì nói một khoảng, không nói một con số",
      isCoreChunk: true,
    },
    {
      id: "w21-is-that-negotiable",
      week: 21,
      phrase: "Is that negotiable?",
      meaningVi: "Mức đó có thương lượng được không ạ?",
      situation: "LƯƠNG — ba chữ, hỏi được rất nhiều",
      isCoreChunk: true,
    },
    {
      id: "w21-that-works-for-me",
      week: 21,
      phrase: "That works for me.",
      meaningVi: "Mức đó tôi thấy được ạ.",
      situation: "LƯƠNG — chấp nhận",
      isCoreChunk: true,
    },
    {
      id: "w21-could-i-have-time-to-think",
      week: 21,
      phrase: "Could I have a day to think about it?",
      meaningVi: "Cho tôi một ngày suy nghĩ được không ạ?",
      situation: "LƯƠNG — đừng gật ngay, xin thời gian là chuyện bình thường",
      isCoreChunk: true,
    },
    {
      id: "w21-when-would-you-need-me-to-start",
      week: 21,
      phrase: "When would you need me to start?",
      meaningVi: "Anh chị cần tôi bắt đầu khi nào ạ?",
      situation: "Hỏi ngày vào làm",
      isCoreChunk: false,
    },
    {
      id: "w21-i-can-start-in-two-weeks",
      week: 21,
      phrase: "I can start in two weeks.",
      meaningVi: "Hai tuần nữa tôi bắt đầu được.",
      situation: "Trả lời ngày vào làm",
      isCoreChunk: false,
    },
    {
      id: "w21-thank-you-for-your-time-today",
      week: 21,
      phrase: "Thank you for your time today.",
      meaningVi: "Cảm ơn anh chị đã dành thời gian hôm nay.",
      situation: "Câu ra về — nói kể cả khi buổi phỏng vấn không suôn sẻ",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w21-listen-interview2",
    week: 21,
    titleVi: "Nửa sau buổi phỏng vấn: câu khó và chuyện lương",
    lines: [
      { speaker: "Anna", text: "Tell me about a time you dealt with a difficult person." },
      { speaker: "Hung", text: "Can I give you an example? In one case, a customer was very angry." },
      { speaker: "Anna", text: "Go on." },
      { speaker: "Hung", text: "What I did was listen first, then explain. In the end, he stayed with us." },
      { speaker: "Anna", text: "Right. And what are your salary expectations?" },
      { speaker: "Hung", text: "What did you have in mind? What's the salary range for this role?" },
      { speaker: "Anna", text: "Twenty to twenty-four. Is that acceptable?" },
    ],
    gist: {
      promptVi: "Phần này của buổi phỏng vấn nói về gì?",
      options: [
        "Câu hỏi tình huống và chuyện lương",
        "Giới thiệu bản thân",
        "Tham quan văn phòng",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng xử lý khách giận thế nào?",
        options: ["Nghe trước rồi mới giải thích", "Gọi quản lý ra", "Xin lỗi rồi bỏ đi"],
        answerIndex: 0,
      },
      {
        promptVi: "Kết quả câu chuyện ra sao?",
        options: ["Khách vẫn ở lại", "Khách bỏ đi", "Không nói rõ"],
        answerIndex: 0,
      },
      {
        promptVi: "Khi bị hỏi về lương, ông Hùng làm gì?",
        options: [
          "Hỏi ngược lại mức của công ty",
          "Nói ngay con số mình muốn",
          "Từ chối trả lời",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Can I give you an", answer: "example", after: "? In one case, a customer was very angry." },
      { before: "What I did was", answer: "listen", after: "first, then explain." },
      { before: "What's the salary", answer: "range", after: "for this role?" },
    ],
  },

  shadowing: [
    {
      id: "w21-sh-1",
      text: "Can I give you an example?",
      focusVi: "Nói ngay, không ngập ngừng — câu này vừa hỏi vừa mua thời gian",
    },
    {
      id: "w21-sh-2",
      text: "What I did was listen first, then explain.",
      focusVi: "Ngắt sau 'first' — hai việc, hai nhịp",
    },
    {
      id: "w21-sh-3",
      text: "Honestly, I don't have experience with that. But I learn quickly.",
      focusVi: "Câu đầu bình thản, câu sau chắc giọng lên",
    },
    {
      id: "w21-sh-4",
      text: "What did you have in mind?",
      focusVi: "Nối 'have in' thành một hơi, lên giọng cuối",
    },
    {
      id: "w21-sh-5",
      text: "Could I have a day to think about it?",
      focusVi: "Giọng bình tĩnh — xin thời gian không phải là do dự",
    },
  ],

  roleplay: {
    id: "w21-rp-interview2",
    week: 21,
    titleVi: "Phỏng vấn với người phỏng vấn lạnh lùng",
    goalVi: "Kể chuyện ba nhịp, nhận cái mình chưa biết, và đàm phán lương mà không hớ",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "cold-push",
    turns: [
      {
        id: "start",
        // Không chào hỏi, không làm quen. Người phỏng vấn tuần này lạnh ngay từ
        // câu đầu, và đó là chủ ý.
        say: "Right. Tell me about a time you dealt with a difficult person.",
        sayVi: "Được rồi. Kể tôi nghe một lần anh phải xử lý một người khó tính.",
        hints: [
          "Can I give you an example? In one case, a customer was very angry.",
          "In one case, a customer was very angry.",
        ],
        branches: [
          { keywords: ["example", "case", "customer", "once", "time", "angry", "colleague"], next: "go-on" },
        ],
        fallbackNext: "cold-prompt",
      },
      {
        id: "cold-prompt",
        say: "...I'm listening.",
        sayVi: "...Tôi đang nghe đây.",
        hints: [
          "Can I give you an example?",
          "That's a difficult question. Let me think for a second.",
        ],
        branches: [
          { keywords: ["example", "difficult", "think", "second", "case", "customer", "once"], next: "go-on" },
        ],
        fallbackNext: "go-on",
      },
      {
        id: "go-on",
        say: "Go on.",
        sayVi: "Nói tiếp đi.",
        hints: [
          "What I did was listen first, then explain.",
          "What I did was listen first. In the end, he stayed with us.",
        ],
        branches: [
          { keywords: ["did", "listen", "explain", "end", "stayed", "learned", "first"], next: "hard-question" },
        ],
        fallbackNext: "hard-question",
      },
      {
        id: "hard-question",
        say: "Have you managed a budget over one million?",
        sayVi: "Anh đã từng quản lý ngân sách trên một triệu chưa?",
        // Câu trả lời đúng ở đây là "chưa" — bịa ra là hỏng. Cả hai nhánh đều
        // đi tiếp, nhưng nội dung tuần này dạy nhận cho thật.
        hints: [
          "Honestly, I don't have experience with that. But I learn quickly.",
          "No, but I managed a team of six.",
        ],
        branches: [
          { keywords: ["honestly", "dont", "no", "but", "learn", "quickly", "managed", "experience"], next: "pressure" },
        ],
        fallbackNext: "pressure",
      },
      {
        id: "cold-push",
        // Lệch kịch bản: bị ngắt lời và ép. Chuyện này xảy ra trong phỏng vấn
        // thật, và phản xạ đúng là bình tĩnh chứ không phải nói nhanh hơn.
        say: "You're taking a long time to answer. Is that normal for you?",
        sayVi: "Anh trả lời hơi lâu đấy. Bình thường anh vẫn vậy à?",
        hints: [
          "I like to think before I answer.",
          "Sorry — let me think for a second, then I'll answer.",
        ],
        branches: [
          { keywords: ["think", "before", "answer", "sorry", "second", "careful", "no"], next: "pressure" },
        ],
        fallbackNext: "pressure",
      },
      {
        id: "pressure",
        say: "How do you handle pressure?",
        sayVi: "Anh chịu áp lực thế nào?",
        hints: [
          "I handle pressure by planning ahead.",
          "I handle pressure by planning ahead. It didn't go well at first, but I learned.",
        ],
        branches: [
          { keywords: ["handle", "pressure", "planning", "ahead", "plan", "learned", "calm"], next: "salary" },
        ],
        fallbackNext: "salary",
      },
      {
        id: "salary",
        say: "And what are your salary expectations?",
        sayVi: "Anh mong mức lương bao nhiêu?",
        // Nguyên tắc của tuần: đừng nói số trước.
        hints: [
          "What did you have in mind?",
          "What's the salary range for this role?",
        ],
        branches: [
          { keywords: ["mind", "range", "salary", "role", "what", "budget"], next: "their-number" },
          { keywords: ["between", "twenty", "looking", "thirty"], next: "their-number" },
        ],
        fallbackNext: "their-number",
      },
      {
        id: "their-number",
        say: "Twenty to twenty-four. Is that acceptable?",
        sayVi: "Hai mươi tới hai mươi tư. Anh thấy được không?",
        hints: [
          "Is that negotiable?",
          "Could I have a day to think about it?",
        ],
        branches: [
          { keywords: ["negotiable", "day", "think", "works", "about", "acceptable", "yes"], next: "their-turn" },
        ],
        fallbackNext: "their-turn",
      },
      {
        id: "their-turn",
        say: "Fine. Do you have any questions for me?",
        sayVi: "Được. Anh có câu hỏi gì cho tôi không?",
        hints: [
          "What does the role involve day to day?",
          "What's the next step?",
        ],
        branches: [
          { keywords: ["role", "involve", "next", "step", "team", "report", "start"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "We'll let you know by Friday.",
        sayVi: "Trước thứ Sáu chúng tôi sẽ báo lại.",
        hints: [
          "Thank you for your time today.",
          "Thank you. I look forward to hearing from you.",
        ],
        branches: [
          { keywords: ["thank", "time", "forward", "hearing", "today"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
