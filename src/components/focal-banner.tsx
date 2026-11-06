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
      if (desktop && fitSubjectToSafeRegion && subject) {
        const section = frame.closest("section");
        const lockup = section?.querySelector(
          "[data-hero-lockup]",
        ) as HTMLElement | null;
        if (section && lockup) {
          const sr = section.getBoundingClientRect();
          const fr = frame.getBoundingClientRect();
          const kids = [
            ...lockup.querySelectorAll("p, h1, div, a, button"),
          ].filter((el) => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return (
              s.display !== "none" &&
              s.visibility !== "hidden" &&
              r.width > 0 &&
              r.height > 0
            );
          });
          let tL = Infinity;
          let tT = Infinity;
          let tR = -Infinity;
          let tB = -Infinity;
          for (const el of kids) {
            const r = el.getBoundingClientRect();
            tL = Math.min(tL, r.left);
            tT = Math.min(tT, r.top);
            tR = Math.max(tR, r.right);
            tB = Math.max(tB, r.bottom);
          }
          if (Number.isFinite(tR) && tB > tT) {
            // Subject-safe ∩ media plane (photo cannot paint the side fill).
            const pad = 12;
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
            let left = sofaLeft - subject.l * sW - fr.left;
            let top = sofaTop - subject.t * sH - fr.top;

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
