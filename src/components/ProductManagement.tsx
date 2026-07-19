import { useState } from 'react';

export function ProductManagement() {
  const [activeTab, setActiveTab] = useState('상품');
  const tabs = ['상품', '카테고리', '브랜드', '옵션', '리뷰'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Product Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage inventory, update pricing, and control visibility across the platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Product
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Search Keyword</label>
            <input type="text" placeholder="Name or Code..." className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none bg-surface-container-low" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none bg-surface-container-low">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Apparel</option>
              <option>Home Goods</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Brand</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none bg-surface-container-low">
              <option>All Brands</option>
              <option>Brand A</option>
              <option>Brand B</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Stock Status</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none bg-surface-container-low">
              <option>All Statuses</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2 border border-outline-variant text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-low transition-colors">Reset</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Apply Filters</button>
        </div>
      </div>

      {/* Toolbar & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <span className="text-sm text-on-surface-variant">Selected: <strong className="text-primary">0</strong> items</span>
            <div className="h-4 w-px bg-outline-variant mx-1"></div>
            <button className="flex items-center gap-1 text-on-surface hover:text-rose-500 transition-colors text-sm font-medium disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[16px]">delete</span> Delete
            </button>
            <button className="flex items-center gap-1 text-on-surface hover:text-secondary transition-colors text-sm font-medium disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[16px]">content_copy</span> Copy
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">download</span> Excel Download
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant">
              <tr>
                <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></th>
                <th className="p-3 font-semibold">Product Info</th>
                <th className="p-3 font-semibold">Code</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold text-right">Price</th>
                <th className="p-3 font-semibold text-center">Stock Status</th>
                <th className="p-3 font-semibold text-center">Visibility</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="p-3 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="p-3 min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-outline-variant bg-surface-container shrink-0 overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJPMODBP3OkKNXt52-vd5gMLJSqMFPj3On8o2bcCqXqqho2TFCa3PBc3x2a-W7cGr0d5AqTlpfczV_IIeU81U_eutRSrrAuqCpBJy9IbmI0wQrWLAbI_-2dovZxDkr6L_mTrwEUGGO65P_p1Fo1frOtDmOC93FQ1vaK2mNAOVeY1lFOgJCQH2VqB0j5MCX3nWeS5C6PtV0t-bGZ5TvVM3jnCWuJQtynHPQ1X9fcP3VQyr8cOcLhWTmxQ" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">Aura Wireless Headphones</span>
                      <span className="text-xs text-on-surface-variant">Brand: SonicTech</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono text-xs text-on-surface-variant">PRD-8902-WK</td>
                <td className="p-3 text-on-surface-variant">Electronics</td>
                <td className="p-3 text-right font-medium">$249.99</td>
                <td className="p-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wide">In Stock</span></td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant text-[10px] uppercase">
                    <span className="material-symbols-outlined text-[12px]">visibility</span> Visible
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="p-1 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                </td>
              </tr>
              
              <tr className="hover:bg-surface-container-low transition-colors group bg-surface-bright">
                <td className="p-3 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="p-3 min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-outline-variant bg-surface-container shrink-0 overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVHc7e3rKh9XJqQP4921n96GRglQmgyXZsd30iwXQ5WVkhaW7gbD6KgczXmRPT6Fdd1l6oq4iJfP2VblLh5yO7ZElwCe-fxNy_BHHv4SQdwyW-f-3WaAx1DWowkOdQUJdt6ZIbbT_VkD6NHlYtGozKe08-S--dyD1aooJalvyoxtp4j9QMm2XUUSZGwXFRccJwPVNVtUc31IOibsJhBwMDHKpDT6y7vLhZWc_dyXO8vDAjXb3c___AVw" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">Mechanical Keyboard Pro</span>
                      <span className="text-xs text-on-surface-variant">Brand: TypeMaster</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono text-xs text-on-surface-variant">PRD-1104-KB</td>
                <td className="p-3 text-on-surface-variant">Electronics</td>
                <td className="p-3 text-right font-medium">$129.50</td>
                <td className="p-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] uppercase font-bold tracking-wide">Out of Stock</span></td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant text-[10px] uppercase opacity-70">
                    <span className="material-symbols-outlined text-[12px]">visibility_off</span> Hidden
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="p-1 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="p-3 text-center"><input type="checkbox" className="rounded border-outline-variant text-secondary" /></td>
                <td className="p-3 min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-outline-variant bg-surface-container shrink-0 overflow-hidden flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">image_not_supported</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">Ergonomic Office Chair</span>
                      <span className="text-xs text-on-surface-variant">Brand: SitWell</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono text-xs text-on-surface-variant">PRD-4450-OC</td>
                <td className="p-3 text-on-surface-variant">Furniture</td>
                <td className="p-3 text-right font-medium">$399.00</td>
                <td className="p-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wide">In Stock</span></td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant text-[10px] uppercase">
                    <span className="material-symbols-outlined text-[12px]">visibility</span> Visible
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="p-1 text-on-surface-variant hover:text-secondary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low/50">
          <span className="text-xs text-on-surface-variant">Showing 1 to 10 of 256 entries</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant disabled:opacity-50" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 rounded-md bg-secondary text-white text-sm font-medium flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container text-on-surface text-sm font-medium flex items-center justify-center transition-colors">26</button>
            <button className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
}
