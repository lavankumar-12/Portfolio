import React, { useState, useEffect } from 'react';
import { FileText, Upload, Save, Download, Trash2, Loader2, CheckCircle2, Eye } from 'lucide-react';
import { api } from '../../services/api';
import { defaultProfile } from '../../context/PortfolioContext';

export const ResumeManager = ({ profileData, onRefresh, notify }) => {
  const [resumeData, setResumeData] = useState('');
  const [resumeFileName, setResumeFileName] = useState(defaultProfile.resumeFileName);
  const [resumeLastUpdated, setResumeLastUpdated] = useState(defaultProfile.resumeLastUpdated);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      setResumeData(profileData.resumeData || '');
      setResumeFileName(profileData.resumeFileName || defaultProfile.resumeFileName);
      setResumeLastUpdated(profileData.resumeLastUpdated || defaultProfile.resumeLastUpdated);
    }
  }, [profileData]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadResume(file);
      setResumeData(res.url);
      if (res.fileName) setResumeFileName(res.fileName);

      // Automatically set current month & year as Last Updated
      const nowLabel = new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      setResumeLastUpdated(nowLabel);

      notify('PDF uploaded! Click "Save & Publish Resume" to make it live.', 'success');
    } catch (err) {
      notify(err.message || 'Resume upload failed', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile({
        resumeData,
        resumeFileName,
        resumeLastUpdated,
      });
      notify('Resume published live across Hero and Resume section!', 'success');
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveCustom = async () => {
    if (!window.confirm('Remove custom uploaded PDF and revert to default resume?')) return;
    setSaving(true);
    try {
      await api.updateProfile({
        resumeData: '',
        resumeFileName: defaultProfile.resumeFileName,
      });
      setResumeData('');
      setResumeFileName(defaultProfile.resumeFileName);
      notify('Reverted to default resume.', 'success');
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const activePdfSrc = resumeData || '/Lavan_Kumar_Resume.pdf';

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-light-border dark:border-dark-border pb-4">
          <div>
            <h2 className="text-lg font-bold text-light-heading dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF2E63]" />
              Professional Resume Upload
            </h2>
            <p className="text-xs text-light-body dark:text-dark-body mt-0.5">
              Upload your latest PDF resume. It updates both the Hero &quot;Download Resume&quot; button and the Professional Resume section automatically.
            </p>
          </div>
          {resumeData && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" /> Custom PDF Ready
            </span>
          )}
        </div>

        {/* Drag / Click Upload Box */}
        <label className="cursor-pointer block p-8 rounded-2xl border-2 border-dashed border-cyan-500/40 hover:border-[#FF2E63] bg-light-secondary/60 dark:bg-[#141622] text-center transition-colors">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FF2E63]/15 text-[#FF2E63] flex items-center justify-center mb-3">
            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          <p className="text-sm font-bold text-light-heading dark:text-white">
            {uploading ? 'Uploading PDF Resume...' : 'Click to Upload Your PDF Resume'}
          </p>
          <p className="text-xs text-light-body dark:text-dark-body mt-1">
            PDF files only (`.pdf`) up to 8 MB • Saved directly in MongoDB Atlas
          </p>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Metadata Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Download File Name
            </label>
            <input
              type="text"
              required
              value={resumeFileName}
              onChange={(e) => setResumeFileName(e.target.value)}
              placeholder="Lavan_Kumar_Resume.pdf"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Last Updated Date Label
            </label>
            <input
              type="text"
              required
              value={resumeLastUpdated}
              onChange={(e) => setResumeLastUpdated(e.target.value)}
              placeholder="e.g. November 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-cyan-500/35 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold hover:border-cyan-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Preview PDF'}
            </button>

            <a
              href={activePdfSrc}
              download={resumeFileName}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-light-border dark:border-white/15 bg-light-secondary dark:bg-[#161824] text-light-heading dark:text-white text-xs font-semibold hover:border-[#FF2E63] transition-colors"
            >
              <Download className="w-4 h-4" />
              Test Download
            </a>

            {resumeData && (
              <button
                type="button"
                onClick={handleRemoveCustom}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 text-rose-500 text-xs font-semibold hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Default
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,46,99,0.35)] hover:shadow-[0_0_28px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save & Publish Resume'}</span>
          </button>
        </div>
      </form>

      {/* Embedded Preview */}
      {showPreview && (
        <div className="rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-white shadow-lg">
          <iframe
            src={activePdfSrc}
            title="Resume PDF Preview"
            className="w-full h-[640px] border-none"
          />
        </div>
      )}
    </div>
  );
};
