import React from 'react'

interface RecipeCardType {
    title: string,
    description: string,
    status: string,
    id: number
}

const RecipeCard = (props: RecipeCardType) => {
	return (
		<div className='flex flex-col justify-between rounded-2xl p-5 bg-slate-100 min-h-[150px] space-y-3'>
			<h2 className='font-medium text-3xl text-orange-400'>{props.title}</h2>
			<p className='text-gray-500'>{props.description}</p>
			<span className='w-min lowercase rounded-full py-0.5 px-2 bg-orange-300 text-xs text-gray-600 hover:text-gray-800 transition-colors'>{props.status}</span>
		</div>
	)
}

export default RecipeCard