import { PenTool, Type, BarChart3, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    key: 'handwriting',
    icon: PenTool,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    key: 'text',
    icon: Type,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    key: 'analytics',
    icon: BarChart3,
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    key: 'training',
    icon: GraduationCap,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('features.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.key}
              className="glass-card hover-lift border-0 overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">
                  {t(`features.${feature.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {t(`features.${feature.key}.desc`)}
                </p>

                {/* Stat Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {t(`features.${feature.key}.stat`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
