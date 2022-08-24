import {useState} from "react";
import ShopService from "../../services/shopService";
import {useNavigate} from "react-router-dom";

function AddProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("");
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);
    const navigate = useNavigate();


    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const product = {
            title: title,
            price: price,
            rating: rating,
            description: description,
            productImg: fileName["name"]
        }
        if (!product.title || !product.productImg || !product.description || !product.price) {
            setIsValidForm(false);
            return
        }
        setIsValidForm(true);
        ShopService.addProduct(product)
            .then(res => {
                if (res.status === 200) {
                    setIsApiErr(false);
                    setIsApiFinish(true);
                    navigate('/dashboard/products')
                }
            })
            .catch(err => {
                setIsApiErr(true);
            })
    }

    return (
        <form onSubmit={onSubmitForm} method="post" encType="multipart/form-data">
             {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
                {isApiFinish ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isApiErr ? <p className="notification text-warning">ERROR:Ooops, something went wrong, please try later!</p> : null}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <label className="label" htmlFor="title">Product title</label>
                    <input className="form-control" name="title" type="text" id="title"
                           onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="label" htmlFor="productImg">Product image</label>
                    <input className="form-control" filename="productImg" type="file" id="productImg"
                           onChange={onChangeFile}
                    />
                    <label className="label" htmlFor="price">Price</label>
                    <input className="form-control" name="price" type="text" id="price"
                           onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className="label" htmlFor="rating">Rating</label>
                    <input className="form-control" name="rating" type="text" id="rating"
                           onChange={(e) => setRating(e.target.value)}
                    />
                    <label className="label" htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" type="text" id="description"
                              onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="footer d-flex justify-content-center my-3">
                    <button className="btn btn-outline-primary mx-2 save">Save</button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct;