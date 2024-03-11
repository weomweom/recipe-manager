'use client';

import React, { useEffect, useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import styled from 'styled-components';
import { StyledButton } from './StyledComponents';
 
interface FormProps {
    title: string;
    description: string;
    recipe: string;
    ingredients: string;
    status: string;
}

const StyledLabel = styled.label`
    font-weight: 700;
    display: block;
    padding-top: 10px;
`

const options = [
    {
        value: 'NONE',
        label: 'None',
    },
    {
        value: 'BREAKFAST',
        label: 'Breakfast',
    },
    {
        value: 'LUNCH',
        label: 'Lunch',
    },
    {
        value: 'DINNER',
        label: 'Dinner',
    }
]

function RecipeForm({onSubmit, updateData} : {
    onSubmit: Function,
    updateData?: any,
}) {
    const {register, control, handleSubmit, setValue} = useForm<FormProps>();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (updateData) {
            setValue('title', updateData.title);
            setValue('description', updateData.description);
            setValue('recipe', updateData.recipe);
            setValue('ingredients', updateData.ingredients);
            setValue('status', updateData.status);
        }
        setIsLoaded(true);

    }, [updateData]);

    const handleFormSubmit = (data: FormProps) => {
        onSubmit(data);
    };


    return (
        <>
            {isLoaded && <form 
                className='max-w-lg flex flex-col mx-auto' 
                onSubmit={handleSubmit(handleFormSubmit)}>
                <StyledLabel>Title</StyledLabel>
                <input 
                    {...register('title')}
                    type="text" 
                    placeholder="Title" 
                    className='border-2 rounded-md w-full py-1 px-2'
                />

                <StyledLabel>Meal type</StyledLabel>
                <select 
                    {...register('status')} 
                    className='border-2 rounded-md w-full py-1.5 px-1' >
                        {options.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <StyledLabel>Description</StyledLabel>
                <textarea 
                    {...register('description')} 
                    placeholder="Description" 
                    rows={6}
                    className='border-2 rounded-md w-full py-1 px-2'
                />

                <StyledLabel>Recipe</StyledLabel>
                <Controller
                    name='recipe'
                    control={control}
                    render={({ field }) => 
                        <SimpleMDE 
                            placeholder='Reicpe' 
                            {...field} 
                    />}
                />

                <StyledLabel>Ingredients</StyledLabel>
                <Controller
                    name='ingredients'
                    control={control}
                    render={({ field }) => 
                        <SimpleMDE 
                            placeholder='Ingredients' 
                            {...field} 
                    />}
                />
                <StyledButton>Save recipe</StyledButton>
            </form>} 
        </>
    );
}

export default RecipeForm;