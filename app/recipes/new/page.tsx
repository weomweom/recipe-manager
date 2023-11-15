'use client';

import React from 'react';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface RecipeForm {
    title: string;
    description: string;
    recipe: string;
    ingredients: string;
}

const NewRecipePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<RecipeForm>();

    return (
        <form 
            className='max-w-lg space-y-3 flex flex-col mx-auto' 
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/recipes', data);
                    router.push('/recipes');
                } catch (error) {
                    console.log(error)
                }
            })}>
            <TextField.Root>
                <TextField.Input placeholder="Banana pancakes" {...register('title')}/>
            </TextField.Root>
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
            />
            <Controller
                name='recipe'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Reicpe' {...field}/>}
            />
            <Controller
                name='ingredients'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Ingredients' {...field}/>}
            />
            <div className='self-center'>
                <Button className='hover:cursor-pointer'>Add recipe</Button>
            </div>
        </form>
    )
}

export default NewRecipePage