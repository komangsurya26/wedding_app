import { useEffect, useState } from "react";
import { fetchAudio } from "../actions/audio-actions";
import { Audio } from "../types";

export function useAudio(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState<Audio | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAudio({ invitation_id: invitationId });
                setAudio(data);
            } catch (err) {
                setError("Gagal memuat audio");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { audio, loading, error, setAudio };
}
