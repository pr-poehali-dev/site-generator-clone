
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, Sparkles, Code, Globe, Copy, Download, Check, RefreshCw, ExternalLink, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type SitePreview = {
  id: string;
  title: string;
  description: string;
  domain: string;
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  colors: string[];
  published: boolean;
};

// Имитация модели нейросети для генерации кода
class CodeGenerationModel {
  private static instance: CodeGenerationModel;
  private isLoaded: boolean = false;
  private loadingPromise: Promise<void> | null = null;

  private constructor() {
    this.loadingPromise = new Promise((resolve) => {
      // Имитация загрузки модели
      setTimeout(() => {
        this.isLoaded = true;
        resolve();
      }, 2000);
    });
  }

  public static getInstance(): CodeGenerationModel {
    if (!CodeGenerationModel.instance) {
      CodeGenerationModel.instance = new CodeGenerationModel();
    }
    return CodeGenerationModel.instance;
  }

  public async waitForLoad(): Promise<void> {
    return this.loadingPromise || Promise.resolve();
  }

  public async generateHTML(prompt: string): Promise<string> {
    if (!this.isLoaded) {
      await this.waitForLoad();
    }
    
    // Простые шаблоны на основе запроса
    const titleMatch = prompt.match(/([a-zа-яё\s]+)/i);
    const title = titleMatch ? titleMatch[0].trim() : "Мой сайт";
    
    // Определение типа сайта по ключевым словам
    const isLanding = prompt.toLowerCase().includes("лендинг");
    const isCafe = prompt.toLowerCase().includes("кофейн") || prompt.toLowerCase().includes("кафе");
    const isPortfolio = prompt.toLowerCase().includes("портфолио") || prompt.toLowerCase().includes("фотограф");
    const isIT = prompt.toLowerCase().includes("it") || prompt.toLowerCase().includes("компани");
    
    let html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${title}</div>
                <ul class="menu">
                    <li><a href="#main">Главная</a></li>
                    <li><a href="#about">О нас</a></li>`;
    
    if (isCafe) {
      html += `
                    <li><a href="#menu">Меню</a></li>`;
    } else if (isPortfolio) {
      html += `
                    <li><a href="#gallery">Галерея</a></li>`;
    } else if (isIT) {
      html += `
                    <li><a href="#services">Услуги</a></li>`;
    }
    
    html += `
                    <li><a href="#contacts">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <section id="main" class="hero">
        <div class="container">
            <h1>${title}</h1>
            <p>${this.generateDescription(prompt)}</p>
            <button class="cta-button">Связаться с нами</button>
        </div>
    </section>`;
    
    if (isCafe) {
      html += `
    <section id="menu" class="section">
        <div class="container">
            <h2>Наше меню</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <h3>Эспрессо</h3>
                    <p>Классический итальянский кофе</p>
                    <span class="price">200 ₽</span>
                </div>
                <div class="menu-item">
                    <h3>Капучино</h3>
                    <p>Эспрессо с молочной пенкой</p>
                    <span class="price">300 ₽</span>
                </div>
                <div class="menu-item">
                    <h3>Латте</h3>
                    <p>Кофе с большим количеством молока</p>
                    <span class="price">280 ₽</span>
                </div>
            </div>
        </div>
    </section>`;
    } else if (isPortfolio) {
      html += `
    <section id="gallery" class="section">
        <div class="container">
            <h2>Мои работы</h2>
            <div class="gallery-grid">
                <div class="gallery-item"><div class="placeholder"></div></div>
                <div class="gallery-item"><div class="placeholder"></div></div>
                <div class="gallery-item"><div class="placeholder"></div></div>
                <div class="gallery-item"><div class="placeholder"></div></div>
                <div class="gallery-item"><div class="placeholder"></div></div>
                <div class="gallery-item"><div class="placeholder"></div></div>
            </div>
        </div>
    </section>`;
    } else if (isIT) {
      html += `
    <section id="services" class="section">
        <div class="container">
            <h2>Наши услуги</h2>
            <div class="services-grid">
                <div class="service-item">
                    <div class="service-icon">💻</div>
                    <h3>Разработка сайтов</h3>
                    <p>Создаем современные веб-сайты любой сложности под ключ</p>
                </div>
                <div class="service-item">
                    <div class="service-icon">📱</div>
                    <h3>Мобильные приложения</h3>
                    <p>Разрабатываем нативные приложения для iOS и Android</p>
                </div>
                <div class="service-item">
                    <div class="service-icon">🔍</div>
                    <h3>SEO-продвижение</h3>
                    <p>Повышаем видимость вашего сайта в поисковых системах</p>
                </div>
            </div>
        </div>
    </section>`;
    }
    
    html += `
    <section id="about" class="section">
        <div class="container">
            <h2>О нас</h2>
            <p>${this.generateAbout(prompt)}</p>
        </div>
    </section>
    
    <section id="contacts" class="section">
        <div class="container">
            <h2>Контакты</h2>
            <div class="contact-form">
                <div class="form-group">
                    <label for="name">Имя</label>
                    <input type="text" id="name" placeholder="Ваше имя">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Ваш email">
                </div>
                <div class="form-group">
                    <label for="message">Сообщение</label>
                    <textarea id="message" placeholder="Ваше сообщение"></textarea>
                </div>
                <button type="submit" class="submit-button">Отправить</button>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="container">
            <p>&copy; 2023 ${title}. Все права защищены.</p>
        </div>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`;
    
    return html;
  }
  
  public async generateCSS(prompt: string): Promise<string> {
    if (!this.isLoaded) {
      await this.waitForLoad();
    }
    
    // Определение типа сайта по ключевым словам
    const isCafe = prompt.toLowerCase().includes("кофейн") || prompt.toLowerCase().includes("кафе");
    const isPortfolio = prompt.toLowerCase().includes("портфолио") || prompt.toLowerCase().includes("фотограф");
    const isIT = prompt.toLowerCase().includes("it") || prompt.toLowerCase().includes("компани");
    
    // Выбираем цветовую схему в зависимости от типа сайта
    let primaryColor = "#9b87f5";
    let secondaryColor = "#7E69AB";
    let accentColor = "#F2FCE2";
    
    if (isCafe) {
      primaryColor = "#6F4E37";
      secondaryColor = "#A67B5B";
      accentColor = "#F9F3DF";
    } else if (isPortfolio) {
      primaryColor = "#333333";
      secondaryColor = "#555555";
      accentColor = "#EEEEEE";
    } else if (isIT) {
      primaryColor = "#1EAEDB";
      secondaryColor = "#0FA0CE";
      accentColor = "#F6F6F7";
    }
    
    return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
header {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

.logo {
    font-size: 24px;
    font-weight: 700;
    color: ${primaryColor};
}

.menu {
    display: flex;
    list-style: none;
}

.menu li {
    margin-left: 30px;
}

.menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.menu a:hover {
    color: ${primaryColor};
}

/* Hero Section */
.hero {
    background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});
    color: white;
    padding: 100px 0;
    text-align: center;
}

.hero h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.hero p {
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto 30px;
}

.cta-button {
    background-color: white;
    color: ${primaryColor};
    border: none;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.cta-button:hover {
    background-color: ${accentColor};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Sections */
.section {
    padding: 80px 0;
}

h2 {
    font-size: 36px;
    margin-bottom: 40px;
    text-align: center;
    color: ${primaryColor};
}

${
  isCafe ? `
/* Menu Section */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.menu-item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 30px;
    transition: transform 0.3s;
}

.menu-item:hover {
    transform: translateY(-5px);
}

.menu-item h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: ${primaryColor};
}

