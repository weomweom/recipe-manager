'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link'
import RecipeCard from '../components/RecipeCard';
import Add from '@/components/Icons/Add';

const Recipe = () => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get('/api/recipes');
			if(response.status===200)
				setData(response.data);
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	function handleUpdate(){
		fetchData();
	}

    return (
      	<div>
			<Link href='/recipes/new' className='inline-flex justify-center items-center gap-1 p-3 bg-orange-400 text-white rounded-full'><Add/> Add Recipe</Link>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pt-5'>
				{data.map(recipe => (
					<>
						<RecipeCard key={recipe.id} title={recipe.title} description={recipe.description} status={recipe.status} id={recipe.id} photo={recipe.photo} onUpdate={handleUpdate}/>
					</>
					
				))}
			</div>
		</div>
    )
}

export default Recipe