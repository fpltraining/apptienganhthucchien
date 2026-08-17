/**
 * Tuần 16 — Gọi điện công việc (curriculum §7).
 *
 * Khó nhất giai đoạn 2, và khó vì lý do rất cụ thể: qua điện thoại tiếng bị
 * mỏng, mất hết phụ âm cuối, không nhìn được miệng người nói, mà lại không có
 * quyền bảo người ta nói lại ba lần. Tuần 10 đã đi qua cuộc gọi đơn giản; tuần
 * này là cuộc gọi có việc — để lại tin nhắn, hẹn lịch, và xử lý khi nghe hỏng.
 *
 * Vẫn không có gợi ý (`hintLevel: "none"`).
 *
 * Điều tuần này dạy mà các tuần khác không dạy: xin đánh vần và đọc lại là việc
 * bình thường của người đi làm, không phải dấu hiệu kém tiếng Anh. Người bản xứ
 * gọi cho nhau cũng làm y hệt.
 */

import type { WeekContent } from "./types";

export const week16: WeekContent = {
  week: 16,
  titleVi: "Gọi điện công việc",
  pronunciationFocusVi: "Qua điện thoại: nói chậm hơn 20%, bật thật rõ phụ âm cuối",

  vocabulary: [
    {
      id: "w16-hello-this-is",
      week: 16,
      phrase: "Hello, this is Hung speaking.",
      meaningVi: "Alô, tôi là Hùng đây.",
      situation: "Tự xưng khi nhấc máy — nói 'this is', không nói 'I am'",
      isCoreChunk: true,
    },
    {
      id: "w16-am-i-speaking-to",
      week: 16,
      phrase: "Am I speaking to Mr Brown?",
      meaningVi: "Tôi đang nói chuyện với ông Brown phải không ạ?",
      situation: "Xác nhận gọi đúng người",
      isCoreChunk: true,
    },
    {
      id: "w16-could-i-speak-to",
      week: 16,
      phrase: "Could I speak to Mr Brown, please?",
      meaningVi: "Cho tôi gặp ông Brown được không ạ?",
      situation: "Xin gặp người cần gặp",
      isCoreChunk: true,
    },
    {
      id: "w16-im-calling-about",
      week: 16,
      phrase: "I'm calling about the meeting.",
      meaningVi: "Tôi gọi về chuyện cuộc họp.",
      situation: "Nói lý do gọi ngay câu thứ hai",
      isCoreChunk: true,
    },
    {
      id: "w16-is-now-a-good-time",
      week: 16,
      phrase: "Is now a good time?",
      meaningVi: "Giờ bạn nói chuyện tiện không?",
      situation: "Hỏi trước khi vào việc — lịch sự và rất hay dùng",
      isCoreChunk: true,
    },
    {
      id: "w16-hold-on-a-moment",
      week: 16,
      phrase: "Hold on a moment, please.",
      meaningVi: "Bạn giữ máy một chút nhé.",
      situation: "Xin người ta chờ",
      isCoreChunk: true,
    },
    {
      id: "w16-hes-not-here",
      week: 16,
      phrase: "Sorry, he's not here at the moment.",
      meaningVi: "Xin lỗi, hiện anh ấy không có ở đây.",
      situation: "Trả lời hộ người khác",
      isCoreChunk: true,
    },
    {
      id: "w16-can-i-take-a-message",
      week: 16,
      phrase: "Can I take a message?",
      meaningVi: "Bạn có nhắn gì không ạ?",
      situation: "Nghe máy hộ",
      isCoreChunk: true,
    },
    {
      id: "w16-could-i-leave-a-message",
      week: 16,
      phrase: "Could I leave a message?",
      meaningVi: "Tôi để lại lời nhắn được không ạ?",
      situation: "Người cần gặp không có mặt",
      isCoreChunk: true,
    },
    {
      id: "w16-could-you-ask-him-to-call-me",
      week: 16,
      phrase: "Could you ask him to call me back?",
      meaningVi: "Nhờ bạn nhắn anh ấy gọi lại cho tôi.",
      situation: "Nội dung lời nhắn — nói rõ mình muốn gì",
      isCoreChunk: true,
    },
    {
      id: "w16-my-number-is-w16",
      week: 16,
      phrase: "My number is oh nine one, five five two.",
      meaningVi: "Số của tôi là 091 552.",
      situation: "Để lại số — đọc chậm, rồi đọc lại lần nữa",
      isCoreChunk: true,
    },
    {
      id: "w16-let-me-repeat-that",
      week: 16,
      phrase: "Let me repeat that.",
      meaningVi: "Để tôi nhắc lại.",
      situation: "Chủ động đọc lại số của mình lần hai",
      isCoreChunk: true,
    },
    {
      id: "w16-could-you-spell-your-name",
      week: 16,
      phrase: "Could you spell your name, please?",
      meaningVi: "Bạn đánh vần tên giúp tôi ạ?",
      situation: "Ghi lời nhắn — hỏi là chuyện bình thường",
      isCoreChunk: true,
    },
    {
      id: "w16-sorry-i-missed-that",
      week: 16,
      phrase: "Sorry, I missed that. Could you say it again?",
      meaningVi: "Xin lỗi, tôi nghe sót. Bạn nói lại được không?",
      situation: "CỨU HỘ — nói ngay, đừng để trôi mấy câu rồi mới hỏi",
      isCoreChunk: true,
    },
    {
      id: "w16-youre-breaking-up",
      week: 16,
      phrase: "Sorry, you're breaking up.",
      meaningVi: "Xin lỗi, tiếng bạn bị ngắt quãng.",
      situation: "CỨU HỘ — sóng kém, không phải tai mình kém",
      isCoreChunk: true,
    },
    {
      id: "w16-could-you-speak-up",
      week: 16,
      phrase: "Could you speak up a little?",
      meaningVi: "Bạn nói to hơn chút được không?",
      situation: "CỨU HỘ — nghe nhỏ quá",
      isCoreChunk: true,
    },
    {
      id: "w16-can-i-call-you-back",
      week: 16,
      phrase: "Can I call you back in five minutes?",
      meaningVi: "Năm phút nữa tôi gọi lại được không?",
      situation: "CỨU HỘ — chỗ ồn quá thì xin gọi lại, đừng cố nghe",
      isCoreChunk: true,
    },
    {
      id: "w16-are-you-free-on",
      week: 16,
      phrase: "Are you free on Thursday morning?",
      meaningVi: "Sáng thứ Năm bạn rảnh không?",
      situation: "HẸN LỊCH — đề nghị một mốc cụ thể",
      isCoreChunk: true,
    },
    {
      id: "w16-does-ten-oclock-suit-you",
      week: 16,
      phrase: "Does ten o'clock suit you?",
      meaningVi: "Mười giờ có tiện cho bạn không?",
      situation: "HẸN LỊCH",
      isCoreChunk: true,
    },
    {
      id: "w16-im-afraid-i-cant",
      week: 16,
      phrase: "I'm afraid I can't make Thursday.",
      meaningVi: "Tiếc là thứ Năm tôi không tới được.",
      situation: "HẸN LỊCH — từ chối một mốc giờ",
      isCoreChunk: true,
    },
    {
      id: "w16-how-about-friday",
      week: 16,
      phrase: "How about Friday instead?",
      meaningVi: "Hay là thứ Sáu vậy?",
      situation: "HẸN LỊCH — từ chối thì đề nghị luôn phương án khác",
      isCoreChunk: true,
    },
    {
      id: "w16-so-thats-thursday",
      week: 16,
      phrase: "So that's Thursday at ten. Is that right?",
      meaningVi: "Vậy là thứ Năm lúc mười giờ. Đúng không ạ?",
      situation: "CHỐT — nhắc lại toàn bộ trước khi cúp máy",
      isCoreChunk: true,
    },
    {
      id: "w16-ill-send-you-an-email",
      week: 16,
      phrase: "I'll send you an email to confirm.",
      meaningVi: "Tôi sẽ gửi email xác nhận lại.",
      situation: "Chốt bằng văn bản — an toàn nhất khi nghe chưa chắc",
      isCoreChunk: true,
    },
    {
      id: "w16-thanks-for-your-time",
      week: 16,
      phrase: "Thanks for your time. Goodbye.",
      meaningVi: "Cảm ơn bạn đã dành thời gian. Tạm biệt.",
      situation: "Câu cúp máy chuẩn",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w16-listen-workcall",
    week: 16,
    titleVi: "Gọi điện hẹn lịch, sóng chập chờn",
    lines: [
      { speaker: "Anna", text: "Good morning, Brown and Company." },
      { speaker: "Hung", text: "Hello, this is Hung speaking. Could I speak to Mr Brown?" },
      { speaker: "Anna", text: "Sorry, he's not here at the moment. Can I take a message?" },
      { speaker: "Hung", text: "Yes. Could you ask him to call me back?" },
      { speaker: "Anna", text: "Of course. And your number... sorry, you're breaking up." },
      { speaker: "Hung", text: "Let me repeat that. Oh nine one, five five two." },
      { speaker: "Anna", text: "Oh nine one, five five two. Is that right? Thanks for your time." },
    ],
    gist: {
      promptVi: "Ông Hùng gọi điện để làm gì?",
      options: [
        "Xin gặp ông Brown, để lại lời nhắn",
        "Đặt bàn ăn tối",
        "Khiếu nại một hoá đơn",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Brown có ở đó không?",
        options: ["Không có mặt lúc đó", "Đang bận họp", "Đã nghỉ việc"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng nhắn gì?",
        options: ["Nhờ gọi lại", "Nhờ gửi email", "Nhờ đổi lịch họp"],
        answerIndex: 0,
      },
      {
        promptVi: "Vì sao ông Hùng phải đọc lại số?",
        options: ["Sóng bị ngắt quãng", "Đọc nhầm số", "Đổi số mới"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Hello, this is Hung", answer: "speaking", after: ". Could I speak to Mr Brown?" },
      { before: "Sorry, he's not here at the", answer: "moment", after: ". Can I take a message?" },
      { before: "Let me", answer: "repeat", after: "that. Oh nine one, five five two." },
    ],
  },

  shadowing: [
    {
      id: "w16-sh-1",
      text: "Hello, this is Hung speaking.",
      focusVi: "Bật rõ 'ng' cuối trong 'speaking' — qua điện thoại dễ mất nhất",
    },
    {
      id: "w16-sh-2",
      text: "Could I speak to Mr Brown, please?",
      focusVi: "Nói chậm hơn bình thường một chút",
    },
    {
      id: "w16-sh-3",
      text: "Sorry, you're breaking up. Could you speak up?",
      focusVi: "Hai câu cứu hộ liền nhau — nói dứt khoát, không ngại",
    },
    {
      id: "w16-sh-4",
      text: "Oh nine one, five five two.",
      focusVi: "Ngắt sau nhóm ba số, rồi đọc lại lần nữa",
    },
    {
      id: "w16-sh-5",
      text: "So that's Thursday at ten. Is that right?",
      focusVi: "Lên giọng ở 'right' — đây là câu chốt, phải nghe ra là hỏi",
    },
  ],

  roleplay: {
    id: "w16-rp-workcall",
    week: 16,
    titleVi: "Gọi điện để hẹn lịch",
    goalVi: "Tự xưng, nói được việc, xử lý khi nghe không rõ, và chốt lại lịch hẹn",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "bad-line",
    turns: [
      {
        id: "start",
        say: "Good morning, Brown and Company. How can I help?",
        sayVi: "Chào buổi sáng, công ty Brown xin nghe. Tôi giúp gì được ạ?",
        hints: [
          "Hello, this is Hung speaking. Could I speak to Mr Brown?",
          "Hello, this is Hung. I'm calling about the meeting.",
        ],
        branches: [
          { keywords: ["hello", "this", "hung", "speaking", "speak", "calling", "brown"], next: "not-here" },
        ],
        fallbackNext: "repeat-who",
      },
      {
        id: "repeat-who",
        say: "Sorry, who's calling please?",
        sayVi: "Xin lỗi, ai đang gọi ạ?",
        hints: ["This is Hung speaking.", "Hello, this is Hung. Could I speak to Mr Brown?"],
        branches: [
          { keywords: ["hung", "this", "speaking", "calling", "brown", "speak"], next: "not-here" },
        ],
        fallbackNext: "not-here",
      },
      {
        id: "not-here",
        say: "I'm afraid Mr Brown isn't here at the moment. Can I take a message?",
        sayVi: "Tiếc là ông Brown không có ở đây lúc này. Anh có nhắn gì không ạ?",
        hints: [
          "Yes. Could you ask him to call me back?",
          "Could I leave a message? I'm calling about the meeting.",
        ],
        branches: [
          { keywords: ["yes", "message", "call", "back", "leave", "ask", "meeting"], next: "number" },
        ],
        fallbackNext: "number",
      },
      {
        id: "number",
        say: "Certainly. What's your number?",
        sayVi: "Vâng ạ. Cho tôi xin số của anh?",
        hints: ["My number is oh nine one, five five two.", "Oh nine one, five five two. Let me repeat that."],
        branches: [
          { keywords: ["number", "nine", "five", "one", "two", "repeat", "oh"], next: "when" },
        ],
        fallbackNext: "when",
      },
      {
        id: "bad-line",
        // Lệch kịch bản: sóng hỏng giữa chừng. Người học phải dùng câu cứu hộ
        // của tuần chứ không được im lặng chờ nó tự hết.
        say: "Sorry — I've lost you for a second. Hello? ...Could you say that again?",
        sayVi: "Xin lỗi — tôi mất tiếng anh mất một lúc. Alô? ...Anh nói lại được không ạ?",
        hints: [
          "Sorry, you're breaking up. Let me repeat that.",
          "Can I call you back in five minutes?",
        ],
        branches: [
          { keywords: ["breaking", "repeat", "again", "back", "call", "sorry", "hear", "speak"], next: "when" },
        ],
        fallbackNext: "when",
      },
      {
        id: "when",
        say: "Got it. And when would suit you for the meeting?",
        sayVi: "Tôi ghi rồi ạ. Anh muốn họp vào lúc nào thì tiện?",
        hints: ["Are you free on Thursday morning?", "Does ten o'clock suit you?"],
        branches: [
          { keywords: ["thursday", "friday", "monday", "morning", "clock", "free", "suit", "ten"], next: "clash" },
        ],
        fallbackNext: "clash",
      },
      {
        id: "clash",
        say: "Thursday morning is full, I'm afraid. Friday at two?",
        sayVi: "Tiếc là sáng thứ Năm kín rồi ạ. Thứ Sáu lúc hai giờ được không?",
        hints: ["Friday at two is fine.", "I'm afraid I can't make Friday. How about Monday?"],
        branches: [
          { keywords: ["friday", "fine", "monday", "cant", "afraid", "about", "okay", "ok", "two"], next: "confirm" },
        ],
        fallbackNext: "confirm",
      },
      {
        id: "confirm",
        say: "Friday at two, then. I'll tell Mr Brown.",
        sayVi: "Vậy thứ Sáu lúc hai giờ nhé. Tôi sẽ báo ông Brown.",
        // Chốt lại là bước cuối bắt buộc: gọi điện xong mà không xác nhận thì
        // hôm đó tới nơi mới biết mình nhớ nhầm.
        hints: ["So that's Friday at two. Is that right?", "I'll send you an email to confirm."],
        branches: [
          { keywords: ["so", "friday", "two", "right", "email", "confirm", "correct"], next: "goodbye" },
        ],
        fallbackNext: "goodbye",
      },
      {
        id: "goodbye",
        say: "That's right. Thanks for calling.",
        sayVi: "Đúng rồi ạ. Cảm ơn anh đã gọi.",
        hints: ["Thanks for your time. Goodbye.", "Thank you. Goodbye."],
        branches: [
          { keywords: ["thanks", "thank", "time", "goodbye", "bye"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
