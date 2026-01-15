function EditRecipeDetails({ draft, handleDraftDetail }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-lora font-medium text-secondary tracking-wide">
        Recipe Details
      </h3>
      <div>
        <div className="bg-mantle/50 border border-crust rounded-xl p-4 flex flex-col gap-3">
          <DetailItem
            label="calories"
            value={draft?.recipeDetails.calories}
            handleDraftDetail={handleDraftDetail}
          />
          <DetailItem
            label="total time"
            value={draft?.recipeDetails.total_time}
            handleDraftDetail={handleDraftDetail}
          />
          <DetailItem
            label="servings"
            value={draft?.recipeDetails.servings}
            handleDraftDetail={handleDraftDetail}
          />
        </div>
      </div>
    </section>
  );
}

function DetailItem({ label, value, handleDraftDetail }) {
  const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={label} className="text-sm text-secondary/90 min-w-[80px]">
        {formattedLabel}
      </label>
      <input
        id={label}
        name={label}
        type="text"
        value={value || ""}
        onChange={(event) => {
          let formattedLabel = label;
          if (label === "total time") {
            formattedLabel = "total_time";
          }
          handleDraftDetail(formattedLabel, event.target.value);
        }}
        className="flex-1 bg-transparent border-b border-overlay0 text-primary text-sm focus:outline-none"
      />
    </div>
  );
}

export default EditRecipeDetails;
