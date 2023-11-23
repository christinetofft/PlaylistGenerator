const button = document.querySelector('button');
const moodInput = document.querySelector('#mood');
const pTag = document.querySelector('.container .playlist');
const loading = document.querySelector('.loader');
const apiKeyInput = document.querySelector('#api-key')


button.addEventListener("click", () => {
    loading.classList.remove('none');
    loading.classList.add('block');

    const apiKey = apiKeyInput.value

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Follow my instructions clearly. Create a playlist of only 20 different songs with this mood: ${moodInput.value}` +
                    'Very important that there is no repeating of songs and that the songs fits the mood. Show every song only one time! Maximum of 20 songs in the playlist.' +
                    'Only respond with "Here is a playlist based on your mood:" and then the list of the songs. End the response with "Enjoy your new playlist!"'
            }]
        })
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data.choices[0].message.content)
            pTag.innerText = data.choices[0].message.content;
            loading.classList.remove('block');
            loading.classList.add('none');
    })
        .catch(error => {
            console.error("Error:", error);
            pTag.innerText = 'An error occurred 😥 Please try another OpenAi api-key or mood.';
            loading.classList.remove('block');
            loading.classList.add('none');
        });
})




