import { cn } from "../../lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container(props: ContainerProps) {
    return (
        <div className={cn("max-w-300 w-full border-x border-border py-30 m-auto", props.className)}>
            {props.children}
        </div>
    )
}