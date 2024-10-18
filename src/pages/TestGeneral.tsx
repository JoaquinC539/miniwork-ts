import { useState } from "react";
import DataDisplayModal from "../modals/DataDisplayModal";
import { SectionData } from "../types/SectionData";

const TestGeneral = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickEditModalButton = (): void => {
        setIsOpen(true)
    }
    const mockCollapsibleTableData: SectionData[] = [
        {
            type: 'collapsibleTable',
            title: 'IT Department',
            columns: ['Name', 'Position', 'Email'],
            rows: [
                {
                    mainRow: { Name: 'John', Position: 'Software Engineer', Email: 'john@office.com' },
                    nestedColumns: ['Project', 'Phone', 'Location'],
                    nestedRows: [
                        { Project: 'Internal Tools', Phone: '555-1234', Location: 'Building A' },
                    ],
                },
                {
                    mainRow: { Name: 'Sarah', Position: 'System Administrator', Email: 'sarah@office.com' },
                    nestedColumns: ['Project', 'Phone', 'Location'],
                    nestedRows: [
                        { Project: 'Server Maintenance', Phone: '555-5678', Location: 'Building B' },
                        { Project: 'Network Upgrades', Phone: '555-9876', Location: 'Building C' },
                    ],
                },
            ],
        },
        
    ];


    return (
        <>
            <button onClick={handleClickEditModalButton}>Open Edit</button>
            <DataDisplayModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                modalTitle="Data test"
                data={mockCollapsibleTableData}
            />
        </>
    );
}
export default TestGeneral;