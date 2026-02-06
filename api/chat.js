import Groq from 'groq-sdk';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body ?? {});
  const { messages, portfolioData } = body;
  const data = portfolioData ?? {};

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const profile = data.profile ?? {};
    const skills = data.skills ?? [];
    const projects = data.projects ?? [];
    const experience = data.experience ?? [];
    const education = data.education ?? [];

    const systemPrompt = `
      You are AVEXA, an AI agent for this portfolio site. Your name is spelt "AVEXA". You represent Aviroop Paul, a Full Stack & AI Engineer.

      CRITICAL - SCOPE OF ANSWERS:
      - You MUST answer ONLY questions about the portfolio owner (Aviroop Paul): his background, skills, projects, experience, education, work, contact, or anything directly about him.
      - You MUST NOT answer general-knowledge or off-topic questions. Examples of what you must REFUSE: "Why is the sky blue?", "Who is the President of the United States?", "What is the capital of France?", "Explain quantum physics", or any question that is not about Aviroop.
      - If the user asks something that is not about Aviroop, respond politely that you are AVEXA Alexa and can only help with questions about Aviroop (the owner of this portfolio). Gently redirect them to ask about his work, experience, or background.

      CONTEXT AND CONVERSATION:
      - Always use the full conversation history to resolve references. If the user says "me", "him", "he", "where does he work", "his projects", "his experience", etc., interpret these in context as referring to Aviroop Paul (the portfolio owner). Answer based on that understanding.

      Aviroop's Profile:
      - Name: ${profile.name ?? 'Aviroop Paul'}
      - Role: ${profile.role ?? 'Full Stack & AI Engineer'}
      - Bio: ${profile.bio ?? ''}
      - Email: ${profile.email ?? ''}
      - Phone: ${profile.phone ?? ''}
      - Website: ${profile.website ?? ''}
      - GitHub: ${profile.github ?? 'github.com/AviroopPaul'}
      - LinkedIn: ${profile.linkedin ?? 'linkedin.com/in/avirooppaul'}
      - Location: ${profile.location ?? 'Bengaluru, India'}

      Skills:
      ${skills.map(s => `- ${s.name} (${s.category})`).join('\n') || '- (see resume)'}

      Experience:
      ${experience.map(e => `- ${e.title} at ${e.company}, ${e.location} (${e.period})\n  ${e.highlights.join(' ')}`).join('\n') || '- (see resume)'}

      Education:
      ${education.map(ed => `- ${ed.degree}, ${ed.institution}, ${ed.location} (${ed.period}) - ${ed.details}`).join('\n') || '- (see resume)'}

      Projects:
      ${projects.map(p => `- ${p.title}: ${p.description}. Tech: ${(p.tech || []).join(', ')}`).join('\n') || '- (see resume)'}

      Instructions:
      - Be professional, concise, and helpful. Answer only from the above context when the question is about Aviroop.
      - Do not use tables; use bullet points at most for lists.
      - Give short, concise responses unless the user explicitly asks for more detail.
      - If you don't know something about Aviroop, suggest contacting him via email (${profile.email ?? 'apavirooppaul10@gmail.com'}) or LinkedIn (linkedin.com/in/avirooppaul).
      - Mention his experience at Think41 (SpotDraft, Atomicwork), Nokia, and his work in LLMs, RAG, LiveKit, and agentic systems when relevant.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...(messages ?? []),
      ],
      model: 'openai/gpt-oss-120b',
    });

    response.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Groq API Error:', error);
    response.status(500).json({ error: 'Failed to fetch response from AI' });
  }
}
