import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useUserRole = () => {
  const { user, loading: authLoading } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  console.log(user)

  const { data: role, isLoading : roleLoading, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email && !authLoading, // only fetch if user exists and not loading
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      // console.log(res.data)
      return res.data.role;
     
    },
   
  });
  

  return { role,roleLoading:roleLoading || authLoading, refetch };
};

export default useUserRole;



// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';


// const useUserRole = () => {
//     const { user, loading: authLoading } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const {
//         data: role = 'user',
//         isLoading: roleLoading,
//         refetch,
//     } = useQuery({
//         queryKey: ['userRole', user?.email],
//         enabled: !authLoading && !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/role/${user.email}`);
//             return res.data.role;
//         }, 
//     });

//     return { role, roleLoading: authLoading || roleLoading, refetch };
// };

// export default useUserRole;

