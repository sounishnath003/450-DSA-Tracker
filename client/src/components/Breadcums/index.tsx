import React from "react";
import {Link} from "react-router-dom";
import {BreadcumIcon} from "../../assets/icons";

interface BreadcumsProps {
    root1: string;
    link1: string;
    root2: string | null;
}

const Breadcrumb: React.FC<BreadcumsProps> = ({root1, link1, root2}: BreadcumsProps) => {
    return <React.Fragment>
        <nav className="text-black font-- my-8 text-center" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link className={'text-blue-500'} to={"/"}> Topics </Link>
                    <BreadcumIcon/>
                </li>
                <li className="flex items-center">
                    <Link to={link1}> {root1} </Link>
                    <BreadcumIcon/>
                </li>
                {root2 && <li>
                    <span className="text-gray-500" aria-current="page"> {root2} </span>
                </li>}
            </ol>
        </nav>
    </React.Fragment>
}

export default Breadcrumb;