import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fr" | "ar";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Navbar
    "nav.marketplace": "C2C client to client",
    "nav.database": "Base de Données Scientifique",
    "nav.studio": "Studio de Formulation",
    "nav.academy": "Nexus Académie",
    "nav.invest": "Nexus Investissement",
    "nav.community": "Communauté Nexus",
    "nav.blog": "Journal Scientifique",
    "nav.store": "B2B business to business",
    "nav.pricing": "Abonnements",
    "nav.cosmetiques": "Cosmétiques (C to C)",
    "nav.acc_industriels": "Acc. Industriels",
    "nav.acc_artisanaux": "Acc. Artisanaux",
    "nav.login": "Connexion",
    "nav.dashboard": "Mon Espace",
    "nav.logout": "Déconnexion",
    "nav.admin": "Administrateur",
    "nav.home": "Accueil",

    // Hero - Image 4
    "hero.badge": "LATEST ARRIVALS",
    "hero.title": "NEXUS",
    "hero.subtitle": "L'excellence moléculaire au service de l'industrie mondiale du parfum.",
    "hero.tagline": "Là où la fragrance rencontre la connaissance.",
    "hero.cta.trial": "ESSAI GRATUIT 4 MOIS",
    "hero.cta.catalogue": "EXAMINER LE CATALOGUE",
    "hero.pass.title": "Nexus Pass",
    "hero.pass.academy": "Accès Académie Illimité",
    "hero.pass.commission": "0% Commission Marketplace",
    "hero.pass.invest": "Priorité Investissement",
    "hero.pass.offer": "OFFRE DE LANCEMENT",
    "hero.pass.price": "0€ / 4 mois",

    // Marketplace - Image 1
    "marketplace.title.1": "Marketplace",
    "marketplace.title.2": "Nexus",
    "marketplace.subtitle": "Découvrez les dernières matières premières et molécules de parfumerie.",
    "marketplace.badge": "LATEST ARRIVALS",
    "marketplace.view_all": "CATALOGUE COMPLET",
    "marketplace.add_to_cart": "Ajouter au panier",
    "marketplace.search": "Rechercher une matière première...",
    "marketplace.filter": "Filtrer par catégorie",
    "marketplace.matiere": "MATIÈRES PREMIÈRES",
    "marketplace.molecules": "MOLÉCULES",

    // Features - Image 2 & 3
    "features.badge": "Full Value Chain",
    "features.title.1": "L'écosystème",
    "features.title.2": "Interconnecté",
    "features.desc": "Six modules synchronisés pour couvrir chaque étape, de la culture de la matière première à la certification finale.",
    "features.cta": "ACTIVER MON NEXUS PASS",
    "features.bottom.title": "Zéro Limite. Zéro Commission.",
    "features.bottom.desc": "Profitez de l'écosystème complet gratuitement pendant 120 jours.",
    "features.studio.title": "Nexus Lab Studio",
    "features.studio.desc": "Concevez vos parfums virtuellement avec notre simulateur IA moléculaire. Analyse de stabilité et conformité IFRA en temps réel.",
    "features.marketplace.title": "Global Marketplace",
    "features.marketplace.desc": "Matières premières rares, packaging de luxe et logistique intégrée. Accès direct aux plus grands fournisseurs mondiaux.",
    "features.invest.title": "Impact Invest",
    "features.invest.desc": "Investissez dans la production agricole durable (Oud, Rose, Jasmin) et suivez vos rendements sur votre dashboard.",
    "features.academy.title": "Nexus Académie",
    "features.academy.desc": "Formation certifiante en 3 niveaux : du socle commun à l'expertise master. 4 mois gratuits inclus.",
    "features.store.title": "Store B to B",
    "features.store.desc": "Moteur de recherche exclusif interrogeant 6 annuaires mondiaux pour vos besoins en gros volume.",
    "features.community.title": "Communauté & Votes",
    "features.community.desc": "Participez aux classements trimestriels et votez pour les meilleurs créateurs du réseau.",

    // Sourcing B2B - Image 5
    "store.title.1": "Moteur",
    "store.title.2": "Sourcing Global",
    "store.subtitle": "Recherchez instantanément dans les 6 plus grandes bases de données mondiales de fournisseurs B to B.",
    "store.desc": "Ne soyez plus limité par les stocks locaux. Accédez au plus grand catalogue de l'industrie.",
    "store.cta": "LANCER LE SOURCING",
    "store.placeholder": "Ex: Rose essential oil bulk, 50ml luxury glass bottles...",
    "store.platforms": "Inclus dans la recherche",

    // Community
    "titre.communauté.1": "COMMUNAUTÉ",
    "titre.communauté.2": "NEXUS",
    "community.vote.success": "Votre vote a été enregistré !",
    "community.follow": "Suivre",
    "community.following": "Suivi",
    "community.comment.add": "Poster un commentaire",
    "community.comment.placeholder": "Votre commentaire...",
    "community.no_comments": "Aucun commentaire pour le moment.",

    // Investir
    "invest.title.1": "Impact",
    "invest.title.2": "Invest",
    "invest.subtitle": "Devenez acteur de la production durable.",
    "invest.cta.buy": "Investir dans ce projet",
    "invest.cta.propose": "Proposer une Culture",
    "invest.success": "Investissement réussi !",
    "invest.propose.title": "Proposer un Projet Agricole",
    "invest.propose.desc": "Vous possédez des terres ou une expertise ? Proposez vos cultures à la communauté Nexus.",

    // Academy
    "academy.enroll": "S'inscrire au parcours",
    "academy.lessons": "Leçons",
    "academy.students": "Étudiants",
    "academy.enrolled": "Déjà Inscrit",
    "academy.certification": "Certification Officielle NEXUS",

    // Support & Footer
    "footer.support_nexus": "Support Nexus",
    "footer.whatsapp_support": "Assistance WhatsApp 24/7",
    "footer.copyright": "© 2026 NEXUS. TOUS DROITS RÉSERVÉS.",
    "footer.tagline": "Le premier écosystème dédié à l'industrie mondiale du parfum.",

    // Common
    "common.loading": "Chargement...",
    "common.no_data": "Aucune donnée disponible.",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter au panier",
    "common.back": "Retour",
    "common.search": "Rechercher",
  },
  ar: {
    // Navbar
    "nav.marketplace": "C2C client to client",
    "nav.database": "قاعدة البيانات",
    "nav.studio": "استوديو المختبر",
    "nav.academy": "الأكاديمية",
    "nav.invest": "الاستثمار",
    "nav.community": "المجتمع",
    "nav.blog": "تقارير نكسوس",
    "nav.store": "B2B business to business",
    "nav.pricing": "الاشتراكات",
    "nav.cosmetiques": "مستحضرات التجميل (C to C)",
    "nav.acc_industriels": "إكسسوارات صناعية",
    "nav.acc_artisanaux": "إكسسوارات حرفية",
    "nav.login": "تسجيل الدخول",
    "nav.dashboard": "حسابي",
    "nav.logout": "تسجيل الخروج",
    "nav.admin": "مدير النظام",
    "nav.home": "الرئيسية",

    // Hero
    "hero.badge": "وصل حديثاً",
    "hero.title": "نكسوس",
    "hero.subtitle": "التميز الجزيئي في خدمة صناعة العطور العالمية.",
    "hero.tagline": "حيث تلتقي رائحة الإبداع بطعم المعرفة.",
    "hero.cta.trial": "تجربة مجانية 4 أشهر",
    "hero.cta.catalogue": "تصفح الكاتالوج",
    "hero.pass.title": "بطاقة نكسوس",
    "hero.pass.academy": "وصول غير محدود للأكاديمية",
    "hero.pass.commission": "0% عمولة في السوق",
    "hero.pass.invest": "أولوية الاستثمار",
    "hero.pass.offer": "عرض الإطلاق",
    "hero.pass.price": "0 يورو / 4 أشهر",

    // Marketplace
    "marketplace.title.1": "سوق",
    "marketplace.title.2": "نكسوس",
    "marketplace.subtitle": "اكتشف أحدث المواد الخام والجزيئات العطرية.",
    "marketplace.badge": "وصل حديثاً",
    "marketplace.view_all": "الكاتالوج الكامل",
    "marketplace.add_to_cart": "أضف إلى السلة",
    "marketplace.search": "ابحث عن مادة خام...",
    "marketplace.filter": "تصفية حسب الفئة",
    "marketplace.matiere": "مواد خام",
    "marketplace.molecules": "جزيئات",

    // Features
    "features.badge": "سلسلة القيمة الكاملة",
    "features.title.1": "النظام البيئي",
    "features.title.2": "المتكامل",
    "features.desc": "ستة وحدات متزامنة تغطي كل مرحلة، من زراعة المواد الخام إلى الشهادة النهائية.",
    "features.cta": "تفعيل بطاقة نكسوس",
    "features.bottom.title": "بلا حدود. بلا عمولات.",
    "features.bottom.desc": "استمتع بالنظام البيئي الكامل مجانًا لمدة 120 يومًا.",
    "features.studio.title": "نكسوس لاب استوديو",
    "features.studio.desc": "صمم عطورك افتراضياً مع محاكي الذكاء الاصطناعي الجزيئي. تحليل الاستقرار والامتثال لـ IFRA في الوقت الفعلي.",
    "features.marketplace.title": "السوق العالمي",
    "features.marketplace.desc": "مواد خام نادرة، تغليف فاخر ولوجستيات متكاملة. وصول مباشر إلى أكبر الموردين في العالم.",
    "features.invest.title": "الاستثمار المؤثر",
    "features.invest.desc": "استثمر في الإنتاج الزراعي المستدام (العود، الورد، الياسمين) وتابع عوائدك على لوحة التحكم الخاصة بك.",
    "features.academy.title": "أكاديمية نكسوس",
    "features.academy.desc": "دورة تدريبية معتمدة على 3 مستويات: من الأساسيات إلى الخبرة العالية. 4 أشهر مجانية مشمولة.",
    "features.store.title": "المتجر الاحترافي B to B",
    "features.store.desc": "محرك بحث حصري يبحث في 6 أدلة عالمية لاحتياجاتك بسعة الجملة.",
    "features.community.title": "المجتمع والتصويت",
    "features.community.desc": "شارك في التصنيفات الربع سنوية وصوت لأفضل المبدعين في الشبكة.",

    // Sourcing B2B
    "store.title.1": "محرك",
    "store.title.2": "التوريد العالمي",
    "store.subtitle": "ابحث فوراً في أكبر 6 قواعد بيانات عالمية لموردي B to B.",
    "store.desc": "لا تتقيد بالمخزون المحلي بعد الآن. ادخل إلى أكبر كتالوج في الصناعة.",
    "store.cta": "بدء التوريد",
    "store.placeholder": "مثال: زيت ورد طبيعي بالجملة، زجاجات فاخرة 50 مل...",
    "store.platforms": "مشمول في البحث",

    // Studio
    "studio.simulation.title": "محاكاة جزيئية ثلاثية الأبعاد",
    "studio.simulation.action": "بدء المحاكاة 3D",
    "studio.simulation.running": "جارِ المحاكاة...",
    "studio.simulation.complete": "اكتملت المحاكاة",
    "studio.simulation.error": "خطأ: المعلمات غير مستقرة",
    "studio.analyze.result": "تحليل الامتثال لـ IFRA",

    // Academy
    "academy.enroll": "التسجيل في المسار",
    "academy.lessons": "دروس",
    "academy.students": "طلاب",
    "academy.enrolled": "مسجل بالفعل",

    // Investir
    "invest.cta.buy": "استثمر في هذا المشروع",
    "invest.cta.withdraw": "سحب الأرباح",
    "invest.cta.market": "السوق الثانوية",
    "invest.success": "تم الاستثمار بنجاح!",
    "invest.no_profits": "لا توجد أرباح للسحب حالياً.",

    // Community
    "community.vote.success": "تم تسجيل تصويتك!",
    "community.follow": "متابعة",
    "community.following": "متابع",
    "community.comment.add": "إضافة تعليق",
    "community.comment.placeholder": "اكتب تعليقاً...",
    "community.no_comments": "لا توجد تعليقات حتى الآن.",

    // Abonnements
    "pricing.continents": "جميع مناطق العالم (أوروبا، أفريقيا، آسيا، الأمريكتين، أوقيانوسيا)",
    "pricing.trial.activate": "بدء التجربة المجانية",
    "pricing.trial.activated": "تم تفعيل تجربة 4 أشهر! حساب الإدارة معفى من الاشتراك.",
    "pricing.admin_view": "وضع المسؤول: الرؤية العالمية مفعلة",

    // Support & Footer
    "footer.support_nexus": "دعم نكسوس",
    "footer.whatsapp_support": "دعم واتساب 24/7",
    "footer.copyright": "© 2026 نكسوس للعطور. جميع الحقوق محفوظة.",
    "footer.tagline": "أول نظام بيئي مخصص لصناعة العطور العالمية.",

    // Common
    "common.loading": "جار التحميل...",
    "common.no_data": "لا توجد بيانات متاحة.",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.add": "أضف إلى السلة",
    "common.back": "رجوع",
    "common.search": "بحث",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("nexus_lang") as Lang) || "fr";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("nexus_lang", l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
