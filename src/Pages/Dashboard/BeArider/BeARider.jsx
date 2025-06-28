import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// import regionsData from 'warehouses.json'; // same format you used before
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

const BeARider = () => {
    const regionsData = useLoaderData()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedRegion, setSelectedRegion] = useState("");





    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();



    // Extract unique regions
    const uniqueRegions = [...new Set(regionsData.map((w) => w.region))];

    // Get districts by region
    const getDistrictsByRegion = (region) =>
        regionsData.filter((w) => w.region === region).map((w) => w.district);
    const districts = getDistrictsByRegion(selectedRegion);
    const onSubmit = async (data) => {
        const riderApplication = {
            ...data,
            name: user.displayName,
            email: user.email,
            status: 'pending',
            created_at: new Date().toISOString()
        };
       
    console.log(riderApplication)
        try {
            const res = await axiosSecure.post('/riders', riderApplication);
            
            if (res.data.insertedId) {
                console.log(res.data.insertedId)
                toast.success('Application submitted successfully!');
                reset()
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Submission failed!');
        }
        
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">🚴 Apply to Become a Rider</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name (read only) */}
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Email (read only) */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="label">Age</label>
                    <input
                        type="number"
                        {...register('age', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Enter your age"
                    />
                    {errors.age && <p className="text-red-500">Age is required</p>}
                </div>

                {/* Region and District */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="label">Region</label>
                        <select {...register("sender_region",
                            { required: true })}
                            className="select select-bordered w-full"
                            onChange={(e) => {
                                setSelectedRegion(e.target.value);
                            }}>
                            <option value="">Select Region</option>
                            {uniqueRegions.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        {errors.region && <p className="text-red-500">Region is required</p>}
                    </div>

                    <div className="flex-1">
                        <label className="label">District</label>
                        <select
                            {...register("sender_center", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                        {errors.sender_center && <p className="text-red-500">District is required</p>}
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="label">Phone Number</label>
                    <input
                        type="text"
                        {...register('phone', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500">Phone number is required</p>}
                </div>

                {/* National ID */}
                <div>
                    <label className="label">National ID Card Number</label>
                    <input
                        type="text"
                        {...register('nid', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Enter your NID number"
                    />
                    {errors.nid && <p className="text-red-500">NID number is required</p>}
                </div>

                {/* Bike Registration */}
                <div>
                    <label className="label">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register('bikeRegistration', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Enter bike registration number"
                    />
                    {errors.bikeRegistration && <p className="text-red-500">Bike registration is required</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="btn btn-primary w-full">Submit Application</button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;
