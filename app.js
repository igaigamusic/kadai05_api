const apiKey = 'API key'; // 取得したAPIキーを入力
const endpoint = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

async function fetchNews() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        console.log(data)
        displayNews(data.articles);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // 初期化

    articles.forEach(article => {
        // title と description が "[Removed]" でない場合のみ表示
        if (article.title !== "[Removed]" && article.description !== "[Removed]") {
            const title = article.title || '';
            const description = article.description || '';
            const url = article.url || '#';

            // title または description のどちらかが存在すれば表示
            if (title || description) {
                const newsItem = document.createElement('div');
                newsItem.innerHTML = `
          <h2>${title}</h2>
          <p>${description}</p>
          <a href="${url}" target="_blank">Read more</a>
        `;
                newsContainer.appendChild(newsItem);
            }
        }
    });
}

fetchNews();
