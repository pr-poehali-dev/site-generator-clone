
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">
            Poehali.dev
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/templates">
            <Button variant="ghost">Шаблоны</Button>
          </Link>
          <Link to="/features">
            <Button variant="ghost">Возможности</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">О нас</Button>
          </Link>
          <Link to="/create">
            <Button>Создать сайт</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
