-- ====================================================================
-- BEAUTY OF JOSEON - Supabase Production Database Schema & RLS Security
-- ====================================================================

-- 1. Enable Cryptography Extension for Password Hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- --------------------------------------------------------------------
-- 2. Customer Users Table (고객/회원 DB - 고객 전용)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Client SHA-256 or bcrypt hash
    name TEXT NOT NULL,
    phone TEXT,
    membership_tier TEXT DEFAULT 'SILVER' CHECK (membership_tier IN ('GOLD VIP', 'SILVER', 'BRONZE')),
    points INT DEFAULT 3000,
    coupons INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Customer Table
ALTER TABLE public.customer_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Customer can only view their own profile
CREATE POLICY "Customers can view own profile"
    ON public.customer_users
    FOR SELECT
    USING (auth.uid() = id);

-- Policy 2: Customer can update their own profile
CREATE POLICY "Customers can update own profile"
    ON public.customer_users
    FOR UPDATE
    USING (auth.uid() = id);

-- Policy 3: Allow new customer registration (Sign Up)
CREATE POLICY "Allow public customer registration"
    ON public.customer_users
    FOR INSERT
    WITH CHECK (true);


-- --------------------------------------------------------------------
-- 3. Admin & Staff Users Table (관리자/직원 DB - 고객 접근 철저 차단)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY, -- e.g. 'siteadmin', 'staff_shop'
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('superadmin', 'staff')),
    department TEXT,
    password_hash TEXT NOT NULL, -- SHA-256 Web Crypto Hashed
    is_password_changed BOOLEAN DEFAULT FALSE,
    permissions JSONB NOT NULL DEFAULT '{
        "dashboard": true,
        "site": false,
        "content": false,
        "products": false,
        "shop": false,
        "orders": false,
        "customers": false,
        "system": false
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Admin Table (STRICT ISOLATION)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Only Super Admin (siteadmin) or Authenticated Staff can view Admin Users
CREATE POLICY "Restrict admin users table access to authenticated admins"
    ON public.admin_users
    FOR ALL
    USING (
        (auth.jwt() ->> 'role') = 'superadmin' OR 
        (auth.jwt() ->> 'role') = 'staff'
    );


-- --------------------------------------------------------------------
-- 4. Products Table (제품 & 베스트셀러 DB)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INT NOT NULL CHECK (price >= 0),
    sale_price INT,
    stock INT DEFAULT 100 CHECK (stock >= 0),
    is_bestseller BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT '판매중' CHECK (status IN ('판매중', '품절', '숨김')),
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view active products
CREATE POLICY "Public read active products"
    ON public.products
    FOR SELECT
    USING (status != '숨김');

-- Admin staff can manage products
CREATE POLICY "Staff manage products"
    ON public.products
    FOR ALL
    USING ((auth.jwt() ->> 'role') IN ('superadmin', 'staff'));


-- --------------------------------------------------------------------
-- 5. Orders Table (주문 & 물류 DB)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_id UUID REFERENCES public.customer_users(id),
    total_amount INT NOT NULL,
    status TEXT DEFAULT '주문접수' CHECK (status IN ('주문접수', '배송중', '배송완료', '취소')),
    tracking_number TEXT,
    shipping_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Customers can view their own orders
CREATE POLICY "Customers view own orders"
    ON public.orders
    FOR SELECT
    USING (auth.uid() = customer_id);

-- Staff with logistics/superadmin permission can manage all orders
CREATE POLICY "Staff manage orders"
    ON public.orders
    FOR ALL
    USING ((auth.jwt() ->> 'role') IN ('superadmin', 'staff'));

-- --------------------------------------------------------------------
-- 6. FAQs Table (자주 묻는 질문 DB)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public read FAQs
CREATE POLICY "Public read faqs"
    ON public.faqs
    FOR SELECT
    USING (true);

-- Staff manage FAQs
CREATE POLICY "Staff manage faqs"
    ON public.faqs
    FOR ALL
    USING ((auth.jwt() ->> 'role') IN ('superadmin', 'staff'));


-- --------------------------------------------------------------------
-- 7. Customer Inquiries Table (1:1 고객 온라인 문의 DB)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_inquiries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    category TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT '접수완료' CHECK (status IN ('접수완료', '답변완료')),
    reply_content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    replied_at TIMESTAMPTZ
);

ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;

-- Public / Customer can insert 1:1 inquiries
CREATE POLICY "Public insert inquiries"
    ON public.customer_inquiries
    FOR INSERT
    WITH CHECK (true);

-- Customers view own inquiries by email
CREATE POLICY "Customers view own inquiries"
    ON public.customer_inquiries
    FOR SELECT
    USING (customer_email = current_setting('request.jwt.claims', true)::json ->> 'email');

-- Staff view and reply to all inquiries
CREATE POLICY "Staff manage inquiries"
    ON public.customer_inquiries
    FOR ALL
    USING ((auth.jwt() ->> 'role') IN ('superadmin', 'staff'));

-- ====================================================================
-- End of Schema
-- ====================================================================
