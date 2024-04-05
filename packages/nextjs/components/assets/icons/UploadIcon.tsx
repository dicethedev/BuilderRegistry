const UploadIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.625" y="0.625" width="38.75" height="38.75" rx="19.375" stroke="#DED1EC" stroke-width="1.25" />
      <path
        d="M13.3337 25.8333H26.667V20H28.3337V26.6667C28.3337 27.1269 27.9606 27.5 27.5003 27.5H12.5003C12.0401 27.5 11.667 27.1269 11.667 26.6667V20H13.3337V25.8333ZM20.8337 17.5V23.3333H19.167V17.5H15.0003L20.0003 12.5L25.0003 17.5H20.8337Z"
        fill="#CFCAD4"
      />
    </svg>
  );
};

export default UploadIcon;
