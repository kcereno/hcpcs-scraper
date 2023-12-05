import React from 'react';

type Props = {
  data: any;
};

function GeneralRequirements({ data }: Props) {
  return (
    <div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </div>
  );
}

export default GeneralRequirements;
