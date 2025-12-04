import { useEffect, useState } from "react";
import { Video } from "../types";
import { fetchVideoYoutube } from "../lib/video-actions";

export function useVideo(invitationId: number) {
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<Video | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!invitationId) return;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchVideoYoutube({ invitation_id: invitationId });
                setVideo(data);
            } catch (err) {
                setError("Gagal memuat video");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [invitationId]);

    return { video, loading, error };
}
