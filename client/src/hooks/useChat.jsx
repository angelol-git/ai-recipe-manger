// hooks/useRecipeApi.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCreateMessage } from "../api/chat";
import { addLocalRecipe, addLocalRecipeVersion } from "../utils/storage.js";
import { useUser } from "./useUser";

export function useChat(showToast) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const recipesQueryKey = ["recipes", user?.id || "guest_recipes"];

  const sendCreateMessageMutation = useMutation({
    mutationFn: async (payload) => {
      return sendCreateMessage(payload);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: recipesQueryKey,
      });

      const previousRecipes = queryClient.getQueryData(recipesQueryKey);

      return { previousRecipes };
    },

    onError: (err, variables, context) => {
      showToast(err.error);
      if (context?.previousRecipes) {
        queryClient.setQueryData(recipesQueryKey, context.previousRecipes);
      }
    },

    onSuccess: (data, variables) => {
      const newRecipe = data.reply;
      const isNewRecipe = !variables.recipeId;

      queryClient.setQueryData(recipesQueryKey, (old) => {
        if (!old?.length) return [newRecipe];

        const existingIndex = old.findIndex(
          (recipe) => recipe.id === newRecipe.id,
        );
        if (existingIndex === -1) {
          return [...old, newRecipe];
        }

        return old.map((recipe) =>
          recipe.id === newRecipe.id ? newRecipe : recipe,
        );
      });

      if (!isNewRecipe) {
        addLocalRecipeVersion(newRecipe);
      }

      if (isNewRecipe && !user) {
        addLocalRecipe(newRecipe);
      }

      queryClient.invalidateQueries(recipesQueryKey);
    },
  });

  return {
    sendCreateMessage: sendCreateMessageMutation.mutateAsync,
    isPending: sendCreateMessageMutation.isPending,
    isSuccess: sendCreateMessageMutation.isSuccess,
  };
}
