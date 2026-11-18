import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { api, setAdminToken } from '../../services/api';

const getPasswordStrength = (pw) => {
  if (!pw) return { label: '', score: 0, color: 'bg-slate-400' };
  let score = 0;
  if (pw.length >= 6) score += 1;
  if (pw.length >= 10) score += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 1;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score += 1;

  if (score <= 1) return { label: 'Weak', score: 1, color: 'bg-rose-500' };
  if (score === 2) return { label: 'Fair', score: 2, color: 'bg-amber-500' };
  if (score === 3) return { label: 'Good', score: 3, color: 'bg-cyan-400' };
  return { label: 'Strong', score: 4, color: 'bg-emerald-500' };
};

export const SecurityManager = ({ admin, onAdminUpdated, notify }) => {
  const [newEmail, setNewEmail] = useState(admin?.email || 'admin@lavan.dev');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (admin?.email) setNewEmail(admin.email);
  }, [admin]);

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    setSaving(true);
    try {
      const res = await api.changePassword({
        currentPassword,
        newPassword,
        newEmail,
      });

      if (res.token) setAdminToken(res.token);
      if (res.admin && onAdminUpdated) onAdminUpdated(res.admin);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      notify(res.message || 'Admin password updated securely!', 'success');
    } catch (err) {
      setError(err.message || 'Failed to update password');
      notify(err.message || 'Failed to update password', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Info Banner */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Encrypted in MongoDB Atlas</p>
          <p className="mt-0.5 opacity-90">
            Your new admin password is encrypted using bcrypt hashing and saved directly in MongoDB Atlas so it persists automatically across server restarts and deployments.
          </p>
        </div>
      </div>

      {/* Password Update Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-7 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-5"
      >
        <div className="border-b border-light-border dark:border-dark-border pb-4">
          <h2 className="text-lg font-bold text-light-heading dark:text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#FF2E63]" />
            Modify Admin Password
          </h2>
          <p className="text-xs text-light-body dark:text-dark-body mt-0.5">
            Verify your current password and enter a new password to update your admin login credentials.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Admin Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1.5">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-light-body dark:text-dark-body" />
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="admin@lavan.dev"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>
        </div>

        {/* Current Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1.5">
            Current Password *
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-body hover:text-light-heading dark:text-dark-body dark:hover:text-white"
              aria-label="Toggle current password visibility"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white">
            New Password *
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-body hover:text-light-heading dark:text-dark-body dark:hover:text-white"
              aria-label="Toggle new password visibility"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          {newPassword.length > 0 && (
            <div className="space-y-1 pt-0.5">
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1.5 rounded-full transition-colors ${
                      strength.score >= level
                        ? strength.color
                        : 'bg-slate-200 dark:bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-light-body dark:text-dark-body">
                Password strength: <span className="font-bold text-light-heading dark:text-white">{strength.label}</span>
              </p>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1.5">
            Confirm New Password *
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className={`w-full pl-4 pr-11 py-2.5 rounded-xl border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none ${
                passwordsMismatch
                  ? 'border-rose-500'
                  : passwordsMatch
                  ? 'border-emerald-500'
                  : 'border-light-border dark:border-dark-border focus:border-[#FF2E63]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-body hover:text-light-heading dark:text-dark-body dark:hover:text-white"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {passwordsMatch && (
            <p className="mt-1 text-xs text-emerald-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
            </p>
          )}
          {passwordsMismatch && (
            <p className="mt-1 text-xs text-rose-500">Passwords do not match</p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving || passwordsMismatch}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,46,99,0.35)] hover:shadow-[0_0_28px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            <span>{saving ? 'Updating Password...' : 'Update Admin Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
