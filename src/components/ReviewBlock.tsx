import { REVIEWS } from '../data';
import { Star, MessageSquareCode, Instagram, Send, Heart, ShieldCheck } from 'lucide-react';

export function ReviewBlock() {
  return (
    <div id="reviews-section" className="py-16 bg-[#FDFBF9] border-t border-[#2D241E]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[#E63946] text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2 italic">05. Trust & Social Proof</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D241E]">
            Живые Заказы — Искренние Эмоции
          </h2>
          <p className="text-xs font-sans text-[#2D241E]/60 mt-3">
            Мы бережно собираем каждый скриншот и текстовое сообщение от наших клиентов из Ростова-на-Дону. Листайте и убедитесь в качестве лично!
          </p>
        </div>

        {/* Outer containers simulating screenshot cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => {
            const isInstagram = idx % 2 === 0;

            return (
              <div 
                key={review.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                  isInstagram 
                    ? 'border-[#E63946]/20 hover:border-[#E63946]/40 shadow-sm hover:shadow-md'
                    : 'border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Platform Badge mockup */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#2D241E]/5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{review.avatar}</span>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#2D241E] flex items-center gap-1">
                        {review.author}
                        <ShieldCheck size={11} className="text-green-600" />
                      </h4>
                      <p className="text-[10px] text-[#2D241E]/40">{review.city} • {review.date}</p>
                    </div>
                  </div>

                  {isInstagram ? (
                    <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-1.5 rounded-xl flex items-center justify-center" title="Отзыв из Instagram">
                      <Instagram size={14} />
                    </div>
                  ) : (
                    <div className="bg-[#229ED9] text-white p-1.5 rounded-xl flex items-center justify-center" title="Сообщение из Telegram">
                      <Send size={14} className="scale-90" />
                    </div>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#E63946] text-[#E63946]" />
                  ))}
                </div>

                {/* Review message text inside a simulator bubble */}
                <div className={`p-4 rounded-2xl flex-1 text-xs leading-relaxed font-serif italic text-[#2D241E]/80 mb-4 ${
                  isInstagram ? 'bg-[#FFF5F5] border border-[#FFE4E4]' : 'bg-[#F2F8FC] border border-[#E1EEF6]'
                }`}>
                  «{review.text}»
                </div>

                {/* Footer with username or interaction */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#2D241E]/50 uppercase tracking-wider pt-2 border-t border-[#2D241E]/5">
                  <span className="hover:text-[#E63946] transition-colors">
                    {review.instagramTag || '@pasteleria.rnd'}
                  </span>
                  <div className="flex items-center gap-1 text-[#E63946]">
                    <Heart size={10} className="fill-[#E63946]" />
                    <span>54 likes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive instagram preview hook */}
        <div id="ig-cta-card" className="mt-12 bg-[#F5E6D3] rounded-2xl p-6 border border-[#D9C4AC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#E63946] shadow-sm">
              <Instagram size={24} />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D241E]">Следите за эстетикой бэкстейджа live!</h4>
              <p className="text-xs text-[#2D241E]/60 max-w-md">
                Каждый день мы делимся процессом сборки клубничных букетов, обжарки орехов и дегустациями в наших Сторис.
              </p>
            </div>
          </div>
          <a
            id="review-instagram-link"
            href="https://www.instagram.com/pasteleria.rnd?igsh=MW92aG5iOGFiM3dxag=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-[#2D241E] text-white px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-widest text-center hover:opacity-90 transition-opacity"
          >
            Смотреть в Instagram
          </a>
        </div>

      </div>
    </div>
  );
}
