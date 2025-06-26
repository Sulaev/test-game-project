import { Game } from "../data/games";

type Props = {
  game: Game;
  onClick: () => void;
};

export default function GameCard({ game, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className=" p-4 rounded-lg cursor-pointer hover:scale-105 transition backdrop-blur-md bg-black/30 border-b border-white/10"
    >
      <img
        src={game.cover}
        alt={game.title}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg text-white font-bold">{game.title}</h3>
      <p className="text-sm text-gray-400">
        {game.genre} | {game.platform}
      </p>
      <p className="text-sm text-gray-300 mt-2">{game.description}</p>
      <p className="text-yellow-400 mt-2 font-bold">Рейтинг: {game.rating}</p>
    </div>
  );
}
