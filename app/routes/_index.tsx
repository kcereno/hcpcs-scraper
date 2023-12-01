import type { MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import HCPCData from '~/components/HCPCData';
import { getLCDs, getTitle } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcd, setSelectedLcd] = React.useState('');
  // console.log('Index ~ data:', data);
  const lcds = useLoaderData<typeof loader>();

  // const handleButtonClick = async () => {
  //   const title = await getTitle();
  //   console.log('handleButtonClick ~ title:', title);

  //   setText('title fetched');
  //   // setText(title);
  // };

  const data = useActionData<typeof action>();
  console.log('Index ~ data:', data?.message.message);

  return (
    <div className="flex h-screen">
      <div className="flex-none w-[400px] border-r border-gray-300 overflow-y-auto p-4">
        <div className="">
          <h2 className="text-2xl">LCD's</h2>
          <hr className="my-2" />
          <ul className="flex gap-4 flex-col flex-wrap">
            {lcds?.map((lcd: string) => (
              <li
                onClick={() => {
                  setSelectedLcd(lcd);
                }}
                className={`hover:bg-gray-400 cursor-pointer ${
                  selectedLcd === lcd && 'bg-gray-400'
                }`}
                key={lcd}
              >
                {lcd}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      </div>

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcd ? (
          <HCPCData title={selectedLcd} />
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
  const lcds = await getLCDs();

  return lcds;
}
export async function action() {
  console.log('action triggered');
  const title = await getTitle();
  console.log('action ~ title:', title);

  return { message: title };
}
