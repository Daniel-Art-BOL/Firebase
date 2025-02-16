import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,  // 🔹 Se mantiene `Popup` para mejor experiencia en PWA
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";

// 🔹 Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_2P8yDvhhaURfmUHtrZvGQQXi43BVXpw",
  authDomain: "daniel-firebase-dd822.firebaseapp.com",
  projectId: "daniel-firebase-dd822",
  storageBucket: "daniel-firebase-dd822.firebasestorage.app",
  messagingSenderId: "797616823648",
  appId: "1:797616823648:web:aa24ce4843ee5b9e125205",
  measurementId: "G-DCK03XTP50"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 🔹 Configurar persistencia en localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Persistencia de sesión configurada en localStorage"))
  .catch((error) => console.error("⚠️ Error configurando persistencia:", error));


  const loginWithGoogle = async () => {
    try {
      console.log("🟢 Abriendo ventana de autenticación...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Usuario autenticado con Google:", result.user);
    } catch (error) {
      console.error("⚠️ Error en autenticación con Google:", error);
    }
  };



// 🔹 Función para registrar usuario con Email/Contraseña
const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Usuario registrado con email:", userCredential.user.email);
  } catch (error) {
    console.error("⚠️ Error al registrar usuario:", error.message);
  }
};

// 🔹 Función para iniciar sesión con Email/Contraseña
const loginWithEmail = async (email, password) => {
  if (password.length < 6) {
    console.error("⚠️ La contraseña debe tener al menos 6 caracteres.");
    return;
}

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Usuario autenticado con email:", userCredential.user.email);
  } catch (error) {
    console.error("⚠️ Error al iniciar sesión con email:", error.message);
  }
};

// 🔹 Función para cerrar sesión
const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ Usuario cerró sesión.");
  } catch (error) {
    console.error("⚠️ Error al cerrar sesión:", error.message);
  }
};

// 🔹 Exportar funciones de autenticación
export { auth, googleProvider, loginWithGoogle, registerWithEmail, loginWithEmail, logout };
