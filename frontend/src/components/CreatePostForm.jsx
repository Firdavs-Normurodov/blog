import { Plus, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const CreatePostForm = ({ 
  isCreatingPost, 
  setIsCreatingPost, 
  postData, 
  setPostData, 
  postPreviewUrl, 
  setPostPreviewUrl, 
  fetchUserPosts,
  createPost 
}) => {
  const handlePostInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      const file = files[0];
      setPostData(prev => ({ ...prev, picture: file }));
      setPostPreviewUrl(URL.createObjectURL(file));
    } else {
      setPostData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('description', postData.description);
      if (postData.picture) {
        formData.append('picture', postData.picture);
      }

      await createPost(formData);
      toast.success('Post created successfully');

      // Reset form
      setPostData({
        title: '',
        content: '',
        description: '',
        picture: null
      });
      setPostPreviewUrl('');
      setIsCreatingPost(false);

      // Refresh posts
      fetchUserPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Post</h2>
        <button
          onClick={() => setIsCreatingPost(!isCreatingPost)}
          className="px-4 py-2 bg-colorT text-white rounded-xl hover:bg-colorT/90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-colorT/20"
        >
          <Plus size={20} />
          <span>{isCreatingPost ? 'Cancel' : 'New Post'}</span>
        </button>
      </div>

      {isCreatingPost && (
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handlePostInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-colorT focus:border-colorT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={postData.description}
              onChange={handlePostInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-colorT focus:border-colorT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handlePostInputChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-colorT focus:border-colorT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Picture
              <span className="text-gray-500 text-sm ml-2">(Required)</span>
            </label>
            <div className="mt-1">
              <input
                type="file"
                name="picture"
                onChange={handlePostInputChange}
                className="hidden"
                id="post-picture-input"
                required
              />
              <label
                htmlFor="post-picture-input"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-colorT transition-colors"
              >
                {postPreviewUrl ? (
                  <img
                    src={postPreviewUrl}
                    alt="Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">Click to upload image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-colorT text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Create Post
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePostForm;