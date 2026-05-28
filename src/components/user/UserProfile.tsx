'use client';

import { useState } from 'react';
import {
  UserProfile as UserProfileData,
  useUserProfile,
} from '@/hooks/use-social';
import { useAuthStore } from '@/stores/auth-store';
import { FilmIcon, BookmarkIcon, EyeIcon, UsersIcon, UserCheckIcon, MessageSquareIcon } from 'lucide-react';
import { UserProfileHeader } from './UserProfileHeader';
import { UserProfileSkeleton } from './UserProfileSkeleton';
import { ReviewsTab } from './tabs/ReviewsTab';
import { WatchlistTab } from './tabs/WatchlistTab';
import { WatchedTab } from './tabs/WatchedTab';
import { FollowersTab } from './tabs/FollowersTab';
import { FollowingTab } from './tabs/FollowingTab';

type Tab = 'reviews' | 'watchlist' | 'watched' | 'followers' | 'following';

interface UserProfileProps {
  userId: number;
  isOwnProfile?: boolean;
  initialData?: UserProfileData | null;
}

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'reviews', label: 'Reviews', icon: <MessageSquareIcon className="w-4 h-4" /> },
  { key: 'watchlist', label: 'Watchlist', icon: <BookmarkIcon className="w-4 h-4" /> },
  { key: 'watched', label: 'Watched', icon: <EyeIcon className="w-4 h-4" /> },
  { key: 'followers', label: 'Followers', icon: <UsersIcon className="w-4 h-4" /> },
  { key: 'following', label: 'Following', icon: <UserCheckIcon className="w-4 h-4" /> },
];

export function UserProfile({ userId, isOwnProfile = false, initialData }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');
  const { user: loggedInUser } = useAuthStore();
  const { data: user, isLoading: isUserLoading } = useUserProfile(userId, initialData || undefined);

  const actualIsOwnProfile = isOwnProfile || (loggedInUser !== null && loggedInUser.id === userId);

  if (isUserLoading) return <UserProfileSkeleton />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="rounded-full bg-muted p-5 mb-4">
          <FilmIcon className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-muted-foreground">This profile doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in-up">
      <UserProfileHeader
        user={user}
        isOwnProfile={actualIsOwnProfile}
        onStatClick={setActiveTab}
      />

      {/* Tab Navigation */}
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
        <div className="flex border-b gap-1 w-max min-w-full">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm whitespace-nowrap border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'reviews' && <ReviewsTab userId={userId} />}
        {activeTab === 'watchlist' && <WatchlistTab userId={userId} />}
        {activeTab === 'watched' && <WatchedTab userId={userId} />}
        {activeTab === 'followers' && <FollowersTab userId={userId} />}
        {activeTab === 'following' && <FollowingTab userId={userId} />}
      </div>
    </div>
  );
}
