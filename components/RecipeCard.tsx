import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from './Icons/Image';
import Delete from './Icons/Delete';
import Edit from './Icons/Edit';
import Star from './Icons/Star';
import { StyledReactMarkdown } from './StyledComponents';

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
		<div className='relative rounded-2xl bg-white min-h-[150px] overflow-hidden'>
			{props.photo ? 
				<img src={props.photo}/>
				:
				<div className='w-full h-[200px] flex justify-center items-center bg-slate-200'><Image/></div>
			}

			<div className='flex flex-col items-start gap-3 p-5'>
				<Link href={'/recipes/' + props.id} className='font-medium text-3xl text-orange-400 underline' style={{overflowWrap: 'anywhere'}} >{props.title}</Link>
				<StyledReactMarkdown $textColor="#6B7280">{props.description}</StyledReactMarkdown>
				<span className={`${props.status === 'NONE' ? 'bg-gray-200' : 'bg-orange-300'} inline lowercase rounded-full py-0.5 px-2  text-xs text-gray-600 hover:text-gray-800 transition-colors`}>{props.status !== 'NONE' ? props.status : 'no tags'}</span>
				<div className='absolute flex gap-2 bg-white top-0 right-0 p-2 rounded-bl-xl border-slate-100'>
					<button onClick={() => deleteRecipe(props.id)}><Delete/></button>
					<button onClick={() => editRecipe(props.id)}><Edit/></button>
					<button><Star/></button>
				</div>			
			</div>
		</div>
	)
}

export default RecipeCard