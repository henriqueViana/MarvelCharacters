import Request from './Request';

class Pagination {

    constructor(characterList) {
        this.container = document.querySelector('.pagination');
        this.prev = this.getPrevButton();
        this.next = this.getNextButton();
        this.activePage = 0;
        this.offset = 10;
        this.totalCharacters = '';
        this.totalPages = '';
        this.buttons = [];
        this.totalButtons = window.innerWidth > 360 ? 6 : 3;  
        this.isMobile = window.innerWidth > 360 ? false : true;
        this.initButton = 0;
        this.search = document.querySelector('.search');

        this.characterList = characterList;
        this.characterListData = [];

        this.resolvePromise();

        this.updateTotalButtons();
    }

    resolvePromise() {
        this.characterList.characters
            .then(res => this.characterListData = res.data.data)
            .then(res => this.setTotalCharacters(this.characterListData.total))
    }

    generateButton() {

        this.clearContainer();
        this.statePrevButton();
        this.stateNextButton();
        this.container.appendChild(this.prev);

        this.getInitialButton();


        let initButtonValue = 1;

        for(let i = this.initButton; i < this.totalPages; i++) {
            
            if(initButtonValue > this.totalButtons) break;

            let button = document.createElement('button');
            button.className = this.activePage == i ? 'pagination__button active' : 'pagination__button';
            button.value = i;
            button.innerHTML = i + 1;

            button.addEventListener('click',() => {
                this.clearActiveButton();
                button.classList.add('active');
                this.activePage = Number(button.value);
                this.changePage();
            });

            this.buttons.push(button);
            this.container.appendChild(button);

            initButtonValue++;
        }

        this.container.appendChild(this.next);
    }

    getActivePage() {
        return this.activePage;
    }

    setActivePage(page) {
        this.activePage = page;
    }

    setTotalCharacters(total) {
        this.totalCharacters = total;
        this.totalPages = Math.round(this.totalCharacters / this.offset); 

        this.generateButton();
    }

    changePage() {
        if(this.search.value == '') {
            this.characterList.setPromise(Request.getPaginationCharacters(this.activePage * this.offset));
        } else {
            this.characterList.setPromise(Request.getSearchAndPaginationCharacters(this.search.value, this.activePage * this.offset));
        }

        this.resolvePromise();
    }

    getPrevButton() {
        let prev = document.createElement('div');
        prev.className = 'pagination__prev';

        prev.addEventListener('click', () => {
            if(this.activePage == 0) return;

            this.activePage--;
            this.changePage();
        })

        return prev;
    }

    getNextButton() {
        let next = document.createElement('div');
        next.className = 'pagination__next';

        next.addEventListener('click', () => {
            if(this.activePage >= this.totalPages) return;

            this.activePage++;
            this.changePage();
        });
        
        return next;
    }

    statePrevButton() {
        let state = this.activePage == 0 ? 'add' : 'remove';
        this.prev.classList[state]('disabled');
    }

    stateNextButton() {
        let state = this.activePage >= this.totalPages ? 'add' : 'remove';
        this.next.classList[state]('disabled');
    }

    getInitialButton() {
        if(this.activePage > 2 && !this.isMobile) {
            this.initButton = this.activePage - 2; 
            return;   
        }

        if(this.isMobile) {
            this.initButton = this.activePage == 0 ? this.activePage : this.activePage - 1;  
            return;  
        } 
        
        this.initButton = 0;
    }

    updateTotalButtons() {
        let total = 0;
        window.addEventListener('resize', () => {
            this.totalButtons = window.innerWidth > 360 ? 6 : 3;  
            this.isMobile = window.innerWidth > 360 ? false : true;
            if(total != this.totalButtons) {
                this.generateButton();
                total = this.totalButtons;
            }
        });
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    clearActiveButton() {
        this.buttons.map(button => button.classList.remove('active'));
    }
}

export default Pagination;