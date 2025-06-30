import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Loader from '../../Loader';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {isPending, data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    }
  });
  if(isPending){
    return <Loader></Loader>
  }
 
const handleAction=async(id,action,email)=>{
    let actionText = '';
  let confirmText = '';
 
  if (action === 'approve') {
    actionText = 'Approve';
    confirmText = 'Yes, approve it!';
  } else if (action === 'cancel') {
    actionText = 'Reject';
    confirmText = 'Yes, reject it!';
  } else {
    // For view or other actions, handle separately
    console.log("View button clicked");
    return;
  }
   const result = await Swal.fire({
    title: `Are you sure you want to ${actionText.toLowerCase()} this rider?`,
    text: "This action cannot be undone!",
    icon: action === 'approve' ? 'success' : 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'No, go back',
  });
  if (result.isConfirmed) {
    try{
       const status = action === "approve" ? "active" : "rejected"
            await axiosSecure.patch(`/riders/${id}/status`, {
                status,
                email
            });
            refetch()
        toast.success('✅ Rider approved!');
    //   } else if (action === 'cancel') {
    //     await axiosSecure.delete(`/riders/${id}`);
    //     toast.success('❌ Rider application cancelled!');
    //   }
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('⚠️ Action failed!');
    }
  }
};


  

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📋 Pending Rider Applications</h2>

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
                    onClick={() => handleAction(rider._id, 'approve',rider.email)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(rider._id, 'cancel',rider.email)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
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
                <div className="flex justify-end gap-2 pt-4">
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

export default PendingRiders;
