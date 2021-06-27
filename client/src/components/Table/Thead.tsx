import React from "react";

interface TheadProps {
    children: any
}

const Thead: React.FC<TheadProps> = ({children}: TheadProps) => {
    return <thead className="bg-gray-50">
    <tr>
        {children}
    </tr>
    </thead>
}


export const Th: React.FC<{ title: string }> = ({title}) => {
    return <th scope="col"
               className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {title}
    </th>
}

export default Thead;