import { useNavigation } from '@remix-run/react';
import React, { useState } from 'react';
import Loader from './ui/Loader';

type Props = {
  data: any;
};

function CoverageGuidanceCollapse({ data }: Props) {
  const navigation = useNavigation();

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
        Coverage Guidance
      </div>
      <div className="collapse-content space-y-4">
        {navigation.state === 'submitting' && <Loader />}
        {data && navigation.state !== 'submitting' ? (
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        ) : null}
      </div>
    </div>
  );
}

export default CoverageGuidanceCollapse;
