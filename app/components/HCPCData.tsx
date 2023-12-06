import { useActionData, useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import type { actionDataType, loaderDataType } from 'types';
import HCPCSCollapse from './HCPCSCollapse';
import GeneralRequirementsCollapse from './GeneralRequirementsCollapse';
import CoverageGuidanceCollapse from './CoverageGuidanceCollapse';

type Props = {
  selectedLcdIndex: number;
};

function HCPCData({ selectedLcdIndex }: Props) {
  const [generalRequirements, setGeneralRequirements] = useState<string>('');
  const [coverageGuidance, setCoverageGuidance] = useState<string>('');

  const loaderData = useLoaderData<loaderDataType[]>();
  const actionData = useActionData<actionDataType>();

  // Updates the general requirements when the action data is updated
  useEffect(() => {
    if (
      actionData &&
      actionData.type === 'GENERAL_REQUIREMENTS' &&
      actionData.data
    ) {
      setGeneralRequirements(actionData.data);
    }

    if (
      actionData &&
      actionData.type === 'COVERAGE_GUIDELINES' &&
      actionData.data
    ) {
      setCoverageGuidance(actionData.data);
    }
  }, [actionData]);

  const lcdName = loaderData[selectedLcdIndex].name;
  const lcdUrl = loaderData[selectedLcdIndex].url;
  const hcpcsModifiers =
    loaderData[selectedLcdIndex].hcpcsModifiers.split(', ');

  return (
    <div className="py-10">
      <div className="mb-6">
        <h1 className="text-4xl tracking-tight font-bold">
          <a
            target="_blank"
            rel="noreferrer"
            href={lcdUrl}
            className="text-blue-500 hover:text-blue-600"
          >
            {lcdName}
          </a>
        </h1>
        <hr />
      </div>
      <div className="space-y-2">
        <HCPCSCollapse hcpcsModifiers={hcpcsModifiers} />
        <GeneralRequirementsCollapse
          selectedLcdUrl={lcdUrl}
          data={generalRequirements}
        />
        <CoverageGuidanceCollapse
          selectedLcdUrl={lcdUrl}
          data={coverageGuidance}
        />
      </div>
    </div>
  );
}

export default HCPCData;
