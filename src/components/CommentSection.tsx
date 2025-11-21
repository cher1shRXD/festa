import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import type { Comment } from "../types/comment";
import { useLanguage } from "../hooks/useLanguage";

interface CommentSectionProps {
  festivalId: number;
}

const CommentSection = ({ festivalId }: CommentSectionProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("festivalId", "==", festivalId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data(),
        } as Comment);
      });
      commentsData.sort((a, b) => b.createdAt - a.createdAt);
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [festivalId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      if (window.confirm(t.comments.loginRequired)) {
        navigate("/login");
      }
      return;
    }

    if (!newComment.trim()) {
      alert(t.comments.emptyContent);
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        festivalId,
        userId: user.uid,
        userEmail: user.email,
        content: newComment.trim(),
        createdAt: Timestamp.now().toMillis(),
      });

      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert(t.comments.writeError);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm(t.comments.deleteConfirm)) return;

    try {
      await deleteDoc(doc(db, "comments", commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert(t.comments.deleteError);
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editContent.trim()) {
      alert(t.comments.emptyContent);
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, "comments", commentId), {
        content: editContent.trim(),
        updatedAt: Timestamp.now().toMillis(),
      });

      setEditingCommentId(null);
      setEditContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert(t.comments.updateError);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t.comments.timeAgo.justNow;
    if (minutes < 60) return t.comments.timeAgo.minutesAgo(minutes);
    if (hours < 24) return t.comments.timeAgo.hoursAgo(hours);
    if (days < 7) return t.comments.timeAgo.daysAgo(days);

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-4 sm:p-6 mt-4 sm:mt-6">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
        {t.comments.title} ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-4 sm:mb-6">
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              user
                ? t.comments.placeholder.loggedIn
                : t.comments.placeholder.loggedOut
            }
            className="w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#003876] resize-none text-sm sm:text-base"
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600">
            {user ? (
              <span>
                {t.comments.writingAs(user.email || "")}
              </span>
            ) : (
              <span>{t.comments.loginRequiredText}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="bg-[#003876] text-white px-4 sm:px-6 py-2 font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
          >
            {loading ? t.comments.submitting : t.comments.submit}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 sm:space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
            {t.comments.empty}
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-b-0">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                <div>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">
                    {comment.userEmail}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    {formatDate(comment.createdAt)}
                    {comment.updatedAt && ` ${t.comments.edited}`}
                  </span>
                </div>

                {user && user.uid === comment.userId && editingCommentId !== comment.id && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartEdit(comment)}
                      className="text-xs sm:text-sm text-[#003876] hover:text-[#00509e] transition-colors"
                    >
                      {t.comments.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      {t.comments.delete}
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#003876] resize-none text-sm sm:text-base"
                    rows={3}
                    disabled={loading}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      disabled={loading}
                      className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                    >
                      {t.comments.cancel}
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={loading || !editContent.trim()}
                      className="bg-[#003876] text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? t.comments.updating : t.comments.update}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">
                  {comment.content}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
