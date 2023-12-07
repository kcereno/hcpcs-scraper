import HCPCSCollapse from './HCPCSCollapse';
import GeneralRequirementsCollapse from './GeneralRequirementsCollapse';
import CoverageGuidanceCollapse from './CoverageGuidanceCollapse';
import type { loaderDataType } from 'types';

type Props = {
  selectedLcd: loaderDataType;
};

function HCPCData({
  selectedLcd: {
    lcdName,
    lcdUrl,
    hcpcsModifiers,
    getCoverageGuidelines,
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
        <CoverageGuidanceCollapse data={getCoverageGuidelines} />
      </div>
    </div>
  );
}

export default HCPCData;
