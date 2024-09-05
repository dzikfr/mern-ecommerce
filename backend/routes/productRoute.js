import express from "express";
import {Product} from "../models/productModels.js";

const router = express.Router();


//GET ALL DATA PRODUCT
router.get('/', async (request, response) => {
    try {
        const product = await Product.find({});
        return response.status(200).json({
            data: product
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//GET DATA BY ID
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const product = await Product.findById(id);
        return response.status(200).json(product);  
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//POST DATA
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.price ||
            !request.body.image ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Field yang dibutuhkan kurang lengkap'
            });
        }

        const newProduct = {
            name: request.body.name,
            price: request.body.price,
            description: request.body.description,
            image: request.body.image,
            category: request.body.category
        };

        const product = await Product.create(newProduct);
        return response.status(201).send(product);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//UPDATE DATA
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.name||
            !request.body.price||
            !request.body.category
        ){
            return response.status(404).send({message: 'Field yang dibutuhkan kurang lengkap'})
        }
        const {id} = request.params;
        const result = await Product.findByIdAndUpdate(id, request.body, {new: true});

        if(!result){
            return response.status(404).json({message: 'Produk tidak ditemukan'})
        }

        response.status(200).send({message: 'Produk diupdate'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//DELETE DATA BY ID
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Product.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Produk tidak ditemukan'})
        }

        response.status(200).json({message: 'Produk dihapus', deletedItem: result});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;