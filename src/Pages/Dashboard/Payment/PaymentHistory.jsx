import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Loader';

const PaymentHistory = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const {isPending, data:payments =[]}= useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })
    if(isPending){
        return <Loader></Loader>
    }
    return (
         <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Payment History</h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 p-10 border border-dashed rounded-lg">
          😔 No payment history found.
        </div>
      ) : (
        <table className="table table-zebra w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="text-sm break-all">{payment.transactionId}</td>
                <td>${payment.amount}</td>
                <td>
                  <span className="badge badge-success text-white">{payment.status}</span>
                </td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    );
};

export default PaymentHistory;