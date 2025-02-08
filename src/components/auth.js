import { useState, useEffect } from "react";
import {auth, googleauthprovider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";



export const Auth=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [user, setUser] = useState(null);

    // Detectar si el usuario está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);


    const signIn = async () => {
        if (!email || !password) {
          alert("Por favor, ingresa un correo y una contraseña.");
          return;
        }
        
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          alert("Usuario registrado correctamente");
        } catch (error) {
          console.error("Error al registrarse:", error.message);
          alert(error.message);
        }
      };
      
        // Autenticación con Google
        const signInWithGoogle = async () => {
            try {
            await signInWithPopup(auth, googleauthprovider);
            alert("Inicio de sesión con Google exitoso");
            } catch (error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            alert(error.message);
            }
        };

          // Cerrar sesión
        const logout = async () => {
            try {
            await signOut(auth);
            alert("Sesión cerrada correctamente");
            } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            alert(error.message);
            }
        };

    return(
        <div>
        {user ? (
          // Si el usuario está autenticado, mostrar su email y botón de logout
          <div>
            <h3>Bienvenido, {user.email}</h3>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        ) : (
          // Si no hay usuario, mostrar los inputs de autenticación
          <div>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Registrarse</button>
            <button onClick={signInWithGoogle} style={{ marginLeft: "10px" }}>
              Iniciar sesión con Google
            </button>
          </div>
        )}
      </div>
      
    );

};