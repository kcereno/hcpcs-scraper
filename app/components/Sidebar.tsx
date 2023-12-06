import { Form } from '@remix-run/react';
import type { lcdDataType } from 'types';

type Props = {
  lcdData: lcdDataType[];
  selectedLcdIndex: number | null;
  handleSideBarClick: (index: number) => void;
};

function Sidebar({ lcdData, selectedLcdIndex, handleSideBarClick }: Props) {
  return (
    <div className="w-[400px] overflow-y-auto py-4 border-r ">
      <h2 className="text-2xl w-full px-2 font-bold tracking-tight">LCD's</h2>
      <hr className="my-2" />
      {lcdData.length > 0 ? (
        <Form
          method="post"
          className="flex flex-col divide-y divide-solid"
        >
          {lcdData.map(({ name, url }, index) => (
            <button
              className={`hover:bg-gray-300 cursor-pointer py-2 px-2  w-full text-left ${
                selectedLcdIndex === index && 'bg-gray-200'
              }`}
              key={name}
              onClick={() => handleSideBarClick(index)}
              name="lcdUrl"
              value={url}
              type="submit"
            >
              {name}
            </button>
          ))}
        </Form>
      ) : (
        <div>Unable to fetch LCD's</div>
      )}
    </div>
  );
}

export default Sidebar;
