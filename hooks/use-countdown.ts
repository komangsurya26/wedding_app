import { useEffect, useState } from "react";
import { Countdown } from "../types";
import { fetchCountdown } from "../actions/countdown-actions";

export function useCountdown(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState<Countdown | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchCountdown({ invitation_id: invitationId });
                setCountdown(data);
            } catch (err) {
                setError("Gagal memuat countdown");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { countdown, loading, error };
}
