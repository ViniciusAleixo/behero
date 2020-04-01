import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css'
import logoImg from '../../assets/logo.svg';


export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
 
    const history = useHistory();
   


    async function handleSignup(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            state,
        };
        try {

        
        const response = await api.post('ongs', data);
        alert(`Your ID access: ${response.data.id}`);
        history.push('/');
        } catch (err) {
            alert('Error in your register, try again.');
        }
    }
    return (
        <div className="signup-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Sign up</h1>
                    <p>Don't miss the opportunity to help others. Sign up to stay aware about what is happening in your community.</p>
                   
                    <Link className="back-link" to="/">
                   <FiArrowLeft size={16} color="#E02041" />
                   Already on Be the hero? Sign in.
                   </Link>
                </section>
                <form onSubmit={handleSignup}>
                    <input placeholder="ONG name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                    value={whatsapp}
                    onChange={e => setWhatsApp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="City" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder ="State" 
                        style={{ width: 100 }} 
                        value={state}
                        onChange={e => setState(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}