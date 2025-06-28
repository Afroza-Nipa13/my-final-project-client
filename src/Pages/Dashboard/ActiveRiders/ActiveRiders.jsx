import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../Loader';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const { isPending, data: riders = [], refetch } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });

  if (isPending) return <Loader />;

  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This rider will be deactivated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}/deactivate`);
        if (res.data.modifiedCount > 0) {
          toast.success('Rider deactivated');
          refetch();
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to deactivate');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🚴 Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.sender_region}</td>
                <td>{rider.sender_center}</td>
                <td>{rider.phone}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      <Dialog open={!!selectedRider} onClose={() => setSelectedRider(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded max-w-lg w-full shadow-xl space-y-3">
            <Dialog.Title className="text-lg font-semibold">Rider Details</Dialog.Title>
            {selectedRider && (
              <>
                <p><strong>Name:</strong> {selectedRider.name}</p>
                <p><strong>Email:</strong> {selectedRider.email}</p>
                <p><strong>Phone:</strong> {selectedRider.phone}</p>
                <p><strong>Age:</strong> {selectedRider.age}</p>
                <p><strong>Region:</strong> {selectedRider.sender_region}</p>
                <p><strong>District:</strong> {selectedRider.sender_center}</p>
                <p><strong>NID:</strong> {selectedRider.nid}</p>
                <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegistration}</p>
                <p><strong>Approved At:</strong> {new Date(selectedRider.approvedAt).toLocaleString()}</p>
                <div className="flex justify-end pt-4">
                  <button className="btn btn-sm" onClick={() => setSelectedRider(null)}>Close</button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ActiveRiders;
