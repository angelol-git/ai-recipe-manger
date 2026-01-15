function EditIngredients({
  recipeVersion,
  ingredients,
  editDraftVersionArray,
  deleteDraftArray,
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-medium font-lora text-secondary">Ingredients</h3>
      <ul className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center gap-2 bg-mantle/70 border border-crust rounded-xl px-3 py-2 transition-all hover:shadow-sm"
          >
            <textarea
              className="w-full  bg-transparent resize-none overflow-hidden outline-none text-primary text-sm leading-relaxed"
              value={ingredient}
              rows={1}
              onChange={(event) => {
                const el = event.target;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
                editDraftVersionArray(
                  recipeVersion,
                  "ingredients",
                  event.target.value,
                  index
                );
              }}
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
            />

            <button
              type="button"
              onClick={() => {
                deleteDraftArray(recipeVersion, "ingredients", index);
              }}
            >
              <X size={14} color={"#8C7A68"} strokeWidth={1.5} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EditIngredients;
