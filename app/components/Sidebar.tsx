import { useLoaderData } from '@remix-run/react';
import type { lcdDataType, loaderDataType } from 'types';

type Props = {
  selectedLcdIndex: number | null;
  handleSideBarClick: (index: number) => void;
};

function Sidebar({ selectedLcdIndex, handleSideBarClick }: Props) {
  const loaderData = useLoaderData<loaderDataType[]>();

  const lcdData: lcdDataType[] = loaderData.map(({ name, url }) => ({
    name,
    url,
  }));

  return (
    <div className="w-[400px] overflow-y-auto py-4 border-r ">
      <h2 className="text-2xl w-full px-2 font-bold tracking-tight">LCD's</h2>
      <hr className="my-2" />
      {lcdData.length > 0 ? (
        <div className="flex flex-col divide-y divide-solid">
          {lcdData.map(({ name, url }, index) => (
            <button
              className={`hover:bg-gray-300 cursor-pointer py-2 px-2  w-full text-left ${
                selectedLcdIndex === index && 'bg-gray-200'
              }`}
              key={name}
              onClick={() => handleSideBarClick(index)}
            >
              {name}
            </button>
          ))}
        </div>
      ) : (
        <div>Unable to fetch LCD's</div>
      )}
    </div>
  );
}

export default Sidebar;
