import { Users, LayoutDashboard, HeadphonesIcon, ClipboardCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const benefits = [
  {
    key: 'benefit1',
    icon: Users,
    gradient: 'from-primary to-accent',
  },
  {
    key: 'benefit2',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    key: 'benefit3',
    icon: HeadphonesIcon,
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    key: 'benefit4',
    icon: ClipboardCheck,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function SchoolsSection() {
  const { t } = useLanguage();

  return (
    <section id="schools" className="section-padding bg-muted/30">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
            {t('nav.schools')}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('schools.title')}</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            {t('schools.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.key}
              className="glass-card hover-lift border-0 overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 flex gap-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`schools.${benefit.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`schools.${benefit.key}.desc`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16">
          <div className="glass-card rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto hover-lift">
            <div className="rounded-xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Administration Dashboard</h4>
                  <span className="text-sm text-muted-foreground">Al-Nour Academy</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Teachers', value: '48', change: '+5' },
                    { label: 'Students', value: '1,250', change: '+120' },
                    { label: 'Papers/Week', value: '3,400', change: '+15%' },
                    { label: 'Avg. Score', value: '82%', change: '+3%' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-lg bg-background/50"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-xs text-green-600 dark:text-green-400">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Departments */}
                <div className="space-y-3">
                  <div className="text-sm font-medium mb-2">Department Performance</div>
                  {[
                    { name: 'Arabic', progress: 88, color: 'bg-primary' },
                    { name: 'Mathematics', progress: 75, color: 'bg-blue-500' },
                    { name: 'Science', progress: 82, color: 'bg-green-500' },
                  ].map((dept) => (
                    <div key={dept.name} className="flex items-center gap-4">
                      <span className="text-sm w-24">{dept.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${dept.color} rounded-full transition-all duration-500`}
                          style={{ width: `${dept.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-end">
                        {dept.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
