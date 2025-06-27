"use client";

import { useState } from "react";
import { games as allGames, Game } from "./data/games";
import Filters from "./components/Filters";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";
import Header from "./components/Header";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import Image from "next/image";
import { Oi } from "next/font/google";

const oiFont = Oi({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  const [platform, setPlatform] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = allGames
    .filter((game) => !platform || game.platform === platform)
    .sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    );

  const platforms = Array.from(new Set(allGames.map((g) => g.platform)));

  return (
    <main className="relative min-h-screen text-white pb-12 px-15 pt-15">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/backgroundImage.jpg"
          alt="Background"
          fill
          quality={80}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Header />

      <div className="w-full text-left my-8">
        <div className="inline-block">
          <p
            className={`${oiFont.className} text-lg md:text-xl font-mono mb-2 bg-gradient-to-r from-yellow-400 via-red-500 bg-clip-text text-transparent`}
          >
            TIME TO REMEMBER
          </p>
          <h1
            className={`${oiFont.className} text-5xl md:text-7xl bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent`}
          >
            Топ-10 игр 2014 года
          </h1>
        </div>
      </div>

      <Filters
        platforms={platforms}
        onPlatformChange={setPlatform}
        onSortChange={setSortOrder}
      />

      {platform && (
        <div className="mt-6 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white/80">
            Самое лучшее на {platform}
          </h2>
        </div>
      )}

      <div className="w-full">
        <Dialog
          open={!!selectedGame}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedGame(null);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {filteredGames.map((game) => (
              <DialogTrigger asChild key={game.id}>
                <div onClick={() => setSelectedGame(game)}>
                  <GameCard game={game} onClick={() => {}} />
                </div>
              </DialogTrigger>
            ))}
          </div>

          {selectedGame && (
            <GameModal
              game={selectedGame}
              onClose={() => setSelectedGame(null)}
            />
          )}
        </Dialog>
      </div>
    </main>
  );
}
