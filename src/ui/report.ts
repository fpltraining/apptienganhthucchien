/**
 * The closing report (curriculum §7).
 *
 * Shown once when the course is finished, and reachable afterwards from the
 * home screen. It is a short list of what the learner did — not a dashboard.
 * The person reading it spent six months on this and wants to know it counted,
 * which takes four lines, not a chart.
 */

import { el, mount } from "./dom";
import { reportLinesVi } from "../domain/maintenance";
import type { CourseReport } from "../domain/maintenance";

export function renderReport(
  root: HTMLElement,
  report: CourseReport,
  onDone: () => void,
): void {
  mount(
    root,
    el("section", { class: "block" }, [
      el("p", { class: "block__step" }, ["Tổng kết khoá học"]),
      el("h1", { class: "block__title" }, ["Sáu tháng vừa rồi"]),

      el(
        "ul",
        { class: "report" },
        reportLinesVi(report).map((line) => el("li", { class: "report__line" }, [line])),
      ),

      // Named without being framed as a shortfall: these are what to keep
      // working on, not what was failed.
      report.soundsRemaining.length > 0
        ? el("p", { class: "block__note" }, [
            `Còn mấy âm đáng luyện thêm: ${report.soundsRemaining.join(", ")}.`,
          ])
        : null,

      el("p", { class: "block__lead" }, [
        "Từ giờ mỗi ngày 20 phút để giữ những gì đã học. Ngắn hơn, nhưng đừng bỏ.",
      ]),

      el("button", { class: "btn", type: "button", onclick: () => onDone() }, ["Tiếp"]),
    ]),
  );
}
