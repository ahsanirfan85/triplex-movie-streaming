import Userfront from "@userfront/core"

export const createComment = async (text, parent_id = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parent_id,
    user_id: Userfront.user.userId,
    // createdAt: new Date().toISOString(),
  }
}

export const updateComment = async (text) => {
  return { text }
}

export const deleteComment = async () => {
  return {}
}
