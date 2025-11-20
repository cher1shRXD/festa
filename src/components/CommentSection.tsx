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

interface CommentSectionProps {
  festivalId: number;
}

const CommentSection = ({ festivalId }: CommentSectionProps) => {
  const navigate = useNavigate();
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
      // 클라이언트에서 정렬
      commentsData.sort((a, b) => b.createdAt - a.createdAt);
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [festivalId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        navigate("/login");
      }
      return;
    }

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
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
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteDoc(doc(db, "comments", commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
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
      alert("댓글 내용을 입력해주세요.");
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
      alert("댓글 수정에 실패했습니다.");
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

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-[#003876] pb-2">
        댓글 ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              user
                ? "댓글을 입력하세요..."
                : "로그인 후 댓글을 작성할 수 있습니다."
            }
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#003876] resize-none"
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {user ? (
              <span>
                <strong>{user.email}</strong>님으로 작성
              </span>
            ) : (
              <span>댓글 작성은 로그인이 필요합니다.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="bg-[#003876] text-white px-6 py-2 font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "작성 중..." : "댓글 작성"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            첫 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-900">
                    {comment.userEmail}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {formatDate(comment.createdAt)}
                    {comment.updatedAt && " (수정됨)"}
                  </span>
                </div>

                {user && user.uid === comment.userId && editingCommentId !== comment.id && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartEdit(comment)}
                      className="text-sm text-[#003876] hover:text-[#00509e] transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#003876] resize-none"
                    rows={3}
                    disabled={loading}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      disabled={loading}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={loading || !editContent.trim()}
                      className="bg-[#003876] text-white px-4 py-2 text-sm font-medium hover:bg-[#00509e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "수정 중..." : "수정 완료"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
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
