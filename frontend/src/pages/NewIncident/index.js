import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';

function NewIncident() {
	let teste = 0;
	const ongId = localStorage.getItem('ongId');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setvalue] = useState(0);

	const history = useHistory();

	async function handleCreateNewIncident(event) {
		event.preventDefault();
		const data = {
			title,
			description,
			value
		};

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: ongId
				}
			});

			alert('Caso cadastrado com sucesso!');
			history.push('/profile');
		} catch (error) {
			alert('Falha ao criar um novo caso. Por favor tente novamente');
			console.error('Falha ao criar um novo caso');
			console.error(error);
		}
	}

	return (
		<div className='new-incident-container'>
			<div className='content'>
				<section>
					<img src={logoImg} alt='Be The Hero' />
					<h1>Cadastrar novo caso</h1>
					<p>
						Descreva o caso detalhadamente para encontrar um herói
						para resolver isso.
					</p>
					<Link to='/profile' className='back-link'>
						<FiArrowLeft size='16' color='#E02041' />
						voltar para home
					</Link>
				</section>
				<form onSubmit={handleCreateNewIncident}>
					<input
						placeholder='Título do caso'
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea
						placeholder='Descrição'
						onChange={e => setDescription(e.target.value)}
					/>
					<input
						placeholder='Valor em reais'
						onChange={e => setvalue(e.target.value)}
					/>

					<button className='button' type='submit'>
						Cadastrar {teste}
					</button>
				</form>
			</div>
		</div>
	);
}

export default NewIncident;
