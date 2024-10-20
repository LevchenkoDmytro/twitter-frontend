import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFollow } from '../api/user';

const useFollow = () => {

  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: fetchFollow,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
        queryClient.invalidateQueries({ queryKey: ['authUser'] })
      ])
    },
    onError: (error) => toast.error(error.response.data.error),
  });

  return { follow, isPending }
}

export default useFollow;