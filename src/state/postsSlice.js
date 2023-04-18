import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    initialized: false,
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsSetPosts(state, action) {
            // Set the posts to the payload
            state.initialized = true;
            state.posts = action.payload;
        },
        fetchPostsSetError(state, action) {
            // Set the error to the payload
            state.error = action.payload;
        },
        fetchPostsAddPost(state, action) {
            // Push the new post onto the end of the array
            state.posts.push(action.payload);
        },
        fetchPostsDeletePost(state, action) {
            // Filter out the post with the matching id
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        }
    }
});

export const {
    fetchPostsSetPosts,
    fetchPostsSetError,
    fetchPostsAddPost,
    fetchPostsDeletePost
} = postsSlice.actions;

export default postsSlice.reducer;
