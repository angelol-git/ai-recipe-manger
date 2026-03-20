function EditTitle({ draft, handleDraftString }) {
  return (
    <section className="flex flex-col gap-2">
      <label className="font-lora font-medium text-secondary tracking-wide">
        Title
      </label>
      <div className="bg-mantle/50 border border-crust rounded-xl p-4">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
            <input
              name="editTitle"
              id="editTitle"
              type="text"
              value={draft?.title || ""}
              className="border-b-1 border-overlay0 px-2"
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
