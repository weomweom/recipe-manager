import React from 'react';
import Link from 'next/link';
import Image from './Icons/Image';
import ReicpeButtons from './RecipeButtons';

interface RecipeCardType {
    title: string,
    description: string,
    status: string,
    id: number,
	photo: string,
	onUpdate: Function,
}

const RecipeCard = (props: RecipeCardType) => {
	return (
		<div className='relative rounded-2xl bg-white min-h-[150px] overflow-hidden'>
			{props.photo 
				? <img src={props.photo}/>
				: <div className='w-full h-[200px] flex justify-center items-center bg-slate-200'><Image/></div>
			}

			<div className='flex flex-col items-start gap-3 p-5'>
				<Link href={'/recipes/' + props.id} className='font-medium text-3xl text-orange-400 underline' style={{overflowWrap: 'anywhere'}}>{props.title}</Link>

				<p className='text-gray-500'>{props.description}</p>

				<span className={`${props.status === 'NONE' ? 'bg-gray-200' : 'bg-orange-300'} inline lowercase rounded-full py-0.5 px-2  text-xs text-gray-600 hover:text-gray-800 transition-colors`}>{props.status !== 'NONE' ? props.status : 'no tags'}</span>	

				<ReicpeButtons padding='8px' id={props.id} onUpdate={props.onUpdate}/>
			</div>
		</div>
	)
}

export default RecipeCard