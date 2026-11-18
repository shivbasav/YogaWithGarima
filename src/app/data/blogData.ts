const heroImg =
  "https://images.unsplash.com/photo-1758274539654-23fa349cc090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHNlcmVuZSUyMHdvbWFufGVufDF8fHx8MTc3MjYwNTM5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const meditationImg =
  "https://images.unsplash.com/photo-1758599879787-03999f72d994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYnJlYXRoaW5nJTIwbWVkaXRhdGlvbiUyMHByYW5heWFtYXxlbnwxfHx8fDE3NzI2MDYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const morningImg =
  "https://images.unsplash.com/photo-1740917699771-7d1bb53e5fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbW9ybmluZyUyMHJvdXRpbmUlMjB0ZWElMjBqb3VybmFsfGVufDF8fHx8MTc3MjYwNjM0MXww&ixlib=rb-4.1.0&q=80&w=1080";
const mindfulImg =
  "https://images.unsplash.com/photo-1635617240041-c95219c05542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYmxvZyUyMGFydGljbGUlMjBtaW5kZnVsbmVzc3xlbnwxfHx8fDE3NzI2MDYzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const outdoorImg =
  "https://images.unsplash.com/photo-1707257969667-68804d47f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vciUyMG5hdHVyZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyNjA1Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const classImg =
  "https://images.unsplash.com/photo-1761034114072-9ec9c3d2fbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBzdHVkaW8lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzI1Mjg3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  img: string;
  featured: boolean;
  content: Array<{
    type: "paragraph" | "heading" | "list" | "quote";
    text?: string;
    items?: string[];
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "morning-rituals-start-your-day",
    title: "5 Morning Rituals to Start Your Day with Intention",
    category: "Lifestyle",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    excerpt:
      "How you begin your morning sets the tone for everything that follows. Here are five simple but powerful rituals rooted in yogic tradition to anchor your day.",
    img: morningImg,
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "How you begin your morning sets the tone for everything that follows. In yogic philosophy, the early morning hours—known as Brahma Muhurta—are considered the most auspicious time for spiritual practice and self-reflection. Here are five simple but powerful rituals rooted in yogic tradition to anchor your day.",
      },
      {
        type: "heading",
        text: "1. Wake Up Before Sunrise",
      },
      {
        type: "paragraph",
        text: "The quality of the early morning air is different. There's a stillness, a quietness that you won't find at any other time of day. Waking up before sunrise allows you to tap into that energy—before the world rushes in with its demands.",
      },
      {
        type: "paragraph",
        text: "You don't have to wake at 5 AM if that feels unattainable. Start with 15 minutes earlier than usual, and gradually shift your rhythm. The goal isn't perfection; it's presence.",
      },
      {
        type: "heading",
        text: "2. Drink Warm Water with Lemon",
      },
      {
        type: "paragraph",
        text: "Before you reach for coffee, give your body the hydration it's been craving all night. Warm water with a squeeze of fresh lemon gently awakens your digestive system, flushes toxins, and alkalizes your body.",
      },
      {
        type: "quote",
        text: "The way you do one thing is the way you do everything.",
      },
      {
        type: "heading",
        text: "3. Set an Intention for the Day",
      },
      {
        type: "paragraph",
        text: "An intention is not a to-do list. It's a quality you want to embody—patience, presence, courage. Sit quietly for a moment and ask yourself: How do I want to show up today?",
      },
      {
        type: "paragraph",
        text: "You might write it down in a journal, or simply whisper it to yourself. Either way, carry it with you like a compass throughout the day.",
      },
      {
        type: "heading",
        text: "4. Move Your Body Mindfully",
      },
      {
        type: "paragraph",
        text: "This doesn't mean an intense workout (unless that calls to you). It means moving with awareness. A few rounds of Sun Salutations, gentle stretches, or even a slow walk outside.",
      },
      {
        type: "paragraph",
        text: "The point is to wake up your body with kindness, not force. To remind yourself that you are not just a mind—you are also bones, breath, and beating heart.",
      },
      {
        type: "heading",
        text: "5. Spend Five Minutes in Stillness",
      },
      {
        type: "paragraph",
        text: "Before you pick up your phone or open your laptop, sit in silence. You don't have to meditate perfectly. You don't have to empty your mind. Just be with yourself for five minutes.",
      },
      {
        type: "paragraph",
        text: "Notice your breath. Notice the thoughts that arise. And notice what it feels like to not immediately react to them.",
      },
      {
        type: "paragraph",
        text: "These five rituals are not about adding more to your plate. They're about creating space—so that when the day begins in earnest, you're already grounded. Already here. Already home.",
      },
    ],
  },
  {
    slug: "eight-limbs-of-yoga",
    title: "Understanding the Eight Limbs of Yoga",
    category: "Philosophy",
    date: "Jan 30, 2026",
    readTime: "8 min read",
    excerpt:
      "Patanjali's Yoga Sutras offer a complete roadmap for living a meaningful life. Let's explore what the Ashtanga path truly means beyond the postures.",
    img: meditationImg,
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "When most people think of yoga, they picture poses on a mat. But yoga, in its truest form, is far more expansive. The Eight Limbs of Yoga—outlined by the sage Patanjali in the Yoga Sutras—offer a complete roadmap for living a meaningful, conscious life.",
      },
      {
        type: "paragraph",
        text: "Let's explore what the Ashtanga path truly means beyond the postures.",
      },
      {
        type: "heading",
        text: "1. Yama — Ethical Guidelines",
      },
      {
        type: "paragraph",
        text: "The Yamas are five moral disciplines that guide how we relate to others and the world:",
      },
      {
        type: "list",
        items: [
          "Ahimsa (non-violence) — practicing kindness in thought, word, and action",
          "Satya (truthfulness) — speaking and living in alignment with truth",
          "Asteya (non-stealing) — not taking what isn't freely given",
          "Brahmacharya (moderation) — wise use of energy",
          "Aparigraha (non-possessiveness) — letting go of greed and attachment",
        ],
      },
      {
        type: "heading",
        text: "2. Niyama — Personal Observances",
      },
      {
        type: "paragraph",
        text: "The Niyamas are internal practices that cultivate self-discipline and spiritual growth:",
      },
      {
        type: "list",
        items: [
          "Saucha (purity) — cleanliness of body, mind, and environment",
          "Santosha (contentment) — finding peace with what is",
          "Tapas (discipline) — the heat of committed practice",
          "Svadhyaya (self-study) — introspection and study of sacred texts",
          "Ishvara Pranidhana (surrender) — devotion to something greater",
        ],
      },
      {
        type: "heading",
        text: "3. Asana — Physical Postures",
      },
      {
        type: "paragraph",
        text: "This is the limb most familiar to Western practitioners. Asana prepares the body to sit comfortably in meditation. It's not about perfection or flexibility—it's about stability and ease.",
      },
      {
        type: "heading",
        text: "4. Pranayama — Breath Control",
      },
      {
        type: "paragraph",
        text: "Pranayama is the regulation of breath and life force energy (prana). Through conscious breathing, we calm the nervous system, clear the mind, and connect to our inner vitality.",
      },
      {
        type: "heading",
        text: "5. Pratyahara — Withdrawal of the Senses",
      },
      {
        type: "paragraph",
        text: "Pratyahara is the practice of turning inward—drawing our attention away from external stimuli and distractions. It's the bridge between the outer limbs (asana, pranayama) and the inner ones (meditation).",
      },
      {
        type: "heading",
        text: "6. Dharana — Concentration",
      },
      {
        type: "paragraph",
        text: "Dharana is focused attention on a single point—a mantra, a candle flame, the breath. This practice trains the mind to stay present rather than scatter in a thousand directions.",
      },
      {
        type: "heading",
        text: "7. Dhyana — Meditation",
      },
      {
        type: "paragraph",
        text: "When concentration deepens and becomes effortless, it turns into meditation. Dhyana is uninterrupted flow of awareness—a state of being fully present without trying.",
      },
      {
        type: "heading",
        text: "8. Samadhi — Blissful Absorption",
      },
      {
        type: "paragraph",
        text: "Samadhi is the culmination of the practice—a state of pure consciousness where the sense of separation dissolves. It's not something you achieve; it's something you allow.",
      },
      {
        type: "quote",
        text: "Yoga is not about touching your toes. It's about what you learn on the way down.",
      },
      {
        type: "paragraph",
        text: "The Eight Limbs are not a ladder you climb sequentially. They're interwoven aspects of a holistic practice. Some days you'll work on the Yamas. Other days, you'll sit in meditation. What matters is that you show up—again and again—with curiosity and compassion.",
      },
    ],
  },
  {
    slug: "yin-yoga-practice",
    title: "Why Yin Yoga is the Practice You Didn't Know You Needed",
    category: "Practice",
    date: "Jan 14, 2026",
    readTime: "6 min read",
    excerpt:
      "In a world that glorifies busyness, Yin yoga teaches us the radical power of slowing down, feeling deeply, and releasing what no longer serves.",
    img: mindfulImg,
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "In a world that glorifies busyness, productivity, and constant doing, Yin yoga offers something revolutionary: permission to slow down.",
      },
      {
        type: "paragraph",
        text: "Yin yoga is a slow, meditative practice where poses are held for several minutes at a time. Unlike more dynamic styles that focus on muscular engagement, Yin targets the deep connective tissues—fascia, ligaments, joints—and invites you to settle into stillness.",
      },
      {
        type: "heading",
        text: "What Makes Yin Different?",
      },
      {
        type: "paragraph",
        text: "Most yoga styles are Yang in nature—active, warming, strengthening. Yin is the opposite. It's cooling, receptive, introspective. In Yin, you're not trying to push deeper into a stretch. You're finding your edge and then softening around it.",
      },
      {
        type: "paragraph",
        text: "The longer holds create space for the body to release deeply—not through force, but through surrender. And in that surrender, something profound happens: you begin to notice the stories you carry in your tissues.",
      },
      {
        type: "heading",
        text: "The Emotional Release",
      },
      {
        type: "paragraph",
        text: "It's not uncommon to feel emotions arise during a Yin practice. A wave of sadness in Pigeon Pose. Unexpected tears in a forward fold. This isn't a sign that something is wrong—it's a sign that something is moving.",
      },
      {
        type: "quote",
        text: "The issues are in the tissues.",
      },
      {
        type: "paragraph",
        text: "Our bodies hold onto stress, trauma, and unprocessed emotions. Yin yoga creates a safe container for these energies to surface and release. It's healing work disguised as stretching.",
      },
      {
        type: "heading",
        text: "Who Is Yin For?",
      },
      {
        type: "list",
        items: [
          "Athletes and runners who need deep connective tissue work",
          "Anyone dealing with chronic stress or anxiety",
          "People recovering from injury (with proper modifications)",
          "Those who struggle to quiet the mind in traditional meditation",
          "Anyone craving slowness in a fast-paced world",
        ],
      },
      {
        type: "heading",
        text: "How to Practice Yin",
      },
      {
        type: "paragraph",
        text: "Yin requires props—bolsters, blankets, blocks—to support the body so you can truly let go. It also requires patience. The first minute in a pose might feel easy. The second, uncomfortable. The third, confronting. And somewhere in the fourth or fifth minute, if you breathe and stay, there's a softening.",
      },
      {
        type: "paragraph",
        text: "The practice teaches you how to be with discomfort without reacting. How to notice sensation without labeling it as good or bad. How to stay when everything in you wants to leave.",
      },
      {
        type: "paragraph",
        text: "And that—more than the flexibility, more than the fascia release—is the real gift of Yin. It teaches you how to be with yourself, exactly as you are.",
      },
    ],
  },
  {
    slug: "pranayama-for-anxiety",
    title: "Pranayama for Anxiety: 3 Techniques That Actually Work",
    category: "Wellness",
    date: "Dec 22, 2025",
    readTime: "7 min read",
    excerpt:
      "Breathwork is one of the most accessible and effective tools for calming the nervous system. These three pranayama practices can be done anywhere, anytime.",
    img: heroImg,
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Anxiety lives in the body. The racing heart. The shallow breath. The tightness in the chest. And while we can't always control the thoughts that trigger anxiety, we can work with the breath—and through the breath, shift our entire nervous system.",
      },
      {
        type: "paragraph",
        text: "Pranayama, the yogic practice of breath control, is one of the most accessible and effective tools for calming anxiety. Here are three techniques that actually work.",
      },
      {
        type: "heading",
        text: "1. Nadi Shodhana (Alternate Nostril Breathing)",
      },
      {
        type: "paragraph",
        text: "This balancing breath calms the mind and harmonizes the left and right hemispheres of the brain. It's especially helpful when you feel scattered or overwhelmed.",
      },
      {
        type: "paragraph",
        text: "How to do it:",
      },
      {
        type: "list",
        items: [
          "Sit comfortably with a tall spine",
          "Use your right thumb to close your right nostril",
          "Inhale slowly through the left nostril",
          "Close the left nostril with your ring finger, release the right",
          "Exhale through the right nostril",
          "Inhale through the right, then switch and exhale through the left",
          "Continue for 5-10 rounds",
        ],
      },
      {
        type: "heading",
        text: "2. 4-7-8 Breath (Extended Exhale)",
      },
      {
        type: "paragraph",
        text: "When we're anxious, our exhales become short and choppy. Lengthening the exhale activates the parasympathetic nervous system—our body's natural relaxation response.",
      },
      {
        type: "paragraph",
        text: "How to do it:",
      },
      {
        type: "list",
        items: [
          "Inhale through your nose for a count of 4",
          "Hold the breath for a count of 7",
          "Exhale slowly through your mouth for a count of 8",
          "Repeat for 4-8 cycles",
        ],
      },
      {
        type: "quote",
        text: "Breath is the bridge between the body and the mind.",
      },
      {
        type: "heading",
        text: "3. Ujjayi Breath (Ocean Breath)",
      },
      {
        type: "paragraph",
        text: "Ujjayi breath creates a soft, rhythmic sound at the back of the throat—like ocean waves. This audible breath gives the mind something to focus on, making it easier to stay present.",
      },
      {
        type: "paragraph",
        text: "How to do it:",
      },
      {
        type: "list",
        items: [
          "Inhale and exhale through the nose",
          "Slightly constrict the back of your throat (as if fogging a mirror)",
          "Create a gentle, whispering sound with each breath",
          "Keep the breath slow, steady, and rhythmic",
        ],
      },
      {
        type: "heading",
        text: "When to Practice",
      },
      {
        type: "paragraph",
        text: "The beauty of pranayama is that it can be done anywhere—at your desk, in your car, before bed, in the middle of a panic attack. You don't need a mat or special clothing. You just need your breath.",
      },
      {
        type: "paragraph",
        text: "Start with just 2-3 minutes a day. Over time, you'll notice that your relationship with anxiety begins to shift. It might not disappear completely, but you'll have a tool—a lifeline—to return to whenever the waves get rough.",
      },
    ],
  },
  {
    slug: "himalayan-retreat-personal-essay",
    title: "My Experience at the Himalayan Retreat — A Personal Essay",
    category: "Story",
    date: "Nov 5, 2025",
    readTime: "10 min read",
    excerpt:
      "Twelve students. Seven days. A valley nestled between the mountains. Here is my honest account of what it means to truly step away from everything.",
    img: outdoorImg,
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Twelve students. Seven days. A valley nestled between the mountains, so quiet you could hear the prayer flags whispering in the wind. This is my honest account of what it means to truly step away from everything.",
      },
      {
        type: "heading",
        text: "Day One: Arrival",
      },
      {
        type: "paragraph",
        text: "We arrived dusty and tired after a six-hour drive from Rishikesh. The retreat center was simple—white-washed walls, wooden floors, windows that framed the peaks like paintings. No WiFi. No phone signal. Just us, the mountains, and a schedule that felt both gentle and terrifying in its spaciousness.",
      },
      {
        type: "paragraph",
        text: "That first evening, we sat in a circle and introduced ourselves. I noticed how much we all tried to perform—to seem spiritual, put-together, worthy of being there. It would take a few days before those masks started to slip.",
      },
      {
        type: "heading",
        text: "Day Three: The Unraveling",
      },
      {
        type: "paragraph",
        text: "By the third day, the silence had started to do its work. Without distractions, without the noise of daily life, things began to surface. Old grief. Unspoken anger. A bone-deep exhaustion I hadn't realized I was carrying.",
      },
      {
        type: "quote",
        text: "The mountains don't judge. They just hold space.",
      },
      {
        type: "paragraph",
        text: "During our morning practice, I cried in Child's Pose. Not the delicate kind of crying you can hide—the ugly, shaking, snotty kind. And no one rushed to fix me. The teacher simply placed a hand on my back and whispered, 'Let it move.'",
      },
      {
        type: "heading",
        text: "Day Five: The Stillness",
      },
      {
        type: "paragraph",
        text: "Somewhere around day five, the internal noise quieted. Not because I'd achieved some enlightened state, but because I'd finally stopped fighting it. Stopped trying to meditate perfectly. Stopped worrying about what I looked like in a headstand.",
      },
      {
        type: "paragraph",
        text: "I started to notice small things. The way the light shifted across the valley in the late afternoon. The taste of chai made with fresh ginger. The feeling of my feet on the cold stone path to the meditation hall at dawn.",
      },
      {
        type: "heading",
        text: "Day Seven: Leaving",
      },
      {
        type: "paragraph",
        text: "On the last day, we hiked to a nearby waterfall. We sat by the water in silence, and I remember thinking: I don't want to go back. Not because I wanted to escape my life, but because I was afraid of losing this—this quietness, this clarity, this sense of being enough exactly as I am.",
      },
      {
        type: "paragraph",
        text: "But of course, we did go back. We packed our bags, hugged each other tightly, exchanged numbers we may or may not use. The world rushed back in—emails, responsibilities, noise.",
      },
      {
        type: "heading",
        text: "What I Brought Home",
      },
      {
        type: "paragraph",
        text: "I didn't come home transformed into some zen master. I still get anxious. I still check my phone too much. I still have days where I forget to breathe.",
      },
      {
        type: "paragraph",
        text: "But something did shift. I know now, in my body, what it feels like to be still. To be held by silence. To let the mountains remind me that I am small and vast all at once.",
      },
      {
        type: "paragraph",
        text: "And on the hard days—the ones where everything feels too much—I close my eyes and remember that valley. The prayer flags. The sound of my own breath echoing in the meditation hall.",
      },
      {
        type: "paragraph",
        text: "And it's enough to bring me back.",
      },
    ],
  },
  {
    slug: "build-home-yoga-practice",
    title: "How to Build a Home Yoga Practice That Sticks",
    category: "Practice",
    date: "Oct 17, 2025",
    readTime: "6 min read",
    excerpt:
      "Getting on the mat consistently at home requires less willpower than you think. It comes down to environment, habit-stacking, and one key mindset shift.",
    img: classImg,
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Getting on the mat consistently at home requires less willpower than you think. It comes down to environment, habit-stacking, and one key mindset shift.",
      },
      {
        type: "heading",
        text: "The Environment Matters More Than Motivation",
      },
      {
        type: "paragraph",
        text: "Motivation is fleeting. Environment is constant. If your yoga mat is rolled up in the closet, you're relying on motivation to unroll it every single time. But if your mat is already laid out in a quiet corner of your home, the barrier to practice drops significantly.",
      },
      {
        type: "paragraph",
        text: "Create a dedicated space—even if it's tiny. A corner of your bedroom. A spot by the window. Somewhere that visually signals: this is where I practice.",
      },
      {
        type: "heading",
        text: "Start Smaller Than You Think You Should",
      },
      {
        type: "paragraph",
        text: "The biggest mistake people make is setting the bar too high. They decide they'll practice for 60 minutes every morning, and when life inevitably gets in the way, they feel like failures and quit altogether.",
      },
      {
        type: "paragraph",
        text: "Start with five minutes. Seriously. Five minutes of stretching or breathwork is infinitely better than zero minutes of an abandoned 'perfect' practice.",
      },
      {
        type: "quote",
        text: "Consistency beats intensity every time.",
      },
      {
        type: "heading",
        text: "Habit-Stack Your Practice",
      },
      {
        type: "paragraph",
        text: "Habit-stacking means attaching a new habit to an existing one. Instead of saying 'I'll practice yoga in the morning,' say 'Right after I make my coffee, I'll do five minutes of Sun Salutations.'",
      },
      {
        type: "paragraph",
        text: "Anchoring your practice to something you already do consistently makes it far more likely to stick.",
      },
      {
        type: "heading",
        text: "Let Go of the 'Perfect' Practice",
      },
      {
        type: "paragraph",
        text: "Home practice doesn't have to look like a studio class. It doesn't have to be an hour long. It doesn't have to follow a specific sequence. Some days, your practice might be 20 minutes of restorative poses. Other days, it might be three minutes of breathwork before bed.",
      },
      {
        type: "paragraph",
        text: "What matters is showing up—not perfectly, but consistently.",
      },
      {
        type: "heading",
        text: "Track Your Practice (But Gently)",
      },
      {
        type: "paragraph",
        text: "Keep a simple log. A checkmark on a calendar. A note in your journal. Seeing a visual streak of consistency is incredibly motivating—and it removes the mental load of 'Did I practice yesterday?'",
      },
      {
        type: "paragraph",
        text: "But be gentle with yourself. If you miss a day, don't spiral. Just come back the next day.",
      },
      {
        type: "heading",
        text: "The One Mindset Shift That Changes Everything",
      },
      {
        type: "paragraph",
        text: "Stop waiting until you 'feel like it.' You will never feel like it. The practice is not about feeling motivated—it's about showing up anyway.",
      },
      {
        type: "paragraph",
        text: "And here's the secret: once you start, the resistance melts. The first Sun Salutation is always the hardest. The second one is easier. By the third, you remember why you came to the mat in the first place.",
      },
      {
        type: "paragraph",
        text: "Build your practice around ease, not willpower. Make it so simple that not doing it feels harder than doing it. And watch what unfolds.",
      },
    ],
  },
];
