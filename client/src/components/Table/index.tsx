import React from "react";

interface TableProps {
    children: any
}

const Table: React.FC<TableProps> = ({children}: TableProps) => {
    return <div className="flex flex-col my-8">
        <div className="my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y table-fixed divide-gray-200">

                        {children}

                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default Table;