
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Sparkles, MoveRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Как это работает */}
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Опишите ваш сайт</h3>
              <p className="text-muted-foreground">Расскажите, что вы хотите. Подробное описание улучшит результаты.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ИИ генерирует код</h3>
              <p className="text-muted-foreground">Наш ИИ создаст полноценный сайт с оптимизированным кодом.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ваш сайт готов</h3>
              <p className="text-muted-foreground">Загрузите код или опубликуйте сайт прямо на нашей платформе.</p>
            </div>
          </div>
        </div>
        
        {/* Примеры шаблонов */}
        <div className="bg-muted py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Популярные шаблоны</h2>
              <Link to="/templates">
                <Button variant="outline" className="gap-2">
                  Все шаблоны <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <Tabs defaultValue="website" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="website">Сайты</TabsTrigger>
                <TabsTrigger value="landing">Лендинги</TabsTrigger>
                <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
                <TabsTrigger value="ecommerce">Магазины</TabsTrigger>
              </TabsList>
              <TabsContent value="website" className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden hover-scale">
                    <div className="aspect-[16/9] bg-black/5 flex items-center justify-center">
                      <img 
                        src="/placeholder.svg" 
                        alt={`Шаблон сайта ${i}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Бизнес-сайт {i}</h3>
                          <p className="text-sm text-muted-foreground">Корпоративный шаблон</p>
                        </div>
                        <Button size="sm" variant="ghost" className="gap-1">
                          Выбрать <MoveRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="landing" className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden hover-scale">
                    <div className="aspect-[16/9] bg-black/5 flex items-center justify-center">
                      <img 
                        src="/placeholder.svg" 
                        alt={`Шаблон лендинга ${i}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Лендинг {i}</h3>
                          <p className="text-sm text-muted-foreground">Продающая страница</p>
                        </div>
                        <Button size="sm" variant="ghost" className="gap-1">
                          Выбрать <MoveRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="portfolio">
                {/* Содержимое вкладки Портфолио */}
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Выберите вкладку "Сайты" или "Лендинги" для просмотра доступных шаблонов</p>
                </div>
              </TabsContent>
              <TabsContent value="ecommerce">
                {/* Содержимое вкладки Магазины */}
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Выберите вкладку "Сайты" или "Лендинги" для просмотра доступных шаблонов</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Отзывы */}
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Что говорят пользователи</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Анна Смирнова",
                role: "Фрилансер",
                text: "Poehali.dev помог мне создать потрясающий сайт-портфолио всего за несколько минут. Клиенты в восторге!"
              },
              {
                name: "Иван Петров",
                role: "Владелец малого бизнеса",
                text: "Никогда не думал, что смогу самостоятельно сделать такой профессиональный сайт для своей кофейни."
              },
              {
                name: "Елена Козлова",
                role: "Digital-маркетолог",
                text: "Использую Poehali.dev для быстрого создания лендингов для клиентов. Экономит мне массу времени и усилий."
              }
            ].map((review, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 mb-4">
                      <p className="italic text-muted-foreground">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы создать свой сайт?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Начните бесплатно прямо сейчас и создайте свой первый сайт за считанные минуты.
            </p>
            <Link to="/create">
              <Button size="lg" variant="secondary" className="gap-2">
                Создать бесплатно <Rocket className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
