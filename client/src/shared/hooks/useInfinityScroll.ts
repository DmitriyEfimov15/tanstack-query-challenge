import { RefObject, useEffect } from "react";

interface IUseInfinityScrollArgs {
    loadMoreRef: RefObject<HTMLDivElement | null>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const useInfinityScroll = ({
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: IUseInfinityScrollArgs) => {
    useEffect(() => {
        if (!loadMoreRef) return;
        const el = loadMoreRef.current;
        if (!el || !hasNextPage) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(el);

        return () => observer.unobserve(el);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, loadMoreRef]);
};
