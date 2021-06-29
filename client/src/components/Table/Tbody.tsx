import React from "react";

interface TbodyProps {
    children: any
}

export const Tbody: React.FC<TbodyProps> = ({children}: TbodyProps) => {
    return <tbody className="bg-white divide-y divide-gray-200">
    {children}
    </tbody>
}

export const Td: React.FC<TbodyProps> = ({children}: TbodyProps) => {
    return <td className="px-6 py-4 whitespace-nowrap"> {children} </td>

}