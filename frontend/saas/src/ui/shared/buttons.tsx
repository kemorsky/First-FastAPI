import { cn } from "../../lib/utils";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "learn-more" | "subscribe" | "download-pdf";
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={cn("flex items-center justify-center bg-gray-200 text-base transition-colors rounded-lg", 
                props.variant === "primary" ? "bg-red-200" : "",
                props.variant === "secondary" ? "bg-red-400" : "",
                props.variant === "learn-more" ? "bg-red-600" : "",
                props.variant === "subscribe" ? "w-full max-w-80 rounded-[3rem] bg-bg hover:bg-bg/80" : "",
                props.variant === "download-pdf" ? "bg-red-500" : "",
                props.disabled ? "cursor-not-allowed, bg-gray-600" : "cursor-pointer",
                props.className
            )} 
                onClick={props.onClick}>
            {props.text}
        </button>
    )
};