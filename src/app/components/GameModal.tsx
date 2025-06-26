import { Game } from "../data/games";

type Props = {
  game: Game;
  onClose: () => void;
};

export default function GameModal({ game, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          ✖
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{game.title}</h2>
        <p className="text-gray-300 mb-2">Издатель: {game.publisher}</p>
        <p className="text-gray-300 mb-2">Дата выхода: {game.releaseDate}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {game.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
