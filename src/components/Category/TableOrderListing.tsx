import React from "react";
import { IQuestion } from "../../Backend/model/Question-model";
import RowLists from "./RowLists";

interface Props {
  questions: IQuestion[];
  colorCode: string;
}

function TableOrderListing({ questions, colorCode }: Props) {
  return (
    <React.Fragment>
      <div className={`bg-white border-b-2 border-${colorCode}-600 shadow-md max-w-full rounded my-6`}>
        <table className="w-full table-auto">
          <thead>
            <tr
              className={`bg-${colorCode}-200 text-${colorCode}-700 uppercase text-sm leading-normal`}
            >
              <th className="py-3 px-6 text-left">SL.no</th>
              <th className="py-3 px-6 text-left">Topic</th>
              <th className="py-3 px-6 text-left">Problem</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {questions.map((question: IQuestion, index: number) => (
              <RowLists question={question} sl={index + 1} color={colorCode} />
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default TableOrderListing;
