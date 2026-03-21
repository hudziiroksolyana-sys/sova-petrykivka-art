import shop1 from "../assets/image/Shop/shop1.jpg";
import shop2 from "../assets/image/Shop/shop2.jpg";
import shop3 from "../assets/image/Shop/shop3.jpg";
import shop4 from "../assets/image/Shop/shop4.jpg";
import shop5 from "../assets/image/Shop/shop5.jpg";
import shop6 from "../assets/image/Shop/shop6.jpg";
import shop7 from "../assets/image/Shop/shop7.jpg";
import shop8 from "../assets/image/Shop/shop8.jpg";
import shop9 from "../assets/image/Shop/shop9.jpg";
import shop10 from "../assets/image/Shop/shop10.jpg";
import shop11 from "../assets/image/Shop/IMG_3976 1.jpg";
import shop12 from "../assets/image/Shop/shop12.jpg";
import shop13 from "../assets/image/Shop/shop13.jpg";
import shop14 from "../assets/image/Shop/shop14.jpg";
import shop15 from "../assets/image/Shop/shop15.jpg";

const PRODUCT_ITEMS = [
  {
    id: 1,
    title: { uk: "Тарілка «Червона квітка»", en: "Plate “Red Flower”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "1200 ₴",
    image: shop1,
    category: { uk: "Тарілки", en: "Plates" },
    description: {
      uk: "Класична тарілка з яскравою квіткою — акцент для сервірування або настінного декору.",
      en: "A classic plate with a vivid flower, perfect as a table accent or wall decor.",
    },
    details: {
      uk: ["Ø 26 см", "Покриття: захисний лак", "Догляд: суха серветка", "Термін виконання: 3–5 днів"],
      en: ["Ø 26 cm", "Finish: protective varnish", "Care: dry cloth", "Production time: 3–5 days"],
    },
  },
  {
    id: 2,
    title: { uk: "Годинник «Казковий півень»", en: "Clock “Fairy Rooster”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "1200 ₴",
    image: shop2,
    category: { uk: "Предмети побуту", en: "Home items" },
    inStock: false,
    description: {
      uk: "Настінний годинник з розписом, що додає інтер’єру тепла та характеру.",
      en: "A hand-painted wall clock that adds warmth and character to an interior.",
    },
    details: {
      uk: ["Ø 30 см", "Механізм: безшумний", "Догляд: суха серветка", "Термін виконання: 5–7 днів"],
      en: ["Ø 30 cm", "Mechanism: silent", "Care: dry cloth", "Production time: 5–7 days"],
    },
  },
  {
    id: 3,
    title: { uk: "Магніт «Польові квіти»", en: "Magnet “Wildflowers”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "200 ₴",
    image: shop3,
    category: { uk: "Предмети побуту", en: "Home items" },
    description: {
      uk: "Невеликий декоративний магніт із легким квітковим мотивом.",
      en: "A small decorative magnet with a delicate floral motif.",
    },
    details: {
      uk: ["8 × 8 см", "Покриття: лак", "Догляд: суха серветка", "Термін виконання: 1–2 дні"],
      en: ["8 × 8 cm", "Finish: varnish", "Care: dry cloth", "Production time: 1–2 days"],
    },
  },
  {
    id: 4,
    title: { uk: "Блокнот «Народна квітка»", en: "Notebook “Folk Flower”" },
    material: {
      uk: "Акрил, папір, Петриківський стиль",
      en: "Acrylic, paper, Petrykivka style",
    },
    price: "1200 ₴",
    image: shop4,
    category: { uk: "Предмети побуту", en: "Home items" },
    description: {
      uk: "Блокнот з авторською обкладинкою для натхнення, ескізів та записів.",
      en: "A notebook with an original painted cover for sketches, notes, and inspiration.",
    },
    details: {
      uk: ["A5", "120 сторінок", "Обкладинка: ламінування", "Термін виконання: 2–3 дні"],
      en: ["A5", "120 pages", "Cover: laminated", "Production time: 2–3 days"],
    },
  },
  {
    id: 5,
    title: { uk: "Дошка кухонна «Квітковий оберіг»", en: "Kitchen Board “Floral Charm”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "2000 ₴",
    image: shop5,
    category: { uk: "Предмети побуту", en: "Home items" },
    inStock: false,
    description: {
      uk: "Кухонна дошка з розписом — і функціональний предмет, і декор.",
      en: "A painted kitchen board that works both as a practical item and as decor.",
    },
    details: {
      uk: ["35 × 20 см", "Покриття: харчовий лак", "Догляд: суха серветка", "Термін виконання: 3–5 днів"],
      en: ["35 × 20 cm", "Finish: food-safe varnish", "Care: dry cloth", "Production time: 3–5 days"],
    },
  },
  {
    id: 6,
    title: { uk: "Екосумка «Квітковий настрій»", en: "Eco Bag “Floral Mood”" },
    material: {
      uk: "Акрил, текстиль, Петриківський стиль",
      en: "Acrylic, textile, Petrykivka style",
    },
    price: "200 ₴",
    image: shop6,
    category: { uk: "Предмети побуту", en: "Home items" },
    description: {
      uk: "Текстильна екосумка з розписом — легка, містка і зручна щодня.",
      en: "A painted textile eco bag that is light, roomy, and comfortable for daily use.",
    },
    details: {
      uk: ["38 × 42 см", "Тканина: бавовна", "Догляд: ручне прання", "Термін виконання: 2–4 дні"],
      en: ["38 × 42 cm", "Fabric: cotton", "Care: hand wash", "Production time: 2–4 days"],
    },
  },
  {
    id: 7,
    title: { uk: "Чашка «Квітка літа»", en: "Cup “Summer Flower”" },
    material: {
      uk: "Акрил, кераміка, Петриківський стиль",
      en: "Acrylic, ceramic, Petrykivka style",
    },
    price: "1200 ₴",
    image: shop7,
    category: { uk: "Чашки", en: "Cups" },
    description: {
      uk: "Керамічна чашка з розписом — для ранкових ритуалів і теплого настрою.",
      en: "A painted ceramic cup for cozy morning rituals and a warm mood.",
    },
    details: {
      uk: ["350 мл", "Покриття: захисний лак", "Догляд: ручне миття", "Термін виконання: 3–5 днів"],
      en: ["350 ml", "Finish: protective varnish", "Care: hand wash", "Production time: 3–5 days"],
    },
  },
  {
    id: 8,
    title: { uk: "Екосумка «Квітковий настрій»", en: "Eco Bag “Floral Mood”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "2000 ₴",
    image: shop8,
    category: { uk: "Предмети побуту", en: "Home items" },
    description: {
      uk: "Преміальна версія екосумки з розписом, підкреслює стиль і індивідуальність.",
      en: "A premium painted eco bag version that highlights style and individuality.",
    },
    details: {
      uk: ["38 × 42 см", "Тканина: бавовна", "Догляд: ручне прання", "Термін виконання: 3–5 днів"],
      en: ["38 × 42 cm", "Fabric: cotton", "Care: hand wash", "Production time: 3–5 days"],
    },
  },
  {
    id: 9,
    title: { uk: "Свічник «Тепло традицій»", en: "Candle Holder “Warmth of Tradition”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "200 ₴",
    image: shop9,
    category: { uk: "Декор", en: "Decor" },
    inStock: false,
    description: {
      uk: "Невеликий свічник, що створює затишок і додає тепла простору.",
      en: "A small candle holder that creates coziness and adds warmth to a space.",
    },
    details: {
      uk: ["10 × 8 см", "Покриття: лак", "Догляд: суха серветка", "Термін виконання: 1–2 дні"],
      en: ["10 × 8 cm", "Finish: varnish", "Care: dry cloth", "Production time: 1–2 days"],
    },
  },
  {
    id: 10,
    title: { uk: "Шкатулка «Казковий птах»", en: "Box “Fairy Bird”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "1000 ₴",
    image: shop10,
    category: { uk: "Скриньки", en: "Boxes" },
    description: {
      uk: "Декоративна шкатулка для зберігання дрібниць з яскравим пташиним мотивом.",
      en: "A decorative box for small treasures with a vivid bird motif.",
    },
    details: {
      uk: ["20 × 12 см", "Покриття: лак", "Догляд: суха серветка", "Термін виконання: 4–6 днів"],
      en: ["20 × 12 cm", "Finish: varnish", "Care: dry cloth", "Production time: 4–6 days"],
    },
  },
  {
    id: 11,
    title: { uk: "Обкладинка «Квітковий оберіг»", en: "Cover “Floral Charm”" },
    material: {
      uk: "Акрил, шкіра, Петриківський стиль",
      en: "Acrylic, leather, Petrykivka style",
    },
    price: "800 ₴",
    image: shop11,
    category: { uk: "Декор", en: "Decor" },
    description: {
      uk: "Обкладинка для паспорта з авторським розписом — стильний і практичний аксесуар.",
      en: "A hand-painted passport cover that is both stylish and practical.",
    },
    details: {
      uk: ["Розмір: 13 × 9 см", "Матеріал: натуральна шкіра", "Догляд: суха серветка", "Термін виконання: 3–5 днів"],
      en: ["Size: 13 × 9 cm", "Material: genuine leather", "Care: dry cloth", "Production time: 3–5 days"],
    },
  },
  {
    id: 12,
    title: { uk: "Браслет «Квітка щастя»", en: "Bracelet “Flower of Happiness”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "600 ₴",
    image: shop12,
    category: { uk: "Декор", en: "Decor" },
    description: {
      uk: "Легкий браслет з квітковим розписом — акцентний елемент образу.",
      en: "A lightweight bracelet with floral painting, designed as a bright accent.",
    },
    details: {
      uk: ["Ø 6,5 см", "Покриття: лак", "Догляд: суха серветка", "Термін виконання: 2–3 дні"],
      en: ["Ø 6.5 cm", "Finish: varnish", "Care: dry cloth", "Production time: 2–3 days"],
    },
  },
  {
    id: 13,
    title: { uk: "Браслет «Квітка щастя»", en: "Bracelet “Flower of Happiness”" },
    material: {
      uk: "Акрил, кераміка, Петриківський стиль",
      en: "Acrylic, ceramic, Petrykivka style",
    },
    price: "650 ₴",
    image: shop13,
    category: { uk: "Декор", en: "Decor" },
    description: {
      uk: "Керамічний браслет з насиченим розписом і теплою глянцевою фактурою.",
      en: "A ceramic bracelet with rich painting and a warm glossy texture.",
    },
    details: {
      uk: ["Ø 6,5 см", "Покриття: глазур", "Догляд: суха серветка", "Термін виконання: 2–3 дні"],
      en: ["Ø 6.5 cm", "Finish: glaze", "Care: dry cloth", "Production time: 2–3 days"],
    },
  },
  {
    id: 14,
    title: { uk: "Підвіска «Чарівна квітка»", en: "Pendant “Magic Flower”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "1000 ₴",
    image: shop14,
    category: { uk: "Декор", en: "Decor" },
    description: {
      uk: "Підвіска з квітковим мотивом — лаконічний етно-акцент.",
      en: "A pendant with a floral motif, a concise ethnic accent.",
    },
    details: {
      uk: ["Ø 7 см", "Шнурок в комплекті", "Покриття: лак", "Термін виконання: 2–3 дні"],
      en: ["Ø 7 cm", "Cord included", "Finish: varnish", "Production time: 2–3 days"],
    },
  },
  {
    id: 15,
    title: { uk: "Дошка кухонна «Червона калина»", en: "Kitchen Board “Red Viburnum”" },
    material: {
      uk: "Акрил, дерево, Петриківський стиль",
      en: "Acrylic, wood, Petrykivka style",
    },
    price: "800 ₴",
    image: shop15,
    category: { uk: "Предмети побуту", en: "Home items" },
    description: {
      uk: "Кухонна дошка з калиновим розписом — традиційний мотив у сучасній формі.",
      en: "A kitchen board with viburnum painting, a traditional motif in a modern form.",
    },
    details: {
      uk: ["33 × 18 см", "Покриття: харчовий лак", "Догляд: суха серветка", "Термін виконання: 3–5 днів"],
      en: ["33 × 18 cm", "Finish: food-safe varnish", "Care: dry cloth", "Production time: 3–5 days"],
    },
  },
];

export const SHOP_CATEGORIES = {
  uk: ["Всі", "Предмети побуту", "Картини", "Чашки", "Тарілки", "Скриньки", "Декор", "Панно"],
  en: ["All", "Home items", "Paintings", "Cups", "Plates", "Boxes", "Decor", "Panels"],
};

export function getProducts(language = "uk") {
  return PRODUCT_ITEMS.map((item) => ({
    ...item,
    title: item.title[language],
    material: item.material[language],
    category: item.category[language],
    description: item.description[language],
    details: item.details[language],
  }));
}

export const PRODUCTS = getProducts("uk");
