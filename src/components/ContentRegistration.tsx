import { NavLink } from 'react-router-dom';

export function ContentRegistration() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">New Content Entry</h2>
          <p className="text-sm text-on-surface-variant mt-1">Create and configure a new content article or post.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
            Preview
          </button>
          <button className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm">
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Form Area */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Title <span className="text-rose-500">*</span></label>
                <input type="text" className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 text-sm" placeholder="Enter content title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Category</label>
                  <select className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 text-sm">
                    <option>공지사항 (Notice)</option>
                    <option>FAQ</option>
                    <option>보도자료 (Press)</option>
                    <option>이벤트 (Event)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Author</label>
                  <input type="text" value="System Admin" disabled className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm text-on-surface-variant cursor-not-allowed" />
                </div>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[500px]">
            <div className="p-3 border-b border-outline-variant bg-surface-container-low flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
              <div className="w-px h-4 bg-outline-variant mx-2"></div>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_align_left</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_align_center</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
              <div className="w-px h-4 bg-outline-variant mx-2"></div>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">link</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">image</span></button>
            </div>
            <div className="flex-1 p-4 bg-white text-sm text-on-surface-variant outline-none" contentEditable suppressContentEditableWarning>
              Start typing your content here...
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Attachments</h3>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[32px] text-outline mb-2">upload_file</span>
              <p className="text-sm font-semibold text-on-surface">Click or drag files to upload</p>
              <p className="text-xs text-on-surface-variant mt-1">Supports PDF, DOCX, JPG, PNG (Max 10MB)</p>
            </div>
          </div>
          
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          
          {/* Publishing */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Publishing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface">Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface">Top Fixed (Pinned)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <label className="block text-sm font-medium text-on-surface mb-2">Posting Date</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm text-on-surface" />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Thumbnail Image</h3>
            <div className="aspect-video bg-surface-container rounded-lg border border-outline-variant flex items-center justify-center mb-3 cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[32px] text-outline">image</span>
            </div>
            <p className="text-xs text-center text-on-surface-variant">Recommended size: 1200 x 630px</p>
          </div>

          {/* SEO Meta */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-on-surface">SEO Meta</h3>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">info</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Meta Title</label>
                <input type="text" className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Meta Description</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Keywords</label>
                <input type="text" placeholder="Comma separated" className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-secondary text-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
