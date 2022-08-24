import {useEffect, useState} from "react";
import ShopProduct from "../../components/ShopProducts/ShopProduct";
import {useSearchParams} from "react-router-dom";
import ShopService from "../../services/shopService";
import {useDispatch} from "react-redux";
import {showLoader} from "../../redux/loaderSlice";

function Shop() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        let queryParam = query.get('search');
        queryParam && setSearchTerm(queryParam);
    }, [query]);

    // Search
    useEffect(() => {
        if (searchTerm) {
            dispatch(showLoader(true));
            setQuery({"search": searchTerm});
            searchedProducts();
            setQuery({});
        } else if (!searchTerm) {
            dispatch(showLoader(true));
            ShopService.getAllProducts()
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data);
                    }
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(showLoader(false)))
        }
    }, [searchTerm]);

    const searchedProducts = () => {
        ShopService.getSearchedAds(searchTerm)
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data);
                }
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(showLoader(false)))
    }


    return (
        <>
            {products.length ? <section className="featuredProducts container my-5">
                <article className="row">
                    {products.map((el, index) => {
                        return <ShopProduct product={el} key={index}/>
                    })}
                </article>
            </section> : <p className="text-center my-5">No products.</p>}
        </>
    );
}

export default Shop;