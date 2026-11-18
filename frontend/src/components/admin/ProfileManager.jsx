import React, { useState, useEffect } from 'react';
import {
  User,
  Github,
  Linkedin,
  Mail,
  Save,
  Loader2,
  Upload,
  X,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { api } from '../../services/api';
import { defaultProfile } from '../../context/PortfolioContext';
import defaultAvatar from '../../assets/images/profile.svg';

// Automatically resize & compress profile photos to a crisp 640px retina image (~40-80 KB)
const compressProfileImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        const maxSize = 640;
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/webp', 0.85);
        // Fallback to jpeg if browser doesn't support webp encoding
        resolve(
          compressed.startsWith('data:image/webp')
            ? compressed
            : canvas.toDataURL('image/jpeg', 0.85)
        );
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

export const ProfileManager = ({ profileData, onRefresh, notify }) => {
  const [form, setForm] = useState(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      setForm({ ...defaultProfile, ...profileData });
    }
  }, [profileData]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const optimizedDataUri = await compressProfileImage(file);
      setForm((prev) => ({ ...prev, profilePhoto: optimizedDataUri }));
      notify('Photo optimized for instant loading! Click "Save Profile" to publish it.', 'success');
    } catch (err) {
      // Fallback to raw server upload if needed
      try {
        const res = await api.uploadImage(file);
        setForm((prev) => ({ ...prev, profilePhoto: res.url }));
        notify('Photo uploaded! Click "Save Profile" to publish it.', 'success');
      } catch (uploadErr) {
        notify(uploadErr.message || err.message || 'Photo upload failed', 'error');
      }
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile(form);
      notify('Profile updated and published live!', 'success');
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo & Social Links Highlight Card */}
      <div className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-4">
          <div>
            <h2 className="text-lg font-bold text-light-heading dark:text-dark-heading flex items-center gap-2">
              <User className="w-5 h-5 text-light-accent dark:text-dark-accent" />
              Profile Photo &amp; Social Links
            </h2>
            <p className="text-xs text-light-body dark:text-dark-body mt-0.5">
              Upload your real photo and set your GitHub, LinkedIn, and Email links across the portfolio.
            </p>
          </div>
        </div>

        {/* Profile Photo Upload Block */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary/50 border border-light-border dark:border-dark-border">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#FF2E63]/70 bg-light-bg dark:bg-dark-card shrink-0 shadow-md">
            <img
              src={form.profilePhoto || defaultAvatar}
              alt="Profile Preview"
              className={`w-full h-full ${form.profilePhoto ? 'object-cover object-top' : 'object-contain p-1'}`}
            />
            {form.profilePhoto && (
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, profilePhoto: '' }))}
                title="Remove custom photo (revert to default avatar)"
                className="absolute top-1 right-1 p-1 rounded-full bg-black/75 text-white hover:bg-black transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-xs font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] transition-all">
                {uploadingPhoto ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading Photo...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Your Photo
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                  className="hidden"
                />
              </label>

              {form.profilePhoto && (
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, profilePhoto: '' }))}
                  className="px-3.5 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 text-xs font-semibold hover:bg-rose-500/10 transition-colors"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <div>
              <input
                type="text"
                value={form.profilePhoto || ''}
                onChange={(e) => setForm({ ...form, profilePhoto: e.target.value })}
                placeholder="Or paste a direct photo URL (https://...)"
                className="w-full px-3.5 py-2 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card text-xs text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
              />
            </div>
            <p className="text-[11px] text-light-body dark:text-dark-body">
              Supports JPG, PNG, WEBP up to 4 MB. Square portrait photos look sharpest in the Hero frame.
            </p>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-light-accent dark:text-dark-accent" />
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={form.github || ''}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/your-username"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={form.linkedin || ''}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-light-accent dark:text-dark-accent" />
              Email Address
            </label>
            <input
              type="email"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your.email@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>
      </div>

      {/* Hero & Bio Details Card */}
      <div className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-5">
        <h3 className="text-base font-bold text-light-heading dark:text-dark-heading flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-light-accent dark:text-dark-accent" />
          Hero &amp; About Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Professional Title
            </label>
            <input
              type="text"
              required
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-light-accent" /> Location
            </label>
            <input
              type="text"
              value={form.location || ''}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Availability Status Pill
            </label>
            <input
              type="text"
              value={form.status || ''}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Education Tag (Hero)
            </label>
            <input
              type="text"
              value={form.educationBadge || ''}
              onChange={(e) => setForm({ ...form, educationBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Specialty Floating Badge
            </label>
            <input
              type="text"
              value={form.specialtyText || ''}
              onChange={(e) => setForm({ ...form, specialtyText: e.target.value })}
              placeholder="e.g. Full Stack MERN & Python"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Hero Description
          </label>
          <textarea
            rows={2}
            value={form.heroDescription || ''}
            onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            About Me Summary (Simple Bio)
          </label>
          <textarea
            rows={3}
            value={form.aboutBio || ''}
            onChange={(e) => setForm({ ...form, aboutBio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,46,99,0.35)] hover:shadow-[0_0_28px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving Profile...' : 'Save Profile'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
