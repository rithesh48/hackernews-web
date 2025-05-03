type CommentItemProps = {
    comment: Comment;
    isEditing: boolean;
    editContent: string;
    onEditChange: (text: string) => void;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    onDelete: () => void;
    currentUserId: string;
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
    }
    userId?: string; // Optional, in case you map it from the backend or session
  };
  
  export default function CommentItem({
    comment,
    isEditing,
    editContent,
    onEditChange,
    onEdit,
    onCancel,
    onSave,
    onDelete,
    currentUserId,
  }: CommentItemProps) {
    const isOwner = comment.userId === currentUserId; // Adjust based on your data structure
  
    return (
      <li className="border p-2 rounded shadow">
        {isEditing && isOwner ? (
          <>
            <textarea
              className="w-full border p-2 mb-2"
              rows={2}
              value={editContent}
              onChange={(e) => onEditChange(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{comment.content}</p>
            <p className="text-xs text-gray-500">
              by {comment.user.username} •{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
  
            {isOwner && (
              <div className="flex gap-2 mt-1">
                <button onClick={onEdit} className="text-blue-600 text-sm">
                  Edit
                </button>
                <button onClick={onDelete} className="text-red-600 text-sm">
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </li>
    );
  }