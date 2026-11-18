import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Terminal, AlertCircle, CheckCircle2, Database, Loader2 } from 'lucide-react';
import { api, setAdminToken } from '../../services/api';
import { ThemeToggle } from '../ThemeToggle';

export const AdminLogin = ({ onLoginSuccess, dbStatus }) => {
  const [email, setEmail] = useState('admin@lavan.dev');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login({ email, password });
      setAdminToken(data.token);
      onLoginSuccess(data.admin);
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot reach backend API. Make sure the backend server is running (`cd backend && npm run dev`).'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-light-secondary dark:bg-dark-bg transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Top utility bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-light-body hover:text-light-accent dark:text-dark-body dark:hover:text-dark-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-light-card dark:shadow-dark-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF2E63] to-[#FF5E2B] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,46,99,0.4)]">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-light-heading dark:text-dark-heading">
              Portfolio Admin CMS
            </h1>
            <p className="text-xs sm:text-sm text-light-body dark:text-dark-body">
              Sign in to upload and manage Projects, Certificates, Experience, and Skills.
            </p>
          </div>

          {/* Backend / MongoDB Atlas Health Pill */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              dbStatus.apiReachable && dbStatus.dbConnected
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : dbStatus.apiReachable
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}
          >
            {dbStatus.apiReachable && dbStatus.dbConnected ? (
              <>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Backend API &amp; MongoDB Atlas Connected</span>
              </>
            ) : dbStatus.apiReachable ? (
              <>
                <Database className="w-4 h-4 shrink-0" />
                <span>Backend running, but MongoDB Atlas URI is not configured in backend/.env</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Backend offline. Start it with: <code className="font-mono font-semibold">cd backend &amp;&amp; npm run dev</code></span>
              </>
            )}
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-light-body dark:text-dark-body" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lavan.dev"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading text-sm focus:outline-none focus:ring-2 focus:ring-[#FF2E63]/20 focus:border-[#FF2E63] dark:focus:border-[#FF2E63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-light-body dark:text-dark-body" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading text-sm focus:outline-none focus:ring-2 focus:ring-[#FF2E63]/20 focus:border-[#FF2E63] dark:focus:border-[#FF2E63]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_0_20px_rgba(255,46,99,0.4)] hover:shadow-[0_0_28px_rgba(255,46,99,0.6)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-light-body dark:text-dark-body">
            Credentials are configured in <code className="font-mono px-1 py-0.5 rounded bg-light-surface dark:bg-dark-secondary">backend/.env</code> (default dev: <code className="font-mono">admin@lavan.dev</code> / <code className="font-mono">admin123</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
