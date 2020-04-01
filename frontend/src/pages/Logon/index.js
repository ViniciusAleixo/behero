import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
   
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Login error');
        }
    }
    return (
       <div className="logon-container">
           <section className="form">
               <img src={logoImg} alt="Logo" />

               <form onSubmit={handleLogin}>
                   <h1>Sign in to be the hero</h1>

                   <input placeholder="Enter Your ID" 
                   value={id}
                   onChange={e => setId(e.target.value)}
                   />
                   <button className ="button" type="submit">Sign in</button>

                   <Link className="back-link" to="/signup">
                   <FiLogIn size={16} color="#E02041" />
                   New to be the hero? Create an account.
                   </Link>
               </form>

           </section>
           <img src={heroesImg} alt="Heroes" />
       </div>
       
    );
}