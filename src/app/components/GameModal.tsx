"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Game } from "../data/games";
import { DialogContent, DialogTitle } from "@/app/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Play } from "lucide-react";

type Props = {
  game: Game;
  onClose: () => void;
};

export default function GameModal({ game }: Props) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video";
    src: string;
  }>(() => {
    return game.youtubeTrailerId
      ? { type: "video", src: game.youtubeTrailerId }
      : { type: "image", src: game.screenshots[0] };
  });

  const allMedia = [
    ...(game.youtubeTrailerId
      ? [{ type: "video" as const, src: game.youtubeTrailerId }]
      : []),
    ...game.screenshots.map((src) => ({ type: "image" as const, src })),
  ];

  return (
    <DialogContent
      className="border w-full text-white p-6 backdrop-blur-md bg-black/30 border-b border-white/10"
      size="xl"
    >
      <div>
        <DialogTitle>{game.title}. Общая информация об игре</DialogTitle>
      </div>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        {selectedMedia.type === "image" ? (
          <Image
            src={selectedMedia.src}
            alt="Selected media"
            fill
            className="object-contain"
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${selectedMedia.src}?autoplay=1&mute=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="flex md:flex-row gap-6">
        <div className="w-full flex flex-col justify-between">
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="px-1 py-2">
              {allMedia.map((media, i) => (
                <CarouselItem key={i} className="basis-1/3 md:basis-1/4">
                  <div
                    className="relative w-full h-24 rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setSelectedMedia(media)}
                  >
                    {media.type === "image" ? (
                      <Image
                        src={media.src}
                        alt={`Media ${i + 1}`}
                        fill
                        className={`object-cover transition-all ${
                          selectedMedia.src === media.src
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                        sizes="33vw, 25vw"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-black">
                        <Image
                          src={`https://img.youtube.com/vi/${media.src}/default.jpg`}
                          alt="YouTube thumbnail"
                          fill
                          className="object-cover opacity-75"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="text-red-500 w-8 h-8" />
                        </div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="space-y-3 mt-6">
            <h2 className="text-3xl font-bold">{game.title}</h2>
            <p className="text-gray-300">Издатель: {game.publisher}</p>
            <p className="text-gray-300">Дата выхода: {game.releaseDate}</p>
            {game.description && (
              <p className="text-gray-400 text-sm">{game.description}</p>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
