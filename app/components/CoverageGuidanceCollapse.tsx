import { useState } from 'react';

type Props = {
  data: string;
};

function CoverageGuidanceCollapse({ data }: Props) {
  console.log('CoverageGuidanceCollapse ~ data:', data);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`collapse collapse-plus bg-base-200 max-w-7xl ${
        open ? 'collapse-open' : 'collapse-close'
      }`}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <input
        type="radio"
        name="coverage-guidance-accordion"
      />
      <div className="collapse-title text-2xl tracking-tight font-bold">
        Coverage Guidance
      </div>
      <div className="collapse-content space-y-4">
        <div
          className="mx-6"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  );
}

export default CoverageGuidanceCollapse;
