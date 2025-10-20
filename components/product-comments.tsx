"use client"

import { useState } from "react"
import { Star, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Comment } from "@/lib/comments-data"
import { toast } from "sonner"

interface ProductCommentsProps {
  comments: Comment[]
  productId: string
}

export function ProductComments({ comments, productId }: ProductCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [newCommentAuthor, setNewCommentAuthor] = useState("")
  const [newCommentRating, setNewCommentRating] = useState(5)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [replyAuthor, setReplyAuthor] = useState("")
  const [visibleComments, setVisibleComments] = useState(5)

  const handleSubmitComment = () => {
    if (!newComment.trim() || !newCommentAuthor.trim()) {
      toast.error("لطفا نام و متن نظر را وارد کنید")
      return
    }
    toast.success("نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود")
    setNewComment("")
    setNewCommentAuthor("")
    setNewCommentRating(5)
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim() || !replyAuthor.trim()) {
      toast.error("لطفا نام و متن پاسخ را وارد کنید")
      return
    }
    toast.success("پاسخ شما با موفقیت ثبت شد")
    setReplyText("")
    setReplyAuthor("")
    setReplyingTo(null)
  }

  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 5)
  }

  const averageRating = comments.length > 0 ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length : 0
  const displayedComments = comments.slice(0, visibleComments)
  const hasMoreComments = visibleComments < comments.length

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-secondary p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{comments.length} نظر</div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = comments.filter((c) => c.rating === rating).length
              const percentage = comments.length > 0 ? (count / comments.length) * 100 : 0
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-8">{rating} ستاره</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add New Comment */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          نظر خود را بنویسید
        </h3>
        <div className="space-y-4">
          <Input placeholder="نام شما" value={newCommentAuthor} onChange={(e) => setNewCommentAuthor(e.target.value)} />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">امتیاز:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button key={rating} onClick={() => setNewCommentRating(rating)} className="focus:outline-none">
                  <Star
                    className={`h-5 w-5 transition-colors ${rating <= newCommentRating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="نظر خود را در مورد این محصول بنویسید..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmitComment}>
            <Send className="h-4 w-4 ml-2" />
            ارسال نظر
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="font-semibold text-xl text-foreground">نظرات کاربران ({comments.length})</h3>
        {displayedComments.map((comment) => (
          <div key={comment.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{comment.author}</p>
                    <p className="text-sm text-muted-foreground">{comment.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < comment.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">{comment.text}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <MessageCircle className="h-4 w-4 ml-2" />
                  پاسخ
                </Button>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 mr-12 space-y-3 bg-secondary p-4 rounded-lg">
                    <Input placeholder="نام شما" value={replyAuthor} onChange={(e) => setReplyAuthor(e.target.value)} />
                    <Textarea
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                        ارسال پاسخ
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                        انصراف
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mr-12 space-y-4 mt-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={reply.isStore ? "bg-primary text-primary-foreground" : ""}>
                            {reply.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-foreground">{reply.author}</p>
                            {reply.isStore && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                فروشگاه
                              </span>
                            )}
                            <p className="text-xs text-muted-foreground">{reply.date}</p>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {hasMoreComments && (
          <div className="flex justify-center pt-4">
            <Button variant="outline" size="lg" onClick={handleLoadMore}>
              نمایش موارد بیشتر ({comments.length - visibleComments} نظر باقیمانده)
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
