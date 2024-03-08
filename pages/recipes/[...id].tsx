import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import Image from "@/components/Icons/Image";
import styled from 'styled-components';

const Title = styled.h2`
    color: ${props => props.theme.colors.main};
    font-weight: 500;
    font-size: 40px;
`

const NoImage = styled.div`
    width: 300px;
    height: 300px;
    float: right;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.no_image_bg};
    border-radius: 1rem;
`

function Recipe() {
    const router = useRouter();
    const { id } = router.query;

    const [recipe, setRecipe] = useState(
        {
            title: undefined,
            description: undefined,
            recipe: undefined,
            ingredients: '',
            createdAt: undefined,
            id: undefined,
            status: undefined,
            updatedAt: undefined,
        }
    )

    useEffect(() => {
        fetchData()
    }, [])
    
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

    console.log(recipe)

    return (
        <div>
            <Title>{recipe.title}</Title>
            <div>
                <div>
                    <NoImage>
                        <Image/>
                    </NoImage>
                    <ReactMarkdown>
                        {recipe.description}
                    </ReactMarkdown>
                    <ReactMarkdown>
                        {recipe.ingredients}
                    </ReactMarkdown>
                    <ReactMarkdown>
                        {recipe.recipe}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default Recipe;