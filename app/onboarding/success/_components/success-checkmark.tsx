export default function SuccessCheckmark() {
  return (
    <div className="relative w-24 h-24">
      <svg
        className="absolute inset-0"
        viewBox="0 0 52 52"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-success/20"
          cx="26"
          cy="26"
          r="25"
          strokeWidth="2"
        />
        <circle
          className="text-success animate-success-circle"
          cx="26"
          cy="26"
          r="25"
          strokeWidth="2"
        />
        <path
          className="text-success animate-success-check"
          d="M14 27l8 8 16-16"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
