import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
import "./productsStyle.scss";
import EditProduct from "./EditProduct";

function Products() {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState({});
    const [modalIsOpen,setModalIsOpen] = useState(false);

    const getProducts = () => {
        ShopService.getAllProducts()
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getProducts();
    }, [])

    const deleteProduct = (id) => {
        ShopService.deleteProductById(id)
            .then(res => {
                getProducts();
            })
            .catch(err => {
                console.log(err)
            })
    };

    const editProduct = (product) => {
        setProductToEdit(product);
        setModalIsOpen(true);
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Product image</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => {
                    return <tr key={index}>
                        <td>{product.title}</td>
                        <td>
                            <img src={`../uploads/${product.productImg}`} alt={product.title}
                                 className="admin-product-img"/>
                        </td>
                        <td>{product.price}, 00 kr</td>
                        <td>{product.rating}</td>
                        <td className="product-description">{product.description}</td>
                        <td className="text-center">
                            <button className="btn btn-danger btn-sm mx-3"
                                    onClick={() => deleteProduct(product._id)}>
                                Delete product
                            </button>
                            <button className="btn btn-warning btn-sm mx-3"
                                    onClick={() => editProduct(product)}>
                                Edit product
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            {modalIsOpen &&<EditProduct product={productToEdit} showModal={setModalIsOpen} updatedDb={getProducts}/>}
        </>
    )
}

export default Products;