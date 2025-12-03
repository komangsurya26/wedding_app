import { useEffect, useState } from "react";
import { Groom } from "../types";
import { fetchGroom } from "../lib/groom-actions";

export function useGroom(invitationId: number, type: 'groom' | 'bride') {
    const [loading, setLoading] = useState(false);
    const [groom, setGroom] = useState<Groom | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchGroom({ invitation_id: invitationId, type });
                setGroom(data);
            } catch (err) {
                setError("Gagal memuat groom");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId, type]);

    return { groom, loading, error };
}
