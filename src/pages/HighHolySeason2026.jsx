import { useState, useEffect, useRef } from "react";

const weeks = [
  { id: "all",  label: "All Days" },
  { id: "w1",   label: "Week I · Mar 20–26" },
  { id: "w2",   label: "Week II · Mar 27–Apr 2" },
  { id: "w3",   label: "Week III · Apr 3–10" },
  { id: "holy", label: "Holy Days Only" },
];

const days = [
  // ══ WEEK I ══
  { week: "w1", holy: true, month: "March", num: 20, weekday: "Friday",
    hebrew: "ת", trump: "The Universe", element: "TAV · Earth",
    title: "Feast for the Equinox of the Gods & Supreme Ritual",
    badges: [{ text: "Morning", eve: false }, { text: "High Holy", eve: false }],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber LXV — Cap. I.</strong> Read at dawn, facing east, before the sun clears the horizon. TAV descends into Earth — the Universe card is completion manifesting into the world. The Great Work arrives in matter.", tag: "Liber LXV · Cap. I" },
      { label: "🃏 Tarot · TAV", content: "<strong>The Universe (XXI)</strong> — TAV, the final letter, Earth. The dancer in the oval of light, the four Kerubim at the corners. Meditate on the totality of the Work arriving into physical reality as the new year begins. Everything is complete; everything begins.", tag: "XXI · THE UNIVERSE · ת" },
      { label: "🌳 TAV · Earth", content: "TAV is the last letter — the seal, the cross, the completion of all paths. Earth: the world as the body of the divine, matter as sacred. Meditate on groundedness. Ask: <em>How does my True Will take form in the material world?</em>" },
      { label: "🕯 Morning Ritual", content: "Perform the <strong>Star Ruby</strong> at sunrise. Then perform or solemnly recite <strong>Liber V vel Reguli</strong> — the Supreme Ritual of the New Aeon. Light a single white candle on a bare altar. The year begins in Earth." },
    ]
  },
  { week: "w1", holy: true, month: "March", num: 20, weekday: "Friday",
    hebrew: "ת", trump: "The Universe", element: "TAV · Saturn",
    title: "Feast for the Equinox of the Gods — Evening Rite",
    badges: [{ text: "Evening", eve: true }, { text: "High Holy", eve: false }],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. II.</strong> The same path, TAV, seen now in Saturn's light — time, limit, the great cycle, the reaper who is also the planter. Saturn is the face of the Universe card that governs time and mortality.", tag: "Liber VII · Cap. II" },
      { label: "🃏 Tarot · TAV", content: "<strong>The Universe (XXI)</strong> — now Saturn's aspect. Where the morning rite celebrated arrival, the evening rite contemplates the eternal cycle. Saturn devours what is complete so the new may begin. The dancer spins on, season after season.", tag: "XXI · THE UNIVERSE · ת" },
      { label: "🌳 TAV · Saturn", content: "Saturn: limitation, time, the harvest and its end. Meditate at sunset on what the old year completed. What has been reaped? What passes away as the new cycle opens? Honour the ending before celebrating the beginning." },
      { label: "🕯 Evening Ritual", content: "At the exact Equinox moment (14:46 UTC — adjust to local time), pause for 5–10 minutes of silent meditation. Then feast: wine, food, music. Perform <strong>Liber Resh</strong> at sunset. Let the evening be joyful." },
    ]
  },
  { week: "w1", holy: false, month: "March", num: 21, weekday: "Saturday",
    hebrew: "ר", trump: "The Sun", element: "RESH · Sol",
    title: "Day of the Sun — Light After the Crossing",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. IV.</strong> RESH is the head — the face turned toward the light. Sol: the vital force, joy, illumination. The day after the Equinox celebrates the Sun's new sovereignty over the lengthening days.", tag: "Liber VII · Cap. IV" },
      { label: "🃏 Tarot · RESH", content: "<strong>The Sun (XIX)</strong> — RESH, Sol. The child dancing in full sunlight, the sunflowers turning, the white horse. Joy as a magical act. After the Æon's proclamation, the Sun simply shines. <em>\"Success is your proof.\"</em>", tag: "XIX · THE SUN · ר" },
      { label: "🌳 RESH · Sol", content: "The Sun illuminates without discrimination. Meditate outdoors in actual sunlight if possible — feel the solar force on your skin. Ask: <em>Where in my life am I withholding light — from others or from myself?</em>" },
      { label: "🕯 Ritual & Meditation", content: "Perform <strong>Liber Resh</strong> at all four solar stations with full attention and joy. Spend time outside. This is a day of light, warmth, and celebration — let the practice be luminous and simple." },
    ]
  },
  { week: "w1", holy: false, month: "March", num: 23, weekday: "Monday",
    hebrew: "ק", trump: "The Moon", element: "QOPH · Pisces",
    title: "Day of the Moon — The Hidden Tides",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. VI.</strong> QOPH governs Pisces and the Moon's dark face — the path of illusion, dreams, and the unconscious tides that move beneath waking awareness.", tag: "Liber VII · Cap. VI" },
      { label: "🃏 Tarot · QOPH", content: "<strong>The Moon (XVIII)</strong> — QOPH, Pisces. The dog and wolf howling, the crayfish rising from the depths, the twin towers at the horizon. What you see by moonlight is real — but incomplete. Trust instinct over the surface appearance.", tag: "XVIII · THE MOON · ק" },
      { label: "🌳 QOPH · Pisces", content: "Qoph means the back of the head — the unconscious, the dream-mind. Pisces dissolves all boundaries. Keep your dream journal open beside your bed tonight. Ask: <em>What am I not seeing clearly? Where does the illusion feel safer than the truth?</em>" },
      { label: "🕯 Ritual & Meditation", content: "A day of receptivity. Place a bowl of water on your altar. Record last night's dreams in full. Practice <strong>scrying in water</strong> — let images surface without grasping them. Perform no forceful ritual today; simply observe." },
    ]
  },
  { week: "w1", holy: false, month: "March", num: 24, weekday: "Tuesday",
    hebrew: "צ", trump: "The Emperor", element: "TZADDI · Aries",
    title: "Day of the Emperor — Sovereign Will",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber Tzaddi vel Hamus Hermeticus.</strong> The fishhook that draws the aspirant to the divine. TZADDI is Aries — the ram's charge, the initiating force, the sovereign will that breaks new ground before dawn.", tag: "Liber Tzaddi" },
      { label: "🃏 Tarot · TZADDI", content: "<strong>The Emperor (IV)</strong> — TZADDI, Aries. Sovereignty and law, the will crystallised into authority. <em>Note Crowley's famous reassignment: in Liber AL \"Tzaddi is not the Star\" — it is The Emperor.</em> Meditate on the authority of your own True Will.", tag: "IV · THE EMPEROR · צ" },
      { label: "🌳 TZADDI · Aries", content: "The fishhook and the ram — one draws, one charges. Aries initiates without hesitation. Meditate on where you are called to lead, to command, to exercise sovereign responsibility. Ask: <em>Where must I stop deferring and act from my will directly?</em>" },
      { label: "🕯 Ritual & Meditation", content: "A day for decisive action. Make one firm decision you have been postponing. Perform <strong>Liber Resh</strong> at noon, facing south — full solar force. Write a declaration: one commitment you will fulfil before the season ends." },
    ]
  },
  { week: "w1", holy: false, month: "March", num: 25, weekday: "Wednesday",
    hebrew: "פ", trump: "The Tower", element: "PEH · Mars",
    title: "Day of the Tower — The Grace of Destruction",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. I.</strong> PEH is the mouth — the word that strikes like lightning. Mars delivers the divine thunderbolt. What the Tower destroys was always built on false ground; its fall is a mercy.", tag: "Liber VII · Cap. I" },
      { label: "🃏 Tarot · PEH", content: "<strong>The Tower (XVI)</strong> — PEH, Mars. The lightning-struck tower, the crown blown off, figures falling. Do not fear this card: in Thelema the Tower's destruction is grace. The false self must be shattered for the true will to emerge.", tag: "XVI · THE TOWER · פ" },
      { label: "🌳 PEH · Mars", content: "Peh — the mouth, the spoken word — holds the power of creation and destruction equally. Mars: force, the sword, purification by violence. Meditate on one false structure in your life that the lightning of truth should rightly strike." },
      { label: "🕯 Ritual & Meditation", content: "Perform the <strong>Star Ruby</strong> with deliberate ferocity — this is the Martian banishing. Physical exercise is appropriate. Write one fixed false belief, then argue against it forcefully in writing for 10 minutes. Let the Tower fall." },
    ]
  },
  { week: "w1", holy: false, month: "March", num: 26, weekday: "Thursday",
    hebrew: "ע", trump: "The Devil", element: "A'AYIN · Capricorn",
    title: "Day of Pan — The All-Begetter",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber A'ash vel Capricorni Pneumatici.</strong> The mystery of the generative force, Capricorn, and the phallus of Pan. A'ayin means eye — to see the divine in the vital and the animal. Read without shame or flinching.", tag: "Liber A'ash" },
      { label: "🃏 Tarot · A'AYIN", content: "<strong>The Devil (XV)</strong> — A'AYIN, Capricorn. In Thoth: Pan Pangenetor, the total affirmation of all life and generation. Not evil — the sacred animal force, the eye that sees all without judgment. The life force itself.", tag: "XV · THE DEVIL · ע" },
      { label: "🌳 A'AYIN · Capricorn", content: "A'ayin — the Eye, creative vision, the seeing that does not condemn. Capricorn: the mountain-climbing goat-fish. Meditate on your own vital force. Ask: <em>Where do I suppress my life energy out of fear or social convention?</em>" },
      { label: "🕯 Ritual & Meditation", content: "Recite <strong>Crowley's Hymn to Pan</strong> aloud with full voice and abandon. Dance, move, be fully alive. Then sit in absolute stillness for 15 minutes — the silence at the roaring heart of Pan." },
    ]
  },
  // ══ WEEK II ══
  { week: "w2", holy: false, month: "March", num: 27, weekday: "Friday",
    hebrew: "ס", trump: "Art", element: "SAMEKH · Sagittarius",
    title: "Day of Art — The Alchemical Marriage",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber ARARITA — Cap. VII.</strong> SAMEKH is the prop, the spine, the support — the arrow of Sagittarius aimed at truth. Art (Temperance in older decks) is the synthesis of all opposites: the central work of alchemy.", tag: "Liber ARARITA · Cap. VII" },
      { label: "🃏 Tarot · SAMEKH", content: "<strong>Art (XIV)</strong> — SAMEKH, Sagittarius. The androgynous figure pours fire and water simultaneously between two vessels — the sacred marriage of opposites completed. The rainbow above, the sun and moon dissolved into each other. The Great Work in process.", tag: "XIV · ART · ס" },
      { label: "🌳 SAMEKH · Sagittarius", content: "The arrow of aspiration — Samekh supports the spine, the central column. Sagittarius aims high and far. Meditate on the aspiration itself, not the goal. This longing toward the divine is already the divine reaching for itself." },
      { label: "🕯 Ritual & Meditation", content: "Perform <strong>Liber Samekh</strong> (the Bornless Ritual) — the supreme invocation of the HGA on this path. Then practice the <strong>Middle Pillar Exercise</strong>, feeling the central column of light from crown to earth." },
    ]
  },
  { week: "w2", holy: false, month: "March", num: 28, weekday: "Saturday",
    hebrew: "נ", trump: "Death", element: "NUN · Scorpio",
    title: "Day of Death — Scorpion, Serpent, Eagle",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber Arcanorum.</strong> NUN is the fish — life swimming in the waters of the deep unconscious. Scorpio rules sex, death, and the great transformation. Liber Arcanorum reveals the Tarot's mysteries at their most fundamental level.", tag: "Liber Arcanorum" },
      { label: "🃏 Tarot · NUN", content: "<strong>Death (XIII)</strong> — NUN, Scorpio. Three faces: the scorpion that stings, the serpent that sheds its skin, the eagle that soars above. In Thelema death is a change of vehicle, not an ending. What in you is being reborn right now?", tag: "XIII · DEATH · נ" },
      { label: "🌳 NUN · Scorpio", content: "Nun — the fish — swims unseen beneath the surface. What transformation is occurring below your conscious awareness? Scorpio forces the hidden into light. Sit with the discomfort of the chrysalis. The darkness before emergence is not failure." },
      { label: "🕯 Ritual & Meditation", content: "Write what must die for your True Will to fully live. Burn the list ceremonially. Meditate on Scorpio's three faces: which are you now — the scorpion, the serpent, or the eagle? Record honestly in your magical diary." },
    ]
  },
  { week: "w2", holy: false, month: "March", num: 29, weekday: "Sunday",
    hebrew: "מ", trump: "The Hanged Man", element: "MEM · Water",
    title: "Day of the Hanged Man — Voluntary Surrender",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber LXV — Cap. III.</strong> MEM is the Mother letter of Water — the great sea, dissolution, and the grace of surrender. The Hanged Man does not struggle. His inversion is voluntary, and it reveals what the upright view cannot see.", tag: "Liber LXV · Cap. III" },
      { label: "🃏 Tarot · MEM", content: "<strong>The Hanged Man (XII)</strong> — MEM, Water. Suspended by one foot, a halo of golden light around his head, perfectly calm. The sacrifice is chosen. The reversal of perspective is the gift itself. What looks like defeat is the highest act of will.", tag: "XII · THE HANGED MAN · מ" },
      { label: "🌳 MEM · Water", content: "Water flows, dissolves, and finds the lowest place — and thus pervades everything. MEM is primal water, the sea before form. Ask: <em>What would I see if I released my current perspective entirely and let myself be inverted?</em>" },
      { label: "🕯 Ritual & Meditation", content: "A day of voluntary restriction. Fast one meal, or observe silence for one hour. Place a bowl of water on your altar. Lie on the floor, head south, for 20 minutes of formless meditation. Let the body become heavy. Float." },
    ]
  },
  { week: "w2", holy: false, month: "March", num: 30, weekday: "Monday",
    hebrew: "ל", trump: "Adjustment", element: "LAMED · Libra",
    title: "Day of Adjustment — Truth as a Blade",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber Libræ — The Book of the Balance.</strong> LAMED is the oxgoad — the instrument of correction, the prod that keeps the work moving true. Libra weighs all things with exact precision. One of the most foundational ethical texts in Thelema.", tag: "Liber Libræ" },
      { label: "🃏 Tarot · LAMED", content: "<strong>Adjustment (VIII)</strong> — LAMED, Libra. The goddess balanced on her toes, the sword upraised, the scales exact. Truth is not merciful — it is precise. Every action returns its exact consequence. Nothing is lost or added.", tag: "VIII · ADJUSTMENT · ל" },
      { label: "🌳 LAMED · Libra", content: "Lamed — the oxgoad, the correcting touch. Libra weighs without sentiment. Meditate on where you are out of balance in work, in relationships, in your practice. What does exact adjustment require of you right now?" },
      { label: "🕯 Ritual & Meditation", content: "Perform the <strong>Middle Pillar Exercise</strong> with attention to perfect central balance. Then honestly name one area where you have been dishonest with yourself. Write it plainly, without mitigation. The Adjustment card does not flinch." },
    ]
  },
  { week: "w2", holy: false, month: "March", num: 31, weekday: "Tuesday",
    hebrew: "כ", trump: "Fortune", element: "KAPH · Jupiter",
    title: "Day of Fortune — Jupiter Turns the Wheel",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. III.</strong> KAPH is the palm of the hand — the capacity to grasp or to release with equal ease. Jupiter turns the wheel with divine generosity. The cycle of expansion and contraction is itself a holy rhythm.", tag: "Liber VII · Cap. III" },
      { label: "🃏 Tarot · KAPH", content: "<strong>Fortune (X)</strong> — KAPH, Jupiter. The great wheel: Sphinx at the summit, Typhon descending, Hermanubis rising. The three alchemical principles turning at the hub. Meditate on the cycle you are currently within — rising, falling, or at the still point?", tag: "X · FORTUNE · כ" },
      { label: "🌳 KAPH · Jupiter", content: "Jupiter: abundance, expansion, the benevolent cosmic force. Kaph — the open hand — gives and receives with equal grace. Meditate on cycles: your life's larger arc. Where are you on the great wheel? What does this moment on the cycle ask of you?" },
      { label: "🕯 Ritual & Meditation", content: "A day of generosity — give something freely. Perform a <strong>Jupiter invocation</strong> (Orphic Hymn to Zeus). Then meditate on the hub at the centre of the wheel: the still point that does not turn, around which all cycles revolve." },
    ]
  },
  { week: "w2", holy: false, month: "April", num: 1, weekday: "Wednesday",
    hebrew: "י", trump: "The Hermit", element: "YOD · Virgo",
    title: "Day of the Hermit — The Lamp in the Dark",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. V.</strong> YOD is the primal point — the creative spark, the divine seed, the first letter concealed within all other letters. The Hermit carries the light of the highest in the darkness of the lower world.", tag: "Liber VII · Cap. V" },
      { label: "🃏 Tarot · YOD", content: "<strong>The Hermit (IX)</strong> — YOD, Virgo. The solitary figure at the mountain's summit, the lamp held high. In Thoth: Persephone's wheat, the serpent of wisdom coiling upward. The light is held for others — but the path must be walked alone.", tag: "IX · THE HERMIT · י" },
      { label: "🌳 YOD · Virgo", content: "Yod — the hand, the primal point, the seed of all the Hebrew letters. Virgo: discernment, purity, the virgin soil. The Hermit is alone because initiation cannot be walked for another. Ask: <em>What light do I carry that no one else can carry for me?</em>" },
      { label: "🕯 Ritual & Meditation", content: "A day of solitude and study. Spend at least one hour completely alone, without devices. Light a single lamp in a darkened room and meditate on the HGA's inner flame for 30 minutes. Record what arises without editing." },
    ]
  },
  { week: "w2", holy: false, month: "April", num: 2, weekday: "Thursday",
    hebrew: "ט", trump: "Lust", element: "TETH · Leo",
    title: "Day of Lust — Babalon Rides the Beast",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber Stellæ Rubeæ.</strong> TETH is the serpent — the Kundalini, the lion-serpent of Leo. Babalon rides the Beast: not domination but sacred union, love commanding the raw force of life itself. Lust is not appetite — it is divine intoxication.", tag: "Liber Stellæ Rubeæ" },
      { label: "🃏 Tarot · TETH", content: "<strong>Lust (XI)</strong> — TETH, Leo. Babalon, radiant and unashamed, rides the seven-headed Beast and raises the Holy Grail. The lion-serpent is tamed not by force but by love. This is the strength that only love commands.", tag: "XI · LUST · ט" },
      { label: "🌳 TETH · Leo", content: "Teth — the serpent, coiled power, the Kundalini at the base of the spine. Leo roars with solar courage and creative force. Ask: <em>What vital or creative force within me is waiting to be channelled rather than suppressed?</em>" },
      { label: "🕯 Ritual & Meditation", content: "A day of vital and creative power. Make art, move vigorously, express something long held back. Invoke Babalon. Practice <strong>pranayama</strong> to awaken the serpent fire. Be magnificent and unapologetic." },
    ]
  },
  // ══ WEEK III ══
  { week: "w3", holy: false, month: "April", num: 3, weekday: "Friday",
    hebrew: "ח", trump: "The Chariot", element: "CHETH · Cancer",
    title: "Day of the Chariot — The Grail Bearer",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber Cheth vel Vallum Abiegni.</strong> CHETH is the fence — the enclosure, the womb, the sacred vessel that protects what is holy while it develops. The Charioteer carries the Holy Grail across the Abyss.", tag: "Liber Cheth" },
      { label: "🃏 Tarot · CHETH", content: "<strong>The Chariot (VII)</strong> — CHETH, Cancer. The armoured charioteer, the Holy Grail emblazoned on his chest, the four Kerubim pulling in four directions. He steers not with hands but with will alone. The vehicle of the Great Work in motion.", tag: "VII · THE CHARIOT · ח" },
      { label: "🌳 CHETH · Cancer", content: "Cheth — the fence, the protected enclosure — guards what is sacred while it grows. Cancer: the shell, the womb, the tidal nurturing force. Ask: <em>What in my life is in a tender stage of development, requiring protection rather than exposure right now?</em>" },
      { label: "🕯 Ritual & Meditation", content: "Consecrate a vessel — a cup or chalice — as the Holy Grail upon your altar. Meditate on yourself as the vehicle through which the Great Work moves. What sacred charge are you carrying? Record it in your magical diary." },
    ]
  },
  { week: "w3", holy: false, month: "April", num: 4, weekday: "Saturday",
    hebrew: "ז", trump: "The Lovers", element: "ZAYIN · Gemini",
    title: "Day of the Lovers — The Sword of Discernment",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber LXV — Cap. II.</strong> ZAYIN is the sword — discrimination, the precise cutting of the false from the true. Gemini: the twins, the dual nature united. In Thoth, The Lovers is not romance but the alchemical royal marriage.", tag: "Liber LXV · Cap. II" },
      { label: "🃏 Tarot · ZAYIN", content: "<strong>The Lovers (VI)</strong> — ZAYIN, Gemini. The Hermit above blesses the royal marriage of dark and fair below; the sword of discrimination hangs between them. True union requires first the blade — the discernment of what truly belongs together.", tag: "VI · THE LOVERS · ז" },
      { label: "🌳 ZAYIN · Gemini", content: "Zayin — the sword, the power of choosing. Gemini holds two natures simultaneously without collapsing either. Meditate on the pairs of opposites within you. Ask: <em>What inner union is seeking completion — and what sword of discernment must precede it?</em>" },
      { label: "🕯 Ritual & Meditation", content: "Hold two opposing qualities in meditation — strength and tenderness, knowing and not-knowing — without resolving the tension. Let them coexist. Write about what you find in the charged space between them." },
    ]
  },
  { week: "w3", holy: false, month: "April", num: 5, weekday: "Sunday",
    hebrew: "ו", trump: "The Hierophant", element: "VAV · Taurus",
    title: "Day of the Hierophant — The Inner Transmission",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber LXV — Cap. V.</strong> VAV is the nail — the link, the connector between above and below. Taurus: the earth-force, the bull, the body as sacred instrument of the spirit. The Hierophant transmits what cannot be written.", tag: "Liber LXV · Cap. V" },
      { label: "🃏 Tarot · VAV", content: "<strong>The Hierophant (V)</strong> — VAV, Taurus. Seated between the pillars, the triple cross raised, two acolytes receiving the teaching. In Thoth: Osiris enthroned, the secret flame passed from initiate to initiate. The outer form points to an inner reality that must be directly experienced.", tag: "V · THE HIEROPHANT · ו" },
      { label: "🌳 VAV · Taurus", content: "Vav — the nail, the connector, the hook holding the veil of the sanctuary in place. Taurus: patient, earthed, accumulating force slowly. Meditate on the transmission you have received — from teachers, lineage, direct experience. What have you truly been given?" },
      { label: "🕯 Ritual & Meditation", content: "Honour your lineage — write a brief acknowledgement of those who transmitted the flame to you. Then sit in 30 minutes of receptive silence, without technique. Let the inner teacher speak without being summoned." },
    ]
  },
  { week: "w3", holy: false, month: "April", num: 6, weekday: "Monday",
    hebrew: "ה", trump: "The Star", element: "HEH · Aquarius",
    title: "Day of the Star — Nuit Unveiled",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber ARARITA — Cap. 6.</strong> HEH is the window — the opening onto the infinite. Aquarius pours the waters of consciousness freely upon the world. The Star is Nuit in her most intimate aspect: the infinite body of stars, pouring herself out without reserve.", tag: "Liber ARARITA · Cap. 6" },
      { label: "🃏 Tarot · HEH", content: "<strong>The Star (XVII)</strong> — HEH, Aquarius. The naked goddess kneeling at the pool, pouring the waters of life between vessel and earth, the great star blazing above with seven lesser stars. Nuit at her most intimate. She pours without possessing, gives without reserve.", tag: "XVII · THE STAR · ה" },
      { label: "🌳 HEH · Aquarius", content: "Heh — the window, opened onto limitless space. Aquarius pours without possessing. Meditate under the actual night sky if possible. Feel yourself as one star among infinite stars, each moving in its own perfect orbit. <em>\"Every man and every woman is a star.\"</em>" },
      { label: "🕯 Ritual & Meditation", content: "Perform the <strong>Nuit invocation</strong> from Liber AL Chapter I outdoors after dark — arms raised, head back, facing the sky. Then lie on your back for 20 minutes gazing at the stars. Feel the boundlessness of Nuit as your own nature." },
    ]
  },
  { week: "w3", holy: false, month: "April", num: 7, weekday: "Tuesday",
    hebrew: "ד", trump: "The Empress", element: "DALETH · Venus",
    title: "Day of the Empress — Preparing the Vessel",
    badges: [],
    practices: [
      { label: "📖 Reading", content: "<strong>Liber VII — Cap. 7.</strong> DALETH is the door — the gateway through which divine abundance flows into the world. Venus: beauty, love, the creative feminine principle overflowing into form. This is the eve of the Three Days; we prepare the vessel.", tag: "Liber VII · Cap. 7" },
      { label: "🃏 Tarot · DALETH", content: "<strong>The Empress (III)</strong> — DALETH, Venus. Crowned with stars, the dove and sparrow at her feet, the shield of the pelican, wheat and lotus in full bloom. She is abundance made embodied — the love that creates rather than merely desires.", tag: "III · THE EMPRESS · ד" },
      { label: "🌳 DALETH · Venus", content: "Daleth — the door — is the opening through which the higher flows into the lower world. Venus beautifies and harmonises all she touches. This is the final day of preparation before the Receiving. Ask: <em>Am I ready — body, mind, and will — to receive what comes?</em>" },
      { label: "🕯 Ritual & Meditation", content: "Prepare your sacred space for the Three Days. Clean and beautify your altar, bring flowers, light rose or sandalwood incense, arrange your tools with care. This is Venus's work — making the vessel beautiful before the divine descends into it." },
    ]
  },
  { week: "w3", holy: true, month: "April", num: 8, weekday: "Wednesday",
    hebrew: "ג", trump: "The Priestess", element: "GIMEL · Moon",
    title: "First Day of the Writing — Liber AL, Cap. I · Nuit",
    badges: [{ text: "High Holy", eve: false }],
    practices: [
      { label: "📖 Reading — at Noon", content: "<strong>Liber L. (AL) — Cap. I · The Voice of Nuit.</strong> Read the entire chapter aloud at noon, solemnly. Begin: <em>\"Had! The manifestation of Nuit.\"</em> GIMEL — the High Priestess, the Moon — is the silver thread connecting Kether to Tiphareth. Nuit is the infinite body of stars; this chapter is her voice.", tag: "Liber L. · Cap. I (Nuit)" },
      { label: "🃏 Tarot · GIMEL", content: "<strong>The Priestess (II)</strong> — GIMEL, Moon. She sits veiled before the sanctuary, the scroll of the Law in her hands — unread by the profane. Today she reveals her scroll. The silver thread between the supernal and the beautiful below becomes the voice of Nuit herself.", tag: "II · THE PRIESTESS · ג" },
      { label: "🌳 GIMEL · Moon", content: "Gimel — the camel crossing the desert of the Abyss, carrying the water of life. The Moon reflects the highest light into the darkness below. Meditate on Nuit as infinite receptivity — she contains all, excludes nothing. <em>\"Every man and every woman is a star.\"</em>" },
      { label: "🕯 Ritual", content: "Light frankincense at noon. Face east. Read Chapter I completely and solemnly. Then sit in 20 minutes of silence. Write in your magical diary the one verse that struck deepest — and why it speaks directly to your life right now." },
    ]
  },
  { week: "w3", holy: true, month: "April", num: 9, weekday: "Thursday",
    hebrew: "ב", trump: "The Magus", element: "BETH · Mercury",
    title: "Second Day of the Writing — Liber AL, Cap. II · Hadit",
    badges: [{ text: "High Holy", eve: false }],
    practices: [
      { label: "📖 Reading — at Noon", content: "<strong>Liber L. (AL) — Cap. II · The Voice of Hadit.</strong> Read at noon. Begin: <em>\"Nu! the hiding of Hadit.\"</em> BETH — the Magus, Mercury, Thoth himself — is the Logos, the Word. Hadit is the inmost point of consciousness: the secret flame that burns in every heart.", tag: "Liber L. · Cap. II (Hadit)" },
      { label: "🃏 Tarot · BETH", content: "<strong>The Magus (I)</strong> — BETH, Mercury. Thoth juggles the four elemental weapons, surrounded by symbols of creation and illusion. The Magus speaks the Word that creates — and knows the Word to be both absolutely true and perfectly illusory simultaneously.", tag: "I · THE MAGUS · ב" },
      { label: "🌳 BETH · Mercury", content: "Beth — the house where the Word is spoken. Mercury carries the message between all worlds without distortion. Meditate on Hadit as your own inmost nature: <em>\"I am the flame that burns in every heart of man, and in the core of every star.\"</em> Feel this as your own truth." },
      { label: "🕯 Ritual", content: "Light a red candle at noon — the flame of Hadit. After the reading, practice <em>trataka</em> on the flame for 15 minutes: let awareness contract to a single point of pure consciousness. Record the experience fully in your magical diary." },
    ]
  },
  { week: "w3", holy: true, month: "April", num: 10, weekday: "Friday",
    hebrew: "א", trump: "The Fool", element: "ALEPH · Air",
    title: "Third Day of the Writing — Liber AL, Cap. III · Heru-Ra-Ha",
    badges: [{ text: "High Holy", eve: false }],
    practices: [
      { label: "📖 Reading — at Noon", content: "<strong>Liber L. (AL) — Cap. III · The Voice of Heru-Ra-Ha.</strong> Read at noon with full force. Begin: <em>\"Abrahadabra! the reward of Ra Hoor Khut.\"</em> ALEPH — The Fool, Air — is zero, the void, pure spirit before manifestation. Yet it receives the fiercest, most commanding voice of all. The last letter holds the first word.", tag: "Liber L. · Cap. III (Heru-Ra-Ha)" },
      { label: "🃏 Tarot · ALEPH", content: "<strong>The Fool (0)</strong> — ALEPH, Air. The Fool leaps from the precipice — empty, fearless, ready for all. ALEPH closes the season as it opened the tradition: the end returns to the beginning. Having traversed every path, the initiate becomes the Fool again — but knowingly so.", tag: "0 · THE FOOL · א" },
      { label: "🌳 ALEPH · Air", content: "Aleph — the ox, the primal breath, the first and the zero simultaneously. Air is the medium through which Ra-Hoor-Khuit's thunder moves. We return to pure potential — but now we know the path we have walked. The cycle is complete; the cycle begins." },
      { label: "🕯 Closing Rite of the Season", content: "After the noon reading, perform the <strong>Star Ruby</strong> as the closing banishing of the entire season. Then stand before your altar and speak aloud — without a script — a clear, direct statement of your True Will as you understand it today. Be fierce. Be joyful. <em>Love is the law, love under will.</em>" },
    ]
  },
];

