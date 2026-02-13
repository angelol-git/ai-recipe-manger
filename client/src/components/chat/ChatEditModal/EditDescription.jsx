function EditDescription({ draft, handleDraftString }) {
  return (
    <section className="flex flex-col gap-2">
      <label className="font-lora font-medium text-secondary tracking-wide">
        Description
      </label>
      <div className="bg-mantle/50 border border-crust rounded-xl p-4">
        <div className="flex flex-col gap-2 w-full">
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
              className="text-xs"
              type="button"
              onClick={() => {
                handleDraftString("description", "");
              }}
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
