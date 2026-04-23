import * as React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DiscussionBoardProps {
  cohortId: string;
}

export default function DiscussionBoard({ cohortId }: DiscussionBoardProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [cohortId]);

  async function loadPosts() {
    setLoading(true);
    try {
      const p = await api.getPostsByBoard('cohort', cohortId);
      setPosts(p);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    setSubmitting(true);
    try {
      await api.createPost({
        boardType: 'cohort',
        boardId: cohortId,
        authorId: user.id,
        authorName: user.name,
        content: newPost,
      });
      setNewPost("");
      await loadPosts();
    } catch (err) {
      console.error("Failed to post", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface-2 p-6 rounded-3xl border border-surface-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs">
              {user?.name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-navy">Post an update or question</span>
          </div>
          <Textarea 
            placeholder="What's on your mind regarding this cohort?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="rounded-2xl min-h-[100px] border-surface-3 focus:ring-baby resize-none"
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={submitting || !newPost.trim()}
              className="bg-navy text-white hover:bg-navy2 font-bold rounded-xl px-6 h-10 gap-2"
            >
              {submitting ? "Posting..." : "Post Message"}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-text-muted animate-pulse">Loading discussions...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-surface-2 rounded-3xl border border-dashed border-surface-3">
            <MessageSquare className="w-12 h-12 text-surface-3 mx-auto mb-4" />
            <p className="text-navy font-bold">No discussions yet.</p>
            <p className="text-xs text-text-muted">Be the first to say something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-3xl border border-surface-3 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-2 border border-surface-3 flex items-center justify-center text-navy font-bold">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-navy text-sm">{post.authorName}</h5>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
