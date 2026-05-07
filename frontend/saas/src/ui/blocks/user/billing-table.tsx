import { useSuspenseQuery } from "@tanstack/react-query";
import { userBillingHistoryQueryOptions } from "../../../queries/userQueryOptions";
import BillingCard from "../../components/cards/billing-card";

interface BillingTableProps {
    children: React.ReactNode;
}

export default function BillingTable() {
    const { data: billing, isLoading: isBillingLoading } = useSuspenseQuery({
        ...userBillingHistoryQueryOptions(),
        //placeholderData: EMPTY_BILLING
    })
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
                {billing?.invoices.map((invoice) => (
                    <BillingCard key={invoice.id} 
                        id={invoice.id}
                        date={invoice.date} 
                        amount_paid={invoice.amount_paid}
                        currency={invoice.currency}
                        description={invoice.description}
                        status={invoice.status}
                        hosted_invoice_url={invoice.hosted_invoice_url}
                        invoice_pdf={invoice.invoice_pdf}
                    />
                ))}
            </tbody>
        </table>
    )
}