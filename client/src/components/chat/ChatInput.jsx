import { useRef, useEffect, useState } from "react";
import UpArrowSvg from "../icons/UpArrowSvg";
import LeftArrowSvg from "../icons/LeftArrowSvg";
import RightArrowSvg from "../icons/RightArrowSvg";
import SpinnerSvg from "../icons/SpinnerSvg";
import DownArrowSvg from "../icons/DownArrowSvg";

function ChatInput({
  message,
  setMessage,
  sendMessage,
  isReplyLoading,
  recipeVersions,
  currentVersion,
  setCurrentVersion,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandedRef = useRef();
  const textAreaRef = useRef();
  const maxHeight = 160;

  useEffect(() => {
    if (!isExpanded) return;

    function handleClickOutside(e) {
      if (isExpandedRef.current && !isExpandedRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style = "auto";
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [message, maxHeight]);

  function handleNextVersion(event) {
    event.stopPropagation();
    if (recipeVersions?.length > currentVersion + 1) {
      setCurrentVersion((prev) => prev + 1);
    }
  }

  function handlePrevVersion(event) {
    event.stopPropagation();
    if (currentVersion > 0) {
      setCurrentVersion((prev) => prev - 1);
    }
  }

  return (
    <div
      ref={isExpandedRef}
      onClick={() => {
        setIsExpanded(true);
      }}
      className="flex-col px-3 py-1 border rounded-2xl border-gray-300"
    >
      <div
        className={`flex gap-3 items-center w-full max-h-40 ${
          message.length > 0 ? "items-start" : "items-center"
        }`}
      >
        {!isExpanded && recipeVersions?.length > 0 && message.length === 0 && (
          <div className="flex gap-3">
            <button
              onClick={handlePrevVersion}
              className={`cursor-pointer ${
                currentVersion === 0 ? "gray-300" : "black"
              }`}
            >
              <LeftArrowSvg currentVersion={currentVersion} />
            </button>
            <button onClick={handleNextVersion} className="cursor-pointer">
              <RightArrowSvg
                currentVersion={currentVersion}
                max={recipeVersions.length - 1}
              />
            </button>
          </div>
        )}

        <textarea
          ref={textAreaRef}
          className={`flex-1 h-4 outline-none `}
          style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
          value={message}
          // onFocus={() => setIsExpanded(true)}
          // onBlur={() => setIsExpanded(false)}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter any recipe"
        />

        <button
          className="cursor-pointer flex items-center justify-center w-10 h-10 p-0 text-white bg-accent hover:bg-accent-dark rounded-full shrink-0"
          onClick={sendMessage}
        >
          {isReplyLoading ? <SpinnerSvg /> : <UpArrowSvg />}
        </button>
      </div>
      {(message.length > 0 || isExpanded) && (
        <div className="flex gap-2">
          <div className="flex gap-3">
            <button
              onClick={handlePrevVersion}
              className={`cursor-pointer ${
                currentVersion === 0 ? "gray-300" : "black"
              }`}
            >
              <LeftArrowSvg currentVersion={currentVersion} />
            </button>
            <button onClick={handleNextVersion} className="cursor-pointer">
              <RightArrowSvg
                currentVersion={currentVersion}
                max={recipeVersions?.length - 1}
              />
            </button>
          </div>
          <div className="ml-2 border-green bg-green text-white w-min px-2 border-1 rounded-xl text-s flex items-center gap-1">
            <div>Create</div>
            <DownArrowSvg />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInput;
