import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import HCPCData from '~/components/HCPCData';
import Sidebar from '~/components/Sidebar';
import fs from 'fs/promises';

import {
  getCoverageGuidance,
  getDocumentationRequirements,
} from '~/data/scrape.server';
import type { lcdDataType, loaderDataType } from 'types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Local Coverage Determination (LCD)' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);

  const loaderData = useLoaderData<loaderDataType[]>();

  const lcdData: lcdDataType[] = loaderData.map((data) => ({
    name: data.lcdName,
    url: data.lcdUrl,
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
            <HCPCData selectedLcd={loaderData[selectedLcdIndex]} />
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

export async function loader() {
  const data = await fs.readFile('./lcdData.json', 'utf-8');
  const parsedData = JSON.parse(data);
  return json(parsedData);
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
