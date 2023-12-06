import { Form, useNavigation, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Loader from './ui/Loader';

type Props = {
  selectedLcdUrl: string;
  data: string;
};

function GeneralRequirementsCollapse({ selectedLcdUrl, data = '' }: Props) {
  console.log('GeneralRequirementsCollapse ~ selectedLcdUrl:', selectedLcdUrl);
  const navigation = useNavigation();

  console.log('GeneralRequirementsCollapse ~ navigation:');
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
        name="general-requirements-accordion"
      />
      <div className="collapse-title text-2xl tracking-tight font-bold">
        General Requirements
      </div>
      <div className="collapse-content space-y-4">
        {navigation.state === 'submitting' &&
          navigation.formData?.get('type') === 'GENERAL_REQUIREMENTS' && (
            <Loader />
          )}
        {data && navigation.state !== 'submitting' ? (
          <div
            className="mx-6"
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        ) : null}
      </div>
    </Form>
  );
}

export default GeneralRequirementsCollapse;
