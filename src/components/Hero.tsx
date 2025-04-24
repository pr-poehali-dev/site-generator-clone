
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-background to-muted py-20 text-center">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Создавайте потрясающие сайты <span className="text-primary">бесплатно</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          DEMLITE SITES — бесплатный генератор веб-сайтов с искусственным интеллектом. 
          Создавайте профессиональные сайты за считанные минуты и публикуйте их бесплатно!
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/create">
            <Button size="lg" className="animate-pulse">
              Начать бесплатно
            </Button>
          </Link>
          <Link to="/templates">
            <Button size="lg" variant="outline">
              Просмотреть шаблоны
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
