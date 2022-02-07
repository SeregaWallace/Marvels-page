

class MarvelService {
    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f5ef98936d09d264d711a9dc8f5d103d';

     getResources = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Error fetching ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    
    getAllCharacters = async () => {
        const res = await this.getResources(`${this._apiBaseUrl}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._getCharacterData);
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBaseUrl}characters/${id}?${this._apiKey}`);
        return this._getCharacterData(res.data.results[0]);
    }

    _getCharacterData = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, description is not found.',
            thumbnail: char.thumbnail.path + '.' +
                        char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;