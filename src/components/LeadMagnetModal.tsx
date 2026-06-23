import React, { useState } from 'react';
import { Gift, X, Check, ArrowRight, BookOpen } from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (promoCode: string) => void;
}

export function LeadMagnetModal({ isOpen, onClose, onSuccess }: LeadMagnetModalProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [promoCode] = useState('SWEET10');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitted(true);
    onSuccess(promoCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="lead-magnet-backdrop" className="fixed inset-0 bg-[#2D241E]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        id="lead-magnet-container"
        className="bg-[#FDFBF9] border-[6px] border-white text-[#2D241E] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Close Button */}
        <button 
          id="close-lead-magnet-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2D241E]/40 hover:text-[#2D241E] p-1 bg-[#2D241E]/5 hover:bg-[#2D241E]/10 rounded-full transition-colors"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {/* Top Accent Area */}
        <div id="lead-magnet-accent" className="bg-[#FEF2F2] p-8 text-center border-b border-[#2D241E]/5">
          <div className="w-16 h-16 bg-[#E63946] text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-md">
            <Gift size={28} />
          </div>
          <span className="text-[#E63946] text-xs uppercase tracking-[0.2em] font-sans font-bold block mb-2">Лид-магнит за подписку</span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#2D241E] leading-tight font-bold">
            Получите Подарок 🎁
          </h3>
          <p className="text-sm font-sans text-[#2D241E]/70 mt-2 max-w-[340px] mx-auto">
            Эксклюзивный гайд по идеальной сервировке романтического вечера и купон <span className="font-bold text-[#E63946]">-10% на первый заказ</span>!
          </p>
        </div>

        {/* Content Area */}
        <div id="lead-magnet-content-area" className="p-8">
          {!isSubmitted ? (
            <form id="lead-magnet-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] font-bold text-[#2D241E]/70 mb-2">
                  Ваш номер телефона (для связи в TG/WA)
                </label>
                <input 
                  id="lead-magnet-phone"
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/20 rounded-xl px-4 py-3 placeholder-[#2D241E]/40 font-sans focus:outline-none focus:border-[#E63946] text-sm transition-colors"
                />
              </div>

              <button 
                id="submit-lead-magnet-btn"
                type="submit"
                className="w-full bg-[#E63946] text-white py-4 rounded-xl font-sans font-semibold uppercase tracking-widest text-xs shadow-lg shadow-[#E63946]/10 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
              >
                <span>Забрать гайд в Telegram</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div id="lead-magnet-direct" className="text-center pt-2">
                <span className="text-[10px] text-[#2D241E]/40 block mb-1">или напишите напрямую:</span>
                <a 
                  id="direct-tg-bot"
                  href="https://t.me/cheevchik" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2D241E] hover:text-[#E63946] underline flex items-center justify-center gap-1"
                >
                  Написать в 1 клик
                </a>
              </div>
            </form>
          ) : (
            <div id="lead-magnet-success" className="text-center space-y-5 py-2">
              <div className="bg-[#F5E6D3] p-4 rounded-xl border border-[#D9C4AC]">
                <p className="text-[11px] uppercase tracking-wider text-[#2D241E]/60 font-bold mb-1">
                  Ваш персональный промокод:
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-2xl font-bold tracking-widest text-[#2D241E]">
                    {promoCode}
                  </span>
                  <button 
                    id="copy-promo-btn"
                    onClick={handleCopy}
                    className="p-1.5 bg-white border border-[#D9C4AC] rounded-lg hover:bg-[#FDFBF9] transition-colors"
                    title="Копировать код"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <BookOpen size={14} className="text-[#2D241E]" />}
                  </button>
                </div>
                <p className="text-[10px] text-green-700 font-bold mt-2">
                  {copied ? 'Код скопирован!' : 'Скопируйте и укажите при оформлении'}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-[#2D241E]/70">
                  🎁 Наш иллюстрированный PDF-гайд <span className="font-bold">«Гид по романтическому вечеру. Секреты сервировки и сочетаний с ягодами»</span> уже отправлен в ваш мессенджер Telegram!
                </p>
                
                <a 
                  id="lead-magnet-download-btn"
                  href="https://t.me/pasteleria_rnd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#2D241E] text-white px-6 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Получить гайд (TG)</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
