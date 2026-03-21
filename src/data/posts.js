import cover1 from "../assets/image/home/blog-1.jpg";
import cover2 from "../assets/image/home/blog-2.jpg";
import cover3 from "../assets/image/home/blog-3.jpg";
import cover4 from "../assets/image/home/blog-4.jpg";

const POST_ITEMS = [
  {
    slug: "master-class-for-beginners",
    title: {
      uk: "Як проходить майстер-клас для новачків?",
      en: "What is a workshop for beginners like?",
    },
    cover: cover1,
    introTitle: {
      uk: "Дізнайтесь, як створити свою першу квітку у стилі Петриківки!",
      en: "Learn how to paint your first flower in the Petrykivka style.",
    },
    introText: {
      uk:
        "На майстер-класі ви отримаєте всі необхідні матеріали — пензлі, фарби та заготовки. Під керівництвом Наталії Спиридонової ви крок за кроком створите власну квітку у традиційному стилі Петриківського розпису, дізнаєтесь про основні елементи та секрети цієї унікальної української техніки.",
      en:
        "At the workshop, you receive everything you need: brushes, paints, and prepared materials. Guided by Nataliia Spyrydonova, you will paint your own flower step by step in the traditional Petrykivka style and discover the core elements of this unique Ukrainian technique.",
    },
    details: {
      uk: [
        "Заняття проходить у теплій, дружній атмосфері й не вимагає попереднього досвіду. Майстер із задоволенням допоможе кожному учаснику, тож навіть новачки зможуть легко освоїти базові мазки та створити красиву роботу власними руками. Наприкінці майстер-класу ви заберете свій розписаний виріб із собою як пам’ятку про творчий і натхненний час.",
        "Після демонстрації технік учасники працюють у власному темпі. Майстриня супроводжує кожного, допомагає з формою, ритмом композиції та підбором кольорів.",
        "У фіналі ви забираєте готову роботу із собою, а також отримуєте рекомендації для домашньої практики.",
      ],
      en: [
        "The class takes place in a warm and friendly atmosphere and requires no previous experience. The artist supports every participant, so even complete beginners can master the basic strokes and create a beautiful piece by hand. At the end, you take your painted work home as a memory of a creative and inspiring experience.",
        "After the demonstration, participants work at their own pace. The teacher guides each person, helping with shape, composition rhythm, and color choice.",
        "In the end, you leave with a finished artwork and practical tips for continuing at home.",
      ],
    },
    facts: {
      uk: ["Тривалість: 2 години", "Рівень: Початковий", "Матеріали включені у вартість"],
      en: ["Duration: 2 hours", "Level: Beginner", "Materials included"],
    },
  },
  {
    slug: "petrykivka-in-modern-interior",
    title: {
      uk: "Петриківка в сучасному інтер'єрі",
      en: "Petrykivka in a modern interior",
    },
    cover: cover2,
    introTitle: {
      uk: "Ідеї, як поєднати традицію та сучасність у вашому домі",
      en: "Ideas for blending tradition and modern living in your home",
    },
    introText: {
      uk:
        "Петриківський розпис гармонійно виглядає в мінімалістичних і сучасних просторах. Його яскраві природні мотиви додають інтер’єру тепла, характеру та відчуття живої традиції. Головне — правильно обрати акцент, масштаб орнаменту та колірну пару, щоб розпис виглядав органічно й підкреслював стиль простору.",
      en:
        "Petrykivka painting fits beautifully into minimalist and contemporary interiors. Its vivid natural motifs bring warmth, character, and a sense of living tradition into a room. The key is choosing the right accent, ornament scale, and color pairing so the painting feels natural in the space.",
    },
    details: {
      uk: [
        "Для нейтральних інтер'єрів добре працюють точкові акценти: декоративна тарілка, невелике панно або розписана скринька. Такі деталі додають кольору та індивідуальності, не перевантажуючи інтер’єр і зберігаючи його легкість.",
        "У світлих приміщеннях композиції з теплими червоними й зеленими відтінками додають глибини та живої енергії.",
        "Якщо простір вже насичений кольором, краще обирати графічні мотиви з меншою кількістю деталей.",
      ],
      en: [
        "In neutral interiors, small accents work best: a decorative plate, a small panel, or a painted box. These pieces add color and personality without overloading the room.",
        "In bright spaces, compositions with warm reds and greens add depth and vibrant energy.",
        "If a room already has strong colors, graphic motifs with fewer details usually work better.",
      ],
    },
    facts: {
      uk: ["Підходить для квартир і студій", "Акценти працюють краще за перевантаження", "Можливе індивідуальне замовлення композиції"],
      en: ["Suitable for apartments and studios", "Accents work better than overload", "Custom compositions are available"],
    },
  },
  {
    slug: "painting-as-a-gift",
    title: {
      uk: "Розпис на подарунок: що обрати?",
      en: "Painted gifts: what should you choose?",
    },
    cover: cover3,
    introTitle: {
      uk: "Поради щодо індивідуального підбору предметів з розписом",
      en: "Tips for choosing a hand-painted gift with care",
    },
    introText: {
      uk:
        "Подарунок із ручним розписом завжди про увагу до людини. Ви можете обрати як практичний предмет щоденного вжитку, так і пам'ятний декор, який стане особливою деталлю в домі та нагадуватиме про важливу подію.",
      en:
        "A hand-painted gift is always about care and attention. You can choose either a practical everyday object or a memorable decorative piece that becomes a meaningful detail in the home.",
    },
    details: {
      uk: [
        "Для сімейних подій часто обирають тарілки, кухонні дошки або панно з теплими квітковими мотивами. Такий подарунок виглядає щиро й душевно, адже кожен орнамент створюється вручну і має свій настрій та характер.",
        "Для особистих подарунків добре працює персоналізація: ініціали, важлива дата або символічні елементи композиції.",
        "Перед замовленням варто врахувати стиль інтер'єру, улюблені кольори та характер події.",
      ],
      en: [
        "For family occasions, people often choose plates, kitchen boards, or panels with warm floral motifs. Such gifts feel sincere and heartfelt because every ornament is created by hand.",
        "For personal gifts, customization works beautifully: initials, an important date, or symbolic elements in the composition.",
        "Before ordering, it is worth considering the interior style, favorite colors, and the nature of the occasion.",
      ],
    },
    facts: {
      uk: ["Персоналізація доступна", "Терміни виготовлення узгоджуються індивідуально", "Є подарункові сертифікати на майстер-класи"],
      en: ["Personalization available", "Production timelines are discussed individually", "Workshop gift certificates are available"],
    },
  },
  {
    slug: "petrykivka-for-beginners",
    title: {
      uk: "Петриківський розпис: що треба знати початківцю",
      en: "Petrykivka painting: what beginners should know",
    },
    cover: cover4,
    introTitle: {
      uk: "Фарби, пензлі, папір - усе про старт у розписі",
      en: "Paints, brushes, and paper: everything you need to begin",
    },
    introText: {
      uk:
        "Почати простіше, ніж здається. Для перших вправ достатньо базового набору матеріалів і розуміння кількох опорних мазків, з яких складаються більшість елементів петриківського розпису. Трохи практики допоможе відчути рух пензля і поступово навчитися створювати листочки, ягідки та квіткові орнаменти.",
      en:
        "Getting started is easier than it seems. For your first exercises, a basic set of materials and a few core strokes are enough, because most Petrykivka elements grow from them. A little practice helps you feel the brush movement and gradually learn leaves, berries, and floral ornaments.",
    },
    details: {
      uk: [
        "Найзручніше стартувати з гладкого паперу середньої щільності та синтетичних пензлів з тонким кінчиком. Вони добре тримають форму і дозволяють легко контролювати мазок, що особливо важливо на початку навчання. Також варто підготувати кілька яскравих фарб, щоб одразу спробувати поєднання кольорів і відчути характерну декоративність розпису.",
        "Перші вправи краще робити в одному-двох кольорах, щоб зосередитись на формі мазка та ритмі елементів.",
        "Регулярна практика короткими підходами дає кращий результат, ніж рідкісні довгі сесії.",
      ],
      en: [
        "It is easiest to start with smooth medium-weight paper and synthetic brushes with a fine tip. They hold their shape well and make stroke control easier, which is especially important at the beginning. A few bright paints are also enough to start exploring color combinations and the decorative character of the style.",
        "It is best to begin in one or two colors so you can focus on stroke shape and element rhythm.",
        "Regular short practice sessions usually work better than rare long ones.",
      ],
    },
    facts: {
      uk: ["Оптимально: 20-30 хвилин практики на день", "Почніть з базових елементів, а не складних композицій", "Живий майстер-клас пришвидшує прогрес"],
      en: ["Best approach: 20-30 minutes of practice per day", "Start with basic elements, not complex compositions", "A live workshop speeds up progress"],
    },
  },
];

export function getPosts(language = "uk") {
  return POST_ITEMS.map((item) => ({
    ...item,
    title: item.title[language],
    introTitle: item.introTitle[language],
    introText: item.introText[language],
    details: item.details[language],
    facts: item.facts[language],
  }));
}

export const posts = getPosts("uk");
