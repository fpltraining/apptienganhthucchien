/**
 * Tuần 10 — Quán cà phê & đặt chỗ qua điện thoại (curriculum §7).
 *
 * Kỹ năng mới của tuần: nghe mà không có hình ảnh hỗ trợ. Nói chuyện trực tiếp
 * thì còn nhìn mặt, nhìn tay, nhìn thực đơn mà đoán; qua điện thoại thì mất hết
 * chỗ dựa đó, chỉ còn cái tai. Vì vậy bài đóng vai tuần này đặt hẳn trong một
 * cuộc gọi, và việc đánh vần tên, nhắc lại số là phần bắt buộc chứ không phải
 * phần thêm.
 */

import type { WeekContent } from "./types";

export const week10: WeekContent = {
  week: 10,
  titleVi: "Quán cà phê & đặt chỗ qua điện thoại",
  pronunciationFocusVi: "Nói rõ qua điện thoại: đánh vần tên, tách từng chữ số",

  vocabulary: [
    {
      id: "w10-a-large-coffee",
      week: 10,
      phrase: "A large coffee, please.",
      meaningVi: "Cho tôi một ly cà phê lớn.",
      situation: "Gọi đồ uống, nói cỡ luôn",
      isCoreChunk: true,
    },
    {
      id: "w10-with-milk",
      week: 10,
      phrase: "With milk, but no sugar.",
      meaningVi: "Có sữa, nhưng không đường.",
      situation: "Tuỳ chỉnh đồ uống",
      isCoreChunk: true,
    },
    {
      id: "w10-iced-or-hot",
      week: 10,
      phrase: "Iced, please. Not hot.",
      meaningVi: "Cho đá nhé. Đừng nóng.",
      situation: "Nói rõ nóng hay đá",
      isCoreChunk: true,
    },
    {
      id: "w10-extra-shot",
      week: 10,
      phrase: "Could I have an extra shot?",
      meaningVi: "Cho tôi thêm một shot cà phê được không?",
      situation: "Xin thêm — cà phê Việt uống quen thì hay thấy cà phê Tây nhạt",
      isCoreChunk: false,
    },
    {
      id: "w10-to-go",
      week: 10,
      phrase: "To go, please.",
      meaningVi: "Cho mang đi.",
      situation: "Trả lời câu 'For here or to go?'",
      isCoreChunk: true,
    },
    {
      id: "w10-whats-your-name-for-the-order",
      week: 10,
      phrase: "It's Hung. H-U-N-G.",
      meaningVi: "Tên tôi là Hùng. H-U-N-G.",
      situation: "Đánh vần tên — quán nào cũng hỏi, và không ai viết đúng lần đầu",
      isCoreChunk: true,
    },
    {
      id: "w10-how-do-you-spell-that",
      week: 10,
      phrase: "How do you spell that?",
      meaningVi: "Cái đó đánh vần thế nào?",
      situation: "Hỏi lại tên hoặc địa chỉ mình nghe không rõ",
      isCoreChunk: true,
    },
    {
      id: "w10-let-me-spell-it",
      week: 10,
      phrase: "Let me spell it for you.",
      meaningVi: "Để tôi đánh vần cho bạn.",
      situation: "Chủ động đánh vần khi thấy người ta lúng túng",
      isCoreChunk: true,
    },
    {
      id: "w10-is-there-wifi",
      week: 10,
      phrase: "Is there wifi here?",
      meaningVi: "Ở đây có wifi không?",
      situation: "Hỏi ở quán",
      isCoreChunk: false,
    },
    {
      id: "w10-whats-the-password",
      week: 10,
      phrase: "What's the wifi password?",
      meaningVi: "Mật khẩu wifi là gì?",
      situation: "Hỏi tiếp — và chuẩn bị nghe một chuỗi chữ số",
      isCoreChunk: false,
    },
    {
      id: "w10-can-i-sit-here",
      week: 10,
      phrase: "Can I sit here?",
      meaningVi: "Tôi ngồi đây được không?",
      situation: "Quán đông, hỏi trước cho lịch sự",
      isCoreChunk: false,
    },
    {
      id: "w10-hello-is-that",
      week: 10,
      phrase: "Hello, is that the Green Restaurant?",
      meaningVi: "Alô, đây có phải nhà hàng Green không ạ?",
      situation: "GỌI ĐIỆN — câu mở đầu, xác nhận gọi đúng chỗ",
      isCoreChunk: true,
    },
    {
      id: "w10-im-calling-to-book",
      week: 10,
      phrase: "I'm calling to book a table.",
      meaningVi: "Tôi gọi để đặt bàn.",
      situation: "GỌI ĐIỆN — nói ngay mục đích, đừng vòng vo",
      isCoreChunk: true,
    },
    {
      id: "w10-for-two-people",
      week: 10,
      phrase: "For two people, at eight o'clock.",
      meaningVi: "Hai người, lúc tám giờ.",
      situation: "GỌI ĐIỆN — số người và giờ, gộp một câu",
      isCoreChunk: true,
    },
    {
      id: "w10-this-friday",
      week: 10,
      phrase: "This Friday evening.",
      meaningVi: "Tối thứ Sáu này.",
      situation: "Nói ngày đặt",
      isCoreChunk: false,
    },
    {
      id: "w10-sorry-the-line-is-bad",
      week: 10,
      phrase: "Sorry, the line is bad.",
      meaningVi: "Xin lỗi, đường dây nghe không rõ.",
      situation: "CÂU CỨU HỘ QUA ĐIỆN THOẠI — đổ tại đường dây, không phải tại mình",
      isCoreChunk: true,
    },
    {
      id: "w10-i-cant-hear-you",
      week: 10,
      phrase: "I can't hear you very well.",
      meaningVi: "Tôi nghe bạn không rõ lắm.",
      situation: "CÂU CỨU HỘ QUA ĐIỆN THOẠI",
      isCoreChunk: true,
    },
    {
      id: "w10-could-you-repeat-the-time",
      week: 10,
      phrase: "Could you repeat the time, please?",
      meaningVi: "Bạn nhắc lại giờ giúp tôi.",
      situation: "Hỏi lại đúng chỗ mình cần, thay vì bắt người ta nói lại cả câu",
      isCoreChunk: true,
    },
    {
      id: "w10-so-thats-eight-oclock",
      week: 10,
      phrase: "So that's eight o'clock, table for two?",
      meaningVi: "Vậy là tám giờ, bàn hai người, đúng không?",
      situation: "Nhắc lại toàn bộ trước khi cúp máy — chốt cho chắc",
      isCoreChunk: true,
    },
    {
      id: "w10-my-number-is-w10",
      week: 10,
      phrase: "My number is oh nine one, two three four.",
      meaningVi: "Số của tôi là 091 234.",
      situation: "Đọc số điện thoại — từng chữ số một, chậm thôi",
      isCoreChunk: true,
    },
    {
      id: "w10-do-you-have-anything-earlier",
      week: 10,
      phrase: "Do you have anything earlier?",
      meaningVi: "Có giờ nào sớm hơn không?",
      situation: "Khi giờ mình muốn đã kín",
      isCoreChunk: false,
    },
    {
      id: "w10-thats-fine",
      week: 10,
      phrase: "That's fine, thank you.",
      meaningVi: "Vậy cũng được, cảm ơn.",
      situation: "Chấp nhận phương án thay thế",
      isCoreChunk: true,
    },
    {
      id: "w10-i-need-to-cancel",
      week: 10,
      phrase: "I need to cancel my booking.",
      meaningVi: "Tôi cần huỷ đặt bàn.",
      situation: "Gọi huỷ — gọi báo còn hơn không tới",
      isCoreChunk: false,
    },
    {
      id: "w10-thank-you-goodbye",
      week: 10,
      phrase: "Thank you. Goodbye.",
      meaningVi: "Cảm ơn. Tạm biệt.",
      situation: "Cúp máy cho gọn — không cần dài dòng",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w10-listen-phone-booking",
    week: 10,
    titleVi: "Gọi điện đặt bàn (không nhìn thấy mặt)",
    lines: [
      { speaker: "Anna", text: "Green Restaurant, good afternoon." },
      { speaker: "Hung", text: "Hello. I'm calling to book a table." },
      { speaker: "Anna", text: "Certainly. For how many, and what time?" },
      { speaker: "Hung", text: "For two people, at eight o'clock this Friday." },
      { speaker: "Anna", text: "Eight is full, I'm afraid. We have seven thirty." },
      { speaker: "Hung", text: "Sorry, the line is bad. Could you repeat the time?" },
      { speaker: "Anna", text: "Seven thirty. And your name, please?" },
    ],
    gist: {
      promptVi: "Ông Hùng gọi điện để làm gì?",
      options: ["Đặt bàn ăn", "Huỷ bàn đã đặt", "Hỏi đường tới nhà hàng"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng muốn đặt bàn lúc mấy giờ?",
        options: ["8 giờ", "7 giờ rưỡi", "6 giờ"],
        answerIndex: 0,
      },
      {
        promptVi: "Nhà hàng đề nghị giờ nào?",
        options: ["7 giờ rưỡi", "8 giờ rưỡi", "9 giờ"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao ông Hùng hỏi lại?",
        options: ["Đường dây nghe không rõ", "Không thích giờ đó", "Muốn đổi ngày"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Hello. I'm calling to", answer: "book", after: "a table." },
      { before: "For two people, at eight o'clock this", answer: "Friday", after: "." },
      { before: "Sorry, the", answer: "line", after: "is bad. Could you repeat the time?" },
    ],
  },

  shadowing: [
    {
      id: "w10-sh-1",
      text: "It's Hung. H - U - N - G.",
      focusVi: "Đánh vần từng chữ, dừng hẳn giữa các chữ cái",
    },
    {
      id: "w10-sh-2",
      text: "My number is oh nine one, two three four.",
      focusVi: "Đọc từng chữ số, ngắt sau nhóm ba số",
    },
    {
      id: "w10-sh-3",
      text: "Sorry, the line is bad. Could you repeat that?",
      focusVi: "Nói to hơn bình thường một chút — qua điện thoại tiếng bị mỏng",
    },
    {
      id: "w10-sh-4",
      text: "So that's eight o'clock, table for two?",
      focusVi: "Lên giọng cuối câu — đây là câu chốt lại, phải nghe ra là câu hỏi",
    },
    {
      id: "w10-sh-5",
      text: "With milk, but no sugar. To go, please.",
      focusVi: "Bật rõ 'k' cuối trong 'milk' và 'r' trong 'sugar'",
    },
  ],

  roleplay: {
    id: "w10-rp-phone",
    week: 10,
    titleVi: "Gọi điện đặt bàn",
    goalVi: "Đặt được bàn qua điện thoại, xử lý khi nghe không rõ, chốt lại trước khi cúp máy",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Green Restaurant, good afternoon. How can I help?",
        sayVi: "Nhà hàng Green xin nghe, chào anh. Anh cần gì ạ?",
        hints: ["Hello. I'm calling to book a table.", "Hello, is that the Green Restaurant?"],
        branches: [
          { keywords: ["book", "table", "calling", "hello", "restaurant", "reservation"], next: "how-many" },
        ],
        fallbackNext: "repeat-help",
      },
      {
        id: "repeat-help",
        say: "Hello? Can I help you?",
        sayVi: "Alô? Tôi giúp gì được anh ạ?",
        hints: ["I'm calling to book a table."],
        branches: [
          { keywords: ["book", "table", "calling", "hello"], next: "how-many" },
        ],
        fallbackNext: "how-many",
      },
      {
        id: "how-many",
        say: "Certainly. For how many people, and what time?",
        sayVi: "Vâng ạ. Mấy người, và mấy giờ ạ?",
        hints: ["For two people, at eight o'clock.", "For two people, this Friday evening."],
        branches: [
          { keywords: ["two", "three", "four", "people", "eight", "seven", "clock", "friday"], next: "full" },
        ],
        fallbackNext: "repeat-how-many",
      },
      {
        id: "repeat-how-many",
        say: "Sorry, how many people?",
        sayVi: "Xin lỗi, mấy người ạ?",
        hints: ["For two people, at eight o'clock."],
        branches: [
          { keywords: ["two", "three", "four", "people", "eight", "clock"], next: "full" },
        ],
        fallbackNext: "full",
      },
      {
        id: "full",
        // Không được như ý là chuyện bình thường khi gọi điện. Người học cần
        // quen với việc phải xoay, chứ không phải chỉ quen với kịch bản trơn tru.
        say: "I'm afraid eight is full. We have seven thirty, or nine.",
        sayVi: "Tiếc quá, tám giờ hết bàn rồi ạ. Còn bảy rưỡi hoặc chín giờ.",
        hints: ["Sorry, the line is bad. Could you repeat the time?", "That's fine, thank you."],
        branches: [
          { keywords: ["line", "repeat", "hear", "again", "sorry"], next: "repeat-time" },
          { keywords: ["fine", "okay", "ok", "seven", "nine", "thirty", "yes"], next: "name" },
        ],
        fallbackNext: "repeat-time",
      },
      {
        id: "repeat-time",
        say: "Of course. Seven thirty, or nine o'clock.",
        sayVi: "Vâng ạ. Bảy giờ rưỡi, hoặc chín giờ.",
        hints: ["Seven thirty. That's fine, thank you.", "Do you have anything earlier?"],
        branches: [
          { keywords: ["seven", "thirty", "nine", "fine", "earlier", "okay", "ok"], next: "name" },
        ],
        fallbackNext: "name",
      },
      {
        id: "name",
        say: "And your name, please?",
        sayVi: "Cho tôi xin tên anh ạ?",
        hints: ["It's Hung. H-U-N-G.", "Let me spell it for you."],
        branches: [
          { keywords: ["hung", "name", "spell", "its"], next: "confirm" },
        ],
        fallbackNext: "confirm",
      },
      {
        id: "confirm",
        say: "Thank you. That's booked for you.",
        sayVi: "Cảm ơn anh. Đã đặt xong ạ.",
        // Chốt lại trước khi cúp máy là kỹ năng của tuần: gọi điện xong mà
        // không xác nhận thì hôm đó tới nơi mới biết là sai.
        hints: ["So that's eight o'clock, table for two?", "Thank you. Goodbye."],
        branches: [
          { keywords: ["so", "thats", "table", "clock", "sure", "thank", "goodbye", "bye"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
