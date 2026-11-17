"use client";

import { useEffect } from "react";

const INTERACTIVE_SELECTOR =
  'a[href], button:not(:disabled), [role="button"], summary, select, input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)';

export function CursorSoundEffects() {
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let lastHoverAt = 0;

    const playTone = (kind: "hover" | "click") => {
      if (!audioContext || audioContext.state !== "running") return;

      const now = audioContext.currentTime;
      const duration = kind === "hover" ? 0.035 : 0.085;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(kind === "hover" ? 720 : 880, now);
      if (kind === "click") {
        oscillator.frequency.exponentialRampToValueAtTime(560, now + duration);
      }

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "hover" ? 0.012 : 0.028, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    };

    const getAudioContext = () => {
      if (audioContext) return audioContext;
      if (typeof window.AudioContext === "undefined") return null;

      audioContext = new window.AudioContext();
      return audioContext;
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;

      const interactive = event.target.closest(INTERACTIVE_SELECTOR);
      if (!interactive || (event.relatedTarget instanceof Node && interactive.contains(event.relatedTarget))) {
        return;
      }

      const now = performance.now();
      if (now - lastHoverAt < 90) return;
      lastHoverAt = now;
      playTone("hover");
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !(event.target instanceof Element)) return;
      if (!event.target.closest(INTERACTIVE_SELECTOR)) return;

      const context = getAudioContext();
      if (!context) return;

      if (context.state === "suspended") {
        void context.resume().then(() => playTone("click")).catch((error: unknown) => {
          console.warn("Cursor sound could not start:", error);
        });
        return;
      }

      playTone("click");
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerdown", handlePointerDown);
      if (audioContext) {
        void audioContext.close().catch((error: unknown) => {
          console.warn("Cursor sound could not stop:", error);
        });
      }
    };
  }, []);

  return null;
}
