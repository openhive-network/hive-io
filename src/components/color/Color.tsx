import React from 'react';

interface ColorType {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
}

interface ColorProps {
  color?: ColorType;
}

export const Color: React.FC<ColorProps> = ({
  color = { name: '', hex: '', rgb: '', cmyk: '' }
}) => {
  return (
    <div className="flex flex-row items-center justify-center m-3">
      <div
        className="w-[75px] h-[75px] rounded-full mr-3"
        style={{ backgroundColor: color.hex }}
      />
      <div className="flex flex-col text-left text-[13px]">
        <div className="font-bold mb-1 text-[15px]">{color.name}</div>
        <div className="mb-0.5">
          <div className="inline-block w-[55px] font-bold">HEX:</div>
          {color.hex}
        </div>
        <div className="mb-0.5">
          <div className="inline-block w-[55px] font-bold">RGB:</div>
          {color.rgb}
        </div>
        <div className="mb-0.5">
          <div className="inline-block w-[55px] font-bold">CMYK:</div>
          {color.cmyk}
        </div>
      </div>
    </div>
  );
};
