import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";

function EditRecipePage() {
    const router = useRouter();
    const { id } = router.query;

    const [recipeData, setRecipeData] = useState(
        {
            existingTitle: undefined,
            existingDescription: undefined,
            existingRecipe: undefined,
            existingIngredients: undefined,
        }
    )
    
    useEffect(() => {
        axios.get('/api/recipes?id=' + id).then(res => {
            const {title, description, recipe, ingredients} = res.data
            setRecipeData({existingTitle:title, existingDescription:description, existingRecipe:recipe, existingIngredients:ingredients})
        })
    }, [])

    {console.log(recipeData)}

    return (
        <div>
            <h1>Edit recipe</h1>
            <RecipeForm/>
        </div>
    );
}

export default EditRecipePage;