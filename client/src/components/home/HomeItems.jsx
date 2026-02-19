import { Link } from "react-router";
import HomeRecipeCard from "./HomeRecipeCard";

function HomeItems({ filteredRecipes, openDeleteModal }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="font-semibold">Items({filteredRecipes?.length})</div>
        <Link
          to="/chat"
          className="items-center bg-base hover:bg-base-hover text-sm cursor-pointer rounded-2xl border-black/30 border-1 px-2 py-1"
        >
          + Add
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-4 lg:gap-6">
        {filteredRecipes?.map((recipe) => {
          return (
            <HomeRecipeCard
              key={recipe.id}
              recipe={recipe}
              openDeleteModal={openDeleteModal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeItems;
