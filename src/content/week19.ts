/**
 * Tuần 19 — Họp online nâng cao (curriculum §7).
 *
 * Hai thứ siết lại cùng lúc: đồng hồ xuống 6 giây, và người đối thoại nói giọng
 * Ấn Độ (`voiceLang: "en-IN"`).
 *
 * Vì sao là giọng Ấn Độ trước tiên trong các giọng: trong họp online của công ty
 * đa quốc gia, đây là giọng người Việt gặp nhiều nhất và cũng là giọng bị "sốc"
 * nhất, vì cả hai bên đều học tiếng Anh chứ không ai nói tiếng mẹ đẻ. Giáo trình
 * gọi phần accent là thứ quyết định giữa "hiểu app" và "hiểu người" — và đây là
 * chỗ nó bắt đầu.
 *
 * Máy nào không có sẵn giọng đó thì app đọc bằng giọng mặc định. Không nghe thấy
 * accent thì tiếc, nhưng không đáng để hỏng cả buổi học.
 *
 * Nội dung nói cũng khó hơn tuần 18: không còn báo cáo tiến độ mà là nêu ý kiến,
 * phản đối lịch sự, và bị hỏi bất ngờ. Bất đồng bằng tiếng Anh là kỹ năng riêng
 * — nói thẳng "I don't agree" không sai ngữ pháp, chỉ là nghe rất nặng.
 */

import type { WeekContent } from "./types";

