import { useState } from 'react';
import { Image, X, Save, Camera, Loader2, Type, FileText, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const EditPostForm = ({ 
  post, 
  setEditingPost, 
  updatePost, 
  fetchUserPosts 
}) => {
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
    description: post.description,
    picture: null
  });
  const [previewUrl, setPreviewUrl] = useState(post.picture);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      const file = files[0];
      setEditData(prev => ({ ...prev, picture: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setEditData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('content', editData.content);
      formData.append('description', editData.description);
      if (editData.picture) {
        formData.append('picture', editData.picture);
      }

      await updatePost(post._id, formData);
      toast.success('Post updated successfully');
      setEditingPost(null);
      fetchUserPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-none sticky top-0 bg-colorT px-8 py-5 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">
              Edit Your Post
            </h2>
          </div>
          <button
            onClick={() => setEditingPost(null)}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 text-white"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Type size={16} />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-colorT focus:ring-2 focus:ring-colorT/20 transition-all duration-200 placeholder-gray-400 text-lg font-medium"
                placeholder="Enter a captivating title..."
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText size={16} />
                Description
              </label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-colorT focus:ring-2 focus:ring-colorT/20 transition-all duration-200 placeholder-gray-400"
                placeholder="Add a brief description to hook your readers..."
                required
              />
            </div>

            {/* Image Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ImageIcon size={16} />
                Featured Image
              </label>
              <div className="relative group">
                <div className="aspect-[2/1] rounded-xl overflow-hidden bg-gray-100 max-h-[180px] ring-1 ring-gray-200">
                  <img
                    src={previewUrl}
                    alt="Post preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-3 right-3 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100">
                  <input
                    type="file"
                    name="picture"
                    id="edit-picture-input"
                    onChange={handleInputChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="edit-picture-input"
                    className="bg-white text-colorT p-2.5 rounded-full shadow-xl cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center"
                    title="Change image"
                  >
                    <Camera size={18} />
                  </label>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText size={16} />
                Content
              </label>
              <textarea
                name="content"
                value={editData.content}
                onChange={handleInputChange}
                rows="8"
                className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-colorT focus:ring-2 focus:ring-colorT/20 transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Share your story..."
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex-none sticky bottom-0 bg-white px-8 py-5 flex justify-end gap-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-colorT text-white hover:bg-colorT/90 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-colorT/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;