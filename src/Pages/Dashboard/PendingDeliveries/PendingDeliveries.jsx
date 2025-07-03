import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTruckLoading, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch parcels assigned to this rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels"],
    queryFn: async () => {
        const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation to update parcel status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/parcels/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Parcel status updated!");
      queryClient.invalidateQueries(["riderParcels"]);
    },
    onError: () => {
      toast.error("⚠️ Failed to update status.");
    },
  });

  // Handle status change
  const handleStatusUpdate = async (id, currentStatus) => {
    let nextStatus;
    if (currentStatus === "rider_assigned") {
      nextStatus = "in_transit";
    } else if (currentStatus === "in_transit") {
      nextStatus = "delivered";
    } else return;

    const confirm = await Swal.fire({
      title: `Mark as ${nextStatus.replace("_", " ")}?`,
      text: "This will update the delivery status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (confirm.isConfirmed) {
      mutation.mutate({ id, status: nextStatus });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading parcels...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaTruckLoading /> Pending Deliveries
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.title}</td>
                <td>{parcel.type}</td>
                <td>
                  {parcel.sender_name}
                  <br />
                  <span className="text-xs">{parcel.sender_contact}</span>
                </td>
                <td>
                  {parcel.receiver_name}
                  <br />
                  <span className="text-xs">{parcel.receiver_contact}</span>
                </td>
                <td className="capitalize">{parcel.delivery_status}</td>
                <td>
                  {parcel.delivery_status === "rider_assigned" && (
                    <button
                      onClick={() => handleStatusUpdate(parcel._id, "rider_assigned")}
                      className="btn btn-xs btn-info mr-1"
                    >
                      Mark In-Transit
                    </button>
                  )}
                  {parcel.delivery_status === "in_transit" && (
                    <button
                      onClick={() => handleStatusUpdate(parcel._id, "in_transit")}
                      className="btn btn-xs btn-success"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No pending deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
