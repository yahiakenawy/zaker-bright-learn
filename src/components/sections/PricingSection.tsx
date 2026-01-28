import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPlans, getTiers, fallbackPlans, fallbackTiers, Plan, Tier } from '@/lib/api';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [tiers, setTiers] = useState<Tier[]>(fallbackTiers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      setIsLoading(true);
      const [plansRes, tiersRes] = await Promise.all([getPlans(), getTiers()]);

      if (plansRes.data) setPlans(plansRes.data);
      if (tiersRes.data) setTiers(tiersRes.data);

      setIsLoading(false);
    }

    fetchPricing();
  }, []);

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    return new Intl.NumberFormat('en-EG').format(num);
  };

  const getPlansWithTiers = () => {
    return plans.map((plan) => {
      const planTiers = tiers.filter((tier) => tier.plan_id === plan.id);
      // Get the most popular tier (first one for simplicity)
      const primaryTier = planTiers[0];
      return { ...plan, tiers: planTiers, primaryTier };
    });
  };

  const plansWithTiers = getPlansWithTiers();

  return (
    <section id="pricing" className="section-padding">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('pricing.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('pricing.subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                'text-sm font-medium transition-colors',
                !isYearly ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {t('pricing.monthly')}
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span
              className={cn(
                'text-sm font-medium transition-colors',
                isYearly ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {t('pricing.yearly')}
            </span>
            {isYearly && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gradient-bg text-primary-foreground">
                {t('pricing.save')}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plansWithTiers.map((plan, index) => {
            const price = isYearly
              ? plan.primaryTier?.yearly_price
              : plan.primaryTier?.monthly_price;
            const monthlyEquivalent = isYearly
              ? parseFloat(plan.primaryTier?.yearly_price || '0') / 12
              : parseFloat(plan.primaryTier?.monthly_price || '0');
            const isPopular = index === 1;

            return (
              <Card
                key={plan.id}
                className={cn(
                  'relative glass-card border-0 hover-lift overflow-hidden',
                  isPopular && 'ring-2 ring-primary'
                )}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 gradient-bg text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    <Sparkles className="w-3 h-3 inline me-1" />
                    {t('pricing.popular')}
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">
                    {t(`pricing.${plan.name.toLowerCase()}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`pricing.${plan.name.toLowerCase()}.desc`)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold gradient-text">
                        {formatPrice(String(Math.round(monthlyEquivalent)))}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        EGP{t('pricing.perMonth')}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(price || '0')} EGP billed yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.primaryTier?.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate('/signup', { state: { planId: plan.id } })}
                    className={cn(
                      'w-full py-6',
                      isPopular
                        ? 'gradient-bg text-primary-foreground hover:opacity-90'
                        : ''
                    )}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {t('pricing.cta')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
