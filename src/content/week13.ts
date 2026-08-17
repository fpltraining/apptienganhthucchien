/**
 * Tuần 13 — Đi khám bệnh & hiệu thuốc (curriculum §7).
 *
 * Giáo trình đánh dấu tuần này là "độ chính xác sống còn", và đó không phải nói
 * quá. Nói nhầm chỗ đau thì bác sĩ khám nhầm chỗ; nghe nhầm liều thuốc thì uống
 * sai liều. Vì vậy tuần này khác các tuần trước ở hai điểm:
 *
 *  - Câu xác nhận lại được dạy như phần bắt buộc, không phải phần lịch sự.
 *    "So, two tablets, three times a day?" là câu quan trọng nhất tuần.
 *  - Bài đóng vai kết thúc bằng việc nhắc lại liều thuốc, chứ không kết thúc
 *    bằng lời cảm ơn.
 *
 * Từ vựng cơ thể chỉ lấy phần người bệnh thật sự cần chỉ vào, không lấy theo
 * kiểu học thuộc bảng giải phẫu.
 */

import type { WeekContent } from "./types";

export const week13: WeekContent = {
  week: 13,
  titleVi: "Đi khám bệnh & mua thuốc",
  pronunciationFocusVi: "Nói số và liều lượng thật rõ — chỗ này nhầm là nguy hiểm",

  vocabulary: [
    {
      id: "w13-i-dont-feel-well",
      week: 13,
      phrase: "I don't feel well.",
      meaningVi: "Tôi thấy trong người không khoẻ.",
      situation: "Câu mở đầu khi đi khám",
      isCoreChunk: true,
    },
    {
      id: "w13-i-have-a-pain-here",
      week: 13,
      phrase: "I have a pain here.",
      meaningVi: "Tôi đau ở chỗ này.",
      situation: "Chỉ tay vào chỗ đau — câu này cứu được cả buổi khám",
      isCoreChunk: true,
    },
    {
      id: "w13-my-stomach-hurts",
      week: 13,
      phrase: "My stomach hurts.",
      meaningVi: "Tôi đau bụng.",
      situation: "Nói chỗ đau",
      isCoreChunk: true,
    },
    {
      id: "w13-my-chest-hurts",
      week: 13,
      phrase: "My chest hurts.",
      meaningVi: "Tôi đau ngực.",
      situation: "Nói chỗ đau — triệu chứng cần nói ngay, đừng chờ",
      isCoreChunk: true,
    },
    {
      id: "w13-my-back-hurts",
      week: 13,
      phrase: "My back hurts.",
      meaningVi: "Tôi đau lưng.",
      situation: "Nói chỗ đau",
      isCoreChunk: true,
    },
    {
      id: "w13-i-have-a-headache-w13",
      week: 13,
      phrase: "I have a bad headache.",
      meaningVi: "Tôi đau đầu nhiều.",
      situation: "Nói triệu chứng",
      isCoreChunk: true,
    },
    {
      id: "w13-i-have-a-fever",
      week: 13,
      phrase: "I have a fever.",
      meaningVi: "Tôi bị sốt.",
      situation: "Nói triệu chứng",
      isCoreChunk: true,
    },
    {
      id: "w13-i-feel-dizzy",
      week: 13,
      phrase: "I feel dizzy.",
      meaningVi: "Tôi thấy chóng mặt.",
      situation: "Nói triệu chứng",
      isCoreChunk: true,
    },
    {
      id: "w13-i-cant-sleep",
      week: 13,
      phrase: "I can't sleep at night.",
      meaningVi: "Ban đêm tôi không ngủ được.",
      situation: "Nói triệu chứng kéo dài",
      isCoreChunk: false,
    },
    {
      id: "w13-since-three-days",
      week: 13,
      phrase: "Since three days ago.",
      meaningVi: "Từ ba hôm nay.",
      situation: "Trả lời 'bị bao lâu rồi' — bác sĩ luôn hỏi câu này",
      isCoreChunk: true,
    },
    {
      id: "w13-it-hurts-when-i-walk",
      week: 13,
      phrase: "It hurts when I walk.",
      meaningVi: "Đi lại thì đau.",
      situation: "Tả kiểu đau",
      isCoreChunk: true,
    },
    {
      id: "w13-a-sharp-pain",
      week: 13,
      phrase: "It's a sharp pain.",
      meaningVi: "Đau nhói.",
      situation: "Tả kiểu đau — bác sĩ cần biết nhói hay âm ỉ",
      isCoreChunk: false,
    },
    {
      id: "w13-a-dull-pain",
      week: 13,
      phrase: "It's a dull pain, not sharp.",
      meaningVi: "Đau âm ỉ, không nhói.",
      situation: "Tả kiểu đau",
      isCoreChunk: false,
    },
    {
      id: "w13-im-allergic-to-penicillin",
      week: 13,
      phrase: "I'm allergic to penicillin.",
      meaningVi: "Tôi dị ứng với penicillin.",
      situation: "PHẢI NÓI — nói trước khi bác sĩ kê thuốc, đừng chờ được hỏi",
      isCoreChunk: true,
    },
    {
      id: "w13-i-take-medicine-for",
      week: 13,
      phrase: "I take medicine for high blood pressure.",
      meaningVi: "Tôi đang uống thuốc huyết áp cao.",
      situation: "Tiền sử bệnh — nói ra hết, thuốc kỵ nhau là chuyện thật",
      isCoreChunk: true,
    },
    {
      id: "w13-i-have-diabetes",
      week: 13,
      phrase: "I have diabetes.",
      meaningVi: "Tôi bị tiểu đường.",
      situation: "Tiền sử bệnh",
      isCoreChunk: false,
    },
    {
      id: "w13-i-had-an-operation",
      week: 13,
      phrase: "I had an operation two years ago.",
      meaningVi: "Hai năm trước tôi có mổ.",
      situation: "Tiền sử bệnh",
      isCoreChunk: false,
    },
    {
      id: "w13-is-it-serious",
      week: 13,
      phrase: "Is it serious?",
      meaningVi: "Có nặng không bác sĩ?",
      situation: "Hỏi thẳng — mình có quyền biết",
      isCoreChunk: true,
    },
    {
      id: "w13-what-should-i-do",
      week: 13,
      phrase: "What should I do?",
      meaningVi: "Tôi nên làm gì ạ?",
      situation: "Hỏi hướng xử lý",
      isCoreChunk: true,
    },
    {
      id: "w13-how-many-times-a-day",
      week: 13,
      phrase: "How many times a day?",
      meaningVi: "Ngày uống mấy lần ạ?",
      situation: "LIỀU THUỐC — hỏi cho bằng được, đừng đoán",
      isCoreChunk: true,
    },
    {
      id: "w13-before-or-after-food",
      week: 13,
      phrase: "Before or after food?",
      meaningVi: "Uống trước hay sau khi ăn ạ?",
      situation: "LIỀU THUỐC — hỏi luôn, nhiều thuốc khác nhau chỗ này",
      isCoreChunk: true,
    },
    {
      id: "w13-so-two-tablets",
      week: 13,
      phrase: "So, two tablets, three times a day?",
      meaningVi: "Vậy là hai viên, ngày ba lần, đúng không ạ?",
      situation: "LIỀU THUỐC — câu quan trọng nhất tuần: nhắc lại cho chắc",
      isCoreChunk: true,
    },
    {
      id: "w13-for-how-many-days",
      week: 13,
      phrase: "For how many days?",
      meaningVi: "Uống trong mấy ngày ạ?",
      situation: "LIỀU THUỐC",
      isCoreChunk: true,
    },
    {
      id: "w13-could-you-write-it-down",
      week: 13,
      phrase: "Could you write it down for me, please?",
      meaningVi: "Bác sĩ ghi ra giấy giúp tôi.",
      situation: "Không chắc thì xin viết ra — không có gì phải ngại",
      isCoreChunk: true,
    },
    {
      id: "w13-do-i-need-a-prescription",
      week: 13,
      phrase: "Do I need a prescription?",
      meaningVi: "Có cần đơn thuốc không ạ?",
      situation: "Ở hiệu thuốc",
      isCoreChunk: false,
    },
    {
      id: "w13-something-for-a-cough",
      week: 13,
      phrase: "Something for a cough, please.",
      meaningVi: "Cho tôi thuốc ho.",
      situation: "Ở hiệu thuốc — không biết tên thuốc thì nói triệu chứng",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w13-listen-doctor",
    week: 13,
    titleVi: "Khám bệnh và nghe dặn liều thuốc",
    lines: [
      { speaker: "Anna", text: "Good morning. What seems to be the problem?" },
      { speaker: "Hung", text: "I don't feel well. My stomach hurts, since three days ago." },
      { speaker: "Anna", text: "I see. Is it a sharp pain or a dull pain?" },
      { speaker: "Hung", text: "A dull pain, not sharp. And I have a fever." },
      { speaker: "Anna", text: "Are you taking any medicine? Any allergies?" },
      { speaker: "Hung", text: "I'm allergic to penicillin. I take medicine for high blood pressure." },
      { speaker: "Anna", text: "Good to know. Take two tablets, three times a day, after food." },
    ],
    gist: {
      promptVi: "Ông Hùng đi khám vì chuyện gì?",
      options: ["Đau bụng và sốt", "Đau chân sau khi ngã", "Đi khám sức khoẻ định kỳ"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng bị bao lâu rồi?",
        options: ["Ba ngày", "Ba tuần", "Ba tháng"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng dị ứng với thuốc gì?",
        options: ["Penicillin", "Aspirin", "Không dị ứng gì"],
        answerIndex: 0,
      },
      {
        promptVi: "Bác sĩ dặn uống thế nào?",
        options: [
          "2 viên, ngày 3 lần, sau khi ăn",
          "3 viên, ngày 2 lần, trước khi ăn",
          "2 viên, ngày 1 lần, buổi tối",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "My stomach hurts, since three days", answer: "ago", after: "." },
      { before: "I'm allergic to", answer: "penicillin", after: "." },
      { before: "Take two tablets, three times a day, after", answer: "food", after: "." },
    ],
  },

  shadowing: [
    {
      id: "w13-sh-1",
      text: "I have a pain here. It hurts when I walk.",
      focusVi: "Nói chậm, chỉ tay vào chỗ đau cùng lúc",
    },
    {
      id: "w13-sh-2",
      text: "I'm allergic to penicillin.",
      focusVi: "Câu sống còn — nói to, rõ từng chữ, nhắc lại nếu cần",
    },
    {
      id: "w13-sh-3",
      text: "Two tablets, three times a day.",
      focusVi: "Tách rõ 'two' và 'three' — nhầm số ở đây là uống sai thuốc",
    },
    {
      id: "w13-sh-4",
      text: "Before or after food?",
      focusVi: "Lên giọng cuối câu, nhấn vào 'before' và 'after'",
    },
    {
      id: "w13-sh-5",
      text: "Could you write it down for me, please?",
      focusVi: "Nối 'write it' thành một hơi",
    },
  ],

  roleplay: {
    id: "w13-rp-doctor",
    week: 13,
    titleVi: "Đi khám bệnh",
    goalVi: "Tả được triệu chứng, báo được dị ứng, và nhắc lại đúng liều thuốc",
    startTurnId: "start",
    hintLevel: "keyword",
    turns: [
      {
        id: "start",
        say: "Good morning. What seems to be the problem?",
        sayVi: "Chào bác. Bác thấy trong người thế nào ạ?",
        hints: ["I don't feel well. My stomach hurts.", "I have a pain here."],
        branches: [
          { keywords: ["pain", "hurts", "stomach", "back", "chest", "well", "fever", "headache", "dizzy"], next: "how-long" },
        ],
        fallbackNext: "repeat-problem",
      },
      {
        id: "repeat-problem",
        say: "Take your time. Where does it hurt?",
        sayVi: "Bác cứ từ từ. Bác đau ở đâu ạ?",
        hints: ["My stomach hurts.", "I have a pain here."],
        branches: [
          { keywords: ["pain", "hurts", "stomach", "back", "chest", "head", "here"], next: "how-long" },
        ],
        fallbackNext: "how-long",
      },
      {
        id: "how-long",
        say: "How long have you had this?",
        sayVi: "Bác bị bao lâu rồi ạ?",
        hints: ["Since three days ago.", "Since three days ago. I have a fever too."],
        branches: [
          { keywords: ["since", "days", "day", "week", "weeks", "ago", "yesterday", "month"], next: "kind-of-pain" },
        ],
        fallbackNext: "kind-of-pain",
      },
      {
        id: "kind-of-pain",
        say: "Is it a sharp pain, or a dull pain?",
        sayVi: "Đau nhói hay đau âm ỉ ạ?",
        hints: ["It's a dull pain, not sharp.", "It's a sharp pain."],
        branches: [
          { keywords: ["dull", "sharp", "pain", "not", "walk", "hurts"], next: "allergies" },
        ],
        fallbackNext: "allergies",
      },
      {
        id: "allergies",
        // Chỗ này là chỗ nguy hiểm nhất của cả tuần. Nếu người học im lặng,
        // bác sĩ vẫn hỏi lại — vì trong đời thật bác sĩ cũng sẽ hỏi lại.
        say: "Are you allergic to anything? Any medicine you take?",
        sayVi: "Bác có dị ứng gì không? Bác đang uống thuốc gì không ạ?",
        hints: ["I'm allergic to penicillin.", "I take medicine for high blood pressure."],
        branches: [
          { keywords: ["allergic", "penicillin", "medicine", "blood", "pressure", "diabetes", "no", "nothing"], next: "dosage" },
        ],
        fallbackNext: "ask-again-allergies",
      },
      {
        id: "ask-again-allergies",
        say: "This is important — any allergies at all?",
        sayVi: "Cái này quan trọng — bác có dị ứng gì không ạ?",
        hints: ["I'm allergic to penicillin.", "No, nothing."],
        branches: [
          { keywords: ["allergic", "penicillin", "no", "nothing", "medicine"], next: "dosage" },
        ],
        fallbackNext: "dosage",
      },
      {
        id: "dosage",
        say: "Right. Take two tablets, three times a day, after food.",
        sayVi: "Được rồi. Bác uống hai viên, ngày ba lần, sau khi ăn.",
        // Kết bài bằng việc nhắc lại liều, không phải bằng lời cảm ơn.
        hints: ["So, two tablets, three times a day?", "Before or after food?"],
        branches: [
          { keywords: ["so", "tablets", "times", "before", "after", "food", "many", "days"], next: "confirm" },
        ],
        fallbackNext: "check-understood",
      },
      {
        id: "check-understood",
        say: "Did you get that? It matters that you take it correctly.",
        sayVi: "Bác nghe rõ chưa ạ? Uống đúng liều mới được.",
        hints: ["Could you write it down for me, please?", "So, two tablets, three times a day?"],
        branches: [
          { keywords: ["write", "down", "so", "tablets", "times", "again", "repeat"], next: "confirm" },
        ],
        fallbackNext: "confirm",
      },
      {
        id: "confirm",
        say: "That's right — two tablets, three times a day, after food, for five days.",
        sayVi: "Đúng rồi — hai viên, ngày ba lần, sau khi ăn, uống năm ngày.",
        hints: ["Thank you, doctor.", "Is it serious?"],
        branches: [
          { keywords: ["thanks", "thank", "doctor", "serious", "okay", "ok"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
