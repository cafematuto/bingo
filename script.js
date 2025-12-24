const nomesJogadores={1:"Funcionário 1",2:"Funcionário 2",3:"Funcionário 3",4:"Funcionário 4",5:"Funcionário 5",6:"Funcionário 6",7:"Funcionário 7",8:"Funcionário 8",9:"Funcionário 9",10:"Funcionário 10",11:"Funcionário 11",12:"Funcionário 12"};
let numeros=[...Array(75).keys()].map(n=>n+1);
let sorteados=JSON.parse(localStorage.getItem("sorteados"))||[];

function sortear(){
 if(!numeros.length)return;
 const n=numeros.splice(Math.floor(Math.random()*numeros.length),1)[0];
 sorteados.push(n);
 localStorage.setItem("sorteados",JSON.stringify(sorteados));
 document.getElementById("numero").innerText=n;
}
function reiniciar(){if(confirm("Reiniciar bingo?")){localStorage.clear();location.reload();}}

const cartelaEl=document.getElementById("cartela");
if(cartelaEl){
 const p=new URLSearchParams(location.search);
 const j=p.get("j");
 nomeJogador.innerText=nomesJogadores[j]||"Jogador";
 let c=JSON.parse(localStorage.getItem("cartela_"+j));
 if(!c){
  c=[];
  while(c.length<25){let n=Math.floor(Math.random()*75)+1;if(!c.includes(n))c.push(n)}
  c.sort((a,b)=>a-b);
  localStorage.setItem("cartela_"+j,JSON.stringify(c));
 }
 for(let i=0;i<5;i++){
  let r=cartelaEl.insertRow();
  for(let k=0;k<5;k++){r.insertCell().innerText=c[i*5+k];}
 }
 setInterval(()=>{
  let s=JSON.parse(localStorage.getItem("sorteados"))||[];
  let u=s[s.length-1];
  document.querySelectorAll("td").forEach(td=>{
   let n=parseInt(td.innerText);
   td.classList.remove("destaque");
   if(s.includes(n))td.classList.add("marcado");
   if(n===u)td.classList.add("destaque");
  });
 },1000);
}
function bingo(){alert(document.querySelectorAll(".marcado").length===25?"🎉 BINGO!":"Ainda não completou");}
