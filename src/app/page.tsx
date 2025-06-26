"use client";

import { useState } from "react";
import { games as allGames, Game } from "./data/games";
import Filters from "./components/Filters";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";
import Header from "./components/Header";
import Image from "next/image";

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
      <Filters
        platforms={platforms}
        onPlatformChange={setPlatform}
        onSortChange={setSortOrder}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </main>
  );
}
