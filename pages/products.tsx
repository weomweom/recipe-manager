import { StyledButton } from "@/components/StyledComponents";
import axios from "axios";
import { useState, useEffect, FormEvent } from 'react';

function products() {
    const [title, setTitle] = useState('');
    const [products, setProducts] = useState<any>([]);
    const [updatedProductId, setUpdatedProductId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
		try {
			const response = await axios.get('/api/products');
			if(response.status===200)
				setProducts(response.data);
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('/api/products', {title});
            setTitle('');
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    async function editProduct(id: number){
		try {
			const response = await axios.put('/api/products?id='+id, {title: updatedTitle});
			if(response.status===200){
				fetchData()
                setUpdatedProductId(null);
            }
			else console.log('Error fetching data:', response.statusText);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
    }

    async function deleteProduct(id: number){
		try{
			const response = await axios.delete('/api/products?id=' + id);
			if(response.status === 200)
				fetchData()
			else console.log('Error deleting recipe:', response.statusText);
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	}

    return (
        <>
            <form className="flex flex-col gap-2 justify-end" onSubmit={handleSubmit}>
                <label className="font-semibold">Add new product</label>
                <div className="flex gap-2">
                    <input type='text' className="rounded-xl px-3" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Chocolate yogurt'/>
                    <StyledButton type='submit'>Add</StyledButton>
                </div>
                
            </form>
            <div className="flex justify-center mt-8">
                <table className="w-1/2 bg-white rounded-xl overflow-hidden">
                    <thead className="bg-orange-200">
                        <tr>
                            <th className="p-3">Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 && products.map((product:any, i:number) => (
                            <tr key={i} className='transition-all border-y-2 hover:bg-orange-50 last:border-0'>
                                <td className="flex justify-between p-2">
                                    <div>
                                        {updatedProductId && updatedProductId === product.id
                                            ? <input type='text' value={updatedTitle} onChange={ev => setUpdatedTitle(ev.target.value)}/> 
                                            : product.title
                                        }
                                    </div>
                                    <div className="flex gap-2">
                                        {updatedProductId && updatedProductId === product.id 
                                            ? <button onClick={() => editProduct(product.id)} type="button">save</button>
                                            : <button onClick={() => {setUpdatedProductId(product.id); setUpdatedTitle(product.title)}} type="button">edit</button>
                                        }
                                        <button type="button" onClick={() => deleteProduct(product.id)}>delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default products;