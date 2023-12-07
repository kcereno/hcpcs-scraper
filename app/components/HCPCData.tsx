import { useActionData, useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import type { actionDataType, loaderDataType } from 'types';
import HCPCSCollapse from './HCPCSCollapse';
import GeneralRequirementsCollapse from './GeneralRequirementsCollapse';
import CoverageGuidanceCollapse from './CoverageGuidanceCollapse';

type Props = {
  selectedLcd: loaderDataType;
};

function HCPCData({
  selectedLcd: {
    lcdName,
    lcdUrl,
    hcpcsModifiers,
    coverageGuidance,
    documentationRequirements,
  },
}: Props) {
  const formattedHcpcsModifiers = hcpcsModifiers.split(', ');

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
        <HCPCSCollapse hcpcsModifiers={formattedHcpcsModifiers} />
        <GeneralRequirementsCollapse data={documentationRequirements} />
        {/* <CoverageGuidanceCollapse
          selectedLcdUrl={lcdUrl}
          data={coverageGuidance}
        /> */}
      </div>
    </div>
  );
}

export default HCPCData;
