import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEye, FaTrashAlt, FaCreditCard } from "react-icons/fa";
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: parcels = [],refetch, isLoading } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });
    // view function
    const handleView=(id) => {
        console.log( 'view parcel', id)
    }
    // pay function
    const handlePay=(id)=>{
        console.log("pay for parcel", id)
        navigate(`/dashboard/payment/${id}`)
    }


    // delete function

     const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/parcels/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
                        // queryClient.invalidateQueries(['my-parcels']); // refetch
                        refetch()
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                }
            }
        });
    };

    if (isLoading) {
        return <span className="loading loading-spinner text-primary"></span>;
    }

    return (
         <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">📦 My Parcels: {parcels.length}</h2>

            {parcels.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-20">
                    🚫 No parcel confirmed yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200 text-base font-semibold">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Created At</th>
                                <th>Cost (৳)</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td className='max-w-[180px] truncate'>{parcel.title}</td>
                                    <td className="capitalize">{parcel.type.replace("-", " ")}</td>
                                    <td>{format(new Date(parcel.creation_date), 'PPP p')}</td>
                                    <td className="font-semibold text-right">৳{parcel.cost}</td>
                                    <td>
                                        {parcel.paymentStatus === 'paid' ? (
                                            <span className="badge badge-success gap-2">
                                                <FaCreditCard /> Paid
                                            </span>
                                        ) : (
                                            
                                                <span
                                    className={`badge ${parcel.paymentStatus === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                   <FaCreditCard />  {parcel.paymentStatus}
                                </span>
                               
                                        )}
                                    </td>
                                    <td className="flex gap-2">
                                        <button 
                                        onClick={()=>handleView(parcel._id)}
                                        className="btn btn-sm btn-info text-white tooltip" data-tip="View">
                                            <FaEye />
                                        </button>
                                        {parcel.paymentStatus === 'unpaid' && (
                                            <button
                                            onClick={()=>handlePay(parcel._id)}
                                            className="btn btn-sm btn-success text-white tooltip" data-tip="Pay">
                                                <FaCreditCard /> Pay
                                            </button>
                                        )}
                                        {console.log(parcel.paymentStatus)}
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className="btn btn-sm btn-error text-white tooltip"
                                            data-tip="Delete"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyParcels;
