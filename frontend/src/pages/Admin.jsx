import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

const Admin = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true);

        axios
            .get('http://localhost:3000/product')
            .then(
                (response) => {
                    setProduct(response.data.data);
                    setLoading(false);
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    setLoading(false);
                }
            );
    }, []);

    return (
        <div className='px-4 py-8 max-w-7xl bg-gray-500 mx-auto'>
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                <Link to="" className='bg-green-600 hover:bg-green-900 text-white py-2 px-4 font-medium rounded-lg shadow-md'>
                                    Add Item +
                                </Link>
                            </th>
                            <th>Name:</th>
                            <th>Price:</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                    {product.map((product, index)=>(
                        <tr key={product._id} className='bg-white hover:bg-gray-300'>
                            <td>
                                <div className='avatar'>
                                    <div className='mask mask-squircle w-12 h-12'>
                                        <img src={product.image} alt={product.title}/>
                                    </div>
                                </div>
                            </td>
                            <td className='py-3 px-5'>{product.name}</td>
                            <td className='py-3 px-5'>{product.price}</td>
                            <td className='py-3 px-5'>{product.description}</td>
                            <td className='py-3 px-5'>{product.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;