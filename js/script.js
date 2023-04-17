axios.defaults.headers.common['Authorization'] = 'bVrpkGThVGmUVLA0tuEeI9ZP';

let nomeUsuario = {} 
let nome = {}
let contador = 0
const pergunta = "Qual seu nome?"
const perguntaErro = "Esse nome já existe, digite outro nome:"
let menssagensAntigas = ''
let novasMenssagens = ''

chamarNome(pergunta)


setInterval(checarConversas, 1000)
function chamarNome(seuNome){

    nomeUsuario.name = prompt(seuNome)
    Requisitar();
    setInterval(manterConexao, 5000)
    setInterval(apagarMenssagens, 3000)
    
}
let i = 0;

function apagarMenssagens(){
    const entrada = document.getElementById('menssagens').children[i];
    entrada.style.display = 'none'
    i++;
}


function manterConexao(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nomeUsuario)
    promisse.then( console.log('ta dando certo'))
    
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
    // console.log('nome enviado')
    
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promisse.then(renderizarNomes)
}

function renderizarNomes(res){

    postMenssagens(res,)
    renderizarEntrada(res)
}

function renderizarEntrada(res){
    const entrada = document.querySelector('ul');
   // entrada.innerHTML += `<li data-test="message" class="entradas"> <h1>(${res.data[res.data.length -1].time})</h1><p>${res.data[res.data.length - 1].from}</p>entra na sala</li>`
    // console.log(res.data[99].time)
    carregarBatePapo();
}

function carregarBatePapo(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promisse.then(historicoMenssagens)
}

function checarConversas(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promisse.then(conversas)
}

function conversas(res){
        renderizarConversas(res)
}

function renderizarConversas(res) {

    
    novasMenssagens = res.data[99].time
    console.log(menssagensAntigas, novasMenssagens)

    const ul = document.getElementById('menssagens');
    const menssagens =  `<li data-test="message" class="entradas"> <h1>(${res.data[99].time})</h1><p>${res.data[99].from}</p>para<p>${res.data[99].to +":"}</p> ${res.data[99].text}</li>` 
    if(menssagensAntigas === novasMenssagens ){
    }else { console.log(menssagensAntigas, novasMenssagens)
        ul.innerHTML += menssagens
        menssagensAntigas = novasMenssagens }
     
}

function historicoMenssagens(res){
    for(let i = 0; i < 100; i++){
        // console.log('texto menssafens')              ul.innerHTML += menssagens
        // console.log(res.data[i])
        renderizarHistorico(res.data[i])
    }
    
    menssagensAntigas = res.data[99].time
}

function renderizarHistorico(res) {
    const entrada = document.querySelector('ul');
    entrada.innerHTML += `<li data-test="message" class="entradas"> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`
    
}
function menssagenPost(res) {
    // console.log(res)
}
const btn = document.querySelector("#send")
btn.addEventListener("click", function(e) {
    
    e.preventDefault();
    const name = document.querySelector("#name")
    const value = name.value
    postMenssagens(value)
    name.value =""
})

function postMenssagens(value){
    const menssagens =  {
        from: nomeUsuario.name,
        to: "Todos",
        text: value,
        type: "message" 
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", menssagens)
    promisse.then(menssagenPost)
    // console.log(menssagens)
    
}


/*    
for( let i = 0; i < res.length; i++){
        let nome = res[i]
        entrada.innerHTML += `<li data-test="message">${nome} entra na sala</li>`
}



apagaConversas = (i) => {
    // console.log('asdfaasfadfgsd')
    const entrada = document.querySelector('ul').children;
    entrada[i].innerHTML = ''

}

document.addEventListener("keypress", function(e) {
    
    if(e.key === "Enter"){
        const enviar= document.getElementById('send')
        enviar.click(// console.log('ooooo'))
    }
})
*/