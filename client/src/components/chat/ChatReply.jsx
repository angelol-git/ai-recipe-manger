import UtensilsSvg from "../icons/UtensilsSvg";
import FireSvg from "../icons/FireSvg";
import ClockSvg from "../icons/ClockSvg";

function ChatReply({
  version,
  isReplyLoading,
  setIsModalOpen,
  currentVersion,
  totalVersion,
}) {
  if (!version) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <FireSvg />
          <div>{version.calories}</div>
          kcal
        </div>
        <div className="flex gap-1 items-center">
          <ClockSvg />
          <div>{version.total_time}</div>
          mins
        </div>
        <div className="flex gap-1 items-center">
          <UtensilsSvg />
          <div>{version.servings}</div>
          servings
        </div>
      </div>
      <div>{version.description}</div>
      {version.ingredients && (
        <div>
          <h3 className="font-bold">Ingredients</h3>
          <ul className="list-disc pl-4">
            {version.ingredients.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {version.instructions && (
        <div>
          <h3 className="font-bold">Instructions</h3>
          <ul className="list-disc">
            {version.instructions.split("\n").map((item, index) => (
              <li key={index} className="list-none">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {version.source_prompt && !isReplyLoading && (
        <div className="flex justify-between text-text-secondary/80 text-sm">
          <button onClick={() => setIsModalOpen(true)} className="underline">
            View prompt
          </button>
          <p className="text-text-secondary/80">
            {currentVersion + 1} of {totalVersion}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatReply;
