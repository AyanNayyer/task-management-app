import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskAPI from '../api/tasks';

export function useTasks(status) {
  const queryClient = useQueryClient();

  const { data: tasks, ...rest } = useQuery({
    queryKey: ['tasks', status],
    queryFn: () => taskAPI.fetchTasks(status),
  });

  const add = useMutation({
    mutationFn: taskAPI.addTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', status] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => taskAPI.updateTask(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', status] }),
  });

  const remove = useMutation({
    mutationFn: taskAPI.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', status] }),
  });

  return { tasks, add, update, remove, ...rest };
}
