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
import { lcdDataType, loaderDataType } from 'types';
import GeneralRequirements from '~/components/GeneralRequirements';
import HCPCData from '~/components/HCPCData';
import Sidebar from '~/components/Sidebar';
import Loader from '~/components/ui/Loader';
import { getDocumentationRequirements, getLCDData } from '~/data/scrape.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Local Coverage Determination (LCD)' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [generalRequirements, setGeneralRequirements] = useState<string | null>(
    null
  );
  const [selectedLcdIndex, setSelectedLcdIndex] = useState<number | null>(null);

  const loaderData = useLoaderData<loaderDataType[]>();
  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

  const lcdData: lcdDataType[] = loaderData.map((obj) => ({
    name: obj.name,
    url: obj.url,
  }));

  const hcpcsModifiers = loaderData.map((obj: loaderDataType) => ({
    modifiers: obj.hcpcsModifiers,
  }));

  useEffect(() => {
    setGeneralRequirements(actionData);
  }, [actionData]);

  const handleSidebarClick = (index: number) => {
    setSelectedLcdIndex(index);
    setGeneralRequirements(null);
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
            <HCPCData {...loaderData[selectedLcdIndex]} />
            {/* {navigation.state === 'submitting' && <Loader />}
            {actionData && <GeneralRequirements data={generalRequirements} />} */}
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
      <h1>test</h1>
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
