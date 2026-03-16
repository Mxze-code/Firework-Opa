/**
 * LAWS DATA - The 18 Laws from "The Laws of Human Nature" by Robert Greene
 *
 * Official structure from the book:
 * - actionTitle: The chapter/action (e.g., "Master Your Emotional Self")
 * - title: The law name (e.g., "The Law of Irrationality")
 *
 * Edit this file to update law content. Add images via the image object.
 */

const LAWS_DATA = [
    {
        id: 1,
        actionTitle: "Master Your Emotional Self",
        title: "The Law of Irrationality",
        overview: "We believe we are rational creatures. In truth, we are driven by emotions and use logic to justify what we have already decided.",
        explanation: "The human brain evolved with emotion first; rational thought came later. Under stress or desire, the emotional brain takes over. People make decisions based on fear, envy, pride, or longing—then construct logical-sounding reasons afterward. Understanding this shifts everything: you stop expecting people to respond to pure reason and instead learn to read and address their emotional currents.",
        whyItMatters: "Assuming others think like you—rationally—leads to endless frustration and failed persuasion. Those who grasp irrationality can influence people, avoid manipulation, and make better decisions themselves.",
        commonSigns: [
            "Justifying a decision after the fact with reasons that don't quite add up",
            "Strong emotional reaction to criticism despite 'logical' self-image",
            "Changing views when mood shifts, not when evidence changes",
            "Believing your own rationalizations while doubting others'"
        ],
        examples: [
            "A negotiator who addresses the other side's fear of losing face succeeds where pure logic fails.",
            "Someone 'decides' against a job offer, then lists reasons—but the real driver was anxiety about change.",
            "A leader who makes people feel heard before presenting data gets buy-in; the one who leads with facts gets resistance."
        ],
        takeaway: "Lead with emotion. Understand what people fear, want, and need to feel—then speak to that. Facts support; they rarely persuade.",
        reflectionPrompt: "When did you last 'decide' something and then find reasons for it? What emotion was actually driving you?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Orestes_Pursued_by_the_Furies_by_William-Adolphe_Bouguereau_(1862)_-_Google_Art_Project.jpg", title: "Orestes Pursued by the Furies", artist: "William-Adolphe Bouguereau" }
    },
    {
        id: 2,
        actionTitle: "Transform Self-love into Empathy",
        title: "The Law of Narcissism",
        overview: "We are all narcissists to a degree. The key is to recognize it in ourselves and transform self-absorption into genuine empathy for others.",
        explanation: "Narcissism is not a binary—it exists on a spectrum. At its core is a fragile self that needs constant validation. The healthy path is not to eliminate self-interest but to develop the ability to step outside it: to see others as they are, not as extensions of our needs. Empathy is the antidote—the capacity to feel what another feels without losing yourself.",
        whyItMatters: "Unchecked narcissism blinds you to others' motives and needs. It makes you easy to manipulate and impossible to truly connect with. Transforming it into empathy gives you clarity and the ability to influence with integrity.",
        commonSigns: [
            "Taking things personally when they aren't about you",
            "Needing to be the center of attention or the expert",
            "Struggling to listen without turning the conversation back to yourself",
            "Feeling threatened when others succeed"
        ],
        examples: [
            "The charismatic leader who remembers names and asks about your life—not from narcissism, but from practiced empathy.",
            "A colleague who can't celebrate your win without deflecting to their own achievements.",
            "Someone who 'helps' but always steers the solution toward their preferred outcome."
        ],
        takeaway: "Feed others' need to feel seen. Observe your own narcissistic impulses without judgment. Practice seeing the world from another's perspective before responding.",
        reflectionPrompt: "Where does your narcissism show up? When do you make situations about you when they aren't?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Narcissus-Caravaggio_(1594-96).jpg", title: "Narcissus", artist: "Caravaggio" }
    },
    {
        id: 3,
        actionTitle: "See Through People's Masks",
        title: "The Law of Role-playing",
        overview: "Everyone wears a mask. We perform roles in social life. The skilled observer learns to read beneath the performance.",
        explanation: "From childhood we learn to present a self that wins approval. We become our roles—parent, professional, friend—and forget we are performing. Greene draws on the theatrical: we are all actors. The strategic mind does not take performances at face value. It watches for cracks, inconsistencies, and the moments when the mask slips.",
        whyItMatters: "Taking people at their word leaves you vulnerable. Those who see through roles understand true motives, detect deception, and can perform their own roles more consciously.",
        commonSigns: [
            "A persona that shifts dramatically between different groups",
            "Overly polished or rehearsed self-presentation",
            "Inconsistency between words and subtle actions",
            "Defensiveness when the performance is questioned"
        ],
        examples: [
            "The executive who is warm in public but cold and cutting in private meetings.",
            "Someone who performs humility but subtly steers every conversation to their achievements.",
            "The 'nice' person whose eyes go flat the moment they think no one is watching."
        ],
        takeaway: "Observe more than you perform. Notice the gap between what people say and what they do. Refine your own role—but know it is a role.",
        reflectionPrompt: "What mask do you wear most often? When does it slip? What would others see if they looked closely?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Jean-Antoine_Watteau_-_Pierrot,_dit_autrefois_Gilles.jpg", title: "Pierrot, dit autrefois Gilles", artist: "Jean-Antoine Watteau" }
    },
    {
        id: 4,
        actionTitle: "Determine the Strength of People's Character",
        title: "The Law of Compulsive Behavior",
        overview: "Character is revealed through patterns of behavior, especially under pressure. Compulsions and habits expose what people try to hide.",
        explanation: "People can control their words; they struggle to control repeated actions. Compulsive behavior—the patterns we fall into under stress, boredom, or temptation—reveals character. Greene argues that you can judge people by their habits: how they treat subordinates, how they handle setbacks, what they do when they think no one sees.",
        whyItMatters: "Trusting words over patterns leads to betrayal and disappointment. Reading character through behavior protects you and helps you choose the right allies.",
        commonSigns: [
            "Repeated destructive patterns despite stated intentions",
            "Strong reaction when habits are questioned",
            "Inconsistency between values and daily behavior",
            "Blame-shifting when patterns cause harm"
        ],
        examples: [
            "The leader who preaches work-life balance but emails at 2 a.m. and expects the same.",
            "Someone who says they value honesty but habitually exaggerates and deflects.",
            "A person who 'can't help' a behavior they claim to want to change."
        ],
        takeaway: "Watch what people do, not what they say. Under stress, character shows. Judge by patterns, not promises.",
        reflectionPrompt: "What compulsive patterns do you have? What do they reveal about your character that you might not want to face?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Th%C3%A9odore_G%C3%A9ricault_-_Portrait_of_a_Kleptomaniac_-_WGA08636.jpg", title: "Portrait of a Kleptomaniac", artist: "Théodore Géricault" }
    },
    {
        id: 5,
        actionTitle: "Become an Elusive Object of Desire",
        title: "The Law of Covetousness",
        overview: "People want what they cannot have. The more available something seems, the less desirable it becomes.",
        explanation: "Covetousness drives much of human desire. We are drawn to what is scarce, forbidden, or just out of reach. The strategic approach is not to chase—but to become the object of desire. Create subtle scarcity, maintain mystery, and let others come to you. The moment you seem too eager or too available, you lose power.",
        whyItMatters: "Chasing makes you look desperate and diminishes your value. Understanding covetousness lets you position yourself as desirable and negotiate from strength.",
        commonSigns: [
            "Losing interest once something is obtained",
            "Wanting what others have more than what you have",
            "Being more attracted to the unavailable",
            "Devaluing what comes too easily"
        ],
        examples: [
            "The professional who is always slightly busy and selective with their time commands more respect.",
            "A product that sells better when supply is limited.",
            "The person who plays hard to get often wins—not from manipulation, but from understanding desire."
        ],
        takeaway: "Don't chase. Create value, maintain boundaries, and let desire work for you. Scarcity and mystery amplify appeal.",
        reflectionPrompt: "Where have you made yourself too available? What would shift if you held back more?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Temptation_of_St_Anthony_(Bosch).jpg", title: "The Temptation of St Anthony", artist: "Hieronymus Bosch" }
    },
    {
        id: 6,
        actionTitle: "Elevate Your Perspective",
        title: "The Law of Shortsightedness",
        overview: "We are trapped in the present and our immediate concerns. Elevating your perspective reveals patterns and options invisible from the ground.",
        explanation: "Most people operate from a narrow vantage point: today's crisis, this week's goal, their own viewpoint. Shortsightedness leads to reactive decisions and missed patterns. Greene urges stepping back—mentally and sometimes literally—to see the larger picture. History, context, and other people's perspectives reveal what the close-up view hides.",
        whyItMatters: "Those who see only the immediate lose to those who see the trend. Elevating perspective improves decision-making and helps you anticipate rather than react.",
        commonSigns: [
            "Reacting to every crisis without seeing the pattern",
            "Ignoring the long-term cost of short-term gains",
            "Being unable to see the other side's perspective",
            "Forgetting that today's situation is one moment in a longer story"
        ],
        examples: [
            "The CEO who sees the quarterly report but misses the industry shift.",
            "Someone who wins the argument but loses the relationship.",
            "The strategist who studies history to understand how similar situations played out."
        ],
        takeaway: "Step back. Ask what this looks like in five years. Consider the other perspectives. Elevate before you act.",
        reflectionPrompt: "What are you too close to right now? What would a higher perspective reveal?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Wanderer_above_the_Sea_of_Fog.jpg", title: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich" }
    },
    {
        id: 7,
        actionTitle: "Soften People's Resistance by Confirming Their Self-opinion",
        title: "The Law of Defensiveness",
        overview: "People resist when they feel attacked. The way to influence is to confirm their self-image before asking for change.",
        explanation: "When you challenge someone's beliefs or behavior, they dig in. The defensive response is automatic—it protects the ego. Greene's solution: don't attack the ego. First, confirm what they want to believe about themselves—that they are reasonable, capable, well-intentioned. Once they feel secure, they can open to new information.",
        whyItMatters: "Direct criticism often backfires. Those who confirm before challenging get heard. Those who lead with correction get resistance.",
        commonSigns: [
            "Immediate defensiveness when feedback is offered",
            "Shutting down or attacking when beliefs are questioned",
            "Needing to be right more than to understand",
            "Interpreting neutral information as a personal attack"
        ],
        examples: [
            "A manager who says 'I know you care about quality' before discussing a mistake gets more openness.",
            "The negotiator who acknowledges the other side's position before presenting theirs.",
            "Someone who leads with 'You're usually so good at this' before addressing a lapse."
        ],
        takeaway: "Confirm before you correct. Make people feel seen and respected before you ask them to change.",
        reflectionPrompt: "When do you get defensive? What would it take for you to hear feedback without resistance?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Intervention_of_the_Sabine_Women_-_David_(Louvre_INV_3691).jpg", title: "The Intervention of the Sabine Women", artist: "Jacques-Louis David" }
    },
    {
        id: 8,
        actionTitle: "Change Your Circumstances by Changing Your Attitude",
        title: "The Law of Self-sabotage",
        overview: "We often create our own worst circumstances through negative attitudes and self-defeating patterns.",
        explanation: "Self-sabotage is the unconscious drive to undermine our own success. It manifests as procrastination, negative thinking, attracting the wrong people, or creating drama that distracts from real progress. Greene argues that the root is often a deep-seated belief that we don't deserve success—or fear of what success would require. Changing our attitude—our internal narrative—can change our circumstances.",
        whyItMatters: "Until you recognize self-sabotage, you will keep recreating the same problems. Awareness is the first step to breaking the pattern.",
        commonSigns: [
            "Procrastinating on the most important tasks",
            "Sabotaging relationships right when they get good",
            "Negative self-talk that undermines confidence",
            "Choosing the wrong people or situations repeatedly"
        ],
        examples: [
            "The talented professional who always finds a reason to leave before promotion.",
            "Someone who starts a fight when things are going well.",
            "The person who believes they're 'unlucky' but consistently makes high-risk, low-reward choices."
        ],
        takeaway: "Examine your patterns. Ask what belief you hold that might be driving self-sabotage. Change the attitude; the circumstances often follow.",
        reflectionPrompt: "Where do you sabotage yourself? What belief about yourself might be driving it?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Fallen_Angel_(Alexandre_Cabanel).jpg", title: "The Fallen Angel", artist: "Alexandre Cabanel" }
    },
    {
        id: 9,
        actionTitle: "Confront Your Dark Side",
        title: "The Law of Repression",
        overview: "What we repress does not disappear. It returns in distorted ways. Confronting the shadow is the path to wholeness.",
        explanation: "We push down unacceptable feelings—anger, envy, desire, fear. But repression doesn't eliminate them; it drives them underground. They surface as projection (seeing our flaws in others), irrational outbursts, or self-sabotage. Greene draws on Jung's shadow: the parts of ourselves we deny. Integrating the shadow—acknowledging it without acting it out destructively—reduces its power.",
        whyItMatters: "Repressed material controls you from the shadows. Those who confront their dark side gain self-knowledge and reduce destructive leakage.",
        commonSigns: [
            "Judging others harshly for traits you deny in yourself",
            "Unexplained strong reactions to certain people or situations",
            "Dreams or fantasies that surprise you",
            "Claiming you 'never' feel something you clearly avoid"
        ],
        examples: [
            "The person who condemns dishonesty but habitually exaggerates.",
            "Someone who is 'never angry' but has passive-aggressive outbursts.",
            "The leader who projects their own ambition onto others and attacks it."
        ],
        takeaway: "Face what you repress. Acknowledge the shadow without judgment. Integration, not suppression, is the goal.",
        reflectionPrompt: "What do you repress? Where does it leak out in disguised form?",
        image: { url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/%27The_sleep_of_reason_produces_monsters.%27.jpg", title: "The Sleep of Reason Produces Monsters", artist: "Francisco Goya" }
    },
    {
        id: 10,
        actionTitle: "Beware the Fragile Ego",
        title: "The Law of Envy",
        overview: "Envy is the most destructive of the emotions—invisible, corrosive, and often hidden behind a smile.",
        explanation: "Envy is not desire for what others have; it is resentment that they have it. The envious person wants to diminish the other, not elevate themselves. Because it is shameful, envy is rarely admitted. It hides behind criticism, gossip, or 'helpful' sabotage. Greene warns: beware of those who never celebrate your success, who are quick to point out flaws, or who seem supportive but subtly undermine.",
        whyItMatters: "Envy destroys from within. Recognizing it in others protects you. Recognizing it in yourself is the first step to transcending it.",
        commonSigns: [
            "Inability to celebrate others' success genuinely",
            "Quick to find fault when someone excels",
            "Gossip or subtle undermining of those who shine",
            "Feeling relief when others fail"
        ],
        examples: [
            "The colleague who is silent when you get promoted but eager to discuss your mistakes.",
            "The friend who 'supports' you but always has a reason your success isn't that impressive.",
            "Someone who praises you to your face but criticizes you to others."
        ],
        takeaway: "Protect yourself from envious people. Examine your own envy. Transform it into emulation—learning from others—rather than diminishment.",
        reflectionPrompt: "Where do you feel envy? How does it show up? What would it mean to transform it?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Edvard_Munch_-_Jealousy_(1895).jpg", title: "Jealousy", artist: "Edvard Munch" }
    },
    {
        id: 11,
        actionTitle: "Know Your Limits",
        title: "The Law of Grandiosity",
        overview: "The grandiose believe they are exempt from normal limits. This illusion leads to overreach and downfall.",
        explanation: "Grandiosity is the inflation of the self beyond reality. The grandiose believe they are special, destined, or above the rules. Success feeds it; failure is explained away. Greene traces this through history: leaders who believed their own myth and fell. The antidote is ruthless self-assessment—knowing your limits, seeking honest feedback, and staying grounded.",
        whyItMatters: "Grandiosity blinds you to risk and to the need for others. It precedes most dramatic downfalls. Knowing your limits is a strength, not a weakness.",
        commonSigns: [
            "Believing the rules don't apply to you",
            "Dismissing feedback as envy or misunderstanding",
            "Overestimating your abilities and underestimating obstacles",
            "Surrounding yourself only with those who affirm you"
        ],
        examples: [
            "The founder who ignores market signals because they 'see what others can't.'",
            "The leader who takes excessive risk, convinced of their invincibility.",
            "Someone who falls from grace because they believed their own press."
        ],
        takeaway: "Stay grounded. Seek critics. Know your limits. Grandiosity is a trap.",
        reflectionPrompt: "Where might you be grandiose? Who would tell you the truth—and do you listen?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg", title: "Napoleon Crossing the Alps", artist: "Jacques-Louis David" }
    },
    {
        id: 12,
        actionTitle: "Reconnect to the Masculine or Feminine Within You",
        title: "The Law of Gender Rigidity",
        overview: "We are taught to suppress half of our human potential. Reconnecting to both masculine and feminine qualities makes us whole.",
        explanation: "Culture assigns traits by gender: men should be rational and aggressive; women emotional and nurturing. This rigidity cuts everyone in half. Greene argues for integration: the ability to access both the assertive and the receptive, the logical and the intuitive. The most effective people draw on the full range of human qualities regardless of gender.",
        whyItMatters: "Rigidity limits your range. Those who integrate masculine and feminine have more tools for leadership, connection, and creativity.",
        commonSigns: [
            "Rejecting traits associated with the 'other' gender",
            "Judging others for not fitting gender expectations",
            "Feeling uncomfortable when displaying 'wrong' gender traits",
            "One-dimensional approach to problems—only logic or only emotion"
        ],
        examples: [
            "The leader who combines strategic toughness with emotional intelligence.",
            "Someone who can both assert and listen, compete and collaborate.",
            "The creative who draws on both discipline and intuition."
        ],
        takeaway: "Integrate. Access the full range of human qualities. Rigidity is a limitation; wholeness is power.",
        reflectionPrompt: "What have you suppressed because of gender expectations? What would it mean to reclaim it?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Hermaphroditus_lady_lever.jpg", title: "Hermaphroditus", artist: "Ancient Roman sculpture" }
    },
    {
        id: 13,
        actionTitle: "Advance with a Sense of Purpose",
        title: "The Law of Aimlessness",
        overview: "Without purpose, we drift. A clear sense of direction gives energy, focus, and resilience.",
        explanation: "Aimlessness is the condition of living without a larger purpose. It leads to distraction, susceptibility to others' agendas, and a sense of emptiness. Greene argues that purpose is not a luxury—it is a strategic necessity. Those with a clear sense of direction attract others, make better decisions, and endure hardship. Purpose can be a cause, a craft, or a contribution—but it must be something beyond mere comfort.",
        whyItMatters: "The aimless are easily manipulated and easily discouraged. Purpose provides a compass and a source of strength.",
        commonSigns: [
            "Drifting from one interest or goal to another",
            "Feeling that nothing really matters",
            "Being easily swayed by others' priorities",
            "Lack of energy or motivation for the long haul"
        ],
        examples: [
            "The entrepreneur whose mission attracts talent and customers.",
            "Someone who endures setbacks because the goal matters more than the obstacle.",
            "The person who says no to good opportunities because they don't align with purpose."
        ],
        takeaway: "Define your purpose. Let it guide your choices. Purpose is the antidote to aimlessness.",
        reflectionPrompt: "What is your purpose? If you don't have one, what would it be?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/%22Oath_of_the_Horatii%22_by_Jacques-Louis_David.jpg", title: "Oath of the Horatii", artist: "Jacques-Louis David" }
    },
    {
        id: 14,
        actionTitle: "Resist the Downward Pull of the Group",
        title: "The Law of Conformity",
        overview: "Groups exert a powerful downward pull. The crowd tends toward the lowest common denominator. Resistance requires awareness and courage.",
        explanation: "We are social creatures; we want to belong. But groups often reinforce mediocrity, gossip, and fear. The pressure to conform can suppress innovation, honesty, and excellence. Greene urges conscious resistance: understand the group's dynamics, decide when to go along and when to stand apart. The ability to resist the pull—without becoming an outcast—is a form of power.",
        whyItMatters: "Blind conformity makes you average. Those who resist strategically can lead, innovate, and maintain integrity.",
        commonSigns: [
            "Changing your view to match the group",
            "Gossiping because everyone else does",
            "Avoiding excellence for fear of standing out",
            "Going along with decisions you disagree with"
        ],
        examples: [
            "The employee who speaks up in a meeting when everyone else stays silent.",
            "Someone who maintains standards when the group has lowered theirs.",
            "The leader who resists the crowd's panic and thinks clearly."
        ],
        takeaway: "Be aware of the group's pull. Choose when to conform and when to resist. Your independence is a strategic asset.",
        reflectionPrompt: "Where do you conform when you might resist? What would it cost to stand apart?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg", title: "The School of Athens", artist: "Raphael" }
    },
    {
        id: 15,
        actionTitle: "Make Them Want to Follow You",
        title: "The Law of Fickleness",
        overview: "People are fickle. Loyalty is earned, not given. To lead, you must give others a reason to follow.",
        explanation: "The masses shift allegiance easily. They follow strength, success, and those who make them feel part of something. Fickleness is not moral failure—it is human nature. The strategic response is to become someone worth following: demonstrate competence, share credit, create a compelling vision. When people want to follow you, you have real authority.",
        whyItMatters: "Assuming loyalty without earning it leads to betrayal. Those who understand fickleness build followership consciously.",
        commonSigns: [
            "Shifting allegiance when the wind changes",
            "Following whoever is winning",
            "Lack of deep loyalty to any leader or cause",
            "Being easily swayed by the latest opinion"
        ],
        examples: [
            "The leader who shares credit and develops people, earning lasting loyalty.",
            "Someone who builds a following by serving a cause larger than themselves.",
            "The person who assumes loyalty and is surprised when others leave."
        ],
        takeaway: "Earn followership. Give people a reason to follow. Understand that loyalty is conditional—and work to deserve it.",
        reflectionPrompt: "Why would others follow you? What do you offer? What could you do to earn more genuine loyalty?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Washington_Crossing_the_Delaware_by_Emanuel_Leutze,_MMA-NYC,_1851.jpg", title: "Washington Crossing the Delaware", artist: "Emanuel Leutze" }
    },
    {
        id: 16,
        actionTitle: "See the Hostility Behind the Friendly Façade",
        title: "The Law of Aggression",
        overview: "Beneath civility lies aggression. Competition and hostility are always present, often disguised.",
        explanation: "We like to believe we have evolved beyond aggression. We haven't. It is channeled into politics, business, social competition, and subtle power plays. The friendly surface often hides rivalry, resentment, or the will to dominate. Greene urges seeing clearly: recognize aggression in others and in yourself. Denial makes you vulnerable; awareness allows you to respond strategically.",
        whyItMatters: "Those who assume everyone is friendly are easily outmaneuvered. Seeing aggression—without paranoia—protects you and lets you engage consciously.",
        commonSigns: [
            "Passive-aggressive behavior disguised as helpfulness",
            "Competition framed as collaboration",
            "Smiling while undermining",
            "Aggression that surfaces when the stakes are high"
        ],
        examples: [
            "The colleague who is polite in person but blocks your projects behind the scenes.",
            "The negotiator who smiles while playing hardball.",
            "Someone who 'helps' you in a way that actually weakens your position."
        ],
        takeaway: "See aggression without assuming the worst. Don't be naive; don't be paranoid. Engage with clear eyes.",
        reflectionPrompt: "Where have you missed aggression because it was disguised? Where might your own aggression be hidden?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Judit_decapitando_a_Holofernes,_por_Artemisia_Gentileschi.jpg", title: "Judith Beheading Holofernes", artist: "Artemisia Gentileschi" }
    },
    {
        id: 17,
        actionTitle: "Seize the Historical Moment",
        title: "The Law of Generational Myopia",
        overview: "Each generation is blind to the spirit of its time. Those who see the historical moment can shape it.",
        explanation: "We are products of our era—its technology, its values, its anxieties. But we rarely see our own moment clearly. Generational myopia is the inability to step outside our time and see the larger forces at work. Greene argues that the greatest figures in history had a feel for their moment: they understood what was possible, what was ending, and what was beginning. They seized the historical moment.",
        whyItMatters: "Those who misunderstand their moment miss opportunities or fight the wrong battles. Historical awareness is a strategic advantage.",
        commonSigns: [
            "Assuming the present will continue indefinitely",
            "Dismissing the next generation's perspective",
            "Inability to see what is emerging",
            "Fighting the last war instead of the current one"
        ],
        examples: [
            "The entrepreneur who saw the internet's potential when others dismissed it.",
            "Leaders who understood that old models were dying and new ones emerging.",
            "Someone who clung to the past while the world moved on."
        ],
        takeaway: "Study your moment. What is rising? What is falling? Position yourself for the wave that is coming.",
        reflectionPrompt: "What is the spirit of our time? What are you missing about the historical moment?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Eug%C3%A8ne_Delacroix_-_Liberty_Leading_the_People.jpeg", title: "Liberty Leading the People", artist: "Eugène Delacroix" }
    },
    {
        id: 18,
        actionTitle: "Meditate on Our Common Mortality",
        title: "The Law of Death Denial",
        overview: "We deny death, but it shapes everything we do. Facing mortality clarifies what matters.",
        explanation: "Death is the one certainty we spend our lives avoiding. We distract ourselves, chase immortality through legacy or children, and rarely look directly at our finitude. Greene argues that this denial distorts our choices: we cling to safety, avoid risk, and miss what matters. Meditating on mortality—not morbidly, but honestly—can focus the mind. It reveals what is trivial and what is essential.",
        whyItMatters: "Death denial leads to living by default. Those who face mortality make bolder choices and waste less time on what doesn't matter.",
        commonSigns: [
            "Avoiding any thought of death or aging",
            "Chasing immortality through achievement or legacy",
            "Living as if there is unlimited time",
            "Fear that paralyzes rather than focuses"
        ],
        examples: [
            "The person who, after a brush with death, radically simplifies their life.",
            "Leaders who build for the long term because they know their time is limited.",
            "Someone who finally pursues a dream after accepting they won't live forever."
        ],
        takeaway: "Face mortality. Let it clarify your priorities. Use the awareness of death to live more fully.",
        reflectionPrompt: "What would you do differently if you truly accepted your mortality? What are you avoiding?",
        image: { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Nicolas_Poussin_-_Et_in_Arcadia_ego_(deuxi%C3%A8me_version).jpg", title: "Et in Arcadia Ego", artist: "Nicolas Poussin" }
    }
];
