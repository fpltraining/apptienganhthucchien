/**
 * Tuần 20 — Phỏng vấn xin việc, phần 1 (curriculum §7).
 *
 * Đồng hồ 6 giây, không gợi ý. Phỏng vấn là tình huống duy nhất trong cả khoá
 * mà im lặng năm giây bị tính là câu trả lời — nên đồng hồ ở đây không phải trò
 * chơi, nó mô phỏng đúng cái áp lực thật.
 *
 * Tuần này chỉ làm nửa đầu buổi phỏng vấn: giới thiệu bản thân, kinh nghiệm,
 * điểm mạnh điểm yếu, và vì sao ứng tuyển. Câu hỏi tình huống và đàm phán lương
 * để sang tuần 21.
 *
 * Một điều tuần này dạy mà không tuần nào khác dạy: **câu trả lời có cấu trúc**.
 * "Tell me about yourself" không phải câu hỏi thân mật, nó là bài kiểm tra xem
 * người ta có sắp xếp được ý trong đầu không. Công thức ba nhịp — hiện tại,
 * quá khứ, vì sao ở đây — là thứ cứu được người nói tiếng Anh chưa trôi chảy,
 * vì nó thay việc "nói hay" bằng việc "nói có thứ tự".
 */

import type { WeekContent } from "./types";

