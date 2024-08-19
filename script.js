document.getElementById('matchForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex').value;
    const interest = document.getElementById('interest').value;
    const occupation = document.getElementById('occupation').value;

    const partnerName = document.getElementById('partnerName').value;
    const partnerSex = document.getElementById('partnerSex').value;
    const partnerInterest = document.getElementById('partnerInterest').value;
    const partnerOccupation = document.getElementById('partnerOccupation').value;

    const inputData = {
        name,
        sex,
        interest,
        occupation,
        partnerName,
        partnerSex,
        partnerInterest,
        partnerOccupation
    };

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                prompt: `Analyze the compatibility based on the following data: ${JSON.stringify(inputData)}. Provide a matching probability.`,
                max_tokens: 50
            })
        });

        const data = await response.json();
        const resultText = data.choices[0].text.trim();

        document.getElementById('result').innerText = `Match Analysis: ${resultText}`;
    } catch (error) {
        document.getElementById('result').innerText = `Error: Could not calculate match.`;
    }
});
