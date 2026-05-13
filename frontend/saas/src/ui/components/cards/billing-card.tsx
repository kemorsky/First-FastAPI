import { type Invoice } from "../../../types/types"
import { Button } from "../../shared/buttons"

export default function BillingCard(props: Invoice) {
    return (
        <tr className="hover:bg-blue-600">
            <td>{props.date}</td>
            <td>{props.amount_paid}</td>
            <td>{props.currency.toUpperCase()}</td>
            <td>{props.description}</td>
            <td>{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</td>
            <td>
                <a href={props.invoice_pdf} target="_blank" rel="noopener noreferrer">
                    <Button variant="download-pdf" text="D"/>
                </a>
            </td>
        </tr>
    )
};