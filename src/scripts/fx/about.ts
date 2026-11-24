// Behaviour for About.astro (moved out of the component so the Astro and Next builds share it).
import { onScrollFrame, reducedMotion } from "../lib";

// Scroll parallax for the full-bleed portrait. As the section travels upward,
// the image also softens and fades so the foreground copy remains readable.
const el = document.querySelector<HTMLElement>("[data-parallax]");
if (el && !reducedMotion()) {
  const host = el.parentElement!;
  onScrollFrame(() => {
    const r = host.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const child = el.firstElementChild as HTMLElement | null;
    const slack = child ? Math.max(0, (child.offsetHeight - r.height) / 2) : 0;
    const shift = Math.min(210, slack * 0.9);
    const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
    const q = Math.max(0, Math.min(1, (vh - r.top) / vh));
    const progress = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    const softened = progress * progress * (3 - 2 * progress);
    const mobile = window.innerWidth <= 809;

    el.style.transform = "translate3d(0," + (c * shift).toFixed(2) + "px,0) scale(" + (1 + 0.24 * q).toFixed(4) + ")";
    host.style.setProperty("--about-blur", (softened * (mobile ? 14 : 9)).toFixed(2) + "px");
    host.style.setProperty("--about-image-opacity", (1 - softened * (mobile ? 0.58 : 0.42)).toFixed(3));
    host.style.setProperty("--about-shade", (softened * (mobile ? 0.5 : 0.28)).toFixed(3));
  });
}
