import { Button } from "@/app/components/ui/button";
import { Gamepad2, ShoppingBasket } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-15 flex items-center py-3.5 px-7 backdrop-blur-md bg-black/30 border-b border-white/10 z-50">
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <Button variant="ghost" className="w-20">
            Лого
            <Gamepad2 />
          </Button>
          <Button variant="ghost" className="w-20">
            Каталог
          </Button>
          <Button variant="ghost" className="w-20">
            Блог
          </Button>
          <Button variant="ghost" className="w-20">
            О нас
          </Button>
        </div>
        <Button variant="ghost" className="w-15">
          <ShoppingBasket />
        </Button>
      </div>
    </header>
  );
}
