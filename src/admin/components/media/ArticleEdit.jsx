import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PenLine, X, Calendar, User, BookOpen, Tag, Image, FileType } from 'lucide-react';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';

const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    publishedDate: '',
    articleType: 'OUR_ARTICLE',
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/articles/${id}`);
        const article = response.data;
        setFormData({
          title: article.title,
          description: article.description,
          content: article.content,
          author: article.author,
          category: article.category,
          publishedDate: article.publishedDate,
          articleType: article.articleType,
        });
        setCurrentImage(article.imageUrl);
      } catch (error) {
        console.error('Error fetching article:', error);
        toast.error('Failed to load article details');
      }
    };
    fetchArticle();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    const articleData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      publishedDate: formData.publishedDate,
      articleType: formData.articleType,
    };

    submitData.append('article', new Blob([JSON.stringify(articleData)], { type: 'application/json' }));
    if (newImage) {
      submitData.append('imageFile', newImage);
    }

    try {
      await axios.put(`http://localhost:8081/api/articles/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Article updated successfully');
      navigate('/admin/media');
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <PenLine className="w-8 h-8" />
            Edit Article
          </h1>
          <p className="text-slate-100 mt-2">Update your article details below</p>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#168187]" />
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                required
              />
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Image className="w-4 h-4 text-[#168187]" />
                Article Image
              </label>
              
              {/* Current Image Preview */}
              {(currentImage || imagePreview) && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={imagePreview || currentImage}
                    alt="Article preview"
                    className="max-w-md h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {/* Image Upload Input */}
              <div className="mt-2">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="articleType" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileType className="w-4 h-4 text-[#168187]" />
                Article Type
              </label>
              <select
                id="articleType"
                value={formData.articleType}
                onChange={(e) => setFormData({ ...formData, articleType: e.target.value })}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                required
              >
                <option value="OUR_ARTICLE">Our Article</option>
                <option value="OUR_PARTNER">Our Partner</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent min-h-[100px]"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                Content
              </label>
              <ReactQuill
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                className="react-quill"
                placeholder="Write your article content here..."
                theme="snow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#168187]" />
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#168187]" />
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="publishedDate" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#168187]" />
                  Published Date
                </label>
                <input
                  id="publishedDate"
                  type="datetime-local"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#168187] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/media')}
                className="px-6 py-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#168187] text-white hover:bg-[#136e73] transition-colors duration-200 flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Update Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
