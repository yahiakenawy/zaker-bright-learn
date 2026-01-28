import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, ArrowRight, Loader2, Copy, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  getPlans,
  getTiers,
  createTenant,
  fallbackPlans,
  fallbackTiers,
  Plan,
  Tier,
  TenantCreate,
  TenantResponse,
} from '@/lib/api';
import { cn } from '@/lib/utils';

const steps = ['Plan', 'Organization', 'Contact', 'Confirmation'];

// Form schemas
const organizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters').max(100),
  domain: z
    .string()
    .min(3, 'Domain must be at least 3 characters')
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Domain can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional(),
});

const contactSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  email: z.string().email('Please enter a valid email address'),
  transactionId: z.string().min(5, 'Transaction ID is required'),
});

type OrganizationForm = z.infer<typeof organizationSchema>;
type ContactForm = z.infer<typeof contactSchema>;

export function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [tiers, setTiers] = useState<Tier[]>(fallbackTiers);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Selected values
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(
    (location.state as { planId?: number })?.planId || null
  );
  const [selectedTierId, setSelectedTierId] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [organizationData, setOrganizationData] = useState<OrganizationForm | null>(null);
  const [tenantResponse, setTenantResponse] = useState<TenantResponse | null>(null);

  // Forms
  const orgForm = useForm<OrganizationForm>({
    resolver: zodResolver(organizationSchema),
    defaultValues: { name: '', domain: '', description: '' },
  });

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { phone: '', email: '', transactionId: '' },
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [plansRes, tiersRes] = await Promise.all([getPlans(), getTiers()]);
      if (plansRes.data) setPlans(plansRes.data);
      if (tiersRes.data) setTiers(tiersRes.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPlanId) {
      const planTiers = tiers.filter((t) => t.plan_id === selectedPlanId);
      if (planTiers.length > 0 && !selectedTierId) {
        setSelectedTierId(planTiers[0].id);
      }
    }
  }, [selectedPlanId, tiers, selectedTierId]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-EG').format(parseFloat(price));
  };

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const selectedTier = tiers.find((t) => t.id === selectedTierId);
  const availableTiers = tiers.filter((t) => t.plan_id === selectedPlanId);

  const handleNext = async () => {
    if (currentStep === 0) {
      if (!selectedPlanId || !selectedTierId) {
        toast({ title: 'Please select a plan and tier', variant: 'destructive' });
        return;
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      const isValid = await orgForm.trigger();
      if (isValid) {
        setOrganizationData(orgForm.getValues());
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const isValid = await contactForm.trigger();
      if (isValid) {
        await handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlanId || !selectedTierId || !organizationData) return;

    setIsSubmitting(true);
    const contactData = contactForm.getValues();

    const payload: TenantCreate = {
      name: organizationData.name,
      domain: organizationData.domain,
      description: organizationData.description,
      phone: contactData.phone,
      email: contactData.email,
      plan_id: selectedPlanId,
      tier_id: selectedTierId,
      billing_cycle: billingCycle,
      transaction_id: contactData.transactionId,
    };

    const result = await createTenant(payload);

    if (result.error) {
      toast({
        title: 'Registration Failed',
        description: result.error,
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    setTenantResponse(result.data);
    setCurrentStep(3);
    setIsSubmitting(false);
  };

  const copyCredentials = () => {
    if (tenantResponse) {
      const text = `Email: ${tenantResponse.admin_email}\nPassword: ${tenantResponse.admin_password}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
      <div className="content-container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">{t('signup.title')}</span>
          </h1>
          <p className="text-muted-foreground">
            Complete your registration in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                  index < currentStep
                    ? 'gradient-bg text-primary-foreground'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 sm:w-24 h-1 mx-2 rounded-full transition-all',
                    index < currentStep ? 'gradient-bg' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>{t(`signup.step${currentStep + 1}`)}</CardTitle>
            <CardDescription>
              {currentStep === 0 && 'Select your plan and billing preferences'}
              {currentStep === 1 && 'Tell us about your organization'}
              {currentStep === 2 && 'Provide your contact information'}
              {currentStep === 3 && 'Your account has been created!'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Plan Selection */}
            {currentStep === 0 && (
              <div className="space-y-6">
                {/* Plan Selection */}
                <div>
                  <Label className="text-base mb-3 block">Select Plan</Label>
                  <RadioGroup
                    value={String(selectedPlanId || '')}
                    onValueChange={(v) => {
                      setSelectedPlanId(Number(v));
                      setSelectedTierId(null);
                    }}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {plans.map((plan) => (
                      <div key={plan.id}>
                        <RadioGroupItem
                          value={String(plan.id)}
                          id={`plan-${plan.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`plan-${plan.id}`}
                          className={cn(
                            'flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all',
                            selectedPlanId === plan.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          )}
                        >
                          <span className="font-semibold text-lg">{plan.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {plan.description}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Tier Selection */}
                {selectedPlanId && availableTiers.length > 0 && (
                  <div>
                    <Label className="text-base mb-3 block">Select Tier</Label>
                    <RadioGroup
                      value={String(selectedTierId || '')}
                      onValueChange={(v) => setSelectedTierId(Number(v))}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      {availableTiers.map((tier) => (
                        <div key={tier.id}>
                          <RadioGroupItem
                            value={String(tier.id)}
                            id={`tier-${tier.id}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`tier-${tier.id}`}
                            className={cn(
                              'flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all',
                              selectedTierId === tier.id
                                ? 'border-primary bg-primary/5'
                                : 'border-muted hover:border-primary/50'
                            )}
                          >
                            <span className="font-semibold">{tier.name}</span>
                            <span className="text-lg font-bold gradient-text">
                              {formatPrice(
                                billingCycle === 'monthly'
                                  ? tier.monthly_price
                                  : tier.yearly_price
                              )}{' '}
                              EGP
                              <span className="text-sm font-normal text-muted-foreground">
                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                              </span>
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Billing Cycle */}
                <div>
                  <Label className="text-base mb-3 block">Billing Cycle</Label>
                  <RadioGroup
                    value={billingCycle}
                    onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly">
                        Yearly <span className="text-green-600">(Save 20%)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 2: Organization Details */}
            {currentStep === 1 && (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    {...orgForm.register('name')}
                    placeholder="e.g., Al-Azhar Academy"
                    className="mt-1"
                  />
                  {orgForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {orgForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="domain">Domain (subdomain) *</Label>
                  <div className="flex mt-1">
                    <Input
                      id="domain"
                      {...orgForm.register('domain')}
                      placeholder="al-azhar"
                      className="rounded-e-none"
                    />
                    <span className="inline-flex items-center px-3 rounded-e-md border border-s-0 border-input bg-muted text-sm text-muted-foreground">
                      .zaker.ai
                    </span>
                  </div>
                  {orgForm.formState.errors.domain && (
                    <p className="text-sm text-destructive mt-1">
                      {orgForm.formState.errors.domain.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    {...orgForm.register('description')}
                    placeholder="Brief description of your organization..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </form>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 2 && (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...contactForm.register('email')}
                    placeholder="admin@school.edu.eg"
                    className="mt-1"
                  />
                  {contactForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {contactForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...contactForm.register('phone')}
                    placeholder="+20 123 456 7890"
                    className="mt-1"
                  />
                  {contactForm.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {contactForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="transactionId">Payment Transaction ID *</Label>
                  <Input
                    id="transactionId"
                    {...contactForm.register('transactionId')}
                    placeholder="TXN-XXXX-XXXX"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the transaction ID from your payment confirmation
                  </p>
                  {contactForm.formState.errors.transactionId && (
                    <p className="text-sm text-destructive mt-1">
                      {contactForm.formState.errors.transactionId.message}
                    </p>
                  )}
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50">
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan:</span>
                      <span>{selectedPlan?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tier:</span>
                      <span>{selectedTier?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Billing:</span>
                      <span className="capitalize">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                      <span>Total:</span>
                      <span className="gradient-text">
                        {formatPrice(
                          billingCycle === 'monthly'
                            ? selectedTier?.monthly_price || '0'
                            : selectedTier?.yearly_price || '0'
                        )}{' '}
                        EGP
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 3 && tenantResponse && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to Zaker AI!</h3>
                  <p className="text-muted-foreground">{tenantResponse.message}</p>
                </div>

                <div className="p-6 rounded-xl bg-muted/50 text-start">
                  <h4 className="font-semibold mb-4">Your Admin Credentials</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-muted-foreground text-xs">Email</Label>
                      <p className="font-mono text-sm">{tenantResponse.admin_email}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Password</Label>
                      <p className="font-mono text-sm">{tenantResponse.admin_password}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCredentials}
                    className="mt-4"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 me-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 me-2" />
                        Copy Credentials
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Please save these credentials securely. You'll need them to access your
                  dashboard.
                </p>

                <Button
                  onClick={() => navigate('/')}
                  className="gradient-bg text-primary-foreground"
                >
                  Go to Homepage
                </Button>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          {currentStep < 3 && (
            <div className="flex justify-between p-6 pt-0">
              <Button
                variant="ghost"
                onClick={currentStep === 0 ? () => navigate('/') : handleBack}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 me-2" />
                {currentStep === 0 ? 'Back to Home' : t('signup.back')}
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className={currentStep === 2 ? 'gradient-bg text-primary-foreground' : ''}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 me-2 animate-spin" />
                    Processing...
                  </>
                ) : currentStep === 2 ? (
                  t('signup.submit')
                ) : (
                  <>
                    {t('signup.next')}
                    <ArrowRight className="w-4 h-4 ms-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
