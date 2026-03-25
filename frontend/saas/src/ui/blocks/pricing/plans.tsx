import Wrapper from "../../shared/wrapper"
import Container from "../../shared/container"
import { PlanCard } from "../../components/cards/plan-card"
import { Button } from "../../shared/buttons"
import { useQuery } from "@tanstack/react-query"
import usePayment from "../../../hooks/usePayment"
import plansQueryOptions from "../../../queries/plansQueryOptions"

export const Plans = () => {
    const { handleCreateCheckoutSession } = usePayment();
    const { data: plans } = useQuery(
        plansQueryOptions()
    );

    return (
        <Wrapper>
            <Container>
                <h1>Plans</h1>
                <section className="flex gap-8">
                    {plans?.map((plan) => (
                        <PlanCard key={plan.id}
                                name={plan.name} 
                                description= {plan.description} 
                                price={plan.price}
                        >
                            <Button onClick={() => {handleCreateCheckoutSession(plan.id as number)}} text="Subscribe" variant="secondary" />
                        </PlanCard>
                    ))}
                </section>
            </Container>
        </Wrapper>
    )
};