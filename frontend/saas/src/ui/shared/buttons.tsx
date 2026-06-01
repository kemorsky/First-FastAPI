import { cn } from "../../lib/utils";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "learn-more" | "subscribe" | "download-pdf" | "arrow-down";
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={cn("bg-gray-200 text-base transition-colors rounded-lg", 
                props.variant === "primary" ? "bg-primary" : "",
                props.variant === "secondary" ? "bg-secondary" : "",
                props.variant === "learn-more" ? "bg-secondary" : "",
                props.variant === "subscribe" ? "w-full max-w-80 rounded-[3rem] bg-bg hover:bg-bg/80" : "",
                props.variant === "download-pdf" ? "bg-red-500" : "",
                props.variant === "arrow-down" ? "transition-transform duration-300 group-open:rotate-180" : "",
                props.disabled ? "cursor-not-allowed, bg-gray-600" : "cursor-pointer",
                props.className
            )} 
                onClick={props.onClick}>
            {props.text}
        </button>
    )
};