import { UserProfile } from '@/components/user/UserProfile';
import type { UserProfile as UserProfileData } from '@/hooks/use-social';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  
  let initialData: UserProfileData | null = null;
  try {
    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
      next: { revalidate: 30 } // Cache profile for 30s
    });
    if (res.ok) {
      initialData = await res.json();
    }
  } catch (err) {
    console.error(`SSR pre-fetch failed for user ${id}:`, err);
  }

  return <UserProfile userId={parseInt(id, 10)} initialData={initialData} />;
}
