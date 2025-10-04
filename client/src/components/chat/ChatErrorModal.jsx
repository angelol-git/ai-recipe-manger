import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseSvg from "../icons/CloseSvg";
import ErrorSvg from "../icons/ErrorSvg";
import WarningSvg from "../icons/WarningSvg";
function ChatErrorModal({ isErrorModalOpen, setIsErrorModalOpen, errors }) {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsErrorModalOpen(false);
      }
    }
    if (isErrorModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isErrorModalOpen, setIsErrorModalOpen]);

  //   if (errors?.length > 0) {
  //     console.log(JSON.parse(errors?.[0].content));
  //     console.log(JSON.parse(errors?.[0].content).source_prompt);
  //   }
  //   console.log(JSON.parse(errors));
  if (!isErrorModalOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/30 flex justify-center  z-50 p-4 w-full ">
      <div
        ref={modalRef}
        className="p-4 flex my-20 flex-col bg-crust rounded shadow-lg w-full overflow-y-auto"
      >
        <div className="flex justify-end">
          <button onClick={() => setIsErrorModalOpen(false)}>
            <CloseSvg />
          </button>
        </div>
        <h2 className="font-bold pb-2">Errors</h2>
        <ul className="">
          {errors?.length > 0
            ? errors.map((element) => {
                const content = JSON.parse(element.content);
                console.log(content);

                return (
                  <li
                    className="bg-rose-100 p-2 flex gap-2 rounded-lg"
                    key={element.id}
                  >
                    <WarningSvg />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-rose-900 text-large">
                        {content.error}
                      </h3>
                      <p className="text-rose-900">{content.errorMessage}</p>
                      <p className="text-gray-400 text-sm italic">
                        Input: {content.source_prompt}
                      </p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>,
    document.body // Render outside the main app DOM
  );
}

export default ChatErrorModal;
