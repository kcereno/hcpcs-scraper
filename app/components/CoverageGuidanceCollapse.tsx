import { Form, useNavigation, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Loader from './ui/Loader';

type Props = {
  selectedLcdUrl: string;
  data: string;
};

function CoverageGuidanceCollapse({ selectedLcdUrl, data }: Props) {
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
          { type: 'COVERAGE_GUIDELINES', url: selectedLcdUrl },
          { method: 'post' }
        );
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
        {navigation.state === 'submitting' &&
          navigation.formData?.get('type') === 'COVERAGE_GUIDELINES' && (
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

export default CoverageGuidanceCollapse;
