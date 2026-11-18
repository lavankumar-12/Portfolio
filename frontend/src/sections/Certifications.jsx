import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CertificateCard } from '../components/CertificateCard';
import { CertificateModal } from '../components/CertificateModal';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications = () => {
  const { certificates } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certifications" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Credentials"
          title="Certifications"
          subtitle="Verified technical certifications and completed specialization tracks."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <CertificateCard
              key={cert._id || cert.id || cert.title}
              certificate={cert}
              onSelect={(c) => setSelectedCert(c)}
            />
          ))}
        </div>

        {/* Certificate Preview Modal */}
        <CertificateModal
          certificate={selectedCert}
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      </div>
    </section>
  );
};
