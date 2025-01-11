import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, X, Calendar, User, BookOpen, Tag, Image, FileType } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleAdd = () => {
  const navigate = useNavigate();
  const quillRef = useRef();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    publishedDate: '',
    articleType: 'OUR_ARTICLE',
  });
  const [imageFile, setImageFile] = useState(null);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align'
  ];

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
    if (imageFile) {
      submitData.append('imageFile', imageFile);
    }

    try {
      await axios.post('http://localhost:8081/api/articles', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Article added successfully');
      navigate('/admin/media');
    } catch (error) {
      console.error('Error adding article:', error);
      toast.error('Failed to add article');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <PenLine className="w-8 h-8" />
            Create New Article
          </h1>
          <p className="text-slate-100 mt-2">Share your thoughts with the world</p>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#168187]" />
                Article Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                placeholder="Enter a compelling title..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Brief Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200 min-h-[100px]"
                placeholder="Write a short description..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-semibold text-slate-700">
                Article Content
              </label>
              <div className="border rounded-lg border-slate-200" style={{ minHeight: '400px' }}>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => {
                    
                    setFormData(prev => ({ ...prev, content }));
                }}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your article content here..."
                  style={{ height: '350px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Image className="w-4 h-4 text-[#168187]" />
                  Article Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="articleType" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FileType className="w-4 h-4 text-[#168187]" />
                  Article Type
                </label>
                <select
                  id="articleType"
                  value={formData.articleType}
                  onChange={(e) => setFormData({ ...formData, articleType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="OUR_ARTICLE">Our Article</option>
                  <option value="PARTNER_ARTICLE">Our Partner</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#168187]" />
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#168187]" />
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="publishedDate" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#168187]" />
                  Publish Date
                </label>
                <input
                  id="publishedDate"
                  type="datetime-local"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#168187] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
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
                Publish Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleAdd;
