import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';
import LogoImg from '../../assets/logo.svg';

function Profile() {
	const ongId = localStorage.getItem('ongId');
	const ongName = localStorage.getItem('ongName');
	const [incidents, setIncidents] = useState([]);

	const history = useHistory();

	useEffect(() => {
		api.get('/profile', {
			headers: {
				Authorization: ongId
			}
		})
			.then(response => {
				setIncidents(response.data);
			})
			.catch(error => {
				console.error('Fala na busca');
			});
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			});

			setIncidents(incidents.filter(incidents => incidents.id !== id));
		} catch (error) {
			alert('Erro ao deletar o caso, teste novamente');
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className='profile-container'>
			<header>
				<img src={LogoImg} alt='Be The Hero' />
				<span>Bem vinda, {ongName}</span>

				<Link className='button' to='/incidents/new'>
					Cadastrar novo caso
				</Link>
				<button type='button' onClick={handleLogout}>
					<FiPower size={18} color='#E02048' />
				</button>
			</header>
			<h1>Casos cadastrados</h1>
			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO: </strong>
						<p>{incident.title}</p>

						<strong>DESCRIÇÃO:</strong>
						<p>{incident.description}</p>

						<strong>VALOR:</strong>
						<p>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.value)}
						</p>

						<button
							type='button'
							onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color='#a8a8b3' />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Profile;
