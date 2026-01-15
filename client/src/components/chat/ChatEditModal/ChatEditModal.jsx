import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDraftRecipe } from "../../../hooks/useDraftRecipe";
import EditTitle from "./EditTitle";
import EditTags from "./EditTags";
import EditRecipeDetails from "./EditRecipeDetails";
import EditDescription from "./EditDescription";

function ChatEditModal({
  recipe,
  recipeVersion,
  isEditModalOpen,
  setIsEditModalOpen,
}) {
  const tagRefs = useRef({});
  const modalRef = useRef(null);
  const {
    draft,
    handleDraftString,
    handleDraftDetail,
    handleDraftTagName,
    handleDraftTagColor,
    handleDraftTagDelete,
  } = useDraftRecipe({
    recipe,
    recipeVersion,
    isEditModalOpen,
  });

  function handleSave(event) {
    event.preventDefault();
    setIsEditModalOpen(false);
    // updateRecipe(draft, currentVersion);
  }

  if (!isEditModalOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/30 flex  z-50 w-full">
      <div
        ref={modalRef}
        className="px-4 pt-6 pb-10 flex flex-col mt-10  h-full bg-base rounded shadow-lg w-full"
      >
        <div className="flex justify-between items-start">
          <button onClick={() => setIsEditModalOpen(false)} className="">
            Cancel
          </button>
          <h2 className="font-bold pb-2">Edit Recipe</h2>
          <button onClick={handleSave}>Save</button>
        </div>
        <form className="flex flex-col gap-5 py-5 overflow-y-auto">
          <EditTitle draft={draft} handleDraftString={handleDraftString} />
          <EditTags
            draft={draft}
            handleDraftTagName={handleDraftTagName}
            handleDraftTagColor={handleDraftTagColor}
            handleDraftTagDelete={handleDraftTagDelete}
            tagRefs={tagRefs}
          />
          <EditRecipeDetails
            draft={draft}
            handleDraftDetail={handleDraftDetail}
          />
          <EditDescription
            draft={draft}
            handleDraftString={handleDraftString}
          />
          {/* <section className="flex flex-col gap-2">
            <h3 className="font-medium font-lora text-secondary">
              Ingredients
            </h3>
            <Ingredients
              draft={draft}
              currentVersion={currentVersion}
              editDraftVersionArray={editDraftVersionArray}
              deleteDraftArray={deleteDraftArray}
            />
          </section>
          <section className="flex flex-col gap-2">
            <h3 className="font-medium font-lora text-secondary">
              Instructions
            </h3>
            <Instructions
              draft={draft}
              currentVersion={currentVersion}
              editDraftVersionArray={editDraftVersionArray}
              deleteDraftArray={deleteDraftArray}
            />
          </section> */}
        </form>
      </div>
    </div>,
    document.body // Render outside the main app DOM
  );
}

// function Ingredients({
//   draft,
//   currentVersion,
//   editDraftVersionArray,
//   deleteDraftArray,
// }) {
//   const version = draft?.versions[currentVersion];
//   return (
//     <ul className="flex flex-col gap-2">
//       {version?.ingredients.map((ingredient, index) => (
//         <li
//           key={index}
//           className="flex items-center gap-2 bg-mantle/70 border border-crust rounded-xl px-3 py-2 transition-all hover:shadow-sm"
//         >
//           <textarea
//             className="w-full  bg-transparent resize-none overflow-hidden outline-none text-primary text-sm leading-relaxed"
//             value={ingredient}
//             rows={1}
//             onChange={(event) => {
//               const el = event.target;
//               el.style.height = "auto";
//               el.style.height = `${el.scrollHeight}px`;
//               editDraftVersionArray(
//                 version.id,
//                 "ingredients",
//                 event.target.value,
//                 index
//               );
//             }}
//             ref={(el) => {
//               if (el) {
//                 el.style.height = "auto";
//                 el.style.height = `${el.scrollHeight}px`;
//               }
//             }}
//           />

//           <button
//             type="button"
//             onClick={() => {
//               deleteDraftArray(version.id, "ingredients", index);
//             }}
//           >
//             <X size={14} color={"#8C7A68"} strokeWidth={1.5} />
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Instructions({
//   draft,
//   currentVersion,
//   editDraftVersionArray,
//   deleteDraftArray,
// }) {
//   const version = draft?.versions[currentVersion];
//   return (
//     <ol className="list-decimal space-y-2">
//       {version?.instructions.map((ingredient, index) => (
//         <li
//           key={index}
//           className="flex items-center gap-2 bg-mantle/70 border border-crust rounded-xl px-3 py-2 transition-all hover:shadow-sm"
//         >
//           <div className="flex gap-2 w-full">
//             <span className="font-semibold font-lora">{index + 1}. </span>
//             <textarea
//               className="w-full bg-transparent resize-none overflow-hidden outline-none text-primary text-sm leading-relaxed"
//               value={ingredient}
//               rows={1}
//               onChange={(event) => {
//                 const el = event.target;
//                 el.style.height = "auto";
//                 el.style.height = `${el.scrollHeight}px`;
//                 editDraftVersionArray(
//                   version.id,
//                   "instructions",
//                   event.target.value,
//                   index
//                 );
//               }}
//               ref={(el) => {
//                 if (el) {
//                   el.style.height = "auto";
//                   el.style.height = `${el.scrollHeight}px`;
//                 }
//               }}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={() => {
//               deleteDraftArray(version.id, "instructions", index);
//             }}
//           >
//             <X size={14} color={"#8C7A68"} strokeWidth={1.5} />
//           </button>
//         </li>
//       ))}
//     </ol>
//   );
// }
export default ChatEditModal;
