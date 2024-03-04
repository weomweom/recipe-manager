import React from 'react';
import RecipeForm from '@/components/RecipeForm';

const NewRecipePage = () => {
    return (
        <>
            <h1 className='text-center font-bold text-xl'>Create new recipe</h1>
            <RecipeForm/>
        </>
    )
}

export default NewRecipePage