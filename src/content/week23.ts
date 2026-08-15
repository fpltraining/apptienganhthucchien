/**
 * Tuần 23 — Tình huống khẩn cấp (curriculum §7).
 *
 * Đồng hồ xuống 3 giây — mức chặt nhất cả khoá. Không phải để làm khó: gọi cấp
 * cứu thì người ta hỏi dồn, và ba giây là thời gian thật mình có để trả lời.
 *
 * Một điều em phải nói thẳng về "audio nhiễu" mà giáo trình yêu cầu ở tuần này:
 * app dùng giọng đọc có sẵn của máy, nên **không trộn được tiếng ồn thật** vào
 * bản ghi. Cái làm được là mô phỏng đúng cái khó của một cuộc gọi khẩn cấp —
 * câu bị ngắt giữa chừng, người ta hỏi lại dồn dập, và thông tin phải nhắc lại
 * hai lần. Nó không thay được tiếng ồn thật, và đây là chỗ đuối nhất của tuần
 * này; ghi ra đây để sau này có ai làm tiếp thì biết mà bù.
 *
 * Nguyên tắc của tuần, khác hẳn mọi tuần khác: **địa điểm nói trước tiên**.
 * Nếu cuộc gọi bị đứt mà tổng đài đã biết mình ở đâu thì xe vẫn tới được.
 */

import type { WeekContent } from "./types";

export const week23: WeekContent = {
  week: 23,
  titleVi: "Tình huống khẩn cấp",
  pronunciationFocusVi: "Nói to, chậm, từng chữ một — hoảng thì càng phải chậm",
  responseDeadlineMs: 3000,

  vocabulary: [
    {
      id: "w23-i-need-an-ambulance",
      week: 23,
      phrase: "I need an ambulance.",
      meaningVi: "Tôi cần xe cấp cứu.",
      situation: "Câu đầu tiên — nói ngay, đừng chào hỏi",
      isCoreChunk: true,
    },
    {
      id: "w23-theres-been-an-accident",
      week: 23,
      phrase: "There's been an accident.",
      meaningVi: "Có tai nạn.",
      situation: "Câu mở đầu khi báo tai nạn",
      isCoreChunk: true,
    },
    {
      id: "w23-im-at",
      week: 23,
      phrase: "I'm at twelve Green Street.",
      meaningVi: "Tôi đang ở số 12 đường Green.",
      situation: "ĐỊA ĐIỂM TRƯỚC TIÊN — nói địa chỉ ngay câu thứ hai",
      isCoreChunk: true,
    },
    {
      id: "w23-near-the-big-market",
      week: 23,
      phrase: "Near the big market, opposite the bank.",
      meaningVi: "Gần chợ lớn, đối diện ngân hàng.",
      situation: "ĐỊA ĐIỂM — không biết tên đường thì tả mốc",
      isCoreChunk: true,
    },
    {
      id: "w23-let-me-repeat-the-address",
      week: 23,
      phrase: "Let me repeat the address.",
      meaningVi: "Để tôi nhắc lại địa chỉ.",
      situation: "ĐỊA ĐIỂM — chủ động nhắc lại, đừng chờ được hỏi",
      isCoreChunk: true,
    },
    {
      id: "w23-someone-is-hurt",
      week: 23,
      phrase: "Someone is hurt.",
      meaningVi: "Có người bị thương.",
      situation: "Nói tình trạng",
      isCoreChunk: true,
    },
    {
      id: "w23-hes-bleeding",
      week: 23,
      phrase: "He's bleeding.",
      meaningVi: "Anh ấy đang chảy máu.",
      situation: "Nói triệu chứng nặng — ngắn, rõ",
      isCoreChunk: true,
    },
    {
      id: "w23-shes-not-breathing",
      week: 23,
      phrase: "She's not breathing.",
      meaningVi: "Cô ấy không thở.",
      situation: "Nói triệu chứng nguy kịch — phải bật ra được trong một giây",
      isCoreChunk: true,
    },
    {
      id: "w23-hes-conscious",
      week: 23,
      phrase: "He's conscious but confused.",
      meaningVi: "Anh ấy còn tỉnh nhưng lơ mơ.",
      situation: "Nói tình trạng chi tiết hơn",
      isCoreChunk: false,
    },
    {
      id: "w23-it-happened-five-minutes-ago",
      week: 23,
      phrase: "It happened five minutes ago.",
      meaningVi: "Chuyện vừa xảy ra cách đây năm phút.",
      situation: "Tổng đài luôn hỏi câu này",
      isCoreChunk: true,
    },
    {
      id: "w23-two-people-are-hurt",
      week: 23,
      phrase: "Two people are hurt.",
      meaningVi: "Có hai người bị thương.",
      situation: "Số người — tổng đài cần biết để điều mấy xe",
      isCoreChunk: true,
    },
    {
      id: "w23-please-hurry",
      week: 23,
      phrase: "Please hurry.",
      meaningVi: "Làm ơn nhanh lên.",
      situation: "Hai chữ — dùng khi đã nói xong thông tin",
      isCoreChunk: true,
    },
    {
      id: "w23-im-staying-with-him",
      week: 23,
      phrase: "I'm staying with him.",
      meaningVi: "Tôi vẫn ở đây với anh ấy.",
      situation: "Trấn an tổng đài — họ cần biết nạn nhân không bị bỏ một mình",
      isCoreChunk: false,
    },
    {
      id: "w23-what-should-i-do-until",
      week: 23,
      phrase: "What should I do until they arrive?",
      meaningVi: "Tôi phải làm gì tới khi xe tới ạ?",
      situation: "Hỏi hướng dẫn — tổng đài sẽ chỉ mình làm",
      isCoreChunk: true,
    },
    {
      id: "w23-my-english-is-not-good-please-slowly",
      week: 23,
      phrase: "My English is not good. Please speak slowly.",
      meaningVi: "Tiếng Anh tôi không tốt. Bạn nói chậm giúp tôi.",
      situation: "CỨU HỘ — nói ngay từ đầu cuộc gọi, tổng đài sẽ đổi cách nói",
      isCoreChunk: true,
    },
    {
      id: "w23-ive-lost-my-passport",
      week: 23,
      phrase: "I've lost my passport.",
      meaningVi: "Tôi mất hộ chiếu.",
      situation: "Trình báo mất giấy tờ",
      isCoreChunk: true,
    },
    {
      id: "w23-my-wallet-was-stolen",
      week: 23,
      phrase: "My wallet was stolen.",
      meaningVi: "Ví của tôi bị lấy mất.",
      situation: "Trình báo mất cắp",
      isCoreChunk: true,
    },
    {
      id: "w23-it-happened-at-the-station",
      week: 23,
      phrase: "It happened at the station, about an hour ago.",
      meaningVi: "Chuyện xảy ra ở nhà ga, khoảng một tiếng trước.",
      situation: "Trình báo — nói nơi và thời gian",
      isCoreChunk: true,
    },
    {
      id: "w23-i-need-a-police-report",
      week: 23,
      phrase: "I need a police report for my insurance.",
      meaningVi: "Tôi cần biên bản công an để làm bảo hiểm.",
      situation: "Lý do trình báo — nói ra thì thủ tục nhanh hơn",
      isCoreChunk: true,
    },
    {
      id: "w23-can-you-call-my-embassy",
      week: 23,
      phrase: "Could you call my embassy?",
      meaningVi: "Nhờ bạn gọi cho đại sứ quán nước tôi được không?",
      situation: "Mất hộ chiếu ở nước ngoài — đây là việc phải làm",
      isCoreChunk: true,
    },
    {
      id: "w23-where-is-the-nearest-hospital",
      week: 23,
      phrase: "Where is the nearest hospital?",
      meaningVi: "Bệnh viện gần nhất ở đâu?",
      situation: "Tự đi được thì hỏi đường",
      isCoreChunk: true,
    },
    {
      id: "w23-i-need-to-see-a-doctor-now",
      week: 23,
      phrase: "I need to see a doctor now.",
      meaningVi: "Tôi cần gặp bác sĩ ngay.",
      situation: "Tới thẳng bệnh viện",
      isCoreChunk: true,
    },
    {
      id: "w23-my-name-is-and-my-number-is",
      week: 23,
      phrase: "My name is Hung. My number is oh nine one, five five two.",
      meaningVi: "Tôi tên Hùng. Số của tôi là 091 552.",
      situation: "Thông tin liên lạc — nói chậm, rồi nhắc lại",
      isCoreChunk: true,
    },
    {
      id: "w23-thank-you-for-your-help-w23",
      week: 23,
      phrase: "Thank you for your help.",
      meaningVi: "Cảm ơn bạn đã giúp.",
      situation: "Xong việc thì cảm ơn — dù lúc đó rối tới đâu",
      isCoreChunk: true,
    },
  ],

  listening: {
    id: "w23-listen-emergency",
    week: 23,
    titleVi: "Gọi cấp cứu, tổng đài hỏi dồn",
    lines: [
      { speaker: "Tổng đài", text: "Emergency, which service do you need?" },
      { speaker: "Hung", text: "I need an ambulance. There's been an accident." },
      { speaker: "Tổng đài", text: "Where are you? Tell me the address." },
      { speaker: "Hung", text: "I'm at twelve Green Street, near the big market, opposite the bank." },
      { speaker: "Tổng đài", text: "Twelve Green Street. How many people are hurt?" },
      { speaker: "Hung", text: "Two people are hurt. One is bleeding. Please hurry." },
      { speaker: "Tổng đài", text: "Help is on the way. Stay there. What should I call you?" },
    ],
    gist: {
      promptVi: "Ông Hùng gọi để làm gì?",
      options: ["Gọi xe cấp cứu vì có tai nạn", "Báo mất ví", "Hỏi đường tới bệnh viện"],
      answerIndex: 0,
    },
    detail: [
      {
        promptVi: "Tai nạn xảy ra ở đâu?",
        options: ["Số 12 đường Green", "Số 20 đường Green", "Trước nhà ga"],
        answerIndex: 0,
      },
      {
        promptVi: "Có bao nhiêu người bị thương?",
        options: ["Hai người", "Một người", "Ba người"],
        answerIndex: 0,
      },
      {
        promptVi: "Sau địa chỉ, tổng đài hỏi gì tiếp?",
        options: ["Số người bị thương", "Tên người gọi", "Số điện thoại"],
        answerIndex: 0,
      },
    ],
    gaps: [
      { before: "I need an", answer: "ambulance", after: ". There's been an accident." },
      { before: "I'm at twelve Green", answer: "Street", after: ", near the big market." },
      { before: "Two people are hurt. One is", answer: "bleeding", after: ". Please hurry." },
    ],
  },

  shadowing: [
    {
      id: "w23-sh-1",
      text: "I need an ambulance. There's been an accident.",
      focusVi: "Hai câu ngắn, to và dứt khoát — đây là câu cứu người",
    },
    {
      id: "w23-sh-2",
      text: "I'm at twelve Green Street, near the big market.",
      focusVi: "Địa chỉ nói chậm hẳn lại, tách rõ con số",
    },
    {
      id: "w23-sh-3",
      text: "She's not breathing. Please hurry.",
      focusVi: "Bật rõ 'not' — nuốt chữ này là đổi hẳn tình huống",
    },
    {
      id: "w23-sh-4",
      text: "My English is not good. Please speak slowly.",
      focusVi: "Nói rõ ràng, không ngại — câu này giúp cả hai bên",
    },
    {
      id: "w23-sh-5",
      text: "Let me repeat the address.",
      focusVi: "Nói chủ động, giọng chắc",
    },
  ],

  roleplay: {
    id: "w23-rp-emergency",
    week: 23,
    titleVi: "Gọi cấp cứu",
    goalVi: "Nói được địa điểm trước tiên, tả tình trạng, và nhắc lại thông tin",
    startTurnId: "start",
    hintLevel: "none",
    surpriseTurnId: "line-cut",
    turns: [
      {
        id: "start",
        say: "Emergency. Which service do you need?",
        sayVi: "Cấp cứu đây. Anh cần dịch vụ nào?",
        hints: [
          "I need an ambulance. There's been an accident.",
          "An ambulance, please. There's been an accident.",
        ],
        branches: [
          { keywords: ["ambulance", "accident", "police", "doctor", "hurt", "need"], next: "where" },
        ],
        fallbackNext: "which-service",
      },
      {
        id: "which-service",
        say: "Ambulance, police, or fire?",
        sayVi: "Cấp cứu, công an, hay cứu hoả?",
        hints: ["Ambulance.", "I need an ambulance."],
        branches: [
          { keywords: ["ambulance", "police", "fire", "need"], next: "where" },
        ],
        fallbackNext: "where",
      },
      {
        id: "where",
        // Địa điểm là thứ quan trọng nhất, nên nó được hỏi ngay và được hỏi lại
        // nếu người học chưa nói ra.
        say: "Where are you? Tell me the address.",
        sayVi: "Anh đang ở đâu? Cho tôi địa chỉ.",
        hints: [
          "I'm at twelve Green Street, near the big market.",
          "Near the big market, opposite the bank.",
        ],
        branches: [
          { keywords: ["street", "green", "twelve", "near", "market", "opposite", "bank", "address"], next: "how-many" },
        ],
        fallbackNext: "where-again",
      },
      {
        id: "where-again",
        say: "I need your location. Any street name, any shop nearby?",
        sayVi: "Tôi cần vị trí của anh. Tên đường nào, hay cửa hàng nào gần đó?",
        hints: [
          "Near the big market, opposite the bank.",
          "I'm at twelve Green Street.",
        ],
        branches: [
          { keywords: ["street", "market", "bank", "near", "opposite", "twelve", "green"], next: "how-many" },
        ],
        fallbackNext: "how-many",
      },
      {
        id: "how-many",
        say: "Twelve Green Street. How many people are hurt?",
        sayVi: "Số 12 đường Green. Có mấy người bị thương?",
        hints: [
          "Two people are hurt. One is bleeding.",
          "Someone is hurt. He's bleeding.",
        ],
        branches: [
          { keywords: ["two", "one", "people", "hurt", "bleeding", "breathing", "someone", "three"], next: "when" },
        ],
        fallbackNext: "when",
      },
      {
        id: "line-cut",
        // Lệch kịch bản: sóng đứt đúng lúc quan trọng nhất. Phản xạ đúng là
        // nhắc lại địa chỉ ngay, không phải hỏi "alô, alô".
        say: "Sorry, you cut out — [tiếng ngắt] ...say the address again?",
        sayVi: "Xin lỗi, tiếng anh bị đứt — [tiếng ngắt] ...anh đọc lại địa chỉ được không?",
        hints: [
          "Let me repeat the address. Twelve Green Street, near the big market.",
          "Twelve Green Street. Let me repeat the address.",
        ],
        branches: [
          { keywords: ["repeat", "address", "twelve", "green", "street", "market", "again"], next: "when" },
        ],
        fallbackNext: "when",
      },
      {
        id: "when",
        say: "When did this happen?",
        sayVi: "Chuyện xảy ra lúc nào?",
        hints: [
          "It happened five minutes ago.",
          "Five minutes ago. Please hurry.",
        ],
        branches: [
          { keywords: ["minutes", "ago", "happened", "now", "just", "hurry"], next: "what-to-do" },
        ],
        fallbackNext: "what-to-do",
      },
      {
        id: "what-to-do",
        say: "Help is on the way. Stay where you are.",
        sayVi: "Xe đang tới. Anh cứ ở nguyên đó.",
        hints: [
          "What should I do until they arrive?",
          "I'm staying with him. What should I do?",
        ],
        branches: [
          { keywords: ["what", "should", "until", "arrive", "staying", "with", "him", "do"], next: "name" },
        ],
        fallbackNext: "name",
      },
      {
        id: "name",
        say: "Don't move him. What's your name and number?",
        sayVi: "Đừng di chuyển nạn nhân. Cho tôi tên và số điện thoại của anh.",
        hints: [
          "My name is Hung. My number is oh nine one, five five two.",
          "Hung. My number is oh nine one, five five two.",
        ],
        branches: [
          { keywords: ["hung", "name", "number", "nine", "five", "one", "two"], next: "close" },
        ],
        fallbackNext: "close",
      },
      {
        id: "close",
        say: "Got it. The ambulance is two minutes away.",
        sayVi: "Tôi ghi rồi. Xe cấp cứu còn cách hai phút.",
        hints: ["Thank you for your help.", "Thank you. Please hurry."],
        branches: [
          { keywords: ["thank", "help", "hurry", "please", "you"], next: null },
        ],
        fallbackNext: null,
      },
    ],
  },
};
