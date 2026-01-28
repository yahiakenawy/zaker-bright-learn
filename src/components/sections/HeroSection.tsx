import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Users, FileCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const subjects = [
  { key: 'arabic', color: 'from-red-500 to-rose-500' },
  { key: 'english', color: 'from-blue-500 to-indigo-500' },
  { key: 'math', color: 'from-green-500 to-emerald-500' },
  { key: 'physics', color: 'from-purple-500 to-violet-500' },
  { key: 'chemistry', color: 'from-orange-500 to-amber-500' },
];

const stats = [
  { key: 'teachers', value: '2,500+', icon: Users },
  { key: 'papers', value: '1M+', icon: FileCheck },
  { key: 'time', value: '85%', icon: Clock },
];

export function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-start">
            {/* Subject Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6 animate-fade-in-up">
              {subjects.map((subject, index) => (
                <span
                  key={subject.key}
                  className="subject-pill"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {t(`subject.${subject.key}`)}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-200">
              <span className="gradient-text">{t('hero.title')}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-300">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up delay-400">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="gradient-bg text-primary-foreground hover:opacity-90 shadow-lg px-8 py-6 text-lg"
              >
                {t('hero.cta.trial')}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg group"
              >
                <Play className="w-5 h-5 me-2 group-hover:scale-110 transition-transform" />
                {t('hero.cta.demo')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 animate-fade-in-up delay-500">
              {stats.map((stat) => (
                <div key={stat.key} className="text-center lg:text-start">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl sm:text-3xl font-bold gradient-text">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(`hero.stats.${stat.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-in-up delay-300">
            <div className="relative glass-card rounded-2xl p-6 lg:p-8 hover-lift">
              {/* Mockup of correction interface */}
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="p-4 h-full flex flex-col">
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Zaker AI Correction
                    </div>
                  </div>
                  
                  {/* Content mockup */}
                  <div className="flex-1 flex gap-4">
                    {/* Original */}
                    <div className="flex-1 bg-background/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-2">Original</div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-4/5" />
                        <div className="h-3 bg-red-200 dark:bg-red-900/50 rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-full" />
                      </div>
                    </div>
                    
                    {/* Corrected */}
                    <div className="flex-1 bg-background/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-2">Corrected</div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-4/5" />
                        <div className="h-3 bg-green-200 dark:bg-green-900/50 rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-medium">Grade: 85/100</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Corrected in 2.3s
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl font-bold text-primary-foreground">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
