import { Letter, Unit } from './types';

export const ARABIC_LETTERS: Letter[] = [
  {
    id: 'alif',
    char: 'أ',
    name: 'Alif',
    pronunciation: 'Ah',
    forms: {
      isolated: 'ا',
      initial: 'ا',
      medial: 'ـا',
      final: 'ـا',
    },
    examples: [
      {
        word: 'أرنب',
        transliteration: 'Arnab',
        meaning: 'Rabbit',
        image: 'https://img.icons8.com/doodle/200/000000/rabbit.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'فأر',
        transliteration: 'Fa\'r',
        meaning: 'Mouse',
        image: 'https://img.icons8.com/doodle/200/000000/mouse.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'عصا',
        transliteration: 'Asa',
        meaning: 'Stick',
        image: 'https://img.icons8.com/doodle/200/000000/stick.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'أنا',
        transliteration: 'Ana',
        meaning: 'I / Me',
        image: 'https://img.icons8.com/doodle/200/000000/person-male.png',
        position: 'isolated',
        highlightedIndex: 0
      }
    ],
  },
  {
    id: 'ba',
    char: 'ب',
    name: 'Ba',
    pronunciation: 'Ba',
    forms: {
      isolated: 'ب',
      initial: 'بـ',
      medial: 'ـبـ',
      final: 'ـب',
    },
    examples: [
      {
        word: 'بيت',
        transliteration: 'Bayt',
        meaning: 'House',
        image: 'https://img.icons8.com/doodle/200/000000/home.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'جبل',
        transliteration: 'Jabal',
        meaning: 'Mountain',
        image: 'https://img.icons8.com/doodle/200/000000/mountain.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'كلب',
        transliteration: 'Kalb',
        meaning: 'Dog',
        image: 'https://img.icons8.com/doodle/200/000000/dog.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'باب',
        transliteration: 'Bab',
        meaning: 'Door',
        image: 'https://img.icons8.com/doodle/200/000000/door.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'ta',
    char: 'ت',
    name: 'Ta',
    pronunciation: 'Ta',
    forms: {
      isolated: 'ت',
      initial: 'تـ',
      medial: 'ـتـ',
      final: 'ـت',
    },
    examples: [
      {
        word: 'تفاحة',
        transliteration: 'Tuffaha',
        meaning: 'Apple',
        image: 'https://img.icons8.com/doodle/200/000000/apple.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'كتاب',
        transliteration: 'Kitab',
        meaning: 'Book',
        image: 'https://img.icons8.com/doodle/200/000000/book.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'بنت',
        transliteration: 'Bint',
        meaning: 'Girl',
        image: 'https://img.icons8.com/doodle/200/000000/girl.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'توت',
        transliteration: 'Toot',
        meaning: 'Berries',
        image: 'https://img.icons8.com/doodle/200/000000/raspberry.png',
        position: 'isolated',
        highlightedIndex: 0
      }
    ],
  },
  {
    id: 'tha',
    char: 'ث',
    name: 'Tha',
    pronunciation: 'Tha (as in Think)',
    forms: {
      isolated: 'ث',
      initial: 'ثـ',
      medial: 'ـثـ',
      final: 'ـث',
    },
    examples: [
      {
        word: 'ثعلب',
        transliteration: 'Tha\'lab',
        meaning: 'Fox',
        image: 'https://img.icons8.com/doodle/200/000000/fox.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'مثلث',
        transliteration: 'Muthallath',
        meaning: 'Triangle',
        image: 'https://img.icons8.com/doodle/200/000000/triangle.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'ليث',
        transliteration: 'Layth',
        meaning: 'Lion',
        image: 'https://img.icons8.com/doodle/200/000000/lion.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'أثاث',
        transliteration: 'Athath',
        meaning: 'Furniture',
        image: 'https://img.icons8.com/doodle/200/000000/furniture.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'jim',
    char: 'ج',
    name: 'Jim',
    pronunciation: 'J (as in Jam)',
    forms: {
      isolated: 'ج',
      initial: 'جـ',
      medial: 'ـجـ',
      final: 'ـج',
    },
    examples: [
      {
        word: 'جمل',
        transliteration: 'Jamal',
        meaning: 'Camel',
        image: 'https://img.icons8.com/doodle/200/000000/camel.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'شجرة',
        transliteration: 'Shajarah',
        meaning: 'Tree',
        image: 'https://img.icons8.com/doodle/200/000000/tree.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'ثلج',
        transliteration: 'Thalj',
        meaning: 'Snow / Ice',
        image: 'https://img.icons8.com/doodle/200/000000/snow.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'برج',
        transliteration: 'Burj',
        meaning: 'Tower',
        image: 'https://img.icons8.com/doodle/200/000000/tower.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'ha',
    char: 'ح',
    name: 'Ha',
    pronunciation: 'H (sharp, breathy)',
    forms: {
      isolated: 'ح',
      initial: 'حـ',
      medial: 'ـحـ',
      final: 'ـح',
    },
    examples: [
      {
        word: 'حوت',
        transliteration: 'Hoot',
        meaning: 'Whale',
        image: 'https://img.icons8.com/doodle/200/000000/whale.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'بحر',
        transliteration: 'Bahr',
        meaning: 'Sea',
        image: 'https://img.icons8.com/doodle/200/000000/sea.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'ملح',
        transliteration: 'Milh',
        meaning: 'Salt',
        image: 'https://img.icons8.com/doodle/200/000000/salt.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'تمساح',
        transliteration: 'Timsah',
        meaning: 'Crocodile',
        image: 'https://img.icons8.com/doodle/200/000000/crocodile.png',
        position: 'isolated',
        highlightedIndex: 4
      }
    ],
  },
  {
    id: 'kha',
    char: 'خ',
    name: 'Kha',
    pronunciation: 'Kh (as in Bach)',
    forms: {
      isolated: 'خ',
      initial: 'خـ',
      medial: 'ـخـ',
      final: 'ـخ',
    },
    examples: [
      {
        word: 'خروف',
        transliteration: 'Kharoof',
        meaning: 'Sheep',
        image: 'https://img.icons8.com/doodle/200/000000/sheep.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'نخلة',
        transliteration: 'Nakhlah',
        meaning: 'Palm Tree',
        image: 'https://img.icons8.com/doodle/200/000000/palm-tree.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'بطيخ',
        transliteration: 'Batteekh',
        meaning: 'Watermelon',
        image: 'https://img.icons8.com/doodle/200/000000/watermelon.png',
        position: 'final',
        highlightedIndex: 4
      },
      {
        word: 'صاروخ',
        transliteration: 'Sarookh',
        meaning: 'Rocket',
        image: 'https://img.icons8.com/doodle/200/000000/rocket.png',
        position: 'isolated',
        highlightedIndex: 4
      }
    ],
  },
  {
    id: 'dal',
    char: 'د',
    name: 'Dal',
    pronunciation: 'D',
    forms: {
      isolated: 'د',
      initial: 'د',
      medial: 'ـد',
      final: 'ـد',
    },
    examples: [
      {
        word: 'ديك',
        transliteration: 'Deek',
        meaning: 'Rooster',
        image: 'https://img.icons8.com/doodle/200/000000/rooster.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'حديقة',
        transliteration: 'Hadeeqah',
        meaning: 'Garden',
        image: 'https://img.icons8.com/doodle/200/000000/garden.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'يد',
        transliteration: 'Yad',
        meaning: 'Hand',
        image: 'https://img.icons8.com/doodle/200/000000/hand.png',
        position: 'final',
        highlightedIndex: 1
      },
      {
        word: 'ورد',
        transliteration: 'Ward',
        meaning: 'Flowers',
        image: 'https://img.icons8.com/doodle/200/000000/flower.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'thal',
    char: 'ذ',
    name: 'Thal',
    pronunciation: 'Th (as in The)',
    forms: {
      isolated: 'ذ',
      initial: 'ذ',
      medial: 'ـذ',
      final: 'ـذ',
    },
    examples: [
      {
        word: 'ذئب',
        transliteration: 'Dhi\'b',
        meaning: 'Wolf',
        image: 'https://img.icons8.com/doodle/200/000000/wolf.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'حذاء',
        transliteration: 'Hidha\'',
        meaning: 'Shoe',
        image: 'https://img.icons8.com/doodle/200/000000/shoe.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'قنفذ',
        transliteration: 'Qunfudh',
        meaning: 'Hedgehog',
        image: 'https://img.icons8.com/doodle/200/000000/hedgehog.png',
        position: 'final',
        highlightedIndex: 4
      },
      {
        word: 'أستاذ',
        transliteration: 'Ustadh',
        meaning: 'Teacher',
        image: 'https://img.icons8.com/doodle/200/000000/teacher.png',
        position: 'isolated',
        highlightedIndex: 5
      }
    ],
  },
  {
    id: 'ra',
    char: 'ر',
    name: 'Ra',
    pronunciation: 'R (rolled)',
    forms: {
      isolated: 'ر',
      initial: 'ر',
      medial: 'ـر',
      final: 'ـر',
    },
    examples: [
      {
        word: 'رمان',
        transliteration: 'Rumman',
        meaning: 'Pomegranate',
        image: 'https://img.icons8.com/doodle/200/000000/pomegranate.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'برج',
        transliteration: 'Burj',
        meaning: 'Tower',
        image: 'https://img.icons8.com/doodle/200/000000/tower.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'قمر',
        transliteration: 'Qamar',
        meaning: 'Moon',
        image: 'https://img.icons8.com/doodle/200/000000/moon.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'نار',
        transliteration: 'Nar',
        meaning: 'Fire',
        image: 'https://img.icons8.com/doodle/200/000000/fire.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'zay',
    char: 'ز',
    name: 'Zay',
    pronunciation: 'Z',
    forms: {
      isolated: 'ز',
      initial: 'ز',
      medial: 'ـز',
      final: 'ـز',
    },
    examples: [
      {
        word: 'زرافة',
        transliteration: 'Zarafah',
        meaning: 'Giraffe',
        image: 'https://img.icons8.com/doodle/200/000000/giraffe.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'ميزان',
        transliteration: 'Meezan',
        meaning: 'Scale',
        image: 'https://img.icons8.com/doodle/200/000000/scale.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'خبز',
        transliteration: 'Khubz',
        meaning: 'Bread',
        image: 'https://img.icons8.com/doodle/200/000000/bread.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'أرز',
        transliteration: 'Arz',
        meaning: 'Rice',
        image: 'https://img.icons8.com/doodle/200/000000/rice.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'sin',
    char: 'س',
    name: 'Sin',
    pronunciation: 'S',
    forms: {
      isolated: 'س',
      initial: 'سـ',
      medial: 'ـسـ',
      final: 'ـس',
    },
    examples: [
      {
        word: 'سمكة',
        transliteration: 'Samakah',
        meaning: 'Fish',
        image: 'https://img.icons8.com/doodle/200/000000/fish.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'تمساح',
        transliteration: 'Timsah',
        meaning: 'Crocodile',
        image: 'https://img.icons8.com/doodle/200/000000/crocodile.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'شمس',
        transliteration: 'Shams',
        meaning: 'Sun',
        image: 'https://img.icons8.com/doodle/200/000000/sun.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'جرس',
        transliteration: 'Jaras',
        meaning: 'Bell',
        image: 'https://img.icons8.com/doodle/200/000000/bell.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'shin',
    char: 'ش',
    name: 'Shin',
    pronunciation: 'Sh',
    forms: {
      isolated: 'ش',
      initial: 'شـ',
      medial: 'ـشـ',
      final: 'ـش',
    },
    examples: [
      {
        word: 'شمس',
        transliteration: 'Shams',
        meaning: 'Sun',
        image: 'https://img.icons8.com/doodle/200/000000/sun.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'منشار',
        transliteration: 'Minshar',
        meaning: 'Saw',
        image: 'https://img.icons8.com/doodle/200/000000/saw.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'ريش',
        transliteration: 'Reesh',
        meaning: 'Feathers',
        image: 'https://img.icons8.com/doodle/200/000000/feather.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'عش',
        transliteration: 'Ush',
        meaning: 'Nest',
        image: 'https://img.icons8.com/doodle/200/000000/nest.png',
        position: 'isolated',
        highlightedIndex: 1
      }
    ],
  },
  {
    id: 'sad',
    char: 'ص',
    name: 'Sad',
    pronunciation: 'S (emphatic)',
    forms: {
      isolated: 'ص',
      initial: 'صـ',
      medial: 'ـصـ',
      final: 'ـص',
    },
    examples: [
      {
        word: 'صقر',
        transliteration: 'Saqr',
        meaning: 'Falcon',
        image: 'https://img.icons8.com/doodle/200/000000/falcon.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'بصل',
        transliteration: 'Basal',
        meaning: 'Onion',
        image: 'https://img.icons8.com/doodle/200/000000/onion.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'مقص',
        transliteration: 'Miqass',
        meaning: 'Scissors',
        image: 'https://img.icons8.com/doodle/200/000000/scissors.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'قميص',
        transliteration: 'Qamees',
        meaning: 'Shirt',
        image: 'https://img.icons8.com/doodle/200/000000/shirt.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'dad',
    char: 'ض',
    name: 'Dad',
    pronunciation: 'D (emphatic)',
    forms: {
      isolated: 'ض',
      initial: 'ضـ',
      medial: 'ـضـ',
      final: 'ـض',
    },
    examples: [
      {
        word: 'ضفدع',
        transliteration: 'Difda\'',
        meaning: 'Frog',
        image: 'https://img.icons8.com/doodle/200/000000/frog.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'مضرب',
        transliteration: 'Midrab',
        meaning: 'Racket',
        image: 'https://img.icons8.com/doodle/200/000000/tennis-racket.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'بيض',
        transliteration: 'Bayd',
        meaning: 'Eggs',
        image: 'https://img.icons8.com/doodle/200/000000/eggs.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'أرض',
        transliteration: 'Ard',
        meaning: 'Earth / Ground',
        image: 'https://img.icons8.com/doodle/200/000000/earth.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'ta_emphatic',
    char: 'ط',
    name: 'Ta (Emphatic)',
    pronunciation: 'T (emphatic)',
    forms: {
      isolated: 'ط',
      initial: 'طـ',
      medial: 'ـطـ',
      final: 'ـط',
    },
    examples: [
      {
        word: 'طبيب',
        transliteration: 'Tabeeb',
        meaning: 'Doctor',
        image: 'https://img.icons8.com/doodle/200/000000/doctor.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'بطة',
        transliteration: 'Battah',
        meaning: 'Duck',
        image: 'https://img.icons8.com/doodle/200/000000/duck.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'قط',
        transliteration: 'Qitt',
        meaning: 'Cat',
        image: 'https://img.icons8.com/doodle/200/000000/cat.png',
        position: 'final',
        highlightedIndex: 1
      },
      {
        word: 'خياط',
        transliteration: 'Khayyat',
        meaning: 'Tailor',
        image: 'https://img.icons8.com/doodle/200/000000/tailor.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'za_emphatic',
    char: 'ظ',
    name: 'Za (Emphatic)',
    pronunciation: 'Z (emphatic)',
    forms: {
      isolated: 'ظ',
      initial: 'ظـ',
      medial: 'ـظـ',
      final: 'ـظ',
    },
    examples: [
      {
        word: 'ظرف',
        transliteration: 'Zarf',
        meaning: 'Envelope',
        image: 'https://img.icons8.com/doodle/200/000000/envelope.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'نظارة',
        transliteration: 'Nazzarah',
        meaning: 'Glasses',
        image: 'https://img.icons8.com/doodle/200/000000/glasses.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'حفظ',
        transliteration: 'Hifz',
        meaning: 'Preservation / Memorization',
        image: 'https://img.icons8.com/doodle/200/000000/brain.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'وعظ',
        transliteration: 'Wa\'z',
        meaning: 'Preaching',
        image: 'https://img.icons8.com/doodle/200/000000/preach.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'ain',
    char: 'ع',
    name: 'Ain',
    pronunciation: 'Ain (deep throat sound)',
    forms: {
      isolated: 'ع',
      initial: 'عـ',
      medial: 'ـعـ',
      final: 'ـع',
    },
    examples: [
      {
        word: 'عين',
        transliteration: 'Ain',
        meaning: 'Eye',
        image: 'https://img.icons8.com/doodle/200/000000/eye.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'ثعبان',
        transliteration: 'Thu\'ban',
        meaning: 'Snake',
        image: 'https://img.icons8.com/doodle/200/000000/snake.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'إصبع',
        transliteration: 'Isba\'',
        meaning: 'Finger',
        image: 'https://img.icons8.com/doodle/200/000000/finger.png',
        position: 'final',
        highlightedIndex: 3
      },
      {
        word: 'ذراع',
        transliteration: 'Dhira\'',
        meaning: 'Arm',
        image: 'https://img.icons8.com/doodle/200/000000/arm.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'ghain',
    char: 'غ',
    name: 'Ghain',
    pronunciation: 'Gh (gargling sound)',
    forms: {
      isolated: 'غ',
      initial: 'غـ',
      medial: 'ـغـ',
      final: 'ـغ',
    },
    examples: [
      {
        word: 'غزال',
        transliteration: 'Ghazal',
        meaning: 'Gazelle',
        image: 'https://img.icons8.com/doodle/200/000000/gazelle.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'ببغاء',
        transliteration: 'Babagha\'',
        meaning: 'Parrot',
        image: 'https://img.icons8.com/doodle/200/000000/parrot.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'صمغ',
        transliteration: 'Samgh',
        meaning: 'Glue',
        image: 'https://img.icons8.com/doodle/200/000000/glue.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'دماغ',
        transliteration: 'Dimagh',
        meaning: 'Brain',
        image: 'https://img.icons8.com/doodle/200/000000/brain.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'fa',
    char: 'ف',
    name: 'Fa',
    pronunciation: 'F',
    forms: {
      isolated: 'ف',
      initial: 'فـ',
      medial: 'ـفـ',
      final: 'ـف',
    },
    examples: [
      {
        word: 'فيل',
        transliteration: 'Feel',
        meaning: 'Elephant',
        image: 'https://img.icons8.com/doodle/200/000000/elephant.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'سفينة',
        transliteration: 'Safeenah',
        meaning: 'Ship',
        image: 'https://img.icons8.com/doodle/200/000000/ship.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'هاتف',
        transliteration: 'Hatif',
        meaning: 'Phone',
        image: 'https://img.icons8.com/doodle/200/000000/phone.png',
        position: 'final',
        highlightedIndex: 3
      },
      {
        word: 'خروف',
        transliteration: 'Kharoof',
        meaning: 'Sheep',
        image: 'https://img.icons8.com/doodle/200/000000/sheep.png',
        position: 'isolated',
        highlightedIndex: 4
      }
    ],
  },
  {
    id: 'qaf',
    char: 'ق',
    name: 'Qaf',
    pronunciation: 'Q (deep K)',
    forms: {
      isolated: 'ق',
      initial: 'قـ',
      medial: 'ـقـ',
      final: 'ـق',
    },
    examples: [
      {
        word: 'قلم',
        transliteration: 'Qalam',
        meaning: 'Pen',
        image: 'https://img.icons8.com/doodle/200/000000/pen.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'صقر',
        transliteration: 'Saqr',
        meaning: 'Falcon',
        image: 'https://img.icons8.com/doodle/200/000000/falcon.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'إبريق',
        transliteration: 'Ibreeq',
        meaning: 'Jug',
        image: 'https://img.icons8.com/doodle/200/000000/jug.png',
        position: 'final',
        highlightedIndex: 4
      },
      {
        word: 'صندوق',
        transliteration: 'Sandooq',
        meaning: 'Box',
        image: 'https://img.icons8.com/doodle/200/000000/box.png',
        position: 'isolated',
        highlightedIndex: 5
      }
    ],
  },
  {
    id: 'kaf',
    char: 'ك',
    name: 'Kaf',
    pronunciation: 'K',
    forms: {
      isolated: 'ك',
      initial: 'كـ',
      medial: 'ـكـ',
      final: 'ـك',
    },
    examples: [
      {
        word: 'كتاب',
        transliteration: 'Kitab',
        meaning: 'Book',
        image: 'https://img.icons8.com/doodle/200/000000/book.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'سمكة',
        transliteration: 'Samakah',
        meaning: 'Fish',
        image: 'https://img.icons8.com/doodle/200/000000/fish.png',
        position: 'medial',
        highlightedIndex: 2
      },
      {
        word: 'ديك',
        transliteration: 'Deek',
        meaning: 'Rooster',
        image: 'https://img.icons8.com/doodle/200/000000/rooster.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'شباك',
        transliteration: 'Shubbak',
        meaning: 'Window',
        image: 'https://img.icons8.com/doodle/200/000000/window.png',
        position: 'isolated',
        highlightedIndex: 4
      }
    ],
  },
  {
    id: 'lam',
    char: 'ل',
    name: 'Lam',
    pronunciation: 'L',
    forms: {
      isolated: 'ل',
      initial: 'لـ',
      medial: 'ـلـ',
      final: 'ـل',
    },
    examples: [
      {
        word: 'ليمون',
        transliteration: 'Laymoon',
        meaning: 'Lemon',
        image: 'https://img.icons8.com/doodle/200/000000/lemon.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'علم',
        transliteration: 'Alam',
        meaning: 'Flag',
        image: 'https://img.icons8.com/doodle/200/000000/flag.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'جمل',
        transliteration: 'Jamal',
        meaning: 'Camel',
        image: 'https://img.icons8.com/doodle/200/000000/camel.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'بصل',
        transliteration: 'Basal',
        meaning: 'Onion',
        image: 'https://img.icons8.com/doodle/200/000000/onion.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'mim',
    char: 'م',
    name: 'Mim',
    pronunciation: 'M',
    forms: {
      isolated: 'م',
      initial: 'مـ',
      medial: 'ـمـ',
      final: 'ـم',
    },
    examples: [
      {
        word: 'موز',
        transliteration: 'Mawz',
        meaning: 'Banana',
        image: 'https://img.icons8.com/doodle/200/000000/banana.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'شمس',
        transliteration: 'Shams',
        meaning: 'Sun',
        image: 'https://img.icons8.com/doodle/200/000000/sun.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'قلم',
        transliteration: 'Qalam',
        meaning: 'Pen',
        image: 'https://img.icons8.com/doodle/200/000000/pen.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'هرم',
        transliteration: 'Haram',
        meaning: 'Pyramid',
        image: 'https://img.icons8.com/doodle/200/000000/pyramid.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'nun',
    char: 'ن',
    name: 'Nun',
    pronunciation: 'N',
    forms: {
      isolated: 'ن',
      initial: 'نـ',
      medial: 'ـنـ',
      final: 'ـن',
    },
    examples: [
      {
        word: 'نحلة',
        transliteration: 'Nahlah',
        meaning: 'Bee',
        image: 'https://img.icons8.com/doodle/200/000000/bee.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'عنب',
        transliteration: 'Inab',
        meaning: 'Grapes',
        image: 'https://img.icons8.com/doodle/200/000000/grapes.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'عين',
        transliteration: 'Ain',
        meaning: 'Eye',
        image: 'https://img.icons8.com/doodle/200/000000/eye.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'حصان',
        transliteration: 'Hisan',
        meaning: 'Horse',
        image: 'https://img.icons8.com/doodle/200/000000/horse.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'ha_soft',
    char: 'هـ',
    name: 'Ha (Soft)',
    pronunciation: 'H (soft, as in Hello)',
    forms: {
      isolated: 'هـ',
      initial: 'هـ',
      medial: 'ـهـ',
      final: 'ـه',
    },
    examples: [
      {
        word: 'هلال',
        transliteration: 'Hilal',
        meaning: 'Crescent Moon',
        image: 'https://img.icons8.com/doodle/200/000000/crescent-moon.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'نهر',
        transliteration: 'Nahr',
        meaning: 'River',
        image: 'https://img.icons8.com/doodle/200/000000/river.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'وجه',
        transliteration: 'Wajh',
        meaning: 'Face',
        image: 'https://img.icons8.com/doodle/200/000000/face.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'مياه',
        transliteration: 'Miyah',
        meaning: 'Water',
        image: 'https://img.icons8.com/doodle/200/000000/water.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  },
  {
    id: 'waw',
    char: 'و',
    name: 'Waw',
    pronunciation: 'W / Oo',
    forms: {
      isolated: 'و',
      initial: 'و',
      medial: 'ـو',
      final: 'ـو',
    },
    examples: [
      {
        word: 'ولد',
        transliteration: 'Walad',
        meaning: 'Boy',
        image: 'https://img.icons8.com/doodle/200/000000/boy.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'حوت',
        transliteration: 'Hoot',
        meaning: 'Whale',
        image: 'https://img.icons8.com/doodle/200/000000/whale.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'دلو',
        transliteration: 'Dalw',
        meaning: 'Bucket',
        image: 'https://img.icons8.com/doodle/200/000000/bucket.png',
        position: 'final',
        highlightedIndex: 2
      },
      {
        word: 'جرو',
        transliteration: 'Jarw',
        meaning: 'Puppy',
        image: 'https://img.icons8.com/doodle/200/000000/dog.png',
        position: 'isolated',
        highlightedIndex: 2
      }
    ],
  },
  {
    id: 'ya',
    char: 'ي',
    name: 'Ya',
    pronunciation: 'Y / Ee',
    forms: {
      isolated: 'ي',
      initial: 'يـ',
      medial: 'ـيـ',
      final: 'ـي',
    },
    examples: [
      {
        word: 'يد',
        transliteration: 'Yad',
        meaning: 'Hand',
        image: 'https://img.icons8.com/doodle/200/000000/hand.png',
        position: 'initial',
        highlightedIndex: 0
      },
      {
        word: 'بيت',
        transliteration: 'Bayt',
        meaning: 'House',
        image: 'https://img.icons8.com/doodle/200/000000/home.png',
        position: 'medial',
        highlightedIndex: 1
      },
      {
        word: 'كرسي',
        transliteration: 'Kursi',
        meaning: 'Chair',
        image: 'https://img.icons8.com/doodle/200/000000/chair.png',
        position: 'final',
        highlightedIndex: 3
      },
      {
        word: 'جندي',
        transliteration: 'Jundi',
        meaning: 'Soldier',
        image: 'https://img.icons8.com/doodle/200/000000/soldier.png',
        position: 'isolated',
        highlightedIndex: 3
      }
    ],
  }
];

export const UNITS: Unit[] = [
  {
    id: 1,
    title: "The Core Letters",
    description: "Start your journey with the first three letters of the alphabet.",
    lessons: [
      { id: 'l1', title: 'The Letter Alif', type: 'letter', letterId: 'alif' },
      { id: 'l2', title: 'The Letter Ba', type: 'letter', letterId: 'ba' },
      { id: 'l3', title: 'The Letter Ta', type: 'letter', letterId: 'ta' },
      { id: 'l4', title: 'Unit 1 Review', type: 'review' },
      { id: 'l5', title: 'Unit 1 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 2,
    title: "The Next Steps",
    description: "Learn the next set of letters: Tha, Jim, Ha, and Kha.",
    lessons: [
      { id: 'l6', title: 'The Letter Tha', type: 'letter', letterId: 'tha' },
      { id: 'l7', title: 'The Letter Jim', type: 'letter', letterId: 'jim' },
      { id: 'l8', title: 'The Letter Ha', type: 'letter', letterId: 'ha' },
      { id: 'l9', title: 'The Letter Kha', type: 'letter', letterId: 'kha' },
      { id: 'l10', title: 'Unit 2 Review', type: 'review' },
      { id: 'l11', title: 'Unit 2 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 3,
    title: "Moving Forward",
    description: "Master Dal, Thal, Ra, and Zay.",
    lessons: [
      { id: 'l12', title: 'The Letter Dal', type: 'letter', letterId: 'dal' },
      { id: 'l13', title: 'The Letter Thal', type: 'letter', letterId: 'thal' },
      { id: 'l14', title: 'The Letter Ra', type: 'letter', letterId: 'ra' },
      { id: 'l15', title: 'The Letter Zay', type: 'letter', letterId: 'zay' },
      { id: 'l16', title: 'Unit 3 Review', type: 'review' },
      { id: 'l17', title: 'Unit 3 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 4,
    title: "Sibilants and Emphatics",
    description: "Learn Sin, Shin, Sad, and Dad.",
    lessons: [
      { id: 'l18', title: 'The Letter Sin', type: 'letter', letterId: 'sin' },
      { id: 'l19', title: 'The Letter Shin', type: 'letter', letterId: 'shin' },
      { id: 'l20', title: 'The Letter Sad', type: 'letter', letterId: 'sad' },
      { id: 'l21', title: 'The Letter Dad', type: 'letter', letterId: 'dad' },
      { id: 'l22', title: 'Unit 4 Review', type: 'review' },
      { id: 'l23', title: 'Unit 4 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 5,
    title: "Throat and Palate",
    description: "Master the emphatic Ta, Za, Ain, and Ghain.",
    lessons: [
      { id: 'l24', title: 'The Letter Ta (Emphatic)', type: 'letter', letterId: 'ta_emphatic' },
      { id: 'l25', title: 'The Letter Za (Emphatic)', type: 'letter', letterId: 'za_emphatic' },
      { id: 'l26', title: 'The Letter Ain', type: 'letter', letterId: 'ain' },
      { id: 'l27', title: 'The Letter Ghain', type: 'letter', letterId: 'ghain' },
      { id: 'l28', title: 'Unit 5 Review', type: 'review' },
      { id: 'l29', title: 'Unit 5 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 6,
    title: "The Final Stretch",
    description: "Learn Fa, Qaf, Kaf, and Lam.",
    lessons: [
      { id: 'l30', title: 'The Letter Fa', type: 'letter', letterId: 'fa' },
      { id: 'l31', title: 'The Letter Qaf', type: 'letter', letterId: 'qaf' },
      { id: 'l32', title: 'The Letter Kaf', type: 'letter', letterId: 'kaf' },
      { id: 'l33', title: 'The Letter Lam', type: 'letter', letterId: 'lam' },
      { id: 'l34', title: 'Unit 6 Review', type: 'review' },
      { id: 'l35', title: 'Unit 6 Quiz', type: 'quiz' },
    ]
  },
  {
    id: 7,
    title: "Completing the Alphabet",
    description: "Master Mim, Nun, Ha, Waw, and Ya.",
    lessons: [
      { id: 'l36', title: 'The Letter Mim', type: 'letter', letterId: 'mim' },
      { id: 'l37', title: 'The Letter Nun', type: 'letter', letterId: 'nun' },
      { id: 'l38', title: 'The Letter Ha (Soft)', type: 'letter', letterId: 'ha_soft' },
      { id: 'l39', title: 'The Letter Waw', type: 'letter', letterId: 'waw' },
      { id: 'l40', title: 'The Letter Ya', type: 'letter', letterId: 'ya' },
      { id: 'l41', title: 'Unit 7 Review', type: 'review' },
      { id: 'l42', title: 'Unit 7 Quiz', type: 'quiz' },
    ]
  }
];
