interface MessageProps {
  message?: string;
  isCurrentUser?: boolean;
  userImage?: string;
  sentTime?: string;
  hasRead?: boolean;
  hasDelivered?: boolean;
}

const Message = ({ message }: MessageProps) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export const Conversation = () => {
  return (
    <div className="mt-3 h-[75vh] overflow-y-auto flex items-center justify-between gap-x-3 w-full bg-white py-3 px-5 rounded-2xl shadow-md">
      <div></div>
    </div>
  );
};
