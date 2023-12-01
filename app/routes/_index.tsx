import type { MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { getLCDs, getTitle } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
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
      <div className="flex-none w-96 border-r border-gray-300 overflow-y-auto p-4">
        <div className="">
          <h2 className="text-2xl">Labels</h2>
          <hr className="my-2" />
          <div className="flex gap-2 flex-col flex-wrap">
            {lcds?.map((lcd: string) => (
              <p key={lcd}>{lcd}</p>
            ))}
          </div>
          <hr />
        </div>
      </div>

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">HCPC content</div>
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
