import React from 'react';
import type { lcdDataType } from 'types';

function HCPCData({ name, link, hcpcsModifiers }: lcdDataType) {
  console.log('HCPCData ~ link:', link);
  return (
    <div className="py-10">
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
  );
}

export default HCPCData;
