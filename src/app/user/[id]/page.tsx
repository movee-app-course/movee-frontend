import { notFound } from 'next/navigation';
import { UserProfile } from '@/components/user/UserProfile';
import { endpoints } from '@/lib/api/endpoints';
import type { UserProfile as UserProfileData } from '@/hooks/use-social';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  const userId = Number(id);
  if (isNaN(userId)) notFound();

  let initialData: UserProfileData | null = null;
  try {
    const res = await fetch(endpoints.users.byId(userId), {
      next: { revalidate: 30 } // Cache profile for 30s
    });
    if (res.ok) {
      initialData = await res.json();
    }
  } catch (err) {
    console.error(`SSR pre-fetch failed for user ${id}:`, err);
  }

  return <UserProfile userId={userId} initialData={initialData} />;
}
