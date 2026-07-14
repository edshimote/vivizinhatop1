import { useEffect, useRef, useState } from "react";

const MUSIC_URL = "https://files.catbox.moe/wejzus.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    };

    tryPlay();

    const onInteract = () => {
      audio.play().then(() => setNeedsInteraction(false)).catch(() => {});
    };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  if (!needsInteraction) return null;

  return (
    <button
      type="button"
      onClick={() => {
        audioRef.current?.play().then(() => setNeedsInteraction(false)).catch(() => {});
      }}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
    >
      🔊 Tocar música
    </button>
  );
}
