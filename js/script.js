axios.defaults.headers.common['Authorization'] = 'bVrpkGThVGmUVLA0tuEeI9ZP';

let nomeUsuario = {} 
let nome = {}
let contador = 0
const pergunta = "Qual seu nome?"
const perguntaErro = "Esse nome já existe, digite outro nome:"
let menssagensAntigas = ''
let novasMenssagens = ''

chamarNome(pergunta)


setInterval(checarConversas, 3000)
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
   

    const ul = document.getElementById('menssagens');
    const menssagens =  `<li data-test="message" class="entradas"> <h1>(${res.data[99].time})</h1><p>${res.data[99].from}</p>para<p>${res.data[99].to +":"}</p> ${res.data[99].text}</li>` 
    if(menssagensAntigas === novasMenssagens ){
    }else {
        mandaMenssagem(res.data[99])
        menssagensAntigas = novasMenssagens }
     
}
function mandaMenssagem(res){
     const entrada = document.getElementById('menssagens');
    if(res.type === "message" && res.to === "Todos"){
        entrada.innerHTML += `<li data-test="message" class="entradas menssagenTodos "> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`
    }
    if(res.type === "message" && res.to !== "Todos"){entrada.innerHTML += `<li data-test="message" class="entradas menssagensPessoais"> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`}
    if (res.type === "status" ){
        entrada.innerHTML += `<li data-test="message" class="entradas"> <h1>(${res.time})</h1> <p>${res.from}</p>${res.text}</li>`
    }
}

function historicoMenssagens(res){
    for(let i = 0; i < 100; i++){
        renderizarHistorico(res.data[i])
    }
    
    menssagensAntigas = res.data[99].time
}

function renderizarHistorico(res) {
    
    const entrada = document.querySelector('ul');
    if(res.type === "message" && res.to === "Todos"){
        entrada.innerHTML += `<li data-test="message" class="entradas menssagenTodos "> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`
    }
    if(res.type === "message" && res.to !== "Todos"){entrada.innerHTML += `<li data-test="message" class="entradas menssagensPessoais"> <h1>(${res.time})</h1><p>${res.from}</p>para<p>${res.to +":"}</p> ${res.text}</li>`}
    if (res.type === "status" ){
        entrada.innerHTML += `<li data-test="message" class="entradas"> <h1>(${res.time})</h1> <p>${res.from}</p>${res.text}</li>`
    }
    
    
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
    promisse.catch(erroPostmenssagen)
  
    
}
function erroPostmenssagen(){
   
}
function menssagenPost(res) {
    checarConversas(res)
}
