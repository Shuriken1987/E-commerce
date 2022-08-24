import Modal from 'react-modal';
import {useEffect, useState} from "react";
import customStyles from "./customStyle";
import ShopService from "../../services/shopService";


function EditProduct({product, showModal, updatedDb}) {
    const [productToEdit, setProductToEdit] = useState({});
    const [fileName, setFileName] = useState("");
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    useEffect(() => {
        setProductToEdit(product);
    }, []);

    const onHandleInput = (e) => {
        setProductToEdit({...productToEdit, [e.target.name]: e.target.value});
    };

    const onChangeFile = (e)=>{
        console.log(e.target.files[0])
        // console.log(e.target.files[0])
        // setFileName(e.target.files[0]);
        setProductToEdit({...productToEdit, [e.target.name]: e.target.files[0].name});
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("product", JSON.stringify(productToEdit));
        // formData.append("productImg", fileName);

        if (!productToEdit.title || !productToEdit.productImg || !productToEdit.description || !productToEdit.price  ) {
            setIsValidForm(false);
            return
        }
        setIsValidForm(true);
        ShopService.updateProduct(productToEdit)
            .then(res => {
                if (res.status === 200) {
                    updatedDb();
                    setIsApiErr(false);
                    setIsApiFinish(true);
                    setTimeout(() => showModal(false), 1500);
                }
            })
            .catch(err => {
                setIsApiErr(true);
                console.log(err)
            })
    };

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    };

    return <div>
        <Modal isOpen={true} ariaHideApp={false} style={customStyles} aria-labelledby='contained-modal-title-vcenter'
               centered>
            {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
            {isApiFinish ? <p className="notification text-success">Successfuly updated!</p> : null}
            {isApiErr ? <p className="notification text-warning">ERROR:Ooops, something went wrong, please try
                later!</p> : null}

            <form onSubmit={onSubmitForm} method="post" encType="multipart/form-data">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        <label className="label" htmlFor="title">Product</label>
                        <input className="form-control" name="title" type="text" id="title"
                               value={productToEdit.title || ''}
                               onChange={onHandleInput}
                        />
                        <label className="label" htmlFor="productImg">Product image</label>
                        <input className="form-control" name="productImg" type="file" id="productImg"
                               onChange={onChangeFile}
                        />
                        <label className="label" htmlFor="price">Price</label>
                        <input className="form-control" name="price" type="text" id="price"
                               value={productToEdit.price || ''}
                               onChange={onHandleInput}
                        />
                        <label className="label" htmlFor="rating">Rating</label>
                        <input className="form-control" name="rating" type="text" id="rating"
                               value={productToEdit.rating || ''}
                               onChange={onHandleInput}
                        />
                        <label className="label" htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" type="text" id="description"
                               value={productToEdit.description || ''}
                               onChange={onHandleInput}
                        />
                    </div>
                    <div className="footer d-flex justify-content-center my-3">
                        <button className="btn btn-outline-primary mx-2 save">Save</button>
                        <button className="btn btn-outline-primary mx-2" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </form>
        </Modal>
    </div>
}

export default EditProduct;