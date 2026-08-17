import { describe, expect, it } from "vitest";
import P from "./personalization.js";

describe("gradeFromPerformance", () => {
  // Ngưỡng lấy đúng bảng §8.3.
  it("chấm trượt khi không nói được", () => {
    expect(P.gradeFromPerformance({ spoken: false })).toBeLessThan(3);
  });

  it("chấm trượt khi trễ quá 8 giây", () => {
    expect(P.gradeFromPerformance({ latencyMs: 9000, pronunciationScore: 90 })).toBe(2);
  });

  it("chấm trượt khi phát âm dưới 60 dù bật ra nhanh", () => {
    expect(P.gradeFromPerformance({ latencyMs: 800, pronunciationScore: 45 })).toBe(2);
  });

  it("cho điểm cao nhất khi nhanh và phát âm tốt", () => {
    expect(P.gradeFromPerformance({ latencyMs: 900, pronunciationScore: 92 })).toBe(5);
  });

  it("cho điểm trung bình khi chậm vừa", () => {
    expect(P.gradeFromPerformance({ latencyMs: 5000, pronunciationScore: 80 })).toBe(3);
  });
});

describe("scheduleSm2", () => {
  const fresh = {
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    lapses: 0,
    consecutiveFailures: 0,
    direction: "recognition",
  };

  it("đặt lịch 1 ngày cho lần đúng đầu tiên", () => {
    const next = P.scheduleSm2(fresh, 4, "2026-03-02");
    expect(next.intervalDays).toBe(1);
    expect(next.dueOn).toBe("2026-03-03");
  });

  it("giãn dần khi tiếp tục đúng", () => {
    let card = P.scheduleSm2(fresh, 4, "2026-03-02");
    card = P.scheduleSm2({ ...fresh, ...card }, 4, "2026-03-03");
    expect(card.intervalDays).toBe(6);

    card = P.scheduleSm2({ ...fresh, ...card }, 4, "2026-03-09");
    expect(card.intervalDays).toBeGreaterThan(6);
  });

  it("ôn thẻ sản sinh dày hơn thẻ nhận biết", () => {
    const base = { ...fresh, repetitions: 2, intervalDays: 10 };
    const recognition = P.scheduleSm2({ ...base, direction: "recognition" }, 4, "2026-03-02");
    const production = P.scheduleSm2({ ...base, direction: "production" }, 4, "2026-03-02");
    expect(production.intervalDays).toBeLessThan(recognition.intervalDays);
  });

  it("kéo từ sai về ôn lại ngay hôm sau", () => {
    const known = { ...fresh, repetitions: 5, intervalDays: 30 };
    const next = P.scheduleSm2(known, 2, "2026-03-02");
    expect(next.intervalDays).toBe(1);
    expect(next.consecutiveFailures).toBe(1);
    expect(next.lapses).toBe(1);
  });

  it("giữ từ luôn sai ở nhịp 1 ngày dù vừa trả lời đúng", () => {
    // Đây là "1 từ vựng luôn sai → tăng tần suất ôn": hai lần trượt liên tiếp
    // thì một lần đúng chưa đủ để nó được giãn ra.
    const struggling = { ...fresh, repetitions: 3, intervalDays: 12, consecutiveFailures: 2 };
    const next = P.scheduleSm2(struggling, 4, "2026-03-02");
    expect(next.consecutiveFailures).toBe(0);
    expect(next.intervalDays).toBeGreaterThan(0);
  });

  it("không để độ dễ tụt dưới sàn 1.3", () => {
    let card = { ...fresh, easeFactor: 1.3 };
    for (let i = 0; i < 5; i++) {
      card = { ...fresh, ...P.scheduleSm2(card, 1, "2026-03-02") };
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("đánh dấu từ khó dai dẳng sau 6 lần quên", () => {
    let card = { ...fresh };
    for (let i = 0; i < 6; i++) {
      card = { ...fresh, ...P.scheduleSm2(card, 2, "2026-03-02"), lapses: i + 1 };
    }
    const next = P.scheduleSm2(card, 2, "2026-03-02");
    expect(next.isLeech).toBe(true);
  });
});

describe("updateSkillWeights", () => {
  const flat = { vocabulary: 1, listening: 1, speaking: 1, pronunciation: 1 };

  it("tăng trọng số kỹ năng đang yếu", () => {
    const next = P.updateSkillWeights(flat, {
      listening: { accuracy: 45, attempted: 40 },
    });
    expect(next.listening).toBeGreaterThan(1);
    expect(next.speaking).toBe(1);
  });

  it("giảm trọng số kỹ năng đã vững", () => {
    const next = P.updateSkillWeights(flat, {
      vocabulary: { accuracy: 96, attempted: 60 },
    });
    expect(next.vocabulary).toBeLessThan(1);
  });

  it("bỏ qua mẫu quá nhỏ để không phản ứng với nhiễu", () => {
    const next = P.updateSkillWeights(flat, {
      listening: { accuracy: 20, attempted: 3 },
    });
    expect(next.listening).toBe(1);
  });

  it("đi dần tới mục tiêu thay vì nhảy thẳng", () => {
    const once = P.updateSkillWeights(flat, { listening: { accuracy: 40, attempted: 50 } });
    const twice = P.updateSkillWeights(once, { listening: { accuracy: 40, attempted: 50 } });
    expect(twice.listening).toBeGreaterThan(once.listening);
    expect(twice.listening).toBeLessThanOrEqual(1.5);
  });

  it("không vượt trần và không xuống dưới sàn", () => {
    let weights = flat;
    for (let i = 0; i < 20; i++) {
      weights = P.updateSkillWeights(weights, {
        listening: { accuracy: 10, attempted: 50 },
        vocabulary: { accuracy: 100, attempted: 50 },
      });
    }
    expect(weights.listening).toBeLessThanOrEqual(2.0);
    expect(weights.vocabulary).toBeGreaterThanOrEqual(0.5);
  });
});

describe("composeSession", () => {
  it("giữ đúng 45 phút và bốn khối ở mức chuẩn", () => {
    const plan = P.composeSession(
      { vocabulary: 1, listening: 1, speaking: 1, pronunciation: 1 },
      45,
    );
    const total = plan.vocabulary + plan.listening + plan.speaking + plan.review;
    expect(total).toBe(45);
    expect(plan.review).toBe(5);
  });

  it("tăng thời lượng nghe khi kỹ năng nghe yếu", () => {
    const balanced = P.composeSession(
      { vocabulary: 1, listening: 1, speaking: 1, pronunciation: 1 },
      45,
    );
    const weakListening = P.composeSession(
      { vocabulary: 1, listening: 1.5, speaking: 1, pronunciation: 1 },
      45,
    );
    expect(weakListening.listening).toBeGreaterThan(balanced.listening);
  });

  it("luôn để khối Nói là khối lớn nhất", () => {
    // Kể cả khi nghe yếu tới mức kịch trần, khối Nói vẫn phải dẫn đầu (§5.1).
    const plan = P.composeSession(
      { vocabulary: 2, listening: 2, speaking: 0.5, pronunciation: 0.5 },
      45,
    );
    expect(plan.speaking).toBeGreaterThanOrEqual(plan.listening);
    expect(plan.speaking).toBeGreaterThanOrEqual(plan.vocabulary);
  });

  it("không khối nào bị bóp xuống dưới sàn", () => {
    const plan = P.composeSession(
      { vocabulary: 0.5, listening: 0.5, speaking: 2, pronunciation: 2 },
      45,
    );
    expect(plan.vocabulary).toBeGreaterThanOrEqual(6);
    expect(plan.listening).toBeGreaterThanOrEqual(8);
  });

  it("có cấu trúc riêng cho buổi rút gọn và buổi tối thiểu", () => {
    expect(P.composeSession({}, 15).speaking).toBeGreaterThan(0);
    expect(P.composeSession({}, 5)).toEqual({
      vocabulary: 5,
      listening: 0,
      speaking: 0,
      review: 0,
    });
  });
});

describe("selectDueCards", () => {
  function card(overrides) {
    return {
      itemId: Math.random().toString(36).slice(2),
      dueOn: "2026-03-02",
      repetitions: 3,
      lastReviewedDay: "2026-02-25",
      consecutiveFailures: 0,
      ...overrides,
    };
  }

  it("giữ trần 20 thẻ ôn và 8 thẻ mới", () => {
    const cards = [];
    for (let i = 0; i < 50; i++) cards.push(card({}));
    for (let i = 0; i < 30; i++) {
      cards.push({ itemId: `new-${i}`, repetitions: 0, dueOn: null, lastReviewedDay: null });
    }

    const picked = P.selectDueCards(cards, "2026-03-02", { lastStudyDay: "2026-03-01" });
    expect(picked.reviews).toHaveLength(20);
    expect(picked.newCards).toHaveLength(8);
    expect(picked.reviews.length + picked.newCards.length).toBeLessThanOrEqual(
      P.DAILY_CARD_CAP,
    );
  });

  it("ưu tiên từ sai liên tiếp trước từ quá hạn lâu", () => {
    const cards = [
      card({ itemId: "old", dueOn: "2026-01-01", consecutiveFailures: 0 }),
      card({ itemId: "struggling", dueOn: "2026-03-01", consecutiveFailures: 3 }),
    ];
    const picked = P.selectDueCards(cards, "2026-03-02", { lastStudyDay: "2026-03-01" });
    expect(picked.reviews[0].itemId).toBe("struggling");
  });

  it("không đổ hết núi thẻ sau kỳ nghỉ dài", () => {
    // Nghỉ 10 ngày, 200 thẻ quá hạn: mỗi ngày chỉ kéo thêm tối đa 6 thẻ tồn.
    const cards = [];
    for (let i = 0; i < 200; i++) cards.push(card({ dueOn: "2026-02-20" }));

    const picked = P.selectDueCards(cards, "2026-03-02", { lastStudyDay: "2026-02-20" });
    expect(picked.recovering).toBe(true);
    expect(picked.reviews).toHaveLength(P.RECOVERY_EXTRA_PER_DAY);
    expect(picked.deferred).toBeGreaterThan(100);
  });

  it("tạm dừng thẻ mới khi còn đang trả nợ tồn đọng", () => {
    const cards = [];
    for (let i = 0; i < 100; i++) cards.push(card({ dueOn: "2026-02-20" }));
    for (let i = 0; i < 10; i++) {
      cards.push({ itemId: `new-${i}`, repetitions: 0, dueOn: null, lastReviewedDay: null });
    }

    const picked = P.selectDueCards(cards, "2026-03-02", { lastStudyDay: "2026-02-20" });
    expect(picked.newCards).toHaveLength(0);
  });

  it("bỏ qua thẻ chưa tới hạn và thẻ đã thuộc", () => {
    const cards = [
      card({ itemId: "future", dueOn: "2026-03-10" }),
      card({ itemId: "retired", retiredAt: "2026-02-01" }),
      card({ itemId: "due" }),
    ];
    const picked = P.selectDueCards(cards, "2026-03-02", { lastStudyDay: "2026-03-01" });
    expect(picked.reviews).toHaveLength(1);
    expect(picked.reviews[0].itemId).toBe("due");
  });
});

describe("vnDayKey", () => {
  it("tính ngày theo giờ Việt Nam chứ không theo UTC", () => {
    // 23:30 giờ VN ngày 2/3 = 16:30 UTC cùng ngày. Buổi học lúc đó phải tính
    // cho ngày 2/3, nếu không streak sẽ đứt oan (§10).
    expect(P.vnDayKey(new Date("2026-03-02T16:30:00Z"))).toBe("2026-03-02");
    // 00:30 giờ VN ngày 3/3 = 17:30 UTC ngày 2/3.
    expect(P.vnDayKey(new Date("2026-03-02T17:30:00Z"))).toBe("2026-03-03");
  });
});
