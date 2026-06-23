import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FaqBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq-section" className="py-16 max-w-4xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">Вопросы и Ответы</span>
        <h2 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-[#2D241E]">
          Остались вопросы? <br />Мы ответили на них!
        </h2>
        <p className="text-xs font-sans text-[#2D241E]/60 mt-3">
          Всё самое важное о сроках, правильном хранении и условиях доставки по Ростову-на-Дону, чтобы вы получили максимум удовольствия.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div 
              key={idx}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-[#E63946] shadow-sm' 
                  : 'bg-[#FDFBF9] border-[#2D241E]/10 hover:border-[#2D241E]/20'
              }`}
            >
              <button
                id={`faq-toggle-${idx}`}
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#2D241E] cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className={isOpen ? 'text-[#E63946]' : 'text-[#2D241E]/40'} />
                  <span>{item.question}</span>
                </div>
                <span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-[#E63946]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#2D241E]/40" />
                  )}
                </span>
              </button>

              {/* Animated Expansion */}
              <div 
                id={`faq-answer-${idx}`}
                className={`transition-all duration-300 ease-in-out px-6 pb-5 text-xs text-[#2D241E]/70 leading-relaxed font-sans ${
                  isOpen ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <p className="whitespace-pre-line border-t border-[#2D241E]/5 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
