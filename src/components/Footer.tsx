
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-10">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Poehali.dev</span>
          </div>
          <p className="text-muted-foreground">
            Бесплатный генератор веб-сайтов с искусственным интеллектом.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-4">Продукт</h3>
          <ul className="space-y-2">
            <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Возможности</Link></li>
            <li><Link to="/templates" className="text-muted-foreground hover:text-foreground">Шаблоны</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Цены</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Компания</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">О нас</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Блог</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Контакты</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Правовая информация</h3>
          <ul className="space-y-2">
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Условия использования</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Политика конфиденциальности</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Poehali.dev. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
