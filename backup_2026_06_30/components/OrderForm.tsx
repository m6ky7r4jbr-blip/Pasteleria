import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Send, CheckCircle, ExternalLink, RefreshCw, ShoppingCart } from 'lucide-react';

interface OrderFormProps {
  selectedProduct: Product | null;
  onOrderSuccess: (orderData: any) => void;
  promoCode?: string | null;
}

export function OrderForm({ selectedProduct, onOrderSuccess, promoCode }: OrderFormProps) {
  const [product, setProduct] = useState<Product>(PRODUCTS[2]); // Default classic 12
  const [toppings, setToppings] = useState<string[]>([]);
  
  // Persistent inputs to prevent data loss on page refresh
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('pasteleria_client_name') || '';
    } catch {
      return '';
    }
  });
  const [phone, setPhone] = useState(() => {
    try {
      return localStorage.getItem('pasteleria_client_phone') || '';
    } catch {
      return '';
    }
  });
  const [comment, setComment] = useState(() => {
    try {
      return localStorage.getItem('pasteleria_client_comment') || '';
    } catch {
      return '';
    }
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pasteleria_client_name', name);
      if (name || phone || comment) {
        setIsSavedLocally(true);
        const timer = setTimeout(() => setIsSavedLocally(false), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }, [name]);

  useEffect(() => {
    try {
      localStorage.setItem('pasteleria_client_phone', phone);
      if (name || phone || comment) {
        setIsSavedLocally(true);
        const timer = setTimeout(() => setIsSavedLocally(false), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }, [phone]);

  useEffect(() => {
    try {
      localStorage.setItem('pasteleria_client_comment', comment);
      if (name || phone || comment) {
        setIsSavedLocally(true);
        const timer = setTimeout(() => setIsSavedLocally(false), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }, [comment]);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      // Auto-populate default toppings
      setToppings(selectedProduct.toppings);
    }
  }, [selectedProduct]);

  const toggleTopping = (top: string) => {
    setToppings(prev => 
      prev.includes(top) 
        ? prev.filter(t => t !== top) 
        : [...prev, top]
    );
  };

  // Safe input sanitization to prevent injection
  const sanitize = (val: string) => {
    return val.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  // Dynamically calculate the 10% discount if a promo code is active
  const isDiscountActive = !!promoCode;
  const originalPrice = product.price;
  const finalPrice = isDiscountActive ? Math.round(originalPrice * 0.9) : originalPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitize(name);
    const cleanPhone = sanitize(phone);
    const cleanComment = sanitize(comment);

    if (!cleanName || !cleanPhone) return;

    const mockOrderId = 'PST-' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(mockOrderId);

    const orderDetails = {
      orderId: mockOrderId,
      productName: product.name,
      originalPrice,
      price: finalPrice,
      toppings,
      clientName: cleanName,
      clientPhone: cleanPhone,
      comment: cleanComment,
      date: new Date().toLocaleDateString('ru-RU'),
      promoCodeApplied: promoCode || null
    };

    // Clean up draft on successful order
    try {
      localStorage.removeItem('pasteleria_client_name');
      localStorage.removeItem('pasteleria_client_phone');
      localStorage.removeItem('pasteleria_client_comment');
    } catch (e) {
      console.warn(e);
    }

    setSubmitted(true);
    onOrderSuccess(orderDetails);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setComment('');
    setSubmitted(false);
    try {
      localStorage.removeItem('pasteleria_client_name');
      localStorage.removeItem('pasteleria_client_phone');
      localStorage.removeItem('pasteleria_client_comment');
    } catch (e) {
      console.warn(e);
    }
  };

  // Generate a juicy Telegram redirect URL with pre-filled message text
  const getTelegramHref = () => {
    const cleanName = sanitize(name);
    const cleanPhone = sanitize(phone);
    const cleanComment = sanitize(comment);
    
    const text = `Привет, Pastelería! Хочу сделать заказ:\n` +
      `- Набор: *${product.name}*\n` +
      `- Дополнения: ${toppings.join(', ') || 'Стандартные'}\n` +
      `- Имя: ${cleanName}\n` +
      `- Телефон: ${cleanPhone}\n` +
      `- Пожелания: ${cleanComment || 'нет'}\n` +
      `- Цена: ${finalPrice} ₽${isDiscountActive ? ` (со скидкой 10% по промокоду ${promoCode})` : ''}\n\n` +
      `Жду подтверждения заказа!`;
    return `https://t.me/cheevchik?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="order-form-container" className="bg-[#F5E6D3] rounded-3xl p-8 md:p-12 border border-[#D9C4AC] max-w-3xl mx-auto shadow-md">
      {!submitted ? (
        <form id="landing-order-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">04. Action & Checkout</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#2D241E]">
              Быстрый Заказ в 3 Клика
            </h3>
            <p className="text-xs font-sans text-[#2D241E]/70 mt-2">
              Заполните простую экспресс-форму. Мы моментально свяжемся с вами в Telegram или по телефону для подтверждения деталей десерта.
            </p>
          </div>

          {/* CLICK 1: SELECT PRODUCT */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.1em] font-bold text-[#2D241E]/80">
              Шаг 1: Выберите ваш набор или букет
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => {
                    setProduct(p);
                    setToppings(p.toppings);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs outline-none ${
                    product.id === p.id 
                      ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm' 
                      : 'bg-white text-[#2D241E] border-[#2D241E]/10 hover:border-[#2D241E]/30 bg-opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{p.image}</span>
                    <div>
                      <span className="font-bold block tracking-tight">{p.name}</span>
                      <span className={`text-[10px] ${product.id === p.id ? 'text-white/60' : 'text-[#2D241E]/50'}`}>
                        {p.ягоды} ягод • {p.price} ₽
                      </span>
                    </div>
                  </div>
                  {product.id === p.id && (
                    <span className="w-2 h-2 rounded-full bg-[#E63946] block animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* HIGHLIGHT PRODUCT CUSTOM TACTILITY */}
          {product && (
            <div className="p-4 bg-white/50 border border-[#D9C4AC]/40 rounded-2xl relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D241E]/70 block mb-2">
                Шаг 2: Персонализация вашего набора
              </span>
              <p className="text-[11px] text-[#2D241E]/60 mb-3">
                Выберите топпинги и текстурные посыпки, которые наши кондитеры нанесут вручную:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.toppings.map((top) => {
                  const isChecked = toppings.includes(top);
                  return (
                    <button
                      type="button"
                      key={top}
                      onClick={() => toggleTopping(top)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-sans font-medium transition-all ${
                        isChecked 
                          ? 'bg-[#E63946] text-white border-[#E63946] shadow-sm' 
                          : 'bg-white text-[#2D241E]/70 border-[#2D241E]/10 hover:border-[#2D241E]/30'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {top}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CLICK 2: CLIENT DETAILS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="block text-xs uppercase tracking-[0.1em] font-bold text-[#2D241E]/80">
                Шаг 3: Ваши контактные данные
              </span>
              {isSavedLocally && (
                <span className="text-[10px] font-mono text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200/50 flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Черновик сохранен
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2D241E]/60 mb-1.5">
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Как к вам обращаться?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/20 rounded-xl px-4 py-3 placeholder-[#2D241E]/40 font-sans focus:outline-none focus:border-[#E63946] text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#2D241E]/60 mb-1.5">
                  Номер мобильного телефона
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val === '8' || val === '7') {
                      val = '+7';
                    } else if (val.startsWith('8') && !val.startsWith('+7') && val.length > 1) {
                      val = '+7' + val.substring(1);
                    } else if (val.startsWith('7') && !val.startsWith('+7') && val.length > 1) {
                      val = '+7' + val.substring(1);
                    }
                    setPhone(val);
                  }}
                  className="w-full bg-white border border-[#2D241E]/20 rounded-xl px-4 py-3 placeholder-[#2D241E]/40 font-sans focus:outline-none focus:border-[#E63946] text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#2D241E]/60 mb-1.5">
                Пожелания к заказу (текст открытки, адрес, время или замена посыпок)
              </label>
              <textarea
                rows={2}
                placeholder="Напишите здесь важные примечания..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border border-[#2D241E]/20 rounded-xl px-4 py-3 placeholder-[#2D241E]/40 font-sans focus:outline-none focus:border-[#E63946] text-sm transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* SUBMIT BUTTON - CLICK 3 */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#2D241E]/40 block">Итого к оплате:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-extrabold text-[#2D241E]">
                  {finalPrice.toLocaleString('ru-RU')} ₽
                </span>
                {isDiscountActive && (
                  <span className="text-xs text-[#2D241E]/40 line-through">
                    {originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
            </div>

            <button
              id="submit-checkout-btn"
              type="submit"
              className="w-full sm:w-auto bg-[#E63946] text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#E63946]/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Подтвердить и отправить заказ</span>
              <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>
      ) : (
        <div id="order-success-screen" className="text-center py-8 space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle size={42} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Заказ {orderId} успешно создан!
            </span>
            <h4 className="font-serif text-3xl font-bold text-[#2D241E]">
              {name}, спасибо за ваш вкусный выбор!
            </h4>
            <p className="text-sm text-[#2D241E]/70 max-w-sm mx-auto">
              Мы уже получили вашу заявку на <span className="font-bold">{product.name}</span>. Наш кондитеры приступают к отбору ягод!
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#D9C4AC]/40 text-left max-w-sm mx-auto space-y-2 text-xs">
            <p className="border-b border-[#2D241E]/5 pb-2"><strong>Ваш набор:</strong> {product.name}</p>
            <p className="border-b border-[#2D241E]/5 pb-2"><strong>Декор:</strong> {toppings.length > 0 ? toppings.join(', ') : 'Классический'}</p>
            <p className="border-b border-[#2D241E]/5 pb-2"><strong>Контакты:</strong> {phone}</p>
            <p>
              <strong>Сумма:</strong>{' '}
              {isDiscountActive ? (
                <span>
                  <span className="font-bold text-green-600">{finalPrice} ₽</span>{' '}
                  <span className="line-through text-gray-400 text-[10px]">{originalPrice} ₽</span> (промокод применен)
                </span>
              ) : (
                <span>{originalPrice} ₽</span>
              )}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="tg-success-btn"
              href={getTelegramHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#E63946] text-white px-6 py-4 rounded-xl font-sans font-bold uppercase tracking-wider text-xs shadow-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <span>Перейти в Telegram-чат</span>
              <ExternalLink size={12} />
            </a>

            <button
              id="new-order-btn"
              onClick={handleReset}
              className="w-full sm:w-auto border border-[#2D241E] text-[#2D241E] px-6 py-4 rounded-xl font-sans font-bold uppercase tracking-wider text-xs hover:bg-[#2D241E] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={12} />
              <span>Сделать новый заказ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
