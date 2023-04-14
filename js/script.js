axios.defaults.headers.common['Authorization'] = 'bVrpkGThVGmUVLA0tuEeI9ZP';

let nomeUsuario = {} 
let nome = {}
let contador = 0
const pergunta = "Qual seu nome?"
const perguntaErro = "Esse nome já existe, digite outro nome:"
chamarNome(pergunta)


function chamarNome(seuNome){

    nomeUsuario.name = prompt(seuNome)
    Requisitar();
}

function Requisitar(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeUsuario)
    promisse.then(processarResposta)
    promisse.catch(processarErro) 
    
}
function processarErro(erro){
    if(erro.response.status === 400){
     
    nomeUsuario.name = prompt(perguntaErro)
    Requisitar();
    }
}

function processarResposta(res){
    
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promisse.then(renderizarNomes)
}
function renderizarNomes(res){

    console.log(res)
    renderizarEntrada(res)
}

function renderizarEntrada(res){
    const entrada = document.querySelector('ul');
    entrada.innerHTML += `<li class="entradas"> <h1>(${res.data[res.data.length -1].time})</h1><p>${res.data[res.data.length - 1].from}</p>entra na sala</li>`
    console.log(res.data[99].time)
}


/*    
for( let i = 0; i < res.length; i++){
        let nome = res[i]
        entrada.innerHTML += `<li>${nome} entra na sala</li>`
}
*/