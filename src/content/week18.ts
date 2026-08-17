/**
 * Tuần 18 — Họp online, phần cơ bản (curriculum §7, giai đoạn 3).
 *
 * Mở màn giai đoạn 3, và cái mới là **chế độ đồng hồ**: từ tuần này người học
 * chỉ có một khoảng thời gian nhất định để bật ra câu trả lời. Tuần 18 để 8
 * giây — bằng đúng mức mặc định — rồi siết dần tới 3 giây ở tuần 23.
 *
 * Đồng hồ là áp lực, không phải điểm số. Hết giờ thì tính là một lượt chưa nói
 * được, buổi học vẫn chạy tiếp. Quy tắc "không có gì được chặn buổi học" của
 * §9.3 không mất hiệu lực chỉ vì sang giai đoạn 3.
 *
 * Vì sao là họp online chứ không phải họp trực tiếp: họp online mới là thứ
 * người Việt đi làm gặp hằng ngày, và nó khó hơn — tiếng vọng, trễ mạng, không
 * nhìn rõ mặt ai, và không chen vào được nếu không biết câu để chen.
 */

import type { WeekContent } from "./types";

export const week18: WeekContent = {
  week: 18,
  titleVi: "Họp online — phần cơ bản",
  pronunciationFocusVi: "Nói dứt khoát ngay câu đầu — họp online không chờ ai lấy đà",
  // Chế độ đồng hồ bắt đầu ở mức mặc định, rồi siết dần các tuần sau.
  responseDeadlineMs: 8000,

  vocabulary: [
    {
      id: "w18-can-you-hear-me",
      week: 18,
      phrase: "Can you hear me?",
      meaningVi: "Mọi người nghe tôi rõ không?",
      situation: "Câu đầu tiên của mọi cuộc họp online trên đời",
      isCoreChunk: true,
    },
    {
      id: "w18-you-are-on-mute",
      week: 18,
      phrase: "You're on mute.",
      meaningVi: "Bạn đang tắt tiếng kìa.",
      situation: "Nói giúp người khác — câu ngắn mà ai cũng cần",
      isCoreChunk: true,
    },
    {
      id: "w18-sorry-i-was-on-mute",
      week: 18,
      phrase: "Sorry, I was on mute.",
      meaningVi: "Xin lỗi, nãy tôi quên bật tiếng.",
      situation: "Khi chính mình bị",
      isCoreChunk: true,
    },
    {
      id: "w18-my-connection-is-unstable",
      week: 18,
      phrase: "My connection is a bit unstable.",
      meaningVi: "Mạng của tôi hơi chập chờn.",
      situation: "Báo trước để người ta thông cảm",
      isCoreChunk: true,
    },
    {
      id: "w18-could-you-repeat-the-last-part",
      week: 18,
      phrase: "Could you repeat the last part?",
      meaningVi: "Bạn nhắc lại đoạn cuối được không?",
      situation: "CỨU HỘ — hỏi đúng đoạn mình sót, không bắt nói lại cả bài",
      isCoreChunk: true,
    },
    {
      id: "w18-i-missed-that-last-bit",
      week: 18,
      phrase: "Sorry, I missed that last bit.",
      meaningVi: "Xin lỗi, tôi nghe sót đoạn vừa rồi.",
      situation: "CỨU HỘ — nói ngay, đừng để trôi qua ba câu",
      isCoreChunk: true,
    },
    {
      id: "w18-could-you-put-that-in-the-chat",
      week: 18,
      phrase: "Could you put that in the chat?",
      meaningVi: "Bạn gõ cái đó vào khung chat giúp tôi nhé?",
      situation: "CỨU HỘ — mẹo hay nhất của họp online: nghe không ra thì xin chữ",
      isCoreChunk: true,
    },
    {
      id: "w18-can-i-just-jump-in",
      week: 18,
      phrase: "Can I just jump in here?",
      meaningVi: "Cho tôi nói xen một câu được không?",
      situation: "XIN NÓI — câu chen vào lịch sự nhất",
      isCoreChunk: true,
    },
    {
      id: "w18-can-i-add-something",
      week: 18,
      phrase: "Can I add something?",
      meaningVi: "Tôi bổ sung một ý được không?",
      situation: "XIN NÓI",
      isCoreChunk: true,
    },
    {
      id: "w18-sorry-go-ahead",
      week: 18,
      phrase: "Sorry, go ahead.",
      meaningVi: "Xin lỗi, bạn nói trước đi.",
      situation: "Khi hai người nói cùng lúc — câu gỡ rối chuẩn",
      isCoreChunk: true,
    },
    {
      id: "w18-after-you",
      week: 18,
      phrase: "No, after you.",
      meaningVi: "Không, bạn cứ nói trước.",
      situation: "Nhường lượt",
      isCoreChunk: false,
    },
    {
      id: "w18-hi-everyone-im",
      week: 18,
      phrase: "Hi everyone, I'm Hung from the Hanoi office.",
      meaningVi: "Chào cả nhà, tôi là Hùng ở văn phòng Hà Nội.",
      situation: "Giới thiệu mình khi vào họp",
      isCoreChunk: true,
    },
    {
      id: "w18-im-joining-for-the-first-time",
      week: 18,
      phrase: "I'm joining for the first time.",
      meaningVi: "Đây là lần đầu tôi tham gia.",
      situation: "Nói ra để người ta nói chậm lại cho mình",
      isCoreChunk: false,
    },
    {
      id: "w18-thanks-for-having-me",
      week: 18,
      phrase: "Thanks for having me.",
      meaningVi: "Cảm ơn đã cho tôi tham gia.",
      situation: "Câu lịch sự khi được mời vào họp",
      isCoreChunk: false,
    },
    {
      id: "w18-on-my-side-things-are-on-track",
      week: 18,
      phrase: "On my side, things are on track.",
      meaningVi: "Về phía tôi thì mọi thứ vẫn đúng tiến độ.",
      situation: "BÁO CÁO — mở đầu chuẩn, ngắn và rõ",
      isCoreChunk: true,
    },
    {
      id: "w18-weve-finished",
      week: 18,
      phrase: "We've finished the first part.",
      meaningVi: "Chúng tôi làm xong phần một rồi.",
      situation: "BÁO CÁO — việc đã xong",
      isCoreChunk: true,
    },
    {
      id: "w18-were-still-working-on",
      week: 18,
      phrase: "We're still working on the second part.",
      meaningVi: "Phần hai chúng tôi vẫn đang làm.",
      situation: "BÁO CÁO — việc đang làm",
      isCoreChunk: true,
    },
    {
      id: "w18-were-a-bit-behind",
      week: 18,
      phrase: "We're a bit behind, but it's under control.",
      meaningVi: "Chúng tôi hơi chậm một chút, nhưng vẫn kiểm soát được.",
      situation: "BÁO CÁO — nói thật mà không hoảng",
      isCoreChunk: true,
    },
    {
      id: "w18-well-be-done-by-friday",
      week: 18,
      phrase: "We'll be done by Friday.",
      meaningVi: "Thứ Sáu chúng tôi xong.",
      situation: "BÁO CÁO — cam kết mốc thời gian",
      isCoreChunk: true,
    },
    {
      id: "w18-i-need-one-more-day",
      week: 18,
      phrase: "I need one more day.",
      meaningVi: "Tôi cần thêm một ngày.",
      situation: "Xin gia hạn — nói thẳng, ngắn gọn",
      isCoreChunk: true,
    },
    {
      id: "w18-thats-all-from-me",
      week: 18,
      phrase: "That's all from me.",
      meaningVi: "Phần tôi hết rồi ạ.",
      situation: "BÁO CÁO — chốt lượt nói của mình, để người sau biết đường",
      isCoreChunk: true,
    },
    {
      id: "w18-back-to-you",
      week: 18,
      phrase: "Back to you.",
      meaningVi: "Xin trả lời lại cho bạn.",
      situation: "Trả lượt cho người chủ trì",
      isCoreChunk: true,
    },
    {
      id: "w18-ill-follow-up-by-email",
      week: 18,
      phrase: "I'll follow up by email.",
      meaningVi: "Tôi sẽ gửi email nói rõ thêm.",
      situation: "Nói không kịp thì hẹn viết ra — chiến thuật rất hợp lý",
      isCoreChunk: true,
    },
    {
      id: "w18-sorry-i-have-to-drop-off",
      week: 18,
      phrase: "Sorry, I have to drop off.",
      meaningVi: "Xin lỗi, tôi phải rời cuộc họp.",
      situation: "Rời họp giữa chừng",
      isCoreChunk: false,
    },
  ],

  listening: {
    id: "w18-listen-standup",
    week: 18,
    titleVi: "Họp báo cáo tiến độ, mạng chập chờn",
    lines: [
      { speaker: "Anna", text: "Morning everyone. Let's start. Hung, can you hear me?" },
      { speaker: "Hung", text: "Yes, I can hear you. Sorry, I was on mute." },
      { speaker: "Anna", text: "No problem. How are things on your side?" },
      { speaker: "Hung", text: "On my side, things are on track. We've finished the first part." },
      { speaker: "Anna", text: "Great. And the second... [tiếng ngắt] ...by Friday?" },
      { speaker: "Hung", text: "Sorry, I missed that last bit. Could you repeat the last part?" },
      { speaker: "Anna", text: "Will the second part be done by Friday?" },
    ],
    gist: {
      promptVi: "Cuộc họp này để làm gì?",
      options: ["Báo cáo tiến độ công việc", "Phỏng vấn xin việc", "Đào tạo nhân viên mới"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Ban đầu vì sao ông Hùng không nói được?",
        options: ["Quên bật tiếng", "Mất mạng hẳn", "Chưa vào họp"],
        answerIndex: 0,
      },
      {
        promptVi: "Phần một thế nào rồi?",
        options: ["Đã xong", "Đang làm dở", "Chưa bắt đầu"],
        answerIndex: 0,
      },
      {
        promptVi: "Ông Hùng làm gì khi nghe sót?",
        options: ["Xin nhắc lại đoạn cuối", "Im lặng cho qua", "Tắt máy"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "Yes, I can hear you. Sorry, I was on", answer: "mute", after: "." },
      { before: "On my side, things are on", answer: "track", after: "." },
      { before: "Sorry, I missed that last", answer: "bit", after: "." },
    ],
  },

  shadowing: [
    {
      id: "w18-sh-1",
      text: "Can you hear me? Sorry, I was on mute.",
      focusVi: "Nói ngay, không lấy đà — họp online không ai chờ",
    },
    {
      id: "w18-sh-2",
      text: "Can I just jump in here?",
      focusVi: "Nói nhanh và rõ, hơi to hơn bình thường để chen được vào",
    },
    {
      id: "w18-sh-3",
      text: "On my side, things are on track.",
      focusVi: "Nối 'on my' và 'on track' — cả câu một hơi",
    },
    {
      id: "w18-sh-4",
      text: "Could you repeat the last part?",
      focusVi: "Bật rõ 't' cuối trong 'part'",
    },
    {
      id: "w18-sh-5",
      text: "That's all from me. Back to you.",
      focusVi: "Hai câu ngắn, dứt khoát — đây là câu trả lượt",
    },
  ],

  roleplay: {
    id: "w18-rp-standup",
    week: 18,
    titleVi: "Họp báo cáo tiến độ",
    goalVi: "Giới thiệu mình, báo cáo ngắn gọn, xin nhắc lại khi nghe sót, và trả lượt",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "connection-drop",
    turns: [
      {
        id: "start",
        say: "Morning everyone. Hung, you've joined — can you hear me?",
        sayVi: "Chào cả nhà. Hùng vào rồi — anh nghe tôi rõ không?",
        hints: ["Yes, I can hear you.", "Sorry, I was on mute. Yes, I can hear you."],
        branches: [
          { keywords: ["yes", "hear", "mute", "sorry", "can", "loud"], next: "introduce" },
        ],
        fallbackNext: "check-again",
      },
      {
        id: "check-again",
        say: "Hung? I think you're on mute.",
        sayVi: "Hùng ơi? Hình như anh đang tắt tiếng.",
        hints: ["Sorry, I was on mute. Can you hear me now?", "Yes, I can hear you."],
        branches: [
          { keywords: ["sorry", "mute", "hear", "yes", "now"], next: "introduce" },
        ],
        fallbackNext: "introduce",
      },
      {
        id: "introduce",
        say: "Good. We have a new face today — would you introduce yourself?",
        sayVi: "Tốt rồi. Hôm nay có người mới — anh giới thiệu một chút nhé?",
        hints: [
          "Hi everyone, I'm Hung from the Hanoi office.",
          "Hi everyone, I'm Hung. Thanks for having me.",
        ],
        branches: [
          { keywords: ["hi", "hello", "hung", "office", "everyone", "thanks", "joining"], next: "report" },
        ],
        fallbackNext: "report",
      },
      {
        id: "report",
        say: "Welcome, Hung. So — how are things on your side?",
        sayVi: "Chào mừng Hùng. Nào — bên anh tình hình thế nào?",
        hints: [
          "On my side, things are on track. We've finished the first part.",
          "We're a bit behind, but it's under control.",
        ],
        branches: [
          { keywords: ["track", "finished", "behind", "working", "side", "part", "control"], next: "deadline" },
        ],
        fallbackNext: "report-again",
      },
      {
        id: "report-again",
        say: "Take your time. Where are you with the first part?",
        sayVi: "Anh cứ từ từ. Phần một tới đâu rồi?",
        hints: ["We've finished the first part.", "We're still working on it."],
        branches: [
          { keywords: ["finished", "working", "done", "still", "part", "track"], next: "deadline" },
        ],
        fallbackNext: "deadline",
      },
      {
        id: "connection-drop",
        // Lệch kịch bản: mạng rớt đúng lúc đang báo cáo. Phải xin nhắc lại chứ
        // không được đoán bừa rồi trả lời sai câu hỏi.
        say: "Sorry Hung, you cut out there — [tiếng ngắt] ...ready by Friday?",
        sayVi: "Xin lỗi Hùng, tiếng anh bị ngắt — [tiếng ngắt] ...xong trước thứ Sáu chứ?",
        hints: [
          "Sorry, I missed that last bit. Could you repeat the last part?",
          "Could you put that in the chat?",
        ],
        branches: [
          { keywords: ["missed", "repeat", "sorry", "chat", "again", "last", "connection"], next: "deadline" },
        ],
        fallbackNext: "deadline",
      },
      {
        id: "deadline",
        say: "And will the second part be ready by Friday?",
        sayVi: "Thế phần hai có kịp trước thứ Sáu không?",
        hints: ["We'll be done by Friday.", "I need one more day."],
        branches: [
          { keywords: ["friday", "done", "day", "need", "yes", "monday", "more"], next: "wrap" },
        ],
        fallbackNext: "wrap",
      },
      {
        id: "wrap",
        say: "Understood. Anything else before we move on?",
        sayVi: "Tôi hiểu rồi. Còn gì nữa không trước khi mình chuyển mục?",
        hints: ["That's all from me. Back to you.", "I'll follow up by email. That's all from me."],
        branches: [
          { keywords: ["all", "back", "email", "follow", "thats", "nothing", "me"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
