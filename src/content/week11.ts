/**
 * Tuần 11 — Khách sạn (curriculum §7).
 *
 * Kỹ năng mới: câu lịch sự gián tiếp. Tiếng Việt nhờ vả bằng cách thêm chữ "ạ",
 * "giúp", "nhé"; tiếng Anh làm việc đó bằng cách đổi hẳn cấu trúc câu —
 * "Give me a towel" và "Could I have a towel?" khác nhau rất xa dù nghĩa như
 * nhau. Người học nói câu thẳng thì không sai ngữ pháp, chỉ là nghe như ra lệnh.
 *
 * Tuần này cũng là lần đầu phải báo sự cố: phòng hỏng, máy lạnh không chạy.
 * Mục tiêu là nói được vấn đề và yêu cầu được sửa, không phải để cãi thắng.
 */

import type { WeekContent } from "./types";

export const week11: WeekContent = {
  week: 11,
  titleVi: "Khách sạn: nhận phòng, báo sự cố, trả phòng",
  pronunciationFocusVi: "Câu nhờ vả: 'Could I...' nói mềm, xuống giọng cuối câu",

  vocabulary: [
    {
      id: "w11-i-have-a-reservation",
      week: 11,
      phrase: "I have a reservation.",
      meaningVi: "Tôi có đặt phòng trước.",
      situation: "Câu đầu tiên ở quầy lễ tân",
      isCoreChunk: true,
    },
    {
      id: "w11-under-the-name",
      week: 11,
      phrase: "Under the name Hung.",
      meaningVi: "Đặt dưới tên Hùng.",
      situation: "Nói tên người đặt",
      isCoreChunk: true,
    },
    {
      id: "w11-for-three-nights",
      week: 11,
      phrase: "For three nights.",
      meaningVi: "Ba đêm.",
      situation: "Nói số đêm ở",
      isCoreChunk: true,
    },
    {
      id: "w11-heres-my-passport",
      week: 11,
      phrase: "Here's my passport.",
      meaningVi: "Hộ chiếu của tôi đây.",
      situation: "Đưa giấy tờ khi nhận phòng",
      isCoreChunk: true,
    },
    {
      id: "w11-what-time-is-checkout",
      week: 11,
      phrase: "What time is check-out?",
      meaningVi: "Mấy giờ phải trả phòng?",
      situation: "Hỏi ngay lúc nhận phòng, đỡ phải hỏi sau",
      isCoreChunk: true,
    },
    {
      id: "w11-is-breakfast-included",
      week: 11,
      phrase: "Is breakfast included?",
      meaningVi: "Có bao gồm ăn sáng không?",
      situation: "Hỏi cho rõ, tránh bị tính thêm",
      isCoreChunk: true,
    },
    {
      id: "w11-could-i-have",
      week: 11,
      phrase: "Could I have an extra towel, please?",
      meaningVi: "Cho tôi xin thêm cái khăn được không?",
      situation: "CÂU NHỜ LỊCH SỰ — mẫu câu chính của tuần",
      isCoreChunk: true,
    },
    {
      id: "w11-would-it-be-possible",
      week: 11,
      phrase: "Would it be possible to change rooms?",
      meaningVi: "Đổi phòng có được không ạ?",
      situation: "CÂU NHỜ LỊCH SỰ — dùng khi yêu cầu hơi phiền",
      isCoreChunk: true,
    },
    {
      id: "w11-i-was-wondering",
      week: 11,
      phrase: "I was wondering if you could help me.",
      meaningVi: "Không biết bạn giúp tôi được không.",
      situation: "CÂU NHỜ LỊCH SỰ — mở đầu cho một việc khó nhờ",
      isCoreChunk: false,
    },
    {
      id: "w11-do-you-mind-if",
      week: 11,
      phrase: "Do you mind if I leave my bags here?",
      meaningVi: "Tôi gửi hành lý ở đây có phiền không?",
      situation: "Xin phép — hay dùng sau khi trả phòng",
      isCoreChunk: true,
    },
    {
      id: "w11-the-air-con-is-not-working",
      week: 11,
      phrase: "The air conditioning isn't working.",
      meaningVi: "Máy lạnh không chạy.",
      situation: "BÁO SỰ CỐ — nói cái gì hỏng, không cần giải thích dài",
      isCoreChunk: true,
    },
    {
      id: "w11-theres-no-hot-water",
      week: 11,
      phrase: "There's no hot water.",
      meaningVi: "Không có nước nóng.",
      situation: "BÁO SỰ CỐ",
      isCoreChunk: true,
    },
    {
      id: "w11-the-room-is-noisy",
      week: 11,
      phrase: "The room is very noisy.",
      meaningVi: "Phòng ồn quá.",
      situation: "BÁO SỰ CỐ — lý do chính đáng để xin đổi phòng",
      isCoreChunk: true,
    },
    {
      id: "w11-the-wifi-doesnt-work",
      week: 11,
      phrase: "The wifi doesn't work in my room.",
      meaningVi: "Wifi trong phòng tôi không dùng được.",
      situation: "BÁO SỰ CỐ",
      isCoreChunk: false,
    },
    {
      id: "w11-could-someone-look-at-it",
      week: 11,
      phrase: "Could someone come and look at it?",
      meaningVi: "Nhờ người lên xem giúp tôi được không?",
      situation: "Yêu cầu sửa — nói xong vấn đề thì nói luôn mình muốn gì",
      isCoreChunk: true,
    },
    {
      id: "w11-when-can-you-fix-it",
      week: 11,
      phrase: "When can you fix it?",
      meaningVi: "Khi nào sửa được ạ?",
      situation: "Hỏi thời gian — hỏi thẳng nhưng vẫn bình thản",
      isCoreChunk: true,
    },
    {
      id: "w11-a-quieter-room",
      week: 11,
      phrase: "Could I have a quieter room?",
      meaningVi: "Cho tôi phòng yên tĩnh hơn được không?",
      situation: "Xin đổi phòng, nói rõ mình cần gì",
      isCoreChunk: true,
    },
    {
      id: "w11-on-a-higher-floor",
      week: 11,
      phrase: "On a higher floor, if possible.",
      meaningVi: "Nếu được thì cho tầng cao hơn.",
      situation: "Thêm yêu cầu nhẹ — 'if possible' làm câu mềm hẳn",
      isCoreChunk: false,
    },
    {
      id: "w11-could-you-call-me-a-taxi",
      week: 11,
      phrase: "Could you call me a taxi, please?",
      meaningVi: "Nhờ bạn gọi taxi giúp tôi.",
      situation: "Nhờ lễ tân",
      isCoreChunk: true,
    },
    {
      id: "w11-what-time-is-breakfast",
      week: 11,
      phrase: "What time is breakfast?",
      meaningVi: "Mấy giờ có ăn sáng?",
      situation: "Hỏi giờ ăn sáng",
      isCoreChunk: false,
    },
    {
      id: "w11-id-like-to-check-out",
      week: 11,
      phrase: "I'd like to check out, please.",
      meaningVi: "Tôi muốn trả phòng.",
      situation: "Trả phòng",
      isCoreChunk: true,
    },
    {
      id: "w11-could-i-have-the-bill",
      week: 11,
      phrase: "Could I have the bill, please?",
      meaningVi: "Cho tôi xin hoá đơn.",
      situation: "Lúc trả phòng",
      isCoreChunk: true,
    },
    {
      id: "w11-whats-this-charge-for",
      week: 11,
      phrase: "Sorry, what's this charge for?",
      meaningVi: "Xin lỗi, khoản này là tiền gì ạ?",
      situation: "Hoá đơn có khoản lạ — hỏi cho rõ, đừng trả cho xong",
      isCoreChunk: true,
    },
    {
      id: "w11-we-had-a-lovely-stay",
      week: 11,
      phrase: "We had a lovely stay, thank you.",
      meaningVi: "Chúng tôi ở rất thoải mái, cảm ơn.",
      situation: "Câu nói lúc rời khách sạn",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w11-listen-hotel",
    week: 11,
    titleVi: "Nhận phòng rồi phát hiện máy lạnh hỏng",
    lines: [
      { speaker: "Anna", text: "Good evening. Do you have a reservation?" },
      { speaker: "Hung", text: "Yes, under the name Hung. For three nights." },
      { speaker: "Anna", text: "Found it. Room four-one-two. Check-out is at eleven." },
      { speaker: "Hung", text: "Thank you. Is breakfast included?" },
      { speaker: "Anna", text: "Yes, from six thirty to ten in the restaurant." },
      { speaker: "Hung", text: "Sorry to bother you — the air conditioning isn't working." },
      { speaker: "Anna", text: "Oh! Could I move you to a quieter room on the fifth floor?" },
    ],
    gist: {
      promptVi: "Chuyện gì xảy ra ở khách sạn?",
      options: [
        "Nhận phòng xong thì báo máy lạnh hỏng",
        "Trả phòng và thanh toán",
        "Đặt phòng qua điện thoại",
      ],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ông Hùng ở mấy đêm?",
        options: ["3 đêm", "1 đêm", "5 đêm"],
        answerIndex: 0,
      },
      {
        promptVi: "Mấy giờ phải trả phòng?",
        options: ["11 giờ", "10 giờ", "6 giờ rưỡi"],
        answerIndex: 0,
      },
      {
        promptVi: "Lễ tân đề nghị gì?",
        options: ["Đổi sang phòng khác", "Gọi thợ ngay trong đêm", "Giảm tiền phòng"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Yes, under the", answer: "name", after: "Hung. For three nights." },
      { before: "Room four-one-two. Check-out is at", answer: "eleven", after: "." },
      { before: "The air", answer: "conditioning", after: "isn't working." },
    ],
  },

  shadowing: [
    {
      id: "w11-sh-1",
      text: "Could I have an extra towel, please?",
      focusVi: "Nói mềm, xuống giọng ở 'please' — đây là câu nhờ, không phải câu sai bảo",
    },
    {
      id: "w11-sh-2",
      text: "Would it be possible to change rooms?",
      focusVi: "Câu dài — ngắt nhẹ sau 'possible'",
    },
    {
      id: "w11-sh-3",
      text: "The air conditioning isn't working.",
      focusVi: "Bật rõ 'n't' — nuốt mất là thành 'máy lạnh đang chạy'",
    },
    {
      id: "w11-sh-4",
      text: "Do you mind if I leave my bags here?",
      focusVi: "Nối 'mind if' thành một hơi",
    },
    {
      id: "w11-sh-5",
      text: "Sorry, what's this charge for?",
      focusVi: "Bật rõ 'ch' trong 'charge', xuống giọng cuối câu",
    },
  ],

  roleplay: {
    id: "w11-rp-hotel",
    week: 11,
    titleVi: "Khách sạn: nhận phòng và báo hỏng",
    goalVi: "Nhận phòng, nhờ vả bằng câu lịch sự, và xin đổi phòng khi có sự cố",
    startTurnId: "start",
    turns: [
      {
        id: "start",
        say: "Good evening! Do you have a reservation with us?",
        sayVi: "Chào buổi tối! Anh có đặt phòng trước không ạ?",
        hints: ["Yes, I have a reservation. Under the name Hung.", "Yes, for three nights."],
        branches: [
          { keywords: ["yes", "reservation", "name", "hung", "nights", "booked"], next: "details" },
        ],
        fallbackNext: "repeat-reservation",
      },
      {
        id: "repeat-reservation",
        say: "Sorry — is the room booked in your name?",
        sayVi: "Xin lỗi — phòng đặt dưới tên anh phải không ạ?",
        hints: ["Yes, under the name Hung.", "Yes, I have a reservation."],
        branches: [
          { keywords: ["yes", "name", "hung", "reservation", "booked"], next: "details" },
        ],
        fallbackNext: "details",
      },
      {
        id: "details",
        say: "Here you are — room four-one-two. Check-out is at eleven.",
        sayVi: "Của anh đây — phòng 412. Trả phòng lúc mười một giờ ạ.",
        hints: ["Is breakfast included?", "Could I have an extra towel, please?"],
        branches: [
          { keywords: ["breakfast", "included", "towel", "could", "what", "time"], next: "answer-extra" },
        ],
        fallbackNext: "answer-extra",
      },
      {
        id: "answer-extra",
        say: "Yes, breakfast is included, from six thirty to ten.",
        sayVi: "Vâng, có ăn sáng, từ sáu rưỡi tới mười giờ ạ.",
        hints: ["Thank you.", "Thank you. Could you call me a taxi in the morning?"],
        branches: [
          { keywords: ["thanks", "thank", "taxi", "could", "okay", "ok"], next: "problem" },
        ],
        fallbackNext: "problem",
      },
      {
        id: "problem",
        // Sự cố xảy ra sau khi mọi thứ đã êm — giống đời thật. Người học phải
        // tự mở lời báo hỏng chứ không được hỏi dẫn dắt.
        say: "Is everything all right with the room?",
        sayVi: "Phòng ốc có ổn không ạ?",
        hints: ["The air conditioning isn't working.", "There's no hot water."],
        branches: [
          { keywords: ["air", "conditioning", "water", "noisy", "wifi", "working", "isnt", "no"], next: "offer-fix" },
          { keywords: ["yes", "fine", "good", "okay", "ok"], next: "closing" },
        ],
        fallbackNext: "offer-fix",
      },
      {
        id: "offer-fix",
        say: "I'm very sorry. Shall I send someone up?",
        sayVi: "Tôi xin lỗi ạ. Tôi cho người lên xem nhé?",
        hints: ["When can you fix it?", "Would it be possible to change rooms?"],
        branches: [
          { keywords: ["when", "fix", "change", "rooms", "quieter", "possible", "another"], next: "new-room" },
          { keywords: ["yes", "please", "okay", "ok"], next: "new-room" },
        ],
        fallbackNext: "new-room",
      },
      {
        id: "new-room",
        say: "Actually, I can move you to room five-one-eight. It's quieter.",
        sayVi: "Hay là tôi đổi anh sang phòng 518. Phòng đó yên tĩnh hơn ạ.",
        hints: ["That's fine, thank you.", "On a higher floor, if possible."],
        branches: [
          { keywords: ["fine", "thanks", "thank", "higher", "floor", "okay", "ok", "yes"], next: "closing" },
        ],
        fallbackNext: "closing",
      },
      {
        id: "closing",
        say: "Here is your new key. Have a good stay!",
        sayVi: "Chìa khoá mới của anh đây. Chúc anh ở vui vẻ!",
        hints: ["Thank you very much.", "Do you mind if I leave my bags here?"],
        branches: [
          { keywords: ["thanks", "thank", "bags", "mind", "leave", "bye"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
