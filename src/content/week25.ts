/**
 * Tuần 25 — Accent Gauntlet (curriculum §7).
 *
 * Không có từ mới. §giai đoạn 3 đóng băng nội dung ở tuần 25–26, và tuần này
 * tuân thủ đúng: mọi câu dưới đây đều đã học ở các tuần trước. Cái đổi là
 * **giọng nói**.
 *
 * Năm giọng, mỗi người một kiểu: Ấn Độ, Anh-Anh, Úc, Philippines, và Mỹ miền
 * Nam. Bài nghe đặt cả năm giọng vào cùng một đoạn (`lang` riêng cho từng
 * dòng), nội dung thì quen thuộc tới mức nhàm — và đó là chủ ý. Khi nội dung
 * không còn là biến số, cái duy nhất làm người học vấp chính là giọng, và họ
 * nhận ra được điều đó.
 *
 * Giáo trình gọi phần này là thứ quyết định giữa "hiểu app" và "hiểu người".
 * Nói cho đủ: máy nào không cài sẵn mấy giọng đó thì app đọc bằng giọng mặc
 * định, và tuần này mất gần hết tác dụng. Đây là hạn chế thật của việc dùng
 * giọng đọc có sẵn thay vì thu âm người thật; ghi ra để ai làm tiếp thì biết
 * đường bù bằng file thu sẵn.
 *
 * Từ vựng bên dưới là danh sách ôn — cùng những cụm cũ, nhưng phần `situation`
 * ghi lại giọng nào hay nuốt chữ nào, vì đó mới là thứ mới của tuần.
 */

import type { WeekContent } from "./types";

