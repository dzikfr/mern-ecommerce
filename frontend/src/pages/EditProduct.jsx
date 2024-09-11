import React, {useState, useEffect} from 'react'
import {useSnackbar} from 'notistack';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';  

function EditProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();    

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/product/${id}`)
            .then((response) => {
                setName(response.data.name);
                setPrice(response.data.price);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                alert('Ada error, cek konsol');
            });
    },[id]);

    const handleEditProduct = () => {
        const data = { name, price, description, category };
        setLoading(true);
        axios
            .put(`http://localhost:3000/product/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Produk berhasil diedit', {variant:'success'});
                navigate('/admin');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', {variant:'error'});
                console.log(error);
            });
    };

    if(loading){
        return <div>Loading...</div>
    }

  return (
    <div>
      Edit Produk
    </div>
  )
}

export default EditProduct
