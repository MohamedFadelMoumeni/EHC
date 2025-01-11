import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

const MediaSection = ({ title, data, renderItem, hasMore, onToggle, isLoading }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-teal-600">{title}</h2>
    {isLoading ? (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    ) : (
      <>
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No content found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => renderItem(item))}
            </div>
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={onToggle}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-teal-600 hover:bg-slate-100 transition-colors duration-300"
                >
                  {hasMore ? 'Show More' : 'Show Less'}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      hasMore ? '' : 'rotate-180'
                    }`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </>
    )}
  </div>
);

export default MediaSection;