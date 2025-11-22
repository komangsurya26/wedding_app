export type GroomEditProps = {
    invitationId: number;
    type?: "groom" | "bride" | string;
    uploader: ReturnType<
        typeof import("@/src/hooks/use-image-uploader").useImageUploader
    >;
};