import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ShopService from "../../../services/shopService";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StepperFooter from "./StepperFooter";

const stripePromise = loadStripe('pk_test_51LUxn6HWjRap35ChbrZvS3JhVc8iKe3zMRKCGzv1tlHx5bBNtBgMGPPPnq7FdFGr1nH1zX58iiydSFWsB6X5P0gf00Ls3fKhRh')

function OrderProcessStepTree({ sk }) {
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async () => {
        if (!stripe || !elements || !sk)
            return;

        const paymentResponse = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: "http://localhost:3000/order",
                return_url: "https://food-florist-hbg.netlify.app/order",
            },
        });
    }

    return (
        <>
            {stripe && <div>
                <PaymentElement />
                <StepperFooter submitPayment={submitPayment} />
            </div>}
        </>
    )
}

function StripeElements() {
    const [sk, setSk] = useState('');
    const { cart } = useSelector(state => state.shopCartStore);
    const options = {
        clientSecret: sk
    };

    useEffect(() => {
        let sumPrice = cart.reduce((state, item) => {
            return state + item.totalPrice;
        }, 0)

        ShopService.initPayment({ amount: sumPrice})
            .then(response => {
                setSk(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {sk && <Elements stripe={stripePromise} options={options}>
                <OrderProcessStepTree sk={sk} />
            </Elements>}
        </>
    )
}

export default StripeElements;
