'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import RecipeCard from '../components/RecipeCard';

const Recipe = () => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
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

			fetchData();
	}, []);

    return (
      	<div>
			<Button radius='full'><Link href='/recipes/new'>+ Add Recipe</Link></Button>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pt-5'>
				{data.map(recipe => (
					<RecipeCard key={recipe.id} title={recipe.title} description={recipe.description} status={recipe.status} id={recipe.id}></RecipeCard>
				))}
			</div>
		</div>
    )
}

export default Recipe