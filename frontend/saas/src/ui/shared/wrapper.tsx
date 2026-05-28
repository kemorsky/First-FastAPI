import { cn } from "../../lib/utils";

interface WrapperProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper(props: WrapperProps) {
    return (
        <section id={props.id} className={cn("w-full py-30", props.className)}>
            {props.children}
        </section>
    )
}