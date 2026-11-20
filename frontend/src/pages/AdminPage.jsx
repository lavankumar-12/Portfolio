import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  FileText,
  FolderKanban,
  Award,
  Briefcase,
  Layers,
  Trophy,
  Code2,
  Mail,
  KeyRound,
  LogOut,
  ExternalLink,
  Database,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Menu,
  X,
} from 'lucide-react';
import { api, getAdminToken, clearAdminToken } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { AdminLogin } from '../components/admin/AdminLogin';
import { ProfileManager } from '../components/admin/ProfileManager';
import { ResumeManager } from '../components/admin/ResumeManager';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { CertificatesManager } from '../components/admin/CertificatesManager';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { AchievementsManager } from '../components/admin/AchievementsManager';
import { CodingProfilesManager } from '../components/admin/CodingProfilesManager';
import { MessagesManager } from '../components/admin/MessagesManager';
import { SecurityManager } from '../components/admin/SecurityManager';

export const AdminPage = () => {
  const { refreshData: refreshPublicPortfolio } = usePortfolio();
  const [admin, setAdmin] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState({ apiReachable: false, dbConnected: false });

  const [profileData, setProfileData] = useState({});
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [codingProfiles, setCodingProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = useCallback((text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const checkHealth = useCallback(async () => {
    try {
      const res = await api.health();
      setDbStatus({ apiReachable: true, dbConnected: Boolean(res.dbConnected) });
    } catch {
      setDbStatus({ apiReachable: false, dbConnected: false });
    }
  }, []);

  const fetchAllAdminData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [prof, p, c, e, s, a, cp, m] = await Promise.all([
        api.getProfile(true),
        api.getProjects(true),
        api.getCertificates(true),
        api.getExperience(true),
        api.getSkills(true),
        api.getAchievements(true),
        api.getCodingProfiles(true),
        api.getMessages(),
      ]);
      setProfileData(prof || {});
      setProjects(p);
      setCertificates(c);
      setExperiences(e);
      setSkills(s);
      setAchievements(a);
      setCodingProfiles(cp);
      setMessages(m);
      refreshPublicPortfolio();
    } catch (err) {
      if (err.status === 401) {
        clearAdminToken();
        setAdmin(null);
      } else {
        notify(err.message, 'error');
      }
    } finally {
      setLoadingData(false);
    }
  }, [notify, refreshPublicPortfolio]);

  useEffect(() => {
    const init = async () => {
      await checkHealth();
      const token = getAdminToken();
      if (token) {
        try {
          const res = await api.verifyAuth();
          setAdmin(res.admin);
        } catch {
          clearAdminToken();
        }
      }
      setCheckingAuth(false);
    };
    init();
  }, [checkHealth]);

  useEffect(() => {
    if (admin && dbStatus.dbConnected) {
      fetchAllAdminData();
    }
  }, [admin, dbStatus.dbConnected, fetchAllAdminData]);

  const handleLogout = () => {
    clearAdminToken();
    setAdmin(null);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await api.seedDatabase(false);
      const count = Object.keys(res.seeded || {}).length;
      if (count > 0) {
        notify('Default portfolio data seeded into MongoDB Atlas!', 'success');
      } else {
        notify('Database already has entries.', 'success');
      }
      await fetchAllAdminData();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSeeding(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF2E63]" />
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLoginSuccess={(u) => setAdmin(u)} dbStatus={dbStatus} />;
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length },
    { id: 'skills', label: 'Skills', icon: Layers, count: skills.length },
    { id: 'coding-profiles', label: 'Coding Profiles', icon: Code2, count: codingProfiles.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: achievements.length },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadCount },
    { id: 'security', label: 'Password', icon: KeyRound },
  ];

  const activeNavObj = navItems.find((n) => n.id === activeTab) || navItems[0];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0B0C14] border-r border-slate-200 dark:border-white/10">
      {/* Sidebar Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div>
          <Link to="/" className="font-black text-lg tracking-wider uppercase block">
            <span className="bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] bg-clip-text text-transparent">
              LAVAN
            </span>
            <span className="text-slate-900 dark:text-white">.DEV</span>
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus.dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{dbStatus.dbConnected ? 'MongoDB Atlas Live' : 'DB Not Connected'}</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Vertical Nav Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Content Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white shadow-[0_0_18px_rgba(255,46,99,0.35)]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </span>
              {item.badge > 0 ? (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-[#FF2E63]' : 'bg-[#FF2E63] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : item.count !== undefined ? (
                <span
                  className={`text-xs font-mono ${
                    isActive ? 'text-white/90' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {item.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Actions */}
      <div className="p-3 border-t border-slate-200 dark:border-white/10 space-y-2">
        <button
          onClick={handleSeed}
          disabled={seeding || !dbStatus.dbConnected}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:border-cyan-400 disabled:opacity-50 transition-colors"
        >
          {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          Seed Default Data
        </button>

        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141622] text-xs font-semibold text-slate-800 dark:text-white hover:border-[#FF2E63] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Live Portfolio
        </Link>

        <div className="flex items-center gap-2 pt-1">
          <ThemeToggle className="shrink-0" />
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex overflow-hidden bg-light-secondary dark:bg-dark-bg text-light-body dark:text-dark-body transition-colors">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-sm font-medium ${
            toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-500'
              : 'bg-emerald-600 text-white border-emerald-500'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Desktop Left Fixed Sidebar (Always fixed at viewport height, never scrolls away) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <aside className="relative w-64 max-w-[82vw] h-full z-10 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area (Right side - Independently scrollable workspace) */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto flex flex-col">
        {/* Top Utility Header */}
        <header className="sticky top-0 z-30 shrink-0 h-16 px-4 sm:px-8 bg-white/90 dark:bg-[#0D0E16]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
              aria-label="Open admin navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-light-heading dark:text-white flex items-center gap-2">
                {activeNavObj.label}
              </h1>
            </div>
          </div>

          <button
            onClick={fetchAllAdminData}
            disabled={loadingData || !dbStatus.dbConnected}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141622] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-cyan-400 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Sync MongoDB</span>
          </button>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* DB Warning Banner if Atlas URI is missing */}
          {!dbStatus.dbConnected && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-3">
              <Database className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">MongoDB Atlas connection required to save data</p>
                <p>
                  Open <code className="font-mono px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">backend/.env</code>, paste your MongoDB Atlas <code className="font-mono">MONGODB_URI</code>, and restart the backend with <code className="font-mono">cd backend &amp;&amp; npm run dev</code>.
                </p>
              </div>
            </div>
          )}

          {/* Active Manager Panel */}
          {activeTab === 'profile' && (
            <ProfileManager
              profileData={profileData}
              onRefresh={fetchAllAdminData}
              notify={notify}
            />
          )}
          {activeTab === 'resume' && (
            <ResumeManager
              profileData={profileData}
              onRefresh={fetchAllAdminData}
              notify={notify}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsManager items={projects} onRefresh={fetchAllAdminData} notify={notify} />
          )}
          {activeTab === 'certificates' && (
            <CertificatesManager
              items={certificates}
              onRefresh={fetchAllAdminData}
              notify={notify}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceManager items={experiences} onRefresh={fetchAllAdminData} notify={notify} />
          )}
          {activeTab === 'skills' && (
            <SkillsManager items={skills} onRefresh={fetchAllAdminData} notify={notify} />
          )}
          {activeTab === 'coding-profiles' && (
            <CodingProfilesManager
              items={codingProfiles}
              onRefresh={fetchAllAdminData}
              notify={notify}
            />
          )}
          {activeTab === 'achievements' && (
            <AchievementsManager
              items={achievements}
              onRefresh={fetchAllAdminData}
              notify={notify}
            />
          )}
          {activeTab === 'messages' && (
            <MessagesManager items={messages} onRefresh={fetchAllAdminData} notify={notify} />
          )}
          {activeTab === 'security' && (
            <SecurityManager
              admin={admin}
              onAdminUpdated={(updatedAdmin) => setAdmin(updatedAdmin)}
              notify={notify}
            />
          )}
        </main>
      </div>
    </div>
  );
};
