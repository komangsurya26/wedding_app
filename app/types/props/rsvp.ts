export type Comment = {
    name: string;
    message: string;
    attendance: Attendance;
    timeAgo: string;
};

export type Attendance = "Hadir" | "Tidak Hadir";

export interface ConfirmAttendanceProps {
    initialComments?: Comment[];
    onSubmit?: (comment: Comment) => void;
}