"use client";

import { useState } from "react";
import werkeData from "@/app/data/werke.json";

interface Werk {
  werk: string;
  komponist: string;
  jahr: string;
  kommentar: string;
  spotify: string;
}

const werke = werkeData as Werk[];
const SESSION_KEY = "klassik-entdecken-shown";

export default function Home() {
  const [aktuellesWerk, setAktuellesWerk] = useState<Werk | null>(null);

  const handleClick = () => {
    let shown: number[] = [];
    try {
      shown = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "[]");
    } catch {
      shown = [];
    }

    let verfuegbareIndizes = werke
      .map((_, i) => i)
      .filter((i) => !shown.includes(i));

    if (verfuegbareIndizes.length === 0) {
      shown = [];
      verfuegbareIndizes = werke.map((_, i) => i);
    }

    const zufallsIndex =
      verfuegbareIndizes[Math.floor(Math.random() * verfuegbareIndizes.length)];

    shown.push(zufallsIndex);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(shown));

    setAktuellesWerk(werke[zufallsIndex]);
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center bg-nachtblau bg-cover bg-center px-6 py-16"
      style={{ backgroundImage: "url('/App_Startseite.webp')" }}
    >
      <div className="absolute inset-0 bg-nachtblau/60" />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <button
          onClick={handleClick}
          className="border border-gold bg-gold px-12 py-[18px] font-sans text-[21px] font-bold uppercase tracking-widest text-nachtblau transition-colors duration-300 hover:bg-nachtblau hover:text-gold"
        >
          Jetzt ein Klassik-Werk entdecken
        </button>

        {aktuellesWerk && (
          <div className="mt-12 flex w-full flex-col items-center gap-4">
            <div className="h-px w-16 bg-gold" />

            <h1 className="font-serif text-4xl font-semibold text-gold sm:text-5xl">
              {aktuellesWerk.werk}
            </h1>

            <p className="font-serif text-3xl text-creme sm:text-4xl">
              {aktuellesWerk.komponist}
            </p>

            <p className="font-sans text-[21px] tracking-wide text-creme">
              {aktuellesWerk.jahr}
            </p>

            <p className="max-w-xl font-sans text-xl leading-relaxed text-creme/80">
              {aktuellesWerk.kommentar}
            </p>

            <a
              href={aktuellesWerk.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xl font-bold tracking-widest text-[#1ED760] hover:text-creme"
            >
              Werk auf Spotify hören
            </a>

            <div className="h-px w-16 bg-gold" />
          </div>
        )}
      </div>
    </main>
  );
}
