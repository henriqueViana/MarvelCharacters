import Request from './Request';
import Details from './Details';

class CharacterList {

    constructor(promise) {
        this.container = document.querySelector('.characters__container');
        this.characters = '';
        this.pageDetails = new Details();
    }

    setPromise(promise) {
        this.characters = promise;
        this.resolvePromise();        
    }

    resolvePromise() {
        this.characters
            .then(res => this.characters = res.data.data)
            .then(res => this.getHtml())
    }

    setList(characters) {
        this.characters = characters;
        this.getHtml();
    }

    getHtml() {

        this.clearContainer();

        let self = this;

        this.characters.results.map(element => {

            let character = document.createElement('div');
            character.className = 'characters__description';

            let charactersData = this.getCharactersData();
            let charactersSeries = this.getCharactersSeries(element.series.items);
            let charactersEvents = this.getCharactersEvents(element.events.items);

            let thumbnail = this.getThumbnail(element);
            let name = this.getName(element);

            character.appendChild(thumbnail);
            character.appendChild(name);

            charactersData.addEventListener('click', () => this.pageDetails.openPage(element));
            
            charactersData.appendChild(character);
            charactersData.appendChild(charactersSeries);
            charactersData.appendChild(charactersEvents);

            this.container.appendChild(charactersData);
        });
    }

    getThumbnail(character) {
        let thumbnail = document.createElement('img');
        thumbnail.className = 'thumbnail';
        thumbnail.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        thumbnail.alt = 'Foto do personagem';

        return thumbnail;
    }

    getName(character) {
        let name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = character.name;

        return name;
    }

    getCharactersData() {
        let charactersData = document.createElement('div');
        charactersData.className = 'characters__data';

        return charactersData;
    }

    getCharactersSeries(series) {
        let charactersSeries = document.createElement('div');
        charactersSeries.className = 'characters__series';

        if(series.length == 0) {
            charactersSeries.classList.add('notContent');
            charactersSeries.innerHTML = 'Este personagem não possui séries';
            return charactersSeries;
        }

        series.map((item, index) => {
            if(index > 2) return charactersSeries;

            let name = document.createElement('div');
            name.className = 'name';
            name.innerHTML = item.name;

            charactersSeries.appendChild(name);
        });

        return charactersSeries;
    }

    getCharactersEvents(events) {
        let charactersEvents = document.createElement('div');
        charactersEvents.className = 'characters__events';

        if(events.length == 0) {
            charactersEvents.classList.add('notContent');
            charactersEvents.innerHTML = 'Este personagem não possui eventos';
            return charactersEvents;
        }

        events.map((item, index) => {
            if(index > 2) return charactersEvents;

            let name = document.createElement('div');
            name.className = 'name';
            name.innerHTML = item.name;

            charactersEvents.appendChild(name);
        });

        return charactersEvents;
    }

    clearContainer() {
        this.container.innerHTML = '';
    }
   
}

export default CharacterList;