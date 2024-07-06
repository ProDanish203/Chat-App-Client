import { Mic, Paperclip, Send } from "lucide-react";

export const SendChat = () => {
  return (
    <div className="mt-3 flex items-center gap-x-2 h-[8vh]">
      {/* Input */}
      <div className="w-[87%] bg-white py-3 px-5 rounded-2xl shadow-md h-full flex items-center">
        <div className="flex items-center gap-x-3 w-full">
          <label htmlFor="file" className="text-secondaryCol">
            <Paperclip className="size-5" />
          </label>
          <input type="file" className="hidden" id="file" />
          <input
            type="text"
            placeholder="Type a message"
            className="text-sm w-full h-full bg-transparent outline-none text-text border-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className=" flex items-center gap-x-2 h-full max-md:pr-2">
        <button
          type="button"
          className="center w-full h-full bg-white py-3 px-5 rounded-2xl shadow-md cursor-pointer text-text
        
        relative z-0 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-white hover:after:bg-gray-300 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500
        "
        >
          <Mic />
        </button>
        <button
          type="submit"
          className="center w-full h-full bg-primaryCol text-textDark py-3 px-5 rounded-2xl shadow-md cursor-pointer"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
