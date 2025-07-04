interface SellerAvatarProps {
  avatarUrl?: string;
}

const SellerAvatar = ({ avatarUrl }: SellerAvatarProps) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Seller Avatar" className="w-full h-full object-cover" />
      ) : (
        <svg
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default SellerAvatar;
