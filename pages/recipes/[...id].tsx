import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from "@/components/Icons/Image";
import { 
    StyledReactMarkdown, 
    StyledTitle,
    StyledMealType,
    StyledNoImage,
    StyledHeading
} from '@/components/StyledComponents';
import ReicpeButtons from '@/components/RecipeButtons';
import Loader from '@/components/Loader';

function Recipe() {
    const router = useRouter();
    const { id } = router.query;

    const [isLoaded, setIsLoaded] = useState(false);

    const [recipe, setRecipe] = useState(
        {
            title: undefined,
            description: undefined,
            recipe: undefined,
            ingredients: undefined,
            createdAt: undefined,
            id: -1,
            status: undefined,
            updatedAt: undefined,
        }
    )

    useEffect(() => {
        if (id && id !== "") {
            fetchData()
            setIsLoaded(true);
        }
    }, [id]);
    
    const fetchData = async () => {
		try {
			const response = await axios.get('/api/recipes?id=' + id);
			if(response.status===200)
				setRecipe(response.data);
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

    function onUpdate() {
        router.push('/recipes');
    }

    return (
        <>
            {isLoaded 
                ? <div className='relative m-5 px-10 py-5 rounded-xl bg-white min-h-[500px] overflow-hidden'>
                    <ReicpeButtons id={recipe.id} padding='20px 20px 0 0' onUpdate={onUpdate}/>

                    <StyledTitle>
                        {recipe.title}
                        {recipe.status !== 'NONE' &&<StyledMealType>{recipe.status}</StyledMealType>}
                    </StyledTitle>   

                    <div>
                        <StyledNoImage>
                            <Image/>
                        </StyledNoImage>

                        <StyledHeading>Description</StyledHeading>
                        <StyledReactMarkdown>
                            {recipe.description}
                        </StyledReactMarkdown>

                        <StyledHeading>Ingredients</StyledHeading>
                        <StyledReactMarkdown>
                            {recipe.ingredients}
                        </StyledReactMarkdown>

                        <StyledHeading>Recipe</StyledHeading>
                        <StyledReactMarkdown>
                            {recipe.recipe}
                        </StyledReactMarkdown>                        
                    </div>
                </div>
                : <Loader/>    
            }
        </>
    );
}

export default Recipe;