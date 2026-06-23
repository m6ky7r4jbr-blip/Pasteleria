import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Sparkles, Leaf, ShieldCheck, ShoppingCart, ShoppingBag, Flame } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [filter, setFilter] = useState<'all' | 'boxes' | 'bouquets'>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });

  // Urgency Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 0, seconds: 0 }; // Loop simulation
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  const filteredProducts = PRODUCTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'boxes') return !p.name.includes('Букет');
    if (filter === 'bouquets') return p.name.includes('Букет');
    return true;
  });

  return (
    <div id="catalog-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Dynamic Urgency / Scarcity Banner */}
      <div 
        id="scarcity-urgency-banner"
        className="bg-gradient-to-r from-[#2D241E] to-[#E63946] text-white p-6 rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
            <Flame size={24} className="text-[#FFB0B0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
              <p className="text-xs uppercase tracking-widest font-sans font-bold text-red-200">Срочно на сегодня</p>
            </div>
            <h4 className="font-serif text-xl md:text-2xl font-bold mt-1">Осталось всего 5 свободных слотов!</h4>
            <p className="text-xs text-white/80 font-sans mt-0.5">После закрытия слотов заказы принимаются на завтра.</p>
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3 bg-black/20 px-5 py-3 rounded-2xl border border-white/10 relative z-10 font-mono">
          <div className="text-center">
            <span className="block text-2xl font-extrabold">{formatTime(timeLeft.hours)}</span>
            <span className="text-[9px] uppercase tracking-widest text-white/60">Час</span>
          </div>
          <span className="text-xl font-bold mb-3">:</span>
          <div className="text-center">
            <span className="block text-2xl font-extrabold">{formatTime(timeLeft.minutes)}</span>
            <span className="text-[9px] uppercase tracking-widest text-white/60">Мин</span>
          </div>
          <span className="text-xl font-bold mb-3">:</span>
          <div className="text-center">
            <span className="block text-2xl font-extrabold">{formatTime(timeLeft.seconds)}</span>
            <span className="text-[9px] uppercase tracking-widest text-white/60">Сек</span>
          </div>
        </div>
      </div>

      {/* Header and Filter Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#2D241E]/10 pb-6">
        <div>
          <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">03. Desire & Choice</span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-[#2D241E]">
            Вкусите Истинное Совершенство
          </h2>
          <p className="text-sm font-sans text-[#2D241E]/60 mt-2 max-w-xl">
            Коллекция наборов и букетов из отборных свежих ягод садовой клубники, укрытых хрустящей бельгийской вуалью Barry Callebaut. Укажите топпинги при заказе!
          </p>
        </div>

        <div className="flex bg-[#F5E6D3] p-1.5 rounded-full border border-[#D9C4AC]">
          <button 
            id="filter-all-btn"
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'all' ? 'bg-[#2D241E] text-white shadow-md' : 'text-[#2D241E]/60 hover:text-[#2D241E]'
            }`}
          >
            Все
          </button>
          <button 
            id="filter-boxes-btn"
            onClick={() => setFilter('boxes')}
            className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'boxes' ? 'bg-[#2D241E] text-white shadow-md' : 'text-[#2D241E]/60 hover:text-[#2D241E]'
            }`}
          >
            Наборы
          </button>
          <button 
            id="filter-bouquets-btn"
            onClick={() => setFilter('bouquets')}
            className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
              filter === 'bouquets' ? 'bg-[#2D241E] text-white shadow-md' : 'text-[#2D241E]/60 hover:text-[#2D241E]'
            }`}
          >
            Букеты
          </button>
        </div>
      </div>

      {/* Grid of Catalog Cards */}
      <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isTripwire = product.id === 'tripwire-4';
          return (
            <div 
              key={product.id}
              className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group relative shadow-sm ${
                isTripwire 
                  ? 'border-[#E63946] shadow-md ring-1 ring-[#E63946]/30' 
                  : 'border-[#2D241E]/10 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Product Badge / Tag */}
              {product.tag && (
                <div className="absolute top-4 left-4 z-40">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider ${
                    isTripwire 
                      ? 'bg-[#E63946] text-white shadow-sm ring-2 ring-white/20' 
                      : 'bg-[#2D241E] text-white'
                  }`}>
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Number of berries Badge */}
              <div className="absolute top-4 right-4 z-40 bg-[#FDFBF9] border border-[#2D241E]/10 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="text-xs">🍓</span>
                <span className="text-[10px] font-sans font-bold text-[#2D241E]">{product.ягоды} шт</span>
              </div>

              {/* Image Area */}
              <div className="aspect-[4/3] bg-[#FDFBF9] border-b border-[#2D241E]/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/15 to-transparent z-10"></div>
                
                {/* Micro visual representation */}
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500 z-20">
                  {product.image}
                </div>

                {isTripwire && (
                  <div className="absolute bottom-3 left-3 right-3 bg-red-50 text-[#E63946] py-1 px-3 rounded-lg text-[10px] uppercase font-bold tracking-wider text-center z-25 border border-red-100">
                    🔥 ЛЕГКИЙ ШАГ: Попробуйте качество за минимальную цену!
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#2D241E] group-hover:text-[#E63946] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs font-sans text-[#2D241E]/70 leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Toppings bullet points - highlights tactile details */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-[#2D241E]/50 uppercase tracking-wider block mb-2">Декор и дополнения:</span>
                    <ul className="flex flex-wrap gap-1.5">
                      {product.toppings.map((top, idx) => (
                        <li key={idx} className="bg-[#F5E6D3]/60 text-[#2D241E] text-[10px] px-2.5 py-1 rounded-full font-sans flex items-center gap-1 border border-[#D9C4AC]/20">
                          <span className="w-1 h-1 bg-[#E63946] rounded-full"></span>
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer */}
                <div className="pt-4 border-t border-[#2D241E]/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-black text-[#2D241E]">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-[#2D241E]/40 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-[#2D241E]/40 font-sans uppercase block mt-0.5">Включая премиум-коробку</span>
                  </div>

                  <button 
                    id={`buy-btn-${product.id}`}
                    onClick={() => onSelectProduct(product)}
                    className={`flex items-center gap-1.5 px-5 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all ${
                      isTripwire 
                        ? 'bg-[#E63946] text-white hover:bg-[#d6303c] shadow-lg shadow-[#E63946]/20'
                        : 'bg-[#2D241E] text-white hover:bg-black'
                    }`}
                  >
                    <ShoppingBag size={13} />
                    <span>Выбрать</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety elements right after catalog */}
      <div id="guarantees" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-[#2D241E]/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#E63946] shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h5 className="font-serif text-base font-bold text-[#2D241E]">Только свежая клубника</h5>
            <p className="text-xs text-[#2D241E]/60 mt-1">
              Закупаем ягоду каждое утро. Соблюдаем идеальную гладкость и калибр каждой клубники без компромиссов.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#E63946] shrink-0">
            <Leaf size={18} />
          </div>
          <div>
            <h5 className="font-serif text-base font-bold text-[#2D241E]">Профессиональный Barry Callebaut</h5>
            <p className="text-xs text-[#2D241E]/60 mt-1">
              Настоящие бельгийские какао-бобы, сливочное масло, утонченный изысканный вкус на контрасте сочной ягоды.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#E63946] shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h5 className="font-serif text-base font-bold text-[#2D241E]">Контроль и гарантия сервиса</h5>
            <p className="text-xs text-[#2D241E]/60 mt-1">
              Присылаем реальное фото готового набора перед отправкой в мессенджер. Вы всегда спокойны за результат!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
