import { useState, useEffect } from 'react';
import { 
  Instagram, 
  Send, 
  Gift, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Flame, 
  ChevronDown, 
  Award, 
  Heart,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Users
} from 'lucide-react';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { ProductCatalog } from './components/ProductCatalog';
import { OrderForm } from './components/OrderForm';
import { ReviewBlock } from './components/ReviewBlock';
import { FaqBlock } from './components/FaqBlock';
import { Product } from './types';
import { PRODUCTS } from './data';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState<string | null>(null);

  // Set document title
  useEffect(() => {
    document.title = "Pastelería | Премиальная клубника в бельгийском шоколаде с доставкой в Ростове-на-Дону";
  }, []);

  // Live order notifications for social proof & highest conversion rates
  useEffect(() => {
    const notifications = [
      "Мария из г. Ростов-на-Дону только что заказала Duo Delight (12 ягод)!",
      "Игорь из г. Аксай оформил заказ на букет «Клубничное Облако» с открыткой!",
      "Анастасия из центра Ростова забрала 4-й слот доставки день-в-день!",
      "Дмитрий только что купил Mini-Box по промокоду SWEET10!",
      "Осталось всего 4 свободных интервала на доставку на сегодняшний вечер!"
    ];

    const interval = setTimeout(() => {
      setActiveNotification(notifications[0]);
    }, 5000);

    const loop = setInterval(() => {
      const randomMsg = notifications[Math.floor(Math.random() * notifications.length)];
      setActiveNotification(randomMsg);
      // Fade out after 6 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 6000);
    }, 18000);

    return () => {
      clearTimeout(interval);
      clearInterval(loop);
    };
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    // Smooth scroll to order form with offset
    const orderFormEl = document.getElementById('order-form-container');
    if (orderFormEl) {
      orderFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLeadMagnetSuccess = (promoCode: string) => {
    setPromoCodeApplied(promoCode);
    setTimeout(() => {
      // Prompt user to scroll or pre-populate order form
      const orderSection = document.getElementById('catalog-section');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  return (
    <div className="bg-[#FDFBF9] text-[#2D241E] font-sans antialiased min-h-screen selection:bg-[#E63946] selection:text-white pb-0">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 bg-[#FDFBF9]/90 backdrop-blur-md z-40 border-b border-[#2D241E]/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black font-serif italic tracking-tighter uppercase text-[#2D241E]">
              Pastelería
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest bg-[#E63946] text-white px-2 py-0.5 rounded-full">
              RND
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#2D241E]/70">
            <a href="#catalog-section" className="hover:text-[#E63946] transition-colors">Каталог</a>
            <a href="#problem-solution-section" className="hover:text-[#E63946] transition-colors">Почему мы</a>
            <a href="#creation-process-section" className="hover:text-[#E63946] transition-colors">Процесс</a>
            <a href="#reviews-section" className="hover:text-[#E63946] transition-colors">Отзывы</a>
            <a href="#faq-section" className="hover:text-[#E63946] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              id="header-tg-link"
              href="https://t.me/pasteleria_rnd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 border border-[#2D241E]/10 rounded-full flex items-center justify-center hover:bg-[#2D241E] hover:text-white transition-all hover:scale-105 text-xs font-semibold font-serif italic"
              title="Telegram"
            >
              TG
            </a>
            <a 
              id="header-ig-link"
              href="https://www.instagram.com/pasteleria.rnd?igsh=MW92aG5iOGFiM3dxag==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 border border-[#2D241E]/10 rounded-full flex items-center justify-center hover:bg-[#2D241E] hover:text-white transition-all hover:scale-105 text-xs font-semibold font-serif italic"
              title="Instagram"
            >
              IG
            </a>
            
            <a
              id="header-cta-btn"
              href="#order-form-container"
              className="bg-[#E63946] text-white px-4 py-2 rounded-full font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-[#d6303c] transition-colors shadow-sm cursor-pointer hidden sm:block"
            >
              Купить
            </a>
          </div>
        </div>
      </header>

      {/* STAGE 1: ATTENTION (AWARENESS) — FIRST SCREEN */}
      <section className="relative overflow-hidden bg-[#FDFBF9] py-12 md:py-20 border-b border-[#2D241E]/5">
        
        {/* Soft Background Art Deco Circles or Patterns */}
        <div className="absolute top-10 right-[-100px] w-[500px] h-[500px] rounded-full bg-[#F5E6D3] opacity-35 blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] rounded-full bg-red-100 opacity-20 blur-2xl z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-extrabold block mb-4 italic">
                ✨ Искусство, которое тает на губах
              </span>
              
              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-black text-[#2D241E] leading-[0.95] tracking-tight">
                Премиальный <br />
                <span className="text-[#E63946] italic font-normal">бельгийский</span>
                <br />
                шоколад & клубника
              </h1>

              <p className="text-sm md:text-base text-[#2D241E]/75 font-sans leading-relaxed mt-6 max-w-lg">
                Создаем изысканные съедобные шедевры ручной работы из <span className="font-bold text-[#2D241E]">свежайшей ягоды калибра А+</span> и подлинного шоколада <span className="font-semibold underline decoration-[#E63946]">Barry Callebaut</span>. Доставка по Ростову-на-Дону от 2 часов.
              </p>
            </div>

            {/* Quick stats tags to capture interest immediately */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-[#F5E6D3] px-3.5 py-1.5 rounded-full border border-[#D9C4AC]/40 text-xs font-sans text-[#2D241E] flex items-center gap-1.5">
                <Clock size={12} className="text-[#E63946]" />
                <span>День в день за 2 часа</span>
              </div>
              <div className="bg-[#F5E6D3] px-3.5 py-1.5 rounded-full border border-[#D9C4AC]/40 text-xs font-sans text-[#2D241E] flex items-center gap-1.5">
                <Award size={12} className="text-[#E63946]" />
                <span>100% Barry Callebaut</span>
              </div>
              <div className="bg-[#F5E6D3] px-3.5 py-1.5 rounded-full border border-[#D9C4AC]/40 text-xs font-sans text-[#2D241E] flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#E63946]" />
                <span>Декор сусальным золотом</span>
              </div>
            </div>

            {/* Interactive Lead Magnet trigger block */}
            <div className="bg-[#FEF2F2] p-6 rounded-3xl border border-[#FEE2E2] shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 translate-y-4 translate-x-2 text-8xl opacity-10 font-serif italic max-sm:hidden">
                10%
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E63946] text-white flex items-center justify-center shrink-0">
                  <Gift size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2D241E]">
                    Дарим гайд по свиданиям + купон на скидку -10%!
                  </h4>
                  <p className="text-xs text-[#2D241E]/70 mt-1 max-w-sm font-sans">
                    Перейдите по кнопке ниже, заберите иллюстрированную инструкцию с секретами идеальной сервировки и получите промокод на первый заказ.
                  </p>
                  
                  {promoCodeApplied ? (
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3.5 py-1.5 rounded-lg border border-green-200 text-[11px] font-bold">
                      <CheckCircle2 size={13} />
                      <span>Применен промокод {promoCodeApplied}! Скидка 10% активна в корзине.</span>
                    </div>
                  ) : (
                    <button 
                      id="hero-modal-trigger-btn"
                      onClick={() => setIsLeadMagnetOpen(true)}
                      className="mt-3.5 text-xs text-[#E63946] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                    >
                      <span>Получить подарок + скидку</span>
                      <span className="text-base">🎁</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* CTA anchors */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a 
                id="hero-order-anchor"
                href="#catalog-section"
                className="w-full sm:w-auto bg-[#E63946] text-white text-center py-4.5 px-8 rounded-xl font-sans font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#E63946]/20 hover:bg-[#d6303c] transition-all"
              >
                Выбрать свой шедевр
              </a>
              <span className="text-xs text-[#2D241E]/40 font-mono">или</span>
              <a 
                id="hero-direct-tg-chat"
                href="https://t.me/cheevchik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-[#2D241E] text-[#2D241E] text-center py-4.5 px-6 rounded-xl font-sans font-bold uppercase tracking-widest text-[11px] hover:bg-[#2D241E] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Send size={12} />
                <span>Написать в Telegram</span>
              </a>
            </div>
          </div>

          {/* Hero Right Media Area with Generated Strawberries box */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            
            {/* Visual Frame simulating a premium high-magazine cover */}
            <div className="border-[12px] border-white bg-white rounded-[40px] shadow-2xl relative overflow-hidden aspect-[4/3] w-full">
              <img 
                src="/src/assets/images/premium_strawberries_box_1782207312984.jpg" 
                alt="Изысканная клубника в бельгийском шоколаде Pastelería"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom text banner on physical frame */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 text-white flex justify-between items-end">
                <div>
                  <span className="text-[#E63946] font-serif italic text-sm font-semibold block mb-1">Шедевр Pastelería</span>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest">Ростов-на-Дону • Ручная работа</h4>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-2.5 rounded-lg text-right font-mono max-sm:hidden">
                  <span className="text-[10px] text-white/60 block uppercase">калибр</span>
                  <span className="text-xs font-bold">A+ PREMIUM</span>
                </div>
              </div>
            </div>

            {/* Float Badge 1 */}
            <div className="absolute top-4 right-4 bg-[#F5E6D3] text-[#2D241E] px-4 py-2 rounded-2xl border border-[#D9C4AC] text-xs font-serif font-bold shadow-md -rotate-6 max-sm:hidden">
              💝 «Дарите чувства, а не просто конфеты»
            </div>

            {/* Float Badge 2 */}
            <div className="absolute bottom-16 left-[-20px] bg-white text-[#2D241E] p-3 rounded-2xl shadow-lg border border-[#2D241E]/5 flex items-center gap-2 max-sm:hidden">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-mono uppercase font-bold text-green-700">Работаем СЕЙЧАС</span>
            </div>

          </div>

        </div>
      </section>

      {/* STAGE 2: INTEREST (PROBLEM & SOLUTION) — "Кому и для чего?" */}
      <section id="problem-solution-section" className="bg-[#F5E6D3]/40 py-20 border-b border-[#2D241E]/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Section heading */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">02. Interest & Empathy</span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-[#2D241E]">
              Когда банальные подарки больше не работают
            </h2>
            <p className="text-xs font-sans text-[#2D241E]/60 mt-3">
              Мы прекрасно понимаем, как сложно подарить что-то действительно красивое, запоминающееся и доставляющее подлинное удовольствие вашим близким.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pain / Problem Card 1 */}
            <div className="bg-[#FDFBF9] p-8 rounded-3xl border border-[#D9C4AC]/40 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E63946] flex items-center justify-center font-bold text-lg font-serif">
                ?
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Сложно удивить близкого человека?</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Цветы завянут через три дня, а обычные коробки конфет из супермаркета выглядят буднично и не передают глубину вашего внимания.
              </p>
              <div className="text-[10px] font-mono text-[#E63946] uppercase tracking-wider font-bold">
                ↳ Решение: Уникальный гастрономический дуэт эстетики и вкуса.
              </div>
            </div>

            {/* Pain / Problem Card 2 */}
            <div className="bg-[#FDFBF9] p-8 rounded-3xl border border-[#D9C4AC]/40 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E63946] flex items-center justify-center font-bold text-lg font-serif">
                ⏳
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Нужен подарок прямо сегодня?</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                До важного события осталось мало времени, а собирать подарок самостоятельно — это потратить полдня на поиски ягод и качественного шоколада.
              </p>
              <div className="text-[10px] font-mono text-[#E63946] uppercase tracking-wider font-bold">
                ↳ Решение: Доставим премиум-коробку за 2 часа прямо в руки получателю.
              </div>
            </div>

            {/* Pain / Problem Card 3 */}
            <div className="bg-[#FDFBF9] p-8 rounded-3xl border border-[#D9C4AC]/40 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E63946] flex items-center justify-center font-bold text-lg font-serif">
                🌱
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Переживаете за свежесть и глазурь?</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Многие производители используют химическую кондитерскую глазурь с заменителями какао-масла, которая не хрустит и оставляет жирный налет.
              </p>
              <div className="text-[10px] font-mono text-[#E63946] uppercase tracking-wider font-bold">
                ↳ Решение: 100% натуральный бельгийский шоколад Barry Callebaut.
              </div>
            </div>

          </div>

          {/* Solution showcase: Tactility & details */}
          <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl border border-[#D9C4AC]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[#E63946] text-xs font-mono font-bold uppercase tracking-wider block">Идеально для любого повода</span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#2D241E]">
                Подарок, который останется в памяти в виде восторженных эмоций
              </h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Каждая коробочка от <span className="font-bold">Pastelería</span> — это утонченная церемония. Шелковистая поверхность бельгийского шоколада, тонкий ягодный аромат спелой садовой клубники, хруст при каждом укусе и нежнейшее сливочное послевкусие. Это идеальный знак внимания для мамы, возлюбленной, сестры, коллеги или роскошное украшение романтического ужина на двоих.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 font-serif text-sm">
                <span className="flex items-center gap-1.5 font-bold"><span className="text-[#E63946]">✔</span> На день рождения</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="text-[#E63946]">✔</span> Для признания в любви</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="text-[#E63946]">✔</span> Романтическое свидание</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="text-[#E63946]">✔</span> Для извинения</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FDFBF9] p-6 rounded-2xl border border-[#2D241E]/5 space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <span className="text-xl">🌟</span>
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#2D241E]">Стандарты Pastelería</span>
              </div>
              <ul className="text-xs space-y-3 font-sans text-[#2D241E]/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#E63946] font-bold">🍓</span>
                  <span><strong>Калибровка:</strong> Отбираем строго одну к одной, идеальной конусовидной формы.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E63946] font-bold">🍫</span>
                  <span><strong>Темперирование:</strong> Шоколад готовится строго при температуре 31.8°C для глянцевого блеска и идеального хруста.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E63946] font-bold">📦</span>
                  <span><strong>Упаковка:</strong> Дизайнерские коробки с матовой лентой soft-touch, салфеткой и фирменным стильным пакетом.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* STAGE 2.5: ESTHETIC CREATION PROCESS BLOCK */}
      <section id="creation-process-section" className="py-20 bg-white border-b border-[#2D241E]/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">Секрет Экспертности</span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-[#2D241E]">
              Как рождается шедевр
            </h2>
            <p className="text-xs font-sans text-[#2D241E]/60 mt-3">
              Загляните за кулисы нашей кондитерской студии. 4 простых шага, гарантирующих непревзойденное качество десерта.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="space-y-3 relative">
              <span className="font-serif text-7xl font-light text-[#E63946]/20 block">01</span>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Утренний закуп ягод</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Каждый день в 7:00 утра наш шеф-кондитер лично отбирает ароматные спелые ягоды клубники у проверенных локальных фермеров Ростовской области.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 relative">
              <span className="font-serif text-7xl font-light text-[#E63946]/20 block">02</span>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Мягкая подготовка</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Ягоды аккуратно моются, сушатся холодным воздухом, чтобы защитить структуру чашелистика от увядания и сохранить первозданную свежесть ягодного сока.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 relative">
              <span className="font-serif text-7xl font-light text-[#E63946]/20 block">03</span>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Глазирование</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Каждая ягода погружается в расплавленный бельгийский шоколад Barry Callebaut. Мы наносим изысканный декор, ореховое пралине и сублимированные ягоды.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 relative">
              <span className="font-serif text-7xl font-light text-[#E63946]/20 block">04</span>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">Контроль и доставка</h3>
              <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed">
                Мы бережно упаковываем ваш набор, навязываем атласный бант, пишем открытку от руки и отправляем фото готовой работы в мессенджер перед вручением курьеру.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STAGE 3: DESIRE — EXPANSIVE INTERACTIVE CATALOG */}
      <section className="bg-[#FDFBF9] border-b border-[#2D241E]/5">
        <ProductCatalog onSelectProduct={handleSelectProduct} />
      </section>

      {/* STAGE 4: ACTION — INTERACTIVE 3-CLICK QUICK CHECKOUT */}
      <section id="order-form-section" className="py-20 bg-white border-b border-[#2D241E]/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <OrderForm 
            selectedProduct={selectedProduct} 
            onOrderSuccess={handleLeadMagnetSuccess}
          />

          {/* Alternate trust buttons / Alternative paths for sceptics */}
          <div className="mt-12 text-center max-w-xl mx-auto space-y-4">
            <p className="text-xs text-[#2D241E]/50 font-sans">
              * Сомневаетесь с выбором набора или хотите составить уникальную кастомную коробку по своим эскизам? Напишите нам напрямую:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                id="alt-checkout-tg"
                href="https://t.me/cheevchik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#2D241E] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={12} />
                <span>Telegram куратора</span>
              </a>

              <a 
                id="alt-checkout-ig"
                href="https://www.instagram.com/pasteleria.rnd?igsh=MW92aG5iOGFiM3dxag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-[#E63946] text-[#E63946] px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Instagram size={12} />
                <span>Наш Живой Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* STAGE 5: RETENTION, REVIEWS & FEEDBACK */}
      <section className="bg-[#FDFBF9]">
        <ReviewBlock />
      </section>

      {/* STAGE 5.5: FAQ ACCORDION SECTION */}
      <section className="bg-white border-t border-[#2D241E]/5">
        <FaqBlock />
      </section>

      {/* FULLY FUNCTIONAL NEWSLETTER / RETENTION BLOCK FOR IN-FIELD STICKINESS */}
      <section className="py-16 bg-[#2D241E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(230,57,70,0.15),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-6">
          <span className="text-[#E63946] text-xs uppercase tracking-[0.2em] font-sans font-bold block">Присоединяйтесь к эстетическому клубу</span>
          <h3 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            Оставайтесь в поле бренда
          </h3>
          <p className="text-xs md:text-sm text-white/70 max-w-xl mx-auto font-sans">
            Не готовы купить прямо сейчас? Подпишитесь на наши каналы в социальных сетях. Мы регулярно делимся секретными промокодами, праздничными акциями и эстетичными видео-уроками процесса декорирования ягод.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              id="retention-tg-btn"
              href="https://t.me/pasteleria_rnd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#E63946] text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-xs shadow-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={14} />
              <span>Канал в Telegram (скидки & акции)</span>
            </a>

            <a 
              id="retention-ig-btn"
              href="https://www.instagram.com/pasteleria.rnd?igsh=MW92aG5iOGFiM3dxag==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center justify-center gap-2"
            >
              <Instagram size={14} />
              <span>Смотреть Stories в Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#1C1613] text-[#FDFBF9]/80 border-t border-[#FDFBF9]/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-[#FDFBF9]/15">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-serif italic tracking-tighter uppercase text-white">
                  Pastelería
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest bg-[#E63946] text-white px-2 py-0.5 rounded-full">
                  RND
                </span>
              </div>
              <p className="text-[11px] text-[#FDFBF9]/50 font-sans mt-2">
                Эстетичный бутик клубники в бельгийском шоколаде Barry Callebaut. Ростов-на-Дону, Аксай, Батайск.
              </p>
            </div>

            <div className="flex gap-4">
              <a 
                id="footer-tg-item"
                href="https://t.me/pasteleria_rnd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center hover:scale-105 transition-all text-sm font-serif italic"
              >
                TG
              </a>
              <a 
                id="footer-ig-item"
                href="https://www.instagram.com/pasteleria.rnd?igsh=MW92aG5iOGFiM3dxag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center hover:scale-105 transition-all text-sm font-serif italic"
              >
                IG
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#FDFBF9]/40">
            <div>Handmade with love in Rostov-on-Don • © {new Date().getFullYear()} Pastelería</div>
            <div className="flex gap-6 wrap">
              <span className="hover:text-white cursor-pointer">Политика конфиденциальности</span>
              <span className="hover:text-white cursor-pointer">Публичная оферта</span>
            </div>
          </div>

        </div>
      </footer>

      {/* LEAD MAGNET POPUP MODAL */}
      <LeadMagnetModal 
        isOpen={isLeadMagnetOpen} 
        onClose={() => setIsLeadMagnetOpen(false)}
        onSuccess={handleLeadMagnetSuccess}
      />

      {/* FLOATING ACTION ICON FOR RETENTION - PULSES SOFTLY GIVING THE 10% DISCOUNT PROMISE */}
      <button 
        id="floating-retention-gift-btn"
        onClick={() => setIsLeadMagnetOpen(true)}
        className="fixed bottom-6 right-6 bg-[#E63946] text-white p-4 rounded-full shadow-2xl z-40 transition-transform hover:scale-110 active:scale-95 animate-bounce flex items-center justify-center"
        title="Получить подарок и скидку 10%"
      >
        <Gift size={22} />
        <span className="absolute -top-1 -right-1 bg-[#2D241E] text-[8px] font-mono font-bold tracking-widest uppercase text-white px-1.5 py-0.5 rounded-full ring-2 ring-white">
          -10%
        </span>
      </button>

      {/* SOCIAL NOTIFICATIONS - BOTTOM LEFT CORNER PROVING CONVERSION AND TRUST IN REALTIME */}
      {activeNotification && (
        <div 
          id="social-notification-toast"
          className="fixed bottom-6 left-6 bg-[#FDFBF9] border border-[#E63946]/30 p-4 rounded-2xl shadow-2xl z-40 max-w-xs md:max-w-sm transition-all duration-500 animate-fade-in flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#E63946] shrink-0 font-bold text-sm">
            🔔
          </div>
          <div className="text-[11px] leading-snug font-sans text-[#2D241E]">
            <strong className="block text-[#E63946] uppercase text-[9px] tracking-wider font-mono">Живой заказ с сайта</strong>
            <span>{activeNotification}</span>
          </div>
        </div>
      )}

    </div>
  );
}
