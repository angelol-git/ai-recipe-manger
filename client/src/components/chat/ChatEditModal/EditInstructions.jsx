function EditInstructions({
  version,
  editDraftVersionArray,
  deleteDraftArray,
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-medium font-lora text-secondary">Instructions</h3>
      <ol className="list-decimal space-y-2">
        {version?.instructions.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center gap-2 bg-mantle/70 border border-crust rounded-xl px-3 py-2 transition-all hover:shadow-sm"
          >
            <div className="flex gap-2 w-full">
              <span className="font-semibold font-lora">{index + 1}. </span>
              <textarea
                className="w-full bg-transparent resize-none overflow-hidden outline-none text-primary text-sm leading-relaxed"
                value={ingredient}
                rows={1}
                onChange={(event) => {
                  const el = event.target;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                  editDraftVersionArray(
                    version.id,
                    "instructions",
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
            </div>
            <button
              type="button"
              onClick={() => {
                deleteDraftArray(version.id, "instructions", index);
              }}
            >
              <X size={14} color={"#8C7A68"} strokeWidth={1.5} />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default EditInstructions;
