import Game from './game/Jogo.js'


const characters = [
    'ahri',
    'akali',
    'akshan',
    'ashe',
    'ekko',
    'evelynn',
    'fiora',
    'fizz',
    'irelia',
    'kaissa',
    'kassadin',
    'katarina',
    'kha_zix',
    'leesin',
    'masterYI',
    'pantheon',
    'pyke',
    'rengar',
    'riven',
    'samira',
    'vayne',
    'vayne_skin',
    'yasuo',
    'yone',
    'zed'
    ];

// Criar Novo Objeto > Telas..
// Criar Novo Objeto > Novos Personagem > Outros

const inputNome = document.querySelector('#inputNome');
const dificuldade = document.querySelector('#range');

let personagensSessao = []

window.addEventListener('click', ({ target }) => {
    if( target === document.querySelector('#confirmar')){

        console.log(inputNome.value , dificuldade.value)
        
            if(dificuldade.value == 1) {
                SetPersonagensSessao(5)
                const JogoDaMemoria = new Game(inputNome.value, personagensSessao);
            }
            if( dificuldade.value == 2) {
                SetPersonagensSessao(10)
                const JogoDaMemoria = new Game(inputNome.value, personagensSessao);
            }
            if( dificuldade.value == 3) {
                SetPersonagensSessao(15)
                const JogoDaMemoria = new Game(inputNome.value, personagensSessao);
            }
            if( dificuldade.value == 4) {
                SetPersonagensSessao(20)
                const JogoDaMemoria = new Game(inputNome.value, personagensSessao);
            }
            if( dificuldade.value == 5) {
                SetPersonagensSessao(25)
                const JogoDaMemoria = new Game(inputNome.value, personagensSessao);
            }

            document.querySelector('.telaPause').classList.add('displayNone')
            
    }
})

function SetPersonagensSessao (valor) {

   personagensSessao = []

    for (let index = 0; index < valor; index++) {
        personagensSessao.push(characters[index])
    }

    console.log(personagensSessao)
}