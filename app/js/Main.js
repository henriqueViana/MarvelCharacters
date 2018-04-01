import Request from './Request';
import CharacterList from './CharacterList';
import Pagination from './Pagination';
import Search from './Search';

class Main {
    constructor() {
        this.requestCharacters = Request.getAllCharacters();
        this.characterList = new CharacterList();
        this.characterList.setPromise(Request.getAllCharacters());
        
        this.pagination = new Pagination(this.characterList);
        this.search = new Search(this.characterList, this.pagination);
    }
}

new Main();