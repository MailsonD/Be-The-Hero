import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

function Logon() {
	const [id, setId] = useState('');

	const history = useHistory();
	async function handleLogon(event) {
		event.preventDefault();

		try {
			const result = await api.post('auth', { id });

			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', result.data.name);
			history.push('/profile');
		} catch (error) {
			alert('ID inválido. Por favor tente novamente');
		}
	}

	return (
		<div className='logon-container'>
			<section className='form'>
				<img src={logoImg} alt='Be The Hero' />

				<form onSubmit={handleLogon}>
					<h1>Faça seu logon</h1>

					<input
						placeholder='Sua ID'
						value={id}
						onChange={e => setId(e.target.value)}
					/>
					<button className='button' type='submit'>
						Entrar
					</button>
					<Link to='/register' className='back-link'>
						<FiLogIn size='16' color='#E02041' />
						Não tenho cadastro
					</Link>
				</form>
			</section>

			<img src={heroesImg} alt='Heroes' />
		</div>
	);
}

export default Logon;
