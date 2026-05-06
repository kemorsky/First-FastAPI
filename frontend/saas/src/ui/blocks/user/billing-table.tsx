interface BillingTableProps {
    children: React.ReactNode;
}

export default function BillingTable(props: BillingTableProps) {
    return (
        <table className="w-full table-auto text-left">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Currency</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Invoice</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}