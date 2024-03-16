import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from "@/components/Icons/Image";
import { StyledReactMarkdown } from '@/components/StyledComponents';
import Delete from '@/components/Icons/Delete';
import Star from '@/components/Icons/Star';
import Edit from '@/components/Icons/Edit';

const Title = styled.h2`
    color: ${props => props.theme.colors.main};
    font-weight: 500;
    font-size: 40px;
    display: flex;
    align-items: center;
    gap: 15px;
    overflow-wrap: anywhere;
    width: 90%;
`

const MealType = styled.span`
    background-color: ${props => props.theme.colors.main};
    border-radius: 20px;
    color: white; 
    text-transform: lowercase;
    font-size: 16px;
    padding: 3px 10px;
    text-align: center;
`

const NoImage = styled.div`
    width: 300px;
    height: 300px;
    float: right;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.no_image_bg};
    border-radius: 1rem;
    margin: 0 0 30px 30px;
`

const StyledHeading = styled.h3`
    font-size: 26px;
    font-weight: 600; 
`

function Recipe() {
    const router = useRouter();
    const { id } = router.query;

    const [recipe, setRecipe] = useState(
        {
            title: undefined,
            description: undefined,
            recipe: undefined,
            ingredients: undefined,
            createdAt: undefined,
            id: -1,
            status: undefined,
            updatedAt: undefined,
        }
    )

    useEffect(() => {
        if (id && id !== "") {
            fetchData()
        }
    }, [id]);
    
    const fetchData = async () => {
		try {
			const response = await axios.get('/api/recipes?id=' + id);
			if(response.status===200)
				setRecipe(response.data);
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    async function deleteRecipe(id: number){
		try{
			const response = await axios.delete('/api/recipes?id=' + id);
			if(response.status === 200)
				router.push('/recipes');
			else console.log('Error deleting recipe:', response.statusText);
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	}

	function editRecipe(id: number){
		router.push('/recipes/edit/' + id);
	}

    return (
        <div className='relative m-5 px-10 py-5 rounded-xl bg-white min-h-[500px]'>

            <div className='absolute flex gap-2 top-0 right-0 p-5 rounded-bl-xl border-slate-100'>
                <button onClick={() => deleteRecipe(recipe.id)}><Delete/></button>
                <button onClick={() => editRecipe(recipe.id)}><Edit/></button>
                <button><Star/></button>
            </div>	

            <div className=''>
                <Title>
                    {recipe.title}
                    {recipe.status !== 'NONE' &&<MealType>{recipe.status}</MealType>}
                </Title>    
            
            </div>

            <div>
                <div>
                    <NoImage>
                        <Image/>
                    </NoImage>

                    <StyledHeading>Description</StyledHeading>
                    <StyledReactMarkdown>
                        {recipe.description}
                    </StyledReactMarkdown>

                    <StyledHeading>Ingredients</StyledHeading>
                    <StyledReactMarkdown>
                        {recipe.ingredients}
                    </StyledReactMarkdown>

                    <StyledHeading>Recipe</StyledHeading>
                    <StyledReactMarkdown>
                        {recipe.recipe}
                    </StyledReactMarkdown>                        
                </div>
            </div>
        </div>
    );
}

export default Recipe;