.menu-item p {
    color: #666;
    margin-bottom: 15px;
}

.price {
    font-weight: 700;
    font-size: 18px;
    color: ${primaryColor};
}
` : isPortfolio ? `
/* Gallery Section */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.gallery-item {
    aspect-ratio: 3/2;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.placeholder {
    width: 100%;
    height: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
}

.placeholder::after {
    content: "Изображение";
    font-size: 14px;
}
` : isIT ? `
/* Services Section */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.service-item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    padding: 30px;
    text-align: center;
    transition: transform 0.3s;
}

.service-item:hover {
    transform: translateY(-5px);
}

.service-icon {
    font-size: 48px;
    margin-bottom: 20px;
}

.service-item h3 {
    font-size: 22px;
    margin-bottom: 15px;
    color: ${primaryColor};
}

.service-item p {
    color: #666;
}
` : ``
}

/* Contact Form */
.contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

textarea {
    min-height: 150px;
    resize: vertical;
}

.submit-button {
    background-color: ${primaryColor};
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: ${secondaryColor};
}

/* Footer */
footer {
    background-color: #333;
    color: white;
    padding: 30px 0;
    text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
    .menu {
        display: none;
    }
    
    .hero h1 {
        font-size: 36px;
    }
    
    .hero p {
        font-size: 16px;
    }
}`;
  }
  
  public async generateJS(): Promise<string> {
    if (!this.isLoaded) {
      await this.waitForLoad();
    }
    
    return `document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (nameInput.value && emailInput.value && messageInput.value) {
                alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }
    
    // Add some animation for elements when they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Add fade-in class for animation
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
});

// Add some styles for animations
const style = document.createElement('style');
style.textContent = \`
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
\`;
document.head.appendChild(style);`;
  }
  
  private generateDescription(prompt: string): string {
    // Определение типа сайта по ключевым словам
    if (prompt.toLowerCase().includes("кофейн") || prompt.toLowerCase().includes("кафе")) {
      return "Мы предлагаем лучший кофе в городе, приготовленный с любовью и заботой о каждой детали. Уютная атмосфера и профессиональные бариста ждут вас каждый день.";
    } else if (prompt.toLowerCase().includes("портфолио") || prompt.toLowerCase().includes("фотограф")) {
      return "Профессиональная фотосъемка любой сложности. Создаю незабываемые кадры, которые останутся с вами на всю жизнь. Портреты, свадьбы, репортажи и многое другое.";
    } else if (prompt.toLowerCase().includes("it") || prompt.toLowerCase().includes("компани")) {
      return "Мы создаем инновационные IT-решения, которые помогают бизнесу развиваться и достигать новых высот. Наша команда профессионалов готова решить любую задачу.";
    } else {
      return "Мы предлагаем качественные услуги и индивидуальный подход к каждому клиенту. Наша цель - ваш успех и удовлетворение от сотрудничества с нами.";
    }
  }
  
  private generateAbout(prompt: string): string {
    // Определение типа сайта по ключевым словам
    if (prompt.toLowerCase().includes("кофейн") || prompt.toLowerCase().includes("кафе")) {
      return "Наша кофейня была основана в 2018 году группой энтузиастов, влюбленных в кофе. Мы выбираем только лучшие зерна со всего мира и обжариваем их на собственном производстве. Каждая чашка кофе - это результат нашей страсти и профессионализма. Мы постоянно совершенствуем свои навыки, изучаем новые техники приготовления и стремимся сделать ваш день лучше с каждым глотком нашего кофе.";
    } else if (prompt.toLowerCase().includes("портфолио") || prompt.toLowerCase().includes("фотограф")) {
      return "Я профессиональный фотограф с более чем 8-летним опытом работы в различных жанрах фотографии. Моя страсть к фотографии началась еще в детстве и с тех пор превратилась в профессию. Я всегда стремлюсь запечатлеть не просто моменты, а эмоции и истории, которые стоят за каждым кадром. Моя работа - это не просто услуга, это искусство создания визуальных историй, которые останутся с вами навсегда.";
    } else if (prompt.toLowerCase().includes("it") || prompt.toLowerCase().includes("компани")) {
      return "Наша IT-компания была основана в 2015 году командой опытных разработчиков и дизайнеров. За годы работы мы успешно реализовали более 200 проектов для клиентов из различных отраслей бизнеса. Мы специализируемся на разработке веб-сайтов, мобильных приложений и комплексных IT-решений для бизнеса. Наша миссия - сделать технологии доступными и полезными для каждого бизнеса, независимо от его размера и сферы деятельности.";
    } else {
      return "Мы команда профессионалов с многолетним опытом работы в своей области. Наша компания была основана с целью предоставления качественных услуг и решений, которые помогают нашим клиентам достигать поставленных целей. Мы верим в индивидуальный подход к каждому проекту и стремимся к постоянному совершенствованию наших услуг. Доверьтесь нам, и мы превзойдем ваши ожидания!";
    }
  }
}

