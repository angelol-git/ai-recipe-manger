function ChatTags() {
  return (
    <div className="flex gap-2">
      <button
        className="bg-test1 inline-flex gap-2 items-center px-2 py-0.5 text-sm
  text-[#5C5046] border border-mantle rounded-full cursor-pointer"
      >
        <div className="w-4 h-4 bg-peach rounded-full"></div>
        Baking
      </button>

      <button
        className="inline-flex justify-center items-center px-2 py-0.5 text-sm
    text-gray-500 border border-gray-300 rounded-full
    cursor-pointer hover:bg-gray-100 hover:text-gray-700
    transition-colors"
      >
        +
      </button>
    </div>
  );
}

export default ChatTags;
