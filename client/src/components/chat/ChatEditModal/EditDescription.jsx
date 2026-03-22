function EditDescription({ draft, handleDraftString }) {
  return (
    <section className="flex flex-col gap-3">
      <label className="font-lora text-lg font-medium text-secondary tracking-wide">
        Description
      </label>
      <div className="rounded-xl border border-crust bg-mantle/50 p-4">
        <div className="flex w-full flex-col gap-3">
          <textarea
            id="description"
            name="description"
            rows={5}
            value={draft?.description}
            onChange={(event) => {
              handleDraftString("description", event.target.value);
            }}
            className="text-primary border-b border-secondary/20"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                handleDraftString("description", "");
              }}
              className="text-xs cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditDescription;
