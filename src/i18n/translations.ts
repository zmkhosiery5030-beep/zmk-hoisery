export type Locale = "en" | "ur";

export const translations = {
  en: {
    nav: {
      about: "About",
      socks: "Socks",
      capabilities: "Capabilities",
      gallery: "Gallery",
      insights: "Insights",
      faq: "FAQ",
      contact: "Contact",
      quote: "Request quote",
    },
    hero: {
      brand: "ZMK Hosiery",
      title: "Socks manufacturer and exporter in Pakistan",
      copy: "Based in Faisalabad, we produce casual, sports, diabetic, kids, formal, and custom socks for international buyers and local wholesale.",
      ctaPrimary: "Request a quote",
      ctaSecondary: "View our range",
    },
    markets: {
      label: "Markets we serve",
      title: "Export buyers and local wholesale",
      lead: "The same production standards support overseas brand programs and Pakistan wholesale restocks.",
      exportTitle: "Export manufacturing",
      exportCopy:
        "Custom and private-label socks for overseas buyers who need consistent sizing, clean finishing, and shipment dates that hold.",
      localTitle: "Local supply",
      localCopy:
        "Wholesale sock packs for Pakistan shops and distributors, with flexible order sizes and faster turnaround.",
      mapLabel: "Active supply regions",
      regions: [
        "Pakistan",
        "Middle East",
        "Europe",
        "North America",
        "Africa",
        "Asia Pacific",
      ],
    },
    about: {
      label: "About ZMK Hosiery",
      title: "Manufacturing quality socks at scale",
      lead: "We knit, finish, and pack socks for export programs and local wholesale from our facility in Faisalabad.",
      body: "From yarn selection to packing, the same team manages sampling, bulk production, and quality control. Private labeling and custom specifications are available across our full range.",
      stats: [
        { value: "7.5M+", label: "Pairs capacity / year" },
        { value: "1000", label: "Dozen pairs / day" },
        { value: "Export", label: "+ local fulfillment" },
      ],
    },
    products: {
      label: "Product range",
      title: "Socks for every market need",
      lead: "From standard wholesale styles to private-label programs, we develop samples and scale the sock constructions your buyers ask for.",
      items: [
        {
          name: "Casual socks",
          note: "Everyday cotton and blended pairs for retail and wholesale packs.",
          alt: "Casual cotton socks manufactured by ZMK Hosiery",
        },
        {
          name: "Sports socks",
          note: "Cushioned, breathable constructions for running, gym, and outdoor use.",
          alt: "Sports socks for active wear produced in Pakistan",
        },
        {
          name: "Diabetic socks",
          note: "Soft, non-binding comfort socks designed for sensitive feet.",
          alt: "Comfort diabetic socks with soft non-binding fit",
        },
        {
          name: "Kids socks",
          note: "Durable kids sizes and colorways built for daily wear.",
          alt: "Kids socks in durable everyday sizes",
        },
        {
          name: "Formal socks",
          note: "Dress, ankle, and crew socks for men and women.",
          alt: "Formal dress socks for men and women",
        },
        {
          name: "Custom socks",
          note: "Private label designs with your branding, sizing, and packing specs.",
          alt: "Custom private label socks manufacturing",
        },
      ],
    },
    gallery: {
      label: "Real samples",
      title: "Socks from our production line",
      lead: "Actual ZMK samples across custom graphics, kids packs, and athletic ankle styles.",
    },
    capabilities: {
      label: "Capabilities",
      title: "From sample to packed carton",
      lead: "A clear process for standard styles and private-label programs, so export and local orders stay on schedule.",
      download: "Download capability sheet",
      items: [
        {
          title: "Yarn sourcing",
          copy: "Cotton, blends, and performance yarns matched to each sock construction.",
        },
        {
          title: "Sock development",
          copy: "Samples for any sock type, including custom designs, logos, and sizing.",
        },
        {
          title: "Merchandising",
          copy: "Daily order tracking so delays surface early, not at the shipping desk.",
        },
        {
          title: "Production planning",
          copy: "Knitting capacity booked against your sock volumes and delivery dates.",
        },
        {
          title: "Quality control",
          copy: "Inline and final checks on size, finish, and packing before cartons close.",
        },
        {
          title: "On-time delivery",
          copy: "Sock cartons packed, labeled, and ready for local dispatch or export freight.",
        },
      ],
    },
    insights: {
      label: "Insights",
      title: "Notes for buyers and brand teams",
      lead: "Short practical reads on sock sourcing, materials, and working with a Pakistan manufacturer.",
      posts: [
        {
          title: "How to brief a private-label sock order",
          excerpt:
            "Share construction, yarn, sizes, branding, packing, and target ship date up front to cut sampling rounds.",
        },
        {
          title: "Cotton vs blended yarns for retail socks",
          excerpt:
            "Cotton leads on hand-feel. Blends improve stretch, durability, and color hold for high-turn retail packs.",
        },
        {
          title: "What export buyers should lock before bulk",
          excerpt:
            "Approved samples, size specs, packing list format, and inspection checkpoints keep cartons consistent.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Common buyer questions",
      lead: "Straight answers on sampling, lead times, customization, and how we work with export and local orders.",
      items: [
        {
          q: "What sock types do you manufacture?",
          a: "Casual, sports, diabetic, kids, formal, and custom private-label socks. Tell us the construction and market, and we will match the brief.",
        },
        {
          q: "Do you offer private labeling?",
          a: "Yes. We support custom designs, logos, size runs, hangtags, polybags, and carton marking for brand programs.",
        },
        {
          q: "How does sampling work?",
          a: "Share your tech pack or reference sample. We develop counter samples, confirm details, then move to bulk once approved.",
        },
        {
          q: "What are typical lead times?",
          a: "Lead time depends on yarn availability, style complexity, and volume. Share your target date with the inquiry and we will confirm a production window.",
        },
        {
          q: "Do you supply both export and local markets?",
          a: "Yes. We produce for international buyers and Pakistan wholesale distributors from the same manufacturing process.",
        },
        {
          q: "How do I start an inquiry?",
          a: "Use the quote form, WhatsApp, or the live chat. Include sock type, quantity range, destination, and any branding needs.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Request samples or a production quote",
      lead: "Share your required styles, branding needs, and volume. Our team will respond with sampling options and lead times.",
      office: "Head office",
      officeValue: "ZMK Hosiery, Faisalabad, Pakistan",
      sales: "Sales",
      production: "Production",
      productionValue: "Wholesale and private-label socks",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone / WhatsApp",
      market: "Market",
      sockType: "Sock type",
      quantity: "Estimated quantity",
      destination: "Destination country",
      message: "Message",
      marketOptions: {
        export: "Export",
        local: "Local / Pakistan",
        both: "Both",
      },
      sockOptions: {
        casual: "Casual socks",
        sports: "Sports socks",
        diabetic: "Diabetic socks",
        kids: "Kids socks",
        formal: "Formal socks",
        custom: "Custom / private label",
        mixed: "Mixed styles",
      },
      placeholders: {
        name: "Your name",
        company: "Brand or company",
        email: "you@company.com",
        phone: "+92 300 0000000",
        quantity: "e.g. 5,000 pairs",
        destination: "e.g. UAE, UK, USA",
        message: "Construction details, branding, packing, target delivery",
      },
      submit: "Send inquiry",
      submitted: "Inquiry ready",
      whatsappSend: "Send via WhatsApp",
      emailSend: "Send via email",
      note: "Choose WhatsApp or email to deliver your inquiry to our sales team.",
    },
    footer: {
      tag: "Socks manufacturer and exporter based in Faisalabad, Pakistan.",
      rights: "All rights reserved.",
    },
    sticky: {
      label: "Need a quote?",
      cta: "Request quote",
    },
    whatsapp: {
      label: "Chat on WhatsApp",
      prefill:
        "Hello ZMK Hosiery, I am interested in sock manufacturing. Please share sampling details.",
    },
    chat: {
      title: "ZMK assistant",
      subtitle: "Live assistant",
      open: "Open live chat",
      close: "Close chat",
      placeholder: "Ask about socks, sampling, or export...",
      send: "Send",
      thinking: "Typing...",
      welcome:
        "Hi, I can help with sock types, private label, sampling, and how to place an inquiry with ZMK Hosiery.",
      error:
        "Chat is unavailable right now. Please use WhatsApp or the quote form.",
      offline:
        "Live chat is offline right now. You can still reach us on WhatsApp or the contact form.",
    },
  },
  ur: {
    nav: {
      about: "تعارف",
      socks: "جرابیں",
      capabilities: "صلاحیتیں",
      gallery: "گیلری",
      insights: "معلومات",
      faq: "عمومی سوالات",
      contact: "رابطہ",
      quote: "کوٹیشن طلب کریں",
    },
    hero: {
      brand: "ZMK Hosiery",
      title: "پاکستان میں جرابوں کا مینوفیکچرر اور ایکسپورٹر",
      copy: "فیصل آباد میں واقع، ہم کیژول، اسپورٹس، ذیابیطس، بچوں، فارمل اور کسٹم جرابیں بین الاقوامی خریداروں اور مقامی ہول سیل کے لیے تیار کرتے ہیں۔",
      ctaPrimary: "کوٹیشن طلب کریں",
      ctaSecondary: "ہماری رینج دیکھیں",
    },
    markets: {
      label: "ہماری مارکیٹس",
      title: "ایکسپورٹ خریدار اور مقامی ہول سیل",
      lead: "ایک ہی پیداواری معیار بیرون ملک برانڈ پروگرامز اور پاکستان ہول سیل دونوں کو سپورٹ کرتا ہے۔",
      exportTitle: "ایکسپورٹ مینوفیکچرنگ",
      exportCopy:
        "بیرون ملک خریداروں کے لیے کسٹم اور پرائیویٹ لیبل جرابیں، مستقل سائزنگ اور بروقت شپمنٹ کے ساتھ۔",
      localTitle: "مقامی سپلائی",
      localCopy:
        "پاکستان کی دکانوں اور ڈسٹری بیوٹرز کے لیے ہول سیل پیکس، لچکدار آرڈر سائز اور تیز ڈیلیوری کے ساتھ۔",
      mapLabel: "سپلائی کے علاقے",
      regions: [
        "پاکستان",
        "مشرق وسطیٰ",
        "یورپ",
        "شمالی امریکہ",
        "افریقہ",
        "ایشیا پیسیفک",
      ],
    },
    about: {
      label: "ZMK Hosiery کے بارے میں",
      title: "بڑے پیمانے پر معیاری جرابوں کی تیاری",
      lead: "ہم فیصل آباد کی سہولت سے ایکسپورٹ اور مقامی ہول سیل کے لیے جرابیں بناتے، فنش اور پیک کرتے ہیں۔",
      body: "یارن کے انتخاب سے پیکنگ تک ایک ہی ٹیم سیمپلنگ، بلک پروڈکشن اور کوالٹی کنٹرول سنبھالتی ہے۔ پرائیویٹ لیبلنگ پوری رینج پر دستیاب ہے۔",
      stats: [
        { value: "7.5M+", label: "سالانہ جوڑوں کی صلاحیت" },
        { value: "1000", label: "روزانہ درجن جوڑے" },
        { value: "ایکسپورٹ", label: "+ مقامی سپلائی" },
      ],
    },
    products: {
      label: "پروڈکٹ رینج",
      title: "ہر مارکیٹ کی ضرورت کے لیے جرابیں",
      lead: "معیاری ہول سیل اسٹائلز سے پرائیویٹ لیبل پروگرامز تک، ہم سیمپل تیار کر کے آپ کی مطلوبہ کنسٹرکشن اسکیل کرتے ہیں۔",
      items: [
        {
          name: "کیژول جرابیں",
          note: "ریٹیل اور ہول سیل پیکس کے لیے روزمرہ کاٹن اور بلینڈ جوڑے۔",
          alt: "ZMK Hosiery کی کیژول کاٹن جرابیں",
        },
        {
          name: "اسپورٹس جرابیں",
          note: "دوڑ، جم اور آؤٹ ڈور کے لیے کشنڈ اور سانس لینے والی کنسٹرکشن۔",
          alt: "فعال استعمال کی اسپورٹس جرابیں",
        },
        {
          name: "ذیابیطس جرابیں",
          note: "حساس پاؤں کے لیے نرم اور نان بائنڈنگ کمفرٹ جرابیں۔",
          alt: "ذیابیطس کے لیے نرم جرابیں",
        },
        {
          name: "بچوں کی جرابیں",
          note: "روزانہ استعمال کے لیے پائیدار سائز اور رنگ۔",
          alt: "بچوں کی پائیدار جرابیں",
        },
        {
          name: "فارمل جرابیں",
          note: "مردوں اور خواتین کے لیے ڈریس، اینکل اور کریو جرابیں۔",
          alt: "فارمل ڈریس جرابیں",
        },
        {
          name: "کسٹم جرابیں",
          note: "آپ کی برانڈنگ، سائزنگ اور پیکنگ کے ساتھ پرائیویٹ لیبل ڈیزائن۔",
          alt: "کسٹم پرائیویٹ لیبل جرابیں",
        },
      ],
    },
    gallery: {
      label: "اصل سیمپلز",
      title: "ہماری پروڈکشن سے جرابیں",
      lead: "ZMK کے اصل سیمپلز، کسٹم گرافکس، بچوں کے پیکس اور ایتھلیٹک اینکل اسٹائلز سمیت۔",
    },
    capabilities: {
      label: "صلاحیتیں",
      title: "سیمپل سے پیکڈ کارٹن تک",
      lead: "معیاری اور پرائیویٹ لیبل آرڈرز کے لیے واضح عمل تاکہ ایکسپورٹ اور مقامی آرڈر شیڈول پر رہیں۔",
      download: "کیپبلٹی شیٹ ڈاؤن لوڈ کریں",
      items: [
        {
          title: "یارن سورسنگ",
          copy: "ہر جراب کنسٹرکشن کے مطابق کاٹن، بلینڈز اور پرفارمنس یارنز۔",
        },
        {
          title: "جراب ڈیولپمنٹ",
          copy: "کسٹم ڈیزائن، لوگو اور سائزنگ سمیت ہر قسم کے سیمپل۔",
        },
        {
          title: "مرچنڈائزنگ",
          copy: "روزانہ آرڈر ٹریکنگ تاکہ تاخیر شپنگ سے پہلے سامنے آئے۔",
        },
        {
          title: "پروڈکشن پلاننگ",
          copy: "آپ کے والیوم اور ڈیلیوری تاریخوں کے مطابق نٹنگ صلاحیت۔",
        },
        {
          title: "کوالٹی کنٹرول",
          copy: "کارٹن بند ہونے سے پہلے سائز، فنش اور پیکنگ چیک۔",
        },
        {
          title: "بروقت ڈیلیوری",
          copy: "مقامی یا ایکسپورٹ فریٹ کے لیے لیبل شدہ جراب کارٹنز۔",
        },
      ],
    },
    insights: {
      label: "معلومات",
      title: "خریداروں اور برانڈ ٹیمز کے لیے نوٹس",
      lead: "جراب سورسنگ، میٹیریلز اور پاکستان مینوفیکچرر کے ساتھ کام پر مختصر عملی رہنمائی۔",
      posts: [
        {
          title: "پرائیویٹ لیبل جراب آرڈر کیسے بریف کریں",
          excerpt:
            "کنسٹرکشن، یارن، سائز، برانڈنگ، پیکنگ اور شپ تاریخ پہلے شیئر کریں تاکہ سیمپلنگ راؤنڈز کم ہوں۔",
        },
        {
          title: "ریٹیل جرابوں کے لیے کاٹن بمقابلہ بلینڈ",
          excerpt:
            "کاٹن ہینڈ فیل میں بہتر ہے۔ بلینڈز اسٹریچ، پائیداری اور رنگ برقرار رکھنے میں مدد دیتے ہیں۔",
        },
        {
          title: "بلک سے پہلے ایکسپورٹ خریدار کیا فائنل کریں",
          excerpt:
            "منظور شدہ سیمپل، سائز سپیکس، پیکنگ فارمیٹ اور انسپکشن پوائنٹس کارٹنز کو مستقل رکھتے ہیں۔",
        },
      ],
    },
    faq: {
      label: "عمومی سوالات",
      title: "خریداروں کے عام سوالات",
      lead: "سیمپلنگ، لیڈ ٹائم، کسٹمائزیشن اور ایکسپورٹ/مقامی آرڈرز پر سیدھے جوابات۔",
      items: [
        {
          q: "آپ کون سی جرابیں بناتے ہیں؟",
          a: "کیژول، اسپورٹس، ذیابیطس، بچوں، فارمل اور کسٹم پرائیویٹ لیبل جرابیں۔ کنسٹرکشن اور مارکیٹ بتائیں، ہم بریف میچ کریں گے۔",
        },
        {
          q: "کیا پرائیویٹ لیبلنگ دستیاب ہے؟",
          a: "جی ہاں۔ کسٹم ڈیزائن، لوگو، سائز رنز، ٹیگز، پولی بیگز اور کارٹن مارکنگ سپورٹ کرتے ہیں۔",
        },
        {
          q: "سیمپلنگ کیسے ہوتی ہے؟",
          a: "ٹیک پیک یا ریفرنس سیمپل بھیجیں۔ ہم کاؤنٹر سیمپل تیار کرتے ہیں، تفصیل کنفرم کرتے ہیں، پھر بلک پر جاتے ہیں۔",
        },
        {
          q: "لیڈ ٹائم کیا ہوتا ہے؟",
          a: "یارن دستیابی، اسٹائل اور والیوم پر منحصر ہے۔ اپنی تاریخ انکوائری میں لکھیں، ہم پروڈکشن ونڈو کنفرم کریں گے۔",
        },
        {
          q: "کیا آپ ایکسپورٹ اور مقامی دونوں سپلائی کرتے ہیں؟",
          a: "جی ہاں۔ بین الاقوامی خریداروں اور پاکستان ہول سیل دونوں کے لیے ایک ہی مینوفیکچرنگ عمل سے پیداوار کرتے ہیں۔",
        },
        {
          q: "انکوائری کیسے شروع کریں؟",
          a: "کوٹ فارم، واٹس ایپ یا لائیو چیٹ استعمال کریں۔ جراب کی قسم، مقدار، منزل اور برانڈنگ کی تفصیل شامل کریں۔",
        },
      ],
    },
    contact: {
      label: "رابطہ",
      title: "سیمپل یا پروڈکشن کوٹ طلب کریں",
      lead: "مطلوبہ اسٹائلز، برانڈنگ اور والیوم شیئر کریں۔ ہماری ٹیم سیمپلنگ آپشنز اور لیڈ ٹائم کے ساتھ جواب دے گی۔",
      office: "ہیڈ آفس",
      officeValue: "ZMK Hosiery، فیصل آباد، پاکستان",
      sales: "سیلز",
      production: "پروڈکشن",
      productionValue: "ہول سیل اور پرائیویٹ لیبل جرابیں",
      name: "نام",
      company: "کمپنی",
      email: "ای میل",
      phone: "فون / واٹس ایپ",
      market: "مارکیٹ",
      sockType: "جراب کی قسم",
      quantity: "اندازاً مقدار",
      destination: "منزل ملک",
      message: "پیغام",
      marketOptions: {
        export: "ایکسپورٹ",
        local: "مقامی / پاکستان",
        both: "دونوں",
      },
      sockOptions: {
        casual: "کیژول جرابیں",
        sports: "اسپورٹس جرابیں",
        diabetic: "ذیابیطس جرابیں",
        kids: "بچوں کی جرابیں",
        formal: "فارمل جرابیں",
        custom: "کسٹم / پرائیویٹ لیبل",
        mixed: "مخلوط اسٹائلز",
      },
      placeholders: {
        name: "آپ کا نام",
        company: "برانڈ یا کمپنی",
        email: "you@company.com",
        phone: "+92 300 0000000",
        quantity: "مثلاً 5,000 جوڑے",
        destination: "مثلاً UAE، UK، USA",
        message: "کنسٹرکشن، برانڈنگ، پیکنگ، مطلوبہ ڈیلیوری",
      },
      submit: "انکوائری بھیجیں",
      submitted: "انکوائری تیار",
      whatsappSend: "واٹس ایپ سے بھیجیں",
      emailSend: "ای میل سے بھیجیں",
      note: "اپنی انکوائری سیلز ٹیم تک پہنچانے کے لیے واٹس ایپ یا ای میل منتخب کریں۔",
    },
    footer: {
      tag: "فیصل آباد، پاکستان میں جرابوں کا مینوفیکچرر اور ایکسپورٹر۔",
      rights: "جملہ حقوق محفوظ ہیں۔",
    },
    sticky: {
      label: "کوٹ چاہیے؟",
      cta: "کوٹیشن طلب کریں",
    },
    whatsapp: {
      label: "واٹس ایپ پر بات کریں",
      prefill:
        "السلام علیکم ZMK Hosiery، مجھے جراب مینوفیکچرنگ میں دلچسپی ہے۔ براہ کرم سیمپلنگ کی تفصیل بھیجیں۔",
    },
    chat: {
      title: "ZMK اسسٹنٹ",
      subtitle: "لائیو اسسٹنٹ",
      open: "لائیو چیٹ کھولیں",
      close: "چیٹ بند کریں",
      placeholder: "جرابوں، سیمپلنگ یا ایکسپورٹ کے بارے میں پوچھیں...",
      send: "بھیجیں",
      thinking: "لکھ رہا ہے...",
      welcome:
        "سلام، میں جرابوں کی اقسام، پرائیویٹ لیبل، سیمپلنگ اور ZMK Hosiery کو انکوائری بھیجنے میں مدد کر سکتا ہوں۔",
      error: "چیٹ اب دستیاب نہیں۔ واٹس ایپ یا کوٹ فارم استعمال کریں۔",
      offline:
        "لائیو چیٹ اب آف لائن ہے۔ آپ واٹس ایپ یا رابطہ فارم استعمال کر سکتے ہیں۔",
    },
  },
};

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? DeepStringify<U>[]
      : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<(typeof translations)["en"]>;
