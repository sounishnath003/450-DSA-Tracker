import React from "react";
import {EasyIcon} from "../../assets/icons";

type CategoryNavbarType = {path: string, categoryTypeWithNumber: string, icon: JSX.Element};

const CategoryNavbar: React.FC = () => {

    const categories: CategoryNavbarType[] = [
        {path: '/category-lists/easy', icon: <EasyIcon />, categoryTypeWithNumber: ''}
    ]

    return <React.Fragment>
        <div className="my-6">
            <div className="flex justify-evenly space-x-4">
                <div className="flex space-x-1">
                    <div>Easy</div>
                    <div> 5</div>
                </div>
                <div className="flex space-x-1">
                    <div>Easy</div>
                    <div> 5</div>
                </div>
                <div className="flex space-x-1">
                    <div>Easy</div>
                    <div> 5</div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default CategoryNavbar;