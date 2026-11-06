"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Subject = { l: number; t: number; r: number; b: number };

type Props = {
  src: string;
  width: number;
  height: number;
  /** Landmark inside the source image, 0-1. This is the scale/pin point. */
  focalX: number;
  focalY: number;
  /**
   * Where that landmark should sit in the media plane.
   * Left-justified type: center of the open region between the lockup
   * and the right edge of the banner (about 78%).
   */
  targetX?: number;
  targetY?: number;
  /** Region that must stay fully on screen. Tall frames scale to this box. */
  subject?: Subject;
  /**
   * Wide banners scale this subject box to the banner height so the photo
   * covers more of the frame. Tall (mobile) frames ignore it and pin the focal.
   */
  fillFrame?: boolean;
  /**
   * Desktop/ultrawide only: scale+place so `subject` (complete silhouette)
   * sits fully inside Jed's subject-safe region — same vertical band as the
   * text lockup (`[data-hero-lockup]`), from lockup right to banner right.
   * Phone/tablet keep the landmark cover crop. Regions stay invisible.
   */
  fitSubjectToSafeRegion?: boolean;
  /** Brand fill. On ultrawide, the photo's right edge fades into this color. */
  edgeColor?: string;
};

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  mask: boolean;
  /** Fade the photo's right edge into the brand fill (ultrawide gutter). */
  fadeRight: boolean;
};

/** Photo stops at 1600px. At this width and above, blend its right edge into the fill. */
const ULTRAWIDE_MIN = 1600;
const RIGHT_FADE = 220;

/** Phone and tablet share the centered crop. Desktop starts at Tailwind `lg`. */
const DESKTOP_MIN = 1024;

type Rect = { left: number; top: number; right: number; bottom: number };

function expandRect(acc: Rect | null, r: DOMRect | Rect): Rect {
  if (!acc) {
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  }
  return {
    left: Math.min(acc.left, r.left),
    top: Math.min(acc.top, r.top),
    right: Math.max(acc.right, r.right),
    bottom: Math.max(acc.bottom, r.bottom),
  };
}

/**
 * Tight 2D union around the visible lockup.
 * Text: per-character Range boxes (includes letter-spacing; never the
 * block/column layout width). Rule + CTA controls: element boxes.
 * The actions flex row wrapper is intentionally ignored — it stretches
 * to the column and was inflating text-safe by hundreds of pixels.
 */
function measureTightLockup(lockup: HTMLElement): Rect | null {
  let acc: Rect | null = null;

  const absorb = (r: DOMRect | Rect) => {
    if (r.right - r.left < 0.5 || r.bottom - r.top < 0.5) return;
    acc = expandRect(acc, r);
  };

  const absorbGlyphs = (el: HTMLElement) => {
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === "\n") continue;
          const range = document.createRange();
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const r = range.getBoundingClientRect();
          // Skip blank advance slots (trailing spaces, zero-ink).
          if (text[i] === " " && r.width < 1) continue;
          absorb(r);
        }
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as HTMLElement).tagName === "BR") return;
        for (const child of node.childNodes) walk(child);
      }
    };
    walk(el);
  };

  for (const el of lockup.querySelectorAll<HTMLElement>("[data-hero-box]")) {
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;

    if (el.dataset.heroBox === "rule") {
      absorb(el.getBoundingClientRect());
      continue;
    }
    absorbGlyphs(el);
  }

  // CTA buttons/links — shrink-wrapped controls, never the flex row wrapper.
  const actions = lockup.querySelector("[data-hero-actions]");
  if (actions) {
    for (const el of actions.querySelectorAll<HTMLElement>("a, button")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      absorb(el.getBoundingClientRect());
    }
  }

  return acc;
}

/**
 * Pins the image landmark in the open half of the banner.
 * object-position cannot do this: one percentage is both the image point
 * and the container point, so a landmark that is not already at ~78%
 * gets scaled from the wrong spot and clipped.
 */
