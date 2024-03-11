import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import RecipeForm from '@/components/RecipeForm';
import { StyledFormHeader } from '@/components/StyledComponents';

const NewRecipePage = () => {
    const router = useRouter();

    async function handleSubmit(data:any) {
        try {
            await axios.post('/api/recipes', data);
            router.push('/recipes');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <StyledFormHeader>Create new recipe</StyledFormHeader>
            <RecipeForm onSubmit={handleSubmit}/>
        </>
    )
}

export default NewRecipePage