export const week25: WeekContent = {
  week: 25,
  titleVi: "Accent Gauntlet — năm giọng, nội dung cũ",
  pronunciationFocusVi: "Nghe là chính: cùng một câu, năm giọng khác nhau",
  // Nới nhẹ so với tuần 23: chỗ khó tuần này nằm ở tai, không nằm ở đồng hồ.
  responseDeadlineMs: 5000,

  vocabulary: [
    {
      id: "w25-r-sorry-again",
      week: 25,
      phrase: "Sorry, could you say that again?",
      meaningVi: "Xin lỗi, bạn nói lại được không?",
      situation: "ÔN — câu quan trọng nhất tuần này, dùng với cả năm giọng",
      isCoreChunk: true,
    },
    {
      id: "w25-r-slower",
      week: 25,
      phrase: "Could you speak a bit slower, please?",
      meaningVi: "Bạn nói chậm lại một chút được không?",
      situation: "ÔN — giọng lạ thì xin chậm, không phải xin to",
      isCoreChunk: true,
    },
    {
      id: "w25-r-spell",
      week: 25,
      phrase: "Could you spell that for me?",
      meaningVi: "Bạn đánh vần giúp tôi được không?",
      situation: "ÔN — nghe tên riêng qua giọng lạ thì đánh vần là cách chắc nhất",
      isCoreChunk: true,
    },
    {
      id: "w25-r-speak-up",
      week: 25,
      phrase: "Could you speak up a little?",
      meaningVi: "Bạn nói to hơn chút được không?",
      situation: "ÔN tuần 16 — giọng lạ mà nói nhỏ nữa thì chịu",
      isCoreChunk: true,
    },
    {
      id: "w25-r-thirty",
      week: 25,
      phrase: "Thirteen, not thirty.",
      meaningVi: "Mười ba, không phải ba mươi.",
      situation: "ÔN tuần 2 — giọng Ấn và giọng Úc đánh trọng âm khác nhau ở chỗ này",
      isCoreChunk: true,
    },
    {
      id: "w25-r-where-station",
      week: 25,
      phrase: "Where is the station?",
      meaningVi: "Nhà ga ở đâu?",
      situation: "ÔN tuần 6 — giọng Anh-Anh nuốt chữ 'r' cuối, nghe rất khác",
      isCoreChunk: true,
    },
    {
      id: "w25-r-turn-left",
      week: 25,
      phrase: "Turn left at the corner.",
      meaningVi: "Tới góc đường thì rẽ trái.",
      situation: "ÔN tuần 6 — nghe chỉ dẫn qua giọng lạ",
      isCoreChunk: true,
    },
    {
      id: "w25-r-how-much",
      week: 25,
      phrase: "How much is it?",
      meaningVi: "Cái này bao nhiêu tiền?",
      situation: "ÔN tuần 2",
      isCoreChunk: true,
    },
    {
      id: "w25-r-allergic",
      week: 25,
      phrase: "I'm allergic to seafood.",
      meaningVi: "Tôi bị dị ứng hải sản.",
      situation: "ÔN tuần 4 — câu này phải nói được rõ với bất kỳ ai",
      isCoreChunk: true,
    },
    {
      id: "w25-r-bill",
      week: 25,
      phrase: "The bill, please.",
      meaningVi: "Tính tiền giúp tôi.",
      situation: "ÔN tuần 4",
      isCoreChunk: true,
    },
    {
      id: "w25-r-reservation",
      week: 25,
      phrase: "I have a reservation.",
      meaningVi: "Tôi có đặt phòng trước.",
      situation: "ÔN tuần 11 — giọng Mỹ miền Nam kéo dài nguyên âm, nghe chậm mà khó bắt",
      isCoreChunk: true,
    },
    {
      id: "w25-r-not-working",
      week: 25,
      phrase: "The air conditioning isn't working.",
      meaningVi: "Máy lạnh không chạy.",
      situation: "ÔN tuần 11",
      isCoreChunk: true,
    },
    {
      id: "w25-r-gate",
      week: 25,
      phrase: "Has the gate changed?",
      meaningVi: "Cổng có đổi không ạ?",
      situation: "ÔN tuần 12 — loa sân bay ở mỗi nước một giọng",
      isCoreChunk: true,
    },
    {
      id: "w25-r-didnt-catch",
      week: 25,
      phrase: "Sorry, I didn't catch that.",
      meaningVi: "Xin lỗi, tôi không nghe kịp.",
      situation: "ÔN tuần 12 — câu dùng nhiều nhất cả tuần này",
      isCoreChunk: true,
    },
    {
      id: "w25-r-two-tablets",
      week: 25,
      phrase: "So, two tablets, three times a day?",
      meaningVi: "Vậy là hai viên, ngày ba lần, đúng không?",
      situation: "ÔN tuần 13 — nghe liều thuốc qua giọng lạ, sai là nguy hiểm",
      isCoreChunk: true,
    },
    {
      id: "w25-r-read-back",
      week: 25,
      phrase: "Let me read that back to you.",
      meaningVi: "Để tôi đọc lại cho bạn nghe.",
      situation: "ÔN tuần 14 — cách chắc chắn nhất khi không tin vào tai mình",
      isCoreChunk: true,
    },
    {
      id: "w25-r-breaking-up",
      week: 25,
      phrase: "Sorry, you're breaking up.",
      meaningVi: "Xin lỗi, tiếng bạn bị ngắt quãng.",
      situation: "ÔN tuần 16",
      isCoreChunk: true,
    },
    {
      id: "w25-r-repeat-last-part",
      week: 25,
      phrase: "Could you repeat the last part?",
      meaningVi: "Bạn nhắc lại đoạn cuối được không?",
      situation: "ÔN tuần 18 — hỏi đúng đoạn mình sót, không bắt nói lại cả bài",
      isCoreChunk: true,
    },
    {
      id: "w25-r-just-to-be-clear",
      week: 25,
      phrase: "Just to be clear — you mean next Monday?",
      meaningVi: "Cho rõ nhé — ý bạn là thứ Hai tuần sau?",
      situation: "ÔN tuần 19 — dùng nhiều nhất khi giọng người nói khó nghe",
      isCoreChunk: true,
    },
    {
      id: "w25-r-chat",
      week: 25,
      phrase: "Could you put that in the chat?",
      meaningVi: "Bạn gõ cái đó vào khung chat giúp tôi nhé?",
      situation: "ÔN tuần 18 — nghe không ra thì xin chữ. Mẹo cứu cả cuộc họp",
      isCoreChunk: true,
    },
    {
      id: "w25-r-i-need-ambulance",
      week: 25,
      phrase: "I need an ambulance.",
      meaningVi: "Tôi cần xe cấp cứu.",
      situation: "ÔN tuần 23 — phải nói rõ được với người trực bất kỳ giọng nào",
      isCoreChunk: true,
    },
    {
      id: "w25-r-address",
      week: 25,
      phrase: "Let me repeat the address.",
      meaningVi: "Để tôi nhắc lại địa chỉ.",
      situation: "ÔN tuần 23",
      isCoreChunk: true,
    },
    {
      id: "w25-r-english-not-good",
      week: 25,
      phrase: "My English is not good. Please speak slowly.",
      meaningVi: "Tiếng Anh tôi không tốt. Bạn nói chậm giúp tôi.",
      situation: "ÔN — nói một lần đầu cuộc trò chuyện, người ta sẽ đổi cách nói ngay",
      isCoreChunk: true,
    },
    {
      id: "w25-r-thank-you-help",
      week: 25,
      phrase: "Thank you for your help.",
      meaningVi: "Cảm ơn bạn đã giúp.",
      situation: "ÔN — câu kết, dùng với mọi giọng",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w25-listen-gauntlet",
    week: 25,
    titleVi: "Năm người, năm giọng, cùng một ngày",
    // Nội dung quen thuộc tới mức nhàm. Biến số duy nhất là giọng — đó là toàn
    // bộ ý nghĩa của bài nghe này.
    lines: [
      { speaker: "Raj (Ấn Độ)", text: "Good morning. Your gate has changed — it's gate thirty now.", lang: "en-IN" },
      { speaker: "Hung", text: "Sorry, I didn't catch that. Thirteen or thirty?" },
      { speaker: "Emma (Anh-Anh)", text: "Thirty. Turn left at the corner, past the station.", lang: "en-GB" },
      { speaker: "Jack (Úc)", text: "No worries, mate. The bill's forty-five, if you're ready.", lang: "en-AU" },
      { speaker: "Maria (Philippines)", text: "And your room? I have a reservation here under Hung.", lang: "en-PH" },
      { speaker: "Bill (Mỹ miền Nam)", text: "Now, y'all take two tablets, three times a day, after food.", lang: "en-US" },
      { speaker: "Hung", text: "Let me read that back to you. Two tablets, three times a day." },
    ],
    gist: {
      promptVi: "Điểm chung của cả năm người nói là gì?",
      options: [
        "Nói những câu quen thuộc, nhưng mỗi người một giọng",
        "Cùng làm ở một công ty",
        "Đều đang tức giận",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Cổng ra máy bay đổi thành số mấy?",
        options: ["30", "13", "40"],
        answerIndex: 0,
      },
      {
        promptVi: "Hoá đơn hết bao nhiêu?",
        options: ["45", "40", "54"],
        answerIndex: 0,
      },
      {
        promptVi: "Liều thuốc là thế nào?",
        options: [
          "2 viên, ngày 3 lần, sau khi ăn",
          "3 viên, ngày 2 lần, trước khi ăn",
          "2 viên, ngày 2 lần",
        ],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Your gate has changed — it's gate", answer: "thirty", after: "now." },
      { before: "Turn left at the", answer: "corner", after: ", past the station." },
      { before: "Let me read that", answer: "back", after: "to you." },
    ],
  },

  shadowing: [
    {
      id: "w25-sh-1",
      text: "Sorry, I didn't catch that. Could you say that again?",
      focusVi: "Câu dùng nhiều nhất tuần này — nói cho quen tới mức bật ra không nghĩ",
    },
    {
      id: "w25-sh-2",
      text: "Thirteen or thirty?",
      focusVi: "Tự mình nói cho rõ, để người ta cũng không nghe nhầm mình",
    },
    {
      id: "w25-sh-3",
      text: "Just to be clear — you mean next Monday?",
      focusVi: "Xác nhận lại: nghe giọng lạ thì câu này dùng gấp đôi bình thường",
    },
    {
      id: "w25-sh-4",
      text: "Let me read that back to you.",
      focusVi: "Đọc lại chậm và rõ — không tin tai mình thì kiểm tra bằng miệng",
    },
    {
      id: "w25-sh-5",
      text: "My English is not good. Please speak slowly.",
      focusVi: "Nói bình thản, không ngại — câu này làm cả hai bên dễ thở hơn",
    },
  ],

  roleplay: {
    id: "w25-rp-gauntlet",
    week: 25,
    titleVi: "Một ngày, gặp lần lượt năm giọng khác nhau",
    goalVi: "Xử lý được cùng những tình huống cũ, dù người nói có giọng thế nào",
    startTurnId: "airport",
    hintLevel: "none",
    turns: [
      {
        id: "airport",
        say: "Good morning, sir. Your gate has changed — it is gate thirty now, not thirteen.",
        sayVi: "Chào buổi sáng. Cổng của anh đổi rồi — giờ là cổng 30, không phải 13.",
        hints: [
          "Sorry, I didn't catch that. Thirteen or thirty?",
          "So you mean gate thirty, not thirteen?",
        ],
        branches: [
          { keywords: ["catch", "thirteen", "thirty", "gate", "sorry", "mean", "again", "clear"], next: "directions" },
        ],
        fallbackNext: "airport-again",
      },
      {
        id: "airport-again",
        say: "Sir? Did you hear me? The gate has changed.",
        sayVi: "Anh ơi? Anh nghe rõ không? Cổng đổi rồi ạ.",
        hints: [
          "Sorry, could you say that again?",
          "Could you speak a bit slower, please?",
        ],
        branches: [
          { keywords: ["sorry", "again", "slower", "speak", "catch", "gate", "repeat"], next: "directions" },
        ],
        fallbackNext: "directions",
      },
      {
        id: "directions",
        say: "Right then — turn left at the corner, past the station, you can't miss it.",
        sayVi: "Được rồi — anh rẽ trái ở góc, đi qua nhà ga, dễ thấy lắm.",
        hints: [
          "So, left at the corner, past the station?",
          "Sorry, could you say that again?",
        ],
        branches: [
          { keywords: ["so", "left", "corner", "station", "past", "sorry", "again", "clear"], next: "shop" },
        ],
        fallbackNext: "shop",
      },
      {
        id: "shop",
        say: "No worries, mate. That'll be forty-five altogether, whenever you're ready.",
        sayVi: "Không sao đâu bạn. Tất cả là bốn mươi lăm, khi nào bạn sẵn sàng thì trả.",
        hints: [
          "Sorry, forty-five or fifty-four?",
          "Forty-five. Here you are.",
        ],
        branches: [
          { keywords: ["forty", "five", "fifty", "four", "sorry", "here", "much", "again"], next: "hotel" },
        ],
        fallbackNext: "hotel",
      },
      {
        id: "hotel",
        say: "Good afternoon po. Do you have a reservation with us today?",
        sayVi: "Chào buổi chiều ạ. Anh có đặt phòng hôm nay không ạ?",
        hints: [
          "Yes, I have a reservation, under the name Hung.",
          "Yes. Could you spell that back for me?",
        ],
        branches: [
          { keywords: ["yes", "reservation", "name", "hung", "spell", "booking"], next: "pharmacy" },
        ],
        fallbackNext: "pharmacy",
      },
      {
        id: "pharmacy",
        say: "Now, y'all take two tablets, three times a day, after food, all right?",
        sayVi: "Này nhé, anh uống hai viên, ngày ba lần, sau khi ăn, được chứ?",
        hints: [
          "Let me read that back to you. Two tablets, three times a day?",
          "So, two tablets, three times a day, after food?",
        ],
        branches: [
          { keywords: ["read", "back", "so", "two", "tablets", "three", "times", "food", "day"], next: "close" },
        ],
        fallbackNext: "check-dose",
      },
      {
        id: "check-dose",
        // Liều thuốc là chỗ duy nhất trong tuần không cho phép đoán, nên nếu
        // người học im lặng thì bị hỏi lại — giống hệt tuần 13.
        say: "Did you get all that, now? It matters you take it right.",
        sayVi: "Anh nghe hết chưa? Uống đúng liều mới được đấy.",
        hints: [
          "Let me read that back to you.",
          "Could you say that again, a bit slower?",
        ],
        branches: [
          { keywords: ["read", "back", "again", "slower", "sorry", "write", "repeat"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "That's right. You have a good day now.",
        sayVi: "Đúng rồi đó. Chúc anh một ngày tốt lành.",
        hints: ["Thank you for your help.", "Thank you. Have a good day."],
        branches: [
          { keywords: ["thank", "help", "good", "day", "you"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