export const week19: WeekContent = {
  week: 19,
  titleVi: "Họp online — nêu ý kiến & bất đồng lịch sự",
  pronunciationFocusVi: "Nghe giọng Ấn Độ: nhịp nhanh hơn, trọng âm rơi khác chỗ",
  responseDeadlineMs: 6000,
  voiceLang: "en-IN",

  vocabulary: [
    {
      id: "w19-i-think-we-should",
      week: 19,
      phrase: "I think we should start earlier.",
      meaningVi: "Tôi nghĩ mình nên bắt đầu sớm hơn.",
      situation: "NÊU Ý KIẾN — mẫu câu an toàn nhất",
      isCoreChunk: true,
    },
    {
      id: "w19-in-my-view",
      week: 19,
      phrase: "In my view, that's the main problem.",
      meaningVi: "Theo tôi thì đó mới là vấn đề chính.",
      situation: "NÊU Ý KIẾN — trang trọng hơn một chút",
      isCoreChunk: true,
    },
    {
      id: "w19-from-what-ive-seen",
      week: 19,
      phrase: "From what I've seen, it takes longer.",
      meaningVi: "Theo những gì tôi thấy thì việc đó lâu hơn.",
      situation: "NÊU Ý KIẾN — dựa trên kinh nghiệm, khó cãi hơn",
      isCoreChunk: true,
    },
    {
      id: "w19-can-i-suggest",
      week: 19,
      phrase: "Can I suggest something?",
      meaningVi: "Tôi đề xuất một ý được không?",
      situation: "ĐỀ XUẤT — xin phép trước rồi nói",
      isCoreChunk: true,
    },
    {
      id: "w19-what-if-we",
      week: 19,
      phrase: "What if we split it in two?",
      meaningVi: "Hay là mình chia làm hai phần?",
      situation: "ĐỀ XUẤT — kiểu mở, không áp đặt",
      isCoreChunk: true,
    },
    {
      id: "w19-it-might-be-worth",
      week: 19,
      phrase: "It might be worth trying.",
      meaningVi: "Có lẽ cũng đáng thử.",
      situation: "ĐỀ XUẤT nhẹ nhàng — 'might' làm câu mềm hẳn",
      isCoreChunk: true,
    },
    {
      id: "w19-i-see-your-point-but",
      week: 19,
      phrase: "I see your point, but I'm not sure.",
      meaningVi: "Tôi hiểu ý bạn, nhưng tôi chưa chắc lắm.",
      situation: "BẤT ĐỒNG — công nhận trước, phản đối sau. Mẫu câu quan trọng nhất tuần",
      isCoreChunk: true,
    },
    {
      id: "w19-that-may-be-true-however",
      week: 19,
      phrase: "That may be true, however we don't have time.",
      meaningVi: "Có thể đúng, tuy nhiên mình không đủ thời gian.",
      situation: "BẤT ĐỒNG — có lý lẽ đi kèm",
      isCoreChunk: true,
    },
    {
      id: "w19-im-afraid-i-disagree",
      week: 19,
      phrase: "I'm afraid I disagree.",
      meaningVi: "Tôi e là tôi không đồng ý.",
      situation: "BẤT ĐỒNG — 'I'm afraid' làm câu này dùng được ở chỗ trang trọng",
      isCoreChunk: true,
    },
    {
      id: "w19-id-rather-we",
      week: 19,
      phrase: "I'd rather we waited a week.",
      meaningVi: "Tôi muốn mình chờ thêm một tuần hơn.",
      situation: "BẤT ĐỒNG — nêu luôn phương án mình muốn",
      isCoreChunk: false,
    },
    {
      id: "w19-correct-me-if-im-wrong",
      week: 19,
      phrase: "Correct me if I'm wrong, but...",
      meaningVi: "Nếu tôi nhầm thì bạn sửa giúp, nhưng...",
      situation: "BẤT ĐỒNG — mở đầu an toàn khi mình chưa chắc",
      isCoreChunk: true,
    },
    {
      id: "w19-thats-a-fair-point",
      week: 19,
      phrase: "That's a fair point.",
      meaningVi: "Ý đó cũng có lý.",
      situation: "Công nhận ý người khác — nói câu này rồi thì mình nói gì cũng dễ nghe",
      isCoreChunk: true,
    },
    {
      id: "w19-can-i-come-back-to-you-on-that",
      week: 19,
      phrase: "Can I come back to you on that?",
      meaningVi: "Chuyện đó cho tôi trả lời sau được không?",
      situation: "BỊ HỎI BẤT NGỜ — câu cứu hộ số một của giới đi làm",
      isCoreChunk: true,
    },
    {
      id: "w19-let-me-check-and-confirm",
      week: 19,
      phrase: "Let me check and confirm later today.",
      meaningVi: "Để tôi kiểm tra rồi xác nhận trong hôm nay.",
      situation: "BỊ HỎI BẤT NGỜ — hoãn mà vẫn có trách nhiệm",
      isCoreChunk: true,
    },
    {
      id: "w19-off-the-top-of-my-head",
      week: 19,
      phrase: "Off the top of my head, about two weeks.",
      meaningVi: "Nghĩ nhanh thì khoảng hai tuần.",
      situation: "BỊ HỎI BẤT NGỜ — trả lời ước chừng mà không bị bắt bẻ sau này",
      isCoreChunk: true,
    },
    {
      id: "w19-i-dont-have-that-number",
      week: 19,
      phrase: "I don't have that number with me.",
      meaningVi: "Con số đó tôi không mang theo.",
      situation: "BỊ HỎI BẤT NGỜ — không biết thì nói không biết",
      isCoreChunk: true,
    },
    {
      id: "w19-just-to-be-clear",
      week: 19,
      phrase: "Just to be clear — you mean next Monday?",
      meaningVi: "Cho rõ nhé — ý bạn là thứ Hai tuần sau?",
      situation: "Xác nhận lại — dùng nhiều khi giọng người nói khó nghe",
      isCoreChunk: true,
    },
    {
      id: "w19-so-what-youre-saying-is",
      week: 19,
      phrase: "So what you're saying is we need more people?",
      meaningVi: "Vậy ý bạn là mình cần thêm người, đúng không?",
      situation: "Diễn đạt lại — vừa để hiểu chắc, vừa để người ta thấy mình đang nghe",
      isCoreChunk: true,
    },
    {
      id: "w19-shall-we-agree-on",
      week: 19,
      phrase: "Shall we agree on Friday then?",
      meaningVi: "Vậy mình chốt thứ Sáu nhé?",
      situation: "CHỐT — đưa ra một mốc để mọi người gật",
      isCoreChunk: true,
    },
    {
      id: "w19-who-will-take-this",
      week: 19,
      phrase: "Who will take this?",
      meaningVi: "Việc này ai nhận?",
      situation: "CHỐT — hỏi thẳng cho có người chịu trách nhiệm",
      isCoreChunk: true,
    },
    {
      id: "w19-ill-take-that-one",
      week: 19,
      phrase: "I'll take that one.",
      meaningVi: "Việc đó để tôi.",
      situation: "CHỐT — nhận việc",
      isCoreChunk: true,
    },
    {
      id: "w19-lets-park-that",
      week: 19,
      phrase: "Let's park that for now.",
      meaningVi: "Chuyện đó mình để lại sau đi.",
      situation: "CHỐT — gác một chuyện lại, câu dân họp hay dùng",
      isCoreChunk: false,
    },
    {
      id: "w19-to-sum-up",
      week: 19,
      phrase: "To sum up: Friday, and I'll send the notes.",
      meaningVi: "Tóm lại: thứ Sáu, và tôi sẽ gửi biên bản.",
      situation: "CHỐT — tóm tắt cuối cuộc họp",
      isCoreChunk: true,
    },
    {
      id: "w19-does-that-work-for-everyone",
      week: 19,
      phrase: "Does that work for everyone?",
      meaningVi: "Vậy mọi người thấy được không?",
      situation: "CHỐT — câu hỏi cuối trước khi kết thúc",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w19-listen-decision",
    week: 19,
    titleVi: "Họp chốt phương án, người nói giọng Ấn Độ",
    lines: [
      { speaker: "Raj", text: "So my proposal is that we start the whole thing next week." },
      { speaker: "Hung", text: "I see your point, but I'm not sure we have enough people." },
      { speaker: "Raj", text: "That's a fair point. What if we split it in two?" },
      { speaker: "Hung", text: "So what you're saying is, part one next week, part two later?" },
      { speaker: "Raj", text: "Exactly. Hung, how long would part one take you?" },
      { speaker: "Hung", text: "Off the top of my head, about two weeks. Can I come back to you on that?" },
      { speaker: "Raj", text: "Of course. Shall we agree on Friday for the final answer?" },
    ],
    gist: {
      promptVi: "Cuộc họp đang bàn chuyện gì?",
      options: [
        "Nên bắt đầu cả dự án ngay hay chia làm hai phần",
        "Ai sẽ nghỉ phép tuần sau",
        "Đổi nhà cung cấp phần mềm",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng lo điều gì?",
        options: ["Không đủ người", "Không đủ tiền", "Không thích phương án"],
        answerIndex: 0,
      },
      {
        promptVi: "Raj đề xuất gì?",
        options: ["Chia dự án làm hai phần", "Hoãn lại một tháng", "Thuê thêm người"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng trả lời câu hỏi về thời gian thế nào?",
        options: [
          "Ước chừng hai tuần, xin trả lời chính thức sau",
          "Nói chắc chắn là hai tuần",
          "Nói không biết rồi thôi",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I see your", answer: "point", after: ", but I'm not sure we have enough people." },
      { before: "That's a", answer: "fair", after: "point. What if we split it in two?" },
      { before: "Off the top of my", answer: "head", after: ", about two weeks." },
    ],
  },

  shadowing: [
    {
      id: "w19-sh-1",
      text: "I see your point, but I'm not sure.",
      focusVi: "Nửa đầu nhẹ nhàng, nửa sau chậm lại — đừng nói cả câu một giọng",
    },
    {
      id: "w19-sh-2",
      text: "That may be true, however we don't have time.",
      focusVi: "Ngắt rõ trước 'however' — chỗ ngắt làm nên sự lịch sự",
    },
    {
      id: "w19-sh-3",
      text: "Can I come back to you on that?",
      focusVi: "Nối 'back to you' thành một hơi",
    },
    {
      id: "w19-sh-4",
      text: "So what you're saying is we need more people?",
      focusVi: "Lên giọng cuối câu — đây là câu xác nhận lại",
    },
    {
      id: "w19-sh-5",
      text: "Shall we agree on Friday then?",
      focusVi: "Nói gọn và dứt — câu chốt phải nghe ra là chốt",
    },
  ],

  roleplay: {
    id: "w19-rp-decision",
    week: 19,
    titleVi: "Họp chốt phương án với đồng nghiệp nói giọng Ấn Độ",
    goalVi: "Nêu ý kiến, phản đối mà không mất lòng, và xử lý khi bị hỏi bất ngờ",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "put-on-spot",
    turns: [
      {
        id: "start",
        say: "So, my proposal is that we start the whole thing next week. Thoughts?",
        sayVi: "Đề xuất của tôi là tuần sau mình khởi động toàn bộ. Mọi người thấy sao?",
        hints: [
          "I see your point, but I'm not sure we have enough people.",
          "I think we should start later.",
        ],
        branches: [
          { keywords: ["point", "sure", "think", "should", "afraid", "disagree", "however", "but"], next: "counter" },
          { keywords: ["agree", "good", "yes", "fine", "works"], next: "counter" },
        ],
        fallbackNext: "ask-thoughts",
      },
      {
        id: "ask-thoughts",
        say: "Hung? What do you think about starting next week?",
        sayVi: "Hùng? Anh nghĩ sao về việc bắt đầu tuần sau?",
        hints: [
          "In my view, that's too early.",
          "I see your point, but I'm not sure.",
        ],
        branches: [
          { keywords: ["view", "think", "point", "sure", "early", "agree", "disagree"], next: "counter" },
        ],
        fallbackNext: "counter",
      },
      {
        id: "counter",
        say: "That's a fair point. What if we split it in two parts?",
        sayVi: "Ý đó có lý. Hay là mình chia làm hai phần?",
        hints: [
          "So what you're saying is, part one next week?",
          "It might be worth trying. Just to be clear — part one first?",
        ],
        branches: [
          { keywords: ["saying", "clear", "worth", "part", "one", "first", "mean", "trying"], next: "estimate" },
        ],
        fallbackNext: "estimate",
      },
      {
        id: "put-on-spot",
        // Lệch kịch bản: bị gọi tên hỏi một con số mình không có. Cả tuần này
        // xoay quanh việc trả lời được mà không nói bừa.
        say: "Hung — quick one. What was last quarter's number on this?",
        sayVi: "Hùng — hỏi nhanh. Quý trước con số của việc này là bao nhiêu?",
        hints: [
          "I don't have that number with me. Can I come back to you on that?",
          "Let me check and confirm later today.",
        ],
        branches: [
          { keywords: ["number", "back", "check", "confirm", "dont", "later", "head"], next: "estimate" },
        ],
        fallbackNext: "estimate",
      },
      {
        id: "estimate",
        say: "Good. So how long would part one take on your side?",
        sayVi: "Tốt. Vậy bên anh làm phần một mất bao lâu?",
        hints: [
          "Off the top of my head, about two weeks.",
          "Can I come back to you on that?",
        ],
        branches: [
          { keywords: ["head", "weeks", "about", "back", "check", "confirm", "days"], next: "who-takes" },
        ],
        fallbackNext: "who-takes",
      },
      {
        id: "who-takes",
        say: "Fine. Who will take part one?",
        sayVi: "Được. Phần một ai nhận?",
        hints: ["I'll take that one.", "I'll take that one, if that works."],
        branches: [
          { keywords: ["take", "ill", "me", "mine", "can", "happy"], next: "wrap" },
        ],
        fallbackNext: "wrap",
      },
      {
        id: "wrap",
        say: "Excellent. To sum up: part one with you, answer by Friday. Does that work?",
        sayVi: "Tuyệt. Tóm lại: phần một do anh, trả lời trước thứ Sáu. Vậy được chứ?",
        hints: ["That works for me.", "Yes. Shall we agree on Friday then?"],
        branches: [
          { keywords: ["works", "yes", "agree", "friday", "fine", "good", "sure"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
