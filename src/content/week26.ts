/**
 * Tuần 26 — Tổng duyệt & Test C (curriculum §7).
 *
 * Tuần cuối. Giáo trình đặt "0 từ mới", và tuần này giữ đúng: mọi cụm bên dưới
 * đều đã xuất hiện ở 25 tuần trước. Việc duy nhất còn lại là dùng chúng dưới
 * toàn bộ áp lực cộng dồn — đồng hồ 3 giây, không gợi ý, giọng lạ, và đối
 * phương lệch kịch bản.
 *
 * Bài đóng vai là một buổi phỏng vấn mô phỏng bị cắt ngang bởi một tình huống
 * bốc ngẫu nhiên, đúng tinh thần Test C. Người phỏng vấn nói giọng Anh-Anh, vì
 * tới đây thì giọng chuẩn Mỹ không còn là mặc định nữa.
 *
 * Một điều nên nói thẳng ở tuần cuối cùng: hết tuần 26 không có nghĩa là học
 * xong. Nó có nghĩa là người học đã đi qua một vòng đủ rộng để tự đi tiếp — và
 * phần "duy trì sau khoá" mà giáo trình nhắc tới là chuyện của đời sống hằng
 * ngày, không phải của một tuần thứ 27.
 */

import type { WeekContent } from "./types";

