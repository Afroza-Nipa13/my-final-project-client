import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../Loader";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔢 Helper function to calculate rider's earning
  const calculateEarning = (parcel) => {
    if (!parcel?.cost) return 0;

    const sameDistrict = parcel.sender_center === parcel.receiver_center;
    const percentage = sameDistrict ? 0.8 : 0.3;
    return Math.round(parcel.cost * percentage);
  };

  // 🔄 Fetch completed parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
    const res=await axiosSecure.get(`/rider/completed-parcels?email=${user?.email}`)
      return res.data;
    },
  });



// 💸 Mutation to cash out
 const { mutateAsync: cashout } = useMutation({
        mutationFn: async (parcelId) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["completedDeliveries"]);
        },
    });



 const handleCashout=(parcelId)=>{
  //  🔐 Show confirmation prompt before calling API
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cash out this completed delivery?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a', // Tailwind green-600
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cash Out!',
    }).then((result) => {
            if (result.isConfirmed) {
                cashout(parcelId)
                    .then(() => {
                        Swal.fire("Success", "Cashout completed.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to cash out. Try again.", "error");
                    });
            }
        });

    }   



// const cashoutMutation = useMutation({
//   mutationFn: async (parcelId) => {
//     // 🔐 Show confirmation prompt before calling API
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "Do you want to cash out this completed delivery?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#16a34a', // Tailwind green-600
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Cash Out!',
//     });

//     // If cancelled, abort the mutation
//     if (!result.isConfirmed) {
//       throw new Error("Cashout cancelled by user.");
//     }

//     const res = await axiosSecure.patch(`/parcels/${parcelId}/cash-out`, {
//       status: "cashed_out",
//     });
//     return res.data;
//   },
//   onSuccess: () => {
//     Swal.fire({
//       icon: "success",
//       title: "Cashout Successful!",
//       text: "You have successfully cashed out this delivery.",
//       confirmButtonColor: "#16a34a",
//     });
//     queryClient.invalidateQueries(["completedParcels", user?.email]);
//   },
//   onError: (error) => {
//     if (error.message === "Cashout cancelled by user.") {
//       return; // User cancelled, no need to show error
//     }
//     Swal.fire({
//       icon: "error",
//       title: "Cashout Failed",
//       text: "Something went wrong. Please try again.",
//     });
//   },
// });

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Pickup Time</th>
              <th>Delivery Time</th>
              <th>Cost</th>
              <th>Earned</th>
              <th>Status</th>
              <th>Cashout</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              const earning = calculateEarning(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.pickup_time ? format(new Date(parcel.pickup_time), "PPP p") : "N/A"}</td>
                  <td>{parcel.delivery_time ? format(new Date(parcel.delivery_time), "PPP p") : "N/A"}</td>
                  <td>৳{parcel.cost}</td>
                  <td className="font-bold text-green-600">৳{earning}</td>
                  <td>
                    <span className="badge badge-success capitalize">
                      {parcel.delivery_status?.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td>
                                        {parcel.cashout_status === "cashed_out" ? (
                                            <span className="badge badge-success text-xs px-2 py-1 whitespace-nowrap">
                                                Cashed Out
                                            </span>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleCashout(parcel._id)}
                                            >
                                                Cashout
                                            </button>
                                        )}
                                    </td>
                </tr>
              );
            })}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-4">
                  No completed deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;

