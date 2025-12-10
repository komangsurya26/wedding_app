import { useEffect, useState } from "react";
import { Events } from "../types";
import { fetchEvent } from "../actions/event-actions";

export function useEvent(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<Events[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchEvent({ invitation_id: invitationId });
                setEvents(data);
            } catch (err) {
                setError("Gagal memuat event");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { events, loading, error };
}