export function FocalBanner({
  src,
  width,
  height,
  focalX,
  focalY,
  targetX = 0.78,
  targetY = 0.62,
  subject,
  fillFrame = false,
  fitSubjectToSafeRegion = false,
  edgeColor = "#3d1212",
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const place = () => {
      const cW = frame.clientWidth;
      const cH = frame.clientHeight;
      if (cW === 0 || cH === 0) return;

      const desktop = cW >= DESKTOP_MIN;
      const fadeRight = window.innerWidth >= ULTRAWIDE_MIN;
      const wide = cW / cH >= width / height;

      // Home banner: fit the sofa silhouette into the subject-safe box
      // (text-safe top/bottom, from text-safe right → banner right).
      // text-safe = tight union of visible lockup glyphs/CTAs — never the
      // column/container width (block wrappers stretch and inflate the box).
      if (desktop && fitSubjectToSafeRegion && subject) {
        const section = frame.closest("section");
        const lockup = section?.querySelector(
          "[data-hero-lockup]",
        ) as HTMLElement | null;
        if (section && lockup) {
          const sr = section.getBoundingClientRect();
          const fr = frame.getBoundingClientRect();
          const textSafe = measureTightLockup(lockup);
          if (textSafe) {
            const { left: tL, top: tT, right: tR, bottom: tB } = textSafe;
            // Subject-safe ∩ media plane (photo cannot paint the side fill).
            // 8px gap so sofa never kisses the glyph edge.
            const pad = 8;
            const ssL = tR + pad;
            const ssT = tT;
            const ssR = Math.min(sr.right, fr.right) - pad;
            const ssB = tB;
            const ssW = Math.max(1, ssR - ssL);
            const ssH = Math.max(1, ssB - ssT);

            const subW = Math.max(0.05, subject.r - subject.l) * width;
            const subH = Math.max(0.05, subject.b - subject.t) * height;
            let scale = Math.min(ssW / subW, ssH / subH);
            // Keep a touch of studio margin around the silhouette.
            scale *= 0.92;

            const sW = width * scale;
            const sH = height * scale;
            const sofaW = subW * scale;
            const sofaH = subH * scale;

            // Center horizontally in subject-safe; bias slightly down in the band.
            const sofaLeft = ssL + (ssW - sofaW) / 2;
            const sofaTop = ssT + (ssH - sofaH) * 0.55;
            const left = sofaLeft - subject.l * sW - fr.left;
            const top = sofaTop - subject.t * sH - fr.top;

            setBox({
              left,
              top,
              width: sW,
              height: sH,
              mask: false,
              fadeRight,
            });
            return;
          }
        }
      }

      const frameSubject =
        desktop && wide && fillFrame && subject && !fitSubjectToSafeRegion
          ? subject
          : null;

      if (desktop && wide && !frameSubject) {
        const scale = Math.min(cW / width, cH / height);
        const sW = width * scale;
        const sH = height * scale;
        let left = targetX * cW - focalX * sW;
        const minLeft = Math.min(0, cW - sW);
        const maxLeft = Math.max(0, cW - sW);
        left = Math.min(maxLeft, Math.max(minLeft, left));
        setBox({
          left,
          top: sH < cH - 1 ? cH - sH : 0,
          width: sW,
          height: sH,
          mask: left > 8,
          fadeRight,
        });
        return;
      }

      if (frameSubject) {
        const subH = Math.max(0.2, frameSubject.b - frameSubject.t) * height;
        let scale = cH / subH;
        if (width * scale > cW) scale = cW / width;
        const sW = width * scale;
        const sH = height * scale;

        let top = -frameSubject.t * sH;
        top = Math.min(0, Math.max(cH - sH, top));

        let left = cW - sW;
        const leftKeepRight = cW - frameSubject.r * sW;
        const leftKeepLeft = -frameSubject.l * sW;
        left = Math.min(left, leftKeepRight);
        left = Math.max(left, leftKeepLeft);
        if (sW <= cW) {
          left = Math.min(Math.max(left, 0), cW - sW);
        } else {
          left = Math.min(0, Math.max(cW - sW, left));
        }

        setBox({
          left,
          top,
          width: sW,
          height: sH,
          mask: false,
          fadeRight,
        });
        return;
      }

      const cover = Math.max(cW / width, cH / height);
      const room = (fraction: number) => Math.max(fraction, 0.12);
      const scale = Math.max(
        cover,
        cW / 2 / (room(focalX) * width),
        cW / 2 / (room(1 - focalX) * width),
        cH / 2 / (room(focalY) * height),
        cH / 2 / (room(1 - focalY) * height),
      );
      const sW = width * scale;
      const sH = height * scale;
      let left = cW * 0.5 - focalX * sW;
      let top = cH * 0.5 - focalY * sH;
      left = Math.min(0, Math.max(cW - sW, left));
      top = Math.min(0, Math.max(cH - sH, top));

      setBox({
        left,
        top,
        width: sW,
        height: sH,
        mask: false,
        fadeRight,
      });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(frame);
    const section = frame.closest("section");
    const lockup = section?.querySelector("[data-hero-lockup]");
    if (section) observer.observe(section);
    if (lockup) observer.observe(lockup);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [
    width,
    height,
    focalX,
    focalY,
    targetX,
    targetY,
    subject?.l,
    subject?.t,
    subject?.r,
    subject?.b,
    fillFrame,
    fitSubjectToSafeRegion,
  ]);

  const mask = box?.mask
    ? "linear-gradient(to right, transparent, #000 16%)"
    : undefined;

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        fetchPriority="high"
        className="absolute max-w-none select-none"
        style={
          box
            ? {
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
                WebkitMaskImage: mask,
                maskImage: mask,
              }
            : {
                height: "100%",
                width: "auto",
                right: 0,
                top: 0,
              }
        }
      />
      {box?.fadeRight ? (
        <div
          aria-hidden
          className="absolute"
          style={{
            top: box.top,
            height: box.height,
            left: Math.max(box.left, box.left + box.width - RIGHT_FADE),
            width: Math.min(RIGHT_FADE, box.width),
            background: `linear-gradient(to right, transparent, ${edgeColor})`,
          }}
        />
      ) : null}
    </div>
  );
}
