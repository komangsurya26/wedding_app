export type GroomEditProps = {
    invitationId: number;
    type: "groom" | "bride";
    uploader: ReturnType<
        typeof import("@/src/hooks/use-image-uploader").useImageUploader
    >;
    onClose: () => void
};