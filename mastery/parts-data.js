/**
 * MASTERY PARTS DATA - The 6 Parts from "Mastery" by Robert Greene
 *
 * Edit this file to update part content.
 */

const PARTS_DATA = [
    {
        id: 1,
        slug: 'life-task',
        title: "Life's Task",
        subtitle: "Discover Your Calling",
        overview: "Everyone possesses a unique inner force guiding them toward their life's work. Reconnect with your innate inclinations from childhood—the first step toward mastery is always inward.",
        keyIdeas: [
            "Find your way back to your natural inclination",
            "Let go of the past—apply skills in new ways",
            "Avoid the false path; rebel against forces that misdirect you",
            "Occupy the perfect niche—find a space you can dominate",
            "Return to your origins—listen to visceral, nonverbal signals"
        ],
        subthemes: ["Innate inclination", "Childhood passions", "False paths", "Perfect niche", "Authenticity"],
        examples: [
            "Darwin's passion for nature was obvious in childhood; he followed it despite pressure toward medicine.",
            "Mozart and Einstein both took 10 years before producing great work—they started early with full immersion.",
            "Those who conform to others' expectations end up in fields they don't love, filling themselves with public approval."
        ],
        reflectionPrompt: "What did you love doing as a child before anyone told you what you 'should' do? Where have you deviated from that inclination?",
        reflectionFields: ["What did I love as a child?", "Where have I conformed to others' expectations?", "What niche could I dominate?"]
    },
    {
        id: 2,
        slug: 'apprenticeship',
        title: "Apprenticeship",
        subtitle: "Submit to Reality",
        overview: "The apprenticeship is a transformation of mind and character. Focus on challenges, not money. Deep observation, skills acquisition, and experimentation—in that order—plant the seed for greatness.",
        keyIdeas: [
            "Deep Observation: Learn social dynamics and unspoken rules before acting",
            "Skills Acquisition: Focus on one skill at a time; 2–3 hours of intense focus beats 8 hours distracted",
            "Experimentation: Force yourself to create before you feel ready",
            "Value learning over money—work for free if you can afford it",
            "Nobody can skip the apprenticeship; it takes 10,000+ hours"
        ],
        subthemes: ["Deep observation", "Skills acquisition", "Experimentation", "Trial and error", "Humility"],
        examples: [
            "Benjamin Franklin apprenticed as a printer, absorbing every aspect of the craft before branching out.",
            "Charles Darwin spent years on the Beagle observing before formulating his theory.",
            "The goal is transformation, not a 'piece of paper'—look for challenges that move you past your comfort zone."
        ],
        reflectionPrompt: "Are you in an apprenticeship phase right now? What skill are you acquiring? Are you valuing learning over comfort or money?",
        reflectionFields: ["What skill am I deliberately acquiring?", "Where am I avoiding resistance?", "Am I experimenting or playing it safe?"]
    },
    {
        id: 3,
        slug: 'mentor-dynamic',
        title: "Mentor Dynamic",
        subtitle: "Absorb the Master's Power",
        overview: "Books are generic; a mentor tailors knowledge to your situation. Submit to learning from those ahead of you. Absorb everything—then surpass them and move on.",
        keyIdeas: [
            "Let go of the fear of submitting—there are people far ahead of you",
            "Create a back-and-forth relationship; don't only passively receive",
            "Transfigure their ideas—breathe your own personality into their teachings",
            "Push for tough love; you need harsh truths, not comfort",
            "Your goal is to surpass your mentor; internalize, then move on"
        ],
        subthemes: ["Submission", "Absorption", "Independence", "Tough love", "Surpassing"],
        examples: [
            "Napoleon Hill had a 'council' of great figures from the past he consulted for guidance.",
            "Good mentors set you free when you're ready; poor mentors keep you subjugated out of envy.",
            "Sometimes you must 'slay the father'—use the emotion of breaking free to burst your cocoon."
        ],
        reflectionPrompt: "Who is or could be your mentor? Are you resisting submission out of ego? When will you know it's time to move on?",
        reflectionFields: ["Who mentors me?", "Am I resisting learning from others?", "What would my ideal mentor tell me right now?"]
    },
    {
        id: 4,
        slug: 'social-intelligence',
        title: "Social Intelligence",
        subtitle: "See People as They Are",
        overview: "Success without social intelligence does not last. See people for who they really are—their motives, their manipulations. Accept them; don't try to change them. Navigate dynamics with clarity.",
        keyIdeas: [
            "Accept your boss will take credit—it's part of apprenticeship",
            "Hide your rebellious streak until you're at the top",
            "To avoid envy: ask for advice, self-deprecate, show weakness",
            "Suffer fools gladly—don't lower yourself to their level",
            "See yourself as others see you; analyze feedback objectively"
        ],
        subthemes: ["Reading people", "Acceptance", "Envy management", "Persona crafting", "Detachment"],
        examples: [
            "Too much praise or friendliness upon first meeting can signal envy—be guarded.",
            "Fools are governed by ego and public approval; don't engage at their level.",
            "Craft the appropriate persona; speak through your work when words fail."
        ],
        reflectionPrompt: "Where do you misread people? Do you take things personally when they aren't about you? How do you handle envy—in yourself and others?",
        reflectionFields: ["Where do I misread people?", "How do I handle envy?", "What persona do I need to craft?"]
    },
    {
        id: 5,
        slug: 'creative-active',
        title: "Creative-Active",
        subtitle: "Awaken the Dimensional Mind",
        overview: "Resist the urge to relax after apprenticeship. Expand into different fields, experiment, challenge the rules you learned. Blend knowledge, focus, and childlike openness to explore new routes.",
        keyIdeas: [
            "Inflexibility kills creativity—hold paradoxes (doubt and trust) at once",
            "Grandiosity: praise inflates ego; let the work itself motivate you",
            "Impatience: creativity requires tenacious application, not shortcuts",
            "Dependency: distance yourself from your work to discern useful feedback",
            "Conservatism: fitting in and fearing failure stifle originality"
        ],
        subthemes: ["Dimensional mind", "Experimentation", "Originality", "Pitfalls", "Ostinato rigore"],
        examples: [
            "Da Vinci called it 'ostinato rigore'—tenacious, disciplined application to the creative process.",
            "Children don't invent life-changing things; masters retain childlike openness plus years of knowledge.",
            "The myth of drugs fueling creativity is false—mastery requires discipline and emotional stability."
        ],
        reflectionPrompt: "Which creative pitfall traps you most: inflexibility, grandiosity, impatience, dependency, or conservatism? What would experimenting look like for you?",
        reflectionFields: ["Which creative pitfall traps me?", "Where am I playing it safe?", "What would bold experimentation look like?"]
    },
    {
        id: 6,
        slug: 'mastery',
        title: "Mastery",
        subtitle: "Fuse the Intuitive With the Rational",
        overview: "Mastery is not fully rational—it combines knowledge, skills, and intuition. Intuition takes up to 20 years to develop. It's a never-ending process; setbacks are blessings that keep you on the path.",
        keyIdeas: [
            "Intuition needs knowledge, skills, and experience—decades of it",
            "Mastery is a never-ending process; you never 'arrive'",
            "Setbacks and challenges are blessings—they keep you ascending",
            "Mastery is not genius; it's time, focus, and emotional qualities",
            "Setting yourself on the path of mastery is a favor you do the world"
        ],
        subthemes: ["Intuition", "Rational + intuitive", "Never-ending", "Emotional qualities", "Service"],
        examples: [
            "Top performers trust their guts—but only after years of deliberate practice.",
            "Desire, persistence, and confidence drive mastery more than raw reasoning.",
            "The path is simple: apprenticeship → creative-active → mastery. Accessible to everyone."
        ],
        reflectionPrompt: "Where has your intuition developed? Do you trust it? How do you respond to setbacks—as obstacles or as fuel?",
        reflectionFields: ["Where has my intuition developed?", "How do I respond to setbacks?", "What would mastery look like for me?"]
    }
];
