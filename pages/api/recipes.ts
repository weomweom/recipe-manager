import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET'){
        try {
            if(req.query?.id){
                const id = req.query.id as string | undefined;

                if (!id) {
                    throw new Error('ID parameter is missing');
                }

                const parsedId = parseInt(id);

                if (isNaN(parsedId)) {
                    throw new Error('Invalid ID parameter');
                }

                const recipe = await prisma.recipe.findUnique({
                    where: {
                        id: parsedId,
                    }
                })

                res.status(200).json(recipe)
            } else {
                const recipes = await prisma.recipe.findMany(); 
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.status(200).json(recipes);
            }

        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } 

    if (req.method === 'POST'){
        try {
            const { title, recipe, description, ingredients, status } = req.body; 
            const newRecipe = await prisma.recipe.create({
                data: {
                    title,
                    recipe,
                    description,
                    ingredients,
                    status,
                },
            });
            res.status(201).json(newRecipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    if(req.method === 'DELETE'){
        try{
            const id = req.query?.id as string | undefined;
            if (!id) {
                throw new Error('ID parameter is missing');
            }

            const parsedId = parseInt(id);

            if (isNaN(parsedId)) {
                throw new Error('Invalid ID parameter');
            }

            const deletedRecipe = await prisma.recipe.delete({
                where: {
                    id: parsedId,
                }
            })
            res.status(200).json(deletedRecipe);
        } catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