export const week26: WeekContent = {
  week: 26,
  titleVi: "Tổng duyệt — toàn bộ áp lực cộng dồn",
  pronunciationFocusVi: "Tất cả những gì đã học, cùng lúc, không có ai đỡ lời",
  responseDeadlineMs: 3000,
  voiceLang: "en-GB",

  vocabulary: [
    {
      id: "w26-r-tell-me-about-yourself",
      week: 26,
      phrase: "Currently, I work as a teacher. Before that, I spent five years in sales.",
      meaningVi: "Hiện tại tôi làm giáo viên. Trước đó tôi làm năm năm ngành bán hàng.",
      situation: "ÔN tuần 20 — công thức ba nhịp, bật ra không cần nghĩ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-good-question",
      week: 26,
      phrase: "That's a good question. Let me think for a second.",
      meaningVi: "Câu hỏi hay đấy ạ. Cho tôi nghĩ một chút.",
      situation: "ÔN tuần 20 — câu mua thời gian, quan trọng nhất khi đồng hồ 3 giây",
      isCoreChunk: true,
    },
    {
      id: "w26-r-honestly-no-experience",
      week: 26,
      phrase: "Honestly, I don't have experience with that. But I learn quickly.",
      meaningVi: "Thật lòng tôi chưa có kinh nghiệm việc đó. Nhưng tôi học nhanh.",
      situation: "ÔN tuần 21 — nhận cái mình chưa biết rồi mở ra ngay",
      isCoreChunk: true,
    },
    {
      id: "w26-r-example",
      week: 26,
      phrase: "Can I give you an example?",
      meaningVi: "Tôi kể một ví dụ được không ạ?",
      situation: "ÔN tuần 21",
      isCoreChunk: true,
    },
    {
      id: "w26-r-in-the-end",
      week: 26,
      phrase: "What I did was listen first. In the end, he stayed with us.",
      meaningVi: "Tôi nghe trước đã. Cuối cùng anh ấy vẫn ở lại.",
      situation: "ÔN tuần 21 — kể chuyện ba nhịp",
      isCoreChunk: true,
    },
    {
      id: "w26-r-salary-range",
      week: 26,
      phrase: "What's the salary range for this role?",
      meaningVi: "Vị trí này mức lương khoảng bao nhiêu ạ?",
      situation: "ÔN tuần 21 — đừng nói số của mình trước",
      isCoreChunk: true,
    },
    {
      id: "w26-r-next-step",
      week: 26,
      phrase: "What's the next step?",
      meaningVi: "Bước tiếp theo là gì ạ?",
      situation: "ÔN tuần 21 — luôn hỏi trước khi ra về",
      isCoreChunk: true,
    },
    {
      id: "w26-r-rephrase",
      week: 26,
      phrase: "Could you rephrase that, please?",
      meaningVi: "Anh chị hỏi lại cách khác giúp tôi được không?",
      situation: "ÔN tuần 20 — không hiểu thì hỏi, đừng trả lời lạc đề",
      isCoreChunk: true,
    },
    {
      id: "w26-r-see-your-point",
      week: 26,
      phrase: "I see your point, but I'm not sure.",
      meaningVi: "Tôi hiểu ý anh chị, nhưng tôi chưa chắc lắm.",
      situation: "ÔN tuần 19 — bất đồng mà không mất lòng",
      isCoreChunk: true,
    },
    {
      id: "w26-r-come-back-to-you",
      week: 26,
      phrase: "Can I come back to you on that?",
      meaningVi: "Chuyện đó cho tôi trả lời sau được không ạ?",
      situation: "ÔN tuần 19 — bị hỏi bất ngờ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-off-the-top",
      week: 26,
      phrase: "Off the top of my head, about two weeks.",
      meaningVi: "Nghĩ nhanh thì khoảng hai tuần.",
      situation: "ÔN tuần 19 — trả lời ước chừng mà không bị bắt bẻ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-jump-in",
      week: 26,
      phrase: "Can I just jump in here?",
      meaningVi: "Cho tôi nói xen một câu được không?",
      situation: "ÔN tuần 18",
      isCoreChunk: true,
    },
    {
      id: "w26-r-repeat-last",
      week: 26,
      phrase: "Could you repeat the last part?",
      meaningVi: "Anh chị nhắc lại đoạn cuối được không?",
      situation: "ÔN tuần 18 — hỏi đúng chỗ mình sót",
      isCoreChunk: true,
    },
    {
      id: "w26-r-didnt-catch",
      week: 26,
      phrase: "Sorry, I didn't catch that.",
      meaningVi: "Xin lỗi, tôi không nghe kịp.",
      situation: "ÔN tuần 12 — câu cứu hộ dùng nhiều nhất cả khoá",
      isCoreChunk: true,
    },
    {
      id: "w26-r-just-to-be-clear",
      week: 26,
      phrase: "Just to be clear — you mean next Monday?",
      meaningVi: "Cho rõ nhé — ý anh chị là thứ Hai tuần sau?",
      situation: "ÔN tuần 19 — xác nhận lại, nhất là với giọng lạ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-read-back",
      week: 26,
      phrase: "Let me read that back to you.",
      meaningVi: "Để tôi đọc lại cho anh chị nghe.",
      situation: "ÔN tuần 14 — nghe số dài thì phải đọc lại",
      isCoreChunk: true,
    },
    {
      id: "w26-r-write-down",
      week: 26,
      phrase: "Could you write it down for me, please?",
      meaningVi: "Anh chị ghi ra giúp tôi được không?",
      situation: "ÔN tuần 13 — nghe mãi không ra thì xin chữ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-allergic",
      week: 26,
      phrase: "I'm allergic to penicillin.",
      meaningVi: "Tôi dị ứng với penicillin.",
      situation: "ÔN tuần 13 — câu sống còn, phải bật ra trong một giây",
      isCoreChunk: true,
    },
    {
      id: "w26-r-ambulance",
      week: 26,
      phrase: "I need an ambulance. I'm at twelve Green Street.",
      meaningVi: "Tôi cần xe cấp cứu. Tôi ở số 12 đường Green.",
      situation: "ÔN tuần 23 — địa điểm nói ngay sau câu đầu",
      isCoreChunk: true,
    },
    {
      id: "w26-r-doesnt-solve",
      week: 26,
      phrase: "I understand, but that doesn't solve my problem.",
      meaningVi: "Tôi hiểu, nhưng như vậy chưa giải quyết được việc của tôi.",
      situation: "ÔN tuần 22 — bị từ chối lần một",
      isCoreChunk: true,
    },
    {
      id: "w26-r-anything-else-you-can-do",
      week: 26,
      phrase: "Is there anything else you can do?",
      meaningVi: "Còn cách nào khác không ạ?",
      situation: "ÔN tuần 22 — bị từ chối lần hai, và đây là câu mở ra kết quả",
      isCoreChunk: true,
    },
    {
      id: "w26-r-way-i-see-it",
      week: 26,
      phrase: "The way I see it, both sides have a point.",
      meaningVi: "Theo cách tôi nhìn thì cả hai bên đều có lý.",
      situation: "ÔN tuần 24 — nêu quan điểm mà không gây gổ",
      isCoreChunk: true,
    },
    {
      id: "w26-r-english-improving",
      week: 26,
      phrase: "Sorry, my English isn't perfect, but I'm improving.",
      meaningVi: "Xin lỗi, tiếng Anh của tôi chưa tốt, nhưng tôi đang cải thiện.",
      situation: "ÔN tuần 20 — nói một lần thôi, rồi cứ thế nói tiếp",
      isCoreChunk: true,
    },
    {
      id: "w26-r-look-forward",
      week: 26,
      phrase: "I look forward to hearing from you.",
      meaningVi: "Tôi mong sớm nhận được phản hồi từ anh chị.",
      situation: "ÔN tuần 20 — câu cuối cùng của cả khoá học",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w26-listen-final",
    week: 26,
    titleVi: "Phỏng vấn cuối khoá, giọng Anh-Anh, bị ngắt giữa chừng",
    lines: [
      { speaker: "Emma", text: "Right. Tell me about yourself — briefly, if you would." },
      { speaker: "Hung", text: "Currently, I work as a teacher. Before that, five years in sales." },
      { speaker: "Emma", text: "And have you ever managed a budget over one million?" },
      { speaker: "Hung", text: "Honestly, I don't have experience with that. But I learn quickly." },
      { speaker: "Emma", text: "Hmm. Sorry — one moment, someone's at the door." },
      { speaker: "Emma", text: "Apologies. Where were we? Ah — your salary expectations?" },
      { speaker: "Hung", text: "What's the salary range for this role?" },
    ],
    gist: {
      promptVi: "Buổi này là gì?",
      options: [
        "Phỏng vấn cuối khoá, bị ngắt giữa chừng",
        "Cuộc họp báo cáo tiến độ",
        "Gọi điện đặt lịch hẹn",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng trả lời câu hỏi về ngân sách thế nào?",
        options: [
          "Nhận là chưa có kinh nghiệm, nhưng học nhanh",
          "Nói mình đã từng quản lý",
          "Không trả lời",
        ],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao buổi phỏng vấn bị ngắt?",
        options: ["Có người gõ cửa", "Mất điện", "Hết giờ"],
        answerIndex: 0,
      },
      {
        promptVi: "Khi bị hỏi về lương, ông Hùng làm gì?",
        options: [
          "Hỏi ngược lại mức của công ty",
          "Nói ngay con số mình muốn",
          "Xin trả lời sau",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Currently, I work as a", answer: "teacher", after: ". Before that, five years in sales." },
      { before: "Honestly, I don't have", answer: "experience", after: "with that." },
      { before: "What's the salary", answer: "range", after: "for this role?" },
    ],
  },

  shadowing: [
    {
      id: "w26-sh-1",
      text: "Currently, I work as a teacher. Before that, I spent five years in sales.",
      focusVi: "Ba giây để bắt đầu — câu này phải bật ra không cần nghĩ",
    },
    {
      id: "w26-sh-2",
      text: "That's a good question. Let me think for a second.",
      focusVi: "Nói thong thả ngay cả khi đồng hồ chạy — vội là hỏng tác dụng",
    },
    {
      id: "w26-sh-3",
      text: "Honestly, I don't have experience with that. But I learn quickly.",
      focusVi: "Câu đầu bình thản, câu sau chắc giọng lên",
    },
    {
      id: "w26-sh-4",
      text: "Just to be clear — you mean next Monday?",
      focusVi: "Lên giọng cuối; giọng Anh-Anh nuốt 'r', càng phải xác nhận",
    },
    {
      id: "w26-sh-5",
      text: "I look forward to hearing from you.",
      focusVi: "Câu cuối của cả khoá — nói cho tròn, cho vững",
    },
  ],

  roleplay: {
    id: "w26-rp-final",
    week: 26,
    titleVi: "Test C: phỏng vấn mô phỏng + một tình huống bốc bất ngờ",
    goalVi: "Chịu được mọi áp lực cùng lúc: đồng hồ 3 giây, giọng lạ, và bị cắt ngang",
    startTurnId: "start",
    hintLevel: "none",
    // Tình huống bốc ngẫu nhiên của Test C: giữa buổi phỏng vấn thì có việc
    // khẩn cấp thật, và người học phải chuyển hẳn ngữ cảnh rồi quay lại.
    surpriseTurnId: "random-situation",
    turns: [
      {
        id: "start",
        say: "Right. Tell me about yourself — briefly, if you would.",
        sayVi: "Được rồi. Anh giới thiệu về bản thân — ngắn gọn thôi nhé.",
        hints: [
          "Currently, I work as a teacher. Before that, five years in sales.",
          "Thank you for seeing me. Currently, I work as a teacher.",
        ],
        branches: [
          { keywords: ["currently", "work", "before", "teacher", "sales", "years", "thank"], next: "hard" },
        ],
        fallbackNext: "prompt",
      },
      {
        id: "prompt",
        say: "...Take a moment. What do you do at present?",
        sayVi: "...Anh cứ bình tĩnh. Hiện giờ anh làm gì?",
        hints: [
          "Currently, I work as a teacher.",
          "That's a good question. Let me think for a second.",
        ],
        branches: [
          { keywords: ["currently", "work", "teacher", "good", "question", "think", "second"], next: "hard" },
        ],
        fallbackNext: "hard",
      },
      {
        id: "hard",
        say: "Have you ever managed a budget over one million?",
        sayVi: "Anh đã từng quản lý ngân sách trên một triệu chưa?",
        hints: [
          "Honestly, I don't have experience with that. But I learn quickly.",
          "No, but I managed a team of six.",
        ],
        branches: [
          { keywords: ["honestly", "dont", "no", "but", "learn", "managed", "team", "experience"], next: "example" },
        ],
        fallbackNext: "example",
      },
      {
        id: "example",
        say: "Tell me about a time you dealt with a difficult person.",
        sayVi: "Kể tôi nghe một lần anh phải xử lý một người khó tính.",
        hints: [
          "Can I give you an example? In one case, a customer was very angry.",
          "What I did was listen first. In the end, he stayed with us.",
        ],
        branches: [
          { keywords: ["example", "case", "customer", "listen", "did", "end", "stayed", "angry"], next: "disagree" },
        ],
        fallbackNext: "disagree",
      },
      {
        id: "random-situation",
        // Tình huống bốc: giữa buổi phỏng vấn thì có tai nạn ngoài hành lang.
        // Chuyển ngữ cảnh đột ngột chính là điểm khó nhất của Test C.
        say: "Sorry — there's been an accident in the corridor. Someone's hurt. Can you call for help?",
        sayVi: "Xin lỗi — ngoài hành lang có tai nạn. Có người bị thương. Anh gọi giúp được không?",
        hints: [
          "I need an ambulance. I'm at twelve Green Street.",
          "Yes. There's been an accident, someone is hurt. Please hurry.",
        ],
        branches: [
          { keywords: ["ambulance", "accident", "hurt", "street", "help", "hurry", "yes", "need"], next: "disagree" },
        ],
        fallbackNext: "disagree",
      },
      {
        id: "disagree",
        say: "Back to it. I'd say experience matters more than qualifications. Do you agree?",
        sayVi: "Quay lại nào. Tôi cho rằng kinh nghiệm quan trọng hơn bằng cấp. Anh có đồng ý không?",
        hints: [
          "The way I see it, both sides have a point.",
          "I see your point, but I'm not sure.",
        ],
        branches: [
          { keywords: ["way", "see", "point", "sure", "depends", "both", "agree", "differently"], next: "surprise-number" },
        ],
        fallbackNext: "surprise-number",
      },
      {
        id: "surprise-number",
        say: "Quick one — how many people did you train last year?",
        sayVi: "Hỏi nhanh — năm ngoái anh đào tạo bao nhiêu người?",
        hints: [
          "Off the top of my head, about twenty.",
          "Can I come back to you on that?",
        ],
        branches: [
          { keywords: ["head", "about", "twenty", "back", "come", "check", "confirm", "dont"], next: "salary" },
        ],
        fallbackNext: "salary",
      },
      {
        id: "salary",
        say: "And your salary expectations?",
        sayVi: "Còn mức lương anh mong muốn?",
        hints: [
          "What's the salary range for this role?",
          "What did you have in mind?",
        ],
        branches: [
          { keywords: ["range", "salary", "mind", "role", "what", "between"], next: "questions" },
        ],
        fallbackNext: "questions",
      },
      {
        id: "questions",
        say: "Noted. Any questions for me before we finish?",
        sayVi: "Tôi ghi rồi. Anh có câu hỏi gì trước khi kết thúc không?",
        hints: [
          "What's the next step?",
          "What does the role involve day to day?",
        ],
        branches: [
          { keywords: ["next", "step", "role", "involve", "team", "start", "when"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "We'll be in touch. Well done today — your English has come a long way.",
        sayVi: "Chúng tôi sẽ liên hệ lại. Hôm nay anh làm tốt lắm — tiếng Anh của anh tiến bộ nhiều đấy.",
        hints: [
          "Thank you. I look forward to hearing from you.",
          "Thank you for your time today.",
        ],
        branches: [
          { keywords: ["thank", "forward", "hearing", "time", "today", "you"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
