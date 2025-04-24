
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, Sparkles, Code, Globe, Copy, Download, Check, RefreshCw } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type SitePreview = {
  title: string;
  description: string;
  layout: string;
  colors: string[];
};

const DEMO_RESPONSES = [
  "Отлично! Я проанализирую ваш запрос и создам сайт на основе вашего описания.",
  "Я создаю дизайн главной страницы с учетом ваших пожеланий. Подбираю оптимальные цвета и шрифты для вашей аудитории.",
  "Генерирую компоненты сайта: шапка, основной контент и подвал. Оптимизирую для мобильных устройств.",
  "Сайт готов! Вы можете просмотреть код, предпросмотр или скачать готовый проект."
];

const CreateSite = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [generationStep, setGenerationStep] = useState(0);
  const [sitePreview, setSitePreview] = useState<SitePreview | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Автоматическая прокрутка чата
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Эмуляция прогресса генерации
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating]);
  
  // Эмуляция ответов ИИ
  useEffect(() => {
    if (isGenerating && progressValue >= 30 && generationStep < DEMO_RESPONSES.length) {
      const timeout = setTimeout(() => {
        addMessage("assistant", DEMO_RESPONSES[generationStep]);
        setGenerationStep(prev => prev + 1);
        
        // Когда все ответы отправлены, завершаем генерацию
        if (generationStep === DEMO_RESPONSES.length - 1) {
          setTimeout(() => {
            setIsGenerating(false);
            // Создаем предпросмотр сайта
            setSitePreview({
              title: "Мой новый сайт",
              description: input.substring(0, 100) + "...",
              layout: "landing",
              colors: ["#9b87f5", "#7E69AB", "#F2FCE2"]
            });
          }, 1000);
        }
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [isGenerating, progressValue, generationStep, input]);
  
  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isGenerating) return;
    
    // Добавляем сообщение пользователя
    addMessage("user", input);
    
    // Начинаем "генерацию"
    setIsGenerating(true);
    setProgressValue(0);
    setGenerationStep(0);
    setSitePreview(null);
    
    setInput("");
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(
      `// Пример кода сгенерированного сайта\nimport React from 'react';\n\nconst ${sitePreview?.title.replace(/\s+/g, '')} = () => {\n  return (\n    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">\n      <header className="container py-4">\n        <h1 className="text-2xl font-bold">${sitePreview?.title}</h1>\n      </header>\n      <main className="container py-8">\n        <p>${sitePreview?.description}</p>\n      </main>\n      <footer className="container py-4 text-muted-foreground">\n        &copy; 2023 ${sitePreview?.title}\n      </footer>\n    </div>\n  );\n};\n\nexport default ${sitePreview?.title.replace(/\s+/g, '')};`
    );
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Создание сайта с ИИ</h1>
        
        <div className="grid md:grid-cols-5 gap-6">
          {/* Левая колонка: чат с ИИ */}
          <div className="md:col-span-3 space-y-4">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Чат с ИИ-помощником</h2>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20">
                      <Sparkles className="h-8 w-8 mx-auto mb-4 text-primary/50" />
                      <p>Опишите сайт, который хотите создать...</p>
                      <p className="text-sm mt-2">Например: "Создай лендинг для кофейни с описанием меню и контактной формой"</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === "user" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
                
                {isGenerating && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Генерация сайта...</span>
                      <span>{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Опишите, какой сайт вы хотите создать..."
                    className="min-h-[80px] resize-none"
                    disabled={isGenerating}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-auto"
                    disabled={isGenerating || !input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Создай лендинг для кофейни с описанием меню и контактной формой")}
                disabled={isGenerating}
              >
                Лендинг для кофейни
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Сделай портфолио для фотографа с галереей и отзывами")}
                disabled={isGenerating}
              >
                Портфолио фотографа
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Разработай сайт для IT-компании с описанием услуг")}
                disabled={isGenerating}
              >
                Сайт IT-компании
              </Button>
            </div>
          </div>
          
          {/* Правая колонка: результат */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Результат</h2>
                </div>
                
                {sitePreview ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                      <div className="w-full h-full p-4 bg-gradient-to-b from-primary/10 to-accent/5">
                        <div className="w-full h-[30px] bg-background rounded-t-lg flex items-center px-3 gap-2">
                          <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                          <div className="flex-1 h-4 bg-muted-foreground/10 rounded ml-2"></div>
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-bold mb-2">{sitePreview.title}</h3>
                          <p className="text-xs text-muted-foreground">{sitePreview.description}</p>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="aspect-video bg-background/50 rounded"></div>
                            <div className="aspect-video bg-background/50 rounded"></div>
                            <div className="aspect-video bg-background/50 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="preview">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
                        <TabsTrigger value="code">Код</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preview" className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Название</div>
                            <div>{sitePreview.title}</div>
                          </div>
                          <Separator />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Тип</div>
                            <Badge variant="outline">{sitePreview.layout}</Badge>
                          </div>
                          <Separator />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Цвета</div>
                            <div className="flex gap-1">
                              {sitePreview.colors.map((color, i) => (
                                <div 
                                  key={i}
                                  className="w-5 h-5 rounded-full border" 
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <Separator />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 gap-2"
                            onClick={() => {
                              // Имитация скачивания
                              const link = document.createElement('a');
                              link.href = 'data:text/plain;charset=utf-8,';
                              link.download = `${sitePreview.title.replace(/\s+/g, '_')}.zip`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="h-4 w-4" /> Скачать
                          </Button>
                          <Button variant="outline" className="flex-1 gap-2">
                            <Globe className="h-4 w-4" /> Опубликовать
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="code">
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-[250px]">
                            <code>
                              {`// Пример кода сгенерированного сайта
import React from 'react';

const ${sitePreview.title.replace(/\s+/g, '')} = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <header className="container py-4">
        <h1 className="text-2xl font-bold">${sitePreview.title}</h1>
      </header>
      <main className="container py-8">
        <p>${sitePreview.description}</p>
      </main>
      <footer className="container py-4 text-muted-foreground">
        &copy; 2023 ${sitePreview.title}
      </footer>
    </div>
  );
};

export default ${sitePreview.title.replace(/\s+/g, '')};`}
                            </code>
                          </pre>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="absolute top-2 right-2 gap-1"
                            onClick={copyCode}
                          >
                            {showCopied ? (
                              <>
                                <Check className="h-3 w-3" /> Скопировано
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Копировать
                              </>
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-8 text-center text-muted-foreground">
                    <Code className="h-12 w-12 mx-auto mb-4 text-primary/30" />
                    <h3 className="text-lg font-medium mb-2">Нет активных проектов</h3>
                    <p className="mb-4">Опишите ваш сайт в чате и я сгенерирую его для вас</p>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => {
                        if (!isGenerating && messages.length > 0) {
                          // Сброс чата
                          setMessages([]);
                        }
                      }}
                      disabled={isGenerating || messages.length === 0}
                    >
                      <RefreshCw className="h-4 w-4" /> Начать заново
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Информация о возможностях */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Как работает генерация сайтов с ИИ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Опишите ваш сайт</h3>
                <p className="text-muted-foreground text-center">
                  Просто расскажите, какой сайт вы хотите создать. Чем детальнее будет описание, тем лучше результат.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">ИИ генерирует код</h3>
                <p className="text-muted-foreground text-center">
                  Наш ИИ автоматически создает структуру сайта, компоненты и стили на основе вашего описания.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Готовый сайт</h3>
                <p className="text-muted-foreground text-center">
                  Скачайте готовый код или опубликуйте сайт прямо на нашей платформе за считанные секунды.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateSite;
