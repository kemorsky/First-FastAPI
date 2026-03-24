import { cn } from "../../lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container(props: ContainerProps) {
    return (
        <div className={cn("max-w-300 w-full m-auto", props.className)}>
            {props.children}
        </div>
    )
}