import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import type { ShouldRevalidateFunction } from '@remix-run/react';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import GeneralRequirements from '~/components/GeneralRequirements';
import HCPCData from '~/components/HCPCData';
import { getDocumentationRequirements, getLCDData } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'HCPCS Scraper' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);
  const [generalRequirements, setGeneralRequirements] = useState<string | null>(
    null
  );
  console.log('Index ~ generalRequirements:', generalRequirements);

  const lcdData = useLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  useEffect(() => {
    setGeneralRequirements(actionData);
  }, [actionData]);

  const handleClick = (index: number) => {
    setSelectedLcdIndex(index);
    setGeneralRequirements(null);
  };

  return (
    <div className="flex h-screen">
      {/* First Column */}
      <div className="w-[450px] overflow-y-auto py-4">
        <h2 className="text-2xl w-full px-2 font-bold tracking-tight">LCD's</h2>
        <hr className="my-2" />

        <Form
          method="post"
          className="flex flex-col divide-y divide-solid"
        >
          {lcdData.map((lcd, index) => (
            <button
              className={`hover:bg-gray-300 cursor-pointer py-2 px-2  w-full text-left ${
                selectedLcdIndex === index && 'bg-gray-200'
              }`}
              key={lcd.name}
              onClick={() => handleClick(index)}
              name="lcdUrl"
              value={lcd.link}
              type="submit"
            >
              {lcd.name}
            </button>
          ))}
        </Form>
      </div>

      {/* Second Column */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedLcdIndex !== null ? (
          <>
            <HCPCData {...lcdData[selectedLcdIndex]} />
            {navigation.state === 'submitting' && <p>Getting Data</p>}
            {actionData && <GeneralRequirements data={generalRequirements} />}
          </>
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
  const formData = await request.formData();
  const url = formData.get('lcdUrl');

  const documentationRequirements = await getDocumentationRequirements(
    url as string
  );

  return json(documentationRequirements);
}

export const shouldRevalidate: ShouldRevalidateFunction = () => false;
