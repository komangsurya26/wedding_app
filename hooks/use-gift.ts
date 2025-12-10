import { useEffect, useState } from "react";
import { Gifts } from "../types";
import { fetchGift } from "../actions/gift-actions";

export function useGift(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [gifts, setGifts] = useState<Gifts[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchGift({ invitation_id: invitationId });
                setGifts(data);
            } catch (err) {
                setError("Gagal memuat gift");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { gifts, loading, error };
}
