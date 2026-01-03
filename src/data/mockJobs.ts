import { Job, JobRole, City, JobsResponse, Company } from "@/types/job";

export const mockJobRoles: JobRole[] = [
  { id: "1", name: "Accounting and Finance", slug: "accounting-and-finance", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "2", name: "Android Developer", slug: "android-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "3", name: "Architecture and Engineering", slug: "architecture-and-engineering", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "4", name: "Backend Developer", slug: "backend-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "5", name: "Data Analyst", slug: "data-analyst", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "6", name: "DevOps Engineer", slug: "devops-engineer", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "7", name: "Frontend Developer", slug: "frontend-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
  { id: "8", name: "UI/UX Designer", slug: "ui-ux-designer", created_at: "2025-01-01", updated_at: "2025-01-01" },
];

export const mockCities: City[] = [
  { id: "1", province_id: "1", name: "Garut", province: { id: "1", name: "Jawa Barat" }, job_count: 45 },
  { id: "2", province_id: "1", name: "Sukabumi", province: { id: "1", name: "Jawa Barat" }, job_count: 32 },
  { id: "3", province_id: "1", name: "Tasikmalaya", province: { id: "1", name: "Jawa Barat" }, job_count: 28 },
  { id: "4", province_id: "1", name: "Bandung", province: { id: "1", name: "Jawa Barat" }, job_count: 150 },
  { id: "5", province_id: "2", name: "Jakarta Selatan", province: { id: "2", name: "DKI Jakarta" }, job_count: 200 },
  { id: "6", province_id: "2", name: "Jakarta Pusat", province: { id: "2", name: "DKI Jakarta" }, job_count: 180 },
  { id: "7", province_id: "3", name: "Surabaya", province: { id: "3", name: "Jawa Timur" }, job_count: 120 },
  { id: "8", province_id: "4", name: "Yogyakarta", province: { id: "4", name: "DI Yogyakarta" }, job_count: 80 },
];

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "FinTech Innovations",
    slug: "fintech-innovations",
    description: "Perusahaan teknologi finansial yang fokus pada solusi pembayaran digital dan perbankan modern.",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=600&q=80",
    employee_size: "fifty_one_to_two_hundred",
    business_sector: "Fintech",
    website_url: "https://fintechinnovations.com",
    job_count: 12,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "2",
    name: "Digital Creative Agency",
    slug: "digital-creative-agency",
    description: "Agency kreatif digital yang menyediakan layanan desain dan pengembangan web",
    logo: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=600&q=80",
    employee_size: "eleven_to_fifty",
    business_sector: "Design & Creative",
    website_url: "https://digitalcreative.com",
    job_count: 8,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "3",
    name: "Tech Solutions Indonesia",
    slug: "tech-solutions-indonesia",
    description: "Penyedia solusi teknologi enterprise untuk perusahaan besar di Indonesia.",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    employee_size: "two_hundred_one_to_five_hundred",
    business_sector: "Information Technology",
    website_url: "https://techsolutions.co.id",
    job_count: 25,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    company_id: "1",
    job_role_id: "7",
    city_id: "3",
    title: "Full-Stack Developer (FinTech)",
    slug: "full-stack-developer-fintech",
    job_type: "full_time",
    work_system: "remote",
    education_level: "bachelor",
    min_years_of_experience: 4,
    max_years_of_experience: 6,
    description: "FinTech Innovations mencari Full-Stack Developer yang berpengalaman untuk bergabung dengan tim teknologi kami. Anda akan mengembangkan platform pembayaran digital yang melayani jutaan pengguna.",
    requirements: "• Pengalaman 4+ tahun dengan React dan Node.js\n• Memahami arsitektur microservices\n• Pengalaman dengan database SQL dan NoSQL\n• Familiar dengan cloud services (AWS/GCP)\n• Kemampuan problem-solving yang baik\n• Pengalaman di industri fintech menjadi nilai plus",
    salary_min: "20000000",
    salary_max: "35000000",
    talent_quota: 2,
    job_url: "https://fintechinnovations.com/careers/fullstack",
    contact_name: "HR FinTech",
    contact_email: "careers@fintechinnovations.com",
    contact_phone: "+6221-1234-5678",
    status: "published",
    expiration_date: "2026-02-28T00:00:00.000Z",
    created_at: "2026-01-02T10:30:00.000Z",
    updated_at: "2026-01-02T10:30:00.000Z",
    medias: [
      {
        id: "m1",
        job_id: "1",
        path: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "1",
      name: "FinTech Innovations",
      slug: "fintech-innovations",
      description: "Perusahaan teknologi finansial yang fokus pada solusi pembayaran digital dan perbankan modern.",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=600&q=80",
      employee_size: "fifty_one_to_two_hundred",
      business_sector: "Fintech",
      website_url: "https://fintechinnovations.com",
      job_count: 12,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "7", name: "Frontend Developer", slug: "frontend-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "3", province_id: "1", name: "Tasikmalaya", province: { id: "1", name: "Jawa Barat" }, job_count: 28 },
  },
  {
    id: "2",
    company_id: "2",
    job_role_id: "8",
    city_id: "1",
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    job_type: "full_time",
    work_system: "remote",
    education_level: "bachelor",
    min_years_of_experience: 2,
    max_years_of_experience: 4,
    description: "Digital Creative Agency mencari UI/UX Designer yang kreatif dan berpengalaman untuk bergabung dengan tim kami. Anda akan bertanggung jawab atas desain antarmuka pengguna untuk berbagai proyek klien.",
    requirements: "• Portfolio yang kuat\n• Pengalaman dengan Figma, Sketch, atau Adobe XD\n• Memahami prinsip desain yang berpusat pada pengguna\n• Kemampuan membuat prototipe interaktif\n• Pengalaman dengan user research dan testing\n• Kemampuan berkolaborasi dengan tim pengembang",
    salary_min: "12000000",
    salary_max: "18000000",
    talent_quota: 1,
    job_url: "https://digitalcreative.com/careers/ui-ux-designer",
    contact_name: "Creative Director",
    contact_email: "jobs@digitalcreative.com",
    contact_phone: "+6222-3456-7890",
    status: "published",
    expiration_date: "2026-02-17T06:54:49.000Z",
    created_at: "2026-01-02T08:00:00.000Z",
    updated_at: "2026-01-02T08:00:00.000Z",
    medias: [
      {
        id: "m2",
        job_id: "2",
        path: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "2",
      name: "Digital Creative Agency",
      slug: "digital-creative-agency",
      description: "Agency kreatif digital yang menyediakan layanan desain dan pengembangan web",
      logo: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=600&q=80",
      employee_size: "eleven_to_fifty",
      business_sector: "Design & Creative",
      website_url: "https://digitalcreative.com",
      job_count: 8,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "8", name: "UI/UX Designer", slug: "ui-ux-designer", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "1", province_id: "1", name: "Garut", province: { id: "1", name: "Jawa Barat" }, job_count: 45 },
  },
  {
    id: "3",
    company_id: "3",
    job_role_id: "7",
    city_id: "2",
    title: "Senior Front-End Web Developer",
    slug: "senior-front-end-web-developer",
    job_type: "full_time",
    work_system: "hybrid",
    education_level: "bachelor",
    min_years_of_experience: 3,
    max_years_of_experience: 5,
    description: "Tech Solutions Indonesia mencari Senior Front-End Web Developer untuk memimpin tim pengembangan web dan membangun aplikasi enterprise berkualitas tinggi.",
    requirements: "• Pengalaman 3+ tahun dengan React/Vue.js\n• Mahir TypeScript\n• Pengalaman memimpin tim kecil\n• Memahami best practices frontend\n• Familiar dengan CI/CD\n• Kemampuan mentoring junior developer",
    salary_min: "15000000",
    salary_max: "25000000",
    talent_quota: 1,
    job_url: "https://techsolutions.co.id/careers/senior-frontend",
    contact_name: "HR Tech Solutions",
    contact_email: "hr@techsolutions.co.id",
    contact_phone: "+6221-9876-5432",
    status: "published",
    expiration_date: "2026-03-15T00:00:00.000Z",
    created_at: "2026-01-02T06:00:00.000Z",
    updated_at: "2026-01-02T06:00:00.000Z",
    medias: [
      {
        id: "m3",
        job_id: "3",
        path: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "3",
      name: "Tech Solutions Indonesia",
      slug: "tech-solutions-indonesia",
      description: "Penyedia solusi teknologi enterprise untuk perusahaan besar di Indonesia.",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      employee_size: "two_hundred_one_to_five_hundred",
      business_sector: "Information Technology",
      website_url: "https://techsolutions.co.id",
      job_count: 25,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "7", name: "Frontend Developer", slug: "frontend-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "2", province_id: "1", name: "Sukabumi", province: { id: "1", name: "Jawa Barat" }, job_count: 32 },
  },
  {
    id: "4",
    company_id: "1",
    job_role_id: "4",
    city_id: "5",
    title: "Backend Developer",
    slug: "backend-developer-fintech",
    job_type: "full_time",
    work_system: "remote",
    education_level: "bachelor",
    min_years_of_experience: 2,
    max_years_of_experience: 4,
    description: "Bergabunglah dengan tim engineering FinTech Innovations untuk mengembangkan sistem backend yang handal dan skalabel.",
    requirements: "• 2+ tahun pengalaman dengan Go/Java/Node.js\n• Memahami konsep microservices\n• Pengalaman dengan PostgreSQL/MongoDB\n• Familiar dengan message queue (RabbitMQ/Kafka)\n• Memahami security best practices",
    salary_min: "14000000",
    salary_max: "22000000",
    talent_quota: 3,
    job_url: "https://fintechinnovations.com/careers/backend",
    contact_name: "Engineering Lead",
    contact_email: "engineering@fintechinnovations.com",
    contact_phone: "+6221-1234-5679",
    status: "published",
    expiration_date: "2026-02-20T00:00:00.000Z",
    created_at: "2026-01-01T14:00:00.000Z",
    updated_at: "2026-01-01T14:00:00.000Z",
    medias: [
      {
        id: "m4",
        job_id: "4",
        path: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "1",
      name: "FinTech Innovations",
      slug: "fintech-innovations",
      description: "Perusahaan teknologi finansial yang fokus pada solusi pembayaran digital dan perbankan modern.",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=600&q=80",
      employee_size: "fifty_one_to_two_hundred",
      business_sector: "Fintech",
      website_url: "https://fintechinnovations.com",
      job_count: 12,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "4", name: "Backend Developer", slug: "backend-developer", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "5", province_id: "2", name: "Jakarta Selatan", province: { id: "2", name: "DKI Jakarta" }, job_count: 200 },
  },
  {
    id: "5",
    company_id: "2",
    job_role_id: "5",
    city_id: "4",
    title: "Data Analyst",
    slug: "data-analyst-creative",
    job_type: "full_time",
    work_system: "onsite",
    education_level: "bachelor",
    min_years_of_experience: 1,
    max_years_of_experience: 3,
    description: "Digital Creative Agency mencari Data Analyst untuk menganalisis performa campaign dan memberikan insights berbasis data.",
    requirements: "• Pengalaman dengan SQL dan Python\n• Familiar dengan tools visualisasi (Tableau/Power BI)\n• Memahami statistik dasar\n• Kemampuan presentasi yang baik\n• Pengalaman di agency menjadi nilai plus",
    salary_min: "8000000",
    salary_max: "14000000",
    talent_quota: 2,
    job_url: "https://digitalcreative.com/careers/data-analyst",
    contact_name: "Analytics Manager",
    contact_email: "analytics@digitalcreative.com",
    contact_phone: "+6222-3456-7891",
    status: "published",
    expiration_date: "2026-02-10T00:00:00.000Z",
    created_at: "2026-01-01T10:00:00.000Z",
    updated_at: "2026-01-01T10:00:00.000Z",
    medias: [
      {
        id: "m5",
        job_id: "5",
        path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "2",
      name: "Digital Creative Agency",
      slug: "digital-creative-agency",
      description: "Agency kreatif digital yang menyediakan layanan desain dan pengembangan web",
      logo: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=600&q=80",
      employee_size: "eleven_to_fifty",
      business_sector: "Design & Creative",
      website_url: "https://digitalcreative.com",
      job_count: 8,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "5", name: "Data Analyst", slug: "data-analyst", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "4", province_id: "1", name: "Bandung", province: { id: "1", name: "Jawa Barat" }, job_count: 150 },
  },
  {
    id: "6",
    company_id: "3",
    job_role_id: "6",
    city_id: "8",
    title: "DevOps Engineer",
    slug: "devops-engineer-tech",
    job_type: "full_time",
    work_system: "hybrid",
    education_level: "bachelor",
    min_years_of_experience: 3,
    max_years_of_experience: 5,
    description: "Tech Solutions Indonesia mencari DevOps Engineer untuk mengelola infrastruktur cloud dan pipeline CI/CD.",
    requirements: "• 3+ tahun pengalaman DevOps\n• Expert di AWS/GCP\n• Mahir Terraform/Ansible\n• Pengalaman dengan Kubernetes\n• Memahami security best practices\n• Sertifikasi cloud menjadi nilai plus",
    salary_min: "18000000",
    salary_max: "28000000",
    talent_quota: 1,
    job_url: "https://techsolutions.co.id/careers/devops",
    contact_name: "Infrastructure Lead",
    contact_email: "infra@techsolutions.co.id",
    contact_phone: "+6221-9876-5433",
    status: "published",
    expiration_date: "2026-03-01T00:00:00.000Z",
    created_at: "2025-12-28T09:00:00.000Z",
    updated_at: "2025-12-28T09:00:00.000Z",
    medias: [
      {
        id: "m6",
        job_id: "6",
        path: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    company: {
      id: "3",
      name: "Tech Solutions Indonesia",
      slug: "tech-solutions-indonesia",
      description: "Penyedia solusi teknologi enterprise untuk perusahaan besar di Indonesia.",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      employee_size: "two_hundred_one_to_five_hundred",
      business_sector: "Information Technology",
      website_url: "https://techsolutions.co.id",
      job_count: 25,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
    },
    job_role: { id: "6", name: "DevOps Engineer", slug: "devops-engineer", created_at: "2025-01-01", updated_at: "2025-01-01" },
    city: { id: "8", province_id: "4", name: "Yogyakarta", province: { id: "4", name: "DI Yogyakarta" }, job_count: 80 },
  },
];

export const getMockJobsResponse = (filters: {
  page?: number;
  per_page?: number;
  q?: string;
  job_type?: string;
  work_system?: string;
  job_role_id?: string;
  city_id?: string;
  company_id?: string;
  experience_min?: number;
  salary_min?: number;
  education_level?: string;
}): JobsResponse => {
  let filteredJobs = [...mockJobs];

  // Apply search filter
  if (filters.q) {
    const query = filters.q.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query)
    );
  }

  // Apply job type filter
  if (filters.job_type) {
    filteredJobs = filteredJobs.filter((job) => job.job_type === filters.job_type);
  }

  // Apply work system filter
  if (filters.work_system) {
    filteredJobs = filteredJobs.filter((job) => job.work_system === filters.work_system);
  }

  // Apply job role filter
  if (filters.job_role_id) {
    filteredJobs = filteredJobs.filter((job) => job.job_role_id === filters.job_role_id);
  }

  // Apply city filter
  if (filters.city_id) {
    filteredJobs = filteredJobs.filter((job) => job.city_id === filters.city_id);
  }

  // Apply company filter
  if (filters.company_id) {
    filteredJobs = filteredJobs.filter((job) => job.company_id === filters.company_id);
  }

  // Apply experience filter
  if (filters.experience_min !== undefined) {
    filteredJobs = filteredJobs.filter((job) => job.min_years_of_experience >= filters.experience_min!);
  }

  // Apply salary filter
  if (filters.salary_min !== undefined) {
    filteredJobs = filteredJobs.filter((job) => {
      const salary = typeof job.salary_min === "string" ? parseInt(job.salary_min) : job.salary_min;
      return salary >= filters.salary_min!;
    });
  }

  // Apply education level filter
  if (filters.education_level) {
    filteredJobs = filteredJobs.filter((job) => job.education_level === filters.education_level);
  }

  const page = filters.page || 1;
  const per_page = filters.per_page || 10;
  const total_items = filteredJobs.length;
  const total_pages = Math.ceil(total_items / per_page);
  const start = (page - 1) * per_page;
  const end = start + per_page;

  return {
    data: {
      items: filteredJobs.slice(start, end),
      pagination: {
        page,
        per_page,
        total_items,
        total_pages,
      },
    },
  };
};

export const getMockJobBySlug = (slug: string): Job | undefined => {
  return mockJobs.find((job) => job.slug === slug);
};
