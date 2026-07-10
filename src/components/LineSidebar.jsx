import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LineSidebar({
  items = [],
  accentColor = "#8B0000",
  textColor = "#a1a1aa",
  markerColor = "#8B0000",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 20,
  falloff = "smooth",
  markerLength = 40,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 0.9,
  defaultActive = 0,
  activeItemIndex,
  onItemClick
}) {
  const [active, setActive] = useState(defaultActive);
  const containerRef = useRef(null);
  const [mouseY, setMouseY] = useState(null);

  useEffect(() => {
    if (activeItemIndex !== undefined) {
      setActive(activeItemIndex);
    }
  }, [activeItemIndex]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setMouseY(null);
  };

  const handleClick = (index, label) => {
    setActive(index);
    if (onItemClick) onItemClick(index, label);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-end py-4"
      style={{ gap: itemGap }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Line */}
      <div className="absolute right-[1px] top-0 bottom-0 w-[1px] bg-zinc-300 dark:bg-zinc-800" />

      {items.map((item, i) => {
        const isActive = active === i;
        
        return (
          <SidebarItem
            key={item}
            item={item}
            index={i}
            isActive={isActive}
            mouseY={mouseY}
            onClick={() => handleClick(i, item)}
            accentColor={accentColor}
            textColor={textColor}
            showIndex={showIndex}
            showMarker={showMarker}
            markerColor={markerColor}
            markerLength={markerLength}
            proximityRadius={proximityRadius}
            maxShift={maxShift}
            tickScale={tickScale}
            scaleTick={scaleTick}
            fontSize={fontSize}
          />
        );
      })}
    </div>
  );
}

function SidebarItem({
  item,
  index,
  isActive,
  mouseY,
  onClick,
  accentColor,
  textColor,
  showIndex,
  showMarker,
  markerColor,
  markerLength,
  proximityRadius,
  maxShift,
  tickScale,
  scaleTick,
  fontSize
}) {
  const itemRef = useRef(null);
  const [distance, setDistance] = useState(Infinity);

  useEffect(() => {
    if (mouseY === null || !itemRef.current) {
      setDistance(Infinity);
      return;
    }
    const rect = itemRef.current.getBoundingClientRect();
    const parentRect = itemRef.current.parentElement.getBoundingClientRect();
    const localItemY = (rect.top - parentRect.top) + rect.height / 2;
    
    const dist = Math.abs(mouseY - localItemY);
    setDistance(dist);
  }, [mouseY]);

  let shift = 0;
  if (distance < proximityRadius) {
    const factor = 1 - distance / proximityRadius;
    shift = Math.pow(factor, 2) * maxShift;
  }

  return (
    <motion.button
      ref={itemRef}
      onClick={onClick}
      className="relative flex items-center justify-end group transition-colors duration-200 hover:text-zinc-900 dark:hover:text-white"
      style={{ paddingRight: 24, minHeight: 24 }}
      animate={{ x: -shift }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div 
        className="flex items-center gap-3 font-medium transition-colors duration-200"
        style={{ 
          fontSize: `${fontSize}rem`,
          color: isActive ? accentColor : 'currentColor',
          opacity: isActive ? 1 : 0.6
        }}
      >
        <span className="whitespace-nowrap drop-shadow-sm">{item}</span>
        {showIndex && (
          <span className="text-[0.65em] tracking-widest opacity-40 font-mono">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        )}
      </div>

      {/* The Tick */}
      <motion.div 
        className="absolute right-0 h-[1px] bg-current origin-right"
        style={{ 
          color: isActive ? accentColor : 'currentColor',
          opacity: isActive ? 1 : 0.3,
          width: isActive ? 16 : 8
        }}
        animate={{
          scaleX: isActive ? 1 : (scaleTick ? tickScale : 1)
        }}
      />

      {/* Active Marker */}
      {isActive && showMarker && (
        <motion.div
          layoutId="line-sidebar-marker"
          className="absolute right-[0.5px] top-1/2 -translate-y-1/2 w-[2px] rounded-full z-10"
          style={{ height: markerLength, backgroundColor: markerColor }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
