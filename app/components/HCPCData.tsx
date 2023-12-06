import { useActionData } from '@remix-run/react';
import React from 'react';
import type { loaderDataType } from 'types';
import { formatHcpcsModifiers } from 'utils/formatters';
import type { action } from '~/routes/_index';
import HCPCSCollapse from './HCPCSCollapse';
import GeneralRequirementsCollapse from './GeneralRequirements';

function HCPCData({ name, url, hcpcsModifiers }: loaderDataType) {
  const formattedHcpcsModifiers = formatHcpcsModifiers(hcpcsModifiers);

  const documentationRequirements = useActionData<typeof action>();

  return (
    <div className="py-10">
      <div className="mb-6">
        <h1 className="text-4xl tracking-tight font-bold">
          <a
            target="_blank"
            rel="noreferrer"
            href={url}
            className="text-blue-500 hover:text-blue-600"
          >
            {name}
          </a>
        </h1>
        <hr />
      </div>
      <div className="space-y-2">
        <HCPCSCollapse hcpcsModifiers={formattedHcpcsModifiers} />
        <GeneralRequirementsCollapse data={documentationRequirements} />
      </div>
    </div>
  );
}

export default HCPCData;
