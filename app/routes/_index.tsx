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
  const loaderData = useLoaderData<typeof loader>();
  console.log('Index ~ loaderData:', loaderData);
  // const handleButtonClick = async () => {
  //   const title = await getTitle();
  //   console.log('handleButtonClick ~ title:', title);

  //   setText('title fetched');
  //   // setText(title);
  // };

  const data = useActionData<typeof action>();
  console.log('Index ~ data:', data?.message.message);

  return (
    <div className="mx-10">
      <h1 className="text-4xl font-bold py-20">HCPCS Scraper</h1>
      <hr />
      <p>loading data</p>
      {loaderData?.map((lcd: any) => (
        <p key={lcd}>{lcd}</p>
      ))}
      <hr />
      Fetching data
      <Form method="post">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Scrape
        </button>
      </Form>
      {data ? <p>{data?.message.message}</p> : null}
    </div>
  );
}

export async function loader() {
  const lcds = await getLCDs();
  console.log('loader ~ lcds:', lcds);
  return lcds;
}
export async function action() {
  console.log('action triggered');
  const title = await getTitle();
  console.log('action ~ title:', title);

  return { message: title };
}
