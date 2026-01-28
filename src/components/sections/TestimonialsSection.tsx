import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Heba Mohamed',
    role: 'Arabic Teacher',
    school: 'Al-Azhar School, Cairo',
    quote: 'Zaker AI has completely transformed how I grade papers. What used to take me 4 hours now takes 30 minutes. My students get better feedback too!',
    avatar: 'H',
  },
  {
    id: 2,
    name: 'Ahmed Farouk',
    role: 'Math Department Head',
    school: 'British International School',
    quote: 'The accuracy of the AI correction is remarkable. It catches mistakes I sometimes miss and provides consistent grading across all papers.',
    avatar: 'A',
  },
  {
    id: 3,
    name: 'Fatma El-Sayed',
    role: 'English Teacher',
    school: 'El-Nahda Academy',
    quote: 'My students\' writing has improved significantly since I started using Zaker AI. The detailed feedback helps them understand their mistakes better.',
    avatar: 'F',
  },
  {
    id: 4,
    name: 'Dr. Khaled Mansour',
    role: 'School Principal',
    school: 'Cairo International School',
    quote: 'Implementing Zaker AI across our school has standardized our assessment quality. Teachers love it, and parents appreciate the detailed reports.',
    avatar: 'K',
  },
];

export function TestimonialsSection() {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="section-padding bg-muted/30">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  'glass-card rounded-2xl p-6 transition-all duration-500',
                  index === 1 ? 'scale-105 shadow-xl' : 'opacity-80'
                )}
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-lg font-semibold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.school}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Single Card */}
          <div className="md:hidden">
            <div className="glass-card rounded-2xl p-6">
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-lg font-semibold text-primary-foreground">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonials[currentIndex].school}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              {isRTL ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'w-6 gradient-bg'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
