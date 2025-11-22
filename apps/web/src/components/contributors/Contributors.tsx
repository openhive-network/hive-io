'use client';

import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useMainStore } from '@/store/useMainStore';
import { CONTRIBUTORS, CONTRIBUTOR_LABELS } from '@/lib/data/var';
import type { IContributor } from '@/types';
import { ContributorLabel } from './ContributorLabel';
import { ContributorsContributor } from './ContributorsContributor';

interface ContributorsProps {
  full?: boolean;
}

export const Contributors: React.FC<ContributorsProps> = ({ full = true }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const shuffledContributors = useMainStore(state => state.shuffledContributors);
  const contributors = useMainStore(state => state.contributors);
  const setContributors = useMainStore(state => state.setContributors);
  const shuffleContributors = useMainStore(state => state.shuffleContributors);

  const filterParam = searchParams.get('t');

  const contributorLabels = useMemo(() => {
    return Object.keys(CONTRIBUTOR_LABELS)
      .filter((l: string) => {
        return shuffledContributors.find(
          (c: IContributor) => !c.inactive && c.labels.includes(l as any)
        );
      })
      .map((l: string) => {
        return {
          value: l,
          count: shuffledContributors.filter(
            (c: IContributor) => !c.inactive && c.labels.includes(l as any)
          ).length,
        };
      });
  }, [shuffledContributors]);

  const getFilteredContributors = (key: string | null | undefined) => {
    setContributors(
      shuffledContributors.filter(
        (e: IContributor) => !e.inactive && (!key || e.labels.includes(key as any))
      )
    );
  };

  useEffect(() => {
    if (contributors.length <= 0) {
      getFilteredContributors(filterParam);
    }
  }, []);

  useEffect(() => {
    getFilteredContributors(filterParam);
  }, [filterParam, shuffledContributors]);

  const filterLabel = (key: string) => {
    if (filterParam === key) {
      router.push('/contributors');
    } else {
      router.push(`/contributors?t=${key}`);
    }
  };

  return (
    <div className="flex flex-col flex-nowrap items-center w-full min-h-[500px]">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
          Our Builders<span className="text-[#e31337]">.</span>
        </h1>
        <p className="text-xl max-w-[700px] text-[#555] leading-relaxed mb-4">
          We're a decentralized project, running on more than{' '}
          {CONTRIBUTORS.length} people contributing regularly to the Hive
          Ecosystem.
        </p>
        <p className="text-lg text-[#555]">
          The list of contributors below is{' '}
          <span className="text-[#e31337] cursor-pointer hover:underline font-medium" onClick={() => shuffleContributors()}>
            randomized
          </span>
          .
        </p>
      </div>

      {/* Filter Labels */}
      <div className="flex flex-row flex-wrap justify-center gap-3 mb-12">
        {contributorLabels.map((label) => (
          <ContributorLabel
            key={label.value}
            className={
              filterParam && filterParam !== label.value
                ? 'opacity-40 hover:opacity-75'
                : ''
            }
            label={label.value}
            count={label.count}
            onClick={() => filterLabel(label.value)}
          />
        ))}
      </div>

      {/* Contributors Grid */}
      <div className="flex flex-row flex-wrap justify-center w-full gap-3 max-[600px]:gap-2">
        {contributors.map((contributor) => (
          <ContributorsContributor
            key={contributor.id}
            contributor={contributor}
          />
        ))}
      </div>
    </div>
  );
};
