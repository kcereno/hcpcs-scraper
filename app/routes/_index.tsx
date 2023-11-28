import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { scrape } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log('Index ~ data:', data);

  return <div className="bg-red-300">{data.message}</div>;
}

export async function loader() {
  try {
    return await scrape();
  } catch (error: any) {
    return { message: error.message };
  }
}
