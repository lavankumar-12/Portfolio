import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { personalInfo } from '../data/personalInfo';
import { skillCategories as fallbackSkills } from '../data/skills';
import { projects as fallbackProjects } from '../data/projects';
import { experiences as fallbackExperiences } from '../data/experience';
import { certificates as fallbackCertificates } from '../data/certificates';
import { codingProfiles as fallbackCodingProfiles } from '../data/codingProfiles';

import hospitalSvg from '../assets/projects/hospital-system.svg';
import expenseSvg from '../assets/projects/expense-tracker.svg';
import todoSvg from '../assets/projects/todo-app.svg';
import docstringSvg from '../assets/projects/docstring-generator.svg';

import nptelSvg from '../assets/certificates/nptel-java.svg';
import pythonGfgSvg from '../assets/certificates/python-gfg.svg';
import googleAndroidSvg from '../assets/certificates/google-android.svg';
import infosysAiSvg from '../assets/certificates/infosys-ai.svg';

const PortfolioContext = createContext();

const PROFILE_CACHE_KEY = 'lavan_profile_cache_v1';
const PHOTO_CACHE_KEY = 'lavan_profile_photo_v1';

const projectFallbackImages = [hospitalSvg, expenseSvg, todoSvg, docstringSvg];
const certFallbackImages = [nptelSvg, pythonGfgSvg, googleAndroidSvg, infosysAiSvg];

export const defaultProfile = {
  name: personalInfo.name,
  title: personalInfo.title,
  smallIntro: personalInfo.smallIntro,
  status: personalInfo.contact.status,
  location: personalInfo.location,
  educationBadge: personalInfo.educationBadge,
  college: personalInfo.college,
  heroDescription: personalInfo.heroDescription,
  aboutBio: personalInfo.aboutParagraphs[0],
  profilePhoto: personalInfo.profilePhoto || '/profile.webp',
  specialtyText: 'Full Stack MERN & Python',
  highlightMetric: '95%',
  highlightLabel: 'Java NPTEL',
  highlightSubtitle: 'Elite + Gold Category',
  github: personalInfo.contact.github,
  linkedin: personalInfo.contact.linkedin,
  email: personalInfo.contact.email,
  hasCustomResume: false,
  resumeFileName: personalInfo.resume.fileName,
  resumeFilePath: personalInfo.resume.filePath,
  resumeLastUpdated: personalInfo.resume.lastUpdated,
};

const readCachedProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    const cachedPhoto = localStorage.getItem(PHOTO_CACHE_KEY);
    let profile = { ...defaultProfile };
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        profile = { ...profile, ...parsed };
      }
    }
    if (cachedPhoto) {
      profile.profilePhoto = cachedPhoto;
    }
    return profile;
  } catch {
    // Ignore storage read errors
  }
  return { ...defaultProfile };
};

const writeCachedProfile = (profileObj) => {
  try {
    if (profileObj.profilePhoto) {
      localStorage.setItem(PHOTO_CACHE_KEY, profileObj.profilePhoto);
    }
    // Exclude large PDF blob if ever present
    const { resumeData, ...lightweight } = profileObj;
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(lightweight));
  } catch {
    // Ignore quota exceeded errors
  }
};

const attachProjectFallbackImage = (project, idx) => {
  if (project.image) return project;
  const titleLower = (project.title || '').toLowerCase();
  if (titleLower.includes('hospital')) return { ...project, image: hospitalSvg };
  if (titleLower.includes('expense')) return { ...project, image: expenseSvg };
  if (titleLower.includes('todo')) return { ...project, image: todoSvg };
  if (titleLower.includes('docstring')) return { ...project, image: docstringSvg };
  return { ...project, image: projectFallbackImages[idx % projectFallbackImages.length] };
};

const attachCertFallbackImage = (cert, idx) => {
  if (cert.previewImage) return cert;
  const titleLower = (cert.title || '').toLowerCase();
  if (titleLower.includes('java') || titleLower.includes('nptel')) {
    return { ...cert, previewImage: nptelSvg };
  }
  if (titleLower.includes('python')) return { ...cert, previewImage: pythonGfgSvg };
  if (titleLower.includes('android')) return { ...cert, previewImage: googleAndroidSvg };
  if (titleLower.includes('infosys') || titleLower.includes('ai')) {
    return { ...cert, previewImage: infosysAiSvg };
  }
  return { ...cert, previewImage: certFallbackImages[idx % certFallbackImages.length] };
};

export const PortfolioProvider = ({ children }) => {
  const initialCached = readCachedProfile();

  const [profile, setProfile] = useState(initialCached || defaultProfile);
  const [profileLoading, setProfileLoading] = useState(!initialCached);
  const [skills, setSkills] = useState(fallbackSkills);
  const [projects, setProjects] = useState(fallbackProjects);
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [achievements, setAchievements] = useState([]);
  const [codingProfiles, setCodingProfiles] = useState(fallbackCodingProfiles);
  const [loading, setLoading] = useState(true);
  const [usingLiveDb, setUsingLiveDb] = useState(false);

  const refreshData = useCallback(async () => {
    // 1. High-priority independent fetch for Hero profile + photo (never blocked by heavy sections)
    const profilePromise = api
      .getProfile(false)
      .then((profileRes) => {
        if (profileRes && Object.keys(profileRes).length > 0) {
          const merged = { ...defaultProfile, ...profileRes };
          setProfile(merged);
          writeCachedProfile(merged);
        }
        setUsingLiveDb(true);
      })
      .catch(() => {
        // Keep cached or fallback profile smoothly
      })
      .finally(() => {
        setProfileLoading(false);
      });

    // 2. Fetch remaining sections independently in parallel (respects hidden flag via X-Total-Count)
    const sectionsPromise = Promise.all([
      api.getSkillsPublic().catch(() => null),
      api.getProjectsPublic().catch(() => null),
      api.getExperiencePublic().catch(() => null),
      api.getCertificatesPublic().catch(() => null),
      api.getAchievementsPublic().catch(() => null),
      api.getCodingProfilesPublic().catch(() => null),
    ])
      .then(([skillsRes, projectsRes, expRes, certsRes, achRes, codingRes]) => {
        if (skillsRes && skillsRes.totalCount > 0) {
          setSkills(skillsRes.items);
          setUsingLiveDb(true);
        }
        if (projectsRes && projectsRes.totalCount > 0) {
          setProjects(projectsRes.items.map(attachProjectFallbackImage));
          setUsingLiveDb(true);
        }
        if (expRes && expRes.totalCount > 0) {
          setExperiences(expRes.items);
          setUsingLiveDb(true);
        }
        if (certsRes && certsRes.totalCount > 0) {
          setCertificates(certsRes.items.map(attachCertFallbackImage));
          setUsingLiveDb(true);
        }
        if (achRes) {
          setAchievements(achRes.items);
        }
        if (codingRes && codingRes.totalCount > 0) {
          setCodingProfiles(codingRes.items);
          setUsingLiveDb(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    await Promise.all([profilePromise, sectionsPromise]);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        profileLoading,
        skills,
        projects,
        experiences,
        certificates,
        achievements,
        codingProfiles,
        loading,
        usingLiveDb,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
