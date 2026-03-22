function EditTitle({ draft, handleDraftString }) {
  return (
    <section className="flex flex-col gap-3">
      <label className="font-lora text-lg font-medium text-secondary tracking-wide">
        Title
      </label>
      <div className="rounded-xl border border-crust bg-mantle/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2 w-full">
            <input
              name="editTitle"
              id="editTitle"
              type="text"
              value={draft?.title || ""}
              className="border-b border-overlay0 px-2 pb-1"
              onChange={(event) => {
                handleDraftString("title", event.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              handleDraftString("title", "");
            }}
            className="text-xs cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}

export default EditTitle;
