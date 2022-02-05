

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
    
    getAllCharacters = () => {
        return this.getResources(`${this._apiBaseUrl}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResources(`${this._apiBaseUrl}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;