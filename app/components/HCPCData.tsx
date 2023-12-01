import React from 'react';

type Props = {
  title: string;
};

function HCPCData({ title }: Props) {
  return (
    <div className="py-10">
      <h1 className="text-4xl tracking-tight font-bold">{title}</h1>
      <hr />
    </div>
  );
}

export default HCPCData;
