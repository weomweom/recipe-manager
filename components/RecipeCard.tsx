import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from './Icons/Image';
import Delete from './Icons/Delete';
import Edit from './Icons/Edit';

interface RecipeCardType {
    title: string,
    description: string,
    status: string,
    id: number,
	photo: string,
	onUpdate: Function,
}

const RecipeCard = (props: RecipeCardType) => {
	const router = useRouter();

	async function deleteRecipe(id: number){
		try{
			const response = await axios.delete('/api/recipes?id=' + id);
			if(response.status === 200)
				props.onUpdate()
			else console.log('Error deleting recipe:', response.statusText);
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	}

	function editRecipe(id: number){
		router.push('/recipes/edit/' + id);
	}

	return (
		<div className='relative flex flex-col justify-between rounded-2xl p-5 bg-slate-100 min-h-[150px] gap-3'>
			{props.photo ? 
				<img src={props.photo}/>
				:
				<div className='w-full h-[200px] flex justify-center items-center'><Image/></div>
			}
			<h2 className='font-medium text-3xl text-orange-400'>{props.title}</h2>
			<p className='text-gray-500'>{props.description}</p>
			<span className='w-min lowercase rounded-full py-0.5 px-2 bg-orange-300 text-xs text-gray-600 hover:text-gray-800 transition-colors'>{props.status}</span>
			<div className='absolute flex gap-2 bg-white top-0 right-0 p-2 rounded-bl-xl rounded-tr-xl border-t-4 border-r-4 border-slate-100'>
				<button onClick={() => deleteRecipe(props.id)}><Delete/></button>
				<button onClick={() => editRecipe(props.id)}><Edit/></button>
			</div>
		</div>
	)
}

export default RecipeCard