const weekLabels = {
  w1: "✦ Week I — March 20–26 ✦",
  w2: "✦ Week II — March 27 – April 2 ✦",
  w3: "✦ Week III — April 3–10 ✦",
};

export default function HighHolySeason() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleDays = days.filter(d => {
    if (activeFilter === "all")  return true;
    if (activeFilter === "holy") return d.holy;
    return d.week === activeFilter;
  });

  const showHeading = (week, idx) => {
    if (activeFilter === "holy") return false;
    if (activeFilter !== "all" && activeFilter !== week) return false;
    const prev = visibleDays[idx - 1];
    return !prev || prev.week !== week;
  };

  return "See you in 2027!"
  (
    <>
      <style>{`
        .hhs-header { text-align:center; padding:3rem 1.5rem 1.5rem; }
        .hhs-glyph { font-size:2.2rem; display:block; margin-bottom:1rem; animation:breathe 5s ease-in-out infinite; }
        .hhs-intro { max-width:780px; margin:0 auto 0; padding:1.2rem 2rem; border-top:1px solid rgba(201,168,76,.15); border-bottom:1px solid rgba(201,168,76,.15); background:rgba(61,31,94,.08); text-align:center; }
        .hhs-intro p { font-size:.95rem; line-height:1.8; color:var(--parchment-dim); }
        .hhs-intro strong { color:var(--gold-light); font-weight:600; }
        .week-nav-bar { position:sticky; top:53px; z-index:90; background:rgba(7,5,9,.97); border-bottom:1px solid rgba(201,168,76,.1); padding:.7rem 1rem; display:flex; flex-wrap:wrap; justify-content:center; gap:.4rem; }
        .wk-btn { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.15em; padding:.3rem .75rem; border:1px solid rgba(201,168,76,.25); background:transparent; color:var(--gold-dim); cursor:pointer; text-transform:uppercase; transition:all .25s; }
        .wk-btn:hover, .wk-btn.active { background:rgba(201,168,76,.1); color:var(--gold-light); border-color:var(--gold); }
        .hhs-main { max-width:960px; margin:0 auto; padding:1.5rem 1.2rem 5rem; }
        .week-heading { text-align:center; padding:2rem 0 .8rem; position:relative; }
        .week-heading::before { content:''; position:absolute; top:50%; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.18),transparent); }
        .week-label { display:inline-block; font-family:'Cinzel Decorative',serif; font-size:.65rem; letter-spacing:.3em; color:var(--gold-dim); background:var(--deep); padding:0 1.5rem; text-transform:uppercase; position:relative; }
        .day-card { display:grid; grid-template-columns:90px 1fr; gap:0 1.4rem; margin-bottom:2.4rem; opacity:0; transform:translateY(16px); animation:hhs-up .55s ease forwards; }
        @keyframes hhs-up { to{opacity:1;transform:translateY(0);} }
        .day-left { display:flex; flex-direction:column; align-items:center; padding-top:.2rem; }
        .day-month { font-family:'Cinzel',serif; font-size:.55rem; letter-spacing:.2em; color:var(--gold-dim); }
        .day-num-big { font-family:'Cinzel Decorative',serif; font-size:2.1rem; line-height:1; color:var(--gold); text-shadow:0 0 16px rgba(201,168,76,.35); }
        .day-weekday { font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.15em; color:var(--silver); opacity:.6; margin-bottom:.6rem; }
        .attr-block { width:100%; background:rgba(201,168,76,.05); border:1px solid rgba(201,168,76,.2); padding:.5rem .4rem; text-align:center; margin-bottom:.35rem; }
        .attr-hebrew { font-size:1.4rem; color:var(--gold-light); line-height:1; display:block; margin-bottom:.2rem; }
        .attr-trump { font-family:'Cinzel',serif; font-size:.52rem; letter-spacing:.08em; color:var(--gold); display:block; line-height:1.3; }
        .attr-element { font-family:'Cinzel',serif; font-size:.46rem; letter-spacing:.12em; color:var(--silver); opacity:.7; display:block; margin-top:.15rem; }
        .day-right { border-left:1px solid rgba(201,168,76,.12); padding-left:1.4rem; }
        .day-title-row { display:flex; align-items:baseline; gap:.6rem; margin-bottom:.8rem; flex-wrap:wrap; }
        .day-title { font-family:'Cinzel',serif; font-size:clamp(.85rem,2vw,1.1rem); color:var(--parchment); line-height:1.3; }
        .day-badge { font-family:'Cinzel',serif; font-size:.52rem; letter-spacing:.18em; padding:.18rem .55rem; border:1px solid rgba(139,26,26,.6); color:#d07070; background:rgba(139,26,26,.15); text-transform:uppercase; white-space:nowrap; }
        .day-badge.eve { border-color:rgba(61,31,94,.8); color:#a878d8; background:rgba(61,31,94,.25); }
        .practices { display:grid; grid-template-columns:1fr 1fr; gap:.7rem; }
        .pblock { background:rgba(201,168,76,.025); border:1px solid rgba(201,168,76,.08); border-left:2px solid rgba(201,168,76,.22); padding:.8rem 1rem; }
        .pblock.span2 { grid-column:1/-1; }
        .plabel { font-family:'Cinzel',serif; font-size:.52rem; letter-spacing:.2em; color:var(--gold); opacity:.65; text-transform:uppercase; margin-bottom:.45rem; display:flex; align-items:center; gap:.4rem; }
        .plabel::after { content:''; flex:1; height:1px; background:rgba(201,168,76,.12); }
        .pcontent { font-size:.9rem; line-height:1.7; color:var(--parchment); opacity:.84; }
        .pcontent strong { color:var(--gold-light); font-weight:600; }
        .pcontent em { color:var(--parchment-dim); font-style:italic; }
        .book-tag { display:inline-block; font-family:'Cinzel',serif; font-size:.62rem; padding:.15rem .55rem; border:1px solid rgba(201,168,76,.35); color:var(--gold-light); margin-top:.35rem; letter-spacing:.07em; }
        @media(max-width:580px){
          .day-card{grid-template-columns:1fr;}
          .day-left{flex-direction:row;gap:.8rem;align-items:center;margin-bottom:.8rem;flex-wrap:wrap;}
          .day-right{border-left:none;border-top:1px solid rgba(201,168,76,.12);padding-left:0;padding-top:.8rem;}
          .practices{grid-template-columns:1fr;}
        }
      `}</style>

      <header className="hhs-header">
        <span className="hhs-glyph">✡︎</span>
        <div className="rule" />
        <p className="sub">Anno IVxvii e.v. · March 20 – April 10, 2026</p>
        <h1 style={{ fontFamily:"'Cinzel Decorative',serif", fontSize:"clamp(1.1rem,2.8vw,1.9rem)", color:"var(--gold)", letterSpacing:".1em", lineHeight:1.35, marginBottom:".5rem", textShadow:"0 0 35px rgba(201,168,76,.2)" }}>
          The High Holy Season
        </h1>
        <p className="tagline" style={{ fontStyle:"italic", fontSize:".95rem", color:"var(--parchment-dim)", opacity:.65 }}>
          From the Equinox of the Gods to the last Day of the Receiving
        </p>
      </header>

      <div className="hhs-intro">
        <p>
          Each day of the High Holy Season carries its own <strong>Hebrew letter, Tarot trump, and elemental or planetary attribution</strong> drawn from the traditional Thelemic system. The prescribed reading for each day follows the assigned Liber and chapter. March 20 carries two distinct workings — a <strong>morning rite (TAV · Earth)</strong> and an <strong>evening rite (TAV · Saturn)</strong>. The season closes on April 10 with ALEPH, The Fool — the last letter becomes the first, and the cycle begins again.
        </p>
      </div>

      <nav className="week-nav-bar">
        {weeks.map(w => (
          <button
            key={w.id}
            className={`wk-btn${activeFilter === w.id ? " active" : ""}`}
            onClick={() => setActiveFilter(w.id)}
          >
            {w.label}
          </button>
        ))}
      </nav>

      <main className="hhs-main">
        {visibleDays.map((day, idx) => (
          <div key={`${day.month}-${day.num}-${day.element}-${idx}`}>
            {showHeading(day.week, idx) && (
              <div className="week-heading">
                <span className="week-label">{weekLabels[day.week]}</span>
              </div>
            )}
            <div className="day-card" style={{ animationDelay: `${(idx % 8) * 0.05}s` }}>
              <div className="day-left">
                <div className="day-month">{day.month}</div>
                <div className="day-num-big">{day.num}</div>
                <div className="day-weekday">{day.weekday}</div>
                <div className="attr-block">
                  <span className="attr-hebrew">{day.hebrew}</span>
                  <span className="attr-trump">{day.trump}</span>
                  <span className="attr-element">{day.element}</span>
                </div>
              </div>
              <div className="day-right">
                <div className="day-title-row">
                  <span className="day-title">{day.title}</span>
                  {day.badges.map((b, i) => (
                    <span key={i} className={`day-badge${b.eve ? " eve" : ""}`}>{b.text}</span>
                  ))}
                </div>
                <div className="practices">
                  {day.practices.map((p, i) => (
                    <div key={i} className={`pblock${day.practices.length === 3 && i === 2 ? " span2" : ""}`}>
                      <div className="plabel">{p.label}</div>
                      <div className="pcontent" dangerouslySetInnerHTML={{ __html: p.content }} />
                      {p.tag && <div className="book-tag">{p.tag}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
