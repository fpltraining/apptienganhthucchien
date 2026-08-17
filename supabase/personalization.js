/**
 * Logic cá nhân hoá — ES5 thuần, không phụ thuộc thư viện nào.
 *
 * Viết ở mức ES5 để dán thẳng vào một thẻ <script> trong single HTML file cũng
 * chạy được, mà nạp bằng module vào app hiện tại cũng chạy. Không dùng const,
 * let, arrow function, template literal, Object.assign hay Array.prototype.includes.
 *
 * Tham chiếu curriculum.md theo dạng §N.
 *
 * Bốn việc file này làm:
 *   1. Suy ra điểm chấm từ phát âm + độ trễ, không hỏi người học (§8.3)
 *   2. Xếp lịch ôn SM-2, có ưu tiên riêng cho từ hay sai
 *   3. Điều chỉnh tỉ lệ dạng bài khi một kỹ năng yếu đi
 *   4. Chọn thẻ cho buổi hôm nay, có chế độ hồi phục sau khi nghỉ dài
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.Personalization = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // --- hằng số lấy thẳng từ giáo trình ---------------------------------------

  /** Trần thẻ mỗi ngày — 10 phút là 10 phút (§8.3). */
  var DAILY_CARD_CAP = 28;
  var NEW_CARDS_PER_DAY = 8;
  var REVIEW_CARDS_PER_DAY = 20;

  /** Nghỉ quá 3 ngày thì vào chế độ hồi phục (§8.3). */
  var RECOVERY_GAP_DAYS = 3;
  /** Mỗi ngày chỉ kéo thêm tối đa 6 thẻ tồn, giãn ra 5 ngày. */
  var RECOVERY_EXTRA_PER_DAY = 6;

  /** Sai liên tiếp từ mức này trở lên thì ép ôn lại ngay hôm sau. */
  var STRUGGLE_THRESHOLD = 2;
  /** Quên 6 lần thì coi là từ khó dai dẳng. */
  var LEECH_LAPSES = 6;

  var MIN_EASE = 1.3;
  var DEFAULT_EASE = 2.5;

  /**
   * SM-2 không có tham số tỉ lệ nhớ. §8.3 chọn 0.88 thay vì 0.9 mặc định để
   * cắt bớt số thẻ ôn, nên ở đây nó được xấp xỉ bằng cách kéo dài khoảng cách
   * ôn thêm 15%. FSRS nhận thẳng con số 0.88; nếu chuyển sang FSRS thì bỏ hệ
   * số này đi chứ đừng cộng dồn cả hai.
   */
  var RETENTION_INTERVAL_SCALE = 1.15;

  /** Thẻ sản sinh khó hơn nhận biết nhiều, nên ôn dày hơn (§8.3). */
  var DIRECTION_FACTOR = { recognition: 1.0, production: 0.8 };

  var VN_OFFSET_MINUTES = 7 * 60;

  // --- thời gian --------------------------------------------------------------

  /**
   * Ngày theo lịch Việt Nam, dạng YYYY-MM-DD.
   *
   * Ranh giới ngày phải là giờ VN chứ không phải UTC: buổi học lúc 23h phải
   * tính cho hôm đó, còn UTC sẽ đẩy sang hôm sau và làm đứt chuỗi oan (§10).
   *
   * @param {Date} [date]
   * @returns {string}
   */
  function vnDayKey(date) {
    var base = date ? date : new Date();
    var shifted = new Date(base.getTime() + VN_OFFSET_MINUTES * 60000);
    var y = shifted.getUTCFullYear();
    var m = shifted.getUTCMonth() + 1;
    var d = shifted.getUTCDate();
    return y + "-" + pad2(m) + "-" + pad2(d);
  }

  function pad2(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  /** Số ngày trọn vẹn từ dayKey `from` tới `to`; âm nếu `to` trước `from`. */
  function daysBetween(from, to) {
    return Math.round((parseDayKey(to) - parseDayKey(from)) / 86400000);
  }

  function parseDayKey(dayKey) {
    var parts = String(dayKey).split("-");
    return Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function addDays(dayKey, delta) {
    var t = parseDayKey(dayKey) + delta * 86400000;
    var d = new Date(t);
    return d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate());
  }

  // --- 1. chấm điểm tự động ---------------------------------------------------

  /**
   * Suy ra điểm 0–5 (thang SM-2) từ kết quả nói.
   *
   * Người học không tự bấm Easy/Hard: tự đánh giá vừa không chính xác vừa phá
   * nhịp nói (§8.3). Ngưỡng lấy đúng bảng trong §8.3.
   *
   * @param {{spoken?: boolean, latencyMs?: number, pronunciationScore?: number}} attempt
   * @returns {number} 0–5; dưới 3 là trượt
   */
  function gradeFromPerformance(attempt) {
    var a = attempt || {};
    if (a.spoken === false) return 1;

    var latency = typeof a.latencyMs === "number" ? a.latencyMs : null;
    var score = typeof a.pronunciationScore === "number" ? a.pronunciationScore : null;

    // Không nói ra được trong 8 giây thì coi như chưa nhớ.
    if (latency !== null && latency > 8000) return 2;

    // Phát âm quá thấp là trượt kể cả khi bật ra nhanh: nói nhanh mà người nghe
    // không hiểu thì chưa dùng được ngoài đời.
    if (score !== null && score < 60) return 2;

    if (latency !== null && latency > 4000) return 3;
    if (score !== null && score <= 85) {
      return latency !== null && latency < 1500 ? 4 : 3;
    }
    if (latency !== null && latency < 1500) return 5;
    return 4;
  }

  // --- 2. lịch ôn SM-2 --------------------------------------------------------

  /**
   * Tính trạng thái ôn tiếp theo của một thẻ.
   *
   * Hai điều chỉnh riêng của app, ngoài SM-2 gốc:
   *   - thẻ sản sinh có khoảng cách ngắn hơn thẻ nhận biết (§8.3);
   *   - từ sai liên tiếp bị ép về 1 ngày, tức là "từ nào luôn sai thì ôn dày hơn".
   *
   * @param {Object} card   trạng thái hiện tại (không bị sửa tại chỗ)
   * @param {number} grade  0–5
   * @param {string} today  dayKey giờ VN
   * @param {Object} [options]
   * @returns {Object} trạng thái mới
   */
  function scheduleSm2(card, grade, today, options) {
    var opts = options || {};
    var scale =
      typeof opts.intervalScale === "number" ? opts.intervalScale : RETENTION_INTERVAL_SCALE;

    var ease = typeof card.easeFactor === "number" ? card.easeFactor : DEFAULT_EASE;
    var repetitions = card.repetitions || 0;
    var intervalDays = card.intervalDays || 0;
    var lapses = card.lapses || 0;
    var failures = card.consecutiveFailures || 0;
    var direction = card.direction === "production" ? "production" : "recognition";

    var passed = grade >= 3;

    if (!passed) {
      repetitions = 0;
      intervalDays = 1;
      lapses += 1;
      failures += 1;
    } else {
      if (repetitions === 0) {
        intervalDays = 1;
      } else if (repetitions === 1) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * ease * scale);
      }
      repetitions += 1;
      failures = 0;
    }

    // Công thức cập nhật độ dễ của SM-2.
    ease = ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (ease < MIN_EASE) ease = MIN_EASE;

    // Thẻ sản sinh quay lại sớm hơn.
    if (passed && intervalDays > 1) {
      intervalDays = Math.max(1, Math.round(intervalDays * DIRECTION_FACTOR[direction]));
    }

    // Từ đang sai dai dẳng thì không được giãn ra, bất kể SM-2 tính ra bao nhiêu.
    if (failures >= STRUGGLE_THRESHOLD || lapses >= LEECH_LAPSES) {
      intervalDays = 1;
    }

    return {
      easeFactor: Math.round(ease * 100) / 100,
      intervalDays: intervalDays,
      repetitions: repetitions,
      lapses: lapses,
      consecutiveFailures: failures,
      dueOn: addDays(today, intervalDays),
      lastReviewedDay: today,
      mastery: masteryFor(repetitions, failures, lapses),
      isLeech: lapses >= LEECH_LAPSES,
    };
  }

  /** Độ thành thạo 0–5 để hiển thị, không tham gia vào việc xếp lịch. */
  function masteryFor(repetitions, consecutiveFailures, lapses) {
    if (consecutiveFailures > 0) return 0;
    if (lapses >= LEECH_LAPSES) return 1;
    if (repetitions >= 8) return 5;
    if (repetitions >= 5) return 4;
    if (repetitions >= 3) return 3;
    if (repetitions >= 2) return 2;
    if (repetitions >= 1) return 1;
    return 0;
  }

  // --- 3. tỉ lệ dạng bài ------------------------------------------------------

  /**
   * Trọng số mục tiêu theo độ chính xác gần đây.
   *
   * Yếu thì tăng tỉ lệ, giỏi thì giảm để nhường thời lượng cho khối khác. Trần
   * và sàn tồn tại để không khối nào biến mất khỏi buổi học — cả bốn khối đều
   * chạy mỗi ngày (§5.1).
   */
  function targetWeightFor(accuracy) {
    if (accuracy === null || typeof accuracy !== "number") return 1.0;
    if (accuracy < 60) return 1.5;
    if (accuracy < 75) return 1.25;
    if (accuracy <= 90) return 1.0;
    return 0.85;
  }

  /**
   * Cập nhật trọng số các kỹ năng từ kết quả gần đây.
   *
   * Đổi từ từ chứ không nhảy thẳng tới mục tiêu: một buổi tệ vì mệt hay vì ồn
   * không nên viết lại cả cấu trúc buổi học hôm sau. Dưới `minSample` lần thử
   * thì giữ nguyên, vì đó là nhiễu chứ chưa phải xu hướng.
   *
   * @param {Object} currentWeights  {vocabulary, listening, speaking, pronunciation}
   * @param {Object} recentBySkill   {skill: {accuracy, attempted}}
   * @param {Object} [options]
   * @returns {Object} trọng số mới
   */
  function updateSkillWeights(currentWeights, recentBySkill, options) {
    var opts = options || {};
    var smoothing = typeof opts.smoothing === "number" ? opts.smoothing : 0.5;
    var minSample = typeof opts.minSample === "number" ? opts.minSample : 10;

    var skills = ["vocabulary", "listening", "speaking", "pronunciation"];
    var next = {};

    for (var i = 0; i < skills.length; i++) {
      var skill = skills[i];
      var current =
        currentWeights && typeof currentWeights[skill] === "number"
          ? currentWeights[skill]
          : 1.0;
      var recent = recentBySkill ? recentBySkill[skill] : null;

      if (!recent || (recent.attempted || 0) < minSample) {
        next[skill] = round2(current);
        continue;
      }

      var target = targetWeightFor(recent.accuracy);
      var moved = current + (target - current) * smoothing;
      next[skill] = round2(clamp(moved, 0.5, 2.0));
    }

    return next;
  }

  /**
   * Chia thời lượng buổi học cho bốn khối.
   *
   * Nền là 10/12/18/5 của buổi 45 phút (§5.1). Trọng số chỉ kéo giãn quanh cái
   * nền đó, và ba ràng buộc luôn đúng sau khi chia:
   *   - khối Ôn nhanh giữ nguyên 5 phút, vì nó là khối chốt trí nhớ cuối buổi;
   *   - khối Nói luôn là khối lớn nhất, đúng chủ đích của §5.1;
   *   - không khối nào tụt xuống dưới sàn của nó.
   *
   * @param {Object} weights
   * @param {number} budgetMinutes  45 / 15 / 5 theo ba mức hoàn thành (§10.2)
   * @returns {{vocabulary:number, listening:number, speaking:number, review:number}}
   */
  function composeSession(weights, budgetMinutes) {
    var budget = typeof budgetMinutes === "number" ? budgetMinutes : 45;
    var w = weights || {};

    // Buổi rút gọn và buổi tối thiểu có cấu trúc riêng, không chia lại tỉ lệ.
    if (budget <= 5) {
      return { vocabulary: budget, listening: 0, speaking: 0, review: 0 };
    }
    if (budget <= 15) {
      return {
        vocabulary: 5,
        listening: 0,
        speaking: budget - 7,
        review: 2,
      };
    }

    var reviewMinutes = 5;
    var pool = budget - reviewMinutes;

    var base = { vocabulary: 10, listening: 12, speaking: 18 };
    var floors = { vocabulary: 6, listening: 8, speaking: 12 };
    var keys = ["vocabulary", "listening", "speaking"];

    var weighted = {};
    var total = 0;
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      // Khối Nói chịu ảnh hưởng của cả điểm nói lẫn điểm phát âm.
      var factor =
        k === "speaking"
          ? (numberOr(w.speaking, 1) + numberOr(w.pronunciation, 1)) / 2
          : numberOr(w[k], 1);
      weighted[k] = base[k] * factor;
      total += weighted[k];
    }

    var out = { review: reviewMinutes };
    var assigned = 0;
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      var minutes = Math.round((weighted[key] / total) * pool);
      if (minutes < floors[key]) minutes = floors[key];
      out[key] = minutes;
      assigned += minutes;
    }

    // Làm tròn và áp sàn có thể làm lệch tổng; bù vào khối Nói, khối được phép
    // co giãn nhiều nhất.
    var drift = pool - assigned;
    out.speaking = Math.max(floors.speaking, out.speaking + drift);

    // Bất biến: Nói luôn lớn nhất.
    if (out.speaking < out.listening) {
      var swap = out.listening;
      out.listening = out.speaking;
      out.speaking = swap;
    }

    return out;
  }

  // --- 4. chọn thẻ cho hôm nay ------------------------------------------------

  /**
   * Chọn thẻ để ôn hôm nay.
   *
   * Sau một kỳ nghỉ dài, thẻ quá hạn dồn lại thành "núi thẻ" — và nhìn thấy 300
   * thẻ chờ là lý do bỏ app phổ biến nhất sau khi nghỉ (§8.3). Nên khi nghỉ quá
   * 3 ngày, mỗi ngày chỉ kéo thêm tối đa 6 thẻ tồn thay vì đổ hết một lúc.
   *
   * @param {Array} cards            thẻ của một người học
   * @param {string} today           dayKey giờ VN
   * @param {Object} [options]       {lastStudyDay, newCardsPerDay, reviewCardsPerDay}
   * @returns {{reviews:Array, newCards:Array, deferred:number, recovering:boolean}}
   */
  function selectDueCards(cards, today, options) {
    var opts = options || {};
    var newCap = numberOr(opts.newCardsPerDay, NEW_CARDS_PER_DAY);
    var reviewCap = numberOr(opts.reviewCardsPerDay, REVIEW_CARDS_PER_DAY);

    var gap = opts.lastStudyDay ? daysBetween(opts.lastStudyDay, today) : 0;
    var recovering = gap > RECOVERY_GAP_DAYS;

    var dueToday = [];
    var backlog = [];
    var fresh = [];

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.retiredAt) continue;

      if (!card.dueOn || card.repetitions === 0 && !card.lastReviewedDay) {
        fresh.push(card);
        continue;
      }
      var overdue = daysBetween(card.dueOn, today);
      if (overdue < 0) continue;
      if (overdue === 0) dueToday.push(card);
      else backlog.push(card);
    }

    dueToday.sort(byUrgency(today));
    backlog.sort(byUrgency(today));

    var reviews = dueToday.slice(0, reviewCap);
    var room = reviewCap - reviews.length;

    // Trong chế độ hồi phục, phần tồn đọng bị chặn ở 6 thẻ/ngày.
    var backlogAllowance = recovering ? Math.min(room, RECOVERY_EXTRA_PER_DAY) : room;
    var takenFromBacklog = backlog.slice(0, Math.max(0, backlogAllowance));
    reviews = reviews.concat(takenFromBacklog);

    // Thẻ mới nhường chỗ cho thẻ ôn, và tạm dừng hẳn khi đang trả nợ tồn đọng:
    // học từ mới trong lúc chưa giữ nổi từ cũ chỉ làm núi thẻ cao thêm.
    var newRoom = Math.min(newCap, DAILY_CARD_CAP - reviews.length);
    if (recovering && backlog.length > takenFromBacklog.length) newRoom = 0;
    var newCards = fresh.slice(0, Math.max(0, newRoom));

    return {
      reviews: reviews,
      newCards: newCards,
      deferred: dueToday.length + backlog.length - reviews.length,
      recovering: recovering,
    };
  }

  /**
   * Thứ tự ưu tiên: sai liên tiếp nhiều nhất trước, rồi quá hạn lâu nhất.
   *
   * Đây là chỗ "từ nào luôn sai thì ôn dày hơn" có hiệu lực lần thứ hai — lần
   * đầu là ở scheduleSm2 khi ép khoảng cách về 1 ngày.
   */
  function byUrgency(today) {
    return function (a, b) {
      var failureDiff = (b.consecutiveFailures || 0) - (a.consecutiveFailures || 0);
      if (failureDiff !== 0) return failureDiff;
      return daysBetween(b.dueOn, today) - daysBetween(a.dueOn, today);
    };
  }

  /** Những từ đang sai dai dẳng, để chèn thêm vào khối Ôn nhanh cuối buổi. */
  function pickStrugglingWords(cards, limit) {
    var max = numberOr(limit, 3);
    var struggling = [];
    for (var i = 0; i < cards.length; i++) {
      if (!cards[i].retiredAt && (cards[i].consecutiveFailures || 0) >= STRUGGLE_THRESHOLD) {
        struggling.push(cards[i]);
      }
    }
    struggling.sort(function (a, b) {
      return (b.consecutiveFailures || 0) - (a.consecutiveFailures || 0);
    });
    return struggling.slice(0, max);
  }

  // --- tiện ích ---------------------------------------------------------------

  function numberOr(value, fallback) {
    return typeof value === "number" && isFinite(value) ? value : fallback;
  }

  function clamp(value, low, high) {
    return value < low ? low : value > high ? high : value;
  }

  function round2(value) {
    return Math.round(value * 100) / 100;
  }

  return {
    DAILY_CARD_CAP: DAILY_CARD_CAP,
    NEW_CARDS_PER_DAY: NEW_CARDS_PER_DAY,
    REVIEW_CARDS_PER_DAY: REVIEW_CARDS_PER_DAY,
    RECOVERY_GAP_DAYS: RECOVERY_GAP_DAYS,
    RECOVERY_EXTRA_PER_DAY: RECOVERY_EXTRA_PER_DAY,

    vnDayKey: vnDayKey,
    daysBetween: daysBetween,
    addDays: addDays,

    gradeFromPerformance: gradeFromPerformance,
    scheduleSm2: scheduleSm2,
    masteryFor: masteryFor,

    targetWeightFor: targetWeightFor,
    updateSkillWeights: updateSkillWeights,
    composeSession: composeSession,

    selectDueCards: selectDueCards,
    pickStrugglingWords: pickStrugglingWords,
  };
});
