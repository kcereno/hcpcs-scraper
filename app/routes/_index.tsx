import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
  ShouldRevalidateFunction,
} from '@remix-run/react';
import { useState } from 'react';
import HCPCData from '~/components/HCPCData';
import { getLCDData } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);

  const submit = useSubmit;

  const lcdData = useLoaderData<typeof loader>();

  // const data = useActionData<typeof action>();

  const handleClick = (index: number) => {
    setSelectedLcdIndex(index);
  };

  return (
    <div className="flex h-screen">
      {/* First Column */}
      <div className="w-[450px] overflow-y-auto py-4">
        <h2 className="text-2xl w-full px-2 font-bold tracking-tight">LCD's</h2>
        <hr className="my-2" />

        <Form
          method="post"
          onSubmit={() => {
            submit;
          }}
        >
          <ul className="flex flex-col divide-y divide-solid">
            {lcdData.map((lcd, index) => (
              <li
                className={`hover:bg-gray-300 cursor-pointer py-1 ${
                  selectedLcdIndex === index && 'bg-gray-200'
                }`}
                key={lcd.name}
                onClick={() => handleClick(index)}
              >
                <button
                  type="submit"
                  className="px-2 py-1 w-full text-left"
                  value={lcd.name}
                >
                  {lcd.name}
                </button>
              </li>
            ))}
          </ul>
        </Form>
      </div>

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcdIndex !== null ? (
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
  const lcdData = await getLCDData();
  return json(lcdData);
}
export async function action({ request }: ActionFunctionArgs) {
  console.log('action');
  // const formData = await request.formData();
  // const url = formData.get('value');

  // const title = await getHCPCSTableData();

  return { message: 'test' };
}

export const shouldRevalidate: ShouldRevalidateFunction = () => false;
