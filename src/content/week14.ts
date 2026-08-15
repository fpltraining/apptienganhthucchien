/**
 * Tuần 14 — Ngân hàng, bưu điện, hành chính (curriculum §7).
 *
 * Kỹ năng mới: nghe con số dài và đánh vần tên. Ở quán ăn nghe nhầm một chữ thì
 * ăn nhầm món; ở ngân hàng nghe nhầm một chữ số thì chuyển tiền sai chỗ. Nên
 * tuần này lặp lại rất nhiều lần đúng một động tác: nghe xong thì đọc lại cho
 * người ta xác nhận.
 *
 * Từ vựng chọn theo việc thật người lớn tuổi hay phải làm: đổi tiền, gửi bưu
 * kiện, điền form, hỏi thủ tục. Không dạy từ ngân hàng chuyên ngành.
 */

import type { WeekContent } from "./types";

export const week14: WeekContent = {
  week: 14,
  titleVi: "Ngân hàng, bưu điện & giấy tờ",
  pronunciationFocusVi: "Đọc chuỗi số dài: ngắt theo nhóm, và luôn đọc lại lần hai",

  vocabulary: [
    {
      id: "w14-id-like-to-change-money",
      week: 14,
      phrase: "I'd like to change some money.",
      meaningVi: "Tôi muốn đổi tiền.",
      situation: "Câu mở đầu ở quầy đổi tiền",
      isCoreChunk: true,
    },
    {
      id: "w14-whats-the-rate",
      week: 14,
      phrase: "What's the exchange rate today?",
      meaningVi: "Hôm nay tỉ giá bao nhiêu ạ?",
      situation: "Hỏi tỉ giá trước khi đổi",
      isCoreChunk: true,
    },
    {
      id: "w14-is-there-a-fee",
      week: 14,
      phrase: "Is there a fee?",
      meaningVi: "Có mất phí không ạ?",
      situation: "Hỏi phí — hỏi trước khi ký",
      isCoreChunk: true,
    },
    {
      id: "w14-in-small-notes",
      week: 14,
      phrase: "In small notes, please.",
      meaningVi: "Cho tôi tiền lẻ nhé.",
      situation: "Đổi tiền — xin mệnh giá nhỏ cho dễ tiêu",
      isCoreChunk: false,
    },
    {
      id: "w14-id-like-to-open-an-account",
      week: 14,
      phrase: "I'd like to open an account.",
      meaningVi: "Tôi muốn mở tài khoản.",
      situation: "Ở ngân hàng",
      isCoreChunk: true,
    },
    {
      id: "w14-what-do-i-need-to-bring",
      week: 14,
      phrase: "What do I need to bring?",
      meaningVi: "Tôi cần mang theo giấy tờ gì ạ?",
      situation: "Hỏi thủ tục — hỏi trước, khỏi đi lại hai lần",
      isCoreChunk: true,
    },
    {
      id: "w14-do-i-need-my-passport",
      week: 14,
      phrase: "Do I need my passport?",
      meaningVi: "Có cần hộ chiếu không ạ?",
      situation: "Hỏi giấy tờ cụ thể",
      isCoreChunk: true,
    },
    {
      id: "w14-could-you-help-me-fill-this",
      week: 14,
      phrase: "Could you help me fill in this form?",
      meaningVi: "Nhờ bạn giúp tôi điền tờ khai này.",
      situation: "Không hiểu form thì nhờ — nhân viên nào cũng giúp",
      isCoreChunk: true,
    },
    {
      id: "w14-where-do-i-sign",
      week: 14,
      phrase: "Where do I sign?",
      meaningVi: "Tôi ký vào chỗ nào ạ?",
      situation: "Ký giấy tờ",
      isCoreChunk: true,
    },
    {
      id: "w14-what-does-this-mean",
      week: 14,
      phrase: "Sorry, what does this word mean?",
      meaningVi: "Xin lỗi, chữ này nghĩa là gì ạ?",
      situation: "Gặp từ lạ trên form — hỏi trước khi ký",
      isCoreChunk: true,
    },
    {
      id: "w14-my-name-is-spelled",
      week: 14,
      phrase: "My name is spelled H-U-N-G.",
      meaningVi: "Tên tôi đánh vần là H-U-N-G.",
      situation: "Đánh vần tên — chủ động đánh vần, đừng chờ được hỏi",
      isCoreChunk: true,
    },
    {
      id: "w14-could-you-spell-that",
      week: 14,
      phrase: "Could you spell that for me?",
      meaningVi: "Bạn đánh vần giúp tôi được không?",
      situation: "Nghe tên hoặc địa chỉ không rõ",
      isCoreChunk: true,
    },
    {
      id: "w14-let-me-read-that-back",
      week: 14,
      phrase: "Let me read that back to you.",
      meaningVi: "Để tôi đọc lại cho bạn nghe.",
      situation: "SỐ DÀI — câu chuẩn của dân làm ngân hàng, dùng được ở mọi chỗ",
      isCoreChunk: true,
    },
    {
      id: "w14-is-that-correct",
      week: 14,
      phrase: "Is that correct?",
      meaningVi: "Vậy đúng chưa ạ?",
      situation: "SỐ DÀI — chốt lại sau khi đọc lại",
      isCoreChunk: true,
    },
    {
      id: "w14-my-account-number-is",
      week: 14,
      phrase: "My account number is four, two, seven, one.",
      meaningVi: "Số tài khoản của tôi là 4271.",
      situation: "Đọc số tài khoản — từng chữ số một, chậm rãi",
      isCoreChunk: true,
    },
    {
      id: "w14-id-like-to-send-this",
      week: 14,
      phrase: "I'd like to send this parcel.",
      meaningVi: "Tôi muốn gửi kiện hàng này.",
      situation: "Ở bưu điện",
      isCoreChunk: true,
    },
    {
      id: "w14-to-vietnam",
      week: 14,
      phrase: "To Vietnam, please.",
      meaningVi: "Gửi về Việt Nam.",
      situation: "Nói nơi nhận",
      isCoreChunk: true,
    },
    {
      id: "w14-how-long-will-it-take-w14",
      week: 14,
      phrase: "How long will it take to arrive?",
      meaningVi: "Bao lâu thì tới nơi ạ?",
      situation: "Hỏi thời gian giao",
      isCoreChunk: true,
    },
    {
      id: "w14-whats-the-cheapest-way",
      week: 14,
      phrase: "What's the cheapest way?",
      meaningVi: "Cách nào rẻ nhất ạ?",
      situation: "Hỏi giá — bưu điện luôn có nhiều mức",
      isCoreChunk: true,
    },
    {
      id: "w14-can-i-track-it",
      week: 14,
      phrase: "Can I track it?",
      meaningVi: "Tôi theo dõi được không ạ?",
      situation: "Hỏi mã vận đơn",
      isCoreChunk: false,
    },
    {
      id: "w14-its-fragile",
      week: 14,
      phrase: "It's fragile, please be careful.",
      meaningVi: "Bên trong dễ vỡ, nhờ bạn nhẹ tay.",
      situation: "Gửi đồ dễ vỡ",
      isCoreChunk: false,
    },
    {
      id: "w14-do-i-need-an-appointment",
      week: 14,
      phrase: "Do I need an appointment?",
      meaningVi: "Có cần hẹn trước không ạ?",
      situation: "Hỏi thủ tục hành chính",
      isCoreChunk: true,
    },
    {
      id: "w14-how-long-is-the-wait",
      week: 14,
      phrase: "How long is the wait?",
      meaningVi: "Phải chờ bao lâu ạ?",
      situation: "Hỏi thời gian chờ",
      isCoreChunk: false,
    },
    {
      id: "w14-could-you-check-that-again",
      week: 14,
      phrase: "Could you check that again, please?",
      meaningVi: "Bạn kiểm tra lại giúp tôi.",
      situation: "Thấy sai sót — nói nhẹ nhàng, đề nghị kiểm tra chứ đừng kết tội",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w14-listen-postoffice",
    week: 14,
    titleVi: "Gửi bưu kiện và đọc lại số",
    lines: [
      { speaker: "Anna", text: "Good afternoon. How can I help?" },
      { speaker: "Hung", text: "I'd like to send this parcel to Vietnam." },
      { speaker: "Anna", text: "Certainly. The cheapest way is fourteen days, two hundred thousand." },
      { speaker: "Hung", text: "Sorry, fourteen or forty days?" },
      { speaker: "Anna", text: "Fourteen. One, four. Your tracking number is seven-two-nine-one." },
      { speaker: "Hung", text: "Let me read that back — seven, two, nine, one. Is that correct?" },
      { speaker: "Anna", text: "That's correct. And could you spell your name, please?" },
    ],
    gist: {
      promptVi: "Ông Hùng đang làm gì ở bưu điện?",
      options: ["Gửi kiện hàng về Việt Nam", "Đổi tiền", "Mở tài khoản ngân hàng"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Gửi mất bao nhiêu ngày?",
        options: ["14 ngày", "40 ngày", "4 ngày"],
        answerIndex: 0,
      },
      {
        promptVi: "Mã theo dõi là số nào?",
        options: ["7291", "7219", "2791"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng làm gì sau khi nghe mã?",
        options: ["Đọc lại để xác nhận", "Ghi vào điện thoại rồi đi", "Hỏi giá lại"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I'd like to send this", answer: "parcel", after: "to Vietnam." },
      { before: "Sorry, fourteen or", answer: "forty", after: "days?" },
      { before: "Let me", answer: "read", after: "that back — seven, two, nine, one." },
    ],
  },

  shadowing: [
    {
      id: "w14-sh-1",
      text: "Seven, two, nine, one.",
      focusVi: "Đọc từng số, dừng hẳn giữa các số — đừng đọc dính",
    },
    {
      id: "w14-sh-2",
      text: "Fourteen, not forty.",
      focusVi: "'Fourteen' nhấn cuối, 'forty' nhấn đầu — ôn lại tuần 2",
    },
    {
      id: "w14-sh-3",
      text: "Let me read that back to you.",
      focusVi: "Nối 'read that' cho mượt, bật rõ 'k' trong 'back'",
    },
    {
      id: "w14-sh-4",
      text: "My name is spelled H - U - N - G.",
      focusVi: "Từng chữ cái một, đừng vội",
    },
    {
      id: "w14-sh-5",
      text: "Could you check that again, please?",
      focusVi: "Giọng nhẹ — đây là đề nghị kiểm tra, không phải lời trách",
    },
  ],

  roleplay: {
    id: "w14-rp-bank",
    week: 14,
    titleVi: "Ở ngân hàng: đổi tiền và điền form",
    goalVi: "Hỏi được tỉ giá và phí, đánh vần tên, và đọc lại số cho đúng",
    startTurnId: "start",
    hintLevel: "keyword",
    // Chuyện thường gặp: đang làm dở thì bị báo thiếu giấy tờ.
    surpriseTurnId: "need-passport",
    turns: [
      {
        id: "start",
        say: "Good afternoon. What can I do for you?",
        sayVi: "Chào bác. Bác cần gì ạ?",
        hints: ["I'd like to change some money.", "I'd like to open an account."],
        branches: [
          { keywords: ["change", "money", "open", "account", "send", "parcel"], next: "rate" },
        ],
        fallbackNext: "repeat-what",
      },
      {
        id: "repeat-what",
        say: "Sorry — what would you like to do today?",
        sayVi: "Xin lỗi — hôm nay bác muốn làm gì ạ?",
        hints: ["I'd like to change some money."],
        branches: [
          { keywords: ["change", "money", "open", "account"], next: "rate" },
        ],
        fallbackNext: "rate",
      },
      {
        id: "rate",
        say: "Of course. How much would you like to change?",
        sayVi: "Vâng ạ. Bác muốn đổi bao nhiêu?",
        hints: ["What's the exchange rate today?", "Is there a fee?"],
        branches: [
          { keywords: ["rate", "exchange", "fee", "much", "hundred", "thousand"], next: "form" },
        ],
        fallbackNext: "form",
      },
      {
        id: "form",
        say: "The rate is twenty-five thousand, and there's no fee. Please fill in this form.",
        sayVi: "Tỉ giá hai mươi lăm nghìn, không mất phí ạ. Bác điền giúp tờ khai này.",
        hints: ["Could you help me fill in this form?", "Sorry, what does this word mean?"],
        branches: [
          { keywords: ["help", "fill", "form", "mean", "word", "sign", "where"], next: "name" },
          { keywords: ["okay", "ok", "yes", "thanks", "thank"], next: "name" },
        ],
        fallbackNext: "name",
      },
      {
        id: "need-passport",
        // Turn lệch kịch bản: đang trôi chảy thì vướng giấy tờ. Nó chèn vào
        // ngay trước phần hỏi tên, rồi nhập lại đúng chỗ cũ.
        say: "Oh — before that, I'll need to see your passport. Do you have it with you?",
        sayVi: "À — trước đó tôi cần xem hộ chiếu của bác. Bác có mang theo không ạ?",
        hints: ["Yes, here's my passport.", "Do I need my passport?"],
        branches: [
          { keywords: ["yes", "passport", "here", "need", "have", "no"], next: "name" },
        ],
        fallbackNext: "name",
      },
      {
        id: "name",
        say: "Thank you. Could you spell your name for me?",
        sayVi: "Cảm ơn bác. Bác đánh vần tên giúp tôi ạ?",
        hints: ["My name is spelled H-U-N-G.", "Let me spell it for you."],
        branches: [
          { keywords: ["spelled", "spell", "name", "hung"], next: "number" },
        ],
        fallbackNext: "number",
      },
      {
        id: "number",
        say: "And your reference number is four, two, seven, one.",
        sayVi: "Số hồ sơ của bác là bốn, hai, bảy, một.",
        // Đọc lại số là kỹ năng chính của tuần: không đọc lại thì coi như chưa học.
        hints: ["Let me read that back to you.", "So, four, two, seven, one. Is that correct?"],
        branches: [
          { keywords: ["read", "back", "so", "four", "two", "seven", "one", "correct", "repeat", "again"], next: "confirm" },
        ],
        fallbackNext: "check-number",
      },
      {
        id: "check-number",
        say: "Did you get the number? It's important for collecting your money.",
        sayVi: "Bác ghi được số chưa ạ? Số này để lát nữa nhận tiền.",
        hints: ["Could you say that again, please?", "Let me read that back to you."],
        branches: [
          { keywords: ["again", "read", "back", "repeat", "write", "down", "sorry"], next: "confirm" },
        ],
        fallbackNext: "confirm",
      },
      {
        id: "confirm",
        say: "That's correct. Please sign at the bottom.",
        sayVi: "Đúng rồi ạ. Bác ký ở phía dưới giúp tôi.",
        hints: ["Where do I sign?", "Thank you very much."],
        branches: [
          { keywords: ["where", "sign", "thanks", "thank", "okay", "ok"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
