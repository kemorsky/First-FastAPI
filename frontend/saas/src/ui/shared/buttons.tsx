import { cn } from "../../lib/utils";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary";
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={cn("flex bg-gray-200 items-center text-base", 
                props.variant === "primary" ? "bg-red-200" : "",
                props.variant === "secondary" ? "bg-red-400" : "",
                props.className
            )} 
                onClick={props.onClick}>
            {props.text}
        </button>
    )
};