const CreateSite = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [generationStep, setGenerationStep] = useState(0);
  const [sitePreview, setSitePreview] = useState<SitePreview | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [siteName, setSiteName] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const model = useRef<CodeGenerationModel>(CodeGenerationModel.getInstance());
  
  // Загрузка модели при монтировании компонента
  useEffect(() => {
    const loadModel = async () => {
      await model.current.waitForLoad();
      setIsModelLoading(false);
    };
    
    loadModel();
  }, []);
  
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
          return prev + 2;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating]);
  
  // Генерация кода на основе запроса пользователя
  useEffect(() => {
    if (isGenerating && progressValue >= 30 && progressValue <= 85) {
      const generateSiteContent = async () => {
        try {
          // Получаем содержимое от модели
          const title = extractTitle(input);
          setSiteName(title);
          
          // Последовательно генерируем HTML, CSS и JS
          const html = await model.current.generateHTML(input);
          addMessage("assistant", "Генерирую HTML структуру сайта...");
          
          if (progressValue >= 50) {
            const css = await model.current.generateCSS(input);
            addMessage("assistant", "Создаю стили и визуальное оформление...");
            
            if (progressValue >= 70) {
              const js = await model.current.generateJS();
              addMessage("assistant", "Добавляю интерактивность и функциональность...");
              
              if (progressValue >= 85) {
                addMessage("assistant", "Сайт готов! Вы можете просмотреть код, предпросмотр или опубликовать его.");
                
                // Создаем превью сайта
                const randomId = Date.now().toString();
                setSitePreview({
                  id: randomId,
                  title: title,
                  description: input.substring(0, 100) + "...",
                  domain: generateDomain(title),
                  htmlContent: html,
                  cssContent: css,
                  jsContent: js,
                  colors: extractColors(css),
                  published: false
                });
                
                // Завершаем генерацию после 100%
                if (progressValue >= 95) {
                  setIsGenerating(false);
                }
              }
            }
          }
        } catch (error) {
          console.error("Ошибка генерации:", error);
          addMessage("assistant", "Произошла ошибка при генерации сайта. Пожалуйста, попробуйте еще раз.");
          setIsGenerating(false);
        }
      };
      
      generateSiteContent();
    }
  }, [isGenerating, progressValue, input]);
  
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
    
    if (!input.trim() || isGenerating || isModelLoading) return;
    
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
    if (!sitePreview) return;
    
    let codeToCopy = "";
    
    switch (activeTab) {
      case "html":
        codeToCopy = sitePreview.htmlContent;
        break;
      case "css":
        codeToCopy = sitePreview.cssContent;
        break;
      case "js":
        codeToCopy = sitePreview.jsContent;
        break;
      default:
        codeToCopy = sitePreview.htmlContent;
    }
    
    navigator.clipboard.writeText(codeToCopy);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  
  const publishSite = async () => {
    if (!sitePreview) return;
    
    setIsPublishing(true);
    
    // Имитация процесса публикации
    setTimeout(() => {
      setSitePreview(prev => {
        if (prev) {
          return { ...prev, published: true };
        }
        return prev;
      });
      setIsPublishing(false);
      addMessage("assistant", `Ваш сайт успешно опубликован по адресу ${sitePreview.domain}.demlite.site! Теперь он доступен всем в интернете.`);
    }, 3000);
  };
  
  // Вспомогательные функции
  const extractTitle = (prompt: string): string => {
    const titleMatch = prompt.match(/([a-zа-яё\s]+)/i);
    return titleMatch ? titleMatch[0].trim() : "Мой сайт";
  };
  
  const generateDomain = (title: string): string => {
    // Транслитерация и преобразование в домен
    const transliterated = title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[а-яё]/g, char => {
        const cyrillicToLatin: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
          'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return cyrillicToLatin[char] || char;
      });
    
    // Добавляем случайный хэш для уникальности
    const randomHash = Math.random().toString(36).substring(2, 7);
    return `${transliterated}-${randomHash}`;
  };
  
  const extractColors = (css: string): string[] => {
    const colorRegex = /#([0-9A-F]{3}){1,2}/ig;
    const matches = css.match(colorRegex) || [];
    // Возвращаем уникальные цвета (максимум 3)
    return [...new Set(matches)].slice(0, 3);
  };
  
  const renderPreviewIframe = () => {
    if (!sitePreview) return null;
    
    // Создаем документ для iframe
    const htmlContent = `
      ${sitePreview.htmlContent}
      <style>${sitePreview.cssContent}</style>
      <script>${sitePreview.jsContent}</script>
    `;
    
    return (
      <iframe
        title="Site Preview"
        className="w-full h-full border-0"
        srcDoc={htmlContent}
      />
    );
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
                    disabled={isGenerating || isModelLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-auto"
                    disabled={isGenerating || !input.trim() || isModelLoading}
                  >
                    {isModelLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </form>
                
                {isModelLoading && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Загрузка модели генерации...</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Создай лендинг для кофейни с описанием меню и контактной формой")}
                disabled={isGenerating || isModelLoading}
              >
                Лендинг для кофейни
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Сделай портфолио для фотографа с галереей и отзывами")}
                disabled={isGenerating || isModelLoading}
              >
                Портфолио фотографа
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput("Разработай сайт для IT-компании с описанием услуг")}
                disabled={isGenerating || isModelLoading}
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
                      {renderPreviewIframe()}
                    </div>
                    
                    <Tabs defaultValue="preview" onValueChange={value => {
                      if (value === "code") {
                        setActiveTab("html");
                      }
                    }}>
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
                        <TabsTrigger value="code">Код</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preview" className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Название</div>
                            <div className="max-w-[200px] truncate">{sitePreview.title}</div>
                          </div>
                          <Separator />
                        </div>
                        
                        {sitePreview.published && (
                          <div>
                            <div className="flex justify-between mb-2">
                              <div className="text-sm font-medium">Домен</div>
                              <a 
                                href={`https://${sitePreview.domain}.demlite.site`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                {sitePreview.domain}.demlite.site
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                            <Separator />
                          </div>
                        )}
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Цвета</div>
                            <div className="flex gap-1">
                              {sitePreview.colors.map((color, i) => (
                                <Popover key={i}>
                                  <PopoverTrigger>
                                    <div 
                                      className="w-5 h-5 rounded-full border cursor-pointer" 
                                      style={{ backgroundColor: color }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-2">
                                    {color}
                                  </PopoverContent>
                                </Popover>
                              ))}
                            </div>
                          </div>
                          <Separator />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Статус</div>
                            <Badge variant={sitePreview.published ? "success" : "outline"}>
                              {sitePreview.published ? "Опубликован" : "Черновик"}
                            </Badge>
                          </div>
                          <Separator />
                        </div>
                        
                        <div className="flex gap-2">
                          {sitePreview.published ? (
                            <Button 
                              className="flex-1 gap-2"
                              onClick={() => {
                                window.open(`https://${sitePreview.domain}.demlite.site`, "_blank");
                              }}
                            >
                              <ExternalLink className="h-4 w-4" /> Открыть сайт
                            </Button>
                          ) : (
                            <Button 
                              className="flex-1 gap-2"
                              onClick={publishSite}
                              disabled={isPublishing}
                            >
                              {isPublishing ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" /> Публикация...
                                </>
                              ) : (
                                <>
                                  <Globe className="h-4 w-4" /> Опубликовать
                                </>
                              )}
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            className="flex-1 gap-2"
                            onClick={() => {
                              // Сброс всего
                              setMessages([]);
                              setSitePreview(null);
                            }}
                          >
                            <RefreshCw className="h-4 w-4" /> Новый сайт
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="code">
                        <Tabs defaultValue="html" onValueChange={setActiveTab}>
                          <TabsList className="mb-2">
                            <TabsTrigger value="html">HTML</TabsTrigger>
                            <TabsTrigger value="css">CSS</TabsTrigger>
                            <TabsTrigger value="js">JavaScript</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-[300px]">
                            <code>
                              {activeTab === "html" && sitePreview.htmlContent}
                              {activeTab === "css" && sitePreview.cssContent}
                              {activeTab === "js" && sitePreview.jsContent}
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
          <h2 className="text-2xl font-bold mb-8 text-center">Создавайте и публикуйте сайты с DEMLITE SITES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Опишите ваш сайт</h3>
                <p className="text-muted-foreground text-center">
                  Просто расскажите, какой сайт вы хотите создать. Наш ИИ поймет ваши пожелания и превратит их в рабочий код.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Получите готовый код</h3>
                <p className="text-muted-foreground text-center">
                  Наш ИИ создаст чистый, современный HTML, CSS и JavaScript код, который вы можете использовать или изменить.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Опубликуйте бесплатно</h3>
                <p className="text-muted-foreground text-center">
                  Моментально опубликуйте свой сайт с бесплатным поддоменом yoursite.demlite.site без необходимости настройки.
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
