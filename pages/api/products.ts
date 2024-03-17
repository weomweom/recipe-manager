import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET'){
        try {
            const products = await prisma.products.findMany(); 
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } 

    if (req.method === 'POST'){
        try {
            const { title } = req.body; 
            const newProduct = await prisma.products.create({
                data: {
                    title,
                }
            });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        try{
            const id = req.query?.id as string | undefined;
            if (!id) {
                throw new Error('ID parameter is missing');
            }

            const parsedId = parseInt(id);

            if (isNaN(parsedId)) {
                throw new Error('Invalid ID parameter');
            }

            const {title} = req.body;

            const updatedProduct = await prisma.products.update({
                where: {
                    id: parsedId
                },
                data: {
                    title,
                }
            })
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
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

            const deletedProduct = await prisma.products.delete({
                where: {
                    id: parsedId,
                }
            })
            res.status(200).json(deletedProduct);
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}