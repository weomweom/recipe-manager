import axios from "axios";
import {useRouter} from "next/router";
import { StyledRecipeButtonWrapper } from "./StyledComponents";
import Delete from "./Icons/Delete";
import Edit from "./Icons/Edit";
import Star from "./Icons/Star";


function ReicpeButtons({padding, id, onUpdate} : {
    padding: string, 
    id: number, 
    onUpdate: Function
}) {
    const router = useRouter();

    async function deleteRecipe(id: number){
		try{
			const response = await axios.delete('/api/recipes?id=' + id);
			if(response.status === 200)
				onUpdate()
			else console.log('Error deleting recipe:', response.statusText);
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	}

	function editRecipe(id: number){
		router.push('/recipes/edit/' + id);
	}

    return (
        <StyledRecipeButtonWrapper $padding={padding}>
            <button onClick={() => deleteRecipe(id)}><Delete/></button>
            <button onClick={() => editRecipe(id)}><Edit/></button>
            {/*<button><Star/></button>*/}
        </StyledRecipeButtonWrapper>
    );
}

export default ReicpeButtons;