import React, { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "/logo-official.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Analyse pixel par pixel
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calcul de la saturation de la couleur
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        
        // Si le pixel est peu saturé (gris du damier ou blanc) et assez clair
        if (saturation < 0.20 || (r > 210 && g > 210 && b > 210)) {
          data[i + 3] = 0; // On efface le damier
        } else if (saturation < 0.35) {
           // Transition douce (anti-aliasing) sur les contours du damier
           data[i + 3] = Math.floor(255 * ((saturation - 0.20) / 0.15));
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setSrc(canvas.toDataURL());
    };
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative h-16 md:h-24 flex items-center justify-center pl-2 group">
        <div className="absolute inset-0 bg-gold/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        {/* L'image traitée sans damier et redimensionnée proprement */}
        {src ? (
          <img
            src={src}
            alt="NEXUS"
            className="h-full w-auto object-contain transition-all duration-700 hover:scale-110 drop-shadow-[0_0_15px_rgba(184,142,45,0.3)]"
          />
        ) : (
          <div className="w-16 h-16 bg-emerald-50 rounded-full animate-pulse border border-gold/10 flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;

