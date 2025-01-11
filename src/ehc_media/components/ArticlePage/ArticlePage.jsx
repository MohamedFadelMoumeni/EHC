import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './ArticlePage.css';
import './ArticleContent.css';
import 'react-quill/dist/quill.snow.css';

const ArticlePage = ({ article, onBack }) => {
  return (
    <motion.div 
      className="article-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={onBack}>
        ← Retour
      </button>
      
      <div className="article-content">
        <motion.img 
          src={article.imageUrl} 
          alt={article.title}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="author">Par {article.author}</span>
            <span className="date">
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {article.category && (
              <span className="category">{article.category}</span>
            )}
          </div>
          {article.description && (
            <div className="article-description">
              {article.description}
            </div>
          )}
        </div>

        <div 
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </motion.div>
  );
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string,
    articleType: PropTypes.string
  }).isRequired,
  onBack: PropTypes.func.isRequired
};

export default ArticlePage;