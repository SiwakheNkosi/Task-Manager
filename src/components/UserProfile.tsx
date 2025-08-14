import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
    };

    fetchProfile();
  }, [user.id]);

  const getInitials = (name: string | null) => {
    if (!name) return user.email?.[0]?.toUpperCase() || "U";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
            {getInitials(profile?.full_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{profile?.full_name || "User"}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};