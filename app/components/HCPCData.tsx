import React from 'react';
import type { lcdDataType } from 'types';
import { formatHcpcsModifiers, getHcpcsDescription } from 'utils/formatters';

function HCPCData({ name, link, hcpcsModifiers }: lcdDataType) {
  const formattedHcpcsModifiers = formatHcpcsModifiers(hcpcsModifiers);

  return (
    <div className="py-10">
      <div className="">
        <h1 className="text-4xl tracking-tight font-bold">
          <a
            target="_blank"
            rel="noreferrer"
            href={link}
            className="text-blue-500 hover:text-blue-600"
          >
            {name}
          </a>
        </h1>
        <hr />
      </div>
      <div className="my-10">
        <h2 className="text-2xl tracking-tight font-bold">HCPCS Modifiers</h2>
        <ul className="list-disc list-inside ml-2 flex flex-col gap-1">
          {formattedHcpcsModifiers.map((hcpc, index) => (
            <li key={index}>{`${hcpc}  -  ${getHcpcsDescription(hcpc)}`}</li>
          ))}
        </ul>
      </div>

      <div className="my-10">
        <h2 className="text-2xl tracking-tight font-bold">Codes</h2>
        <ul className="list-disc list-inside ml-2 flex flex-col gap-1">
          {formattedHcpcsModifiers.map((hcpc, index) => (
            <li key={index}>{`${hcpc}  -  ${getHcpcsDescription(hcpc)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HCPCData;
