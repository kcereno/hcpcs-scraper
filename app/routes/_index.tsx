import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import {
  useRouteError,
  type ShouldRevalidateFunction,
  isRouteErrorResponse,
} from '@remix-run/react';
import { useState } from 'react';
import HCPCData from '~/components/HCPCData';
import Sidebar from '~/components/Sidebar';

import {
  getCoverageGuidance,
  getDocumentationRequirements,
  getLCDData,
} from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Local Coverage Determination (LCD)' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);

  const handleSidebarClick = (index: number) => {
    setSelectedLcdIndex(index);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedLcdIndex={selectedLcdIndex}
        handleSideBarClick={handleSidebarClick}
      />

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcdIndex !== null ? (
          <>
            <HCPCData selectedLcdIndex={selectedLcdIndex} />
          </>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold font-inter">
              Local Coverage Determination (LCD) Scraper
            </h1>
            <p className="my-10">Select an LCD from the left column</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export async function loader() {
  const lcdData = await getLCDData();
  return json(lcdData);
}
export async function action({ request }: ActionFunctionArgs) {
  console.log('action');
  const formData = await request.formData();
  const type = await formData.get('type');
  const url = await formData.get('url');

  try {
    if (type === 'GENERAL_REQUIREMENTS') {
      const documentationRequirements = await getDocumentationRequirements(
        url as string
      );
      return json({
        type: 'GENERAL_REQUIREMENTS',
        data: documentationRequirements,
      });
    }

    if (type === 'COVERAGE_GUIDELINES') {
      const coverageGuidance = await getCoverageGuidance(url as string);
      return json({
        type: 'COVERAGE_GUIDELINES',
        data: coverageGuidance,
      });
    }
  } catch (error: any) {
    return json({ message: error.message });
  }
}

export const shouldRevalidate: ShouldRevalidateFunction = () => false;
