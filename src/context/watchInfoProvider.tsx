"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useGetAllWatchesLazyQuery } from "@/generated"; // adjust path if needed

type Props = {
    children: ReactNode;
};

type Watch = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    // Add any other fields from your Watch type
};

type ContextType = {
    watches: Watch[] | null;
    loading: boolean;
    refetch: () => void;
};

const WatchContext = createContext<ContextType>({} as ContextType);

export const useWatches = () => useContext(WatchContext);

const WatchProvider = ({ children }: Props) => {
    const [watches, setWatches] = useState<Watch[] | null>(null);
    const [getAllWatches, { data, loading, refetch }] = useGetAllWatchesLazyQuery();

    useEffect(() => {
        getAllWatches();
    }, []);

    useEffect(() => {
        if (data?.getAllWatches) {
            const cleanedWatches: Watch[] = data.getAllWatches
                .filter((w): w is NonNullable<typeof w> => w !== null)
                .map((watch) => ({
                    id: watch.id,
                    name: `${watch.brand} ${watch.type}`, // or however you want to define name
                    imageUrl: watch.image, // converting image -> imageUrl
                    price: watch.price,
                    onSale: watch.onSale,
                    discountPercent: watch.discountPercent,
                    saleEndsAt: watch.saleEndsAt ?? null,
                    quantity: watch.quantity,
                }));

            setWatches(cleanedWatches);
        }
    }, [data]);


    return (
        <WatchContext.Provider value={{ watches, loading, refetch }}>
            {children}
        </WatchContext.Provider>
    );
};

export default WatchProvider;
