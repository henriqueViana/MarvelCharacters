import Request from './Request';

class Search {

    constructor(characterList, pagination) {
        this.search = document.querySelector('.search');
        this.characterList = characterList;
        this.characterListData = [];
        this.pagination = pagination;

        this.resolvePromise();
    }

    resolvePromise() {
        this.characterList.characters
            .then(res => this.characterListData = res.data.data)
            .then(res => this.search.addEventListener('keyup', (e) => this.updateList(e)))
    }

    updateList(e) {
        if(!e.target.value) {
            this.characterList.setPromise(Request.getAllCharacters());
        } else {
            this.characterList.setPromise(Request.getSearchedCharacters(e.target.value));
        }

        this.pagination.resolvePromise();
    }
}

export default Search;