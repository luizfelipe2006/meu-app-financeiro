import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDM4cT_y2a36p1sKmEVRDNBXcOTll77gCo",
  authDomain: "appfinanceiroo.firebaseapp.com",
  projectId: "appfinanceiroo",
  storageBucket: "appfinanceiroo.firebasestorage.app",
  messagingSenderId: "357055782247",
  appId: "1:357055782247:web:13f4bff13c2c3e4106e3c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("appBox");
const erro = document.getElementById("erro");
const frame = document.getElementById("framePlanilha");
const userName = document.getElementById("userName");

let usuarioAtual=null;

// CADASTRO
window.cadastrar = async ()=>{
try{
await createUserWithEmailAndPassword(
auth,
email.value,
senha.value
);
}catch(e){
erro.innerText=e.message;
}
};

// LOGIN
window.login = async ()=>{
try{
await signInWithEmailAndPassword(auth,email.value,senha.value);
}catch{
erro.innerText="Login inválido";
}
};

// LOGOUT
window.logout = ()=> signOut(auth);

// SALVAR PLANILHA
window.salvarPlanilha = async ()=>{

await setDoc(doc(db,"usuarios",usuarioAtual.uid),{
planilha:linkPlanilha.value
});

carregarPlanilha();
};

// CARREGAR
async function carregarPlanilha(){

const ref = doc(db,"usuarios",usuarioAtual.uid);
const snap = await getDoc(ref);

if(snap.exists()){
frame.src=snap.data().planilha;
}
}

// LOGIN DETECTADO
onAuthStateChanged(auth,async(user)=>{

if(user){
usuarioAtual=user;

userName.innerText="👋 "+user.email;

loginBox.classList.add("hidden");
appBox.classList.remove("hidden");

carregarPlanilha();

}else{
loginBox.classList.remove("hidden");
appBox.classList.add("hidden");
}

});

// ENTER LOGIN
document.addEventListener("keypress",(e)=>{
if(e.key==="Enter") login();
});

// 🌙 TEMA
window.toggleTema = ()=>{
document.body.classList.toggle("light");

localStorage.setItem(
"tema",
document.body.classList.contains("light")
);
};

// carregar tema salvo
if(localStorage.getItem("tema")==="true"){
document.body.classList.add("light");
}