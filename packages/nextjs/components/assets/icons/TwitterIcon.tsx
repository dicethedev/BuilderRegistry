const TwitterIcon = ({ className, width, height }: { className?: string; width?: number; height?: number }) => {
  return (
    <svg
      width={width || "24"}
      height={height || "24"}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4286 0H4.57143C2.0467 0 0 2.0467 0 4.57143V19.4286C0 21.9533 2.0467 24 4.57143 24H19.4286C21.9533 24 24 21.9533 24 19.4286V4.57143C24 2.0467 21.9533 0 19.4286 0Z"
        fill="#0D0314"
      />
      <path
        d="M15.2184 6.52808H17.075L13.0188 11.164L17.7906 17.4725H14.0543L11.128 13.6464L7.77957 17.4725H5.92183L10.2603 12.5138L5.68274 6.52808H9.51383L12.159 10.0252L15.2184 6.52808ZM14.5667 16.3612H15.5955L8.95483 7.58098H7.85085L14.5667 16.3612Z"
        fill="white"
      />
    </svg>
  );
};

export default TwitterIcon;
