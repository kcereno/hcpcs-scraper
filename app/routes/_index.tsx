import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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

export function loader() {
  return { message: 'Hello from loader!' };
}
