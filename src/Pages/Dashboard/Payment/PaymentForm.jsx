import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loader';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState("")
    const navigate= useNavigate()
    const { data: parcelInfo = {}
        , isPending, isError } = useQuery({
            queryKey: ["parcels", parcelId],
            queryFn: async () => {
                const res = await axiosSecure.get(`/parcels/${parcelId}`);
                return res.data;
            }
        })
    if (isPending) {
        return <Loader></Loader>
    }
    if (isError) {
        return "...Here is happening some error"
    }
    // console.log(parcelInfo)
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;

        }
        const card = elements.getElement(CardElement)
        if (!card) {
            return
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
        } else {
            setError('')
            console.log('payment', paymentMethod)
        }
        // step create payment intend
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })
        const clientSecret = res.data.clientSecret;
        // confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                },
            },

        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('')
            if (result.paymentIntent.status === 'succeeded') {
                const transactionId=result.paymentIntent.id
                console.log('Payment succeeded!');
                console.log(result)
                // step 4 mark parcel paid and create history
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId:transactionId ,
                    paymentMethod: result.paymentIntent.payment_method_types
                }
                const paymentRes = await axiosSecure.post('/payments', paymentData)

                if (paymentRes.data.insertedId) {
                    console.log('payment completed successfully.')
                     await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        // ✅ Redirect to /myParcels
                        navigate('/dashboard/myParcels');


                }
            }
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit}
                className='space-y-4 border max-w-md w-full mx-auto border-gray-300 p-5 bg-white text-black rounded-md'>

                <CardElement options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    }
                }} >

                </CardElement>
                <button
                    type='submit'
                    disabled={!stripe}
                    className={`w-full py-2 px-4 rounded-md text-black font-semibold transition duration-200 ${!stripe
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary text-black hover:bg-green-400"
                        }`}>Pay ${amount}</button>
                {
                    error && <p className='text-red-500 font-bold'>
                        {error}
                    </p>
                }

            </form>
        </div>
    );
};

export default PaymentForm;