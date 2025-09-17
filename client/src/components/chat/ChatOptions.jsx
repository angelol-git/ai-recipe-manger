import DeleteSvg from "../icons/DeleteSvg.jsx";
import ShareSvg from "../icons/ShareSvg.jsx";
import EditSvg from "../icons/EditSvg.jsx";
function ChatOptions({ isEditing, setIsEditing, handleDelete }) {
  return (
    <div className="absolute right-0 z-100 bg-base translate-y-12 p-2 rounded-lg shadow-lg">
      <ul className="p-1 flex gap-2 flex-col w-[150px]">
        <li className="border-b-1 border-black/40 py-2">
          <button className="flex z-100 w-full justify-between items-center">
            <ShareSvg />
            <div>Share</div>
          </button>
        </li>
        <li className="border-b-1 border-black/40 py-2">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className="flex w-full justify-between items-center"
          >
            <EditSvg />
            <div>Rename</div>
          </button>
        </li>
        <li className="text-rose py-2">
          <button
            onClick={handleDelete}
            className="flex w-full justify-between items-center"
          >
            <DeleteSvg />
            <div>Delete</div>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ChatOptions;
