import { useState, Suspense } from "react";
import { useNavigate, Outlet } from "react-router";
import { UserInfoCard } from "../../components/cards/user-info-card";
import { UserSubscriptionCard } from "../../components/cards/user-subscription-card"
import type { Tab } from "../../../types/types";
import Container from "../../shared/container";
import Wrapper from "../../shared/wrapper";
import BillingTable from "./billing-table";
import UserInfoCardSkeleton from "../../skeletons/user-info-card-skeleton";
import useAuth from "../../../hooks/useAuth";
import HorizontalRule from "../../shared/horizontal-rule";

export const UserInfoRundown = () => {
    const { user, isPending, redirectMissingAuth } = useAuth();

    if (!user) {
        redirectMissingAuth();
    };

    return (
        <div className="w-full flex flex-col md:flex-row items-start justify-between">
            {isPending || !user ? ( 
                <UserInfoCardSkeleton />
            ) : (
                <UserInfoCard user={user}/> 
            )}
            <Suspense fallback={<UserInfoCardSkeleton />}>
                <UserSubscriptionCard />
            </Suspense>
        </div>
    )
}

export const BillingHistory = () => {
    return (
        <section className="w-full h-full max-h-250">
            <article className="text-left mb-4">
                <p className="text-[1.25rem] font-secondary font-semibold text-text">Billing History</p>
            </article>
            <HorizontalRule />
            <Suspense fallback={<UserInfoCardSkeleton />}>
                <BillingTable />
            </Suspense>
        </section>
    )
}

export const Activity = () => {
    return (
        <div>
            <section>Activity Content in JSON test</section>
        </div>
    )
}

const tabData: Tab[] = [
    {
        id: 1,
        title: "User Info",
        href: "/user",
        content: <UserInfoRundown />
    },
    {
        id: 2,
        title: "Billing History",
        href: "/user/billing-history",
        content: <BillingHistory />
    },
    {
        id: 3,
        title: "Activity",
        href: "/user/activity",
        content: <Activity />
    },
    {
        id: 4,
        title: "Test",
        href: "/user/test",
        content:
            <div>
                <section>Test Content in JSON test</section>
            </div>
    },
    {
        id: 5,
        title: "Test2",
        href: "/user/test2",
        content:
            <div>
                <section>Test2 Content in JSON test</section>
            </div>
    },
]

export const UserInfo = () => {
    const [ activeTab, setActiveTab ] = useState<Tab>(tabData[0]);

    const navigate = useNavigate();
    
    const handleClick = (tab: Tab) => {
        setActiveTab(tab);
        navigate(tab.href);
    }
    // TODO - refresh user and user subscription upon changes in data
    // when passed to UserInfoCard and UserSubscriptionCard

    return (
        <Wrapper className="bg-bg">
            <Container className="h-full min-h-175 pb-0 pt-8">
                <div className="w-full max-w-250 h-full max-h-250 mx-auto p-4 rounded-2xl flex flex-col items-start justify-start gap-6">
                    <section className="h-8 flex gap-2 border-b border-border">
                        {tabData.map((tab) => (     
                            <section key={tab.id} className="flex flex-col h-full items-center justify-between">                     
                                <button 
                                    key={tab.id} 
                                    onClick={() => {handleClick(tab)}} 
                                    className={`${tab.id === activeTab.id ? "px-3 text-[0.875rem] font-secondary font-semibold text-text" : "text-[0.875rem] px-3 font-secondary border-b-3 border-transparent text-text-muted"}`}
                                >
                                    {tab.title}
                                </button>
                                <span className={`${tab.id === activeTab.id ? "w-8 h-0.75 bg-text rounded-t-xl" : "w-8 h-0.75 bg-transparent rounded-t-xl"}`}/>
                            </section>
                        ))}
                    </section>

                    {activeTab && (
                        <section className="w-full h-135 border border-border rounded-xl p-6 flex gap-4 items-start justify-start text-text overflow-y-auto">
                            <Outlet />
                        </section>
                    )}
                </div>
            </Container>
        </Wrapper>
    )
}