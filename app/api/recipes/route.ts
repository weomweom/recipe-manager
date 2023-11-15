import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'; //validation
import prisma from "@/prisma/client";

const createRecipeSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string(),
    recipe: z.string().min(1),
    ingredients: z.string().min(1),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createRecipeSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    
    const newRecipe = await prisma.recipe.create({
        data: {title: body.title, description: body.description, recipe: body.recipe, ingredients: body.ingredients}
    })

    return NextResponse.json(newRecipe, {status: 201})
}

export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany();
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }