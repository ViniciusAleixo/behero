import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then (res => {
            setIncidents(res.data);

        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err) {
            alert('Error to delete the case, try again.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');


    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Welcome, {ongName} </span>
                <Link className="button" to="/incidents/new">Register new case</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="E02041" />
                </button>
            </header>
            <h1>Cases Registered</h1>
            <ul>
               {incidents.map(incident => (
                <li key={incidents.id}>
                    <strong>Case:</strong>
                    <p>{incident.title}</p>

                    <strong>Description:</strong>
                    <p>{incident.description}</p>

                    <strong>Amount:</strong>
                        <p>{Intl.NumberFormat('au-AU', {style: 'currency', currency:'AUD'}).format(incident.value)}</p>
                    <button onClick={() => handleDeleteIncident(incident.id)}type="button">
                        <FiTrash2 size={21} color="#a8a8b3" />
                    </button>
                </li>
               
               ))}
           
            </ul>
        </div>
    );
}