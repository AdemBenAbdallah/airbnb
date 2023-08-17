'use client'
import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ icon: Icon, label, description }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <Icon size={24} className="text-neutral-600" /> 
                <div className="font-semibold text-lg">{label}</div>
            </div>
            <div className="text-neutral-500 font-light">{description}</div>
        </div>
    );
}

export default ListingCategory;
