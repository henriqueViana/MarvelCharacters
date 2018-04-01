class Details {

    constructor() {
        this.details = document.querySelector('.contentPageDetails');
        this.defaultPage = document.querySelector('.contentPage');
        this.search = document.querySelector('.header__search');

        this.detailsInfo = this.getDetailsInfo();
        
    }

    openPage(character) {

        window.scrollTo(0,0);

        this.defaultPage.classList.add('hidden');
        this.details.classList.remove('hidden');
        this.search.classList.add('hidden');

        let backButton = this.getBackButton();
        let contentInfo = this.getContentInfo()
        let thumbnail = this.getThumbnail(character);
        let name = this.getInfoName(character.name);
        let series = this.getSeries(character.series.items);
        let events = this.getEvents(character.events.items);
        
        console.log(character);

        contentInfo.appendChild(name);
        contentInfo.appendChild(series);
        contentInfo.appendChild(events);

        this.detailsInfo.appendChild(thumbnail);
        this.detailsInfo.appendChild(contentInfo);

        this.details.appendChild(backButton);
        this.details.appendChild(this.detailsInfo);
    }

    closePage() {
        this.clearContainer();
        this.details.classList.add('hidden');
        this.defaultPage.classList.remove('hidden');
        this.search.classList.remove('hidden');
    }

    getBackButton() {
        let backButton = document.createElement('div');
        backButton.className = 'contentPageDetails__back color__red';
        backButton.innerHTML = 'Voltar';

        backButton.addEventListener('click', () => this.closePage())

        return backButton;
    }

    getDetailsInfo() {
        let detailsInfo = document.createElement('div');
        detailsInfo.className = 'contentPageDetails__info';

        return detailsInfo;
    }

    getThumbnail(character) {
        let thumbnail = document.createElement('img');
        thumbnail.className = 'contentPageDetails__thumbnail';
        thumbnail.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        thumbnail.alt = 'Foto do personagem';

        return thumbnail;
    }

    getContentInfo() {
        let contentInfo = document.createElement('div');
        contentInfo.className = 'contentPageDetails__contentInfo';

        return contentInfo;
    }

    getInfoName(characterName) {
        let infoName = document.createElement('div');
        infoName.className = 'contentPageDetails__infoName detailsBoxInfo';

        let title = document.createElement('h2');
        title.className = 'color__red';
        title.innerHTML = 'Nome';

        let name = document.createElement('div');
        name.innerHTML = characterName;

        infoName.appendChild(title);
        infoName.appendChild(name);

        return infoName;
    }

    getSeries(series) {
        let infoSeries = document.createElement('div');
        infoSeries.className = 'contentPageDetails__infoSeries detailsBoxInfo';

        let title = document.createElement('h2');
        title.className = 'color__red';
        title.innerHTML = 'Series';

        let containerSeries = document.createElement('div');

        if(series.length == 0) {
            containerSeries.classList.add('notContent');
            containerSeries.innerHTML = 'Este personagem não possui séries';
        } else {
            series.map(serie => {
                let serieName = document.createElement('div');
                serieName.innerHTML = serie.name;

                containerSeries.appendChild(serieName);
            });
        }

        infoSeries.appendChild(title);
        infoSeries.appendChild(containerSeries);

        return infoSeries;
    }

    getEvents(events) {
        let infoEvents = document.createElement('div');
        infoEvents.className = 'contentPageDetails__infoEvents detailsBoxInfo';

        let title = document.createElement('h2');
        title.className = 'color__red';
        title.innerHTML = 'Eventos';

        let containerEvents = document.createElement('div');

        if(events.length == 0) {
            containerEvents.classList.add('notContent');
            containerEvents.innerHTML = 'Este personagem não possui eventos';
        } else {
            events.map(event => {
                let eventName = document.createElement('div');
                eventName.innerHTML = event.name;

                containerEvents.appendChild(eventName);
            });
        }

        infoEvents.appendChild(title);
        infoEvents.appendChild(containerEvents);

        return infoEvents;
    }


    clearContainer() {
        this.details.innerHTML = '';
        this.detailsInfo.innerHTML = '';
    }
}

export default Details;