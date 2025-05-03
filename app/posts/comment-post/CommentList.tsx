
import { betterAuthClient } from "@/lib/auth";
import CommentItem from "./CommentItem";

type CommentListProps = {
  comments: Comment[];
  editingCommentId: string | null;
  editContent: string;
  onEdit: (id: string, content: string) => void;
  onEditChange: (value: string) => void;
  onCancel: () => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  };
  userId?: string; // Optional, in case it's mapped
};

export default function CommentList({
  comments,
  editingCommentId,
  editContent,
  onEdit,
  onEditChange,
  onCancel,
  onSave,
  onDelete,
}: CommentListProps) {
  const { data: session } = betterAuthClient.useSession();
  const currentUserId = session?.user?.id ?? "";

  return (
    <ul className="space-y-2">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isEditing={editingCommentId === comment.id}
          editContent={editContent}
          onEdit={() => onEdit(comment.id, comment.content)}
          onEditChange={onEditChange}
          onCancel={onCancel}
          onSave={() => onSave(comment.id)}
          onDelete={() => onDelete(comment.id)}
          currentUserId={currentUserId}
        />
      ))}
    </ul>
  );
}