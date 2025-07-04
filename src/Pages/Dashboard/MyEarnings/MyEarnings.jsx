import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  FaMoneyBillWave,
  FaWallet,
  FaHourglassHalf
} from 'react-icons/fa';
import {  isAfter, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../Loader';

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email =user?.email;

  const { data: completedParcels = [], isLoading } = useQuery({
    queryKey: ['myEarnings', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <Loader></Loader>;

  // আজকের, সপ্তাহের, মাসের, বছরের জন্য ফিল্টার
//   const today = new Date();
//   const startOfWeek = new Date(today);
//   startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
//   const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//   const startOfYear = new Date(today.getFullYear(), 0, 1);

//   let totalEarnings = 0;
//   let totalCashedOut = 0;
//   let totalPending = 0;
//   let earningsToday = 0;
//   let earningsThisWeek = 0;
//   let earningsThisMonth = 0;
//   let earningsThisYear = 0;

//   completedParcels.forEach(parcel => {
//     const fee = parseFloat(parcel.delivery_fee || 0);
//     const isSameDistrict = parcel.sender_center === parcel.receiver_center;
//     const earning = isSameDistrict ? fee * 0.8 : fee * 0.3;

//     const deliveredAt = new Date(parcel.deliveredAt || parcel.updatedAt || parcel.creation_date);

//     totalEarnings += earning;

//     if (parcel.rider_cashed_out) {
//       totalCashedOut += earning;
//     } else {
//       totalPending += earning;
//     }

//     if (format(deliveredAt, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
//       earningsToday += earning;
//     }

//     if (deliveredAt >= startOfWeek) {
//       earningsThisWeek += earning;
//     }

//     if (deliveredAt >= startOfMonth) {
//       earningsThisMonth += earning;
//     }

//     if (deliveredAt >= startOfYear) {
//       earningsThisYear += earning;
//     }
//   });

     const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        return parcel.sender_center === parcel.receiver_center ? cost * 0.8 : cost * 0.3;
    };


     // Filtered earnings
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const yearStart = startOfYear(now);

    let total = 0,
        totalCashedOut = 0,
        totalPending = 0,
        today = 0,
        week = 0,
        month = 0,
        year = 0;


   completedParcels.forEach((p) => {
        const earning = calculateEarning(p);
        const deliveredAt = new Date(p.delivered_at);
        total += earning;
        if (p.cashout_status === "cashed_out") totalCashedOut += earning;
        else totalPending += earning;

        if (isAfter(deliveredAt, todayStart)) today += earning;
        if (isAfter(deliveredAt, weekStart)) week += earning;
        if (isAfter(deliveredAt, monthStart)) month += earning;
        if (isAfter(deliveredAt, yearStart)) year += earning;
    });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">📊 My Earnings Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
            <FaMoneyBillWave /> Total Earnings
          </h3>
          <p className="text-2xl font-bold text-green-700">৳ {total.toFixed(2)}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
            <FaWallet /> Cashed Out
          </h3>
          <p className="text-2xl font-bold text-blue-700">৳ {totalCashedOut.toFixed(2)}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-600">
            <FaHourglassHalf /> Pending
          </h3>
          <p className="text-2xl font-bold text-yellow-700">৳ {totalPending.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <h3 className="text-xl font-bold mb-4">📈 Earnings Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold">৳ {today.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-lg font-semibold">৳ {week.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-lg font-semibold">৳ {month.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-500">This Year</p>
            <p className="text-lg font-semibold">৳ {year.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
