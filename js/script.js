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
    setInterval(manterConexao, 5000)
}

function manterConexao(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nomeUsuario)
    promisse.then(console.log('ta dando certo'))
}

function Requisitar(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeUsuario)
    promisse.then(processarResposta)
    promisse.catch(processarErro) 
    
}
function processarErro(erro){
    if(erro.response.status !== 200){
     
    nomeUsuario.name = prompt(perguntaErro)
    Requisitar();
    }
}

function processarResposta(res){
    console.log('nome enviado')
    
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
    carregarBatePapo();
}



function carregarBatePapo(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promisse.then(Conversas)
}
function Conversas(res){
    for(let i = 90; i < 100; i++){
      
        console.log(res.data[i])
        renderizarConversas(res.data[i])
    }
}
function renderizarConversas(res) {
    const entrada = document.querySelector('ul');
    entrada.innerHTML += `<li class="entradas"> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`
}

/*    
for( let i = 0; i < res.length; i++){
        let nome = res[i]
        entrada.innerHTML += `<li>${nome} entra na sala</li>`
}
*/