import { json, type MetaFunction } from '@remix-run/node';

import { useState } from 'react';
import HCPCData from '~/components/HCPCData';
import Sidebar from '~/components/Sidebar';
import fs from 'fs/promises';
import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
} from '@remix-run/react';

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
  const data = await fs.readFile('public/data/lcdData.json', 'utf-8');
  const parsedData = JSON.parse(data);
  return json(parsedData);
}
