'use client';

import React from 'react';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
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

function RecipeForm() {
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

    const router = useRouter();
    const {register, control, handleSubmit} = useForm<FormProps>();

    return (
<>
<form 
        className='max-w-lg flex flex-col mx-auto' 
        onSubmit={handleSubmit(async (data) => {
            try {
                await axios.post('/api/recipes', data);
                router.push('/recipes');
            } catch (error) {
                console.log(error)
            }
        })}>
            <TextField.Root>
                <StyledLabel>Title</StyledLabel>
                <TextField.Input placeholder="Banana pancakes" {...register('title')} className='w-full border-2 rounded-md pl-1'/>
            </TextField.Root>

            <div>
                <StyledLabel>Meal type</StyledLabel>
                <select {...register('status')} className='border-2 rounded-md w-full'>
                    {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                    ))}
                </select>
            </div>

            <StyledLabel>Description</StyledLabel>
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
            />

            <StyledLabel>Recipe</StyledLabel>
            <Controller
                name='recipe'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Reicpe' {...field}/>}
            />

            <StyledLabel>Ingredients</StyledLabel>
            <Controller
                name='ingredients'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Ingredients' {...field}/>}
            />
            <StyledButton>Save recipe</StyledButton>
        </form>
</>
    );
}

export default RecipeForm;