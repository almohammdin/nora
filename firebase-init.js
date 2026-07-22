import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getDatabase, ref, onValue, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
const firebaseConfig={apiKey:"AIzaSyAiLZh1SaB4bwk5kCdAulB_c96b5xcXCN4",authDomain:"noura-master-workspace.firebaseapp.com",databaseURL:"https://noura-master-workspace-default-rtdb.europe-west1.firebasedatabase.app",projectId:"noura-master-workspace",storageBucket:"noura-master-workspace.firebasestorage.app",messagingSenderId:"114267787091",appId:"1:114267787091:web:fa590d23d71a47e1041ba6",measurementId:"G-2C3GC9XEXP"};
const app=initializeApp(firebaseConfig);
window.NouraFirebase={auth:getAuth(app),db:getDatabase(app),onAuthStateChanged,signInWithEmailAndPassword,signOut,setPersistence,browserLocalPersistence,ref,onValue,set,serverTimestamp};
for(const src of ["app-core.js?v=20260722","app-ui.js?v=20260722"]){await new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=src;script.defer=true;script.onload=resolve;script.onerror=reject;document.head.appendChild(script);});}
