import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import type { ShouldRevalidateFunction } from '@remix-run/react';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { lcdDataType, loaderDataType } from 'types';
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

  const loaderData = useLoaderData<loaderDataType[]>();

  const lcdData: lcdDataType[] = loaderData.map((obj) => ({
    name: obj.name,
    url: obj.url,
  }));

  const handleSidebarClick = (index: number) => {
    setSelectedLcdIndex(index);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        lcdData={lcdData}
        selectedLcdIndex={selectedLcdIndex}
        handleSideBarClick={handleSidebarClick}
      />

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcdIndex !== null ? (
          <>
            <HCPCData {...loaderData[selectedLcdIndex]} />
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
      <h1>test</h1>
    </div>
  );
}

export async function loader() {
  const lcdData = await getLCDData();
  return json(lcdData);
}
export async function action({ request }: ActionFunctionArgs) {
  console.log('action');
  const formData = await request.formData();
  const url = formData.get('lcdUrl');

  const documentationRequirements = await getDocumentationRequirements(
    url as string
  );

  const coverageGuidance = await getCoverageGuidance(url as string);

  return json({ documentationRequirements, coverageGuidance });
}

export const shouldRevalidate: ShouldRevalidateFunction = () => false;
