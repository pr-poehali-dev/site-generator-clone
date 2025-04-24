
import FeatureCard from "@/components/FeatureCard";
import { Wand2, Code, Globe, Zap, Brush, Repeat } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Wand2,
      title: "ИИ генерация",
      description: "Создавайте профессиональные сайты с помощью ИИ на основе вашего описания."
    },
    {
      icon: Code,
      title: "Чистый код",
      description: "Получайте оптимизированный код на React, TypeScript и Tailwind CSS."
    },
    {
      icon: Globe,
      title: "Мгновенная публикация",
      description: "Опубликуйте свой сайт одним кликом на собственном домене."
    },
    {
      icon: Zap,
      title: "Молниеносная скорость",
      description: "Сайты работают быстро благодаря современным технологиям и оптимизации."
    },
    {
      icon: Brush,
      title: "Полная кастомизация",
      description: "Настраивайте любые аспекты вашего сайта без ограничений."
    },
    {
      icon: Repeat,
      title: "Неограниченные доработки",
      description: "Бесконечно улучшайте и изменяйте свой сайт после генерации."
    }
  ];

  return (
    <div className="py-16 container">
      <h2 className="text-3xl font-bold text-center mb-10">Возможности Poehali.dev</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
