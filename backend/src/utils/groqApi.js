const axios = require('axios');

const summarizePaper = async (title, abstract) => {
    // if no abstract, return default values immediately
    // no point calling Groq with empty content
    if (!abstract || abstract.trim() === '') {
        return {
            summary: ['Abstract not available for this paper'],
            relevanceScore: 0,
            oneLiner: 'No abstract available'
        };
    }

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                max_tokens: 1000,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a research assistant. Always respond with valid JSON only. No markdown, no backticks, no explanation — just the raw JSON object.'
                    },
                    {
                        role: 'user',
                        content: `Summarize this research paper and return a JSON object with exactly these fields:
                        - summary: array of exactly 5 strings (cover: problem, method, findings, limitations, use case)
                        - relevanceScore: number from 1 to 10. Score based on: clarity of problem statement (1-3), significance of findings (1-4), practical applicability (1-3). Add them up for the final score. Never return 0 unless abstract is completely empty.
                        - oneLiner: one sentence plain English summary of the paper

                        Title: ${title}
                        Abstract: ${abstract}`
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // extract the text content from Groq's response
        const content = response.data.choices[0].message.content;

        // parse the JSON string into an object
        const parsed = JSON.parse(content);

        return {
            summary: parsed.summary || [],
            relevanceScore: parsed.relevanceScore || 0,
            oneLiner: parsed.oneLiner || ''
        };
    } catch (error) {
        console.error('Groq API error:', error.message);
        // return safe defaults if Groq fails
        return {
            summary: ['Summary generation failed'],
            relevanceScore: 0,
            oneLiner: 'Could not generate summary'
        };
    }
};

module.exports = { summarizePaper };