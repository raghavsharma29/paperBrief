const axios = require('axios');

const searchPapers = async (query, limit = 10) => {
    try {
        const response = await axios.get(
            'https://api.openalex.org/works',
            {
                params: {
                    search: query,
                    'per-page': limit,
                    // only return fields we need — keeps response small
                    select: 'id,title,authorships,publication_year,abstract_inverted_index,primary_location,doi'
                },
                headers: {
                    // OpenAlex requires a contact email in the User-Agent
                    // this puts you in the "polite pool" with higher rate limits
                    'User-Agent': 'PaperBrief/1.0 (raghav@test.com)'
                }
            }
        );

        const papers = response.data.results || [];

        return papers.map((paper) => ({
            // OpenAlex IDs look like "https://openalex.org/W12345" — we extract just the ID
            paperId: paper.id?.replace('https://openalex.org/', '') || '',
            title: paper.title || 'Untitled',
            // authorships is array of objects — we extract author display names
            authors: paper.authorships
                ? paper.authorships.map((a) => a.author?.display_name).filter(Boolean)
                : [],
            year: paper.publication_year || null,
            // OpenAlex stores abstracts as an "inverted index" — we reconstruct it
            abstract: reconstructAbstract(paper.abstract_inverted_index),
            // get the best available URL
            url: paper.primary_location?.landing_page_url ||
                (paper.doi ? `https://doi.org/${paper.doi}` : '')
        }));
    } catch (error) {
        console.error('OpenAlex API error:', error.message);
        return [];
    }
};

// OpenAlex stores abstracts as { "word": [position1, position2] }
// We need to reconstruct the original sentence from this
const reconstructAbstract = (invertedIndex) => {
    if (!invertedIndex) return '';

    // Build an array where index = word position, value = word
    const words = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
        for (const pos of positions) {
            words[pos] = word;
        }
    }

    // Join all words into a sentence
    return words.filter(Boolean).join(' ');
};

module.exports = { searchPapers };