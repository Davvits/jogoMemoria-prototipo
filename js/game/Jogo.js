export default class GameMemoria {
    constructor(jogador,personagens) {
        this.game = document.querySelector('.content');
        this.personagens = personagens;

        this.session = {
            jogador: {
                nome: jogador || 'Player',
                html: document.querySelector('.player')
            },
            clock: {
                timer : 0,
                html: document.querySelector('.timer')
            },
            pontos: {
                number: 0,
                html: document.querySelector('.pontos'),
                html_combo: document.querySelector('.combo'),
                combo: 1,
                sequencia: 0
            },
            card0 : '',
            card1 : '',
        };

        this.events();

    }

    events(){

        this.game.addEventListener('click', ({ target }) => {

            console.log(target)
            if(!target.className.includes('face')) return;
            if(target.parentNode.className.includes('reveal-card')){
                return;
            }
        
            if ( this.session.card0 === '') {
        
                target.parentNode.classList.add('reveal-card');
                this.session.card0 = target.parentNode;
        
            } else if (this.session.card1 === '') {
        
                target.parentNode.classList.add('reveal-card');
                this.session.card1 = target.parentNode;
        
                this.checkCards();
        
            };
        });

        this.loadGame();
        

    }

    checkEndGame = () => {
        const disabledCards = document.querySelectorAll('.disabled-card');
    
        if ( disabledCards.length === Number(this.personagens.length) * 2){
            this.stopClock();
            alert(`Parabéns, ${this.session.jogador.nome}! você conseguiu`);

            const req = prompt("voce deseja jogar novamente? s/n")

            if(req === 's') this.restartGame();
        };
    };

    checkCards = () => {
        const firstCharacter = this.session.card0.getAttribute('data-character');
        const secondCharacter = this.session.card1.getAttribute('data-character');
    
        if (firstCharacter === secondCharacter){
            this.session.card0.firstChild.classList.add('disabled-card');
            this.session.card1.firstChild.classList.add('disabled-card');
            
            this.addPontos()
            this.addCombo()
    
            this.session.card0 = '';
            this.session.card1 = '';
    
            this.checkEndGame();
        
        } else {
            setTimeout(()=>{
    
            this.session.card0.classList.remove('reveal-card');
            this.session.card1.classList.remove('reveal-card');
    
            this.session.card0 = '';
            this.session.card1 = '';

            this.removerCombo()
    
            }, 500);

        };
    }

    loadGame = () => {

        const dupplicateCards = [ ... this.personagens, ... this.personagens ];
    
        const shuffledArray = dupplicateCards.sort(() => Math.random() - 0.5);
    
        shuffledArray.forEach((character) =>{
            const card = this.createCard(character);
            this.game.appendChild(card);
        });

        this.session.jogador.html.innerHTML = this.session.jogador.nome;

    };

    createCard = (character) => {

        const card = GameMemoria.createElement('div', 'card');
        const front = GameMemoria.createElement('div', 'face front');
        const back = GameMemoria.createElement('div', 'face back');
    
        front.style.background = `red url('../imagens/${character}.jpg')`;
        front.style.backgroundSize = 'cover';
        front.style.backgroundPosition = 'center';
    
        card.appendChild(front);
        card.appendChild(back);

        card.setAttribute('data-character', character );
    
        return card;  
    };

    static createElement = (tag, className) => {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }

    startClock = () => {
        this.session.clock.interval = setInterval(() => {
            this.session.clock.timer++;
            this.session.clock.html.innerHTML = this.session.clock.timer;
        }, 1000);
    }
    stopClock = () => {
        clearInterval(this.session.clock.interval)
    }

    addPontos = () => {

        this.session.pontos.number +=  this.session.pontos.combo;
        this.session.pontos.html.innerText = this.session.pontos.number
    }

    addCombo = () => {
        this.session.pontos.sequencia++;

        if(this.session.pontos.sequencia % 3 !== 0) return
        this.session.pontos.combo *= 2;

        this.session.pontos.html_combo.innerText = this.session.pontos.combo;
    }

    removerCombo = () => {
        this.session.pontos.sequencia = 0;
        this.session.pontos.combo = 1;
        this.session.pontos.html_combo.innerText = this.session.pontos.combo;
    }

    restartGame = () => {
        this.game.innerHTML = '';

        this.session.clock.timer = 0;
        this.session.clock.html.innerText = 0;

        this.session.pontos.number = 0;
        this.session.pontos.html.innerText = 0;

        this.session.pontos.combo = 0;
        this.session.pontos.html_combo.innerText = 0;

        this.loadGame();
        this.startClock();
    }

}





