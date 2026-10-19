# SCREENLED – דף בית

דף הנחיתה שנבנה מקובץ ה-Figma (פריים "דף בית סטיקי – Rubik"). הפרויקט בנוי ב-React + Vite + TypeScript + Tailwind, אותה טכנולוגיה ש-Lovable עובד איתה.

## הרצה מקומית
```bash
npm install
npm run dev
```
הדף נפתח בכתובת http://localhost:8080.

## העלאה ל-Lovable
1. מעלים את התיקייה לריפו חדש ב-GitHub (בלי `node_modules`, `dist` ו-`.pixel-perfect`).
2. ב-Lovable מייבאים את הפרויקט מ-GitHub (או מחברים את GitHub ומסנכרנים את הריפו).
3. Lovable מזהה לבד את `package.json`, `vite.config.ts` ו-`tailwind.config.ts`.

## מבנה
- `src/components/`: קומפוננטה לכל סקשן (Hero, WhyUs, Products, Projects, ProblemSolution, Domains, HowItWorks, Testimonials, Contact, Footer), וקובץ `ui.tsx` לרכיבים המשותפים.
- `public/figma/`: כל התמונות והאייקונים, כפי שיוצאו מ-Figma.
- הצבעים והפונטים מוגדרים ב-`tailwind.config.ts`:
  - צבעים: ליים `#d4ff5a`, אינדיגו `#5457e0`, נייבי `#121633`, כהה `#151519`.
  - פונטים: Rubik, Heebo, Montserrat.

## נקודות שבירה
- **מתחת ל-1024px (מובייל וטאבלט):** עיצוב המובייל הייעודי מ-Figma (פריים "מובייל דף בית סטיקי"), כולל סרגל וואטסאפ/חיוג צף בתחתית. הקוד ב-`src/components/mobile/`.
- **בין 1024 ל-1279:** ה-Hero בפריסת דסקטופ מוקטנת, ושאר הסקשנים בפריסת ביניים.
- **מ-1280px ומעלה:** פריסת הדסקטופ המדויקת (פיקסל-פרפקט ב-1440).

## מה עוד לא מחובר
- טופס הלידים מציג הודעת תודה, אבל לא שולח את הנתונים לשום מקום. צריך לחבר אותו ל-Supabase או ל-Webhook ב-Lovable.
- הקישורים לרשתות החברתיות ולעמודים המשפטיים הם placeholders (`#`).
