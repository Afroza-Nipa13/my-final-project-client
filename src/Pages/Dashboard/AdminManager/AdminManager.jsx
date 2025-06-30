import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const searchUsers = async (axiosSecure, email) => {
    const res = await axiosSecure.get(`/users/search?email=${email}`);
    return res.data;
};

const AdminManager = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [searchText, setSearchText] = useState('');
    const [emailQuery, setEmailQuery] = useState('');

    const {
        data: users = [],
        isFetching,
        isFetched,
    } = useQuery({
        queryKey: ['users', emailQuery],
        queryFn: () => searchUsers(axiosSecure, emailQuery),
        enabled: !!emailQuery, // only run when emailQuery is set
    });
 console.log(users)
    const { mutate: toggleAdmin } = useMutation({
        mutationFn: async ({ email, isAdmin }) => {
            return await axiosSecure.put(`/users/admin/${email}`, { isAdmin });
        },
        onSuccess:async (_, variables) => {
            const { email, isAdmin } = variables;
          await  queryClient.invalidateQueries(['users', emailQuery]);
            Swal.fire({
                icon: 'success',
                title: isAdmin ? '🎉 Admin Access Given' : '🗑️ Admin Access Removed',
                text: `${email} is now ${isAdmin ? 'an Admin' : 'a regular user'}.`,
                timer: 2000,
                showConfirmButton: false,
            });
           
        },
        onError: (error) => {
            console.error("Admin status update failed", error);
            Swal.fire({
                icon: 'error',
                title: '❌ Failed to Update Admin Status',
                text: error?.response?.data?.message || 'Something went wrong.',
            });
        },
    });


    const handleSearch = async () => {
        if (!searchText.trim()) return;
        setEmailQuery(searchText.trim());

        if (emailQuery === "") {
            Swal.fire({
                icon: "warning",
                title: "Please enter an email to search",
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">🔍 Admin Control Panel</h2>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by email"
                    className="input input-bordered w-full"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>

            {isFetching && <p className="text-gray-500">Searching...</p>}

            {!isFetching && isFetched && users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Created Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt || user.created_date).toLocaleString()}</td>
                                    <td>{user.role === "admin" ? '✅ Admin' : '❌ Regular'}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${user.role === "admin" ? 'btn-error' : 'btn-success'}`}
                                            onClick={() =>
                                                toggleAdmin({ email: user.email, isAdmin: user.role !== "admin" })
                                            }
                                        >
                                            {user.role === "admin" ? 'Remove Admin' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isFetching && isFetched && users.length === 0 && (
                <p className="text-gray-400">No users found.</p>
            )}
        </div>
    );
};

export default AdminManager;
