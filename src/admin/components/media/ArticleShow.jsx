import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, User, Calendar, Tag, ArrowLeft, Loader2, FileType } from 'lucide-react';

const ArticleShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article details.');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 flex items-center justify-center">
        <div className="flex items-center gap-2 text-[#168187]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading article details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const getArticleTypeLabel = (type) => {
    switch (type) {
      case 'OUR_ARTICLE':
        return 'Our Articles';
      case 'PARTNER_ARTICLE':
        return 'Partner articles';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#168187] rounded-t-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Article Details
          </h1>
        </div>

        {/* Content Section */}
        {article && (
          <div className="bg-white rounded-b-lg shadow-lg">
            {/* Title Section */}
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800">{article.title}</h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#168187]" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#168187]" />
                  {article.category}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#168187]" />
                  {new Date(article.publishedDate).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <FileType className="w-4 h-4 text-[#168187]" />
                  {getArticleTypeLabel(article.articleType)}
                </div>
              </div>
            </div>

            {/* Image Section */}
            {article.imagePath && (
              <div className="p-8 border-b border-slate-100">
                <img
                  src={`http://localhost:8081/api/uploads/articles/${article.imagePath}`}
                  alt={article.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Description Section */}
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">{article.description}</p>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Content</h3>
              <div className="prose max-w-none text-slate-600">
                {article.content}
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-8 border-t border-slate-100">
              <button
                onClick={() => navigate('/admin/media')}
                className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleShow;