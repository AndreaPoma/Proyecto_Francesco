//Conectando a la firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4XzpZv1yAqACukhDZoCe4_VQZ_aIXkQQ",
  authDomain: "idfrancesco1.firebaseapp.com",
  projectId: "idfrancesco1",
  storageBucket: "idfrancesco1.appspot.com",
  messagingSenderId: "962520073720",
  appId: "1:962520073720:web:53c8c93d6244856b6b020d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();

//Llamando elementos de HTML

let ingresar = document.getElementById('btningresar');
let btnRegistrar = document.getElementById('btnregistrar');

let btnGoogle = document.getElementById('btnGoogle');
let btnCerrar = document.getElementById('btnCerrar');

//Función de ingresar
ingresar.addEventListener('click', ()=>{
    let email = document.getElementById('txtemail').value;
    let password = document.getElementById('txtpassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("SI se incio sesion con exito");
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    console.log("NO se incio sesion con exito");
    var errorMessage = error.message;
  });

})

btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in
          console.log('Registro correctamente');
          cargarJSON();
          formulario.classList.replace('mostrar', 'ocultar');
          contenidoDeWeb.classList.replace('ocultar', 'mostrar');
          var user = userCredential.user;
          // ...
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // ..
      });
})

//Función de ingresar con Google
btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
      var credential = result.credential;
      console.log("Incio de sesión con google correctamente.");
      // ...
  }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      console.log("Error de sesión con google correctamente.");
  });
})

//Función cerrar sesión
btnCerrar.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
      console.log("Cierra sesión correctamente.");
  }).catch((error) => {
      console.log("Error con el cierre sesión correctamente.");
  })

});

//Mantener datos
firebase.auth().onAuthStateChanged((user) => {
    if (user) { 
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });