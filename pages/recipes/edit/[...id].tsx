import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";
import { StyledFormHeader } from "@/components/StyledComponents";

function EditRecipePage() {
    const router = useRouter();
    const id  = router.query.id;

    const [recipe, setRecipe] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
		try {
			const response = await axios.get('/api/recipes?id=' + id);
			if(response.status===200)
            {
				setRecipe(response.data);
                setIsLoaded(true);
            }
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (data: any) => {
        try {
            await axios.put(`/api/recipes?id=${id}`, data);
            router.push('/recipes');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoaded && <div>
                <StyledFormHeader>Edit recipe</StyledFormHeader>
                <RecipeForm onSubmit={handleSubmit} updateData={recipe}/>
            </div>}
        </>
    );
}

export default EditRecipePage;