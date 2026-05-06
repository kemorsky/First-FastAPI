import { type Invoice } from "../../../types/types"

export default function BillingCard(props: Invoice) {
    return (
        <tr className="hover:bg-blue-600">
            <td>{props.date}</td>
            <td>{props.amount_paid}</td>
            <td>{props.currency.toUpperCase()}</td>
            <td>{props.description}</td>
            <td>{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</td>
            <td><button>D</button></td>
        </tr>
    )
};