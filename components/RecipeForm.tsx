'use client';

import React, { useState } from 'react';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/router';

interface FormProps {
    title: string;
    description: string;
    recipe: string;
    ingredients: string;
    status: string;
}

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
            <select {...register('status')}>
                {options.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
                ))}
            </select>
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
            />
            <Controller
                name='recipe'
                control={control}
                defaultValue={'kotiata'}
                render={({ field }) => <SimpleMDE placeholder='Reicpe' {...field}/>}
            />
            <Controller
                name='ingredients'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Ingredients' {...field}/>}
            />
            <div className='self-center'>
                <Button className='hover:cursor-pointer'>Save recipe</Button>
            </div>
        </form>

        <form>
        </form>
</>
    );
}

export default RecipeForm;