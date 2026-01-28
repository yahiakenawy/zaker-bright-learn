import { CheckCircle, Clock, MessageSquare, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const benefits = [
  {
    key: 'benefit1',
    icon: Clock,
    gradient: 'from-primary to-accent',
  },
  {
    key: 'benefit2',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    key: 'benefit3',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function TeachersSection() {
  const { t } = useLanguage();

  return (
    <section id="teachers" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t('nav.teachers')}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">{t('teachers.title')}</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              {t('teachers.subtitle')}
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.key}
                  className="flex gap-4 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t(`teachers.${benefit.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`teachers.${benefit.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 lg:p-8 hover-lift">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Today's Grading</h4>
                    <span className="text-sm text-muted-foreground">Class 3A</span>
                  </div>

                  {/* Progress items */}
                  <div className="space-y-4 flex-1">
                    {[
                      { name: 'Ahmed M.', score: 92, done: true },
                      { name: 'Fatma A.', score: 88, done: true },
                      { name: 'Omar K.', score: 76, done: true },
                      { name: 'Sara H.', score: 95, done: false },
                    ].map((student, index) => (
                      <div
                        key={student.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-medium text-primary-foreground">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${student.score >= 90 ? 'text-green-600 dark:text-green-400' : student.score >= 80 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {student.score}%
                          </span>
                          {student.done && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      24 papers graded
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Saved 3.5 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold">100+ Papers</div>
                  <div className="text-xs text-muted-foreground">in 15 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
