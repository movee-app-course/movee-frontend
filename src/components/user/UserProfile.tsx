"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  EyeIcon,
  FilmIcon,
  MessageSquareIcon,
  UserCheckIcon,
  UsersIcon,
} from "lucide-react";
import {
  UserProfile as UserProfileData,
  useUserProfile,
} from "@/hooks/use-social";
import { useAuthStore } from "@/stores/auth-store";
import { FollowersTab } from "./tabs/FollowersTab";
import { FollowingTab } from "./tabs/FollowingTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { WatchedTab } from "./tabs/WatchedTab";
import { WatchlistTab } from "./tabs/WatchlistTab";
import { UserProfileHeader } from "./UserProfileHeader";
import { UserProfileSkeleton } from "./UserProfileSkeleton";

type Tab = "reviews" | "watchlist" | "watched" | "followers" | "following";

interface UserProfileProps {
  userId: number;
  isOwnProfile?: boolean;
  initialData?: UserProfileData | null;
}

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "reviews",
    label: "Отзывы",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },
  {
    key: "watchlist",
    label: "Список желаний",
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    key: "watched",
    label: "Просмотрено",
    icon: <EyeIcon className="h-4 w-4" />,
  },
  {
    key: "followers",
    label: "Подписчики",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    key: "following",
    label: "Подписки",
    icon: <UserCheckIcon className="h-4 w-4" />,
  },
];

export function UserProfile({
  userId,
  isOwnProfile = false,
  initialData,
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>("reviews");
  const { user: loggedInUser } = useAuthStore();
  const { data: user, isLoading: isUserLoading } = useUserProfile(
    userId,
    initialData || undefined,
  );

  const actualIsOwnProfile =
    isOwnProfile || (loggedInUser !== null && loggedInUser.id === userId);

  if (isUserLoading) return <UserProfileSkeleton />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="bg-muted mb-4 rounded-full p-5">
          <FilmIcon className="text-muted-foreground/50 h-10 w-10" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Пользователь не найден</h1>
        <p className="text-muted-foreground">Такого профиля не существует.</p>
      </div>
    );
  }

  return (
    <div className="animate-in-up container mx-auto max-w-4xl px-4 py-8">
      <UserProfileHeader
        user={user}
        isOwnProfile={actualIsOwnProfile}
        onStatClick={setActiveTab}
      />

      {/* Tab Navigation */}
      <div className="mb-6 [scrollbar-width:none] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-1 border-b">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground hover:border-border border-transparent"
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
        {activeTab === "reviews" && <ReviewsTab userId={userId} />}
        {activeTab === "watchlist" && <WatchlistTab userId={userId} />}
        {activeTab === "watched" && <WatchedTab userId={userId} />}
        {activeTab === "followers" && <FollowersTab userId={userId} />}
        {activeTab === "following" && <FollowingTab userId={userId} />}
      </div>
    </div>
  );
}
