export const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-auto h-8 ${className}`}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 45C20 45 10 30 10 20C10 8.9543 18.9543 0 30 0C41.0457 0 50 8.9543 50 20C50 30 40 45 40 45C40 45 35 60 30 60C25 60 20 45 20 45Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M30 45C30 45 25 55 30 60C35 55 30 45 30 45Z"
      fill="#D4AF37"
    />
    <path
      d="M25 20C25 17.2386 27.2386 15 30 15C32.7614 15 35 17.2386 35 20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <text
      x="65"
      y="38"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="32"
      fill="#D4AF37"
      letterSpacing="-0.5"
    >
      Aroma<tspan fill="#1A1A2E" className="dark:fill-white">Verse</tspan>
    </text>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="30"
        y1="0"
        x2="30"
        y2="60"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
);
