
# Zaker AI Landing Page - Implementation Plan

## Overview
A modern, bilingual landing page for Zaker AI that showcases AI-powered educational tools for schools and teachers. The design will match the reference site (zaker-spark-design.lovable.app) with full backend API integration.

---

## 1. Header & Navigation
- **Logo & Brand**: Zaker AI branding with professional icon
- **Navigation Links**: Features, For Teachers, For Schools, Pricing
- **Language Toggle**: Switch between English and Arabic (English primary)
- **Dark/Light Mode Toggle**: Persistent theme preference stored locally
- **CTA Button**: "Get Started" button leading to signup flow
- Mobile-responsive hamburger menu

---

## 2. Hero Section
- **Headline**: "Transform Handwritten Work into Intelligent Insights"
- **Subheadline**: Emphasizing affordable AI correction for Egyptian educators
- **Subject Pills**: Visual badges for Arabic, English, Math, Physics, Chemistry
- **CTA Buttons**: "Start Free Trial" and "Watch Demo"
- **Stats Bar**: 2,500+ Teachers, 1M+ Papers Corrected, 85% Time Saved
- **Hero Image**: Real handwritten correction example showcasing the product

---

## 3. Features Section
Four main feature cards with icons and descriptions:
1. **Handwriting Correction** - Flagship AI reading handwritten text with 98% accuracy
2. **Text Analysis** - Grammar, spelling, style corrections for typed content
3. **Student Analytics** - Performance tracking and insights dashboard
4. **Personalized Training** - AI-generated practice exercises

Each card will show relevant stats and visual indicators.

---

## 4. For Teachers Section
Dedicated section highlighting teacher benefits:
- Grade 100+ papers in minutes
- Detailed feedback for students
- Track class performance
- Visual illustration of the grading workflow

---

## 5. For Schools Section
Institutional benefits showcase:
- Unlimited teacher accounts
- Administration dashboard
- Priority support
- Standardized assessment across departments

---

## 6. Pricing Section (API-Integrated)
Fetches live pricing from your `/plans/` and `/tiers/` endpoints:
- **Teachers Plan**: ~900 EGP/month - Up to 500 papers, basic analytics
- **Schools Plan**: ~4,000 EGP/month - Unlimited papers, advanced analytics, admin dashboard
- Monthly/Yearly toggle with dynamic pricing
- "Get Started" buttons leading to signup

---

## 7. Testimonials Section
Social proof carousel with user quotes from Egyptian educators showcasing real-world impact.

---

## 8. Registration/Signup Flow (API-Integrated)
Full tenant registration flow connecting to your `/tenants/` endpoint:
1. **Step 1 - Plan Selection**: Choose Teachers or Schools plan, select tier (Basic/Pro), billing cycle
2. **Step 2 - Organization Details**: Name, domain, description, logo upload
3. **Step 3 - Contact Information**: Phone, email, transaction ID
4. **Step 4 - Confirmation**: Display generated admin credentials

---

## 9. Footer
- Copyright information
- Quick navigation links
- Social media links (Facebook, Twitter, Instagram)
- Language/theme toggles

---

## Design & UX Features
- **Mobile-first responsive design** with smooth breakpoints
- **Light tones with red-to-purple accent gradient** matching the reference
- **Glassmorphism effects** for cards and UI elements
- **Smooth animations**: Fade-ins, hover effects, scroll-triggered reveals
- **Arabic RTL support**: Layout flips correctly when switching languages
- **Professional iconography**: Lucide icons, no emojis
- **Swipeable card carousel** for mobile feature browsing

---

## Technical Integration
- **API Connection**: Configure base URL for your backend (localhost:8000 or production)
- **Plans/Tiers Fetching**: Dynamic pricing from API
- **Tenant Creation**: Full registration POST to /tenants/
- **Error Handling**: Graceful fallbacks if API is unavailable
- **Form Validation**: Zod schemas matching API requirements
