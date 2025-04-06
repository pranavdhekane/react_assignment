export default function LeftPanel() {
    const tableStyle = `
        shadow-lg border-gray-200 border
        w-full text-left border-collapse 
        [&>thead>tr>th]:bg-green-100 
        [&>thead>tr>th]:text-gray-700 
        [&>thead>tr>th]:font-semibold 
        [&>thead>tr>th]:px-4 
        [&>thead>tr>th]:py-1
        [&>thead>tr>th]:border-b 
        [&>thead>tr>th]:border-gray-300 
        [&>tbody>tr>td]:px-4 
        [&>tbody>tr>td]:py-1 
        [&>tbody>tr>td]:border-b 
        [&>tbody>tr>td]:border-gray-200 
        [&>tbody>tr>td]:text-sm
        [&>tbody>tr:hover]:bg-gray-100
    `;

    return (
        <div className="grid gap-6 p-4 max-w-md">
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>RBC</th>
                        <th>Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Angled Cells</td><td>222</td><td>67%</td></tr>
                    <tr><td>Borderline Ovalocytes</td><td>50</td><td>20%</td></tr>
                    <tr><td>Burr Cells</td><td>87</td><td>34%</td></tr>
                    <tr><td>Fragmented Cells</td><td>2</td><td>0.12%</td></tr>
                    <tr><td>Ovalocytes</td><td></td><td></td></tr>
                    <tr><td>Rounded RBC</td><td></td><td></td></tr>
                    <tr><td>Teardrops</td><td></td><td></td></tr>
                </tbody>
            </table>

            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>WBC</th>
                        <th>Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Basophil</td><td>222</td><td>67%</td></tr>
                    <tr><td>Eosinophil</td><td>50</td><td>20%</td></tr>
                    <tr><td>Lymphocyte</td><td>87</td><td>34%</td></tr>
                    <tr><td>Monocyte</td><td>2</td><td>0.12%</td></tr>
                </tbody>
            </table>

            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th colSpan={2}>Platelets</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Count</td><td>222</td></tr>
                    <tr><td>Percentage</td><td>222</td></tr>
                </tbody>
            </table>
        </div>
    );
}
