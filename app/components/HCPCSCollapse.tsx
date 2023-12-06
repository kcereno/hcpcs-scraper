import React, { useState } from 'react';
import { getHcpcsDescription } from 'utils/formatters';

type Props = {
  hcpcsModifiers: string[];
};

const HCPCSCollapse = ({ hcpcsModifiers }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`collapse collapse-plus bg-base-200 max-w-7xl ${
        open ? 'collapse-open' : 'collapse-close'
      }`}
      onClick={() => setOpen(!open)}
    >
      <input
        type="radio"
        name="my-accordion-1"
      />
      <div className="collapse-title text-2xl tracking-tight font-bold">
        HCPCS
      </div>
      <div className="collapse-content">
        <div className="">
          <h2 className="text-xl tracking-tight font-bold">Modifiers</h2>
          <ul className="list-disc list-inside ml-2 flex flex-col gap-1">
            {hcpcsModifiers.map((hcpc, index) => (
              <li key={index}>{`${hcpc}  -  ${getHcpcsDescription(hcpc)}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HCPCSCollapse;
