import { useState, useEffect } from 'react';
import { Edit2, User, Mail, Camera } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useBlogStore from '../store/blogStore';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast';
import CreatePostForm from '../components/CreatePostForm';
import UserPosts from '../components/UserPosts';
import EditPostForm from '../components/EditPostForm';

const Profile = () => {
  const { user } = useAuthStore();
  const { getUserPosts, deletePost, createPost, updatePost } = useBlogStore();
  const { updateProfile, deleteAccount } = useUserStore();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(user?.picture);

  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    picture: null
  });

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    description: '',
    picture: null
  });
  const [postPreviewUrl, setPostPreviewUrl] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        picture: null
      });
      setProfilePreviewUrl(user.picture);
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const posts = await getUserPosts(user._id);
      setUserPosts(posts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load your posts');
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deletePost(postId);
        toast.success('Blog post deleted successfully');
        fetchUserPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete the post');
      }
    }
  };

  const handleProfileInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      const file = files[0];
      setProfileData(prev => ({ ...prev, picture: file }));
      setProfilePreviewUrl(URL.createObjectURL(file));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('username', profileData.username);
      data.append('email', profileData.email);
      if (profileData.picture) {
        data.append('picture', profileData.picture);
      }

      await updateProfile(data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-colorT/10 to-white p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-gray-100 rounded-full text-colorT transition-all duration-200"
              >
                <Edit2 size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-colorT focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-colorT focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="relative flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-md">
                      <img
                        src={profilePreviewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input
                      type="file"
                      name="picture"
                      id="profile-picture"
                      onChange={handleProfileInputChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <label
                      htmlFor="profile-picture"
                      className="flex items-center gap-2 px-4 py-2 bg-colorT text-white rounded-lg hover:bg-colorT/90 transition-all duration-200 cursor-pointer"
                    >
                      <Camera size={20} />
                      Change Photo
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-colorT text-white hover:bg-colorT/90 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-lg">
                      <img
                        src={user.picture}
                        alt={user.username}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail size={16} />
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 rounded-lg bg-colorT text-white hover:bg-colorT/90 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Post Form */}
        {editingPost && (
          <EditPostForm
            post={editingPost}
            setEditingPost={setEditingPost}
            updatePost={updatePost}
            fetchUserPosts={fetchUserPosts}
          />
        )}

        {/* Create Post Component */}
        <CreatePostForm
          isCreatingPost={isCreatingPost}
          setIsCreatingPost={setIsCreatingPost}
          postData={postData}
          setPostData={setPostData}
          postPreviewUrl={postPreviewUrl}
          setPostPreviewUrl={setPostPreviewUrl}
          fetchUserPosts={fetchUserPosts}
          createPost={createPost}
        />

        {/* User Posts Component */}
        <UserPosts
          isLoading={isLoading}
          userPosts={userPosts}
          handleDeletePost={handleDeletePost}
          setIsCreatingPost={setIsCreatingPost}
          setEditingPost={setEditingPost}
        />
      </div>
    </div>
  );
};

export default Profile;