export const week20: WeekContent = {
  week: 20,
  titleVi: "Phỏng vấn xin việc — phần 1",
  pronunciationFocusVi: "Giữ giọng đều và chậm khi hồi hộp — nói nhanh là nghe run",
  responseDeadlineMs: 6000,

  vocabulary: [
    {
      id: "w20-thanks-for-seeing-me",
      week: 20,
      phrase: "Thank you for seeing me today.",
      meaningVi: "Cảm ơn anh chị đã dành thời gian gặp tôi.",
      situation: "Câu đầu tiên khi vào phòng — nói được câu này là đỡ run hẳn",
      isCoreChunk: true,
    },
    {
      id: "w20-currently-i-work-as",
      week: 20,
      phrase: "Currently, I work as a teacher.",
      meaningVi: "Hiện tại tôi đang làm giáo viên.",
      situation: "NHỊP 1 — bắt đầu bằng hiện tại",
      isCoreChunk: true,
    },
    {
      id: "w20-before-that-i-spent",
      week: 20,
      phrase: "Before that, I spent five years in sales.",
      meaningVi: "Trước đó tôi làm năm năm trong ngành bán hàng.",
      situation: "NHỊP 2 — quá khứ, ngắn gọn",
      isCoreChunk: true,
    },
    {
      id: "w20-thats-why-im-here",
      week: 20,
      phrase: "That's why I'm interested in this role.",
      meaningVi: "Đó là lý do tôi quan tâm tới vị trí này.",
      situation: "NHỊP 3 — nối về hiện tại. Ba nhịp là xong, đừng kể dài",
      isCoreChunk: true,
    },
    {
      id: "w20-i-have-x-years-of-experience",
      week: 20,
      phrase: "I have ten years of experience in this field.",
      meaningVi: "Tôi có mười năm kinh nghiệm trong ngành này.",
      situation: "Nói kinh nghiệm bằng con số — con số nghe chắc hơn tính từ",
      isCoreChunk: true,
    },
    {
      id: "w20-in-my-last-job",
      week: 20,
      phrase: "In my last job, I managed a team of six.",
      meaningVi: "Ở công việc gần nhất, tôi quản lý một nhóm sáu người.",
      situation: "Kể việc cũ — cụ thể, có số",
      isCoreChunk: true,
    },
    {
      id: "w20-i-was-responsible-for",
      week: 20,
      phrase: "I was responsible for training new staff.",
      meaningVi: "Tôi phụ trách đào tạo nhân viên mới.",
      situation: "Mô tả trách nhiệm",
      isCoreChunk: true,
    },
    {
      id: "w20-my-main-achievement",
      week: 20,
      phrase: "My main achievement was cutting costs by twenty percent.",
      meaningVi: "Thành tích chính của tôi là giảm chi phí hai mươi phần trăm.",
      situation: "Thành tích — luôn kèm con số, không kèm thì nghe như nói suông",
      isCoreChunk: true,
    },
    {
      id: "w20-im-good-at",
      week: 20,
      phrase: "I'm good at working with people.",
      meaningVi: "Tôi làm việc với người khác tốt.",
      situation: "ĐIỂM MẠNH",
      isCoreChunk: true,
    },
    {
      id: "w20-people-say-im",
      week: 20,
      phrase: "People say I'm patient and reliable.",
      meaningVi: "Mọi người bảo tôi kiên nhẫn và đáng tin.",
      situation: "ĐIỂM MẠNH — mượn lời người khác, đỡ nghe như tự khen",
      isCoreChunk: true,
    },
    {
      id: "w20-one-thing-i-work-on",
      week: 20,
      phrase: "One thing I'm working on is my English.",
      meaningVi: "Một điều tôi đang cải thiện là tiếng Anh của mình.",
      situation: "ĐIỂM YẾU — nói yếu điểm thật, kèm việc mình đang làm để sửa",
      isCoreChunk: true,
    },
    {
      id: "w20-i-used-to-but-now",
      week: 20,
      phrase: "I used to take on too much, but now I ask for help.",
      meaningVi: "Trước đây tôi hay ôm việc, giờ tôi biết nhờ giúp.",
      situation: "ĐIỂM YẾU — công thức 'trước thế này, giờ thế kia'",
      isCoreChunk: true,
    },
    {
      id: "w20-im-still-learning",
      week: 20,
      phrase: "I'm still learning, and I like that.",
      meaningVi: "Tôi vẫn đang học, và tôi thích thế.",
      situation: "ĐIỂM YẾU — thành thật mà vẫn tích cực",
      isCoreChunk: false,
    },
    {
      id: "w20-what-attracted-me",
      week: 20,
      phrase: "What attracted me is your training programme.",
      meaningVi: "Điều thu hút tôi là chương trình đào tạo của công ty.",
      situation: "VÌ SAO ỨNG TUYỂN — nói một thứ cụ thể về họ, không nói chung chung",
      isCoreChunk: true,
    },
    {
      id: "w20-i-want-to-grow",
      week: 20,
      phrase: "I want to grow in this direction.",
      meaningVi: "Tôi muốn phát triển theo hướng này.",
      situation: "VÌ SAO ỨNG TUYỂN",
      isCoreChunk: true,
    },
    {
      id: "w20-your-company-has-a-good-name",
      week: 20,
      phrase: "Your company has a good name here.",
      meaningVi: "Công ty anh chị có tiếng tốt ở đây.",
      situation: "VÌ SAO ỨNG TUYỂN — khen thật, đừng khen quá",
      isCoreChunk: false,
    },
    {
      id: "w20-i-left-because",
      week: 20,
      phrase: "I left because I wanted a new challenge.",
      meaningVi: "Tôi nghỉ vì muốn thử thách mới.",
      situation: "VÌ SAO NGHỈ VIỆC CŨ — nói hướng tới trước, đừng nói xấu sau lưng",
      isCoreChunk: true,
    },
    {
      id: "w20-the-company-closed",
      week: 20,
      phrase: "The company closed last year.",
      meaningVi: "Công ty đóng cửa năm ngoái.",
      situation: "VÌ SAO NGHỈ VIỆC CŨ — lý do khách quan thì nói thẳng",
      isCoreChunk: false,
    },
    {
      id: "w20-thats-a-good-question",
      week: 20,
      phrase: "That's a good question.",
      meaningVi: "Đó là một câu hỏi hay.",
      situation: "CÂU GIỜ — mua được hai giây để nghĩ, và nghe rất tự nhiên",
      isCoreChunk: true,
    },
    {
      id: "w20-let-me-think-for-a-second",
      week: 20,
      phrase: "Let me think for a second.",
      meaningVi: "Cho tôi nghĩ một chút.",
      situation: "CÂU GIỜ — xin thời gian đàng hoàng còn hơn ngồi im",
      isCoreChunk: true,
    },
    {
      id: "w20-could-you-rephrase-that",
      week: 20,
      phrase: "Could you rephrase that, please?",
      meaningVi: "Anh chị hỏi lại cách khác giúp tôi được không?",
      situation: "CỨU HỘ — không hiểu câu hỏi thì xin hỏi lại, đừng trả lời lạc đề",
      isCoreChunk: true,
    },
    {
      id: "w20-do-you-mean",
      week: 20,
      phrase: "Do you mean in this job, or before?",
      meaningVi: "Ý anh chị là ở công việc này, hay trước đó ạ?",
      situation: "CỨU HỘ — hỏi cho rõ, nghe rất chuyên nghiệp",
      isCoreChunk: true,
    },
    {
      id: "w20-sorry-my-english-is-not-perfect",
      week: 20,
      phrase: "Sorry, my English isn't perfect, but I'm improving.",
      meaningVi: "Xin lỗi, tiếng Anh của tôi chưa tốt, nhưng tôi đang cải thiện.",
      situation: "Nói một lần đầu buổi thôi — nói nhiều lần thì thành xin lỗi cả buổi",
      isCoreChunk: true,
    },
    {
      id: "w20-i-look-forward-to-hearing",
      week: 20,
      phrase: "I look forward to hearing from you.",
      meaningVi: "Tôi mong sớm nhận được phản hồi từ anh chị.",
      situation: "Câu kết chuẩn của buổi phỏng vấn",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w20-listen-interview",
    week: 20,
    titleVi: "Nửa đầu buổi phỏng vấn",
    lines: [
      { speaker: "Anna", text: "Come in, take a seat. So — tell me about yourself." },
      { speaker: "Hung", text: "Currently, I work as a teacher. Before that, I spent five years in sales." },
      { speaker: "Anna", text: "And what would you say your main strength is?" },
      { speaker: "Hung", text: "People say I'm patient and reliable. I'm good at working with people." },
      { speaker: "Anna", text: "And a weakness?" },
      { speaker: "Hung", text: "One thing I'm working on is my English. I study every day." },
      { speaker: "Anna", text: "That's honest. So why did you apply to us?" },
    ],
    gist: {
      promptVi: "Đây là buổi gì?",
      options: ["Phỏng vấn xin việc", "Họp báo cáo", "Gặp khách hàng"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Hiện tại ông Hùng làm nghề gì?",
        options: ["Giáo viên", "Nhân viên bán hàng", "Quản lý"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng nói điểm mạnh của mình là gì?",
        options: ["Kiên nhẫn, đáng tin", "Giỏi tính toán", "Làm việc nhanh"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng nói điểm yếu thế nào?",
        options: [
          "Tiếng Anh chưa tốt, đang học mỗi ngày",
          "Nói mình không có điểm yếu",
          "Nói mình hay quên việc",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Currently, I work as a", answer: "teacher", after: "." },
      { before: "Before that, I spent five years in", answer: "sales", after: "." },
      { before: "One thing I'm working on is my", answer: "English", after: "." },
    ],
  },

  shadowing: [
    {
      id: "w20-sh-1",
      text: "Currently, I work as a teacher. Before that, I spent five years in sales.",
      focusVi: "Hai nhịp rõ ràng — ngắt hẳn giữa hai câu, đừng nối liền",
    },
    {
      id: "w20-sh-2",
      text: "People say I'm patient and reliable.",
      focusVi: "Nói đều, không lên giọng khoe — càng bình thản càng đáng tin",
    },
    {
      id: "w20-sh-3",
      text: "That's a good question. Let me think for a second.",
      focusVi: "Nói thong thả — đây là câu mua thời gian, vội là hỏng tác dụng",
    },
    {
      id: "w20-sh-4",
      text: "Could you rephrase that, please?",
      focusVi: "Giọng bình tĩnh, không ngại — đây là câu của người chuyên nghiệp",
    },
    {
      id: "w20-sh-5",
      text: "I look forward to hearing from you.",
      focusVi: "Nối 'forward to' cho mượt, bật rõ 'g' cuối trong 'hearing'",
    },
  ],

  roleplay: {
    id: "w20-rp-interview1",
    week: 20,
    titleVi: "Phỏng vấn: giới thiệu bản thân và kinh nghiệm",
    goalVi: "Trả lời có cấu trúc ba nhịp, nói điểm yếu thành thật, và giữ bình tĩnh khi bí",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "unexpected-question",
    turns: [
      {
        id: "start",
        say: "Come in, take a seat. So — tell me about yourself.",
        sayVi: "Mời anh vào, ngồi đi. Nào — anh giới thiệu về bản thân đi.",
        hints: [
          "Currently, I work as a teacher. Before that, I spent five years in sales.",
          "Thank you for seeing me today. Currently, I work as a teacher.",
        ],
        branches: [
          { keywords: ["currently", "work", "before", "years", "spent", "teacher", "thank"], next: "experience" },
        ],
        fallbackNext: "prompt-start",
      },
      {
        id: "prompt-start",
        say: "Take your time. What do you do at the moment?",
        sayVi: "Anh cứ từ từ. Hiện giờ anh đang làm gì?",
        hints: ["Currently, I work as a teacher.", "I have ten years of experience in this field."],
        branches: [
          { keywords: ["currently", "work", "teacher", "experience", "years", "job"], next: "experience" },
        ],
        fallbackNext: "experience",
      },
      {
        id: "experience",
        say: "Tell me more about your last job.",
        sayVi: "Anh kể thêm về công việc gần nhất đi.",
        hints: [
          "In my last job, I managed a team of six.",
          "I was responsible for training new staff.",
        ],
        branches: [
          { keywords: ["last", "job", "managed", "team", "responsible", "training", "staff", "achievement"], next: "strength" },
        ],
        fallbackNext: "strength",
      },
      {
        id: "strength",
        say: "And what would you say your main strength is?",
        sayVi: "Anh thấy điểm mạnh chính của mình là gì?",
        hints: [
          "People say I'm patient and reliable.",
          "I'm good at working with people.",
        ],
        branches: [
          { keywords: ["people", "good", "patient", "reliable", "strength", "say", "working"], next: "weakness" },
        ],
        fallbackNext: "weakness",
      },
      {
        id: "unexpected-question",
        // Lệch kịch bản: câu hỏi không ai chuẩn bị trước. Cả tuần này dạy đúng
        // một phản xạ cho lúc đó — câu giờ đàng hoàng thay vì ngồi im.
        say: "Let me stop you there. Why should we hire you and not someone younger?",
        sayVi: "Cho tôi ngắt một chút. Vì sao chúng tôi nên chọn anh chứ không phải người trẻ hơn?",
        hints: [
          "That's a good question. Let me think for a second.",
          "Could you rephrase that, please?",
        ],
        branches: [
          { keywords: ["good", "question", "think", "second", "rephrase", "mean", "experience", "because"], next: "weakness" },
        ],
        fallbackNext: "weakness",
      },
      {
        id: "weakness",
        say: "And a weakness?",
        sayVi: "Còn điểm yếu?",
        hints: [
          "One thing I'm working on is my English.",
          "I used to take on too much, but now I ask for help.",
        ],
        branches: [
          { keywords: ["one", "thing", "working", "english", "used", "now", "help", "learning"], next: "why-us" },
        ],
        fallbackNext: "why-us",
      },
      {
        id: "why-us",
        say: "That's honest. So why did you apply to us?",
        sayVi: "Anh nói thật đấy. Vậy sao anh nộp đơn vào chỗ chúng tôi?",
        hints: [
          "What attracted me is your training programme.",
          "I want to grow in this direction.",
        ],
        branches: [
          { keywords: ["attracted", "training", "grow", "direction", "company", "name", "because"], next: "why-leave" },
        ],
        fallbackNext: "why-leave",
      },
      {
        id: "why-leave",
        say: "One last thing for today — why did you leave your last job?",
        sayVi: "Câu cuối hôm nay — vì sao anh nghỉ việc cũ?",
        hints: [
          "I left because I wanted a new challenge.",
          "The company closed last year.",
        ],
        branches: [
          { keywords: ["left", "because", "challenge", "closed", "company", "wanted", "new"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "Thank you. We'll be in touch next week.",
        sayVi: "Cảm ơn anh. Tuần sau chúng tôi sẽ liên hệ lại.",
        hints: [
          "Thank you. I look forward to hearing from you.",
          "Thank you for seeing me today.",
        ],
        branches: [
          { keywords: ["thank", "forward", "hearing", "you", "time", "seeing"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
