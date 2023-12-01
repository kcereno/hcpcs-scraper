import type { MetaFunction } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import HCPCData from '~/components/HCPCData';
import { getLCDs, getTitle } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);
  const lcdData = useLoaderData<typeof loader>();

  const data = useActionData<typeof action>();

  return (
    <div className="flex h-screen">
      <div className="flex-none w-[400px] border-r border-gray-300 overflow-y-auto p-4">
        <div className="">
          <h2 className="text-2xl">LCD's</h2>
          <hr className="my-2" />
          <ul className="flex gap-4 flex-col flex-wrap">
            {lcdData.map((lcd, index) => (
              <li
                onClick={() => {
                  setSelectedLcdIndex(index);
                }}
                className={`hover:bg-gray-400 cursor-pointer ${
                  selectedLcdIndex === index && 'bg-gray-400'
                }`}
                key={lcd.name}
              >
                {lcd.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcdIndex ? (
          <HCPCData {...lcdData[selectedLcdIndex]} />
        ) : (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold font-inter">HCPC Scraper</h1>
            <p className="my-10">Select an LCD from the left column</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function loader() {
  return await getLCDs();
}
export async function action() {
  const title = await getTitle();

  return { message: title };
}
