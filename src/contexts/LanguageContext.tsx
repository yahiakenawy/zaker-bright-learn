import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.teachers': 'For Teachers',
    'nav.schools': 'For Schools',
    'nav.pricing': 'Pricing',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.title': 'Transform Handwritten Work into Intelligent Insights',
    'hero.subtitle': 'Affordable AI-powered correction for Egyptian educators. Grade papers in seconds, not hours.',
    'hero.cta.trial': 'Start Free Trial',
    'hero.cta.demo': 'Watch Demo',
    'hero.stats.teachers': 'Teachers',
    'hero.stats.papers': 'Papers Corrected',
    'hero.stats.time': 'Time Saved',
    
    // Subjects
    'subject.arabic': 'Arabic',
    'subject.english': 'English',
    'subject.math': 'Math',
    'subject.physics': 'Physics',
    'subject.chemistry': 'Chemistry',
    
    // Features
    'features.title': 'Powerful Features for Modern Education',
    'features.subtitle': 'Everything you need to transform your teaching workflow',
    'features.handwriting.title': 'Handwriting Correction',
    'features.handwriting.desc': 'Our flagship AI reads handwritten text with 98% accuracy across multiple subjects',
    'features.handwriting.stat': '98% Accuracy',
    'features.text.title': 'Text Analysis',
    'features.text.desc': 'Grammar, spelling, and style corrections for typed content in Arabic and English',
    'features.text.stat': 'Instant Feedback',
    'features.analytics.title': 'Student Analytics',
    'features.analytics.desc': 'Track performance trends and identify areas for improvement',
    'features.analytics.stat': 'Real-time Insights',
    'features.training.title': 'Personalized Training',
    'features.training.desc': 'AI-generated practice exercises tailored to each student\'s needs',
    'features.training.stat': 'Adaptive Learning',
    
    // Teachers
    'teachers.title': 'Built for Teachers',
    'teachers.subtitle': 'Save hours every week with intelligent grading assistance',
    'teachers.benefit1.title': 'Grade 100+ Papers in Minutes',
    'teachers.benefit1.desc': 'Our AI handles the heavy lifting while you focus on teaching',
    'teachers.benefit2.title': 'Detailed Student Feedback',
    'teachers.benefit2.desc': 'Provide personalized comments without the time investment',
    'teachers.benefit3.title': 'Track Class Performance',
    'teachers.benefit3.desc': 'See trends across your entire class at a glance',
    
    // Schools
    'schools.title': 'Enterprise Solutions for Schools',
    'schools.subtitle': 'Standardize assessment across your entire institution',
    'schools.benefit1.title': 'Unlimited Teacher Accounts',
    'schools.benefit1.desc': 'Add as many teachers as you need under one subscription',
    'schools.benefit2.title': 'Administration Dashboard',
    'schools.benefit2.desc': 'Monitor usage and performance across all departments',
    'schools.benefit3.title': 'Priority Support',
    'schools.benefit3.desc': 'Dedicated account manager and 24/7 technical support',
    'schools.benefit4.title': 'Standardized Assessment',
    'schools.benefit4.desc': 'Consistent grading criteria across all classrooms',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that fits your needs',
    'pricing.monthly': 'Monthly',
    'pricing.yearly': 'Yearly',
    'pricing.save': 'Save 20%',
    'pricing.teachers.title': 'Teachers Plan',
    'pricing.teachers.desc': 'Perfect for individual educators',
    'pricing.schools.title': 'Schools Plan',
    'pricing.schools.desc': 'Comprehensive solution for institutions',
    'pricing.perMonth': '/month',
    'pricing.cta': 'Get Started',
    'pricing.popular': 'Most Popular',
    
    // Testimonials
    'testimonials.title': 'What Educators Say',
    'testimonials.subtitle': 'Join thousands of teachers transforming their classrooms',
    
    // Footer
    'footer.description': 'Empowering Egyptian educators with AI-powered tools',
    'footer.links': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.copyright': '© 2024 Zaker AI. All rights reserved.',
    
    // Signup
    'signup.title': 'Get Started with Zaker AI',
    'signup.step1': 'Choose Plan',
    'signup.step2': 'Organization',
    'signup.step3': 'Contact Info',
    'signup.step4': 'Confirmation',
    'signup.next': 'Continue',
    'signup.back': 'Back',
    'signup.submit': 'Create Account',
  },
  ar: {
    // Navigation
    'nav.features': 'المميزات',
    'nav.teachers': 'للمعلمين',
    'nav.schools': 'للمدارس',
    'nav.pricing': 'الأسعار',
    'nav.getStarted': 'ابدأ الآن',
    
    // Hero
    'hero.title': 'حوّل الكتابة اليدوية إلى رؤى ذكية',
    'hero.subtitle': 'تصحيح بالذكاء الاصطناعي بأسعار مناسبة للمعلمين المصريين. صحح الأوراق في ثوانٍ وليس ساعات.',
    'hero.cta.trial': 'ابدأ تجربتك المجانية',
    'hero.cta.demo': 'شاهد العرض',
    'hero.stats.teachers': 'معلم',
    'hero.stats.papers': 'ورقة مُصححة',
    'hero.stats.time': 'توفير في الوقت',
    
    // Subjects
    'subject.arabic': 'العربية',
    'subject.english': 'الإنجليزية',
    'subject.math': 'الرياضيات',
    'subject.physics': 'الفيزياء',
    'subject.chemistry': 'الكيمياء',
    
    // Features
    'features.title': 'مميزات قوية للتعليم الحديث',
    'features.subtitle': 'كل ما تحتاجه لتحويل سير عملك التعليمي',
    'features.handwriting.title': 'تصحيح الكتابة اليدوية',
    'features.handwriting.desc': 'ذكاؤنا الاصطناعي يقرأ الكتابة اليدوية بدقة 98% عبر مواد متعددة',
    'features.handwriting.stat': 'دقة 98%',
    'features.text.title': 'تحليل النصوص',
    'features.text.desc': 'تصحيحات نحوية وإملائية وأسلوبية للمحتوى المكتوب بالعربية والإنجليزية',
    'features.text.stat': 'ملاحظات فورية',
    'features.analytics.title': 'تحليلات الطلاب',
    'features.analytics.desc': 'تتبع اتجاهات الأداء وحدد مجالات التحسين',
    'features.analytics.stat': 'رؤى في الوقت الفعلي',
    'features.training.title': 'تدريب مخصص',
    'features.training.desc': 'تمارين تدريبية مولدة بالذكاء الاصطناعي مصممة لاحتياجات كل طالب',
    'features.training.stat': 'تعلم تكيفي',
    
    // Teachers
    'teachers.title': 'مصمم للمعلمين',
    'teachers.subtitle': 'وفر ساعات كل أسبوع مع مساعدة التصحيح الذكي',
    'teachers.benefit1.title': 'صحح 100+ ورقة في دقائق',
    'teachers.benefit1.desc': 'ذكاؤنا الاصطناعي يتولى العمل الشاق بينما تركز أنت على التدريس',
    'teachers.benefit2.title': 'ملاحظات تفصيلية للطلاب',
    'teachers.benefit2.desc': 'قدم تعليقات مخصصة دون استثمار الوقت',
    'teachers.benefit3.title': 'تتبع أداء الفصل',
    'teachers.benefit3.desc': 'شاهد الاتجاهات عبر فصلك بالكامل بنظرة واحدة',
    
    // Schools
    'schools.title': 'حلول مؤسسية للمدارس',
    'schools.subtitle': 'توحيد التقييم عبر مؤسستك بالكامل',
    'schools.benefit1.title': 'حسابات معلمين غير محدودة',
    'schools.benefit1.desc': 'أضف عدد المعلمين الذي تحتاجه تحت اشتراك واحد',
    'schools.benefit2.title': 'لوحة تحكم الإدارة',
    'schools.benefit2.desc': 'راقب الاستخدام والأداء عبر جميع الأقسام',
    'schools.benefit3.title': 'دعم ذو أولوية',
    'schools.benefit3.desc': 'مدير حساب مخصص ودعم فني على مدار الساعة',
    'schools.benefit4.title': 'تقييم موحد',
    'schools.benefit4.desc': 'معايير تصحيح متسقة عبر جميع الفصول الدراسية',
    
    // Pricing
    'pricing.title': 'أسعار بسيطة وشفافة',
    'pricing.subtitle': 'اختر الخطة التي تناسب احتياجاتك',
    'pricing.monthly': 'شهري',
    'pricing.yearly': 'سنوي',
    'pricing.save': 'وفر 20%',
    'pricing.teachers.title': 'خطة المعلمين',
    'pricing.teachers.desc': 'مثالية للمعلمين الأفراد',
    'pricing.schools.title': 'خطة المدارس',
    'pricing.schools.desc': 'حل شامل للمؤسسات',
    'pricing.perMonth': '/شهر',
    'pricing.cta': 'ابدأ الآن',
    'pricing.popular': 'الأكثر شعبية',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول المعلمون',
    'testimonials.subtitle': 'انضم إلى آلاف المعلمين الذين يحولون فصولهم الدراسية',
    
    // Footer
    'footer.description': 'تمكين المعلمين المصريين بأدوات الذكاء الاصطناعي',
    'footer.links': 'روابط سريعة',
    'footer.legal': 'قانوني',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.contact': 'اتصل بنا',
    'footer.copyright': '© 2024 ذاكر AI. جميع الحقوق محفوظة.',
    
    // Signup
    'signup.title': 'ابدأ مع ذاكر AI',
    'signup.step1': 'اختر الخطة',
    'signup.step2': 'المؤسسة',
    'signup.step3': 'معلومات التواصل',
    'signup.step4': 'التأكيد',
    'signup.next': 'متابعة',
    'signup.back': 'رجوع',
    'signup.submit': 'إنشاء حساب',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('zaker-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('zaker-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
