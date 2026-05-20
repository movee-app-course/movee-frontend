import { UserProfile } from '@/components/user/UserProfile';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  return <UserProfile userId={parseInt(id, 10)} />;
}
