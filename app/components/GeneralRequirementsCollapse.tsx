import { Form, useNavigation, useSubmit } from '@remix-run/react';
import React, { useState } from 'react';
import Loader from './ui/Loader';
import { lcdDataType } from '../../types';

type Props = {
  selectedLcdUrl: string;
  data: string;
};

function GeneralRequirementsCollapse({ selectedLcdUrl, data = '' }: Props) {
  console.log('GeneralRequirementsCollapse ~ selectedLcdUrl:', selectedLcdUrl);
  const navigation = useNavigation();
  const submit = useSubmit();
  const [open, setOpen] = useState(false);

  return (
    <Form
      className={`collapse collapse-plus bg-base-200 max-w-7xl ${
        open ? 'collapse-open' : 'collapse-close'
      }`}
      onClick={() => {
        setOpen(!open);
        submit(
          { type: 'GENERAL_REQUIREMENTS', url: selectedLcdUrl },
          { method: 'post' }
        );
      }}
    >
      <input
        type="radio"
        name="my-accordion-1"
      />
      <div className="collapse-title text-2xl tracking-tight font-bold">
        General Requirements
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
    </Form>
  );
}

export default GeneralRequirementsCollapse;
